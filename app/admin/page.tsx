import type {Metadata} from "next";
import Dashboard from "./dashboard";
import {requireChatGPTUser} from "@/app/chatgpt-auth";
import {isNecAdminUser} from "@/lib/admin-auth";

export const metadata:Metadata={title:"Operations",robots:{index:false,follow:false}};

export default async function Admin(){
 const user=await requireChatGPTUser("/admin");
 if(!isNecAdminUser(user)){
  return <div className="wrap section"><p className="eyebrow">PRIVATE OPERATIONS</p><h1>Access restricted</h1><p>This ChatGPT account is not authorized to access New England Creatives operations.</p></div>
 }
 return <div className="wrap section"><p className="eyebrow">PRIVATE OPERATIONS</p><h1>NEC operating desk</h1><p>Authorized owner access.</p><Dashboard/></div>
}
