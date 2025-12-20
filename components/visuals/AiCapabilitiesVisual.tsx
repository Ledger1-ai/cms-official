"use client";

import { motion } from "framer-motion";
import { Globe, Languages, Search, Zap, LayoutTemplate } from "lucide-react";

export default function AiCapabilitiesVisual() {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-black/40 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

            {/* Central Core */}
            <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">

                {/* Core Circle */}
                <motion.div
                    className="w-24 h-24 rounded-full bg-black/80 border border-primary/50 shadow-[0_0_50px_rgba(6,182,212,0.4)] flex items-center justify-center z-20 relative"
                    animate={{ boxShadow: ["0 0 20px rgba(6,182,212,0.2)", "0 0 60px rgba(6,182,212,0.6)", "0 0 20px rgba(6,182,212,0.2)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <Zap className="w-10 h-10 text-primary" />

                    {/* Rotating Rings */}
                    <motion.div
                        className="absolute inset-[-10px] rounded-full border border-primary/30 border-dashed"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-[-20px] rounded-full border border-primary/10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* Satellites */}
                {[
                    { icon: Globe, label: "Edge Global", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", angle: 0 },
                    { icon: Search, label: "SEO Agent", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", angle: 72 },
                    { icon: Languages, label: "Translator", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", angle: 144 },
                    { icon: LayoutTemplate, label: "Layout Gen", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", angle: 216 },
                    { icon: Zap, label: "Speed Opt", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", angle: 288 },
                ].map((item, i) => {
                    const radius = 140; // Desktop radius
                    const radian = (item.angle * Math.PI) / 180;
                    const x = Math.cos(radian) * radius;
                    const y = Math.sin(radian) * radius;

                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{ x, y, opacity: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                        >
                            {/* Connection Line */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none -z-10 overflow-visible">
                                <motion.line
                                    x1="50%" y1="50%" x2="50%" y2="50%" // Relative center
                                // We need to calculate line relative to the SVG center, effectively drawing from center to 0,0 (where item is relative to parent)
                                // Actually simplified: Just draw a line from center (0,0 of parent) to this item (x,y)
                                // Wait, SVG creates coords. Simplest is framing the line inside the parent container, not per item.
                                // Let's rely on CSS line or absolute position div line for simplicity
                                />
                                <line
                                    x1="150" y1="150"
                                    x2={150 - x} y2={150 - y} // Reverse logic because item is moved away from center
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="1"
                                />
                            </svg>

                            {/* Node */}
                            <motion.div
                                className={`w-16 h-16 rounded-xl border ${item.border} ${item.bg} backdrop-blur-md flex flex-col items-center justify-center shadow-lg relative z-20`}
                                whileHover={{ scale: 1.1 }}
                            >
                                <item.icon className={`w-6 h-6 ${item.color} mb-1`} />
                                <span className={`text-[10px] uppercase font-medium ${item.color} opacity-80`}>{item.label.split(' ')[0]}</span>
                            </motion.div>
                        </motion.div>
                    );
                })}

                {/* Connecting Lines (Absolute centralized solution) */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                    {/* We can use SVG here for lines if needed for exact precision, but the per-item SVG hack above works for now or simple absolute divs */}
                </div>

            </div>
        </div>
    );
}
