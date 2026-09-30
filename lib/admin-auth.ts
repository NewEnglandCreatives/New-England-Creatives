import {cookies} from "next/headers";
import {env} from "cloudflare:workers";

const SESSION_COOKIE="nec_admin_session";
const MAX_AGE_SECONDS=60*60*12;

function normalize(value:string|undefined|null){return (value||"").trim().toLowerCase()}
function bytesToHex(bytes:Uint8Array){return Array.from(bytes).map(x=>x.toString(16).padStart(2,"0")).join("")}
function hexToBytes(hex:string){if(!/^[0-9a-f]+$/i.test(hex)||hex.length%2)return null;return new Uint8Array(hex.match(/.{2}/g)!.map(x=>parseInt(x,16)))}
function constantTimeEqual(a:Uint8Array,b:Uint8Array){if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0}
function config(){
 const e=env as unknown as Record<string,string|undefined>;
 const password=e.ADMIN_PASSWORD;
 const secret=e.ADMIN_SESSION_SECRET;
 if(!password||!secret||secret.length<32)throw new Error("ADMIN_PASSWORD and a 32+ character ADMIN_SESSION_SECRET are required");
 return {password,secret};
}
async function hmac(message:string,secret:string){
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 return bytesToHex(new Uint8Array(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(message))));
}
export async function verifyAdminPassword(candidate:string){
 const {password}=config();
 const expected=new TextEncoder().encode(password),actual=new TextEncoder().encode(candidate);
 return constantTimeEqual(expected,actual);
}
export async function createAdminSession(){
 const {secret}=config(),expires=Math.floor(Date.now()/1000)+MAX_AGE_SECONDS,nonce=crypto.randomUUID();
 const payload=expires+"."+nonce,signature=await hmac(payload,secret);
 return {value:payload+"."+signature,maxAge:MAX_AGE_SECONDS};
}
export async function isNecAdminUser(){
 try{
  const value=(await cookies()).get(SESSION_COOKIE)?.value;
  if(!value)return false;
  const parts=value.split("."); if(parts.length!==3)return false;
  const [expires,nonce,signature]=parts;
  if(!/^\d+$/.test(expires)||Number(expires)<Math.floor(Date.now()/1000)||!nonce)return false;
  const {secret}=config(),expected=hexToBytes(await hmac(expires+"."+nonce,secret)),actual=hexToBytes(signature);
  return !!expected&&!!actual&&constantTimeEqual(expected,actual);
 }catch{return false}
}
export async function getNecAdminUser(){return (await isNecAdminUser())?{authorized:true}:null}
export const adminSessionCookie={name:SESSION_COOKIE,maxAge:MAX_AGE_SECONDS};
