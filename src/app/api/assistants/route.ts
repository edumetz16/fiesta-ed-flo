import { Invitee } from "@/app/shared/interfaces";
import { setItem } from "@/services/edge"
import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if(!body.code) return NextResponse.error();
  let invitees = await get('invitees') as Invitee[];
  invitees = invitees.map((invitee) => {
    if (invitee.code === body.code) {
      invitee.assists = body.quantity || 0;
    }
    return invitee;
  })
  
  setItem('invitees', invitees);
  return NextResponse.json({success: true, assists: body.assists});
}