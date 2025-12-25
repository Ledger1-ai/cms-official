"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Settings, Activity, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

export function AlgoliaDashboard() {
    const [isConnected, setIsConnected] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#003DFF]/10 rounded-3xl flex items-center justify-center border border-[#003DFF]/20">
                    <Search className="w-10 h-10 text-[#003DFF]" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Configure Search Index</h2>
                    <p className="text-slate-400">
                        Connect your Algolia Application ID to monitor search performance, queries, and indexing status.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-[#003DFF] hover:bg-[#003DFF]/90 text-white"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Configure Index
                    <Settings className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: "algolia",
                        name: "Algolia",
                        icon: "https://cdn.simpleicons.org/algolia/003DFF",
                        description: "Search analytics.",
                        category: "Analytics",
                        status: "active",
                        connected: false,
                        author: "Algolia",
                        rating: 4.7,
                        installs: "500k+",
                        updatedAt: "1 week ago"
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Search Health</h2>
                    <p className="text-slate-400">Index: <code>main_production</code></p>
                </div>
                <Button variant="ghost" className="text-[#003DFF]">
                    Open Algolia Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-slate-500">Total Records</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-slate-500">Search Ops (Month)</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">-- ms</div>
                        <p className="text-xs text-slate-500">Avg. Response Time</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
