"use client";

import { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Phone, Mail, Globe, Briefcase, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";

// Re-defining interface to match page (or import if we refactor)
interface VendorProfile {
    id: string;
    name: string | null;
    company_name?: string | null;
    title: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;

    // VCMS Props
    vcms_score: number;
    primary_industry: string | null;
    industry_synonyms: string[];

    // Validation
    validation_status: "PENDING" | "VALIDATED" | "AMBIGUOUS" | "FAILED";
    validation_notes: string | null; // Strict match
    raw_ocr_data: any;

    // Compliance
    document_status: "MISSING" | "PARTIAL" | "VALID" | "EXPIRED";
    coi_expiry: string | null;
    license_expiry?: string | null;
    license_number: string | null;
    w9_on_file: boolean;
    is_do_not_use: boolean;

    // Integrations
    angies_list_url: string | null;
    google_reviews_url: string | null;
    google_rating: number | null;
    review_count: number | null;
    custom_fields: any;

    // Time (Serialized)
    createdAt?: string | null;
    updatedAt?: string | null;
    last_contact_date?: string | null;

    business_cards: { url: string; isBusinessCard?: boolean }[];
}

interface RolodexModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendors: VendorProfile[];
    onVendorSelect?: (vendor: VendorProfile) => void;
}

export function RolodexModal({ isOpen, onClose, vendors, onVendorSelect }: RolodexModalProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
    const [activeIndex, setActiveIndex] = useState(0);

    // 1. Extract Industries
    const industries = useMemo(() => {
        const set = new Set(vendors.map(v => v.primary_industry || "General"));
        return ["All", ...Array.from(set).sort()];
    }, [vendors]);

    // 2. Filter Vendors
    const filteredVendors = useMemo(() => {
        if (selectedIndustry === "All") return vendors;
        return vendors.filter(v => (v.primary_industry || "General") === selectedIndustry);
    }, [vendors, selectedIndustry]);

    // 3. Current Vendor
    const currentVendor = filteredVendors[activeIndex] || null;

    // Reset index when industry changes
    const handleIndustryChange = (ind: string) => {
        setSelectedIndustry(ind);
        setActiveIndex(0);
    };

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % filteredVendors.length);
    };

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + filteredVendors.length) % filteredVendors.length);
    };

    if (!filteredVendors.length && isOpen) {
        // Handle empty state in render
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                    <Dialog.Title className="sr-only">Vendor Rolodex</Dialog.Title>

                    {/* Main Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#0F1115] w-full max-w-6xl h-[85vh] rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto relative"
                    >

                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors">
                            <X className="h-6 w-6" />
                        </button>

                        {/* --- LEFT PANEL: INDUSTRY WHEEL --- */}
                        <div className="w-full md:w-80 bg-[#0A0A0B] border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
                            <div className="p-6 border-b border-white/5">
                                <h2 className="text-xl font-black text-white tracking-tight uppercase italic relative">
                                    <span className="text-emerald-500 mr-1">#</span>Rolodex
                                    <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-emerald-500 to-transparent"></span>
                                </h2>
                                <p className="text-xs text-slate-500 mt-2 font-mono">SELECT INDUSTRY FILTER</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10">
                                {industries.map(ind => (
                                    <button
                                        key={ind}
                                        onClick={() => handleIndustryChange(ind)}
                                        className={cn(
                                            "w-full text-left px-4 py-4 rounded-xl text-sm font-bold transition-all relative overflow-hidden group",
                                            selectedIndustry === ind
                                                ? "text-black bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <span className="relative z-10 flex justify-between items-center">
                                            {ind}
                                            {selectedIndustry === ind && <Briefcase className="h-4 w-4 opacity-50" />}
                                        </span>
                                        {selectedIndustry === ind && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent mix-blend-overlay"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 border-t border-white/5 bg-black/20">
                                <div className="text-center text-xs text-slate-500 font-mono">
                                    {filteredVendors.length} CONTACTS FOUND
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT PANEL: 3D STAGE --- */}
                        <div className="flex-1 relative bg-gradient-to-br from-[#0F1115] to-[#1a1c23] flex flex-col items-center justify-center p-8 overflow-hidden perspective-1000">

                            {/* Ambient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

                            {filteredVendors.length === 0 ? (
                                <div className="text-center text-slate-500">
                                    <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p>No contacts in this category.</p>
                                </div>
                            ) : (
                                <div className="relative w-full max-w-md aspect-[1.58] z-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentVendor?.id + activeIndex} // Force re-render on index change
                                            initial={{ rotateX: -15, y: -100, opacity: 0, scale: 0.9 }}
                                            animate={{ rotateX: 0, y: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotateX: 15, y: 100, opacity: 0, scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            onClick={() => currentVendor && onVendorSelect?.(currentVendor)}
                                            className="w-full h-full bg-[#111] rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden group perspective-parent cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all"
                                            style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                                        >
                                            {/* Business Card Content */}
                                            {/* Background Image / Texture */}
                                            <div className="absolute inset-0 bg-[#000] opacity-100">
                                                {currentVendor?.business_cards?.[0]?.url ? (
                                                    // Use the actual scanned card if available
                                                    <img src={currentVendor.business_cards[0].url} className="w-full h-full object-cover opacity-90" alt="Card" />
                                                ) : (
                                                    // Fallback Digital Design
                                                    <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col justify-between overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                                        <div className="relative z-10">
                                                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{currentVendor?.company_name || "Company Inc."}</h3>
                                                            <p className="text-emerald-400 font-mono text-xs mt-1">{currentVendor?.primary_industry}</p>
                                                        </div>

                                                        <div className="relative z-10">
                                                            <h4 className="text-xl font-medium text-white">{currentVendor?.name || "Unknown Name"}</h4>
                                                            <p className="text-slate-400 text-sm">{currentVendor?.title || "No Title"}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Glass Overlay Details (Valid for both image and digital) */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    {currentVendor?.phone ? (
                                                        <div className="flex items-center gap-3 text-slate-200">
                                                            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Phone className="h-4 w-4" /></div>
                                                            <span className="text-sm font-medium">{currentVendor.phone}</span>
                                                        </div>
                                                    ) : null}
                                                    {currentVendor?.email ? (
                                                        <div className="flex items-center gap-3 text-slate-200">
                                                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Mail className="h-4 w-4" /></div>
                                                            <span className="text-sm font-medium truncate">{currentVendor.email}</span>
                                                        </div>
                                                    ) : null}
                                                    {currentVendor?.website ? (
                                                        <div className="flex items-center gap-3 text-slate-200">
                                                            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Globe className="h-4 w-4" /></div>
                                                            <span className="text-sm font-medium truncate">{currentVendor.website}</span>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Controls */}
                            {filteredVendors.length > 1 && (
                                <div className="mt-12 flex items-center gap-8">
                                    <button
                                        onClick={prevCard}
                                        className="h-14 w-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>

                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black text-white">{activeIndex + 1}</span>
                                        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">of {filteredVendors.length}</span>
                                    </div>

                                    <button
                                        onClick={nextCard}
                                        className="h-14 w-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </div>
                            )}

                        </div>

                    </motion.div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
