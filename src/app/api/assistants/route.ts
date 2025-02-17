import { Invitee } from "@/app/shared/interfaces";
import { setItem } from "@/services/edge"
import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if(!body.code) return NextResponse.error();
  const invitees = await get('invitees') as Invitee[];
  const invitee = invitees.find((i) => i.code === body.code);
  if(!invitee) return NextResponse.error();
  invitee.assists = body.quantity || 0;
  
  setItem('invitees', invitees);
  return NextResponse.json({success: true, assists: body.assists});
}