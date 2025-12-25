"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

export function HubSpotDashboard() {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const isConnected = false;

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#FF7A59]/10 rounded-3xl flex items-center justify-center border border-[#FF7A59]/20">
                    <img src="https://cdn.simpleicons.org/hubspot/FF7A59" className="w-10 h-10" alt="HubSpot" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Connect CRM</h2>
                    <p className="text-slate-400">
                        Sync your HubSpot contacts, deals, and marketing campaigns with the CMS.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-[#FF7A59] hover:bg-[#FF7A59]/90 text-white"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect HubSpot
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: "hubspot",
                        name: "HubSpot",
                        icon: "https://cdn.simpleicons.org/hubspot/FF7A59",
                        description: "CRM & Marketing.",
                        category: "Marketing",
                        status: "active",
                        connected: false,
                        author: "HubSpot",
                        rating: 4.7,
                        installs: "4M+",
                        updatedAt: "2 days ago"
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">CRM Overview</h2>
                    <p className="text-slate-400">Pipeline and contact growth.</p>
                </div>
                <Button className="bg-[#FF7A59] text-white hover:bg-[#FF7A59]/80">
                    View Contacts
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Contacts</CardTitle>
                        <Users className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Deals</CardTitle>
                        <Target className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Deal Value</CardTitle>
                        <TrendingUp className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
