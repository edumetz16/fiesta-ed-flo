import { setItem } from "@/services/edge"
import { EdgeConfigValue } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if(!body.code) return NextResponse.error();
  const asst: {[key in string]: EdgeConfigValue} = {};
  asst[body.code] = {
    assists: body.assists,
    quantity: body.quantity
  }
  setItem('assistants', asst);
  return NextResponse.json({success: true, assists: body.assists});
}