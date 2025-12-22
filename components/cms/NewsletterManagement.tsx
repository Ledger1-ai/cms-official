"use client";

import { useEffect, useState, useCallback } from "react";
import { getNewsletterSubscribers, deleteSubscriber } from "@/actions/cms/subscriptions";
import { useSession } from "next-auth/react";
import { Loader2, Search, MoreHorizontal, Trash2, Mail, LayoutGrid, List, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function NewsletterManagement() {
    const { data: session } = useSession();
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const fetchSubscribers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getNewsletterSubscribers(searchQuery);
            setSubscribers(data);
        } catch (error) {
            toast.error("Failed to load subscribers");
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const debounce = setTimeout(fetchSubscribers, 300);
        return () => clearTimeout(debounce);
    }, [fetchSubscribers, searchQuery]);


    const handleDelete = async (id: string, email: string) => {
        if (!confirm(`Are you sure you want to remove ${email} from the newsletter?`)) return;

        try {
            const result = await deleteSubscriber(id);
            if (result.success) {
                toast.success("Subscriber removed");
                fetchSubscribers();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Newsletter</h2>
                    <p className="text-slate-400 text-sm">Manage your email subscribers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-black border border-white/10 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn("p-2 rounded-md transition-all", viewMode === "grid" ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white")}
                            title="Grid View"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn("p-2 rounded-md transition-all", viewMode === "list" ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white")}
                            title="List View"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-[#0A0A0B] p-2 rounded-xl border border-white/10 w-fit">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search subscribers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[300px] bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Content Area */}
            {loading && subscribers.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading subscribers...</p>
                </div>
            ) : viewMode === "list" ? (
                /* List View */
                <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0A0A0B] backdrop-blur-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-black/40 text-slate-400 font-medium">
                            <tr>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Source</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-slate-400 border border-white/10">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium text-white">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="outline" className={cn(
                                            "gap-1",
                                            sub.status === "SUBSCRIBED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                                        )}>
                                            {sub.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-slate-500 flex items-center gap-2">
                                        <Globe className="h-3 w-3" />
                                        {sub.source || "Website"}
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        {format(new Date(sub.createdAt), 'MMM d, yyyy')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                            onClick={() => handleDelete(sub.id, sub.email)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No subscribers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subscribers.map((sub) => (
                        <div key={sub.id} className="bg-[#0A0A0B]/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center relative group hover:border-white/20 transition-all">
                            <div className="absolute top-4 right-4">
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleDelete(sub.id, sub.email)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5 mb-4 shadow-inner">
                                <Mail className="h-8 w-8" />
                            </div>

                            <h3 className="text-sm font-semibold text-white mb-4 truncate w-full px-2" title={sub.email}>
                                {sub.email}
                            </h3>

                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                <Badge variant="outline" className={cn(
                                    "gap-1",
                                    sub.status === "SUBSCRIBED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                                )}>
                                    {sub.status}
                                </Badge>
                                <Badge variant="outline" className="bg-slate-800 text-slate-500 border-white/5">
                                    {sub.source || "Website"}
                                </Badge>
                            </div>

                            <div className="mt-auto w-full pt-4 border-t border-white/5 text-xs text-slate-500">
                                Joined {format(new Date(sub.createdAt), 'MMM d, yyyy')}
                            </div>
                        </div>
                    ))}
                    {!loading && subscribers.length === 0 && (
                        <div className="col-span-full p-12 text-center text-slate-500 border border-dashed border-white/10 rounded-xl">
                            No subscribers found.
                        </div>
                    )}
                </div>
            )}
        </div >
    );
}
