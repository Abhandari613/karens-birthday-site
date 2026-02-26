"use client";

import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
    const [playlistId, setPlaylistId] = useState<string | null>(null);

    useEffect(() => {
        // Expose playlistId to the client securely by fetching it or passing via env
        // Since NEXT_PUBLIC_ is needed for client access, we might just use an API route to get it,
        // or the user should add NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID.
        // Let's assume the user added NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID
        const pid = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID;
        if (pid) setPlaylistId(pid);
    }, []);

    if (!playlistId) {
        return (
            <div className="w-full h-[152px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50 text-sm">
                Playlist ID not configured
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <iframe
                title="Spotify Embed: Recommendation Playlist"
                src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl shadow-2xl border border-white/10"
            ></iframe>
        </div>
    );
}
