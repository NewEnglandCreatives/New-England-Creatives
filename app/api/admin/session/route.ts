import {NextResponse} from "next/server";
import {adminSessionCookie,createAdminSession,verifyAdminPassword} from "@/lib/admin-auth";

export async function POST(request:Request){
 try{
  const body=await request.json() as {password?:unknown};
  if(typeof body.password!=="string"||body.password.length>256||!(await verifyAdminPassword(body.password))){
   return NextResponse.json({error:"Invalid credentials"},{status:401,headers:{"Cache-Control":"no-store"}});
  }
  const session=await createAdminSession();
  const response=NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  response.cookies.set(adminSessionCookie.name,session.value,{httpOnly:true,secure:true,sameSite:"strict",path:"/",maxAge:session.maxAge});
  return response;
 }catch(e){console.error("Admin sign in",e);return NextResponse.json({error:"Admin sign-in is not configured"},{status:503})}
}
export async function DELETE(){
 const response=NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
 response.cookies.set(adminSessionCookie.name,"",{httpOnly:true,secure:true,sameSite:"strict",path:"/",maxAge:0});
 return response;
}
