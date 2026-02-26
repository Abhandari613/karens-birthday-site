import { NextResponse } from "next/server";
import { addTrackToPlaylist } from "@/lib/services/spotify";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { uri } = body;

        if (!uri) {
            return NextResponse.json({ error: "Missing track 'uri' in body" }, { status: 400 });
        }

        const success = await addTrackToPlaylist(uri);

        return NextResponse.json({ success });
    } catch (error: unknown) {
        console.error("Add Track Route Error:", error);
        return NextResponse.json({
            error: "Failed to add track",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
