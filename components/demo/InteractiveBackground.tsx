"use client";

import { useEffect, useRef } from "react";

interface InteractiveBackgroundProps {
    parallaxSpeed?: number;
    variant?: "default" | "blue" | "gold" | "emerald";
}

export default function InteractiveBackground({
    parallaxSpeed = 0.2,
    variant = "default"
}: InteractiveBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let scrollY = window.scrollY;

        // Resize handler
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("scroll", handleScroll, { passive: true });
        resize();

        // Particles
        const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; offsetFactor: number }[] = [];
        const particleCount = 50;

        const variantColors = {
            default: ["rgba(74, 222, 128, 0.2)", "rgba(168, 85, 247, 0.2)", "rgba(255, 255, 255, 0.05)"],
            blue: ["rgba(56, 189, 248, 0.2)", "rgba(34, 211, 238, 0.2)", "rgba(255, 255, 255, 0.05)"],
            gold: ["rgba(251, 191, 36, 0.15)", "rgba(245, 158, 11, 0.15)", "rgba(255, 255, 255, 0.05)"],
            emerald: ["rgba(16, 185, 129, 0.2)", "rgba(5, 150, 105, 0.2)", "rgba(255, 255, 255, 0.05)"],
        };

        const colors = variantColors[variant] || variantColors.default;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 250 + 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                offsetFactor: Math.random() * 0.5 + 0.5 // Random weight for parallax
            });
        }

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Adjust drawn Y position based on scroll (Parallax)
                const parallaxY = p.y - (scrollY * parallaxSpeed * p.offsetFactor);

                // Effective Y for drawing (modulo for infinite scroll effect or wrap)
                let drawY = parallaxY % height;
                if (drawY < 0) drawY += height;

                // Wrap X
                if (p.x < -p.size) p.x = width + p.size;
                if (p.x > width + p.size) p.x = -p.size;

                // Wrap Y (base position)
                if (p.y < -height) p.y = height * 2;
                if (p.y > height * 2) p.y = -height;

                // Mouse interaction
                const dx = mouseX - p.x;
                const dy = mouseY - drawY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 400) {
                    p.x -= dx * 0.0003;
                    // Note: interactive with drawY for visual consistency
                }

                // Draw
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(p.x, drawY, 0, p.x, drawY, p.size);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [variant, parallaxSpeed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        />
    );
}
