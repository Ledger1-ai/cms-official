"use client";

import { useEffect, useState, useCallback } from "react";
import { getClients } from "@/actions/cms/subscriptions";
import { deleteUser, toggleUserStatus, resetUserPassword } from "@/actions/cms/users";
import { UserManagementModal } from "@/components/cms/UserManagementModal";
import { DeleteUserDialog } from "@/components/cms/DeleteUserDialog";
import { ResetPasswordDialog } from "@/components/cms/ResetPasswordDialog";
import { useSession } from "next-auth/react";
import { Loader2, Search, MoreHorizontal, Pencil, Trash2, AlertCircle, LayoutGrid, List, Lock, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ClientManagement() {
    const { data: session } = useSession();
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const fetchClients = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getClients(searchQuery);
            setClients(data);
        } catch (error) {
            toast.error("Failed to load clients");
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const debounce = setTimeout(fetchClients, 300);
        return () => clearTimeout(debounce);
    }, [fetchClients, searchQuery]);

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchClients();
    };

    const handleEdit = (client: any) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const [clientToDelete, setClientToDelete] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDeleteClick = (client: any) => {
        setClientToDelete(client);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!clientToDelete) return;
        setDeleteLoading(true);
        try {
            const result = await deleteUser(clientToDelete.id);
            if (result.success) {
                toast.success("Client deleted");
                fetchClients();
                setIsDeleteModalOpen(false);
                setClientToDelete(null);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleToggleStatus = async (client: any) => {
        const newStatus = client.userStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        const result = await toggleUserStatus(client.id, newStatus);
        if (result.success) {
            toast.success(`Client ${newStatus === "ACTIVE" ? "activated" : "deactivated"}`);
            fetchClients();
        } else {
            toast.error(result.error);
        }
    };

    const [clientToReset, setClientToReset] = useState<any>(null);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const handleResetPassword = (client: any) => {
        setClientToReset(client);
        setIsResetModalOpen(true);
    };

    const confirmResetPassword = async () => {
        if (!clientToReset) return;
        setResetLoading(true);
        const toastId = toast.loading("Resetting password...");
        try {
            const result = await resetUserPassword(clientToReset.id);
            if (result.success) {
                toast.success(result.message, { id: toastId });
                setIsResetModalOpen(false);
                setClientToReset(null);
            } else {
                toast.error(result.error, { id: toastId });
            }
        } catch (e) {
            toast.error("Failed to reset password", { id: toastId });
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Client Accounts</h2>
                    <p className="text-slate-400 text-sm">Manage enrolled clients and their subscriptions.</p>
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
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[300px] bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Content Area */}
            {loading && clients.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading clients...</p>
                </div>
            ) : viewMode === "list" ? (
                /* List View */
                <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0A0A0B] backdrop-blur-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-black/40 text-slate-400 font-medium">
                            <tr>
                                <th className="p-4">Client</th>
                                <th className="p-4">Plan</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-white/10">
                                                <AvatarImage src={client.avatar} className="object-cover" />
                                                <AvatarFallback className="bg-black text-slate-400">{client.name?.[0]?.toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-white">{client.name || "Unknown"}</div>
                                                <p className="text-xs text-slate-500">{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {client.assigned_team?.assigned_plan ? (
                                            <Badge variant="outline" className={cn(
                                                "gap-1.5",
                                                client.assigned_team.assigned_plan.slug === "GROWTH" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                    client.assigned_team.assigned_plan.slug === "SCALE" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                                        "bg-white/5 text-slate-400 border-white/5"
                                            )}>
                                                <CreditCard className="h-3 w-3" />
                                                {client.assigned_team.assigned_plan.name}
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-white/5 text-slate-500 border-white/5">No Plan</Badge>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Badge
                                            variant="outline"
                                            className={
                                                client.userStatus === "ACTIVE"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                            }
                                        >
                                            {client.userStatus}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        {format(new Date(client.created_on), 'MMM d, yyyy')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-[#0A0A0B] border-white/10 text-white">
                                                <DropdownMenuItem onClick={() => handleEdit(client)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleResetPassword(client)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                                    <Lock className="mr-2 h-4 w-4 text-amber-400" /> Reset Password
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleToggleStatus(client)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                                    <AlertCircle className="mr-2 h-4 w-4" />
                                                    {client.userStatus === "ACTIVE" ? "Suspend Client" : "Activate Client"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteClick(client)} className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 hover:text-red-400">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Client
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            {!loading && clients.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No clients found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-[#0A0A0B]/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center relative group hover:border-white/20 transition-all">
                            <div className="absolute top-4 right-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#0A0A0B] border-white/10 text-white">
                                        <DropdownMenuItem onClick={() => handleEdit(client)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                            <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleResetPassword(client)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                            <Lock className="mr-2 h-4 w-4 text-amber-400" /> Reset Password
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleToggleStatus(client)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                            <AlertCircle className="mr-2 h-4 w-4" />
                                            {client.userStatus === "ACTIVE" ? "Suspend Client" : "Activate Client"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDeleteClick(client)} className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 hover:text-red-400">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Client
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <Avatar className="h-20 w-20 border-2 border-white/10 mb-4">
                                <AvatarImage src={client.avatar} className="object-cover" />
                                <AvatarFallback className="bg-slate-800 text-slate-400 text-xl">{client.name?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <h3 className="text-lg font-semibold text-white mb-1">{client.name || "Unknown"}</h3>
                            <p className="text-sm text-slate-500 mb-4 truncate w-full">{client.assigned_team?.name || client.company || "No Company"}</p>

                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {client.assigned_team?.assigned_plan ? (
                                    <Badge variant="outline" className={cn(
                                        "gap-1.5",
                                        client.assigned_team.assigned_plan.slug === "GROWTH" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                            client.assigned_team.assigned_plan.slug === "SCALE" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                                "bg-slate-800 text-slate-400 border-slate-700"
                                    )}>
                                        <CreditCard className="h-3 w-3" />
                                        {client.assigned_team.assigned_plan.name}
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="bg-slate-800 text-slate-500 border-white/5">No Plan</Badge>
                                )}
                                <Badge
                                    variant="outline"
                                    className={
                                        client.userStatus === "ACTIVE"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }
                                >
                                    {client.userStatus}
                                </Badge>
                            </div>

                            <div className="mt-auto w-full pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs text-slate-500">
                                <div className="text-left">
                                    <span className="block text-slate-600">Joined</span>
                                    {format(new Date(client.created_on), 'MMM d, yyyy')}
                                </div>
                                <div className="text-right">
                                    <span className="block text-slate-600">ID</span>
                                    #{client.id.slice(-4)}
                                </div>
                            </div>
                        </div>
                    ))}
                    {!loading && clients.length === 0 && (
                        <div className="col-span-full p-12 text-center text-slate-500 border border-dashed border-white/10 rounded-xl">
                            No clients found.
                        </div>
                    )}
                </div>
            )}

            <UserManagementModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                user={selectedClient}
            />

            <DeleteUserDialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
                userName={clientToDelete?.name}
            />

            <ResetPasswordDialog
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={confirmResetPassword}
                loading={resetLoading}
                userName={clientToReset?.name}
            />
        </div >
    );
}
