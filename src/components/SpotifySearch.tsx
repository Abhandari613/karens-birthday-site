"use client";

import { useState } from "react";

interface SpotifyTrack {
    uri: string;
    id: string;
    name: string;
    artist: string;
    albumArt: string;
}

export default function SpotifySearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SpotifyTrack[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [addedTracks, setAddedTracks] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setError(null);
        try {
            const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data.error) throw new Error(data.error);
            setResults(data.data || []);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to search.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddTrack = async (track: SpotifyTrack) => {
        try {
            const res = await fetch('/api/spotify/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uri: track.uri })
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            // Mark as added
            setAddedTracks(prev => new Set(prev).add(track.id));
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to add track. Maybe the host needs to authorize Spotify?");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-[var(--color-sand-light)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-golden-hour)]">queue_music</span>
                Add a Song
            </h3>

            <form onSubmit={handleSearch} className="relative mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a song or artist..."
                    className="w-full bg-[#0F172A]/80 border border-white/20 rounded-xl py-3 pl-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-golden-hour)] transition-colors"
                />
                <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                    {isSearching ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <span className="material-symbols-outlined text-sm">search</span>
                    )}
                </button>
            </form>

            {error && (
                <div className="mb-4 text-sm text-red-300 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {error}
                </div>
            )}

            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                {results.length > 0 ? (
                    results.map(track => (
                        <div key={track.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-colors">
                            {track.albumArt ? (
                                <img src={track.albumArt} alt={track.albumArt} className="w-12 h-12 rounded object-cover shadow-md" />
                            ) : (
                                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/30">music_note</span>
                                </div>
                            )}
                            <div className="flex-grow overflow-hidden">
                                <p className="text-white text-sm font-semibold truncate">{track.name}</p>
                                <p className="text-white/50 text-xs truncate">{track.artist}</p>
                            </div>
                            <button
                                onClick={() => handleAddTrack(track)}
                                disabled={addedTracks.has(track.id)}
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${addedTracks.has(track.id)
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-[var(--color-golden-hour)] text-[#1E1B4B] hover:bg-[var(--color-sand-light)] shadow-lg'
                                    }`}
                                title="Add to Playlist"
                            >
                                {addedTracks.has(track.id) ? (
                                    <span className="material-symbols-outlined text-sm">check</span>
                                ) : (
                                    <span className="material-symbols-outlined text-sm">add</span>
                                )}
                            </button>
                        </div>
                    ))
                ) : (
                    query && !isSearching && !error && (
                        <p className="text-center text-white/40 text-sm py-4">No results found.</p>
                    )
                )}
            </div>
        </div>
    );
}
