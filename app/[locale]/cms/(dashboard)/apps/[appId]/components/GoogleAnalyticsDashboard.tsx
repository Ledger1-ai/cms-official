"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Clock, Globe, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";
// Assuming we'll re-use the config modal or a specific "Connect" button that triggers it.

export function GoogleAnalyticsDashboard() {
    const [isConnected, setIsConnected] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // TODO: Check actual DB connection status via API
    // For now, default to "Not Connected" to respect "No Seeded Data" request
    // or maybe check local storage / mock simply.
    // Let's assume NOT connected for the demo of the "Zero Data" state.

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#E37400]/10 rounded-3xl flex items-center justify-center border border-[#E37400]/20">
                    <BarChart3 className="w-10 h-10 text-[#E37400]" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Connect Google Analytics</h2>
                    <p className="text-slate-400">
                        Link your GA4 property to see real-time traffic, user demographics, and content performance directly in your CMS.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-[#E37400] hover:bg-[#E37400]/90 text-white"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect Property
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Re-use generic app config modal for GA4 */}
                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: "google-analytics",
                        name: "Google Analytics 4",
                        icon: "https://cdn.simpleicons.org/googleanalytics/E37400",
                        description: "Traffic analytics.",
                        category: "Analytics",
                        status: "active",
                        connected: false,
                        author: "Google",
                        rating: 4.5,
                        installs: "10M+",
                        updatedAt: "Just now"
                    }}
                />
            </div>
        );
    }

    // Connected State (Placeholder Structure for Real Data)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Traffic Overview</h2>
                    <p className="text-slate-400">Real-time data from your connected stream.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Live
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Users in last 30m</CardTitle>
                        <Users className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-slate-500">Waiting for data...</p>
                    </CardContent>
                </Card>
                {/* More empty cards... */}
            </div>
        </div>
    );
}
