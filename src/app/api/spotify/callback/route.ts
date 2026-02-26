import { NextResponse } from "next/server";
import querystring from "querystring";
import { setAppSetting } from "@/lib/services/database";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        return NextResponse.json(
            { error: "Missing Spotify credentials in environment." },
            { status: 500 }
        );
    }

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
            },
            body: querystring.stringify({
                code: code,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("Spotify Token Error:", data);
            return NextResponse.json({ error: data.error }, { status: 400 });
        }

        if (data.refresh_token) {
            // Store the refresh token securely in our app settings
            // Note: We bypass RLS here by using the service role key if available, 
            // but since this is an API route, we should assume the admin initiated this.
            const res = await setAppSetting('spotify_refresh_token', data.refresh_token);
            if (res.error) {
                console.error("Failed to save refresh token to DB", res.error);
            }
        }

        // Redirect to the homepage or a success page
        return NextResponse.redirect(new URL("/?spotify=authorized", request.url));

    } catch (error) {
        console.error("Spotify Auth Callback Error:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}
