"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import NextImage from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { trackShare } from "@/actions/analytics/track-share";

interface SocialShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    postUrl: string;
    postTitle: string;
    postImage?: string; // Added postImage prop
}

export function SocialShareModal({ isOpen, onClose, postUrl, postTitle, postImage }: SocialShareModalProps) {
    const [step, setStep] = useState<"selection" | "preview">("selection");
    const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const handleCopy = async () => {
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");

        // Track copy as a share/save
        await trackShare(postUrl, "Copy/Notion");

        setTimeout(() => setCopied(false), 2000);
    };

    const handlePlatformSelect = (platform: any) => {
        if (platform.onClick) {
            platform.onClick();
            return;
        }
        setSelectedPlatform(platform);
        setStep("preview");
    };

    const handleConfirmShare = async () => {
        if (!selectedPlatform) return;

        setIsSharing(true);
        try {
            await trackShare(postUrl, selectedPlatform.name);
            window.open(selectedPlatform.url, "_blank", "noopener,noreferrer");
            onClose();
        } catch (e) {
            console.error("Share failed", e);
        } finally {
            setIsSharing(false);
            setStep("selection"); // Reset for next time
        }
    };

    const shareLinks = [
        {
            name: "X / Twitter",
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`,
            color: "hover:bg-black hover:text-white border-transparent hover:border-slate-800",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
            color: "hover:bg-[#0077b5] hover:text-white border-transparent hover:border-[#00669c]",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "Meta",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
            color: "hover:bg-[#0668E1] hover:text-white border-transparent hover:border-[#0668E1]",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
            ),
        },
        {
            name: "Reddit",
            url: `https://reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`,
            color: "hover:bg-[#FF4500] hover:text-white border-transparent hover:border-[#e03d00]",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
            ),
        },
        {
            name: "Notion",
            url: "#",
            onClick: handleCopy,
            color: "hover:bg-slate-800 hover:text-white border-transparent hover:border-slate-700",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28.047-.606V1.833c0-.466-.466-.7-1.166-.653l-12.89.886c-.466.047-.933.28-1.633.933L2.312 4.674c-.14.14-.14.28-.14.513v16.148c0 .187.093.513.7.466l1.632-.932c.187-.094.42-.094.56-.094h14.885c.606 0 1.12-.513 1.12-1.072V6.026c0-.606-.514-1.073-1.12-1.073H5.905c-.466 0-1.213-.186-1.446-1.119l-.373-.746.373 1.12zm.98 5.74h.606c.28 0 .653.046.84.373l6.066 10.312h.093V10.274c0-.653-.326-1.026-.886-1.073l-1.493-.093V8.128h4.62v.98c0 .28-.373.28-.56.28l-1.073.093v10.592c0 .56.373 1.026 1.026 1.073l1.306.093v.98h-4.993v-.98c.327 0 .84 0 1.027-.373L5.205 10.367h-.093v6.86c0 .605.373.979.933 1.073l1.54.093v.98H3.338v-.98l1.4-.093c.607-.047.7-.42.7-1.073v-6.3c0-.653-.373-1.026-.98-1.073L3.058 9.76v-.98h2.38z" />
                </svg>
            ),
            label: "Copy to Notion"
        }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                onClose();
                setTimeout(() => setStep("selection"), 300); // Reset after close animation
            }
        }}>
            <DialogContent className="max-w-md w-full bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-0 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center relative">
                    <DialogTitle className="text-xl font-bold text-white">
                        {step === "preview" ? `Preview ${selectedPlatform?.name} Post` : "Share Article"}
                    </DialogTitle>
                    {/* Native Close button is already provided by DialogContent */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none" />
                </div>

                {step === "selection" ? (
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                            {shareLinks.map((link, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePlatformSelect(link)}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 transition-all group",
                                        link.color
                                    )}
                                >
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-transparent group-hover:scale-110 transition-transform">
                                        {link.icon}
                                    </div>
                                    <span className="text-xs font-medium text-slate-400 group-hover:text-white">
                                        {link.label || link.name}
                                    </span>
                                </button>
                            ))}

                            <button
                                onClick={handleCopy}
                                className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all group"
                            >
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-transparent group-hover:scale-110 transition-transform">
                                    {copied ? <Check className="w-8 h-8 text-green-500" /> : <Copy className="w-8 h-8" />}
                                </div>
                                <span className="text-xs font-medium text-slate-400 group-hover:text-white">
                                    {copied ? "Copied!" : "Copy Link"}
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    // PREVIEW STEP
                    <div className="p-6 space-y-6 animate-in slide-in-from-right-4 duration-200">
                        {/* Mock Card */}
                        <div className="bg-slate-900 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                            {postImage && (
                                <div className="h-32 w-full overflow-hidden relative">
                                    <NextImage src={postImage} alt="Preview" fill className="object-cover opacity-80" unoptimized />
                                </div>
                            )}
                            <div className="p-4 space-y-2">
                                <p className="text-sm font-medium text-white line-clamp-2">{postTitle}</p>
                                <p className="text-xs text-slate-500 truncate">{postUrl}</p>
                            </div>
                        </div>

                        {/* Share Message Preview */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400">Recommended Message</label>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-slate-300 break-words">
                                    {postTitle} {postUrl}
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${postTitle} ${postUrl}`);
                                        toast.success("Message copied!");
                                    }}
                                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                    title="Copy Message"
                                >
                                    <Copy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep("selection")}
                                className="flex-1 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 transition-colors text-sm font-medium"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirmShare}
                                disabled={isSharing}
                                className={cn(
                                    "flex-1 py-2.5 rounded-lg text-white font-medium shadow-lg transition-all flex items-center justify-center gap-2",
                                    isSharing ? "bg-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                                )}
                            >
                                {isSharing ? "Tracking..." : "Post Now"}
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
