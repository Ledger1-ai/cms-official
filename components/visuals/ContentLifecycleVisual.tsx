"use client";

import React, { useEffect, useState } from "react";
import { FileText, Database, Image as ImageIcon, Zap, Layers, Globe, Smartphone, Tablet } from "lucide-react";

type AnimationStage = 'IDLE' | 'INGEST' | 'PROCESS' | 'DEPLOY';

export function ContentLifecycleVisual() {
    const [stage, setStage] = useState<AnimationStage>('IDLE');

    // Orchestrate the animation sequence
    useEffect(() => {
        const runSequence = () => {
            setStage('INGEST');

            // After ingest (packets drop), move to process
            setTimeout(() => setStage('PROCESS'), 1500);

            // After process (engine spins), move to deploy
            setTimeout(() => setStage('DEPLOY'), 3000);

            // Reset to IDLE then loop
            setTimeout(() => {
                setStage('IDLE');
                // Small pause before next loop
                setTimeout(runSequence, 1000);
            }, 4500);
        };

        runSequence();

        // Cleanup not strictly necessary for this simple loop but good practice
        return () => { };
    }, []);

    return (
        <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-between py-6 relative overflow-hidden bg-[#020617] select-none text-white">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

            {/* Ambient Glows - Pulse with stage */}
            <div className={`absolute top-0 left-1/2 w-full h-64 bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${stage === 'INGEST' ? 'opacity-100 scale-110' : 'opacity-30'}`} />
            <div className={`absolute bottom-0 left-1/2 w-full h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 transition-all duration-1000 ${stage === 'DEPLOY' ? 'opacity-100 scale-110' : 'opacity-30'}`} />

            {/* STAGE 1: SOURCES (TOP ROW) */}
            <div className="relative z-10 w-full px-8 flex justify-between gap-4">
                {/* Source 1: PIM */}
                <div className={`flex-1 bg-[#0F172A]/90 border rounded-lg p-3 backdrop-blur-md shadow-[0_4px_20px_rgba(6,182,212,0.15)] flex flex-col items-center gap-2 transition-all duration-500 ${stage === 'INGEST' ? 'border-cyan-400 scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-cyan-500/30'}`}>
                    <div className="p-2 rounded-md bg-cyan-500/10">
                        <Database className={`w-5 h-5 text-cyan-400 transition-all duration-300 ${stage === 'INGEST' ? 'scale-125' : ''}`} />
                    </div>
                    <div className="text-center">
                        <div className="text-[9px] font-mono text-cyan-200 tracking-wider">PIM</div>
                        <div className="text-xs font-bold text-white">Products</div>
                    </div>
                    {/* Downward Stream Connector */}
                    <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-gradient-to-b from-cyan-500/50 to-transparent overflow-hidden">
                        <div className={`absolute top-0 left-1/2 w-1.5 h-4 bg-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#22d3ee] transition-all duration-1500 ease-in ${stage === 'INGEST' ? 'top-[120%] opacity-100' : '-top-full opacity-0'}`} />
                    </div>
                </div>

                {/* Source 2: CMS */}
                <div className={`flex-1 bg-[#0F172A]/90 border rounded-lg p-3 backdrop-blur-md shadow-[0_4px_20px_rgba(168,85,247,0.15)] flex flex-col items-center gap-2 transition-all duration-500 delay-100 ${stage === 'INGEST' ? 'border-purple-400 scale-105 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'border-purple-500/30'}`}>
                    <div className="p-2 rounded-md bg-purple-500/10">
                        <FileText className={`w-5 h-5 text-purple-400 transition-all duration-300 ${stage === 'INGEST' ? 'scale-125' : ''}`} />
                    </div>
                    <div className="text-center">
                        <div className="text-[9px] font-mono text-purple-200 tracking-wider">CMS</div>
                        <div className="text-xs font-bold text-white">Content</div>
                    </div>
                    {/* Downward Stream Connector */}
                    <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-gradient-to-b from-purple-500/50 to-transparent overflow-hidden">
                        <div className={`absolute top-0 left-1/2 w-1.5 h-4 bg-purple-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#c084fc] transition-all duration-1500 ease-in delay-100 ${stage === 'INGEST' ? 'top-[120%] opacity-100' : '-top-full opacity-0'}`} />
                    </div>
                </div>

                {/* Source 3: DAM */}
                <div className={`flex-1 bg-[#0F172A]/90 border rounded-lg p-3 backdrop-blur-md shadow-[0_4px_20px_rgba(236,72,153,0.15)] flex flex-col items-center gap-2 transition-all duration-500 delay-200 ${stage === 'INGEST' ? 'border-pink-400 scale-105 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : 'border-pink-500/30'}`}>
                    <div className="p-2 rounded-md bg-pink-500/10">
                        <ImageIcon className={`w-5 h-5 text-pink-400 transition-all duration-300 ${stage === 'INGEST' ? 'scale-125' : ''}`} />
                    </div>
                    <div className="text-center">
                        <div className="text-[9px] font-mono text-pink-200 tracking-wider">DAM</div>
                        <div className="text-xs font-bold text-white">Assets</div>
                    </div>
                    {/* Downward Stream Connector */}
                    <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-gradient-to-b from-pink-500/50 to-transparent overflow-hidden">
                        <div className={`absolute top-0 left-1/2 w-1.5 h-4 bg-pink-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#ec4899] transition-all duration-1500 ease-in delay-200 ${stage === 'INGEST' ? 'top-[120%] opacity-100' : '-top-full opacity-0'}`} />
                    </div>
                </div>
            </div>

            {/* STAGE 2: MIDDLE (CORE ENGINE) */}
            <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                {/* Visual Guide Lines */}
                <div className="absolute top-0 left-0 w-full h-[50%] flex justify-between px-[16%] pointer-events-none opacity-20">
                    <div className={`w-[1px] h-full bg-cyan-500 skew-x-[20deg] origin-top transition-all duration-500 ${stage === 'INGEST' ? 'opacity-100 shadow-[0_0_10px_#06b6d4]' : 'opacity-20'}`} />
                    <div className={`w-[1px] h-full bg-purple-500 transition-all duration-500 ${stage === 'INGEST' ? 'opacity-100 shadow-[0_0_10px_#a855f7]' : 'opacity-20'}`} />
                    <div className={`w-[1px] h-full bg-pink-500 -skew-x-[20deg] origin-top transition-all duration-500 ${stage === 'INGEST' ? 'opacity-100 shadow-[0_0_10px_#ec4899]' : 'opacity-20'}`} />
                </div>

                <div className={`relative w-32 h-32 group transition-all duration-500 ${stage === 'PROCESS' ? 'scale-110' : 'scale-100'}`}>
                    {/* Rings - Spin Faster on Process */}
                    <div className={`absolute inset-[-20px] rounded-full border border-slate-700/50 border-dashed transition-all duration-1000 ${stage === 'PROCESS' ? 'animate-[spin_2s_linear_infinite] border-cyan-500/50' : 'animate-[spin_10s_linear_infinite]'}`} />
                    <div className={`absolute inset-[-10px] rounded-full border border-slate-500/30 transition-all duration-1000 ${stage === 'PROCESS' ? 'animate-[spin_3s_linear_infinite_reverse] border-purple-500/50' : 'animate-[spin_15s_linear_infinite_reverse]'}`} />

                    {/* Core */}
                    <div className={`absolute inset-0 bg-black/80 rounded-full border backdrop-blur-xl flex flex-col items-center justify-center z-20 transition-all duration-300 ${stage === 'PROCESS' ? 'border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.5)] bg-black/90' : 'border-white/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]'}`}>
                        <Layers className={`w-10 h-10 text-white transition-all duration-300 ${stage === 'PROCESS' ? 'animate-bounce text-cyan-400' : ''}`} />
                        <div className={`text-[8px] font-bold tracking-[0.2em] mt-1 transition-colors ${stage === 'PROCESS' ? 'text-cyan-300' : 'text-cyan-400/70'}`}>ENGINE</div>
                    </div>
                </div>
            </div>

            {/* STAGE 3: BOTTOM (VELOCITY OUTPUT) */}
            <div className="relative z-10 w-full px-6">
                {/* Deployment Beam */}
                <div className="absolute -top-16 left-1/2 h-16 w-0.5 -translate-x-1/2 overflow-hidden">
                    <div className={`w-full h-full bg-emerald-500 transition-all duration-500 ${stage === 'DEPLOY' ? 'opacity-100 shadow-[0_0_20px_#10b981]' : 'opacity-20'}`} />
                    <div className={`absolute top-0 left-0 w-full h-1/2 bg-white blur-[2px] transition-all duration-1000 ease-out ${stage === 'DEPLOY' ? 'translate-y-[200%]' : '-translate-y-full'}`} />
                </div>

                <div className={`bg-[#0F172A]/90 border rounded-xl p-4 backdrop-blur-md relative overflow-hidden transition-all duration-500 ${stage === 'DEPLOY' ? 'border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.2)] scale-[1.02]' : 'border-emerald-500/30'}`}>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg border transition-colors ${stage === 'DEPLOY' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'}`}>
                                <Zap className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white tracking-wide">HIGH VELOCITY OUTPUT</div>
                                <div className="text-[10px] text-emerald-400/80 font-mono">Global Edge Deployment</div>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="flex flex-col items-center px-3 border-r border-white/10">
                                <span className={`text-xl font-bold transition-colors ${stage === 'DEPLOY' ? 'text-white' : 'text-slate-300'}`}>45ms</span>
                                <span className="text-[9px] text-slate-400 uppercase">Build Time</span>
                            </div>
                            <div className="flex flex-col items-center px-3">
                                <span className="text-xl font-bold text-emerald-400">100%</span>
                                <span className="text-[9px] text-slate-400 uppercase">Uptime</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar - Fills on DEPLOY */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                        <div className={`h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-1500 ease-out ${stage === 'DEPLOY' ? 'w-full' : 'w-0'}`} />
                    </div>

                    {/* Channels - Light up sequentially */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 transition-opacity duration-300 ${stage === 'DEPLOY' ? 'animate-pulse opacity-100' : 'opacity-30'}`} />
                            Serving Live Traffic
                        </div>
                        <div className="flex gap-4">
                            <Globe className={`w-4 h-4 transition-all duration-300 ${stage === 'DEPLOY' ? 'text-cyan-400 scale-110' : 'text-slate-600'}`} />
                            <Smartphone className={`w-4 h-4 transition-all duration-300 delay-100 ${stage === 'DEPLOY' ? 'text-purple-400 scale-110' : 'text-slate-600'}`} />
                            <Tablet className={`w-4 h-4 transition-all duration-300 delay-200 ${stage === 'DEPLOY' ? 'text-pink-400 scale-110' : 'text-slate-600'}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
