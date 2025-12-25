"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

interface UtilityDashboardProps {
    appId: string;
    appName: string;
    description: string;
}

export function UtilityDashboard({ appId, appName, description }: UtilityDashboardProps) {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const isConnected = false;

    // Branding
    const getBrandColor = () => {
        if (appId === "zapier") return "#FF4F00";
        if (appId === "yoast") return "#A4C639"; // Yoast Greenish
        if (appId === "wordpress") return "#21759B";
        return "#ffffff";
    };
    const brandColor = getBrandColor();
    const iconUrl = `https://cdn.simpleicons.org/${appId}/${brandColor.replace("#", "")}`;

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border`} style={{ backgroundColor: `${brandColor}1A`, borderColor: `${brandColor}33` }}>
                    <img src={iconUrl} className="w-10 h-10" alt={appName} />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Configure {appName}</h2>
                    <p className="text-slate-400">
                        {description}
                    </p>
                </div>
                <Button
                    size="lg"
                    style={{ backgroundColor: brandColor }}
                    className="text-white hover:opacity-90"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect {appName}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: appId,
                        name: appName,
                        icon: iconUrl,
                        description: description,
                        category: "Utility",
                        status: "active",
                        connected: false,
                        author: "Provider",
                        rating: 4.8,
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
                    <h2 className="text-2xl font-bold text-white">{appName} Status</h2>
                    <p className="text-slate-400">System health and activity.</p>
                </div>
                <Button style={{ backgroundColor: brandColor }} className="text-white hover:opacity-90">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Service Status</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-500">Operational</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Tasks</CardTitle>
                        <Zap className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
