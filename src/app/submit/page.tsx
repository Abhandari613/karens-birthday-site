import SubmissionForm from "@/components/SubmissionForm";
import Link from "next/link";

export default function SubmitPage() {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden overflow-y-auto bg-transparent">

            <nav className="relative z-20 flex justify-between items-center p-6 w-full max-w-2xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                    <span className="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="font-medium tracking-wide">Back to Home</span>
                </Link>
            </nav>

            <main className="relative z-10 flex-grow flex flex-col items-center px-4 md:px-6 pb-20 pt-2 w-full max-w-xl mx-auto">
                <div className="mb-6 text-center animate-fade-in-down w-full px-2">
                    <h1 className="font-hand text-[3rem] sm:text-[4rem] leading-none text-[var(--color-golden-hour)] text-shadow-soft drop-shadow-md mb-2">
                        Share a Memory
                    </h1>
                    <p className="text-white/90 text-[15px] sm:text-base font-medium font-sans">
                        Upload a photo, a video, or just leave a little note for Karen's 40th.
                    </p>
                </div>

                <div className="w-full relative z-20 mb-8 mt-2">
                    <SubmissionForm />
                </div>
            </main>
        </div>
    );
}
