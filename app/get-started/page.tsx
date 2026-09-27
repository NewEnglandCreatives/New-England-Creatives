import type { Metadata } from "next";
import { Suspense } from "react";
import InquiryForm from "./inquiry-form";
export const metadata:Metadata={title:"Get started",description:"Tell New England Creatives about your business and marketing needs.",alternates:{canonical:"/get-started"}};
export default function GetStarted(){return <div className="wrap form-shell"><div><p className="eyebrow">LET’S TALK</p><h1>Get marketing<br/><em>off your plate.</em></h1><p>Tell us the essentials. We’ll review the fit and follow up about scope, timing, and next steps. This inquiry is not a purchase or agreement.</p><p><a href="mailto:zac@newenglandcreatives.com">zac@newenglandcreatives.com</a></p></div><Suspense fallback={<p>Loading form…</p>}><InquiryForm/></Suspense></div>}
