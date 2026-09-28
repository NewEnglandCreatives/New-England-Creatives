"use client";
import {useState} from "react";
type Row=Record<string,string|number|null>;

export default function OpsActions({data,refresh,onError}:{data:{clients:Row[]},refresh:()=>Promise<void>,onError:(v:string)=>void}){
 const [link,setLink]=useState(""),[busy,setBusy]=useState(false);

 async function post(url:string,body:Record<string,unknown>){
  setBusy(true);onError("");
  try{
   const r=await fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
   const j=await r.json() as {error?:string,url?:string};
   if(!r.ok)throw Error(j.error||"Action failed");
   if(j.url)setLink(j.url);
   await refresh()
  }catch(e){onError(String(e))}
  finally{setBusy(false)}
 }

 return <div className="ops-actions">
  <form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);post("/api/admin",{kind:"client",company:String(f.get("company")),package:String(f.get("package")),contact:String(f.get("contact")),email:String(f.get("email")),notes:String(f.get("notes"))});e.currentTarget.reset()}}><h3>Add signed or pilot client</h3><input name="company" placeholder="Company" required/><input name="contact" placeholder="Contact or TBD"/><input name="email" type="email" placeholder="Email (optional)"/><select name="package"><option>Starter</option><option>Growth</option><option>Partner</option></select><input name="notes" placeholder="Notes"/><button disabled={busy}>Add client</button></form>
  <form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);post("/api/admin/onboarding-link",{clientId:String(f.get("clientId"))})}}><h3>Client onboarding</h3><select name="clientId" required><option value="">Select client</option>{data.clients.map(c=><option key={String(c.id)} value={String(c.id)}>{c.company}</option>)}</select><button disabled={busy}>Create private intake link</button>{link&&<p className="link-result">Copy securely to your client: <a href={link}>{link}</a></p>}</form>
  <form onSubmit={async e=>{e.preventDefault();const f=new FormData(e.currentTarget),clientId=String(f.get("clientId")),cycle=String(f.get("cycle")),count=Math.max(1,Math.min(20,Number(f.get("count"))));setBusy(true);for(let i=1;i<=count;i++)await post("/api/admin",{kind:"content",clientId,cycle,number:i});setBusy(false)}}><h3>Create monthly content slots</h3><select name="clientId" required><option value="">Select client</option>{data.clients.map(c=><option key={String(c.id)} value={String(c.id)}>{c.company}</option>)}</select><input name="cycle" placeholder="e.g. 2026-10" required/><input name="count" type="number" min="1" max="20" defaultValue="12"/><button disabled={busy}>Create slots</button></form>
  <form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);post("/api/admin",{kind:"invoice",clientId:String(f.get("clientId")),cycle:String(f.get("cycle")),type:String(f.get("type")),baseAmount:Number(f.get("base")),credit:Number(f.get("credit")),amountDue:Number(f.get("base"))-Number(f.get("credit")),status:"Planned",notes:String(f.get("notes"))})}}><h3>Plan invoice</h3><select name="clientId" required><option value="">Select client</option>{data.clients.map(c=><option key={String(c.id)} value={String(c.id)}>{c.company}</option>)}</select><input name="cycle" placeholder="Cycle" required/><input name="type" placeholder="Activation or Service" required/><input name="base" type="number" min="0" step=".01" placeholder="Base amount" required/><input name="credit" type="number" min="0" step=".01" defaultValue="0"/><input name="notes" placeholder="Notes"/><button disabled={busy}>Add planned invoice</button></form>
 </div>
}
