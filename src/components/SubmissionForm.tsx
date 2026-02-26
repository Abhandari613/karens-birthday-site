"use client";

import { useState } from "react";
import Link from "next/link";
import exifr from "exifr";
import { uploadMedia } from "@/lib/services/storage";
import { createSubmission } from "@/lib/services/database";

export default function SubmissionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [year, setYear] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setErrorMsg("");

        try {
            let media_url = null;
            let media_type: "photo" | "video" | "none" = "none";
            let exif_date: string | null = null;

            if (file) {
                // Determine type
                if (file.type.startsWith("image/")) {
                    media_type = "photo";
                    try {
                        const parsed = await exifr.parse(file);
                        if (parsed?.DateTimeOriginal) {
                            exif_date = new Date(parsed.DateTimeOriginal).toISOString();
                        }
                    } catch (exifErr) {
                        console.warn("Could not parse EXIF:", exifErr);
                    }
                } else if (file.type.startsWith("video/")) {
                    media_type = "video";
                }

                // Upload
                const path = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
                const uploadResult = await uploadMedia(file, path);
                if (uploadResult.error || !uploadResult.url) {
                    throw new Error(uploadResult.error?.message || "Failed to upload file. Please try again or use a smaller file.");
                }
                media_url = uploadResult.url;
            }

            const submissionData = {
                contributor_name: name.trim(),
                message: message.trim() || null,
                media_url,
                media_type,
                photo_year: year ? parseInt(year, 10) : null,
                exif_date,
            };

            const dbResult = await createSubmission(submissionData);
            if (dbResult.error) {
                throw new Error(dbResult.error.message || "Failed to save memory.");
            }

            setSuccess(true);
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-[var(--color-forest-lush)] text-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h2 className="text-2xl font-hand text-[var(--color-golden-hour)] drop-shadow-md">¡Gracias!</h2>
                <p className="text-white/90 mb-4">Your memory has been added! 🎉</p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
                    <Link
                        href="/#wall"
                        className="flex-1 px-4 py-3 bg-[var(--color-terracotta-warm)] hover:bg-[var(--color-terracotta-soft)] text-white rounded-xl transition-all border border-[var(--color-terracotta-soft)] shadow-[0_0_15px_rgba(230,74,25,0.4)] text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">grid_view</span>
                        View Wall
                    </Link>
                    <Link
                        href="/timeline"
                        className="flex-1 px-4 py-3 bg-black/30 hover:bg-black/50 text-white rounded-xl transition-all border border-white/20 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">timeline</span>
                        Timeline
                    </Link>
                </div>

                <button
                    onClick={() => {
                        setSuccess(false);
                        setName("");
                        setMessage("");
                        setYear("");
                        setFile(null);
                    }}
                    className="mt-6 text-sm text-[var(--color-sand-light)] hover:text-white underline decoration-[var(--color-sand-light)]/50 transition-colors pt-2"
                >
                    Add Another Memory
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl relative z-20">

            {errorMsg && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                    {errorMsg}
                </div>
            )}

            <div className="space-y-1">
                <label className="text-sm font-semibold text-[var(--color-sand-light)] tracking-wide ml-1">Your Name *</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maria"
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-golden-hour)] focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-[var(--color-sand-light)] tracking-wide ml-1">Upload Photo or Video</label>
                <div className="relative group">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-black/30 border-2 border-dashed border-white/30 group-hover:border-[var(--color-golden-hour)] rounded-xl px-4 py-8 text-center transition-all flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[var(--color-golden-hour)] text-3xl opacity-80">cloud_upload</span>
                        <span className="text-white/70 text-sm">
                            {file ? file.name : "Tap to select a file from your device"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-[var(--color-sand-light)] tracking-wide ml-1">Photo Year (Optional)</label>
                <input
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2015"
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-golden-hour)] focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-[var(--color-sand-light)] tracking-wide ml-1">Message or Memory</label>
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a funny story, a sweet note, or just wish her happy birthday!"
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-golden-hour)] focus:border-transparent transition-all resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || (!name.trim() && !file)}
                className="w-full mt-2 relative bg-[var(--color-terracotta-warm)] hover:bg-[var(--color-terracotta-soft)] disabled:bg-black/40 disabled:text-white/40 disabled:border-transparent disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl shadow-[0_10px_20px_rgba(230,74,25,0.3)] disabled:shadow-none transform transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 overflow-hidden border border-[var(--color-terracotta-soft)] flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Uploading...</span>
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined font-light">send</span>
                        <span>Send to Karen</span>
                    </>
                )}
            </button>
        </form>
    );
}
