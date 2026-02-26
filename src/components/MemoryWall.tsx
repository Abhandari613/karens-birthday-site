"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { fetchSubmissions, subscribeToSubmissions } from "@/lib/services/database";
import type { Submission } from "@/lib/types";
import MemoryCard from "./MemoryCard";
import Lightbox from "./Lightbox";

function getYear(s: Submission): string {
    if (s.photo_year) return s.photo_year.toString();
    if (s.exif_date) return new Date(s.exif_date).getFullYear().toString();
    return "Undated";
}

function getYearNum(s: Submission): number {
    if (s.photo_year) return s.photo_year;
    if (s.exif_date) return new Date(s.exif_date).getFullYear();
    return 9999;
}

export default function MemoryWall() {
    const [groupedSubmissions, setGroupedSubmissions] = useState<[string, Submission[]][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        async function loadSubmissions() {
            setIsLoading(true);
            const { data, error } = await fetchSubmissions();
            if (error) {
                console.error("Error fetching submissions:", error);
                setError("Failed to load memories. Please try again later.");
            } else if (data) {
                // Sort by year descending (newest first), then by created_at within each year
                const sorted = [...data].sort((a, b) => {
                    const yearDiff = getYearNum(b) - getYearNum(a);
                    if (yearDiff !== 0) return yearDiff;
                    return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
                });

                // Group by year
                const groups = new Map<string, Submission[]>();
                for (const s of sorted) {
                    const yr = getYear(s);
                    if (!groups.has(yr)) groups.set(yr, []);
                    groups.get(yr)!.push(s);
                }

                setGroupedSubmissions(Array.from(groups));
            }
            setIsLoading(false);
        }

        loadSubmissions();

        const unsubscribe = subscribeToSubmissions(() => {
            loadSubmissions();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const breakpointColumnsObj = {
        default: 3,
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

    if (groupedSubmissions.length === 0) {
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
            {groupedSubmissions.map(([year, items]) => (
                <div key={year} className="mb-16 last:mb-0">
                    {/* Year divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-golden-hour)]/30" />
                        <div className="bg-black/30 backdrop-blur-md border border-[var(--color-golden-hour)]/40 px-5 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,202,40,0.15)]">
                            <span className="text-[var(--color-golden-hour)] font-bold text-lg tracking-wide">
                                {year === "Undated" ? "Timeless" : year}
                            </span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-golden-hour)]/30" />
                    </div>

                    {/* Masonry grid for this year */}
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-4 sm:-ml-6"
                        columnClassName="pl-4 sm:pl-6 bg-clip-padding"
                    >
                        {items.map((submission) => (
                            <div key={submission.id} className="mb-4 sm:mb-6 cursor-pointer" onClick={() => setSelectedSubmission(submission)}>
                                <MemoryCard submission={submission} />
                            </div>
                        ))}
                    </Masonry>
                </div>
            ))}

            {selectedSubmission && (
                <Lightbox
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
        </>
    );
}
