"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, AnimatePresence, motion } from "framer-motion";
import { DesktopOnlyModal } from "@/components/modals/DesktopOnlyModal";

// Import extracted views
import DemoLandingView from "./DemoLandingView";
import DemoBuilderView from "./DemoBuilderView";

// Defer InteractiveBackground
const InteractiveBackground = dynamic(() => import("./InteractiveBackground"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-0 bg-[#020617]" />
});

// Define interface for SocialSettings
interface SocialSettings {
    xTwitterUrl?: string | null;
    discordUrl?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    youtubeUrl?: string | null;
    [key: string]: any;
}

interface DemoPageProps {
    footer: React.ReactNode;
    socialSettings?: SocialSettings | null;
    headerConfig?: any | null;
}

export default function DemoPage({ footer, socialSettings, headerConfig }: DemoPageProps) {
    const [mode, setMode] = useState<"landing" | "builder">("landing");
    const [isMobile, setIsMobile] = useState(false);
    const [showDesktopModal, setShowDesktopModal] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // If user is already in builder mode and resizes to mobile, force them out or show modal
            if (mobile && mode === "builder") {
                setShowDesktopModal(true);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mode]);

    const handleStartDemo = () => {
        if (isMobile) {
            setShowDesktopModal(true);
        } else {
            setMode("builder");
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
                <InteractiveBackground />

                <DesktopOnlyModal open={showDesktopModal} onOpenChange={setShowDesktopModal} />

                {mode === "landing" && (
                    <DemoLandingView
                        key="landing"
                        onStartDemo={handleStartDemo}
                        socialSettings={socialSettings}
                        headerConfig={headerConfig}
                        footer={footer}
                    />
                )}

                <AnimatePresence>
                    {mode === "builder" && (
                        <motion.div
                            key="builder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative z-20"
                        >
                            <DemoBuilderView onExit={() => setMode("landing")} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </LazyMotion>
    );
}
