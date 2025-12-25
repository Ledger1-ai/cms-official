"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Download, CheckCircle, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppItem {
    id: string;
    name: string;
    description: string;
    icon: string;
    author: string;
    rating: number;
    installs: string;
    status: "active" | "coming_soon";
    connected: boolean;
    category: string;
    updatedAt: string;
    docsUrl?: string;
}

interface AppMarketplaceItemProps {
    app: AppItem;
    onConfigure: () => void;
    onDisconnect: () => void;
}

export function AppMarketplaceItem({ app, onConfigure, onDisconnect }: AppMarketplaceItemProps) {
    return (
        <div className="group relative bg-[#0A0A0B] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all hover:shadow-xl hover:shadow-black/50 flex flex-col h-full">
            {/* Click Indicator */}
            <div className="absolute top-4 right-4 text-slate-600 group-hover:text-blue-500 transition-colors pointer-events-none">
                <ArrowRight className="w-4 h-4" />
            </div>

            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <Link href={`/cms/apps/${app.id}`} className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-inner hover:ring-2 hover:ring-blue-500/50 transition-all cursor-pointer">
                    <Image
                        src={app.icon}
                        alt={app.name}
                        fill
                        className="object-contain p-1"
                        unoptimized
                    />
                </Link>
                <div className="flex-1 min-w-0">
                    <Link href={`/cms/apps/${app.id}`} className="hover:underline decoration-blue-500/50 underline-offset-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                            {app.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span>by <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">{app.author}</span></span>
                        {app.connected && (
                            <span className="flex items-center gap-0.5 text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                <CheckCircle className="w-3 h-3" /> Installed
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3 min-h-[60px]">
                {app.description}
            </p>

            {/* Metrics Footer */}
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-medium text-slate-300">{app.rating}</span>
                </div>
                <div className="flex items-center gap-1" title={`${app.installs} active installations`}>
                    <Download className="w-3 h-3" />
                    <span>{app.installs}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{app.updatedAt}</span>
                </div>
            </div>

            {/* Hover Action Overlay (or visible button) */}
            <div className="pt-4 mt-2">
                {app.connected ? (
                    <Button
                        variant="outline"
                        onClick={onDisconnect}
                        className="w-full h-9 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                        Uninstall / Disconnect
                    </Button>
                ) : (
                    <Button
                        onClick={onConfigure}
                        disabled={app.status === "coming_soon"}
                        className={cn(
                            "w-full h-9 font-medium shadow-lg transition-all",
                            app.status === "coming_soon"
                                ? "bg-white/5 text-slate-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                        )}
                    >
                        {app.status === "coming_soon" ? "Coming Soon" : "Install Now"}
                    </Button>
                )}
            </div>
        </div>
    );
}
