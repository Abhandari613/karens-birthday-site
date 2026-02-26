import Countdown from "@/components/Countdown";
import Link from "next/link";
import Image from "next/image";
import MemoryWall from "@/components/MemoryWall";

export default function Home() {
  return (
    <div className="flex flex-col relative w-full overflow-x-hidden min-h-screen bg-transparent">

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="relative min-h-[100svh] flex flex-col w-full">

        {/* Decorative Leaves */}
        <div className="absolute bottom-0 left-0 z-0 w-64 h-64 opacity-90 pointer-events-none transform -translate-x-16 translate-y-16 rotate-12">
          <Image
            alt="Plantain Leaf Left"
            className="w-full h-full object-contain mix-blend-overlay drop-shadow-xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBx4KXTy36Dfa8pcgpB0wrTR2OZoIQjIEpnnlDsDtJaQNE3wsfqnu8HJ4TMOLLDas3XlT8xeVn4zXbRvS3Y7oLKVdGmmXxqLHaa7ZN-YjuOZjQXgQ9dn820bfHsnrrARdu9brFLedQHTGYVmA7Imfi7PSZRKlHHdKGFtmWWVZtl2wT52X_EOBfi9kOi7tRIADhEh6NskxhCp1NeDlCzrLe2KnwSrXlay8nAbyh3-xqLSewom4oaaB4fxFqTQa0GmufrM9LiSN9rQtT"
            fill
            unoptimized
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0 w-64 h-64 opacity-90 pointer-events-none transform translate-x-16 translate-y-16 -rotate-90 scale-x-[-1]">
          <Image
            alt="Plantain Leaf Right"
            className="w-full h-full object-contain mix-blend-overlay drop-shadow-xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBx4KXTy36Dfa8pcgpB0wrTR2OZoIQjIEpnnlDsDtJaQNE3wsfqnu8HJ4TMOLLDas3XlT8xeVn4zXbRvS3Y7oLKVdGmmXxqLHaa7ZN-YjuOZjQXgQ9dn820bfHsnrrARdu9brFLedQHTGYVmA7Imfi7PSZRKlHHdKGFtmWWVZtl2wT52X_EOBfi9kOi7tRIADhEh6NskxhCp1NeDlCzrLe2KnwSrXlay8nAbyh3-xqLSewom4oaaB4fxFqTQa0GmufrM9LiSN9rQtT"
            fill
            unoptimized
          />
        </div>
        <div className="absolute top-0 right-0 z-0 w-64 h-64 opacity-60 pointer-events-none transform translate-x-20 -translate-y-20">
          <Image
            alt="Foliage Top Right"
            className="w-full h-full object-cover rounded-full mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwbuzBw_xbwa7K3dDH7yPtmoXVld2Y3j4rct6GbgIU2ZKJXxKSY5UceNypne5TY73tpgYWF46o9gFHdp1wpDD98W7sNcoemI-xzCmnAgdyHqDP1X4RFi5lPS8tTAReyuuxuAZNyurZIeOmTpx1d9uyzmD1u7o_VZIag1YhRrp3IalF_MGOio2x9Wss0fMNmE973mhC54tG0TjZHvBkVLJDh1MZh6nsOeuYaUrysWDiS8tKZEK_wdmRI9yUDf50hlZljdCKkI2ZIMb_"
            fill
            unoptimized
          />
        </div>
        <div className="absolute top-0 left-0 z-0 w-80 h-80 opacity-40 pointer-events-none transform -translate-x-24 -translate-y-16 rotate-[120deg] scale-x-[-1]">
          <Image
            alt="Plantain Leaf Top Left"
            className="w-full h-full object-contain mix-blend-overlay drop-shadow-xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBx4KXTy36Dfa8pcgpB0wrTR2OZoIQjIEpnnlDsDtJaQNE3wsfqnu8HJ4TMOLLDas3XlT8xeVn4zXbRvS3Y7oLKVdGmmXxqLHaa7ZN-YjuOZjQXgQ9dn820bfHsnrrARdu9brFLedQHTGYVmA7Imfi7PSZRKlHHdKGFtmWWVZtl2wT52X_EOBfi9kOi7tRIADhEh6NskxhCp1NeDlCzrLe2KnwSrXlay8nAbyh3-xqLSewom4oaaB4fxFqTQa0GmufrM9LiSN9rQtT"
            fill
            unoptimized
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--color-indigo-dark)] to-transparent z-10 pointer-events-none"></div>

        <main className="relative z-20 flex-grow flex flex-col justify-center items-center px-6 py-12 pb-24 text-center h-full">
          <div className="mb-8 animate-fade-in-down mt-12 w-full max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center space-x-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-[var(--color-golden-hour)]/50 backdrop-blur-sm shadow-[0_0_15px_rgba(255,202,40,0.2)]">
              <span className="text-xl">👑</span>
              <span className="text-sm font-semibold tracking-wider text-[var(--color-golden-hour)] uppercase">Celebrating 40 Years of Magic</span>
            </div>

            <h1 className="font-script text-[6rem] sm:text-[8rem] leading-[0.8] text-[var(--color-golden-hour)] text-shadow-soft transform -rotate-3 mb-2 drop-shadow-lg mx-auto w-fit">
              Karen&apos;s
            </h1>

            <div className="relative inline-flex flex-wrap items-center justify-center mt-2 w-full gap-4">
              <span className="font-hand text-[4.5rem] sm:text-[6rem] text-white font-bold leading-none text-shadow-glow">
                40th
              </span>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/20 rounded-full border border-white/40 shadow-lg backdrop-blur-sm transform rotate-6 flex-shrink-0">
                <span className="material-symbols-outlined text-[var(--color-sand-light)] text-4xl sm:text-5xl drop-shadow-md">
                  local_florist
                </span>
              </div>
            </div>
          </div>

          <div className="mb-10 max-w-sm sm:max-w-md mx-auto w-full px-4">
            <p className="font-hand text-3xl sm:text-4xl text-[var(--color-sand-light)] italic opacity-95 leading-tight drop-shadow-md">
              &quot;Debí tirar más fotos...&quot; <br />
              <span className="text-lg sm:text-xl not-italic font-sans text-white/90 mt-3 block font-light">But tonight, we make history.</span>
            </p>
          </div>

          <div className="w-full max-w-md sm:max-w-lg mb-12 relative group mx-auto px-4">
            <div className="glass-panel rounded-2xl p-6 shadow-2xl relative z-20 w-full overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0 rounded-b-2xl"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-20 bg-black/20 blur-xl rounded-t-full z-0"></div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <h3 className="uppercase text-xs sm:text-sm font-bold tracking-[0.2em] mb-6 text-[var(--color-terracotta-soft)] flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-golden-hour)] animate-pulse"></span>
                  Countdown to the Fiesta
                  <span className="w-2 h-2 rounded-full bg-[var(--color-golden-hour)] animate-pulse"></span>
                </h3>
                <div className="w-full flex justify-center scale-90 sm:scale-100 origin-center">
                  <Countdown />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center max-w-xs sm:max-w-sm space-y-4 relative z-20 mx-auto px-4 mt-4">
            <Link href="/submit" className="w-full group relative bg-[var(--color-terracotta-warm)] hover:bg-[var(--color-terracotta-soft)] text-white font-bold py-4 px-8 rounded-xl shadow-[0_10px_20px_rgba(230,74,25,0.3)] transform transition-all hover:scale-105 overflow-hidden border border-[var(--color-terracotta-soft)] flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="flex items-center gap-2 justify-center">
                <span className="material-symbols-outlined animate-bounce">celebration</span>
                <span className="text-lg tracking-wide text-shadow-soft uppercase">Share a Memory</span>
              </div>
            </Link>
            <div className="flex gap-4 w-full">
              <a href="#wall" className="flex-1 bg-white/5 hover:bg-white/10 text-[var(--color-sand-light)] font-medium py-3 px-4 rounded-xl backdrop-blur-md border border-[var(--color-golden-hour)]/30 transition-colors text-sm flex items-center justify-center gap-2 shadow-lg group">
                <span className="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">arrow_downward</span>
                View Wall
              </a>
              <Link href="/music" className="flex-1 bg-white/5 hover:bg-white/10 text-[var(--color-golden-hour)] font-medium py-3 px-4 rounded-xl backdrop-blur-md border border-[var(--color-golden-hour)]/30 transition-colors text-sm flex items-center justify-center gap-2 shadow-lg group">
                <span className="material-symbols-outlined text-sm group-hover:animate-pulse">music_note</span>
                Spotify
              </Link>
            </div>
          </div>
        </main>
      </section>

      {/* =========================================
          LIVE WALL SECTION
      ========================================= */}
      <section id="wall" className="relative z-20 w-full bg-[var(--color-indigo-dark)] px-4 sm:px-6 py-16 pb-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-script text-[4rem] sm:text-[5rem] leading-[0.8] text-[var(--color-golden-hour)] text-shadow-soft transform -rotate-2 drop-shadow-lg inline-block w-fit mb-4">
              Recuerdos
            </h2>
            <p className="font-hand text-2xl sm:text-3xl text-white/90 italic opacity-95 drop-shadow-md">
              Karen's 40 Years of Memories
            </p>
            <p className="text-white/60 text-sm mt-4 font-sans tracking-wide">
              Live from the submissions!
            </p>
          </div>

          <MemoryWall />

          <div className="mt-16 flex justify-center">
            <Link href="/timeline" className="inline-flex items-center gap-3 bg-[var(--color-sand-light)] hover:bg-white text-[var(--color-indigo-dark)] px-8 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(255,236,179,0.3)] hover:shadow-[0_0_30px_rgba(255,236,179,0.5)] font-bold tracking-wide uppercase">
              <span className="material-symbols-outlined">timeline</span>
              View as Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          FLOATING GLOBAL CTA
      ========================================= */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
        <Link href="/submit" className="group flex items-center justify-center w-14 h-14 sm:w-auto sm:h-auto sm:px-6 sm:py-3.5 bg-[var(--color-terracotta-warm)] hover:bg-[var(--color-terracotta-soft)] text-white rounded-full shadow-[0_0_30px_rgba(230,74,25,0.6)] border border-[var(--color-terracotta-soft)] transition-all hover:scale-105 active:scale-95 backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span className="material-symbols-outlined text-2xl sm:text-lg sm:mr-2">add_photo_alternate</span>
          <span className="hidden sm:inline font-bold tracking-wider uppercase text-sm drop-shadow-md">Share Here</span>
        </Link>
      </div>

    </div>
  );
}
