import { NextResponse } from "next/server";

const TRACK_ID = "3sK8wGT43QFpWrvNQsrQya"; // DTMF by Bad Bunny

export async function GET() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.json(
            { error: "Spotify credentials not configured" },
            { status: 500 }
        );
    }

    try {
        // Client Credentials flow — no user auth needed
        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(clientId + ":" + clientSecret).toString("base64"),
            },
            body: "grant_type=client_credentials",
            cache: "no-store",
        });

        const tokenData = await tokenRes.json();
        if (tokenData.error) {
            return NextResponse.json(
                { error: "Failed to get Spotify token", details: tokenData },
                { status: 500 }
            );
        }

        // Fetch track details including preview_url
        const trackRes = await fetch(
            `https://api.spotify.com/v1/tracks/${TRACK_ID}`,
            {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            }
        );

        const track = await trackRes.json();
        if (track.error) {
            return NextResponse.json(
                { error: "Failed to fetch track", details: track },
                { status: 500 }
            );
        }

        return NextResponse.json({
            preview_url: track.preview_url ?? null,
            name: track.name,
            artist: track.artists?.[0]?.name ?? "Unknown",
        });
    } catch (error: unknown) {
        console.error("Preview Route Error:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Unknown",
            },
            { status: 500 }
        );
    }
}
