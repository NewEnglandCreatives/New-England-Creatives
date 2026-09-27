import type {Metadata} from "next";
import {Suspense} from "react";
import OnboardingForm from "./onboarding-form";
export const metadata:Metadata={title:"Client onboarding",robots:{index:false,follow:false},referrer:"no-referrer"};
export default function Onboarding(){return <div className="wrap form-shell"><div><p className="eyebrow">CLIENT ONBOARDING</p><h1>Let’s get to know<br/><em>your business.</em></h1><p>Complete this once after signing. Share facts, links, goals, and restrictions. Do not enter passwords, customer lists, or sensitive information. Platform access is granted separately through native roles.</p></div><Suspense fallback={<p>Loading…</p>}><OnboardingForm/></Suspense></div>}
