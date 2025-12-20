import { Template } from "./types";

export const saasTemplates: Template[] = [
    {
        id: "saas-modern",
        name: "Modern SaaS",
        category: "saas",
        description: "Clean, minimal SaaS landing page with gradient accents",
        data: {
            root: { props: { title: "Modern SaaS" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-1",
                        logoText: "SaaSify",
                        links: [{ label: "Features", href: "#features-1" }, { label: "Pricing", href: "#pricing-container" }, { label: "Testimonials", href: "#testimonial-1" }],
                        ctaText: "Start Trial",
                        ctaLink: "#pricing-1",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Ship Products 10x Faster",
                        subtitle: "The all-in-one platform that helps teams build, deploy, and scale with confidence.",
                        bgImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Free Trial",
                        primaryActionUrl: "#",
                        secondaryAction: "Book a Demo",
                        secondaryActionUrl: "#",
                        overlayOpacity: "80",
                        overlayGradient: "radial",
                        align: "center",
                        minHeight: "[75vh]",
                        paddingY: "24",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "50K+", label: "Active Users" },
                            { value: "99.99%", label: "Uptime" },
                            { value: "150+", label: "Countries" },
                            { value: "4.9★", label: "Rating" }
                        ],
                        marginBottom: "12",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Everything You Need to Scale",
                        columns: "3",
                        features: [
                            { title: "Lightning Fast", description: "Deploy in milliseconds with our global edge network.", icon: "Zap" },
                            { title: "Enterprise Security", description: "SOC 2 certified with end-to-end encryption.", icon: "Shield" },
                            { title: "Real-time Analytics", description: "Monitor performance with live dashboards.", icon: "TrendingUp" },
                            { title: "Team Collaboration", description: "Built for teams of any size.", icon: "Users" },
                            { title: "API First", description: "Integrate with your existing tools.", icon: "Code" },
                            { title: "24/7 Support", description: "Expert help whenever you need it.", icon: "MessageCircle" }
                        ],
                        paddingY: "16",
                        backgroundColor: "white/5",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "This platform transformed how we build products. We shipped our new feature in 2 weeks instead of 2 months.",
                        author: "Alex Rivera",
                        role: "CTO, TechFlow",
                        avatar: "https://i.pravatar.cc/150?u=alex",
                        marginTop: "8",
                        marginBottom: "8",
                    }
                },
                {
                    type: "ContainerBlock",
                    props: {
                        id: "pricing-container",
                        layout: "grid-3",
                        gap: "md",
                        paddingY: "16",
                        paddingX: "4",
                        className: "",
                        style: "{}",
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing-grid",
                        columns: "3",
                        cards: [
                            {
                                plan: "Starter",
                                price: "$29",
                                frequency: "/mo",
                                description: "For small teams getting started",
                                features: "5 Users, 10GB Storage, Email Support",
                                buttonText: "Start Free",
                                highlightColor: "indigo",
                                recommended: "false",
                                badgeText: "",
                            },
                            {
                                plan: "Pro",
                                price: "$99",
                                frequency: "/mo",
                                description: "For growing companies",
                                features: "Unlimited Users, 100GB Storage, Priority Support, API Access",
                                buttonText: "Start Pro Trial",
                                highlightColor: "indigo",
                                recommended: "true",
                                badgeText: "Most Popular",
                            },
                            {
                                plan: "Enterprise",
                                price: "Custom",
                                frequency: "",
                                description: "For large organizations",
                                features: "Unlimited Everything, SSO, Dedicated Support, Custom SLA",
                                buttonText: "Contact Sales",
                                highlightColor: "indigo",
                                recommended: "false",
                                badgeText: "",
                            }
                        ]
                    }
                },
                {
                    type: "FaqBlock",
                    props: {
                        id: "faq-saas",
                        items: [
                            { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time without penalties." },
                            { question: "Do you offer enterprise plans?", answer: "We have dedicated enterprise tiers with custom SLAS and support." }
                        ],
                        marginBottom: "16",
                    }
                },
                {
                    type: "DividerBlock",
                    props: { id: "divider-1", padding: "lg", style: "gradient" }
                }
            ]
        }
    },
    {
        id: "saas-startup",
        name: "Startup Launch",
        category: "saas",
        description: "Bold startup landing page with vibrant purple gradients",
        data: {
            root: { props: { title: "Startup Launch" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-startup",
                        logoText: "LaunchPad",
                        links: [{ label: "Features", href: "#features-1" }, { label: "FAQ", href: "#faq-1" }, { label: "Customers", href: "#heading-1" }],
                        ctaText: "Get Started",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "The Future of Workflow Automation",
                        subtitle: "Automate repetitive tasks and focus on what matters. Join 10,000+ teams already saving 20+ hours per week.",
                        bgImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get Early Access",
                        primaryActionUrl: "#",
                        secondaryAction: "Watch Demo",
                        secondaryActionUrl: "#",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "screen",
                        paddingY: "24",
                    }
                },
                {
                    type: "SpacerBlock",
                    props: { id: "spacer-1", height: "16" }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "heading-1",
                        title: "Trusted by Industry Leaders",
                        align: "center",
                        size: "md",
                        textColor: "slate-400",
                        marginBottom: "8",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Built for Modern Teams",
                        columns: "4",
                        features: [
                            { title: "Smart Automation", description: "AI-powered workflows that learn.", icon: "Sparkles" },
                            { title: "Instant Sync", description: "Real-time updates everywhere.", icon: "Cloud" },
                            { title: "Secure Vault", description: "Your data, protected.", icon: "Lock" },
                            { title: "Mobile Ready", description: "Work from anywhere.", icon: "Smartphone" }
                        ],
                        paddingY: "16",
                        backgroundGradient: "from-purple-600 to-pink-600",
                    }
                },
                {
                    type: "FaqBlock",
                    props: {
                        id: "faq-1",
                        items: [
                            { question: "How quickly can I get started?", answer: "You can set up your first automation in under 5 minutes. Our onboarding wizard guides you through every step." },
                            { question: "Is there a free trial?", answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required." },
                            { question: "How does pricing work?", answer: "We offer transparent per-seat pricing starting at $15/user/month. Volume discounts available for larger teams." },
                            { question: "Can I integrate with my existing tools?", answer: "Absolutely! We integrate with 200+ popular apps including Slack, Salesforce, HubSpot, and more." }
                        ],
                        marginTop: "12",
                        marginBottom: "12",
                    }
                }
            ]
        }
    },
    {
        id: "saas-api",
        name: "Developer API",
        category: "saas",
        description: "Technical API documentation landing with code-focused design",
        data: {
            root: { props: { title: "Developer API" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-api",
                        logoText: "DevAPI",
                        links: [{ label: "Features", href: "#features-1" }, { label: "Reliability", href: "#stats-1" }, { label: "FAQ", href: "#faq-api" }],
                        ctaText: "Get API Key",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Build Faster with Our API",
                        subtitle: "RESTful API with SDKs for every major language. Ship powerful integrations in hours, not weeks.",
                        bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Documentation",
                        primaryActionUrl: "#",
                        secondaryAction: "Get API Key",
                        secondaryActionUrl: "#",
                        overlayOpacity: "80",
                        align: "left",
                        minHeight: "[60vh]",
                        paddingY: "16",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "500M+", label: "API Calls/Day" },
                            { value: "<10ms", label: "Avg Latency" },
                            { value: "12", label: "SDKs" },
                            { value: "99.999%", label: "Uptime SLA" }
                        ],
                        backgroundColor: "emerald-950/20",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Developer-First Design",
                        columns: "3",
                        features: [
                            { title: "GraphQL & REST", description: "Choose the API style that fits your needs.", icon: "Code" },
                            { title: "Webhooks", description: "Real-time event notifications.", icon: "Zap" },
                            { title: "Rate Limiting", description: "Generous limits that scale with you.", icon: "Layers" },
                            { title: "Sandbox Mode", description: "Test safely before going live.", icon: "Shield" },
                            { title: "Auto-pagination", description: "Handle large datasets effortlessly.", icon: "Database" },
                            { title: "OpenAPI Spec", description: "Auto-generate clients.", icon: "Gift" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-api",
                        quote: "The API is a joy to work with. Well documented and insanely fast.",
                        author: "David Chen",
                        role: "Senior Engineer",
                        avatar: "https://i.pravatar.cc/150?u=david",
                        marginTop: "12",
                        marginBottom: "12"
                    }
                },
                {
                    type: "FaqBlock",
                    props: {
                        id: "faq-api",
                        items: [
                            { question: "What is the rate limit?", answer: "1000 requests per minute for Pro plans." },
                            { question: "Do you support GraphQL?", answer: "Yes, fully supported alongside REST." }
                        ],
                        marginBottom: "16"
                    }
                }
            ]
        }
    },
    {
        id: "saas-ai-writing",
        name: "AI Writing Tool",
        category: "saas",
        description: "Minimalist AI tool template",
        data: {
            root: { props: { title: "AI Writer" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-ai",
                        logoText: "DraftBot",
                        links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Login", href: "#cta" }],
                        ctaText: "Get Started",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Write 10x Faster with AI",
                        subtitle: "Generate high-quality blog posts, emails, and ad copy in seconds.",
                        bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Writing",
                        overlayOpacity: "20",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Powered by GPT-4",
                        columns: "3",
                        features: [
                            { title: "SEO Optimized", description: "Rank higher.", icon: "Search" },
                            { title: "Plagiarism Free", description: "Unique content.", icon: "Check" },
                            { title: "50+ Templates", description: "For any use case.", icon: "Layout" }
                        ],
                        paddingY: "12",
                        backgroundColor: "sky-50"
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
                                price: "$19",
                                frequency: "/mo",
                                description: "For content creators",
                                features: "Unlimited Words, All Templates, 1 User",
                                buttonText: "Subscribe",
                                highlightColor: "sky",
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
        id: "saas-crm",
        name: "CRM Platform",
        category: "saas",
        description: "Corporate CRM dashboard template",
        data: {
            root: { props: { title: "CRM" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-crm",
                        logoText: "SalesFlow",
                        links: [{ label: "Product", href: "#features" }, { label: "Customers", href: "#stats" }, { label: "Enterprise", href: "#cta" }],
                        ctaText: "Book Demo",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "The CRM Sales Teams Love",
                        subtitle: "Manage leads, close deals, and track revenue on one intuitive platform.",
                        bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Features",
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
                            { value: "30%", label: "Increase in Revenue" },
                            { value: "10k+", label: "Companies" },
                            { value: "4.8/5", label: "G2 Rating" }
                        ],
                        backgroundColor: "blue-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Automate Your Sales",
                        columns: "3",
                        features: [
                            { title: "Pipeline", description: "Visual drag-and-drop.", icon: "Trello" },
                            { title: "Email Sync", description: "Track opens & clicks.", icon: "Mail" },
                            { title: "Reporting", description: "Forecast accuracy.", icon: "BarChart" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "saas-pm",
        name: "Project Management",
        category: "saas",
        description: "Productivity and project management template",
        data: {
            root: { props: { title: "PM Tool" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-pm",
                        logoText: "TaskMaster",
                        links: [{ label: "Views", href: "#features" }, { label: "Integrations", href: "#hero" }, { label: "Pricing", href: "#pricing" }],
                        ctaText: "Get Started",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Manage Projects with Ease",
                        subtitle: "Collaborate, plan, and deliver on time. The #1 project management tool for remote teams.",
                        bgImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Try for Free",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Flexible Views",
                        columns: "4",
                        features: [
                            { title: "Kanban", description: "Board view.", icon: "Layout" },
                            { title: "Gantt", description: "Timeline view.", icon: "Calendar" },
                            { title: "List", description: "Detailed view.", icon: "List" },
                            { title: "Calendar", description: "Date view.", icon: "Clock" }
                        ],
                        paddingY: "12",
                        backgroundColor: "indigo-50"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing",
                        columns: "1",
                        cards: [
                            {
                                plan: "Business",
                                price: "$10",
                                frequency: "/user/mo",
                                description: "For fast-moving teams",
                                features: "Unlimited Projects, 10 Guests, Time Tracking",
                                buttonText: "Buy Now",
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
        id: "saas-video",
        name: "Video Editor",
        category: "saas",
        description: "Creative video SaaS template",
        data: {
            root: { props: { title: "Video Editor" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-video",
                        logoText: "ClipEdit",
                        links: [{ label: "Tools", href: "#features" }, { label: "Showcase", href: "#hero" }, { label: "Login", href: "#cta" }],
                        ctaText: "Edit Video",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Professional Video Editing in the Browser",
                        subtitle: "No downloads required. Edit 4K video, add effects, and collaborate in real-time.",
                        bgImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Editing",
                        overlayOpacity: "70",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Powerful Features",
                        columns: "3",
                        features: [
                            { title: "Multi-track", description: "Precision editing.", icon: "Sliders" },
                            { title: "Stock Library", description: "1M+ assets.", icon: "Image" },
                            { title: "Auto Subtitles", description: "AI generation.", icon: "Type" }
                        ],
                        paddingY: "12",
                        backgroundColor: "neutral-900"
                    }
                }
            ]
        }
    }
];
