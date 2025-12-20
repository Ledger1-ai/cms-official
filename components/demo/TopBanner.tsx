"use client";

import Link from "next/link";
import { ChevronRight, Globe, Shield, Zap } from "lucide-react";

export default function TopBanner() {
    const secondaryLinks = [
        { label: "Compare Us", href: "/compare" },
        { label: "Industries", href: "/industry" },
        { label: "Locations", href: "/location" },
    ];

    return (
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/5 flex items-center hidden lg:flex z-[60] text-xs font-medium">
            <div className="container mx-auto px-6 flex justify-between items-center text-slate-400">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        Enterprise Secure
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        Global CDN
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        99.99% Uptime
                    </span>
                </div>

                <nav className="flex items-center gap-6">
                    {secondaryLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:text-white transition-colors flex items-center group relative"
                        >
                            {link.label}
                            {/* Animated line */}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <div className="w-px h-3 bg-white/10" />
                    <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center group">
                        Contact Sales
                        <ChevronRight className="h-3 w-3 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </nav>
            </div>
        </div>
    );
}
