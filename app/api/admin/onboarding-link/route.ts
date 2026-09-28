import {database} from "@/lib/binding";
import {getNecAdminUser} from "@/lib/admin-auth";

async function digest(token:string){
 const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(token));
 return Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,"0")).join("")
}

export async function POST(request:Request){
 if(!(await getNecAdminUser()))return Response.json({error:"Unauthorized"},{status:401,headers:{"Cache-Control":"no-store"}});
 const {clientId}=await request.json() as {clientId:string};
 const client=await database().prepare("SELECT id FROM clients WHERE id=?").bind(clientId).first();
 if(!client)return Response.json({error:"Client not found"},{status:404});
 const token=crypto.randomUUID(),now=new Date().toISOString(),expiry=new Date(Date.now()+14*86400000).toISOString();
 await database().batch([
  database().prepare("INSERT INTO onboarding (id,client_id,token_hash,created_at,expires_at) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),clientId,await digest(token),now,expiry),
  database().prepare("UPDATE clients SET onboarding_status='Sent' WHERE id=?").bind(clientId)
 ]);
 return Response.json({url:new URL("/onboarding?token="+token,request.url).toString(),expiresAt:expiry},{headers:{"Cache-Control":"no-store"}})
}
