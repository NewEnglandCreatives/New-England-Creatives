import {database} from "@/lib/binding";
import {z} from "zod";

const payload=z.object({
 token:z.string().uuid(),
 businessOverview:z.string().min(5).max(3000),
 storyStrengths:z.string().max(2000).default(""),
 differentiation:z.string().min(3).max(2000),
 idealCustomer:z.string().min(3).max(2000),
 goals:z.string().min(3).max(2000),
 promotions:z.string().min(3).max(2000),
 customerQuestions:z.string().max(2000).default(""),
 assetsAvailable:z.string().max(2000).default(""),
 facebookUrl:z.union([z.string().url(),z.literal("")]).default(""),
 instagramUrl:z.string().max(500).default(""),
 instagramProfessional:z.enum(["yes","no","not_sure"]),
 metaLinked:z.enum(["yes","no","not_sure"]),
 grantAccess:z.enum(["yes","help","not_sure"]),
 consent:z.literal("yes")
});

async function digest(token:string){
 const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(token));
 return Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,"0")).join("")
}

export async function GET(request:Request){
 const token=new URL(request.url).searchParams.get("token")||"";
 if(!/^[0-9a-f-]{36}$/.test(token))return Response.json({error:"Invalid link"},{status:400});
 const row=await database().prepare("SELECT o.submitted_at,o.expires_at,c.company FROM onboarding o JOIN clients c ON c.id=o.client_id WHERE o.token_hash=?").bind(await digest(token)).first();
 if(!row||row.submitted_at||String(row.expires_at)<new Date().toISOString())return Response.json({error:"This onboarding link is no longer available. Contact NEC for a new one."},{status:410});
 return Response.json({company:row.company},{headers:{"Cache-Control":"no-store"}})
}

export async function POST(request:Request){
 try{
  if(Number(request.headers.get("content-length")||0)>25000)return Response.json({error:"Too large"},{status:413});
  const p=payload.safeParse(await request.json());
  if(!p.success)return Response.json({error:"Please check the required fields."},{status:400});
  const {token,...response}=p.data;
  const hash=await digest(token),now=new Date().toISOString();
  const row=await database().prepare("SELECT id,client_id FROM onboarding WHERE token_hash=? AND submitted_at IS NULL AND expires_at>?").bind(hash,now).first<{id:string,client_id:string}>();
  if(!row)return Response.json({error:"Link expired or already used."},{status:410});
  const result=await database().prepare("UPDATE onboarding SET responses=?, submitted_at=? WHERE id=? AND submitted_at IS NULL").bind(JSON.stringify(response),now,row.id).run();
  if(!result.meta.changes)return Response.json({error:"Already submitted."},{status:409});
  await database().batch([
   database().prepare("UPDATE clients SET onboarding_status='Submitted' WHERE id=?").bind(row.client_id),
   database().prepare("INSERT INTO events (id,kind,entity_id,at,details) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),"onboarding_submitted",row.client_id,now,"Client intake received")
  ]);
  return Response.json({ok:true},{status:201})
 }catch(e){
  console.error("Onboarding error",e);
  return Response.json({error:"Could not save. Please contact NEC."},{status:503})
 }
}
