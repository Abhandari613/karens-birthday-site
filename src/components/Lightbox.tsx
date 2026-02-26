"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Submission } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";

interface LightboxProps {
    submission: Submission;
    onClose: () => void;
}

export default function Lightbox({ submission, onClose }: LightboxProps) {
    const hasMedia = submission.media_url !== null;
    const isVideo = submission.media_type === "video";
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this memory? This cannot be undone.")) return;
        setIsDeleting(true);
        try {
            const res = await fetch("/api/submissions/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: submission.id })
            });
            if (res.ok) {
                onClose();
            } else {
                alert("Failed to delete memory.");
            }
        } catch (e) {
            alert("Error deleting memory.");
        } finally {
            setIsDeleting(false);
        }
    };

    // Prevent scrolling on body when lightbox is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row bg-[#0a1128] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
                    onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors border border-white/20 backdrop-blur-md"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="absolute top-4 left-4 z-20 w-10 h-10 bg-red-500/20 hover:bg-red-500/50 text-red-100 hover:text-white rounded-full flex items-center justify-center transition-colors border border-red-500/30 backdrop-blur-md disabled:opacity-50 shadow-lg"
                        title="Delete Memory"
                    >
                        {isDeleting ? (
                            <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                        ) : (
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                        )}
                    </button>

                    {/* Media Section */}
                    {hasMedia && (
                        <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0">
                            {isVideo ? (
                                <video
                                    src={submission.media_url!}
                                    className="max-w-full max-h-[60vh] md:max-h-[90vh] object-contain"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={submission.media_url!}
                                    alt={`Memory from ${submission.contributor_name}`}
                                    className="max-w-full max-h-[60vh] md:max-h-[90vh] object-contain"
                                />
                            )}
                        </div>
                    )}

                    {/* Text/Meta Section */}
                    <div className={`w-full ${hasMedia ? 'md:w-1/3 border-t md:border-t-0 md:border-l' : 'md:w-full min-h-[400px] items-center justify-center text-center'} border-white/10 p-6 md:p-8 flex flex-col bg-gradient-to-b from-[#121c3b] to-[#0a1128] overflow-y-auto`}>

                        {!hasMedia && (
                            <span className="material-symbols-outlined text-6xl text-[var(--color-golden-hour)] opacity-30 mb-6 drop-shadow-lg">format_quote</span>
                        )}

                        {submission.message && (
                            <div className={`flex-grow ${!hasMedia ? 'flex items-center' : ''}`}>
                                <p className={`text-white/90 leading-relaxed font-light ${!hasMedia ? 'text-3xl font-hand text-[var(--color-sand-light)] drop-shadow-sm' : 'text-lg'}`}>
                                    "{submission.message}"
                                </p>
                            </div>
                        )}

                        <div className={`mt-8 pt-6 border-t border-white/10 flex items-center gap-4 ${!hasMedia ? 'justify-center mx-auto min-w-[300px]' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-terracotta-soft)] to-[var(--color-terracotta-warm)] flex items-center justify-center text-white font-bold text-xl shadow-inner border border-white/20 flex-shrink-0">
                                {submission.contributor_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="text-[var(--color-golden-hour)] font-bold text-lg drop-shadow-md">
                                    {submission.contributor_name}
                                </h4>
                                <p className="text-white/50 text-xs uppercase font-bold tracking-wider flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                    {submission.created_at ? format(new Date(submission.created_at), 'MMM d, yyyy') : 'Unknown Date'}
                                </p>
                            </div>
                        </div>

                        {/* Optional Photo Year / EXIF meta info can go here */}
                        {(submission.photo_year || submission.exif_date) && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {submission.photo_year && (
                                    <span className="bg-white/5 border border-white/10 text-white/70 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                                        Est. {submission.photo_year}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
