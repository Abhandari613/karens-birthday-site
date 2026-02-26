import { NextResponse } from "next/server";
import { searchTracks } from "@/lib/services/spotify";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: "Missing query parameter 'q'" }, { status: 400 });
    }

    try {
        const results = await searchTracks(query);
        return NextResponse.json({ data: results });
    } catch (error: unknown) {
        console.error("Search Route Error:", error);
        return NextResponse.json({
            error: "Failed to search tracks",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
