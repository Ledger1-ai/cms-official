
"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number; // 0-1, where 1 is fastest parallax
}

export default function ParallaxSection({
    children,
    className = "",
    speed = 0.5,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y }} className="relative z-0 w-full h-full">
                {children}
            </motion.div>
        </div>
    );
}
