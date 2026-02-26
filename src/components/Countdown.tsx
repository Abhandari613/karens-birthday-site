"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PARTY_DATE = new Date("2025-03-07T19:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = PARTY_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 0.2 }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-5 min-w-[70px] sm:min-w-[90px] border border-white/20">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="block text-3xl sm:text-5xl font-bold text-white font-[family-name:var(--font-heading)]"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-white/70 text-xs sm:text-sm mt-2 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [isPartyTime, setIsPartyTime] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsPartyTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isPartyTime) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <p className="text-4xl sm:text-6xl font-bold text-gold font-[family-name:var(--font-heading)]">
          It&apos;s Party Time!
        </p>
        <p className="text-white/80 mt-2 text-lg">Feliz Cumplea&ntilde;os, Karen!</p>
      </motion.div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-6 justify-center">
      <TimeBlock value={timeLeft.days} label="Days" />
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
