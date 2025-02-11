import { NextRequest, NextResponse } from "next/server";
import { setAccessToken } from "@/services/spotify";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  // const sdk = SpotifyApi.withClientCredentials("692566c1bd8445cdb21c6bb69e3da0ec", "8103c6ffdb07412f9a0c089611ebe920" , ['playlist-read-private','playlist-modify-private','playlist-modify-public','user-read-email','playlist-read-collaborative']);
  
  if(body.code) {
    await setAccessToken(body.code);
    return NextResponse.json({success: true});
  } 
}