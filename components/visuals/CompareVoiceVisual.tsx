"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mic, Radio, Zap, Activity } from "lucide-react";

export function CompareVoiceVisual() {
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeaking((prev) => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Particles for the "Holographic" effect
    const particles = Array.from({ length: 20 });

    return (
        <div className="w-full h-full bg-[#030308] relative overflow-hidden flex items-center justify-center">
            {/* Header Title */}
            <div className="absolute top-6 left-0 right-0 flex justify-center z-40">
                <h2 className="text-cyan-400/60 font-mono text-lg tracking-widest uppercase bg-black/40 backdrop-blur-sm px-6 py-1.5 rounded-full border border-cyan-500/20">
                    Real-time Voice Tool Calls
                </h2>
            </div>

            {/* Background Grid / Depth - Full Coverage */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#06b6d4_0%,_transparent_40%,_#000_100%)] opacity-20 z-10" />
            <div className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    transform: "perspective(800px) rotateX(60deg) translateY(0px) scale(1.5)",
                }}
            />

            {/* Main Holographic Core - Fits container */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">

                <div className="relative flex items-center justify-center transform scale-90">
                    {/* Outer Glow Pulses - Contained */}
                    <motion.div
                        className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/20 blur-3xl opacity-50"
                        animate={{ scale: speaking ? [1, 1.2, 1] : 1.1, opacity: speaking ? [0.3, 0.5, 0.3] : 0.3 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Orbiting Rings - Sized to fit */}
                    <motion.div
                        className="absolute w-[280px] h-[280px] border border-cyan-500/30 rounded-full"
                        animate={{ rotate: 360, scale: [0.98, 1, 0.98] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute w-[240px] h-[240px] border border-cyan-400/40 rounded-full border-dashed"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />

                    {/* The Core Entity - Sized to fit */}
                    <motion.div
                        className="w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full relative flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.5)]"
                        animate={{
                            scale: speaking ? [1, 1.05, 1] : [1, 0.98, 1],
                            filter: speaking ? ["brightness(1)", "brightness(1.2)", "brightness(1)"] : "brightness(1)"
                        }}
                        transition={{ duration: speaking ? 0.3 : 3, repeat: Infinity }}
                    >
                        <div className="absolute inset-1 bg-[#050510] rounded-full flex items-center justify-center overflow-hidden border border-cyan-500/30">
                            {/* Dynamic Waveform Simulation */}
                            <div className="flex items-center gap-1.5 h-16">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2.5 bg-cyan-400 rounded-full"
                                        animate={{ height: speaking ? [16, 50, 16] : [16, 24, 16] }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            repeatType: "reverse"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Icons / Data Particles - Contained */}
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_5px_rgba(34,211,238,1)]"
                        style={{
                            top: "50%",
                            left: "50%",
                        }}
                        animate={{
                            x: Math.cos(i) * (100 + Math.random() * 60),
                            y: Math.sin(i) * (100 + Math.random() * 60),
                            opacity: [0, 1, 0],
                            scale: [0, 1.2, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* Status Indicator - Positioned safely inside */}
                <motion.div
                    className="absolute bottom-8 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-5 py-2.5 rounded-full border border-cyan-500/50 shadow-lg z-30"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className={`w-2 h-2 rounded-full ${speaking ? 'bg-green-400 animate-pulse' : 'bg-cyan-500'}`} />
                    <span className="text-cyan-50 text-xs font-semibold tracking-widest uppercase">
                        {speaking ? "Processing Voice Input..." : "Listening"}
                    </span>
                    <Activity className="w-4 h-4 text-cyan-400" />
                </motion.div>

            </div>
        </div>
    );
}
