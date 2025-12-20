
"use client";

import { motion } from "framer-motion";
import { MousePointer2, Plus } from "lucide-react";

export default function FormBuilderAnimation() {
    return (
        <div className="relative w-full aspect-[4/3] bg-slate-900/90 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex">
            {/* Sidebar */}
            <div className="w-1/4 h-full border-r border-white/10 bg-white/5 p-3 flex flex-col gap-3">
                <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-full bg-white/5 rounded border border-white/5 relative group cursor-grab active:cursor-grabbing">
                        <div className="absolute inset-x-2 top-3 h-2 w-2/3 bg-white/10 rounded" />
                    </div>
                ))}
            </div>

            {/* Canvas */}
            <div className="flex-1 p-6 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="h-8 w-20 bg-blue-600 rounded text-[10px] flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        PUBLISH
                    </div>
                </div>

                <div className="border-2 border-dashed border-white/10 rounded-xl h-full p-4 space-y-4">
                    <div className="h-8 w-1/3 bg-white/10 rounded" />

                    {/* Existing Field */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-slate-800 rounded-lg border border-white/5"
                    >
                        <div className="h-2 w-1/4 bg-white/20 rounded mb-3" />
                        <div className="h-8 w-full bg-black/40 rounded border border-white/5" />
                    </motion.div>

                    {/* Being Dragged / Added Field */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.3 }}
                        className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/50"
                    >
                        <div className="h-2 w-1/4 bg-blue-200/50 rounded mb-3" />
                        <div className="h-8 w-full bg-black/40 rounded border border-blue-500/30" />
                    </motion.div>

                    {/* Cursor Animation */}
                    <motion.div
                        className="absolute z-50 text-white drop-shadow-lg"
                        initial={{ top: "30%", left: "12%" }}
                        animate={{
                            top: ["30%", "30%", "50%", "50%"],
                            left: ["12%", "12%", "50%", "50%"],
                            opacity: [1, 1, 1, 0]
                        }}
                        transition={{ duration: 2, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 2 }}
                    >
                        <MousePointer2 className="w-5 h-5 fill-black" />
                        <motion.div
                            className="absolute top-4 left-4 bg-white/10 backdrop-blur border border-white/20 p-2 rounded-lg text-[10px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 2, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 2 }}
                        >
                            <div className="h-2 w-12 bg-white/50 rounded" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
