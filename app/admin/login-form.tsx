"use client";
import {useState} from "react";
export default function LoginForm(){
 const [password,setPassword]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");
  const r=await fetch("/api/admin/session",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({password})});
  setBusy(false); if(!r.ok){setError("Sign-in failed.");return} window.location.reload();
 }
 return <form className="ops-login" onSubmit={submit}><label>Admin password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="button" disabled={busy}>{busy?"Signing in…":"Sign in"}</button>{error&&<p role="alert" className="form-status error">{error}</p>}</form>
}
