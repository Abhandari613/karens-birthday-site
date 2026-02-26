"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  shape: "circle" | "square" | "petal";
}

const COLORS = [
  "#0047ab", // Salvadoran blue
  "#d4a853", // Gold
  "#c75b39", // Terracotta
  "#1b5e20", // Forest green
  "#f5f0e8", // Flor white
  "#ff6b35", // Sunset
  "#ffffff", // White
];

export default function Confetti({ duration = 5000 }: { duration?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      shape: (["circle", "square", "petal"] as const)[Math.floor(Math.random() * 3)],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => setPieces(newPieces), 0);

    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.shape === "petal" ? piece.size * 1.5 : piece.size,
            backgroundColor: piece.color,
            borderRadius:
              piece.shape === "circle"
                ? "50%"
                : piece.shape === "petal"
                  ? "50% 0 50% 0"
                  : "2px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
