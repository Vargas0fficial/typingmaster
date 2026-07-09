"use client";

import { motion } from "framer-motion";

interface Orb {
  id: number;
  size: number;
  color: string;
  startX: string;
  startY: string;
  duration: number;
  delay: number;
}

const ORBS: Orb[] = [
  { id: 1, size: 280, color: "#3b82f6", startX: "10%", startY: "15%", duration: 22, delay: 0 },
  { id: 2, size: 220, color: "#a78bfa", startX: "80%", startY: "10%", duration: 26, delay: 2 },
  { id: 3, size: 260, color: "#22d3ee", startX: "70%", startY: "70%", duration: 24, delay: 4 },
  { id: 4, size: 200, color: "#34d399", startX: "15%", startY: "75%", duration: 28, delay: 1 },
  { id: 5, size: 180, color: "#fbbf24", startX: "45%", startY: "40%", duration: 30, delay: 3 },
];

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.startX,
            top: orb.startY,
            background: orb.color,
            opacity: 0.06,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}