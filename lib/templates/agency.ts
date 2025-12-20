import { Template } from "./types";

export const agencyTemplates: Template[] = [
    {
        id: "agency-creative",
        name: "Creative Agency",
        category: "agency",
        description: "Bold creative agency with striking orange and black design",
        data: {
            root: { props: { title: "Creative Agency" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-creative",
                        logoText: "CREATIVE",
                        links: [{ label: "Work", href: "#hero-1" }, { label: "Services", href: "#services-1" }, { label: "About", href: "#stats-1" }],
                        ctaText: "Start Project",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "We Create Digital Experiences",
                        subtitle: "Award-winning design studio crafting brands, websites, and digital products that captivate and convert.",
                        bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Our Work",
                        primaryActionUrl: "#",
                        secondaryAction: "Start a Project",
                        secondaryActionUrl: "#",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "screen",
                        paddingY: "24",
                    }
                },
                {
                    type: "SpacerBlock",
                    props: { id: "spacer-agency", height: "16" }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Our Services",
                        columns: "4",
                        features: [
                            { title: "Brand Strategy", description: "Define your unique identity.", icon: "Target" },
                            { title: "Web Design", description: "Beautiful, functional websites.", icon: "Monitor" },
                            { title: "Motion Design", description: "Animations that tell stories.", icon: "Video" },
                            { title: "Photography", description: "Stunning visual content.", icon: "Camera" }
                        ],
                        backgroundGradient: "from-orange-500 to-red-600",
                        paddingY: "16",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "Working with this team was a game-changer. They didn't just design our brand—they understood our vision and elevated it beyond what we imagined.",
                        author: "Jordan Lee",
                        role: "Founder, Luminary Co",
                        avatar: "https://i.pravatar.cc/150?u=jordan",
                        marginTop: "12",
                        marginBottom: "12",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "150+", label: "Projects Completed" },
                            { value: "12", label: "Design Awards" },
                            { value: "8", label: "Years Experience" },
                            { value: "100%", label: "Client Retention" }
                        ],
                    }
                }
            ]
        }
    },
    {
        id: "agency-marketing",
        name: "Digital Marketing",
        category: "agency",
        description: "Results-driven marketing agency with green success themes",
        data: {
            root: { props: { title: "Digital Marketing" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-marketing",
                        logoText: "Growth.Co",
                        links: [{ label: "Services", href: "#services-1" }, { label: "Results", href: "#stats-1" }, { label: "Reviews", href: "#testimonial-marketing" }],
                        ctaText: "Get Audit",
                        ctaLink: "#cta-marketing",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Grow Your Business with Data-Driven Marketing",
                        subtitle: "We help ambitious brands reach their full potential through strategic SEO, paid media, and content that converts.",
                        bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get Free Audit",
                        primaryActionUrl: "#",
                        secondaryAction: "Our Results",
                        secondaryActionUrl: "#",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "$50M+", label: "Revenue Generated" },
                            { value: "300%", label: "Avg ROI" },
                            { value: "500+", label: "Campaigns Launched" },
                            { value: "10M+", label: "Leads Captured" }
                        ],
                        backgroundColor: "emerald-950/20",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Full-Service Marketing",
                        columns: "3",
                        features: [
                            { title: "Search Marketing", description: "Dominate Google with SEO & SEM.", icon: "Globe" },
                            { title: "Social Media", description: "Engage audiences everywhere.", icon: "Heart" },
                            { title: "Content Strategy", description: "Content that ranks and converts.", icon: "Palette" },
                            { title: "Email Marketing", description: "Nurture leads automatically.", icon: "Mail" },
                            { title: "Analytics", description: "Data-driven decisions.", icon: "TrendingUp" },
                            { title: "Automation", description: "Scale your efforts.", icon: "Cpu" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-marketing",
                        quote: "Our ROI doubled in 3 months. Highly influential team.",
                        author: "Sarah Jones",
                        role: "CMO",
                        avatar: "https://i.pravatar.cc/150?u=sarah",
                        marginTop: "12",
                        marginBottom: "12"
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-marketing",
                        text: "Start Your Growth Engine",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        borderRadius: "full",
                        shadow: "none",
                        fullWidth: false,
                        className: "",
                        marginBottom: "16"
                    }
                }
            ]
        }
    },
    {
        id: "agency-seo",
        name: "SEO Agency",
        category: "agency",
        description: "SEO focused agency template",
        data: {
            root: { props: { title: "SEO Agency" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-seo",
                        logoText: "RankUp",
                        links: [{ label: "Services", href: "#features" }, { label: "Case Studies", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Free Audit",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Disrupt Your Competition",
                        subtitle: "We help brands rank #1 on Google using white-hat SEO strategies for long-term growth.",
                        bgImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "See Our Results",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Our Process",
                        columns: "3",
                        features: [
                            { title: "Audit", description: "Technical analysis.", icon: "Search" },
                            { title: "Content", description: "Authority building.", icon: "FileText" },
                            { title: "Backlinks", description: "Media outreach.", icon: "Link" }
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
                            { value: "#1", label: "Rankings Achieved" },
                            { value: "500%", label: "Traffic Growth" },
                            { value: "50+", label: "Experts" }
                        ],
                        backgroundColor: "blue-900"
                    }
                }
            ]
        }
    },
    {
        id: "agency-branding",
        name: "Branding Studio",
        category: "agency",
        description: "Creative branding studio template",
        data: {
            root: { props: { title: "Branding" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-branding",
                        logoText: "IDENTITY",
                        links: [{ label: "Work", href: "#hero" }, { label: "Approach", href: "#features" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Inquire",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Building Iconic Brands",
                        subtitle: "We craft visual identities that resonate, inspire, and endure.",
                        bgImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Portfolio",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Services",
                        columns: "3",
                        features: [
                            { title: "Logo Design", description: "Visual marks.", icon: "PenTool" },
                            { title: "Typography", description: "Type systems.", icon: "Type" },
                            { title: "Brand Guidelines", description: "Usage rules.", icon: "Book" }
                        ],
                        paddingY: "12",
                        backgroundColor: "zinc-100"
                    }
                }
            ]
        }
    },
    {
        id: "agency-pr",
        name: "PR Firm",
        category: "agency",
        description: "Professional public relations template",
        data: {
            root: { props: { title: "PR" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-pr",
                        logoText: "Publicity",
                        links: [{ label: "Clients", href: "#stats" }, { label: "Services", href: "#features" }, { label: "Press", href: "#cta" }],
                        ctaText: "Get Featured",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Tell Your Story to the World",
                        subtitle: "Strategic public relations for tech companies and thought leaders. Get seen in top-tier media.",
                        bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Clients",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "Forbes", label: "Placements" },
                            { value: "TechCrunch", label: "Features" },
                            { value: "WSJ", label: "Interviews" }
                        ],
                        backgroundColor: "slate-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Capabilities",
                        columns: "3",
                        features: [
                            { title: "Media Relations", description: "Journalist network.", icon: "Mic" },
                            { title: "Crisis Comms", description: "Reputation management.", icon: "Shield" },
                            { title: "Events", description: "Launch parties.", icon: "Calendar" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "agency-social",
        name: "Social Media Agency",
        category: "agency",
        description: "Vibrant social media agency template",
        data: {
            root: { props: { title: "Social" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-social",
                        logoText: "ViralLabs",
                        links: [{ label: "Case Studies", href: "#hero" }, { label: "Platforms", href: "#features" }, { label: "Pricing", href: "#pricing" }],
                        ctaText: "Go Viral",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Social First.",
                        subtitle: "We create content that stops the scroll. TikTok, Instagram, and LinkedIn management for brands.",
                        bgImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "See Content",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                        overlayGradient: "to-r"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Platforms",
                        columns: "4",
                        features: [
                            { title: "TikTok", description: "Short form video.", icon: "Video" },
                            { title: "Instagram", description: "Aesthetic grids.", icon: "Camera" },
                            { title: "LinkedIn", description: "B2B growth.", icon: "Briefcase" },
                            { title: "Twitter", description: "Real-time engagement.", icon: "MessageSquare" }
                        ],
                        paddingY: "12",
                        backgroundColor: "pink-50"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing",
                        columns: "1",
                        cards: [
                            {
                                plan: "Growth",
                                price: "$2500",
                                frequency: "/mo",
                                description: "Full service management",
                                features: "Daily Posts, Community Mgmt, Monthly Reporting",
                                buttonText: "Start Now",
                                highlightColor: "pink",
                                recommended: "false",
                                badgeText: "",
                            }
                        ]
                    }
                }
            ]
        }
    }
];
