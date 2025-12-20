"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const formSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    company: z.string().optional(),
    supportType: z.string().min(1, "Please select an inquiry type"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactFormProps {
    onSuccess?: () => void;
    className?: string;
    source?: string;
}

export default function ContactForm({ onSuccess, className, source = "CONTACT_FORM" }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            supportType: "GENERAL",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/support/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, source }),
            });

            if (!response.ok) throw new Error("Failed to submit");

            toast.success("Message sent!", {
                description: "Our support team will get back to you shortly.",
            });
            form.reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error("Something went wrong", {
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">First Name</label>
                    <Input
                        {...form.register("firstName")}
                        placeholder="Jane"
                        className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500"
                    />
                    {form.formState.errors.firstName && (
                        <p className="text-red-400 text-xs">{form.formState.errors.firstName.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Last Name</label>
                    <Input
                        {...form.register("lastName")}
                        placeholder="Doe"
                        className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500"
                    />
                    {form.formState.errors.lastName && (
                        <p className="text-red-400 text-xs">{form.formState.errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500"
                />
                {form.formState.errors.email && (
                    <p className="text-red-400 text-xs">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Phone (Optional)</label>
                    <Input
                        {...form.register("phone")}
                        placeholder="+1 (555) 000-0000"
                        className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Company (Optional)</label>
                    <Input
                        {...form.register("company")}
                        placeholder="Acme Inc."
                        className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Inquiry Type</label>
                <Select
                    onValueChange={(value) => form.setValue("supportType", value)}
                    defaultValue={form.getValues("supportType")}
                >
                    <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white focus:border-purple-500">
                        <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                        <SelectItem value="GENERAL">General Inquiry</SelectItem>
                        <SelectItem value="SALES">Sales & Enterprise</SelectItem>
                        <SelectItem value="SUPPORT">Technical Support</SelectItem>
                        <SelectItem value="PARTNERSHIP">Partnership</SelectItem>
                        <SelectItem value="BILLING">Billing</SelectItem>
                    </SelectContent>
                </Select>
                {form.formState.errors.supportType && (
                    <p className="text-red-400 text-xs">{form.formState.errors.supportType.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <Textarea
                    {...form.register("message")}
                    placeholder="How can we help you?"
                    className="min-h-[150px] bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 resize-none"
                />
                {form.formState.errors.message && (
                    <p className="text-red-400 text-xs">{form.formState.errors.message.message}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold h-12 rounded-lg"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    "Send Message"
                )}
            </Button>
        </form>
    );
}
