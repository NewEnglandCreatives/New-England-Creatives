"use client";
import {useSearchParams} from "next/navigation";
import {useEffect,useState} from "react";

export default function OnboardingForm(){
 const token=useSearchParams().get("token")||"";
 const [state,setState]=useState("Checking link…"),[company,setCompany]=useState(""),[done,setDone]=useState(false);

 useEffect(()=>{
  if(!token){setState("Missing onboarding link.");return}
  fetch("/api/onboarding?token="+encodeURIComponent(token),{cache:"no-store"})
   .then(async r=>{const j=await r.json() as {error?:string,company?:string};if(!r.ok)throw Error(j.error);setCompany(j.company||"");setState("")})
   .catch(e=>setState(String(e)))
 },[token]);

 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  const form=e.currentTarget;
  setState("Saving…");
  const p={...Object.fromEntries(new FormData(form).entries()),token};
  try{
   const r=await fetch("/api/onboarding",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(p)});
   const j=await r.json() as {error?:string};
   if(!r.ok)throw Error(j.error);
   setDone(true);
   setState("Thanks — your onboarding information has been saved. We’ll review it and contact you about any access or materials we still need.")
  }catch(err){setState(String(err))}
 }

 return <form className="form-panel" onSubmit={submit}>
  <h2 style={{fontSize:"2.5rem"}}>{company||"Your onboarding"}</h2>
  <p style={{marginBottom:"1.5rem"}}>Nine quick questions so we can understand your business and build content around what matters most.</p>
  {state&&<p role="status">{state}</p>}
  {!state&&!done&&<>
   <div className="form-grid">
    <div className="field full">
     <label htmlFor="businessOverview">1. Tell us a little about your business. *</label>
     <p>What do you do, what services do you offer, and what areas do you serve?</p>
     <textarea id="businessOverview" name="businessOverview" required/>
    </div>

    <div className="field full">
     <label htmlFor="storyStrengths">2. What inspired you to start the business, and what do you think you do especially well?</label>
     <textarea id="storyStrengths" name="storyStrengths"/>
    </div>

    <div className="field full">
     <label htmlFor="differentiation">3. What makes your business different? *</label>
     <p>What sets you apart from competitors, and what are the main reasons customers choose you?</p>
     <textarea id="differentiation" name="differentiation" required/>
    </div>

    <div className="field full">
     <label htmlFor="idealCustomer">4. Who is your ideal customer? *</label>
     <p>Are there certain types of homeowners, properties, jobs, or customers you’d like more of?</p>
     <textarea id="idealCustomer" name="idealCustomer" required/>
    </div>

    <div className="field full">
     <label htmlFor="goals">5. What are your biggest goals over the next 6–12 months, and what would you like social media to help accomplish? *</label>
     <p>Examples: more leads, recurring customers, stronger local awareness, higher-value jobs, or showcasing your work.</p>
     <textarea id="goals" name="goals" required/>
    </div>

    <div className="field full">
     <label htmlFor="promotions">6. What should we promote? *</label>
     <p>Tell us which services, offers, or types of jobs you want more of — and anything you do not want us promoting.</p>
     <textarea id="promotions" name="promotions" required/>
    </div>

    <div className="field full">
     <label htmlFor="customerQuestions">7. What questions or misconceptions do customers commonly have?</label>
     <p>These help us create useful educational content about your business and industry.</p>
     <textarea id="customerQuestions" name="customerQuestions"/>
    </div>

    <div className="field full">
     <label htmlFor="assetsAvailable">8. What content and brand materials do you already have?</label>
     <p>Examples: logo, job photos, before-and-after photos, videos, customer reviews/testimonials, branded graphics, or other material. We’ll collect the actual files separately.</p>
     <textarea id="assetsAvailable" name="assetsAvailable"/>
    </div>

    <div className="field full">
     <label>9. Social account setup *</label>
     <p>Please provide the account information below. If you do not have something yet, leave the link blank or choose “Not sure.”</p>

     <div className="form-grid">
      <div className="field full">
       <label htmlFor="facebookUrl">Facebook Page URL</label>
       <input id="facebookUrl" name="facebookUrl" type="url" placeholder="https://facebook.com/…"/>
      </div>
      <div className="field full">
       <label htmlFor="instagramUrl">Instagram username / profile link</label>
       <input id="instagramUrl" name="instagramUrl" type="text" placeholder="@username or https://instagram.com/…"/>
      </div>
      <div className="field">
       <label htmlFor="instagramProfessional">Is Instagram a Professional account?</label>
       <select id="instagramProfessional" name="instagramProfessional" required defaultValue="not_sure">
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="not_sure">Not sure</option>
       </select>
      </div>
      <div className="field">
       <label htmlFor="metaLinked">Are Facebook and Instagram connected in Meta?</label>
       <select id="metaLinked" name="metaLinked" required defaultValue="not_sure">
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="not_sure">Not sure</option>
       </select>
      </div>
      <div className="field full">
       <label htmlFor="grantAccess">Are you able to grant New England Creatives business access?</label>
       <select id="grantAccess" name="grantAccess" required defaultValue="not_sure">
        <option value="yes">Yes</option>
        <option value="help">I need help</option>
        <option value="not_sure">Not sure</option>
       </select>
      </div>
     </div>

     <p><strong>Account security:</strong> Please do not enter any Facebook or Instagram passwords, two-factor authentication codes, recovery codes, or personal login information. New England Creatives will use Meta’s official access system so you remain the owner of your accounts and can revoke our access at any time.</p>
    </div>

    <div className="field full">
     <label><input type="checkbox" name="consent" value="yes" required style={{width:"auto",marginRight:10}}/>I am authorized to provide this business information. *</label>
    </div>
   </div>
   <button className="button" type="submit">Submit onboarding ↗</button>
  </>}
 </form>
}
