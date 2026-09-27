import {database} from "@/lib/binding";
import { env } from "cloudflare:workers";
import { z } from "zod";
const schema=z.object({
 company:z.string().trim().min(2).max(120),name:z.string().trim().min(2).max(120),email:z.string().email().max(190),phone:z.string().trim().max(40).optional().default(""),package:z.enum(["","starter","growth","partner"]).default(""),contact:z.enum(["email","phone"]),details:z.string().trim().min(15).max(2000),consent:z.literal("yes"),website:z.string().max(100).optional().default("")
});
export async function POST(request:Request){
 try{
  const length=Number(request.headers.get("content-length")||0);if(length>10000)return Response.json({error:"Request too large."},{status:413});
  const parsed=schema.safeParse(await request.json());if(!parsed.success)return Response.json({error:"Please check the required fields."},{status:400});
  const p=parsed.data;if(p.website)return Response.json({ok:true});
  const now=new Date().toISOString(),id="NEC-"+crypto.randomUUID();
  const dupe=await database().prepare("SELECT id FROM leads WHERE lower(email)=lower(?) AND lower(company)=lower(?) AND created_at>? LIMIT 1").bind(p.email,p.company,new Date(Date.now()-24*3600000).toISOString()).first();
  if(dupe)return Response.json({ok:true});
  await database().batch([
   database().prepare("INSERT INTO leads (id,company,name,email,phone,package_interest,contact_preference,details,source,status,created_at,next_follow_up,agreement_status,activation_status,onboarding_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,p.company,p.name,p.email,p.phone,p.package||"Undecided",p.contact,p.details,request.headers.get("referer")?.slice(0,500)||"Website","Lead",now,now,"Not sent","Not due","Not sent"),
   database().prepare("INSERT INTO events (id,kind,entity_id,at,details) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),"lead_received",id,now,"Website inquiry")
  ]);
  return Response.json({ok:true},{status:201});
 }catch(e){console.error("Inquiry failure",e);return Response.json({error:"We couldn’t send your request. Please email zac@newenglandcreatives.com directly."},{status:503})}
}
