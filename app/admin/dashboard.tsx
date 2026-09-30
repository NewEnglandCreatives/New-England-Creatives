"use client";
import {useEffect,useState} from "react";
import OpsActions from "./ops-actions";

type Row=Record<string,string|number|null>;
type Data={leads:Row[],clients:Row[],content:Row[],invoices:Row[],events:Row[]};

export default function Dashboard(){
 const [data,setData]=useState<Data|null>(null);
 const [error,setError]=useState("");
 const [tab,setTab]=useState<keyof Data>("leads");
 const [loading,setLoading]=useState(false);

 async function load(){
  setError("");
  setLoading(true);
  try{
   const r=await fetch("/api/admin",{cache:"no-store"});
   if(!r.ok)throw new Error(r.status===401?"Your NEC admin session is not authorized.":"Unable to load records.");
   setData(await r.json())
  }catch(e){setError(String(e))}
  finally{setLoading(false)}
 }

 useEffect(()=>{void load()},[]);

 async function update(table:string,id:string,column:string,value:string){
  const r=await fetch("/api/admin",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({table,id,changes:{[column]:value}})});
  if(!r.ok){setError("Update failed; refresh before retrying.");return}
  await load()
 }

 return <div className="ops">
  <div className="ops-login"><button className="button" onClick={load} disabled={loading}>{loading?"Loading…":"Refresh records"}</button></div>
  {error&&<p role="alert" className="form-status error">{error}</p>}
  {data&&<>
   <OpsActions data={data} refresh={load} onError={setError}/>
   <div className="ops-tabs">{(["leads","clients","content","invoices","events"] as const).map(x=><button key={x} onClick={()=>setTab(x)} aria-pressed={tab===x}>{x} ({data[x].length})</button>)}</div>
   <div className="ops-table"><table><thead><tr>{Object.keys(data[tab][0]||{id:0}).map(x=><th key={x}>{x.replaceAll("_"," ")}</th>)}</tr></thead><tbody>{data[tab].map(row=><tr key={String(row.id)}>{Object.entries(row).map(([column,v])=><td key={column}>{column==="status"&&tab!=="events"?<select value={String(v||"")} aria-label={tab+" status"} onChange={e=>update(tab,String(row.id),column,e.target.value)}>{[String(v||""),...new Set(tab==="leads"?["Lead","Qualified","Proposal","Contract Sent","Signed","Activation Paid","Onboarding","Production","Active","Paused","Cancellation Pending","Closed"]:tab==="content"?["Idea","Brief","Draft","Design/Edit","Internal QA","Client Review","Revision","Approved","Scheduled","Published","Measured"]:tab==="invoices"?["Planned","Due","Paid","Overdue","Void"]:["Pending signature","Onboarding","Production","Active","Paused","Cancellation Pending","Closed"])].map(x=><option key={x}>{x}</option>)}</select>:String(v??"")}</td>)}</tr>)}</tbody></table></div>
   <p>NEC operations are restricted to the authorized owner.</p>
  </>}
 </div>
}
