"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUniqueContributorCount, subscribeToSubmissions } from "@/lib/services/database";

const TOTAL_EXPECTED = 9;

export default function ContributorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const c = await getUniqueContributorCount();
      setCount(c);
    }

    fetchCount();
    const unsubscribe = subscribeToSubmissions(() => fetchCount());

    return () => unsubscribe();
  }, []);

  const getMessage = () => {
    if (count === 0) return "Be the first to share a memory!";
    if (count >= TOTAL_EXPECTED) return "Everyone has contributed! Karen is going to love this.";
    return `${count} of ${TOTAL_EXPECTED} friends have contributed`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        {Array.from({ length: TOTAL_EXPECTED }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`w-4 h-4 rounded-full border-2 transition-colors ${i < count
                ? "bg-gold border-gold"
                : "bg-transparent border-white/30"
              }`}
          />
        ))}
      </div>
      <p className="text-white/90 text-sm sm:text-base">
        {getMessage()}
      </p>
      {count > 0 && count < TOTAL_EXPECTED && (
        <p className="text-gold text-xs mt-1">Don&apos;t miss out!</p>
      )}
    </motion.div>
  );
}
