import { NextRequest, NextResponse } from "next/server";
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { getOrUpdateAccessToken } from "@/services/spotify";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const access_token = await getOrUpdateAccessToken();
  const sdk = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!,access_token);
  
  if(body.type === 'search' && body.q) {
    const result = await sdk.search(body.q, ['track'], 'AR', 10);
    return NextResponse.json(result.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      image: track.album.images[0].url,
      uri: track.uri
    })));
  } else if (body.type === 'add' && body.track) {
    const track = body.track;
    await sdk.playlists.addItemsToPlaylist('4zwBZLUYAPhufZ5Vpp4Jak', [track.uri]);
    return NextResponse.json({success: true});
  }
}