import { Template } from "./types";

export const servicesTemplates: Template[] = [
    {
        id: "service-cleaning",
        name: "Cleaning Service",
        category: "services",
        description: "Sparkling clean home services landing page",
        data: {
            root: { props: { title: "Cleaning Service" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-cleaning",
                        logoText: "SparkleClean",
                        links: [{ label: "Services", href: "#features-1" }, { label: "Pricing", href: "#pricing-1" }, { label: "Reviews", href: "#testimonial-1" }],
                        ctaText: "Book Now",
                        ctaLink: "#cta-book",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "We Clean, You Relax",
                        subtitle: "Top-rated residential and commercial cleaning services. Eco-friendly products, satisfaction guaranteed.",
                        bgImage: "https://images.unsplash.com/photo-1581578731117-104f2a863a18?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get a Quote",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "What We Offer",
                        columns: "3",
                        features: [
                            { title: "Home Cleaning", description: "Regular maintenance.", icon: "Home" },
                            { title: "Deep Clean", description: "Seasonal refresh.", icon: "Sparkles" },
                            { title: "Move-In/Out", description: "For seamless transitions.", icon: "Box" }
                        ],
                        paddingY: "12",
                        backgroundColor: "sky-50"
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "My house has never looked this good. The team was professional, on time, and thorough.",
                        author: "Jennifer M.",
                        role: "Homeowner",
                        avatar: "https://i.pravatar.cc/150?u=jen",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-book",
                        text: "Book Your Clean",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        marginBottom: "16",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false
                    }
                }
            ]
        }
    },
    {
        id: "service-moving",
        name: "Moving Company",
        category: "services",
        description: "Reliable moving and storage service template",
        data: {
            root: { props: { title: "Moving Company" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-moving",
                        logoText: "FastMove",
                        links: [{ label: "Services", href: "#features-1" }, { label: "Estimate", href: "#cta-quote" }, { label: "Contact", href: "#cta-quote" }],
                        ctaText: "Get Quote",
                        ctaLink: "#cta-quote",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Stress-Free Moving",
                        subtitle: "Local and long-distance moving solutions. We handle your belongings with care.",
                        bgImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Free Estimate",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "[65vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "10k+", label: "Moves" },
                            { value: "50", label: "States Covered" },
                            { value: "4.8", label: "Rating" }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: "service-plumber",
        name: "Plumber",
        category: "services",
        description: "Emergency plumbing service template",
        data: {
            root: { props: { title: "Plumber" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-plumber",
                        logoText: "ProPlumb",
                        links: [{ label: "Services", href: "#features" }, { label: "Emergency", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "24/7 Call",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Expert Plumbing Services",
                        subtitle: "Fast, reliable, and affordable plumbing solutions for residential and commercial properties. Available 24/7.",
                        bgImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Call Now",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Our Services",
                        columns: "3",
                        features: [
                            { title: "Repairs", description: "Leaks & clogs.", icon: "Tool" },
                            { title: "Installation", description: "New fixtures.", icon: "Settings" },
                            { title: "Emergency", description: "24/7 response.", icon: "Phone" }
                        ],
                        paddingY: "12",
                        backgroundColor: "blue-50"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "24/7", label: "Availability" },
                            { value: "1hr", label: "Response Time" },
                            { value: "100%", label: "Guaranteed" }
                        ],
                        backgroundColor: "blue-900"
                    }
                }
            ]
        }
    },
    {
        id: "service-electrician",
        name: "Electrician",
        category: "services",
        description: "Professional electrician template",
        data: {
            root: { props: { title: "Electrician" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-electrician",
                        logoText: "VoltMaster",
                        links: [{ label: "Residential", href: "#features" }, { label: "Commercial", href: "#hero" }, { label: "Quote", href: "#cta" }],
                        ctaText: "Get Quote",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Safe & Reliable Electrical Work",
                        subtitle: "Licensed electricians for all your wiring, lighting, and specialized power needs.",
                        bgImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Request Service",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Solutions",
                        columns: "3",
                        features: [
                            { title: "Rewiring", description: "Whole home upgrades.", icon: "Zap" },
                            { title: "Lighting", description: "Indoor & outdoor.", icon: "Sun" },
                            { title: "EV Chargers", description: "Home installation.", icon: "Battery" }
                        ],
                        paddingY: "12",
                        backgroundColor: "yellow-50"
                    }
                }
            ]
        }
    },
    {
        id: "service-landscaping",
        name: "Landscaping",
        category: "services",
        description: "Green landscaping service template",
        data: {
            root: { props: { title: "Landscaping" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-landscaping",
                        logoText: "GreenThumb",
                        links: [{ label: "Design", href: "#features" }, { label: "Maintenance", href: "#hero" }, { label: "Portfolio", href: "#cta" }],
                        ctaText: "Free Estimate",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Transform Your Outdoor Space",
                        subtitle: "Custom landscape design and maintenance to create your perfect backyard oasis.",
                        bgImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Projects",
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
                            { title: "Design", description: "Custom Plans.", icon: "PenTool" },
                            { title: "Lawn Care", description: "Weekly mowing.", icon: "Scissors" },
                            { title: "Hardscaping", description: "Patios & paths.", icon: "Grid" }
                        ],
                        paddingY: "12",
                        backgroundColor: "green-50"
                    }
                }
            ]
        }
    },
    {
        id: "service-pest",
        name: "Pest Control",
        category: "services",
        description: "Effective pest control service template",
        data: {
            root: { props: { title: "Pest Control" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-pest",
                        logoText: "BugFree",
                        links: [{ label: "Pests", href: "#features" }, { label: "Guarantee", href: "#stats" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Schedule Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Protect Your Home",
                        subtitle: "Safe, effective, and guaranteed pest control solutions for your peace of mind.",
                        bgImage: "https://images.unsplash.com/photo-1584936684506-c3a7086e8212?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get Inspection",
                        overlayOpacity: "50",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "100%", label: "Safe for Pets" },
                            { value: "365", label: "Day Guarantee" },
                            { value: "15k+", label: "Homes Treated" }
                        ],
                        backgroundColor: "warmGray-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "We Treat",
                        columns: "4",
                        features: [
                            { title: "Ants", description: "Colony elimination.", icon: "Target" },
                            { title: "Termites", description: "Structural protection.", icon: "Shield" },
                            { title: "Rodents", description: "Exclusion & removal.", icon: "Home" },
                            { title: "Mosquitos", description: "Yard treatment.", icon: "Sun" }
                        ],
                        paddingY: "12",
                    }
                }
            ]
        }
    }
];
