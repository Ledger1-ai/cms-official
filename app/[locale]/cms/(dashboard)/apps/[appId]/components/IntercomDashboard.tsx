"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

export function IntercomDashboard() {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const isConnected = false;

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#000000]/30 rounded-3xl flex items-center justify-center border border-white/10">
                    {/* Intercom logo usually blue/black, using simple icon url in modal */}
                    <img src="https://cdn.simpleicons.org/intercom/2569EC" className="w-10 h-10" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Connect Inbox</h2>
                    <p className="text-slate-400">
                        Link Intercom to manage customer conversations, view support metrics, and engage with users.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-[#2569EC] hover:bg-[#2569EC]/90 text-white"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect Intercom
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: "intercom",
                        name: "Intercom",
                        icon: "https://cdn.simpleicons.org/intercom/2569EC",
                        description: "Customer messaging.",
                        category: "Marketing",
                        status: "active",
                        connected: false,
                        author: "Intercom",
                        rating: 4.7,
                        installs: "200k+",
                        updatedAt: "2 weeks ago"
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Inbox Overview</h2>
                    <p className="text-slate-400">Support performance and active chats.</p>
                </div>
                <Button className="bg-[#2569EC] hover:bg-[#2569EC]/90 text-white">
                    Open Messenger
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Open Conversations</CardTitle>
                        <MessageSquare className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Avg. Response Time</CardTitle>
                        <Clock className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-- min</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
