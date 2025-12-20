"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DemoHeader from "@/components/demo/DemoHeader";
import InteractiveBackground from "@/components/demo/InteractiveBackground";

export default function CreateAccountPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate submission
        setTimeout(() => {
            setIsLoading(false);
            toast.info("Account Creation", {
                description: "Redirecting to onboarding..."
            });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
            <InteractiveBackground />

            {/* Helper Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-48 h-12 relative">
                        <Image
                            src="/ledger1-cms-logo.png"
                            alt="Ledger1CMS"
                            width={192}
                            height={48}
                            className="w-full h-full object-contain brightness-0 invert drop-shadow-lg"
                        />
                    </div>
                </Link>
                <Button variant="ghost" asChild className="text-slate-400 hover:text-white">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Demo
                    </Link>
                </Button>
            </header>


            <main className="container mx-auto px-6 py-32 relative z-10 flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md">

                    {/* Form Card */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-500">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">Create Account</h1>
                            <p className="text-slate-400 text-sm">Join the future of content management.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">First Name</label>
                                    <Input
                                        required
                                        placeholder="e.g. Alex"
                                        className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Last Name</label>
                                    <Input
                                        required
                                        placeholder="e.g. Morgan"
                                        className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Email</label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="name@work-email.com"
                                    className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
                                <Input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Company Name</label>
                                <Input
                                    placeholder="Acme Inc."
                                    className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 h-11"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold h-12 rounded-lg mt-4 shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Get Started Free"
                                )}
                            </Button>
                        </form>

                        <p className="text-center text-xs text-slate-500 mt-6">
                            By creating an account, you agree to our <Link href="/terms" className="text-purple-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
