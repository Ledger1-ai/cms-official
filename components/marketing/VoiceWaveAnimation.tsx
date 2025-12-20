
"use client";

import { motion } from "framer-motion";

export default function VoiceWaveAnimation() {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-transparent">
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-[60px] opacity-50" />

            {/* Central Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-60 mix-blend-screen"
            />

            <svg
                viewBox="0 0 1000 300"
                className="w-full h-full relative z-10"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
                        <stop offset="20%" stopColor="rgba(236, 72, 153, 0.5)" />
                        <stop offset="50%" stopColor="rgba(236, 72, 153, 1)" />
                        <stop offset="80%" stopColor="rgba(236, 72, 153, 0.5)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
                    </linearGradient>
                    <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                        <stop offset="20%" stopColor="rgba(99, 102, 241, 0.5)" />
                        <stop offset="50%" stopColor="rgba(99, 102, 241, 1)" />
                        <stop offset="80%" stopColor="rgba(99, 102, 241, 0.5)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                    </linearGradient>
                    <linearGradient id="lineC" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0" stopColor="rgba(255,255,255,0)" />
                        <stop offset="0.5" stopColor="rgba(255,255,255,0.8)" />
                        <stop offset="1" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Slow Background Wave */}
                <motion.path
                    stroke="url(#waveGradient2)"
                    strokeWidth="4"
                    fill="none"
                    d="M0,150 Q250,50 500,150 T1000,150"
                    animate={{
                        d: [
                            "M0,150 Q250,50 500,150 T1000,150",
                            "M0,150 Q250,250 500,150 T1000,150",
                            "M0,150 Q250,50 500,150 T1000,150",
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Medium Wave */}
                <motion.path
                    stroke="url(#waveGradient1)"
                    strokeWidth="3"
                    fill="none"
                    d="M0,150 Q250,200 500,150 T1000,150"
                    animate={{
                        d: [
                            "M0,150 Q250,200 500,150 T1000,150",
                            "M0,150 Q250,100 500,150 T1000,150",
                            "M0,150 Q250,200 500,150 T1000,150",
                        ]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Fast Active Voice Wave (Simulated Audio) */}
                <motion.path
                    stroke="url(#lineC)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    animate={{
                        d: [
                            "M0,150 C200,150 200,140 300,150 S400,160 500,150 S600,140 700,150 S1000,150 1000,150",
                            "M0,150 C200,150 200,110 300,150 S400,200 500,150 S600,80 700,150 S1000,150 1000,150",
                            "M0,150 C200,150 200,160 300,150 S400,130 500,150 S600,180 700,150 S1000,150 1000,150",
                            "M0,150 C200,150 200,140 300,150 S400,160 500,150 S600,140 700,150 S1000,150 1000,150",
                        ]
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

            </svg>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                    initial={{
                        x: Math.random() * 500 - 250,
                        y: Math.random() * 200 - 100,
                        scale: 0,
                        opacity: 0
                    }}
                    animate={{
                        x: Math.random() * 500 - 250,
                        y: Math.random() * 200 - 100,
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
