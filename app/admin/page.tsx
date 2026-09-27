import type { Metadata } from "next";
import Dashboard from "./dashboard";
export const metadata:Metadata={title:"Operations",robots:{index:false,follow:false}};
export default function Admin(){return <div className="wrap section"><p className="eyebrow">PRIVATE OPERATIONS</p><h1>NEC operating desk</h1><p>Authorized team only. Keep your access key private.</p><Dashboard/></div>}
