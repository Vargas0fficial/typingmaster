"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Firefly {
    id: number;
    startX: string;
    startY: string;
    color: string;
    size: number;
    duration: number;
    delay: number;
    moveX: number;
    moveY: number;
}

const COLORS = ["#fbbf24", "#a3e635", "#67e8f9"];

export function Fireflies({ count = 12 }: { count?: number }) {
    const [flies, setFlies] = useState<Firefly[]>([]);

    useEffect(() => {
        setFlies(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                startX: `${Math.random() * 100}%`,
                startY: `${Math.random() * 100}%`,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: Math.random() * 3 + 2.5,
                duration: Math.random() * 8 + 10,
                delay: Math.random() * 5,
                moveX: (Math.random() - 0.5) * 200,
                moveY: (Math.random() - 0.5) * 200,
            }))
        );
    }, [count]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {flies.map((f) => (
                <motion.div
                    key={f.id}
                    className="absolute rounded-full"
                    style={{
                        left: f.startX,
                        top: f.startY,
                        width: f.size,
                        height: f.size,
                        background: f.color,
                        boxShadow: `0 0 ${f.size * 3}px ${f.color}`,
                    }}
                    animate={{
                        x: [0, f.moveX, -f.moveX * 0.6, 0],
                        y: [0, f.moveY, -f.moveY * 0.6, 0],
                        opacity: [0, 0.8, 0.3, 0.8, 0],
                    }}
                    transition={{
                        duration: f.duration,
                        delay: f.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}