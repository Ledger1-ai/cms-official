"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Zap, Rocket, Building2, Check, CheckSquare } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { PaymentModal } from "@/components/enroll/PaymentModal";
import { enrollUser } from "@/actions/enroll";

export default function CreateAccountForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Capturing password to save it securely via action
    const [companyName, setCompanyName] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("STARTER"); // STARTER, GROWTH, SCALE
    const [newsletter, setNewsletter] = useState(true);

    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    useEffect(() => {
        const plan = searchParams.get("plan");
        if (plan) {
            setSelectedPlan(plan.toUpperCase());
        }
    }, [searchParams]);

    const handlePlanSelect = (plan: string) => {
        if (plan === "SCALE") {
            // Optional: Immediately redirect or just select?
            // User requested explicit flows.
        }
        setSelectedPlan(plan);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedPlan === "SCALE") {
            // Redirect to demo booking
            toast.info("Sales Team", { description: "Redirecting to book a demo..." });
            router.push("https://calendly.com/ledger1-demo"); // Placeholder or internal page
            return;
        }

        // Open Payment Modal for verification
        setIsPaymentOpen(true);
    };

    const handlePaymentSubmit = async () => {
        setIsPaymentOpen(false);
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("companyName", companyName);
            formData.append("planId", selectedPlan); // slug
            formData.append("newsletter", newsletter ? "true" : "false");

            const result = await enrollUser(formData);

            if (result.success) {
                toast.success("Welcome aboard!", { description: "Your account has been created." });
                // Redirect logic handled by action or here? Usually here.
                // Action can perform redirect but let's do it client side for smooth feel or if action returns url.
                router.push("/cms");
            } else {
                toast.error("Enrollment failed", { description: result.error || "Please try again." });
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-6 py-12 relative z-10 flex min-h-screen items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Plan Selection & Info */}
                <div className="hidden lg:block space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                            Start building with Ledger1.
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Select the plan that fits your needs. Scale your content operations with AI-driven workflows.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <PlanOption
                            title="Starter"
                            price="Free"
                            description="For personal projects and exploration."
                            icon={Zap}
                            selected={selectedPlan === "STARTER"}
                            onClick={() => handlePlanSelect("STARTER")}
                            color="emerald"
                        />
                        <PlanOption
                            title="Growth"
                            price="$29/mo"
                            description="For growing teams and serious content creators."
                            icon={Rocket}
                            selected={selectedPlan === "GROWTH"}
                            onClick={() => handlePlanSelect("GROWTH")}
                            color="cyan"
                        />
                        <PlanOption
                            title="Scale"
                            price="Custom"
                            description="Enterprise-grade security and support."
                            icon={Building2}
                            selected={selectedPlan === "SCALE"}
                            onClick={() => handlePlanSelect("SCALE")}
                            color="purple"
                        />
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-right-10 duration-700">
                    <div className="lg:hidden mb-8 text-center">
                        <h2 className="text-2xl font-bold text-white">Create Account</h2>
                        <p className="text-slate-400 text-sm">Join Ledger1 today.</p>
                    </div>

                    {/* Mobile Plan Select (Simplified) */}
                    <div className="lg:hidden mb-6 flex gap-2 p-1 bg-slate-900/50 rounded-lg border border-white/5">
                        {["STARTER", "GROWTH", "SCALE"].map(plan => (
                            <button
                                key={plan}
                                onClick={() => handlePlanSelect(plan)}
                                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${selectedPlan === plan ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                            >
                                {plan}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">First Name</label>
                                <Input
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Alex"
                                    className="h-11 border-white/10 focus:border-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Last Name</label>
                                <Input
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Morgan"
                                    className="h-11 border-white/10 focus:border-emerald-500/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Work Email</label>
                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="h-11 border-white/10 focus:border-emerald-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                            <Input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="h-11 border-white/10 focus:border-emerald-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Company / Workspace</label>
                            <Input
                                required
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Acme Inc."
                                className="h-11 border-white/10 focus:border-emerald-500/50"
                            />
                        </div>

                        {/* Newsletter Checkbox */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                            <button
                                type="button"
                                onClick={() => setNewsletter(!newsletter)}
                                className={`mt-0.5 h-5 w-5 rounded border flex items-center justify-center transition-colors ${newsletter ? "bg-emerald-500 border-emerald-500 text-black" : "border-slate-600 bg-transparent text-transparent"}`}
                            >
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </button>
                            <div className="text-sm">
                                <span className="text-white font-medium">Keep me updated</span>
                                <p className="text-slate-400 text-xs mt-0.5">Receive product updates, AI tips, and exclusive offers.</p>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className={`w-full h-12 rounded-lg mt-4 font-bold transition-all ${!firstName || !lastName || !email || !password || !companyName
                                ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                                : "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-900/20 hover:scale-[1.02]"
                                }`}
                            disabled={isLoading || !firstName || !lastName || !email || !password || !companyName}
                        >
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                            ) : (
                                selectedPlan === "SCALE" ? "Book a Demo" : "Continue to Verification"
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-6">
                        By joining, you agree to our <Link href="/terms" className="text-emerald-400 hover:underline">Terms</Link> and <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                planName={selectedPlan === "STARTER" ? "Starter" : selectedPlan === "GROWTH" ? "Growth" : "Scale"}
                planPrice={selectedPlan === "STARTER" ? 0 : selectedPlan === "GROWTH" ? 29 : 0}
                onSubmit={handlePaymentSubmit}
                loading={isLoading}
            />
        </main>
    );
}

function PlanOption({ title, price, description, icon: Icon, selected, onClick, color }: any) {
    const isSelected = selected;
    const borderClass = isSelected
        ? color === "emerald" ? "border-emerald-500 bg-emerald-500/10"
            : color === "cyan" ? "border-cyan-500 bg-cyan-500/10"
                : "border-purple-500 bg-purple-500/10"
        : "border-white/10 hover:border-white/20 hover:bg-white/5";

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${borderClass}`}
        >
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center transition-colors ${isSelected ? "bg-white/10" : "bg-slate-900 group-hover:bg-slate-800"}`}>
                <Icon className={`h-6 w-6 ${isSelected ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>{title}</h3>
                    <span className={`text-sm font-bold ${isSelected ? "text-white" : "text-slate-500"}`}>{price}</span>
                </div>
                <p className="text-sm text-slate-500 group-hover:text-slate-400">{description}</p>
            </div>
            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${isSelected ? "border-white bg-white text-black" : "border-slate-600"}`}>
                {isSelected && <Check className="h-3 w-3" />}
            </div>
        </div>
    );
}
