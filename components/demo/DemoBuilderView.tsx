"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

// Branded Loading State Component
const BuilderLoader = () => (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center gap-6">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-[spin_1.5s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Initializing Visual Builder...
            </h3>
            <p className="text-slate-500 text-sm">Getting the heavy lifting out of the way</p>
        </div>
    </div>
);

// Dynamic import with the branded loader
const DemoPuckEditor = dynamic(() => import("./DemoPuckEditor"), {
    loading: () => <BuilderLoader />,
    ssr: false
});

interface DemoBuilderViewProps {
    onExit: () => void;
}

export default function DemoBuilderView({ onExit }: DemoBuilderViewProps) {
    return (
        <div className="relative z-20 bg-slate-950 min-h-screen">
            <DemoPuckEditor onExit={onExit} />
        </div>
    );
}
