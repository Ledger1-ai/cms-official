"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, BookOpen, LifeBuoy, Upload, X } from "lucide-react";
import Link from "next/link";
import MessageSentModal from "@/components/modals/message-sent-modal";
import SupportChatWidget from "@/components/support/SupportChatWidget";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SupportClient() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        supportType: "GENERAL"
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, supportType: value });
    };

    const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.subject && formData.message;


    return (
        <main className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        How can we <span className="text-primary">help?</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our team is here to support you. Choose the best way to get in touch.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {/* Knowledge Base */}
                    <SupportCard
                        icon={<BookOpen className="h-8 w-8 text-primary" />}
                        title="Documentation"
                        description="Browse our comprehensive guides and tutorials to find answers instantly."
                        actionText="Visit Knowledge Base"
                        href="/docs"
                    />

                    {/* Community */}
                    <SupportCard
                        icon={<MessageCircle className="h-8 w-8 text-purple-500" />}
                        title="Community Discord"
                        description="Join our active community of developers and users. Ask questions and share tips."
                        actionText="Join Discord"
                        href="https://discord.gg/vARPqF84Zt"
                    />

                    {/* Email Support */}
                    <SupportCard
                        icon={<Mail className="h-8 w-8 text-green-500" />}
                        title="Email Support"
                        description="For account-related issues or technical inquiries, send us an email."
                        actionText="Contact Support"
                        href="mailto:support@ledger1crm.com"
                    />
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center">
                            <LifeBuoy className="mr-3 h-6 w-6 text-primary" />
                            Send us a message
                        </h2>
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                    <form className="space-y-6" onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);

                        // Basic file to base64 for MVP (or just filename if no storage yet)
                        // In a real app we'd upload to S3/Blob storage first.
                        // For now, let's just pass the filename or mock URL if needed.
                        let attachmentUrl = "";
                        if (selectedFile) {
                            attachmentUrl = `mock_upload/${selectedFile.name}`; // Conceptual
                        }

                        try {
                            const res = await fetch('/api/support/create', {
                                method: 'POST',
                                body: JSON.stringify({
                                    firstName: formData.get('firstName'),
                                    lastName: formData.get('lastName'),
                                    email: formData.get('email'),
                                    phone: formData.get('phone'),
                                    company: formData.get('company'),
                                    supportType: formData.get('supportType'), // Hidden input or handle select manually? Select usually needs state or hidden input
                                    subject: formData.get('subject'),
                                    message: formData.get('message'),
                                    attachmentUrl,
                                    source: "SUPPORT"
                                })
                            });

                            if (res.ok) {
                                setShowSuccessModal(true);
                                form.reset();
                                setSelectedFile(null);
                            } else {
                                alert("Failed to create ticket.");
                            }
                        } catch (err) {
                            alert("Failed to create ticket.");
                        }
                    }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="firstName" id="firstName" required className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John" onChange={handleInputChange} value={formData.firstName} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" name="lastName" id="lastName" required className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Doe" onChange={handleInputChange} value={formData.lastName} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email <span className="text-red-500">*</span></label>
                                <input type="email" name="email" id="email" required className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" onChange={handleInputChange} value={formData.email} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" name="phone" id="phone" required className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="+1 (555) 000-0000" onChange={handleInputChange} value={formData.phone} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium text-gray-300">Company Name <span className="text-gray-500">(Optional)</span></label>
                                <input type="text" name="company" id="company" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Acme Inc." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Support Type <span className="text-red-500">*</span></label>
                                <Select name="supportType" defaultValue="GENERAL" onValueChange={handleSelectChange} value={formData.supportType}>
                                    <SelectTrigger className="w-full bg-black/20 border-white/10 h-[50px]">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SALES">Sales Inquiry</SelectItem>
                                        <SelectItem value="TECHNICAL">Technical Support</SelectItem>
                                        <SelectItem value="BILLING">Billing & Accounts</SelectItem>
                                        <SelectItem value="GENERAL">General Inquiry</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject <span className="text-red-500">*</span></label>
                            <input type="text" name="subject" id="subject" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="How do I..." onChange={handleInputChange} value={formData.subject} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300">Message <span className="text-red-500">*</span></label>
                            <textarea name="message" id="message" rows={5} required className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Describe your issue..." onChange={handleInputChange} value={formData.message} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Attachments <span className="text-gray-500">(Optional)</span></label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border border-dashed border-white/10 rounded-xl p-8 bg-black/20 hover:bg-black/30 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                {selectedFile ? (
                                    <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full">
                                        <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFile(null);
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                            className="hover:text-red-400"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-white/5 p-3 rounded-full group-hover:scale-110 transition-transform">
                                            <Upload className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
                                        </div>
                                        <p className="text-sm text-gray-400">Click to upload a screenshot or photo</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <Button type="submit" disabled={!isFormValid} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>

            <MessageSentModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Ticket Created!"
                message="We've received your ticket and our support team will get back to you shortly."
            />

            <SupportChatWidget />
        </main>
    );
}

function SupportCard({ icon, title, description, actionText, href }: { icon: React.ReactNode; title: string; description: string; actionText: string; href: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-primary/30 transition-colors flex flex-col items-center">
            <div className="bg-white/5 p-4 rounded-full mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 mb-8 flex-1">{description}</p>
            <Link href={href}>
                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white">
                    {actionText}
                </Button>
            </Link>
        </div>
    );
}
