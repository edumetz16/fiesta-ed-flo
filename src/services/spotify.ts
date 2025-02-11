import { getItem, setItem } from "./edge";

export const getOrUpdateAccessToken = async () => {
  const access_token = (await getItem('spotifyAccessToken')) as string;
  const expires_at = (await getItem('spotifyAccessTokenExpiresAt')) as string;
  const refresh_token = (await getItem('spotifyRefreshToken')) as string;
  if(!access_token || !expires_at || !refresh_token) return null;
  if (access_token && parseInt(expires_at) < (new Date()).getTime() && refresh_token) {
    return {
      access_token,
      refresh_token,
      expires_in: 3600,
      expires: parseInt(expires_at),
      token_type: 'Bearer'
    };
  }
  const authString: string = Buffer.from((process.env.SPOTIFY_CLIENT_ID! + ':' + process.env.SPOTIFY_CLIENT_SECRET!) as string).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + authString
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })
  });
  const data = await response.json();
  setItem('spotifyAccessToken', data.access_token);
  setItem('spotifyAccessTokenExpiresAt', ((new Date()).getTime() + data.expires_in * 1000).toString());
  setItem('spotifyRefreshToken', data.refresh_token);
  return data;
}

export const setAccessToken = async (code: string) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    })
  });

  const data = await response.json();
  setItem('spotifyAccessToken', data.access_token);
  setItem('spotifyAccessTokenExpiresAt', ((new Date()).getTime() + data.expires_in * 1000).toString());
  setItem('spotifyRefreshToken', data.refresh_token);
}
