"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BrandedLoaderProps {
    variant?: "fullscreen" | "inline";
}

export function BrandedLoader({ variant = "fullscreen" }: BrandedLoaderProps) {
    const containerClasses = variant === "fullscreen"
        ? "fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] backdrop-blur-md"
        : "relative flex items-center justify-center w-full h-full p-8";

    return (
        <div className={containerClasses}>
            <div className="relative flex items-center justify-center scale-75">
                {/* Rotating Glow Ring */}
                <motion.div
                    className="absolute h-32 w-32 rounded-full border-t-2 border-[#4DBFD9] opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute h-40 w-40 rounded-full border-b-2 border-[#2AA9C7] opacity-40"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Breathing Logo */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 p-6"
                >
                    <div className="relative w-60 h-16">
                        <Image
                            src="/basalt-cms-wide-white.png"
                            alt="Loading..."
                            fill
                            className="object-contain drop-shadow-[0_0_25px_rgba(77,191,217,0.8)]"
                            priority
                            sizes="(max-width: 768px) 192px, 192px"
                        />
                    </div>
                </motion.div>

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-[#4DBFD9] blur-[100px] opacity-20 rounded-full h-64 w-64 -z-10 animate-pulse" />
            </div>
        </div>
    );
}
