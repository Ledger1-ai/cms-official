"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getSupportTickets } from "@/actions/cms/support-tickets";
import { Badge } from "@/components/ui/badge";
import { Component, Loader2, Send, ExternalLink, RefreshCw, Mail, Sparkles, Wand2, Trash2, Bold, Italic, List, Link as LinkIcon, Code, Image as ImageIcon, Type, FileCode, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { deleteTicket } from "@/actions/cms/support-tickets";
import { toast } from "sonner";
import { DeleteTicketDialog } from "./DeleteTicketDialog";

const MarkdownToolbar = ({ onInsert }: { onInsert: (syntax: string) => void }) => {
    return (
        <div className="flex items-center gap-1 p-2 bg-white/5 border-b border-white/5 rounded-t-xl overflow-x-auto">
            <button onClick={() => onInsert("**bold**")} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="Bold">
                <Bold className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onInsert("*italic*")} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="Italic">
                <Italic className="h-3.5 w-3.5" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button onClick={() => onInsert("- ")} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="List">
                <List className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onInsert("[link](url)")} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="Link">
                <LinkIcon className="h-3.5 w-3.5" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button onClick={() => onInsert("`code`")} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="Code">
                <Code className="h-3.5 w-3.5" />
            </button>
        </div>
    );
};

const ComposeSection = () => {
    const [signatureEnabled, setSignatureEnabled] = useState(true);
    const [signatureMode, setSignatureMode] = useState<"text" | "html">("text");
    const [signature, setSignature] = useState("Michael \u2022 mmfmilton@icloud.com");
    const [message, setMessage] = useState("");
    const [signatureImage, setSignatureImage] = useState<string | null>(null);

    const handleInsert = (syntax: string) => {
        setMessage(prev => prev + syntax);
    };

    const handleCreateAI = () => {
        setMessage("Hello,\n\nI understand you are facing issues with your account. I have looked into it and resolved the problem.\n\nBest regards,");
    };

    const handleReviseAI = () => {
        // Mock revision
        setMessage((prev) => "Dear User,\n\n" + prev + "\n\nThank you for your patience.");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSignatureImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = () => {
        // Mock send
        toast.success("Reply sent successfully via email!");
        setMessage("");
    };

    return (
        <div className="pt-4 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCreateAI}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-400 text-xs font-medium transition-all"
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        Create AI
                    </button>
                    <button
                        onClick={handleReviseAI}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 text-xs font-medium transition-all"
                    >
                        <Wand2 className="h-3.5 w-3.5" />
                        Revise AI
                    </button>
                </div>
            </div>

            <div className="relative border border-white/10 rounded-xl bg-black/40 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all">
                <MarkdownToolbar onInsert={handleInsert} />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full h-32 bg-transparent border-none p-4 text-gray-200 text-sm focus:outline-none resize-none placeholder:text-gray-600 font-mono"
                />
            </div>

            <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={signatureEnabled}
                            onCheckedChange={setSignatureEnabled}
                            className="data-[state=checked]:bg-cyan-600"
                        />
                        <span className="text-xs font-medium text-gray-400">Include Signature</span>
                    </div>
                    {signatureEnabled && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSignatureMode(signatureMode === "text" ? "html" : "text")}
                                className={`p-1.5 rounded-md transition-colors ${signatureMode === "html" ? "text-cyan-400 bg-cyan-500/10" : "text-gray-500 hover:text-gray-300"}`}
                                title="Toggle HTML Mode"
                            >
                                <FileCode className="h-3.5 w-3.5" />
                            </button>
                            <label className="p-1.5 rounded-md text-gray-500 hover:text-gray-300 cursor-pointer hover:bg-white/5 transition-colors" title="Upload Image">
                                <ImageIcon className="h-3.5 w-3.5" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    )}
                </div>

                {signatureEnabled && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        {signatureMode === "text" ? (
                            <input
                                type="text"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                className="w-full bg-transparent border-b border-white/10 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 pb-1"
                                placeholder="Signature text..."
                            />
                        ) : (
                            <textarea
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                className="w-full h-20 bg-black/20 border border-white/10 rounded-md p-2 text-xs text-gray-400 font-mono focus:outline-none focus:border-cyan-500/50"
                                placeholder="<div>HTML Signature</div>..."
                            />
                        )}

                        {signatureImage && (
                            <div className="relative group w-fit">
                                <NextImage src={signatureImage} alt="Signature" width={0} height={0} className="h-12 w-auto object-contain rounded-md border border-white/10" style={{ width: 'auto', height: '48px' }} unoptimized />
                                <button
                                    onClick={() => setSignatureImage(null)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-2 w-2" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSend}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-6 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-cyan-900/20"
                >
                    <Send className="h-3.5 w-3.5" />
                    Reply via Email
                </button>
            </div>
        </div>
    );
};

interface SupportInboxModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SupportInboxModal({ isOpen, onClose }: SupportInboxModalProps) {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [pushing, setPushing] = useState(false);

    const fetchTickets = async () => {
        setLoading(true);
        const data = await getSupportTickets();
        setTickets(data);
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetchTickets();
        }
    }, [isOpen]);

    const pushToJira = async (ticketId: string) => {
        setPushing(true);
        try {
            const res = await fetch('/api/cms/support/jira', {
                method: 'POST',
                body: JSON.stringify({ ticketId })
            });
            if (res.ok) {
                const data = await res.json();
                // Update local state
                setTickets(prev => prev.map(t =>
                    t.id === ticketId
                        ? { ...t, status: "JIRA_CREATED", jiraTicketId: data.jiraId }
                        : t
                ));
                if (selectedTicket?.id === ticketId) {
                    setSelectedTicket((prev: any) => prev ? ({ ...prev, status: "JIRA_CREATED", jiraTicketId: data.jiraId }) : prev);
                }
            } else {
                alert("Failed to push to Jira");
            }
        } catch (error) {
            console.error("Jira push failed");
        }
        setPushing(false);
    };

    const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);

    const handleDeleteClick = (ticketId: string) => {
        setTicketToDelete(ticketId);
    };

    const confirmDelete = async () => {
        if (!ticketToDelete) return;

        await deleteTicket(ticketToDelete);

        if (selectedTicket?.id === ticketToDelete) {
            setSelectedTicket(null);
        }

        await fetchTickets();
        toast.success("Ticket deleted successfully");
        setTicketToDelete(null);
    };

    const getSupportTypeColor = (type: string | null) => {
        switch (type) {
            case 'SALES': return "border-blue-500/50 text-blue-400 bg-blue-500/10";
            case 'TECHNICAL': return "border-orange-500/50 text-orange-400 bg-orange-500/10";
            case 'BILLING': return "border-emerald-500/50 text-emerald-400 bg-emerald-500/10";
            case 'GENERAL': return "border-purple-500/50 text-purple-400 bg-purple-500/10";
            default: return "border-gray-500/50 text-gray-400 bg-gray-500/10";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl h-[600px] bg-[#0F1115]/80 backdrop-blur-xl border border-cyan-500/20 text-cyan-50 p-0 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-2xl flex flex-col [&>button]:hidden">
                <DialogTitle className="sr-only">Support Inbox</DialogTitle>

                {/* Header */}
                <div className="bg-cyan-950/30 border-b border-cyan-500/20 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-cyan-400" />
                        <h2 className="text-lg font-bold tracking-wide text-white uppercase">Support Inbox</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={fetchTickets} className="p-2 hover:bg-white/5 rounded-full text-cyan-400 disabled:opacity-50 transition-colors" title="Refresh Tickets">
                            <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
                        </button>
                        <div className="w-px h-4 bg-cyan-500/20 mx-1" />
                        <button onClick={onClose} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-full text-cyan-400/50 transition-all" title="Close Inbox">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Ticket List */}
                    <div className="w-1/3 border-r border-cyan-500/10 overflow-y-auto bg-black/20">
                        {loading ? (
                            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-cyan-500" /></div>
                        ) : (
                            tickets.map(ticket => (
                                <div
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedTicket?.id === ticket.id ? "bg-cyan-950/30 border-l-2 border-l-cyan-400" : ""}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-sm text-white truncate max-w-[70%]">{ticket.name}</span>
                                        <span className="text-[10px] text-gray-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium mb-1 truncate">{ticket.subject || "No Subject"}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1">
                                            <Badge variant="outline" className={`text-[10px] h-5 ${ticket.source === "PRICING" ? "border-pink-500/50 text-pink-400 bg-pink-500/10" : ticket.source === "AI_AGENT" ? "border-cyan-500/50 text-cyan-400 bg-cyan-500/10" : "border-green-500/50 text-green-400 bg-green-500/10"}`}>
                                                {ticket.source}
                                            </Badge>
                                            {ticket.supportType && (
                                                <Badge variant="outline" className={`text-[10px] h-5 ${getSupportTypeColor(ticket.supportType)}`}>
                                                    {ticket.supportType}
                                                </Badge>
                                            )}
                                        </div>
                                        {ticket.status === "JIRA_CREATED" && (
                                            <span className="text-[10px] text-blue-400 font-mono">{ticket.jiraTicketId}</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        {!loading && tickets.length === 0 && (
                            <p className="text-center text-gray-500 p-8 text-sm">No tickets found.</p>
                        )}
                    </div>

                    {/* Ticket Detail */}
                    <div className="flex-1 overflow-y-auto p-6 bg-transparent">
                        {selectedTicket ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{selectedTicket.subject || "No Subject"}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                            <span>{selectedTicket.name}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                            <span>{selectedTicket.email}</span>
                                            {selectedTicket.phone && (
                                                <>
                                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                    <span>{selectedTicket.phone}</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            {selectedTicket.company && <Badge variant="secondary" className="bg-white/10 text-gray-300 hover:bg-white/20">{selectedTicket.company}</Badge>}
                                            {selectedTicket.supportType && <Badge variant="outline" className={getSupportTypeColor(selectedTicket.supportType)}>{selectedTicket.supportType}</Badge>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDeleteClick(selectedTicket.id)}
                                            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-500 transition-colors"
                                            title="Delete Ticket"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        {selectedTicket.status === "JIRA_CREATED" ? (
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-md">
                                                <span className="text-blue-400 text-xs font-mono font-bold">{selectedTicket.jiraTicketId}</span>
                                                <ExternalLink className="h-3 w-3 text-blue-400" />
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => pushToJira(selectedTicket.id)}
                                                disabled={pushing}
                                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {pushing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                                Push to Jira
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-white/5 rounded-xl p-6 min-h-[200px] text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedTicket.source === "AI_AGENT" && Array.isArray(selectedTicket.messages) ? (
                                        <div className="space-y-4">
                                            {selectedTicket.messages.map((msg: any, idx: number) => (
                                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-cyan-500/20 text-cyan-200 rounded-tr-sm' : 'bg-white/10 text-gray-300 rounded-tl-sm'}`}>
                                                        <span className="text-[10px] opacity-50 block mb-1 uppercase font-bold">{msg.role}</span>
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {selectedTicket.message}
                                            {selectedTicket.attachmentUrl && (
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Attachment</p>
                                                    <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5 w-fit">
                                                        <ImageIcon className="h-4 w-4 text-cyan-400" />
                                                        <span className="text-sm font-mono truncate max-w-[200px]">{selectedTicket.attachmentUrl.split('/').pop()}</span>
                                                        <a href={selectedTicket.attachmentUrl} target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-cyan-400 transition-colors">
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <ComposeSection />
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <Mail className="h-12 w-12 mb-4 opacity-20" />
                                <p>Select a ticket to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>

            <DeleteTicketDialog
                isOpen={!!ticketToDelete}
                onClose={() => setTicketToDelete(null)}
                onConfirm={confirmDelete}
                ticketId={ticketToDelete}
            />
        </Dialog >
    );
}
