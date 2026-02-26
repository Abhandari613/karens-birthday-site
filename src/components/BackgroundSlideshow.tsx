import Image from "next/image";

export default function BackgroundSlideshow() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-[var(--color-indigo-dark)]/70 z-20 mix-blend-multiply"></div>

            {/* Gradient for smoother blending at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-indigo-dark)]/90 via-transparent to-[var(--color-indigo-dark)]/30 z-20"></div>

            {/* The slideshow container, increased opacity to make it more obvious */}
            <div className="absolute inset-0 w-full h-full z-10 opacity-70">
                <Image
                    src="/images/backgrounds/karen1.jpg"
                    alt="Karen"
                    fill
                    className="object-cover object-[center_30%] animate-[bgFade_48s_linear_infinite_0s] grayscale-[30%] sepia-[0.2] hue-rotate-[340deg] brightness-110"
                    priority
                />
                <Image
                    src="/images/backgrounds/karen2.jpg"
                    alt="Karen"
                    fill
                    className="object-cover object-[center_25%] opacity-0 animate-[bgFade_48s_linear_infinite_8s] grayscale-[30%] sepia-[0.2] hue-rotate-[340deg] brightness-110"
                />
                <Image
                    src="/images/backgrounds/karen3.jpg"
                    alt="Karen"
                    fill
                    className="object-cover object-[center_20%] opacity-0 animate-[bgFade_48s_linear_infinite_16s] grayscale-[30%] sepia-[0.2] hue-rotate-[340deg] brightness-110"
                />
                <Image
                    src="/images/backgrounds/karen4.jpg"
                    alt="Karen"
                    fill
                    className="object-cover object-[center_35%] opacity-0 animate-[bgFade_48s_linear_infinite_24s] grayscale-[30%] sepia-[0.2] hue-rotate-[340deg] brightness-110"
                />
                <Image
                    src="/images/backgrounds/karen5.jpg"
                    alt="Karen"
                    fill
                    className="object-cover object-[center_20%] opacity-0 animate-[bgFade_48s_linear_infinite_32s] grayscale-[30%] sepia-[0.2] hue-rotate-[340deg] brightness-110"
                />
                <Image
                    src="/images/backgrounds/karen6.jpg"
                    alt="Karen"
                    fill
                    className="object-cover object-[center_30%] opacity-0 animate-[bgFade_48s_linear_infinite_40s] grayscale-[30%] sepia-[0.2] hue-rotate-[340deg] brightness-110"
                />
            </div>
        </div>
    );
}
