import { NextRequest, NextResponse } from "next/server";
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const sdk = SpotifyApi.withClientCredentials("692566c1bd8445cdb21c6bb69e3da0ec", "8103c6ffdb07412f9a0c089611ebe920" , ['playlist-read-private','playlist-modify-private','playlist-modify-public','user-read-email','playlist-read-collaborative']);
  
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
    const sdk = SpotifyApi.withClientCredentials("692566c1bd8445cdb21c6bb69e3da0ec", "8103c6ffdb07412f9a0c089611ebe920" , ['playlist-read-private','playlist-modify-private','playlist-modify-public','user-read-email','playlist-read-collaborative']);
    const track = body.track;
    await sdk.playlists.addItemsToPlaylist('4zwBZLUYAPhufZ5Vpp4Jak', [track.uri]);
    return NextResponse.json({success: true});
  }
}