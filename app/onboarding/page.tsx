import type {Metadata} from "next";
import {Suspense} from "react";
import OnboardingForm from "./onboarding-form";

export const metadata:Metadata={title:"Client onboarding",robots:{index:false,follow:false},referrer:"no-referrer"};

export default function Onboarding(){
 return <div className="wrap form-shell">
  <div>
   <p className="eyebrow">CLIENT ONBOARDING</p>
   <h1>Let’s get to know<br/><em>your business.</em></h1>
   <p>This is a short, nine-question intake so New England Creatives can understand your business, goals, content opportunities, and social account setup without turning onboarding into homework.</p>
   <p>Do not enter passwords, two-factor authentication codes, recovery codes, customer lists, banking information, or other sensitive login information. Social access is granted separately through Meta’s official business-access tools.</p>
  </div>
  <Suspense fallback={<p>Loading…</p>}><OnboardingForm/></Suspense>
 </div>
}
