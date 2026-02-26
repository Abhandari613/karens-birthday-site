import Link from "next/link";
import SpotifySearch from "@/components/SpotifySearch";
import SpotifyPlayer from "@/components/SpotifyPlayer";

export default function MusicPage() {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-transparent">

            <main className="relative z-10 flex-grow flex flex-col items-center px-4 sm:px-6 py-12 w-full max-w-5xl mx-auto">
                <div className="w-full flex justify-start mb-8 pt-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-sand-light)] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        <span className="text-sm font-medium tracking-wide uppercase">Home</span>
                    </Link>
                </div>

                <div className="text-center mb-10 animate-fade-in-down w-full">
                    <h1 className="font-script text-[4rem] sm:text-[6rem] leading-[0.8] text-[var(--color-golden-hour)] text-shadow-soft drop-shadow-lg inline-block w-fit mb-4 mt-4">
                        La Playlist
                    </h1>
                    <p className="font-sans text-lg sm:text-xl text-white/90 font-light tracking-wide drop-shadow-md max-w-xl mx-auto italic">
                        Every great memory has a soundtrack. Add the songs that remind you of Karen to the official 40th Birthday mix.
                    </p>
                </div>

                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-fade-in-up pb-20">

                    {/* Left side: Search and Add */}
                    <div className="w-full">
                        <SpotifySearch />
                    </div>

                    {/* Right side: Embedded Player */}
                    <div className="w-full flex flex-col gap-4">
                        <SpotifyPlayer />

                        <div className="bg-gradient-to-br from-[var(--color-terracotta-warm)]/20 to-transparent border border-[var(--color-terracotta-soft)]/30 rounded-2xl p-6 backdrop-blur-md mt-4 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-golden-hour)]/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                            <h4 className="text-[var(--color-sand-light)] font-bold mb-3 flex items-center gap-2 text-lg relative z-10">
                                <span className="material-symbols-outlined text-[var(--color-golden-hour)] animate-pulse">favorite</span>
                                Soundtrack her 40th
                            </h4>
                            <p className="text-white/80 leading-relaxed font-light relative z-10 text-[15px]">
                                Think of a song that makes you smile, dance, or think of Karen. Search for it, add it to the playlist, and let's build the ultimate birthday mix together. Every track is a memory shared!
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
