
"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ParallaxSection from "@/components/marketing/ParallaxSection";
import VoiceWaveAnimation from "@/components/marketing/VoiceWaveAnimation";
import { Mic, Layout, Sparkles, ArrowRight, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormBuilderAnimation from "@/components/marketing/FormBuilderAnimation";

export default function FeaturesContent() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <main className="relative z-10 pt-32 pb-20">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src="/audio/voice-sample.mp3"
                onEnded={() => setIsPlaying(false)}
            />

            {/* HERO SECTION */}
            <section className="container mx-auto px-6 text-center mb-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Next-Gen Capabilities</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                        Tools that feel like <br />
                        <span className="text-purple-400">Magic</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of Content Management with our AI-driven Voice Agent and intuitive Visual Form Builder.
                    </p>
                </motion.div>
            </section>

            {/* FEATURE 1: FORM BUILDER - PARALLAX LEFT */}
            <ParallaxSection className="container mx-auto px-6 mb-40" speed={0.2}>
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Layout className="w-8 h-8 text-white relative z-10" />
                        </div>
                        <h2 className="text-4xl font-bold">Visual Form Builder</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Drag, drop, and deploy. Our intuitive builder lets you create complex data capture forms in seconds. Connect directly to your CRM without writing a single line of code.
                        </p>
                        <ul className="space-y-4 text-slate-300">
                            {["Drag-and-drop mechanics", "Auto-validation logic", "Instant CRM integration"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/create-account">
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 mt-4 rounded-full px-8">
                                Start Building
                            </Button>
                        </Link>
                    </div>

                    <div className="flex-1 relative">
                        {/* Visual Representation of Form Builder */}
                        <div className="relative w-full max-w-lg mx-auto">
                            <FormBuilderAnimation />
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            {/* FEATURE 2: VOICE AGENT - PARALLAX RIGHT */}
            <ParallaxSection className="container mx-auto px-6 mb-40" speed={0.1}>
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <Mic className="w-8 h-8 text-white relative z-10" />
                        </div>
                        <h2 className="text-4xl font-bold">AI Voice Assistant</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Talk to your data. Our advanced Voice Agent understands context, manages tasks, and can even handle customer support calls autonomously.
                        </p>
                        <ul className="space-y-4 text-slate-300">
                            {["Natural Language Processing", "Real-time CRM updates", "Custom voice profiles"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={toggleAudio}
                            className={`mt-4 rounded-full px-8 gap-2 transition-all ${isPlaying ? 'bg-pink-500 border-pink-500 text-white' : 'border-white/20 text-white hover:bg-white/10'}`}
                        >
                            {isPlaying ? (
                                <>
                                    <Pause className="w-4 h-4" /> Pause Sample
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" /> Hear Samples
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="flex-1 w-full relative group cursor-pointer" onClick={toggleAudio}>
                        {/* Voice Wave Animation */}
                        <div className={`relative w-full aspect-video bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl transition-shadow duration-500 ${isPlaying ? 'shadow-pink-500/30 ring-1 ring-pink-500/50' : 'shadow-pink-900/20'}`}>
                            <VoiceWaveAnimation />

                            {/* Overlay text */}
                            <div className="absolute inset-x-0 bottom-6 text-center z-20">
                                <span className={`text-xs uppercase tracking-widest font-mono transition-colors duration-300 ${isPlaying ? 'text-pink-400 animate-pulse' : 'text-slate-500'}`}>
                                    {isPlaying ? 'ACTIVE // LISTENING' : 'TAP TO LISTEN'}
                                </span>
                            </div>

                            {/* Play Overlay (Visible on Hover if not playing) */}
                            {!isPlaying && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white ml-1" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            {/* CTA */}
            <section className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto bg-gradient-to-b from-purple-900/20 to-transparent p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <h3 className="text-3xl font-bold mb-6">Ready to upgrade your stack?</h3>
                    <p className="text-slate-400 mb-8">
                        Join thousands of developers building the future with BasaltCMS.
                    </p>
                    <Link href="/pricing" className="inline-block">
                        <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-200 rounded-full text-lg px-8 h-12">
                            Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
