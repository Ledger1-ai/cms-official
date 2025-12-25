"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bell, Hash, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

export function SlackDashboard() {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const isConnected = false;

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#4A154B]/10 rounded-3xl flex items-center justify-center border border-[#4A154B]/20">
                    <img src="https://cdn.simpleicons.org/slack/4A154B" className="w-10 h-10" alt="Slack" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Connect Workspace</h2>
                    <p className="text-slate-400">
                        Connect Slack to receive real-time alerts for new orders, customer inquiries, and system events.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-[#4A154B] hover:bg-[#4A154B]/90 text-white"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect Slack
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: "slack",
                        name: "Slack",
                        icon: "https://cdn.simpleicons.org/slack/4A154B",
                        description: "Team communication.",
                        category: "Marketing",
                        status: "active",
                        connected: false,
                        author: "Salesforce",
                        rating: 4.9,
                        installs: "10M+",
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
                    <h2 className="text-2xl font-bold text-white">Notification Center</h2>
                    <p className="text-slate-400">Manage your workspace alerts.</p>
                </div>
                <Button className="bg-[#4A154B] text-white hover:bg-[#4A154B]/80">
                    Test Alert
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Channels</CardTitle>
                        <Hash className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Alerts Sent (24h)</CardTitle>
                        <Bell className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
