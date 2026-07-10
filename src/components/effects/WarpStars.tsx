"use client";

import { useEffect, useRef } from "react";

interface WarpStar {
    x: number;
    y: number;
    z: number;
}

export function WarpStars({ starCount = 200, speed = 2 }: { starCount?: number; speed?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const centerX = () => width / 2;
        const centerY = () => height / 2;

        const stars: WarpStar[] = Array.from({ length: starCount }, () => ({
            x: Math.random() * width - centerX(),
            y: Math.random() * height - centerY(),
            z: Math.random() * width,
        }));

        let animationId: number;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            for (const star of stars) {
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * width - centerX();
                    star.y = Math.random() * height - centerY();
                    star.z = width;
                }

                const sx = star.x / (star.z / width) + centerX();
                const sy = star.y / (star.z / width) + centerY();

                const size = (1 - star.z / width) * 2.5;
                const opacity = 1 - star.z / width;

                if (sx >= 0 && sx <= width && sy >= 0 && sy <= height && size > 0) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`;
                    ctx.fill();
                }
            }

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, [starCount, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}