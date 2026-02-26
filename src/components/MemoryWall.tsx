"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { fetchSubmissions, subscribeToSubmissions } from "@/lib/services/database";
import type { Submission } from "@/lib/types";
import MemoryCard from "./MemoryCard";
import Lightbox from "./Lightbox";

export default function MemoryWall() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lightbox State
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        async function loadSubmissions() {
            setIsLoading(true);
            const { data, error } = await fetchSubmissions();
            if (error) {
                console.error("Error fetching submissions:", error);
                setError("Failed to load memories. Please try again later.");
            } else if (data) {
                setSubmissions(data);
            }
            setIsLoading(false);
        }

        loadSubmissions();

        // Setup Real-time subscription for new inserts
        const unsubscribe = subscribeToSubmissions(() => {
            // When a new submission happens, we just refetch everything to ensure correct order
            // This is safe assuming modest scale (~50-200 photos)
            loadSubmissions();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const breakpointColumnsObj = {
        default: 4,
        1280: 3,
        1024: 2,
        640: 1
    };

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 opacity-70">
                <span className="w-10 h-10 border-4 border-white/20 border-t-[var(--color-golden-hour)] rounded-full animate-spin mb-4"></span>
                <p className="text-[var(--color-sand-light)] font-medium tracking-wide animate-pulse uppercase text-sm">Loading memories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-8 bg-red-500/10 border border-red-500/30 rounded-2xl text-center backdrop-blur-sm">
                <p className="text-red-300 font-medium">{error}</p>
            </div>
        );
    }

    if (submissions.length === 0) {
        return (
            <div className="w-full flex-col p-12 bg-white/5 border border-white/10 rounded-3xl text-center backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-golden-hour)] text-5xl mb-4 opacity-50">photo_library</span>
                <h3 className="text-2xl font-hand text-[var(--color-sand-light)] mb-2">The wall is empty.</h3>
                <p className="text-white/60 mb-6">Be the first to share a memory with Karen!</p>
            </div>
        );
    }

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto -ml-4 sm:-ml-6"
                columnClassName="pl-4 sm:pl-6 bg-clip-padding"
            >
                {submissions.map((submission) => (
                    <div key={submission.id} className="mb-4 sm:mb-6 cursor-pointer" onClick={() => setSelectedSubmission(submission)}>
                        <MemoryCard submission={submission} />
                    </div>
                ))}
            </Masonry>

            {/* Fullscreen Lightbox */}
            {selectedSubmission && (
                <Lightbox
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
        </>
    );
}
