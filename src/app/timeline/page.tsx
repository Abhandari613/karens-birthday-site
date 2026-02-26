import Link from "next/link";
import PhotoTimeline from "@/components/PhotoTimeline";

export default function TimelinePage() {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-transparent">

            <main className="relative z-10 flex-grow flex flex-col items-center px-4 sm:px-6 py-12 w-full max-w-5xl mx-auto">
                <div className="w-full flex justify-between items-center mb-10 pt-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-sand-light)] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        <span className="text-sm font-medium tracking-wide uppercase">Home</span>
                    </Link>

                    <Link href="/#wall" className="inline-flex items-center gap-2 text-[var(--color-golden-hour)] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <span className="text-sm font-medium tracking-wide uppercase">Gallery</span>
                        <span className="material-symbols-outlined text-sm">grid_view</span>
                    </Link>
                </div>

                <div className="text-center mb-16 animate-fade-in-down w-full">
                    <h1 className="font-script text-[4rem] sm:text-[6rem] leading-[0.8] text-[var(--color-sand-light)] text-shadow-soft transform -rotate-2 drop-shadow-lg inline-block w-fit mb-4">
                        The Journey
                    </h1>
                    <p className="font-sans text-lg sm:text-xl text-white/80 font-light tracking-wide drop-shadow-md">
                        40 Years in Photos
                    </p>
                </div>

                {/* The Timeline Component */}
                <div className="w-full animate-fade-in-up pb-20">
                    <PhotoTimeline />
                </div>
            </main>
        </div>
    );
}
