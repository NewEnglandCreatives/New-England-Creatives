import type {Metadata} from "next";
import Dashboard from "./dashboard";
import LoginForm from "./login-form";
import {isNecAdminUser} from "@/lib/admin-auth";

export const metadata:Metadata={title:"Operations",robots:{index:false,follow:false}};
export default async function Admin(){
 const authorized=await isNecAdminUser();
 return <div className="wrap section"><p className="eyebrow">PRIVATE OPERATIONS</p><h1>NEC operating desk</h1>{authorized?<><p>Authorized owner access.</p><Dashboard/></>:<><p>Owner sign-in required.</p><LoginForm/></>}</div>
}
