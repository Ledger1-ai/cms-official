"use client";


import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle, Server, Shield, Zap, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CityModalProps {
    city: any | null;
    open: boolean;
    onClose: () => void;
}

export default function CityModal({ city, open, onClose }: CityModalProps) {
    // Track View
    React.useEffect(() => {
        if (open && city) {
            // Fire and forget tracking
            fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'view_city',
                    page: `/location/${city.countryCode}/${city.name}`,
                    data: {
                        city_id: city.id,
                        city_name: city.name,
                        country: city.countryName
                    }
                })
            }).catch(err => console.error("Tracking failed", err));
        }
    }, [open, city]);

    if (!city) return null;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogPrimitive.Portal>
                {/* Transparent Overlay to remove "extra layer" but keep click-outside */}
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-50 bg-black/0 transition-all duration-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                />

                <DialogPrimitive.Content
                    className={cn(
                        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-0 border border-emerald-500/20 bg-[#020617] text-white shadow-2xl shadow-emerald-900/20 sm:rounded-2xl duration-200",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
                    )}
                >
                    {/* Header Image/Pattern */}
                    <div className="h-32 bg-gradient-to-br from-emerald-950/50 to-[#020617] relative overflow-hidden flex items-end p-6 border-b border-emerald-500/10 rounded-t-2xl">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10 w-full">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1">
                                <MapPin className="w-3 h-3" />
                                {city.countryName || "Global Mesh"}
                            </div>
                            <DialogTitle className="text-3xl font-black text-white tracking-tight leading-none px-0.5" style={{ textShadow: "0 0 20px rgba(16,185,129,0.4)" }}>
                                {city.name}
                            </DialogTitle>
                        </div>

                        <DialogPrimitive.Close className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                            <X className="w-4 h-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-[#020617] space-y-6 rounded-b-2xl">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                                <Server className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-1">Operational Node</h3>
                                <p className="text-xs text-emerald-100/60 leading-relaxed font-medium">
                                    This location is fully operational and ready for immediate deployment.
                                    High-availability routing and low-latency connections verified.
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/10 flex flex-col gap-1">
                                <span className="text-[10px] text-emerald-500/70 uppercase tracking-wider font-mono font-bold">Latency</span>
                                <span className="text-xl font-black text-white flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                                    &lt; 24ms
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/10 flex flex-col gap-1">
                                <span className="text-[10px] text-emerald-500/70 uppercase tracking-wider font-mono font-bold">Uptime</span>
                                <span className="text-xl font-black text-white flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-emerald-400" />
                                    99.99%
                                </span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-2">
                            <Link
                                href="/pricing"
                                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-[#020617] font-black uppercase tracking-wide rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                            >
                                Enroll Free <ArrowRight className="w-5 h-5" />
                            </Link>
                            <p className="text-center text-[10px] text-emerald-500/40 mt-3 font-mono">
                                No credit card required. Instant deployment.
                            </p>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </Dialog>
    );
}
