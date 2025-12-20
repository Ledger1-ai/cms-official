"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function DemoHeader({ onStartDemo }: { onStartDemo?: () => void }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Visual Builder", href: "#visual-builder" },
        { name: "Genius Mode", href: "#genius-mode" },
        { name: "Integrations", href: "#integrations" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // Check if we are on the home page
        if (window.location.pathname !== "/") {
            window.location.href = "/" + href;
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={cn(
                "sticky top-0 w-full z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-black/15 backdrop-blur-xl border-white/10 py-3"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-48 h-12">
                        {/* Ensure you have widely supported image formats or use the specific file found */}
                        <Image
                            src="/ledger1-cms-logo.png"
                            alt="Ledger1CMS"
                            width={192}
                            height={48}
                            className="w-full h-full object-contain brightness-0 invert drop-shadow-lg transition-all group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        />
                    </div>
                </Link>

                {/* Desktop Nav - Absolutely Centered */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-purple-500 transition-all group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/cms/login">
                        <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/50 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            Login
                        </Button>
                    </Link>
                    <Button
                        onClick={onStartDemo}
                        className="rounded-full bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                        Start Demo
                    </Button>
                    <Button className="rounded-full bg-gradient-to-r from-green-500 to-purple-600 text-white border-none shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:brightness-110">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-lg font-medium text-slate-300 hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* SEO / Extra Pages for Mobile */}
                    <div className="h-px bg-white/10 my-2" />
                    <Link href="/compare" className="text-lg font-medium text-slate-300 hover:text-white">Compare Us</Link>
                    <Link href="/industry" className="text-lg font-medium text-slate-300 hover:text-white">Industries</Link>
                    <div className="h-px bg-white/10 my-2" />
                    <Link href="/cms/login" className="w-full">
                        <Button variant="ghost" className="w-full justify-center text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            Login
                        </Button>
                    </Link>
                    <Button onClick={onStartDemo} variant="outline" className="w-full justify-center border-white/20 text-white hover:bg-white/10">
                        Start Demo
                    </Button>
                    <Button className="w-full justify-center bg-gradient-to-r from-green-500 to-purple-600">
                        Get Started
                    </Button>
                </div>
            )}
        </header>
    );
}
