"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

const COLORS = ["#3b82f6", "#22d3ee", "#a78bfa", "#fbbf24", "#34d399"];

interface SparklesProps {
  trigger: boolean;
  onComplete?: () => void;
  count?: number;
}

export function Sparkles({ trigger, onComplete, count = 24 }: SparklesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, count]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-50">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}