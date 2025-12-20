
import { Template } from "./types";

export const legalTemplates: Template[] = [
    {
        id: "legal-corporate",
        name: "Corporate Law",
        category: "legal",
        description: "Professional corporate law firm template",
        data: {
            root: { props: { title: "Corporate Law" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-corporate",
                        logoText: "LexCorp",
                        links: [{ label: "Practice Areas", href: "#features" }, { label: "Attorneys", href: "#team" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Consultation",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Strategic Legal Counsel for Business",
                        subtitle: "We provide comprehensive legal solutions for corporations, startups, and investors.",
                        bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Practice Areas",
                        secondaryAction: "Our Firm",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Expertise",
                        columns: "3",
                        features: [
                            { title: "M&A", description: "Mergers and acquisitions.", icon: "Briefcase" },
                            { title: "Intellectual Property", description: "Patent and trademark strategy.", icon: "Award" },
                            { title: "Compliance", description: "Regulatory guidance.", icon: "Shield" }
                        ],
                        paddingY: "12",
                        backgroundColor: "slate-50"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "$10B+", label: "Transactions" },
                            { value: "40+", label: "Years Experience" },
                            { value: "Top 100", label: "Law Firm" }
                        ],
                        backgroundColor: "slate-900"
                    }
                }
            ]
        }
    },
    {
        id: "legal-family",
        name: "Family Law",
        category: "legal",
        description: "Compassionate family law template",
        data: {
            root: { props: { title: "Family Law" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-family",
                        logoText: "FamilyFirst",
                        links: [{ label: "Services", href: "#features" }, { label: "About", href: "#text" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Free Consult",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Compassionate Legal Support",
                        subtitle: "Guiding you through life's most difficult transitions with care and expertise.",
                        bgImage: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Services",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Practice Areas",
                        columns: "3",
                        features: [
                            { title: "Divorce", description: "Amicable resolutions.", icon: "Heart" },
                            { title: "Custody", description: "Protecting your children.", icon: "Users" },
                            { title: "Estate Planning", description: "Securing the future.", icon: "FileText" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial",
                        quote: "A steady hand during a stormy time. I couldn't have asked for better representation.",
                        author: "Sarah J.",
                        role: "Client",
                        avatar: "https://i.pravatar.cc/150?u=sarah",
                    }
                }
            ]
        }
    },
    {
        id: "legal-criminal",
        name: "Criminal Defense",
        category: "legal",
        description: "Aggressive defense law template",
        data: {
            root: { props: { title: "Defense" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-criminal",
                        logoText: "DefenseLaw",
                        links: [{ label: "Cases", href: "#features" }, { label: "Results", href: "#stats" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Emergency",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Protecting Your Rights",
                        subtitle: "Experienced criminal defense attorneys fighting for your freedom.",
                        bgImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Case Evaluation",
                        overlayOpacity: "80",
                        align: "left",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "1000+", label: "Cases Won" },
                            { value: "24/7", label: "Available" },
                            { value: "0", label: "Judgment" }
                        ],
                        backgroundGradient: "from-red-900 to-slate-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Areas of Defense",
                        columns: "3",
                        features: [
                            { title: "DUI/DWI", description: "Expert defense.", icon: "AlertTriangle" },
                            { title: "White Collar", description: "Fraud and embezzlement.", icon: "Briefcase" },
                            { title: "Federal", description: "Serious charges.", icon: "Gavel" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "legal-immigration",
        name: "Immigration Law",
        category: "legal",
        description: "Welcoming immigration law template",
        data: {
            root: { props: { title: "Immigration" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-immigration",
                        logoText: "LibertyLaw",
                        links: [{ label: "Visas", href: "#features" }, { label: "Citizenship", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Book Consult",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Your Path to Citizenship",
                        subtitle: "Navigating complex immigration laws to bring families together and talent to the workforce.",
                        bgImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Visa Options",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Services",
                        columns: "3",
                        features: [
                            { title: "Family Visas", description: "Reunite loved ones.", icon: "Heart" },
                            { title: "Work Visas", description: "H-1B, L-1, O-1.", icon: "Briefcase" },
                            { title: "Green Cards", description: "Permanent residence.", icon: "Check" }
                        ],
                        paddingY: "12",
                        backgroundColor: "blue-50"
                    }
                }
            ]
        }
    },
    {
        id: "legal-ip",
        name: "Intellectual Property",
        category: "legal",
        description: "Modern IP law firm template",
        data: {
            root: { props: { title: "IP Law" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-ip",
                        logoText: "InnovateLaw",
                        links: [{ label: "Patents", href: "#features" }, { label: "Trademarks", href: "#stats" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Protect Idea",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Protect Your Innovation",
                        subtitle: "Securing patents, trademarks, and copyrights for the world's leading inventors and brands.",
                        bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Filing",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[65vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "5000+", label: "Patents Granted" },
                            { value: "98%", label: "Success Rate" },
                            { value: "Global", label: "Protection" }
                        ],
                        backgroundColor: "slate-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "IP Services",
                        columns: "3",
                        features: [
                            { title: "Patent Search", description: "Prior art analysis.", icon: "Search" },
                            { title: "Trademark Reg", description: "Brand protection.", icon: "Tag" },
                            { title: "Litigation", description: "IP enforcement.", icon: "Gavel" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "legal-consulting",
        name: "Legal Consulting",
        category: "legal",
        description: "General legal consulting template",
        data: {
            root: { props: { title: "Legal Consulting" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-consulting",
                        logoText: "Jurist",
                        links: [{ label: "Services", href: "#features" }, { label: "About", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Contact Us",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Expert Legal Strategy",
                        subtitle: "Providing outside counsel services to businesses efficiently and affordably.",
                        bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Learn More",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Why Choose Us",
                        columns: "3",
                        features: [
                            { title: "Cost Effective", description: "Alternative fee structures.", icon: "DollarSign" },
                            { title: "Experienced", description: "Big law background.", icon: "Award" },
                            { title: "Dedicated", description: "Focused on your business.", icon: "Target" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-50"
                    }
                }
            ]
        }
    }
];
