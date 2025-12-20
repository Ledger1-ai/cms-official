"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, Globe, Sparkles, ArrowRight } from "lucide-react";

export default function CmsWorkflowVisual() {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-black/40 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

            {/* Workflow Container */}
            <div className="relative z-10 flex items-center gap-4 md:gap-8 px-4">

                {/* Step 1: Draft */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-24 h-32 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-3 relative flex flex-col gap-2 shadow-lg">
                        <div className="w-full h-2 bg-white/10 rounded-full" />
                        <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                        <div className="w-full h-2 bg-white/10 rounded-full" />
                        <div className="absolute bottom-3 right-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <motion.div
                            className="absolute -top-2 -right-2 bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            Draft
                        </motion.div>
                    </div>
                </motion.div>

                {/* Arrow 1 */}
                <motion.div
                    animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ArrowRight className="w-6 h-6 text-white/20" />
                </motion.div>

                {/* Step 2: AI Processing */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div className="w-24 h-24 rounded-2xl border border-primary/50 bg-black/60 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                        <div className="absolute -bottom-8 text-center w-32">
                            <span className="text-xs text-primary font-medium tracking-wider uppercase">AI Polish</span>
                        </div>
                    </div>

                    {/* Particles */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
                            animate={{
                                x: [0, (i % 2 === 0 ? 40 : -40)],
                                y: [0, (i < 2 ? -40 : 40)],
                                opacity: [1, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        />
                    ))}
                </motion.div>

                {/* Arrow 2 */}
                <motion.div
                    animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                >
                    <ArrowRight className="w-6 h-6 text-white/20" />
                </motion.div>

                {/* Step 3: Published */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-24 h-32 rounded-lg border border-green-500/30 bg-green-500/5 backdrop-blur-sm p-1 relative shadow-lg shadow-green-900/20 group">
                        <div className="w-full h-full rounded border border-white/5 bg-black/20 overflow-hidden relative">
                            {/* Fake page content */}
                            <div className="h-12 bg-white/5 w-full mb-2" />
                            <div className="px-2 space-y-1">
                                <div className="w-full h-1 bg-white/10 rounded-full" />
                                <div className="w-full h-1 bg-white/10 rounded-full" />
                                <div className="w-2/3 h-1 bg-white/10 rounded-full" />
                            </div>

                            <motion.div
                                className="absolute inset-0 bg-green-500/10"
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>

                        <div className="absolute -top-3 -right-3">
                            <div className="bg-green-500 text-black rounded-full p-1 shadow-lg shadow-green-500/20">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1">
                            <Globe className="w-3 h-3 text-green-400" />
                            <span className="text-[10px] text-green-400 font-medium uppercase tracking-wider">Live</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
