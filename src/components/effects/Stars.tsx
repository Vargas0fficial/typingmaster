"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
    id: number;
    x: string;
    y: string;
    size: number;
    duration: number;
    delay: number;
}

export function Stars({ count = 40 }: { count?: number }) {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        setStars(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                size: Math.random() * 1.8 + 0.8,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 4,
            }))
        );
    }, [count]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{ opacity: [0.15, 0.9, 0.15] }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}