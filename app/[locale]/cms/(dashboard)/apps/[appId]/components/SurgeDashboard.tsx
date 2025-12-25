"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Split, Box, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function SurgeDashboard() {
    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-black border-white/10 text-white col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Balance (Est. USD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-mono tracking-tight">$0.00</div>
                        <div className="flex gap-4 mt-4">
                            <Button size="sm" className="bg-[#00FFA3] text-black hover:bg-[#00FFA3]/80">
                                <ArrowDownRight className="w-4 h-4 mr-2" />
                                Withdraw
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <ArrowUpRight className="w-4 h-4 mr-2" />
                                Deposit
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Splits</CardTitle>
                        <Split className="h-4 w-4 text-[#00FFA3]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-slate-500 mt-1">No active contracts</p>
                    </CardContent>
                </Card>

                <Card className="bg-black border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Inventory Items</CardTitle>
                        <Box className="h-4 w-4 text-[#00FFA3]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-slate-500 mt-1">Syncing...</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Asset Allocation Chart */}
                <Card className="bg-black border-white/10 text-white col-span-1">
                    <CardHeader>
                        <CardTitle>Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center text-slate-500 text-sm">
                        No assets found
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-black border-white/10 text-white col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Activity Ledger</CardTitle>
                        <Button variant="ghost" size="sm" className="text-[#00FFA3] hover:text-[#00FFA3]/80 hover:bg-transparent">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-10 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
                            No recent transactions
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Split Contract Preview */}
            <Card className="bg-black border-white/10 text-white">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Split className="w-5 h-5 text-[#00FFA3]" />
                            <CardTitle>Active Splits</CardTitle>
                        </div>
                        <Button variant="outline" size="sm">Manage Contracts</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">No split contracts configured.</p>
                </CardContent>
            </Card>
        </div>
    );
}
