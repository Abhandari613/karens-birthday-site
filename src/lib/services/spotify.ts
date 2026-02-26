/**
 * @intent Handle Spotify API interactions, token refreshing, and integration logic.
 * @generated AI-assisted — reviewed and validated against Vendor Isolation rule.
 */
import { getAppSetting, setAppSetting } from './database';
import querystring from 'querystring';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

/**
 * Gets a valid access token. If not cached or expired, uses the refresh token
 * stored in the database to fetch a new one.
 */
export async function getAccessToken(): Promise<string | null> {
    const refreshToken = await getAppSetting('spotify_refresh_token');
    if (!refreshToken) {
        console.error("No Spotify refresh token found in database. User needs to authorize.");
        return null;
    }

    if (!clientId || !clientSecret) return null;

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
            },
            body: querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            cache: 'no-store'
        });

        const data = await response.json();
        if (data.error) {
            console.error("Failed to refresh Spotify token:", data);
            return null;
        }

        // if spotify returns a new refresh token, update it
        if (data.refresh_token && data.refresh_token !== refreshToken) {
            await setAppSetting('spotify_refresh_token', data.refresh_token);
        }

        return data.access_token;
    } catch (err) {
        console.error("Error refreshing Spotify access token:", err);
        return null;
    }
}

export interface SpotifyTrack {
    uri: string;
    id: string;
    name: string;
    artist: string;
    albumArt: string;
}

export async function searchTracks(query: string): Promise<SpotifyTrack[]> {
    const token = await getAccessToken();
    if (!token) throw new Error("Not authenticated with Spotify");

    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(`Spotify Search Error: ${err.error?.message || res.statusText}`);
    }

    const data = await res.json();

    return data.tracks.items.map((item: { uri: string; id: string; name: string; artists: { name: string }[]; album: { images: { url: string }[] } }) => ({
        uri: item.uri,
        id: item.id,
        name: item.name,
        artist: item.artists.map(a => a.name).join(', '),
        albumArt: item.album.images[0]?.url || ''
    }));
}

export async function addTrackToPlaylist(trackUri: string): Promise<boolean> {
    if (!playlistId) throw new Error("SPOTIFY_PLAYLIST_ID not configured");
    const token = await getAccessToken();
    if (!token) throw new Error("Not authenticated with Spotify");

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uris: [trackUri]
        })
    });

    if (!res.ok) {
        const err = await res.json();
        console.error("Failed to add track to Spotify:", err);
        throw new Error(`Spotify Add Error: ${err.error?.message || res.statusText}`);
    }

    return true;
}
