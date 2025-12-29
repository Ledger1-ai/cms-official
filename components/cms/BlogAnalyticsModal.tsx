"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MousePointerClick, Share2, FileText, TrendingUp, Maximize2, Minimize2, RefreshCw, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getBlogStats } from "@/actions/analytics/get-blog-stats";
import { Card, AreaChart, DonutChart, Legend } from "@tremor/react";
import { cn } from "@/lib/utils";

interface BlogAnalyticsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BlogStats {
    chartData: Array<{ date: string; Clicks: number; Shares: number }>;
    topPosts: Array<{ url: string; title: string; clicks: number; shares: number; total: number }>;
    sharePlatforms: Array<{ name: string; value: number }>;
    kpiData: Array<{ title: string; metric: string; delta: string; deltaType: string; icon: string }>;
    summary: { totalClicks: number; totalShares: number; totalPostsWithEvents: number };
}

export function BlogAnalyticsModal({ isOpen, onClose }: BlogAnalyticsModalProps) {
    const [stats, setStats] = useState<BlogStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = useCallback(async () => {
        try {
            setRefreshing(true);
            const data = await getBlogStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch blog stats", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setIsExpanded(false);
            return;
        }
        fetchStats();
    }, [isOpen, fetchStats]);

    const iconMap: Record<string, React.ReactNode> = {
        MousePointerClick: <MousePointerClick className="h-6 w-6" />,
        Share2: <Share2 className="h-6 w-6" />,
        FileText: <FileText className="h-6 w-6" />,
    };

    const platformColors = ["cyan", "blue", "indigo", "violet", "fuchsia"];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className={cn(
                    "bg-[#0A0A0B] backdrop-blur-xl border border-white/10 text-cyan-50 p-0 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-2xl transition-all duration-300",
                    isExpanded ? "max-w-6xl h-[90vh]" : "max-w-3xl max-h-[85vh]"
                )}
            >
                <DialogTitle className="sr-only">Blog Analytics Dashboard</DialogTitle>

                {/* Header */}
                <div className="bg-black/40 border-b border-white/10 p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden gap-4 md:gap-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                    <div className="relative z-10 w-full md:w-auto">
                        <h2 className="text-lg md:text-xl font-bold tracking-widest text-cyan-400 font-mono flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                            BLOG_ANALYTICS
                        </h2>
                        <p className="text-[10px] md:text-xs text-cyan-600/80 font-mono mt-1 w-full truncate">
                            CTR & SHARE TRACKING // 30-DAY WINDOW
                        </p>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-3 relative z-10">
                        <div className="flex items-center gap-2 md:gap-3">
                            <button
                                onClick={fetchStats}
                                disabled={refreshing}
                                className="p-1.5 md:p-2 rounded-lg bg-black border border-white/10 hover:border-cyan-500/50 transition-all group"
                                title="Refresh data"
                            >
                                <RefreshCw className={cn("h-3.5 w-3.5 md:h-4 md:w-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500", refreshing && "animate-spin")} />
                            </button>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1.5 md:p-2 rounded-lg bg-black border border-white/10 hover:border-cyan-500/50 transition-all hidden md:flex"
                                title={isExpanded ? "Compact view" : "Expand view"}
                            >
                                {isExpanded ? (
                                    <Minimize2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-cyan-400" />
                                ) : (
                                    <Maximize2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-cyan-400" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded-full border border-white/5 md:border-none md:bg-transparent md:p-0">
                            <span className="block h-1.5 w-1.5 md:h-2 md:w-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></span>
                            <span className="text-[10px] md:text-xs font-mono text-cyan-400">LIVE</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: isExpanded ? 'calc(90vh - 140px)' : 'calc(85vh - 140px)' }}>
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                        </div>
                    ) : stats ? (
                        <div className="space-y-6">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {stats.kpiData.map((kpi, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-black border border-white/10 p-4 rounded-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all"
                                    >
                                        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity text-cyan-400">
                                            {iconMap[kpi.icon]}
                                        </div>
                                        <p className="text-xs font-mono text-cyan-600 mb-1 uppercase">{kpi.title}</p>
                                        <div className="text-3xl font-bold text-white font-mono">
                                            {kpi.metric}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-mono mt-2 inline-block px-2 py-0.5 rounded-full",
                                            kpi.deltaType === "increase" ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-slate-400"
                                        )}>
                                            {kpi.delta}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Row */}
                            <div className={cn("grid gap-6", isExpanded ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2")}>
                                {/* Trend Chart */}
                                <Card className={cn(
                                    "bg-[#0A0A0B] ring-1 ring-white/10 shadow-sm border-none",
                                    isExpanded ? "lg:col-span-2" : "col-span-1 md:col-span-2"
                                )}>
                                    <p className="text-sm font-mono text-cyan-600 mb-1">ENGAGEMENT_TREND</p>
                                    <p className="text-xs text-slate-500 mb-4">Daily clicks & shares over 30 days</p>
                                    {stats.chartData.length > 0 ? (
                                        <AreaChart
                                            className="h-52"
                                            data={stats.chartData}
                                            index="date"
                                            categories={["Clicks", "Shares"]}
                                            colors={["cyan", "blue"]}
                                            yAxisWidth={40}
                                            showAnimation={true}
                                        />
                                    ) : (
                                        <div className="h-52 flex items-center justify-center text-slate-500 text-sm">
                                            No data yet. Events will appear here after users interact with blog posts.
                                        </div>
                                    )}
                                </Card>

                                {/* Share Distribution */}
                                <Card className="bg-[#0A0A0B] ring-1 ring-white/10 shadow-sm border-none">
                                    <p className="text-sm font-mono text-cyan-600 mb-1">SHARE_PLATFORMS</p>
                                    <p className="text-xs text-slate-500 mb-4">Distribution by network</p>
                                    {stats.sharePlatforms.length > 0 ? (
                                        <>
                                            <DonutChart
                                                data={stats.sharePlatforms}
                                                category="value"
                                                index="name"
                                                colors={platformColors}
                                                variant="pie"
                                                className="h-32"
                                            />
                                            <Legend
                                                categories={stats.sharePlatforms.map(p => p.name)}
                                                colors={platformColors}
                                                className="mt-4"
                                            />
                                        </>
                                    ) : (
                                        <div className="h-32 flex items-center justify-center text-slate-500 text-sm text-center">
                                            No shares yet
                                        </div>
                                    )}
                                </Card>
                            </div>

                            {/* Top Posts Table */}
                            <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/10">
                                    <p className="text-sm font-mono text-cyan-600">TOP_PERFORMING_POSTS</p>
                                    <p className="text-xs text-slate-500">Ranked by total engagement</p>
                                </div>
                                {stats.topPosts.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-white/5">
                                                <tr>
                                                    <th className="text-left py-3 px-4 text-cyan-500 font-mono text-xs">#</th>
                                                    <th className="text-left py-3 px-4 text-cyan-500 font-mono text-xs">POST</th>
                                                    <th className="text-right py-3 px-4 text-cyan-500 font-mono text-xs">CLICKS</th>
                                                    <th className="text-right py-3 px-4 text-cyan-500 font-mono text-xs">SHARES</th>
                                                    <th className="text-right py-3 px-4 text-cyan-500 font-mono text-xs">TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stats.topPosts.map((post, idx) => (
                                                    <tr key={idx} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                                        <td className="py-3 px-4 text-slate-400 font-mono">{idx + 1}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="text-white font-medium capitalize">{post.title}</div>
                                                            <div className="text-xs text-slate-500 truncate max-w-xs">{post.url}</div>
                                                        </td>
                                                        <td className="py-3 px-4 text-right text-cyan-400 font-mono">{post.clicks}</td>
                                                        <td className="py-3 px-4 text-right text-cyan-400 font-mono">{post.shares}</td>
                                                        <td className="py-3 px-4 text-right text-white font-bold font-mono">{post.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500 text-sm">
                                        No blog engagement data yet. Events will appear here after users click links or share posts.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            Failed to load analytics data. Please try again.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-black/80 p-4 text-center border-t border-white/10">
                    <p className="text-[10px] text-cyan-700 font-mono">
                        BASALT_ANALYTICS // BLOG ENGAGEMENT TRACKER // DATA REFRESHES ON OPEN
                    </p>
                </div>

            </DialogContent>
        </Dialog>
    );
}
