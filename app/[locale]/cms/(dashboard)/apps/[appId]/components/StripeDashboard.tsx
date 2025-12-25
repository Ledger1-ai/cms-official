"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, CreditCard, RefreshCw, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function StripeDashboard() {
    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                        <p className="text-xs text-slate-500 mt-1">
                            No revenue recorded
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Customers</CardTitle>
                        <Users className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-slate-500 mt-1">
                            No active customers
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#1A1B1E] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Net Volume</CardTitle>
                        <CreditCard className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                        <p className="text-xs text-slate-500 mt-1">
                            No recent volume
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Chart */}
            <Card className="bg-[#1A1B1E] border-white/10 text-white">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Revenue Overview</CardTitle>
                            <CardDescription className="text-slate-400">Daily revenue over time</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                            <RefreshCw className="h-3 w-3 mr-2" />
                            Sync
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5">
                    <div className="text-slate-500 text-sm flex flex-col items-center gap-2">
                        <DollarSign className="w-8 h-8 opacity-20" />
                        No revenue data available to display.
                    </div>
                </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-[#1A1B1E] border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-10 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
                        <AlertCircle className="w-6 h-6 mb-2 opacity-50" />
                        No recent payments found.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
