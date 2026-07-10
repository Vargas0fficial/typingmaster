"use client";

import { useEffect, useRef } from "react";

interface WarpStar {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

export function WarpStars({ starCount = 250, speed = 2 }: { starCount?: number; speed?: number }) {
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
      prevX: 0,
      prevY: 0,
    }));

    stars.forEach((s) => {
      s.prevX = s.x;
      s.prevY = s.y;
    });

    let animationId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.fillStyle = "rgba(11, 15, 25, 0.35)";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.prevX = star.x / (star.z / width) + centerX();
        star.prevY = star.y / (star.z / width) + centerY();

        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * width - centerX();
          star.y = Math.random() * height - centerY();
          star.z = width;
        }

        const sx = star.x / (star.z / width) + centerX();
        const sy = star.y / (star.z / width) + centerY();

        const size = (1 - star.z / width) * 2.2;
        const opacity = 1 - star.z / width;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          ctx.strokeStyle = `rgba(180, 210, 255, ${opacity * 0.7})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(sx, sy);
          ctx.stroke();
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
      style={{ opacity: 0.5 }}
    />
  );
}