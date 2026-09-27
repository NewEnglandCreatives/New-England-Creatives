import {database} from "@/lib/binding";
import { env } from "cloudflare:workers";
const fields:Record<string,string[]>={
 leads:["status","last_contact","next_follow_up","agreement_status","activation_status","onboarding_status","notes"],
 clients:["status","onboarding_status","access_status","content_cycle_status","approval_status","metricool_status","reporting_status","notes","start_date","billing_date"],
 content:["stage","pillar","platform","format","asset_status","caption","creative_url","qa_status","approval_status","revision_count","planned_date","scheduled_date","published_date","metricool_id","performance_notes"],
 invoices:["status","due_date","paid_at","notes"]
};
function authorized(request:Request){const token=request.headers.get("x-admin-key")||"";const expected=(env as unknown as Record<string,string>).ADMIN_KEY||"";if(!expected||token.length!==expected.length)return false;let diff=0;for(let i=0;i<token.length;i++)diff|=token.charCodeAt(i)^expected.charCodeAt(i);return diff===0}
const no=()=>Response.json({error:"Unauthorized"},{status:401,headers:{"Cache-Control":"no-store"}});
export async function GET(request:Request){if(!authorized(request))return no();try{
 const [leads,clients,content,invoices,events]=await Promise.all([
 database().prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 250").all(),
 database().prepare("SELECT * FROM clients ORDER BY created_at DESC LIMIT 100").all(),
 database().prepare("SELECT * FROM content ORDER BY cycle DESC,number ASC LIMIT 500").all(),
 database().prepare("SELECT * FROM invoices ORDER BY due_date DESC LIMIT 200").all(),
 database().prepare("SELECT * FROM events ORDER BY at DESC LIMIT 100").all()
 ]);
 return Response.json({leads:leads.results,clients:clients.results,content:content.results,invoices:invoices.results,events:events.results},{headers:{"Cache-Control":"no-store"}});
 }catch(e){console.error("Admin read",e);return Response.json({error:"Records temporarily unavailable"},{status:503})}}
export async function PATCH(request:Request){if(!authorized(request))return no();try{
 const p=await request.json() as {table?:string,id?:string,changes?:Record<string,unknown>};
 if(!p.table||!fields[p.table]||typeof p.id!=="string"||!p.changes)return Response.json({error:"Invalid update"},{status:400});
 const keys=Object.keys(p.changes).filter(x=>fields[p.table!].includes(x));if(!keys.length||keys.length>8)return Response.json({error:"Invalid fields"},{status:400});
 const values=keys.map(k=>p.changes![k]);if(values.some(v=>v!==null&&typeof v!=="string"&&typeof v!=="number"))return Response.json({error:"Invalid values"},{status:400});
 const sql="UPDATE "+p.table+" SET "+keys.map(k=>k+"=?").join(",")+" WHERE id=?";
 const result=await database().prepare(sql).bind(...values,p.id).run();if(!result.meta.changes)return Response.json({error:"Record not found"},{status:404});
 await database().prepare("INSERT INTO events (id,kind,entity_id,at,details) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),"operator_update",p.id,new Date().toISOString(),JSON.stringify({table:p.table,keys})).run();
 return Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});
 }catch(e){console.error("Admin update",e);return Response.json({error:"Update failed"},{status:503})}}
export async function POST(request:Request){if(!authorized(request))return no();try{
 const p=await request.json() as Record<string,unknown>;const now=new Date().toISOString();const id=crypto.randomUUID();
 if(p.kind==="client"&&typeof p.company==="string"&&["Starter","Growth","Partner"].includes(String(p.package))){
  const monthly={Starter:400,Growth:650,Partner:1000}[p.package as "Starter"|"Growth"|"Partner"];const activation={Starter:150,Growth:200,Partner:300}[p.package as "Starter"|"Growth"|"Partner"];
  await database().prepare("INSERT INTO clients (id,company,contact,email,package,monthly_price,activation_fee,status,onboarding_status,access_status,content_cycle_status,approval_status,metricool_status,reporting_status,notes,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,p.company,String(p.contact||"TBD"),String(p.email||""),p.package,monthly,activation,"Pending signature","Not sent","Missing","Not started","Not started","Not connected","Not due",String(p.notes||""),now).run();
 }else if(p.kind==="content"&&typeof p.clientId==="string"&&typeof p.cycle==="string"&&Number.isInteger(p.number)){
  await database().prepare("INSERT INTO content (id,client_id,cycle,number,stage,updated_at) VALUES (?,?,?,?,?,?)").bind(id,p.clientId,p.cycle,p.number,"Idea",now).run();
 }else if(p.kind==="invoice"&&typeof p.clientId==="string"&&typeof p.cycle==="string"&&typeof p.amountDue==="number"){
  await database().prepare("INSERT INTO invoices (id,client_id,cycle,type,base_amount,credit,amount_due,due_date,status,notes) VALUES (?,?,?,?,?,?,?,?,?,?)").bind(id,p.clientId,p.cycle,String(p.type||"Monthly"),Number(p.baseAmount||0),Number(p.credit||0),p.amountDue,p.dueDate||null,String(p.status||"Planned"),String(p.notes||"")).run();
 }else return Response.json({error:"Invalid record"},{status:400});
 await database().prepare("INSERT INTO events (id,kind,entity_id,at,details) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),"operator_create",id,now,String(p.kind)).run();
 return Response.json({ok:true,id},{status:201});
 }catch(e){console.error("Admin create",e);return Response.json({error:"Record creation failed"},{status:503})}}
