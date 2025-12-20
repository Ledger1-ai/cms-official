import { Template } from "./types";

export const constructionTemplates: Template[] = [
    {
        id: "construction-company",
        name: "Construction Co",
        category: "construction",
        description: "Solid construction company website with industrial safety yellow accents",
        data: {
            root: { props: { title: "Construction Co" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-company",
                        logoText: "BuildRight",
                        links: [{ label: "Projects", href: "#hero-1" }, { label: "Services", href: "#services-1" }, { label: "Contact", href: "#cta-contact" }],
                        ctaText: "Get Quote",
                        ctaLink: "#cta-contact",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Building the Future, Today",
                        subtitle: "Commercial and residential construction services delivering quality, safety, and reliability since 1985.",
                        bgImage: "https://images.unsplash.com/photo-1541976544386-f447a8a7ddf2?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View our Projects",
                        secondaryAction: "Request a Bid",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Our Services",
                        columns: "3",
                        features: [
                            { title: "General Contracting", description: "End-to-end management.", icon: "Briefcase" },
                            { title: "Design-Build", description: "Integrated design and construction.", icon: "PenTool" },
                            { title: "Renovation", description: "Commercial upgrades.", icon: "Hammer" }
                        ],
                        paddingY: "16",
                        backgroundColor: "orange-50/10",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "500+", label: "Projects Completed" },
                            { value: "Zero", label: "Safety Incidents" },
                            { value: "40", label: "Years in Business" }
                        ],
                        backgroundColor: "slate-900",
                    }
                }
            ]
        }
    },
    {
        id: "construction-plumbing",
        name: "Home Services",
        category: "construction",
        description: "Clean landing page for HVAC, plumbing, or electrical services",
        data: {
            root: { props: { title: "Home Services" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-plumbing",
                        logoText: "QuickFix",
                        links: [{ label: "Services", href: "#services-1" }, { label: "Reviews", href: "#testimonial-1" }, { label: "Emergency", href: "#cta-call" }],
                        ctaText: "Call Now",
                        ctaLink: "#cta-call",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "24/7 Emergency Plumbing & HVAC",
                        subtitle: "Licensed, bonded, and insured. We fix it right the first time, guaranteed.",
                        bgImage: "https://images.unsplash.com/photo-1581094794329-cd56b5095bb4?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Schedule Service",
                        overlayOpacity: "80",
                        align: "center",
                        overlayGradient: "radial",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "We Handle It All",
                        columns: "3",
                        features: [
                            { title: "Leak Repair", description: "Fast leak detection.", icon: "Droplet" },
                            { title: "HVAC Install", description: "Keep your home cool.", icon: "Wind" },
                            { title: "Drain Cleaning", description: "Unclog pipes fast.", icon: "Trash" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-call",
                        text: "Call (555) 123-4567",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false,
                        className: "",
                        marginBottom: "16"
                    }
                }
            ]
        }
    },
    {
        id: "construction-architect",
        name: "Architecture Firm",
        category: "construction",
        description: "Minimalist architecture firm template",
        data: {
            root: { props: { title: "Architecture Firm" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-architect",
                        logoText: "ARC",
                        links: [{ label: "Projects", href: "#hero" }, { label: "Studio", href: "#features" }, { label: "Contact", href: "#cta" }],
                        ctaText: "View Works",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Designing Tomorrow",
                        subtitle: "Award-winning architecture firm creating sustainable and innovative spaces for modern living.",
                        bgImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Portfolio",
                        overlayOpacity: "20",
                        align: "left",
                        minHeight: "[80vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Approach",
                        columns: "3",
                        features: [
                            { title: "Sustainable", description: "Eco-friendly.", icon: "Sun" },
                            { title: "Modern", description: "Clean lines.", icon: "Box" },
                            { title: "Functional", description: "User focused.", icon: "Layout" }
                        ],
                        paddingY: "12",
                        backgroundColor: "neutral-100"
                    }
                }
            ]
        }
    },
    {
        id: "construction-interior",
        name: "Interior Design",
        category: "construction",
        description: "Chic interior design template",
        data: {
            root: { props: { title: "Interior Design" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-interior",
                        logoText: "Habitat",
                        links: [{ label: "Residential", href: "#features" }, { label: "Commercial", href: "#hero" }, { label: "Consult", href: "#cta" }],
                        ctaText: "Start Project",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Interiors That Inspire",
                        subtitle: "We transform spaces into beautiful, functional environments that reflect your personality.",
                        bgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Gallery",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Services",
                        columns: "3",
                        features: [
                            { title: "Space Planning", description: "Optimize flow.", icon: "Grid" },
                            { title: "Furniture", description: "Custom selection.", icon: "ShoppingBag" },
                            { title: "Styling", description: "Finishing touches.", icon: "Star" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-50"
                    }
                }
            ]
        }
    },
    {
        id: "construction-industrial",
        name: "Industrial Manufacturing",
        category: "construction",
        description: "Heavy industry and manufacturing template",
        data: {
            root: { props: { title: "Industrial" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-industrial",
                        logoText: "SteelWorks",
                        links: [{ label: "Capabilities", href: "#features" }, { label: "Sectors", href: "#hero" }, { label: "Quote", href: "#cta" }],
                        ctaText: "Contact Sales",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Precision Engineering",
                        subtitle: "Global leader in steel fabrication and industrial manufacturing solutions.",
                        bgImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Capabilities",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "50k", label: "Sq Ft Facility" },
                            { value: "ISO", label: "9001 Certified" },
                            { value: "30+", label: "Countries Served" }
                        ],
                        backgroundColor: "slate-800"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Industries",
                        columns: "3",
                        features: [
                            { title: "Automotive", description: "OEM parts.", icon: "Truck" },
                            { title: "Aerospace", description: "High tolerance.", icon: "Send" },
                            { title: "Energy", description: "Infrastructure.", icon: "Zap" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    }
];
