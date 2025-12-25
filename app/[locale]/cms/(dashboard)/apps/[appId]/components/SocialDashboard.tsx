"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Repeat2, BarChart2, PenSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

interface SocialDashboardProps {
    appId: string;
    appName: string;
    accentColor: string;
    iconUrl: string;
}

export function SocialDashboard({ appId, appName, accentColor, iconUrl }: SocialDashboardProps) {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // Placeholder 'connected' state logic
    // In real app, check DB. For now, zero-state default as requested.
    const isConnected = false;

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center border border-white/10" style={{ backgroundColor: `${accentColor}20` }}>
                    <img src={iconUrl} alt={appName} className="w-10 h-10 object-contain" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Connect {appName}</h2>
                    <p className="text-slate-400">
                        Link your account to track post performance, engagement metrics, and broadcast content directly from your CMS.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: accentColor }}
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: appId,
                        name: appName,
                        icon: iconUrl,
                        description: `Manage your ${appName} presence.`,
                        category: "Social",
                        status: "active",
                        connected: false,
                        author: appName,
                        rating: 4.5,
                        installs: "1M+",
                        updatedAt: "Just now"
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Broadcast Hub</h2>
                    <p className="text-slate-400">Manage your {appName} presence</p>
                </div>
                <Button className="text-white" style={{ backgroundColor: accentColor }}>
                    <PenSquare className="w-4 h-4 mr-2" />
                    New Post
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Followers</CardTitle>
                        <BarChart2 className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Impressions (7d)</CardTitle>
                        <BarChart2 className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Engagement Rate</CardTitle>
                        <Heart className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--%</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#1A1B1E] border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-10 text-slate-500 text-sm">
                    No posts found in the last 30 days.
                </CardContent>
            </Card>
        </div>
    );
}
