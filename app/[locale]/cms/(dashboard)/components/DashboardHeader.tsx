"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, MousePointerClick, Share2, FileText, GraduationCap, Shield } from "lucide-react";
import { ActiveUsersModal } from "@/components/cms/ActiveUsersModal";
import { BlogAnalyticsModal } from "@/components/cms/BlogAnalyticsModal";
import { getBlogStats } from "@/actions/analytics/get-blog-stats";
import { useParams } from "next/navigation";
import Link from "next/link";

interface DashboardHeaderProps {
    userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
    const params = useParams();
    const [showActiveUsers, setShowActiveUsers] = useState(false);
    const [showBlogAnalytics, setShowBlogAnalytics] = useState(false);
    const [stats, setStats] = useState({ totalClicks: 0, totalShares: 0, totalPostsWithEvents: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getBlogStats();
                if (data?.summary) {
                    setStats(data.summary);
                }
            } catch (error) {
                console.error("Failed to fetch blog stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="mb-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                        Welcome back, {userName}
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">
                        Manage your website content from here.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* University Button */}
                    <Link href={`/${params?.locale}/cms/university`}>
                        <button
                            className="relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/5 transition-all group"
                            title="University & SOPs"
                        >
                            <GraduationCap className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        </button>
                    </Link>

                    {/* Security Button */}
                    <Link href={`/${params?.locale}/cms/settings/security`}>
                        <button
                            className="relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/5 transition-all group"
                            title="Security Settings"
                        >
                            <Shield className="h-5 w-5 text-slate-400 group-hover:text-red-400 transition-colors" />
                        </button>
                    </Link>

                    {/* Active Users Button */}
                    <button
                        onClick={() => setShowActiveUsers(true)}
                        className="relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/5 transition-all group"
                        title="Active Users"
                    >
                        <Users className="h-5 w-5 text-slate-400 group-hover:text-white" />
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-[#0A0A0B] animate-pulse" />
                    </button>
                </div>
            </div>

            {/* Clickable Analytics Stats Banner */}
            <button
                onClick={() => setShowBlogAnalytics(true)}
                className="w-full glass border border-[var(--glass-border)] rounded-xl p-4 flex items-center gap-4 hover:shadow-[0_12px_40px_hsla(191,65%,46%,0.28)] transition-all cursor-pointer group"
                title="View Blog Analytics"
            >
                <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <span className="text-sm text-slate-400">Loading analytics...</span>
                    </div>
                ) : (
                    <>
                        {/* Stats Display */}
                        <div className="flex-1 grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <MousePointerClick className="h-4 w-4 text-cyan-400" />
                                <div>
                                    <div className="text-xl font-bold font-mono text-white">{stats.totalClicks.toLocaleString()}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">Link Clicks</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Share2 className="h-4 w-4 text-emerald-400" />
                                <div>
                                    <div className="text-xl font-bold font-mono text-white">{stats.totalShares.toLocaleString()}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">Shares</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-violet-400" />
                                <div>
                                    <div className="text-xl font-bold font-mono text-white">{stats.totalPostsWithEvents}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">Posts Engaged</div>
                                </div>
                            </div>
                        </div>

                        {/* View Analytics CTA */}
                        <div className="flex items-center gap-2 text-cyan-500/60 group-hover:text-cyan-400 transition-colors">
                            <span className="text-xs font-mono uppercase tracking-wider">View Details</span>
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </>
                )}
            </button>

            <ActiveUsersModal isOpen={showActiveUsers} onClose={() => setShowActiveUsers(false)} />
            <BlogAnalyticsModal isOpen={showBlogAnalytics} onClose={() => setShowBlogAnalytics(false)} />
        </div>
    );
}

