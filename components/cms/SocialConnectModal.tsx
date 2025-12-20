"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { setLinkingCookie } from "@/actions/set-linking-cookie";
import { signIn } from "next-auth/react";
import { Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import NextImage from "next/image";

interface SocialConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: {
        id: string; // internal id: twitter, linkedin
        authId: string; // next-auth id: twitter, linkedin, azure-ad, google
        name: string;
        icon: string;
        description: string;
    };
    isAvailable: boolean; // if the provider is configured in backend
    userId?: string;
}

export function SocialConnectModal({ isOpen, onClose, provider, isAvailable, userId }: SocialConnectModalProps) {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        // Set cookie via Server Action for robustness
        if (userId) {
            await setLinkingCookie(userId);
        } else {
            console.warn("No userId found for linking cookie");
        }

        try {
            await signIn(provider.authId, {
                callbackUrl: "/cms/oauth?tab=social",
                redirect: true,
            });
            // redirect happens, no need to stop loading
        } catch (error) {
            console.error("Sign in error", error);
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#0A0A0B] border-white/10 text-white p-0 overflow-hidden gap-0">
                {/* Brand Header */}
                <div className="bg-gradient-to-br from-slate-900 to-black p-8 flex flex-col items-center justify-center border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-10 transition-opacity" />

                    {/* Brand Icon Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />

                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 mb-4 scale-110">
                        <NextImage
                            src={provider.icon}
                            alt={provider.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center relative z-10">{provider.name}</DialogTitle>
                </div>

                <div className="p-6 space-y-6">
                    <DialogDescription className="text-center text-slate-400 text-base">
                        {provider.description}
                    </DialogDescription>

                    <div className="space-y-4">
                        <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-slate-400 border border-white/5">
                            <h4 className="font-semibold text-white mb-2">Permissions Requested:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Read profile information</li>
                                <li>Post content on your behalf</li>
                                <li>Analyze engagement metrics</li>
                            </ul>
                        </div>

                        {!isAvailable && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                <div className="text-sm text-red-200">
                                    <span className="font-bold block">Configuration Missing</span>
                                    This provider is not configured in the system settings. Please contact an administrator or check your environment variables.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="p-6 bg-slate-900/50 border-t border-white/5">
                    <Button variant="ghost" onClick={onClose} disabled={loading} className="text-slate-400 hover:text-white">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConnect}
                        disabled={loading || !isAvailable}
                        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            `Connect ${provider.name}`
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
