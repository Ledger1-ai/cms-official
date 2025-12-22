"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, BookOpen, Settings, Globe, Users, Share2, Image as ImageIcon, Shield, Activity, GraduationCap, Mail, Contact2, LayoutTemplate, Grid, List, PlusCircle, Tags, Folder, Scan, Layout, ShoppingCart, PenTool, Wrench, Brain, User, File, Mic, Users2, FileInput, Search, LayoutTemplate as LucideLayoutTemplate, UserCheck, Loader2, Sparkles, Plus, DollarSign } from "lucide-react";
import NewsletterModal from "./NewsletterModal";
import { cn } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

// Icon mapping matching layout.tsx
export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    LayoutDashboard, FileText, Briefcase, BookOpen, Settings, Globe, Users, Share2, ImageIcon, Shield, Activity, GraduationCap, Mail, Contact2, LayoutTemplate, Grid, List, PlusCircle, Tags, Folder, Scan, Layout, ShoppingCart, PenTool, Wrench, Brain, User, File, Mic, Users2, FileInput, Search, DollarSign
};

export interface NavModule {
    slug: string;
    href: string;
    icon: string;
    label: string;
    section: string | null;
    options?: {
        label: string;
        href: string;
        icon?: string;
    }[];
    color?: string;
    hidden?: boolean;
}

interface SidebarNavProps {
    modules: NavModule[];
    className?: string;
    onLinkClick?: () => void;
    compact?: boolean;
}

// Color mapping for hover effects (Text + Glow)
export const COLOR_VARIANTS: Record<string, { hover: string, active: string, raw: string }> = {
    sky: { raw: "rgba(56,189,248,0.8)", hover: "hover:text-sky-400 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]", active: "text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]" },
    amber: { raw: "rgba(251,191,36,0.8)", hover: "hover:text-amber-400 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]", active: "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" },
    purple: { raw: "rgba(192,132,252,0.8)", hover: "hover:text-purple-400 hover:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]", active: "text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.9)]" },
    pink: { raw: "rgba(244,114,182,0.8)", hover: "hover:text-pink-400 hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]", active: "text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.9)]" },
    orange: { raw: "rgba(251,146,60,0.8)", hover: "hover:text-orange-400 hover:drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]", active: "text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.9)]" },
    blue: { raw: "rgba(96,165,250,0.8)", hover: "hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]", active: "text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.9)]" },
    rose: { raw: "rgba(251,113,133,0.8)", hover: "hover:text-rose-400 hover:drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]", active: "text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.9)]" },
    teal: { raw: "rgba(45,212,191,0.8)", hover: "hover:text-teal-400 hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]", active: "text-teal-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.9)]" },
    indigo: { raw: "rgba(129,140,248,0.8)", hover: "hover:text-indigo-400 hover:drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]", active: "text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.9)]" },
    cyan: { raw: "rgba(34,211,238,0.8)", hover: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]", active: "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]" },
    lime: { raw: "rgba(163,230,53,0.8)", hover: "hover:text-lime-400 hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]", active: "text-lime-400 drop-shadow-[0_0_12px_rgba(163,230,53,0.9)]" },
    yellow: { raw: "rgba(250,204,21,0.8)", hover: "hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]", active: "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]" },
    fuchsia: { raw: "rgba(232,121,249,0.8)", hover: "hover:text-fuchsia-400 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]", active: "text-fuchsia-400 drop-shadow-[0_0_12px_rgba(232,121,249,0.9)]" },
    violet: { raw: "rgba(167,139,250,0.8)", hover: "hover:text-violet-400 hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]", active: "text-violet-400 drop-shadow-[0_0_12px_rgba(167,139,250,0.9)]" },
    emerald: { raw: "rgba(52,211,153,0.8)", hover: "hover:text-emerald-400 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]", active: "text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]" },
    red: { raw: "rgba(248,113,113,0.8)", hover: "hover:text-red-400 hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]", active: "text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]" },
    slate: { raw: "rgba(203,213,225,0.6)", hover: "hover:text-slate-300 hover:drop-shadow-[0_0_10px_rgba(203,213,225,0.6)]", active: "text-slate-300 drop-shadow-[0_0_12px_rgba(203,213,225,0.7)]" },
    gray: { raw: "rgba(209,213,219,0.6)", hover: "hover:text-gray-300 hover:drop-shadow-[0_0_10px_rgba(209,213,219,0.6)]", active: "text-gray-300 drop-shadow-[0_0_12px_rgba(209,213,219,0.7)]" },
};

export default function SidebarNav({ modules, className, onLinkClick, compact = false }: SidebarNavProps) {
    const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Group by section
    const sections = new Map<string | null, NavModule[]>();
    for (const mod of modules) {
        const sec = mod.section;
        if (!sections.has(sec)) sections.set(sec, []);
        sections.get(sec)!.push(mod);
    }

    const isLinkActive = (itemHref: string) => {
        if (!itemHref || itemHref === "#") return false;

        const [path, query] = itemHref.split('?');

        // Locale-aware path check
        if (pathname !== path) return false;

        // Search params check
        if (query) {
            const itemParams = new URLSearchParams(query);
            let match = true;
            itemParams.forEach((val, key) => {
                if (searchParams.get(key) !== val) match = false;
            });
            return match;
        }

        return true;
    };

    return (
        <>
            <nav className={cn("space-y-0.5", className)}>
                {Array.from(sections.entries()).map(([section, mods]) => (
                    <div key={section || "main"}>
                        {section && !compact && (
                            <div className="pt-3 pb-1 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-80">
                                {section}
                            </div>
                        )}
                        <div className="space-y-1">
                            {mods.filter(m => !m.hidden).map((mod) => {
                                const IconComponent = ICON_MAP[mod.icon] || LayoutDashboard;
                                const isParentActive = pathname === mod.href || (mod.href !== "#" && mod.href.length > 3 && pathname.startsWith(mod.href));

                                const variant = mod.color && COLOR_VARIANTS[mod.color] ? COLOR_VARIANTS[mod.color] : { raw: "", hover: "hover:text-white", active: "text-white" };

                                // Parent should always have a subtle version of the color if any option is active
                                const isAnyOptionActive = !!mod.options?.some(opt => isLinkActive(opt.href));
                                const shouldHighlightParent = isParentActive || isAnyOptionActive;

                                const parentStyle = shouldHighlightParent ? variant.active : variant.hover.replace(/hover:/g, "group-hover/item:");

                                if (mod.slug === "newsletter") {
                                    return (
                                        <button
                                            key={mod.slug}
                                            onClick={() => {
                                                setIsNewsletterOpen(true);
                                                if (onLinkClick) onLinkClick();
                                            }}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-1.5 text-sm font-semibold rounded-xl hover:bg-white/5 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/5 group/item",
                                                compact ? "justify-center px-0" : "",
                                                shouldHighlightParent ? "bg-white/5 text-white" : "text-slate-400"
                                            )}
                                            title={compact ? mod.label : undefined}
                                        >
                                            <span className={cn("h-4 w-4 transition-all duration-300", compact ? "h-6 w-6" : "", "group-hover/item:scale-110", parentStyle)}>
                                                <IconComponent className="h-full w-full" />
                                            </span>
                                            {!compact && (
                                                <span className={cn("transition-colors", parentStyle)}>
                                                    {mod.label}
                                                </span>
                                            )}
                                        </button>
                                    );
                                }

                                return (
                                    <HoverCard key={mod.slug} openDelay={0} closeDelay={100}>
                                        <HoverCardTrigger asChild>
                                            <Link
                                                href={mod.href}
                                                onClick={onLinkClick}
                                                className={cn(
                                                    "flex items-center gap-3 px-3 py-1.5 text-sm font-semibold rounded-xl hover:bg-white/5 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/5 w-full",
                                                    compact ? "justify-center px-0" : "",
                                                    group_item_active_state(shouldHighlightParent)
                                                )}
                                                title={compact ? mod.label : undefined}
                                            >
                                                <span className={cn("h-4 w-4 transition-all duration-300", compact ? "h-6 w-6" : "", "group-hover/item:scale-110", parentStyle)}>
                                                    <IconComponent className="h-full w-full" />
                                                </span>
                                                {!compact && (
                                                    <span className={cn("transition-colors", parentStyle)}>
                                                        {mod.label}
                                                    </span>
                                                )}
                                            </Link>
                                        </HoverCardTrigger>
                                        {mod.options && mod.options.length > 0 && (
                                            <HoverCardContent
                                                side="right"
                                                align="start"
                                                sideOffset={10}
                                                className="w-56 bg-[#0A0A0B]/95 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl shadow-black rounded-xl z-50"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <div className="px-2 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 mb-1">
                                                        {mod.label} Options
                                                    </div>
                                                    {mod.options.map((option, idx) => {
                                                        const SubIcon = option.icon ? (ICON_MAP[option.icon] || LayoutDashboard) : LayoutDashboard;
                                                        const isSubActive = isLinkActive(option.href);

                                                        return (
                                                            <Link
                                                                key={idx}
                                                                href={option.href}
                                                                onClick={onLinkClick}
                                                                className={cn(
                                                                    "flex items-center gap-3 px-2 py-2 text-sm rounded-lg transition-all duration-200 group/sub",
                                                                    isSubActive
                                                                        ? cn("bg-white/10 shadow-inner", variant.active)
                                                                        : cn("text-slate-400 hover:bg-white/5", variant.hover)
                                                                )}
                                                            >
                                                                <SubIcon className={cn("h-4 w-4 shrink-0 transition-transform duration-300 group-hover/sub:scale-110", isSubActive ? variant.active : "")} />
                                                                <span className="font-bold truncate tracking-tight">
                                                                    {option.label}
                                                                </span>
                                                                {isSubActive && (
                                                                    <div className="ml-auto w-1 h-1 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                                                                )}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </HoverCardContent>
                                        )}
                                    </HoverCard>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
            <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
        </>
    );
}

function group_item_active_state(active: boolean) {
    return active ? "bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.03)]" : "text-slate-400 group/item";
}
