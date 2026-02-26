import Slideshow from "@/components/Slideshow";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Party Mode | Karen's 40th",
    description: "Live slideshow of all incoming memories.",
};

export default function PartyPage() {
    return (
        <main className="min-h-screen bg-black">
            {/* The slideshow component will fetch data client-side and display fullscreen */}
            <Slideshow />
        </main>
    );
}
