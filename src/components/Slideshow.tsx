"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/services/supabaseClient";

interface Submission {
    id: string;
    contributor_name: string;
    message: string | null;
    media_url: string | null;
    media_type: 'photo' | 'video' | 'none';
}

export default function Slideshow() {
    const [slides, setSlides] = useState<Submission[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSlides() {
            const { data, error } = await supabase
                .from('submissions')
                .select('*')
                .eq('media_type', 'photo')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Failed to fetch slides:", error);
            } else if (data) {
                // To make the slideshow more interesting, shuffle the slides
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                setSlides(shuffled);
            }
            setLoading(false);
        }

        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 8000); // 8 seconds per slide

        return () => clearInterval(interval);
    }, [slides.length]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-12 h-12 border-4 border-[var(--color-golden-hour)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (slides.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white p-8 text-center">
                <div>
                    <span className="material-symbols-outlined text-6xl text-[var(--color-golden-hour)] animate-pulse mb-4">photo_library</span>
                    <h1 className="text-3xl font-script text-[var(--color-golden-hour)]">No photos yet...</h1>
                    <p className="opacity-70 mt-4">Be the first to share a memory!</p>
                </div>
            </div>
        );
    }

    const currentSlide = slides[currentIndex];

    // Build the public URL for the media
    const mediaUrl = currentSlide.media_url
        ? supabase.storage.from('media').getPublicUrl(currentSlide.media_url).data.publicUrl
        : null;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center cursor-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {mediaUrl && (
                        <>
                            {/* Background Blur for aspect ratio fill */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl transform scale-110"
                                style={{ backgroundImage: `url(${mediaUrl})` }}
                            />

                            {/* Main Image */}
                            <img
                                src={mediaUrl}
                                alt="Memory"
                                className="absolute inset-0 w-full h-full object-contain z-10"
                            />
                        </>
                    )}

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none"></div>

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-30 pointer-events-none flex flex-col items-center text-center">
                        {currentSlide.message && (
                            <p className="text-white text-3xl md:text-5xl lg:text-6xl font-script drop-shadow-2xl mb-6 max-w-4xl leading-tight">
                                &quot;{currentSlide.message}&quot;
                            </p>
                        )}
                        <p className="text-[var(--color-golden-hour)] text-xl md:text-2xl font-bold tracking-widest uppercase drop-shadow-lg flex items-center gap-3">
                            <span className="w-8 h-px bg-[var(--color-golden-hour)]/50"></span>
                            {currentSlide.contributor_name}
                            <span className="w-8 h-px bg-[var(--color-golden-hour)]/50"></span>
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Subtle Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
                <motion.div
                    key={currentIndex}
                    className="h-full bg-[var(--color-golden-hour)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                />
            </div>
        </div>
    );
}
