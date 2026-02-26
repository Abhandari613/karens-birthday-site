'use client';

import { useRef, useState, useEffect } from 'react';

const TRACK_ID = '3sK8wGT43QFpWrvNQsrQya';
// autoplay=1 activates playback once the browser allows it (after user gesture)
const EMBED_SRC = `https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&autoplay=1&theme=0`;

export default function BackgroundMusic() {
    const [dismissed, setDismissed] = useState(false);
    const [activated, setActivated] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Browsers block autoplay until the first user gesture.
    // Listen for any click/keydown and mark as activated.
    useEffect(() => {
        const activate = () => setActivated(true);
        window.addEventListener('click', activate, { once: true });
        window.addEventListener('keydown', activate, { once: true });
        return () => {
            window.removeEventListener('click', activate);
            window.removeEventListener('keydown', activate);
        };
    }, []);

    if (dismissed) return null;

    return (
        <>
            {/* ── Hidden Spotify iframe ─────────────────────────────────── */}
            {/* Must be rendered (not display:none) for autoplay to function */}
            <iframe
                ref={iframeRef}
                src={EMBED_SRC}
                width="1"
                height="1"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title="Background Music Player"
                style={{
                    position: 'fixed',
                    bottom: '-2px',
                    left: '-2px',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />

            {/* ── Floating now-playing pill ─────────────────────────────── */}
            <div
                className="fixed bottom-6 left-6 z-50 animate-fade-in-up"
                style={{ animationDelay: '2.5s', animationFillMode: 'both' }}
            >
                <div className={`flex items-center gap-3 px-2 py-2 pr-4 bg-black/40 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all duration-500 border ${activated ? 'border-[var(--color-golden-hour)]/50' : 'border-white/10'}`}>

                    {activated && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-golden-hour)]/10 to-transparent animate-pulse pointer-events-none" />
                    )}

                    {/* Spotify green circle */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1DB954] shadow-inner z-10 flex-shrink-0">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.47-.077-.334.132-.67.47-.745 3.808-.87 7.076-.496 9.712 1.115.293.18.386.563.207.856zm1.223-2.723c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.131-9.965-1.166-.413.127-.848-.106-.973-.517-.125-.413.108-.848.52-.973 3.632-1.102 8.147-.568 11.233 1.328.366.226.48.707.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156-.494.15-1.017-.128-1.167-.625-.149-.494.13-1.016.625-1.167 3.532-1.073 9.404-.866 13.115 1.338.445.264.59.838.327 1.282-.264.443-.838.59-1.282.326z" />
                        </svg>
                    </div>

                    {/* Track info */}
                    <div className="flex flex-col items-start z-10">
                        <span className={`text-[11px] font-bold uppercase tracking-[0.15em] leading-tight transition-colors duration-500 ${activated ? 'text-[var(--color-golden-hour)]' : 'text-white/60'}`}>
                            DtMF
                        </span>
                        <span className="text-[9px] text-white/50 tracking-wider font-light">
                            {activated ? 'Bad Bunny · Playing' : 'Bad Bunny · Tap anywhere'}
                        </span>
                    </div>

                    {/* Animated bars when playing */}
                    {activated && (
                        <div className="flex items-end gap-[2px] h-3 ml-1 opacity-70 z-10">
                            <div className="w-0.5 bg-[var(--color-golden-hour)] animate-[musicBar_1s_ease-in-out_infinite]" />
                            <div className="w-0.5 bg-[var(--color-golden-hour)] animate-[musicBar_1.2s_ease-in-out_infinite_0.2s]" />
                            <div className="w-0.5 bg-[var(--color-golden-hour)] animate-[musicBar_0.8s_ease-in-out_infinite_0.4s]" />
                        </div>
                    )}

                    {/* Dismiss button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
                        className="ml-1 text-white/30 hover:text-white/70 transition-colors z-10 text-[10px] leading-none"
                        aria-label="Dismiss music player"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes musicBar {
            0%, 100% { height: 4px; }
            50% { height: 12px; }
          }
        `
            }} />
        </>
    );
}
