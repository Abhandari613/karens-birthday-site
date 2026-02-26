import type { Metadata } from "next";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";
import BackgroundMusic from "@/components/BackgroundMusic";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import AmbientBackground from "@/components/AmbientBackground";

export const metadata: Metadata = {
  title: "Karen's 40th Birthday | Debí Tirar Más Fotos",
  description: "A love letter to Karen — celebrating 40 years of memories. 🇸🇻",
  openGraph: {
    title: "Karen's 40th Birthday | Debí Tirar Más Fotos",
    description: "Celebrate Karen's 40th with us! Share your favorite photos, memories, and songs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400;500;600&family=Satisfy&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen relative bg-transparent">
        <BackgroundSlideshow />
        <AmbientBackground />
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
        <PwaRegister />
        {/* Background music — DTMF by Bad Bunny via Spotify embed */}
        <BackgroundMusic />
      </body>
    </html>
  );
}
