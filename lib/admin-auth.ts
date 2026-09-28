import {env} from "cloudflare:workers";
import {getChatGPTUser, type ChatGPTUser} from "@/app/chatgpt-auth";

const SITE_OWNER_EMAIL = "zcb9497@gmail.com";

function normalize(value:string|undefined|null){
  return (value||"").trim().toLowerCase();
}

export function isNecAdminUser(user:ChatGPTUser|null){
  if(!user) return false;
  const configuredOwner=normalize((env as unknown as Record<string,string>).OWNER_EMAIL);
  const allowed=new Set([normalize(SITE_OWNER_EMAIL),configuredOwner].filter(Boolean));
  return allowed.has(normalize(user.email));
}

export async function getNecAdminUser(){
  const user=await getChatGPTUser();
  return isNecAdminUser(user)?user:null;
}
