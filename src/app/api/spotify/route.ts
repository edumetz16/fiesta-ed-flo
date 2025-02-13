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
    let playlistItems;
    let i = 0;
    let itemAlreadyExists; let total=0;
    do {
      playlistItems = (await sdk.playlists.getPlaylistItems(process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID!, undefined, undefined, 10 ,i));
      total = playlistItems.total;
      i = i + playlistItems.items.length - 1;
      itemAlreadyExists = playlistItems.items.some((item) => item.track.uri === body.track.uri);
      console.log(total, playlistItems.items.length, i, itemAlreadyExists);
    } while (i < total - 1 && !itemAlreadyExists);
    const track = body.track;
    if(itemAlreadyExists) return NextResponse.json({success: true});
    await sdk.playlists.addItemsToPlaylist(process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID!, [track.uri], 0);
    return NextResponse.json({success: true});
  }
}