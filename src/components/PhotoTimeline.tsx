"use client";

import { useEffect, useState } from "react";
import { fetchSubmissions, subscribeToSubmissions } from "@/lib/services/database";
import type { Submission } from "@/lib/types";
import { group } from "d3-array";
import MemoryCard from "./MemoryCard";
import Lightbox from "./Lightbox";

interface GroupedSubmissions {
    [year: string]: Submission[];
}

export default function PhotoTimeline() {
    const [groupedSubmissions, setGroupedSubmissions] = useState<[string, Submission[]][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const { data, error } = await fetchSubmissions();

            if (error) {
                setError("Failed to load timeline.");
            } else if (data) {
                // Include all submissions (photos, videos, and text-only memories)
                const mediaItems = [...data];

                // Sort chronologically ascending (oldest first)
                mediaItems.sort((a, b) => {
                    const getYear = (s: Submission) => {
                        if (s.photo_year) return s.photo_year;
                        if (s.exif_date) return new Date(s.exif_date).getFullYear();
                        return 9999; // "Undated" bucket at the end
                    };
                    return getYear(a) - getYear(b);
                });

                // Group by Year using d3-array
                const grouped = group(mediaItems, s => {
                    if (s.photo_year) return s.photo_year.toString();
                    if (s.exif_date) return new Date(s.exif_date).getFullYear().toString();
                    return "Undated";
                });

                // Convert Map to Array of tuples for easy mapping
                setGroupedSubmissions(Array.from(grouped));
            }
            setIsLoading(false);
        }

        loadData();

        // Setup real-time subscription for changes (like deletes)
        const unsubscribe = subscribeToSubmissions(() => {
            loadData();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center py-20 opacity-70">
                <span className="w-10 h-10 border-4 border-white/20 border-t-[var(--color-sand-light)] rounded-full animate-spin"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-2xl text-center backdrop-blur-sm">
                <p className="text-red-300 font-medium">{error}</p>
            </div>
        );
    }

    if (groupedSubmissions.length === 0) {
        return (
            <div className="text-center p-12 text-white/50">
                No memories found for the timeline yet.
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* The Central Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-golden-hour)]/80 via-white/20 to-transparent transform sm:-translate-x-1/2 rounded"></div>

            {groupedSubmissions.map(([year, items], groupIndex) => (
                <div key={year} className="mb-20 relative z-10">

                    {/* Year Marker */}
                    <div className="flex justify-start sm:justify-center items-center mb-12 sticky top-24 z-20 pl-10 sm:pl-0">
                        <div className="bg-[#1E1B4B] border-2 border-[var(--color-golden-hour)] text-[var(--color-golden-hour)] font-bold text-2xl sm:text-3xl px-6 py-2 rounded-full shadow-[0_0_20px_rgba(255,202,40,0.3)] backdrop-blur-md">
                            {year}
                        </div>
                        {/* Dot on the line */}
                        <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[var(--color-golden-hour)] rounded-full transform -translate-x-1/2 shadow-[0_0_10px_rgba(255,202,40,0.8)] sm:block hidden"></div>
                    </div>

                    {/* Cards for this Year */}
                    <div className="space-y-12">
                        {items.map((submission, index) => {
                            // Determine side for desktop (alternating)
                            const isEven = index % 2 === 0;
                            // On mobile, everything is on the right side of the line

                            return (
                                <div key={submission.id} className="relative w-full flex flex-col sm:flex-row items-center sm:justify-between group/timeline">

                                    {/* Mobile: Connector Line */}
                                    <div className="absolute left-4 w-6 h-[2px] bg-white/20 sm:hidden"></div>

                                    {/* Left Side (Desktop: Content if Even, Empty if Odd. Mobile: Always zero width) */}
                                    <div className={`sm:w-1/2 pr-0 pt-8 sm:pt-0 sm:pr-10 flex ${isEven ? 'sm:justify-end' : 'sm:invisible'} w-full pl-12 sm:pl-0`}>
                                        <div className={`w-full sm:max-w-md cursor-pointer transform transition-transform hover:scale-105 ${!isEven ? 'sm:hidden' : ''}`} onClick={() => setSelectedSubmission(submission)}>
                                            <MemoryCard submission={submission} />
                                        </div>
                                    </div>

                                    {/* Center Connector Dot (Desktop only) */}
                                    <div className="absolute left-1/2 w-3 h-3 bg-white/40 group-hover/timeline:bg-[var(--color-sand-light)] rounded-full transform -translate-x-1/2 transition-colors hidden sm:block z-10"></div>
                                    <div className={`absolute left-1/2 w-10 h-[2px] bg-white/20 hidden sm:block ${isEven ? '-translate-x-full' : ''}`}></div>

                                    {/* Right Side (Desktop: Content if Odd, Empty if Even) */}
                                    <div className={`sm:w-1/2 pl-0 sm:pl-10 flex ${!isEven ? 'sm:justify-start' : 'sm:invisible'} hidden sm:flex`}>
                                        {!isEven && (
                                            <div className="w-full max-w-md cursor-pointer transform transition-transform hover:scale-105" onClick={() => setSelectedSubmission(submission)}>
                                                <MemoryCard submission={submission} />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {selectedSubmission && (
                <Lightbox submission={selectedSubmission} onClose={() => setSelectedSubmission(null)} />
            )}
        </div>
    );
}
