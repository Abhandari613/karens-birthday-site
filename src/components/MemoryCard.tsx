import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import type { Submission } from "@/lib/types";
import { useState } from "react";

interface MemoryCardProps {
    submission: Submission;
}

export default function MemoryCard({ submission }: MemoryCardProps) {
    const hasMedia = submission.media_url !== null;
    const isVideo = submission.media_type === "video";
    const dateStr = submission.created_at ? formatDistanceToNow(new Date(submission.created_at), { addSuffix: true }) : '';

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent opening the lightbox
        if (!confirm("Are you sure you want to delete this memory? This cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const res = await fetch("/api/submissions/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: submission.id })
            });
            if (!res.ok) {
                alert("Failed to delete memory.");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting memory.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>

            {/* Quick Delete Button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`absolute top-3 left-3 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border shadow-md backdrop-blur-md
                    ${isDeleting
                        ? 'bg-red-500/50 text-white border-red-500/50'
                        : 'bg-black/50 text-white/70 border-white/10 hover:bg-red-500/80 hover:text-white hover:border-red-500/50 opacity-0 group-hover:opacity-100'}
                `}
                title="Delete Memory"
            >
                {isDeleting ? (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                ) : (
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                )}
            </button>

            {/* Media Layer */}
            {hasMedia && (
                <div className="relative w-full overflow-hidden bg-black/40">
                    {isVideo ? (
                        <video
                            src={submission.media_url!}
                            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={submission.media_url!}
                            alt={`Memory from ${submission.contributor_name}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                    )}

                    {/* Photo Year Badge */}
                    {submission.photo_year && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 flex items-center gap-1 rounded font-bold text-[var(--color-golden-hour)] text-xs shadow-md border border-white/10">
                            <span className="material-symbols-outlined text-[10px]">calendar_month</span>
                            {submission.photo_year}
                        </div>
                    )}
                </div>
            )}

            {/* Content Layer */}
            <div className={`p-4 sm:p-5 relative z-10 ${hasMedia ? 'bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 w-full' : 'bg-[#1a2b54]/40 w-full h-full min-h-[150px] flex flex-col justify-center'}`}>

                {submission.message && (
                    <p className={`text-white/90 text-sm sm:text-base leading-relaxed mb-3 ${hasMedia ? 'line-clamp-3 group-hover:line-clamp-none transition-all' : 'font-hand text-xl sm:text-2xl text-[var(--color-sand-light)]'}`}>
                        &quot;{submission.message}&quot;
                    </p>
                )}

                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-terracotta-soft)] to-[var(--color-terracotta-warm)] flex items-center justify-center text-white font-bold text-sm shadow-inner border border-white/20">
                            {submission.contributor_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-[var(--color-golden-hour)] font-semibold text-sm drop-shadow-md">
                                {submission.contributor_name}
                            </p>
                            <p className="text-white/50 text-[10px] uppercase font-bold tracking-wider">
                                {dateStr}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
