import { NextResponse } from "next/server";
import querystring from "querystring";

export async function GET() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        return NextResponse.json(
            { error: "Missing Spotify credentials in environment." },
            { status: 500 }
        );
    }

    const scope = "playlist-modify-public playlist-modify-private";

    const authUrl = "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
        });

    return NextResponse.redirect(authUrl);
}
