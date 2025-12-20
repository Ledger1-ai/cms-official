
import { Template } from "./types";

export const techTemplates: Template[] = [
    {
        id: "tech-ai-platform",
        name: "AI Platform",
        category: "tech",
        description: "Futuristic AI platform landing page with dark mode and glowing accents",
        data: {
            root: { props: { title: "AI Platform" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-ai",
                        logoText: "NeurAl",
                        links: [{ label: "Features", href: "#features-1" }, { label: "Solutions", href: "#features-grid" }, { label: "Pricing", href: "#pricing" }],
                        ctaText: "Get Access",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "The Next Generation of Intelligence",
                        subtitle: "Build, deploy, and scale machine learning models with unprecedented speed and accuracy.",
                        bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Building",
                        secondaryAction: "View Documentation",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "10x", label: "Faster Training" },
                            { value: "99.9%", label: "Accuracy" },
                            { value: "50M+", label: "Predictions/Day" }
                        ],
                        backgroundGradient: "from-indigo-900 to-purple-900",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Core Capabilities",
                        columns: "3",
                        features: [
                            { title: "AutoML", description: "Automated model selection.", icon: "Cpu" },
                            { title: "Neural Networks", description: "Deep learning made easy.", icon: "Share2" },
                            { title: "Real-time Inference", description: "Sub-millisecond latency.", icon: "Zap" }
                        ],
                        paddingY: "16",
                        backgroundColor: "slate-950"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing",
                        columns: "1",
                        cards: [
                            {
                                plan: "Pro",
                                price: "$99",
                                frequency: "/mo",
                                description: "For scaling teams",
                                features: "Unlimited Models, API Access, Priority Support",
                                buttonText: "Start Trial",
                                highlightColor: "indigo",
                                recommended: "false",
                                badgeText: "",
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: "tech-cloud-infra",
        name: "Cloud Infrastructure",
        category: "tech",
        description: "Reliable cloud infrastructure provider template",
        data: {
            root: { props: { title: "Cloud Infra" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-cloud",
                        logoText: "CloudScale",
                        links: [{ label: "Products", href: "#products" }, { label: "Regions", href: "#map" }, { label: "Enterprise", href: "#cta" }],
                        ctaText: "Console Login",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Deploy Globally in Seconds",
                        subtitle: "The developer-first cloud platform. Simple, scalable, and cost-effective infrastructure for your applications.",
                        bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Create Account",
                        secondaryAction: "Contact Sales",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "products",
                        title: "Product Suite",
                        columns: "4",
                        features: [
                            { title: "Compute", description: "Virtual machines.", icon: "Server" },
                            { title: "Storage", description: "Object & Block storage.", icon: "HardDrive" },
                            { title: "Networking", description: "VPC & Load Balancers.", icon: "Globe" },
                            { title: "Databases", description: "Managed SQL & NoSQL.", icon: "Database" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "We migrated our entire stack to CloudScale and cut our bill in half while improving performance.",
                        author: "David Miller",
                        role: "CTO at TechCorp",
                        avatar: "https://i.pravatar.cc/150?u=david",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta",
                        text: "Start specific server",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        marginBottom: "16",
                        borderRadius: "full",
                        shadow: "none",
                        fullWidth: false
                    }
                }
            ]
        }
    },
    {
        id: "tech-cyber-security",
        name: "Cyber Security",
        category: "tech",
        description: "Sentinel-style security dashboard landing page",
        data: {
            root: { props: { title: "Cyber Security" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-cyber",
                        logoText: "Sentinel",
                        links: [{ label: "Platform", href: "#features" }, { label: "Threats", href: "#stats" }, { label: "Resources", href: "#cta" }],
                        ctaText: "Get Demo",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Secure Your Digital Assets",
                        subtitle: "Advanced threat detection and response platform powered by AI. Protected by 500+ enterprises.",
                        bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Book Demo",
                        overlayOpacity: "90",
                        align: "center",
                        overlayGradient: "radial",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "0", label: "Breaches" },
                            { value: "24/7", label: "Monitoring" },
                            { value: "100%", label: "Compliance" }
                        ],
                        backgroundColor: "slate-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Total Protection",
                        columns: "3",
                        features: [
                            { title: "Endpoint Security", description: "Protect every device.", icon: "Shield" },
                            { title: "Network Traffic", description: "Deep packet inspection.", icon: "Activity" },
                            { title: "Cloud Security", description: "Secure your AWS/Azure.", icon: "Cloud" }
                        ],
                        paddingY: "16",
                        backgroundColor: "slate-950"
                    }
                }
            ]
        }
    },
    {
        id: "tech-mobile-app",
        name: "Mobile App Launch",
        category: "tech",
        description: "Vibrant app launch landing page with gradients",
        data: {
            root: { props: { title: "Mobile App" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-app",
                        logoText: "AppLaunch",
                        links: [{ label: "Features", href: "#features" }, { label: "Screens", href: "#gallery" }, { label: "Download", href: "#hero-1" }],
                        ctaText: "Get App",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "The App You've Been Waiting For",
                        subtitle: "Organize your life, connect with friends, and achieve more. Download the best rated app of 2024.",
                        bgImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Download for iOS",
                        secondaryAction: "Download for Android",
                        overlayOpacity: "60",
                        align: "center",
                        overlayGradient: "to-r",
                        minHeight: "[80vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "5M+", label: "Downloads" },
                            { value: "4.9", label: "App Store" },
                            { value: "#1", label: "Productivity" }
                        ],
                        backgroundColor: "indigo-950/20"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Why You'll Love It",
                        columns: "3",
                        features: [
                            { title: "Smart Sync", description: "Across all devices.", icon: "RefreshCw" },
                            { title: "Dark Mode", description: "Easy on the eyes.", icon: "Moon" },
                            { title: "Private", description: "End-to-end encrypted.", icon: "Lock" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "tech-documentation",
        name: "Developer Docs",
        category: "tech",
        description: "Clean documentation site template",
        data: {
            root: { props: { title: "Docs" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-docs",
                        logoText: "DocsType",
                        links: [{ label: "Guide", href: "#hero" }, { label: "API", href: "#features" }, { label: "Support", href: "#cta" }],
                        ctaText: "GitHub",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Build Faster with Our API",
                        subtitle: "Comprehensive guides, API reference, and code examples to help you start shipping in minutes.",
                        bgImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Read the Guide",
                        secondaryAction: "API Reference",
                        overlayOpacity: "80",
                        align: "left",
                        minHeight: "[50vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "cards",
                        title: "Browse by Topic",
                        columns: "3",
                        features: [
                            { title: "Quickstart", description: "5-minute setup.", icon: "Zap" },
                            { title: "Authentication", description: "Secure your API.", icon: "Key" },
                            { title: "SDKs", description: "Libraries for every language.", icon: "Code" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "tech-blockchain",
        name: "Blockchain Platform",
        category: "tech",
        description: "Web3 platform with futuristic aesthetics",
        data: {
            root: { props: { title: "Blockchain" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-blockchain",
                        logoText: "BlockChain",
                        links: [{ label: "Node", href: "#hero" }, { label: "Token", href: "#stats" }, { label: "Whitepaper", href: "#features" }],
                        ctaText: "Connect Wallet",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Decentralized Future",
                        subtitle: "The world's most scalable and secure layer-1 blockchain for decentralized applications.",
                        bgImage: "https://images.unsplash.com/photo-1639322537228-ad714dd474f5?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Staking",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "$2B", label: "TVL" },
                            { value: "100k", label: "Validators" },
                            { value: "0", label: "Downtime" }
                        ],
                        backgroundGradient: "from-purple-900 to-indigo-900"
                    }
                }
            ]
        }
    }
];
