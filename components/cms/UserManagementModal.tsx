"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { upsertUser, getRoles } from "@/actions/cms/users";
import { toast } from "sonner";
import { Loader2, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// CMS Modules available for toggling
const CMS_MODULES = [
    { slug: "dashboard", label: "Dashboard" },
    { slug: "analytics", label: "Analytics" },
    { slug: "applications", label: "Applications (Recruitment)" },
    { slug: "blog", label: "Blog" },
    { slug: "careers", label: "Jobs / Careers" },
    { slug: "docs", label: "Documentation" },
    { slug: "media", label: "Media Library" },
    { slug: "vendors", label: "Contacts & Vendors" },
    { slug: "landing", label: "Landing Pages" },
    { slug: "subscriptions", label: "Subscriptions" },
    { slug: "footer", label: "Footer Management" },
    { slug: "manage", label: "Team Management" }, // Was 'team'
    { slug: "social", label: "Social Media" },
    { slug: "university", label: "University & SOPs" },
    { slug: "apps", label: "Apps & Plugins" },
    { slug: "integrations", label: "Integrations (OAuth)" },
    { slug: "settings", label: "Settings" },
    { slug: "activity", label: "Activity Log" },
    { slug: "voice", label: "Universal Voice" },
    { slug: "forms", label: "Form Builder" },
];

interface UserManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: any; // If null, creating new user
}

export function UserManagementModal({ isOpen, onClose, user }: UserManagementModalProps) {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<any[]>([]);
    const [enabledModules, setEnabledModules] = useState<string[]>([]);
    const [loadingModules, setLoadingModules] = useState(false);
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        roleId: "",
        userStatus: "ACTIVE",
        password: "" // Only for new users usually, or password reset
    });

    useEffect(() => {
        // Fetch roles on mount
        getRoles().then(setRoles);
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                username: user.username || "",
                roleId: user.roleId || "",
                userStatus: user.userStatus || "ACTIVE",
                password: ""
            });
            // Fetch user's enabled modules
            fetchUserModules(user.id);
        } else {
            setFormData({
                name: "",
                email: "",
                username: "",
                roleId: "",
                userStatus: "ACTIVE",
                password: ""
            });
            setEnabledModules([]);
        }
    }, [user, isOpen]);

    const fetchUserModules = async (userId: string) => {
        setLoadingModules(true);
        try {
            const res = await fetch(`/api/admin/users/${userId}/cms-modules`);
            const data = await res.json();
            setEnabledModules(data.enabledModules || []);
        } catch (error) {
            console.error("Failed to fetch modules:", error);
        } finally {
            setLoadingModules(false);
        }
    };

    const toggleModule = (slug: string) => {
        setEnabledModules((prev) =>
            prev.includes(slug) ? prev.filter((m) => m !== slug) : [...prev, slug]
        );
    };

    const isValid = Boolean(
        formData.name &&
        formData.email &&
        formData.roleId &&
        (user ? true : formData.password) // Password required only for new users
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare payload with modules included
            const payload: any = {
                ...formData,
                id: user?.id, // undefined if new
                cmsModules: enabledModules, // Always include modules
            };

            // Remove empty password if editing (don't overwrite with empty)
            if (user && !payload.password) delete payload.password;

            const result = await upsertUser(payload);

            if (result.success) {
                toast.success(user ? "User updated" : "User created");
                onClose();
                router.refresh();
            } else {
                toast.error(result.error || "Operation failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-xl bg-[#0A0A0B] border border-white/10 text-white shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">{user ? "Edit User" : "Add Team Member"}</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Manage account details, role assignment, and CMS access.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="mb-4 bg-black border border-white/10">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        {user && user.email !== "info@basalthq.com" && <TabsTrigger value="modules">CMS Modules</TabsTrigger>}
                    </TabsList>

                    <TabsContent value="details">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="h-14 w-14 border-2 border-white/10">
                                    <AvatarImage src={user?.avatar} className="object-cover" />
                                    <AvatarFallback className="bg-black text-slate-400 text-lg">
                                        {formData.name?.[0]?.toUpperCase() || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-400">Profile Picture</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Full Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Username</Label>
                                    <Input
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                        className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                                        placeholder="jdoe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300">Email Address</Label>
                                <Input
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                                    placeholder="john@example.com"
                                    type="email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300">
                                    {user ? "New Password" : "Temporary Password"}
                                </Label>
                                <Input
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                                    type="password"
                                    placeholder={user ? "Leave blank to keep current" : "••••••••"}
                                    required={!user}
                                />
                                {user && (
                                    <p className="text-[10px] text-slate-500">
                                        Leave empty to keep the user&apos;s existing password.
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Role</Label>
                                    {user?.email === "info@basalthq.com" ? (
                                        <div className="h-10 px-3 flex items-center bg-black border border-white/10 rounded-md text-amber-500 font-medium text-sm">
                                            Owner (Super Admin)
                                        </div>
                                    ) : (
                                        <Select
                                            value={formData.roleId}
                                            onValueChange={(val) => {
                                                setFormData({ ...formData, roleId: val });
                                                // Auto-configure modules based on role
                                                const roleName = roles.find(r => r.id === val)?.name?.toLowerCase();
                                                if (roleName) {
                                                    if (roleName.includes("admin")) {
                                                        // Give access to ALL modules
                                                        setEnabledModules(CMS_MODULES.map(m => m.slug));
                                                        toast.info("Admin Access: All CMS modules enabled.");
                                                    } else if (roleName.includes("editor")) {
                                                        // Editor: Dashboard, Blog, Media, Docs, Activity
                                                        const editorModules = ["dashboard", "blog", "media", "docs", "activity"];
                                                        setEnabledModules(editorModules);
                                                        toast.info("Editor Access: Blog, Media, Docs & Activity enabled.");
                                                    } else if (roleName.includes("viewer")) {
                                                        // Viewer: Dashboard only
                                                        setEnabledModules(["dashboard"]);
                                                        toast.info("Viewer Access: Dashboard only.");
                                                    } else {
                                                        // Default: Dashboard only
                                                        setEnabledModules(["dashboard"]);
                                                    }
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="bg-black border-white/10 text-white">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0A0A0B] border-white/10 text-white z-[9999]">
                                                {roles.map(role => (
                                                    <SelectItem key={role.id} value={role.id} className="focus:bg-white/10 focus:text-white cursor-pointer">{role.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300">Status</Label>
                                    <Select
                                        value={formData.userStatus}
                                        onValueChange={(val) => setFormData({ ...formData, userStatus: val })}
                                    >
                                        <SelectTrigger className="bg-black border-white/10 text-white">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0A0A0B] border-white/10 text-white z-[9999]">
                                            <SelectItem value="ACTIVE" className="focus:bg-white/10 focus:text-white cursor-pointer">Active</SelectItem>
                                            <SelectItem value="PENDING" className="focus:bg-white/10 focus:text-white cursor-pointer">Pending</SelectItem>
                                            <SelectItem value="INACTIVE" className="focus:bg-white/10 focus:text-white cursor-pointer">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <DialogFooter className="mt-6 gap-2">
                                <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/5 text-slate-400 hover:text-white">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading || !isValid} variant="gradient" className="border-0 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {user ? "Save Changes" : "Create User"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </TabsContent>

                    {user && user.email !== "info@basalthq.com" && (
                        <TabsContent value="modules">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Settings className="h-4 w-4" />
                                    <span>Toggle which CMS modules this user can access</span>
                                </div>

                                {loadingModules ? (
                                    <div className="flex justify-center p-8">
                                        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                                        {CMS_MODULES.map((mod) => (
                                            <div key={mod.slug} className="flex items-center justify-between p-3 bg-black rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                                <span className="text-sm text-white">{mod.label}</span>
                                                <Switch
                                                    checked={enabledModules.includes(mod.slug)}
                                                    onCheckedChange={() => toggleModule(mod.slug)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <DialogFooter className="mt-6 gap-2">
                                    <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/5 text-slate-400 hover:text-white">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        variant="gradient"
                                        className="border-0"
                                    >
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
                                </DialogFooter>
                            </div>
                        </TabsContent>
                    )}
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
