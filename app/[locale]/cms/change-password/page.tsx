"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/actions/cms/auth-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import NextImage from "next/image";

export default function ChangePasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await updatePassword(password);
            if (res.success) {
                toast.success("Password updated successfully");
                router.push("/cms");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to update password");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(77,191,217,0.15),rgba(0,0,0,0)_50%)] z-0" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-0" />

            <div className="w-full max-w-md mx-4 p-8 glass rounded-2xl relative z-10 border border-[#4DBFD9]/20 shadow-[0_0_50px_-20px_rgba(77,191,217,0.3)] backdrop-blur-3xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 bg-[#4DBFD9]/10 rounded-full flex items-center justify-center border border-[#4DBFD9]/20">
                            <ShieldCheck className="h-8 w-8 text-[#4DBFD9]" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Change Password</h1>
                    <p className="text-slate-400">
                        For your security, you must change your temporary password before continuing.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-[#4DBFD9] uppercase tracking-widest ml-1">New Password</Label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#4DBFD9] transition-colors duration-300" />
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-11 bg-black/40 border-white/10 text-white focus:border-[#4DBFD9]/50 focus:ring-[#4DBFD9]/20 py-6"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-[#4DBFD9] uppercase tracking-widest ml-1">Confirm Password</Label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#4DBFD9] transition-colors duration-300" />
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-11 bg-black/40 border-white/10 text-white focus:border-[#4DBFD9]/50 focus:ring-[#4DBFD9]/20 py-6"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 bg-gradient-to-r from-[#2AA9C7] to-[#4DBFD9] hover:from-[#4DBFD9] hover:to-[#7BD3E6] text-white font-bold text-lg shadow-lg shadow-[#4DBFD9]/20"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
