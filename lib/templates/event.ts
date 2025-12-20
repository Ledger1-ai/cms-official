import { Template } from "./types";

export const eventTemplates: Template[] = [
    {
        id: "event-conference",
        name: "Conference",
        category: "event",
        description: "Tech conference landing with vibrant purple theme",
        data: {
            root: { props: { title: "Tech Conference" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-conference",
                        logoText: "DevSummit",
                        links: [{ label: "Speakers", href: "#stats-1" }, { label: "Tracks", href: "#tracks-1" }, { label: "Pricing", href: "#pricing-conf" }],
                        ctaText: "Get Tickets",
                        ctaLink: "#pricing-conf",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "DevSummit 2024",
                        subtitle: "Join 5,000+ developers at the world's premier software engineering conference. San Francisco • September 15-17",
                        bgImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get Tickets",
                        secondaryAction: "View Speakers",
                        overlayOpacity: "70",
                        overlayGradient: "radial",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "50+", label: "Speakers" },
                            { value: "100+", label: "Sessions" },
                            { value: "3", label: "Days" },
                            { value: "5,000", label: "Attendees" }
                        ],
                        backgroundGradient: "from-purple-600 to-pink-600",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "tracks-1",
                        title: "Conference Tracks",
                        columns: "4",
                        features: [
                            { title: "AI/ML", description: "The future of intelligent systems.", icon: "Cpu" },
                            { title: "Cloud Native", description: "Kubernetes, microservices, and beyond.", icon: "Cloud" },
                            { title: "Web3", description: "Decentralized applications.", icon: "Layers" },
                            { title: "DevOps", description: "CI/CD and platform engineering.", icon: "Rocket" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "FaqBlock",
                    props: {
                        id: "faq-1",
                        items: [
                            { question: "Where is the venue?", answer: "Moscone Center, San Francisco. The venue is easily accessible by public transit and near major hotels." },
                            { question: "Is there a virtual option?", answer: "Yes! All keynotes and main stage sessions will be live-streamed with interactive Q&A for virtual attendees." },
                            { question: "What's included with my ticket?", answer: "Full access to all sessions, networking events, meals, and exclusive swag. Early bird tickets include a workshop pass." }
                        ],
                        marginTop: "8",
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing-conf",
                        columns: "1",
                        cards: [
                            {
                                plan: "Conference Pass",
                                price: "$499",
                                frequency: "",
                                description: "Full access.",
                                features: "All Sessions, Meals, Swag",
                                buttonText: "Register Now",
                                highlightColor: "purple",
                                recommended: "true",
                                badgeText: "Best Value"
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: "event-webinar",
        name: "Webinar Registration",
        category: "event",
        description: "Professional webinar signup with clean blue design",
        data: {
            root: { props: { title: "Webinar Registration" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-webinar",
                        logoText: "Webinar",
                        links: [{ label: "Topic", href: "#hero-1" }, { label: "Learn", href: "#learn-1" }, { label: "Speakers", href: "#testimonial-1" }],
                        ctaText: "Reserve Spot",
                        ctaLink: "#cta-webinar",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Master Growth Marketing in 2024",
                        subtitle: "Join our free 60-minute masterclass where top marketers share their proven strategies for 10x growth.",
                        bgImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Reserve Your Spot",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "heading-1",
                        title: "📅 Thursday, March 21 • 2:00 PM EST",
                        align: "center",
                        size: "md",
                        textColor: "indigo-400",
                        marginTop: "8",
                        marginBottom: "8",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "learn-1",
                        title: "What You'll Learn",
                        columns: "3",
                        features: [
                            { title: "Growth Frameworks", description: "Proven systems for sustainable growth.", icon: "TrendingUp" },
                            { title: "Channel Strategies", description: "Where to focus your efforts.", icon: "Target" },
                            { title: "Real Case Studies", description: "Learn from $100M+ companies.", icon: "Award" }
                        ],
                        backgroundColor: "indigo-950/20",
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "This webinar completely changed how I approach marketing. We implemented the frameworks and saw 3x growth in 6 months.",
                        author: "Jamie Torres",
                        role: "Head of Growth, StartupABC",
                        avatar: "https://i.pravatar.cc/150?u=jamie",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-webinar",
                        text: "Reserve My Spot",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        marginBottom: "16",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false,
                        className: ""
                    }
                }
            ]
        }
    },
    {
        id: "event-newsletter",
        name: "Newsletter Signup",
        category: "event",
        description: "Minimal newsletter signup with gradient CTA",
        data: {
            root: { props: { title: "Newsletter Signup" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-newsletter",
                        logoText: "TheInsight",
                        links: [{ label: "Latest", href: "#heading-1" }, { label: "About", href: "#text-1" }, { label: "Subscribe", href: "#cta-1" }],
                        ctaText: "Join Free",
                        ctaLink: "#cta-1",
                        fixed: "true"
                    }
                },
                {
                    type: "SpacerBlock",
                    props: { id: "spacer-1", height: "24" }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "heading-1",
                        title: "The Weekly Insight",
                        align: "center",
                        size: "xl",
                        marginBottom: "4",
                    }
                },
                {
                    type: "TextBlock",
                    props: {
                        id: "text-1",
                        content: "Join 25,000+ professionals who get exclusive insights on tech, business, and leadership delivered to their inbox every Saturday.",
                        align: "center",
                        maxWidth: "2xl",
                        textColor: "slate-400",
                        marginBottom: "8",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-1",
                        text: "Subscribe for Free →",
                        variant: "gradient",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        marginBottom: "12",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false,
                        className: ""
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "25K+", label: "Subscribers" },
                            { value: "52%", label: "Open Rate" },
                            { value: "4.9★", label: "Reader Rating" }
                        ],
                        marginBottom: "8",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "The only newsletter I actually read every week. Concise, valuable, and always relevant.",
                        author: "Sarah Kim",
                        role: "Product Manager",
                        avatar: "https://i.pravatar.cc/150?u=sarah",
                    }
                }
            ]
        }
    },
    {
        id: "event-festival",
        name: "Music Festival",
        category: "event",
        description: "Vibrant music festival template",
        data: {
            root: { props: { title: "Music Festival" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-festival",
                        logoText: "VIBE",
                        links: [{ label: "Lineup", href: "#features" }, { label: "Tickets", href: "#cta" }, { label: "Info", href: "#faq" }],
                        ctaText: "Buy Passes",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Summer Vibes 2024",
                        subtitle: "3 Days of Music, Art, and Culture. Miami Beach • July 12-14",
                        bgImage: "https://images.unsplash.com/photo-1459749411177-d4a428c00171?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Lineup",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Headliners",
                        columns: "3",
                        features: [
                            { title: "The Weekend", description: "Friday Night.", icon: "Music" },
                            { title: "Dua Lipa", description: "Saturday Night.", icon: "Mic" },
                            { title: "Coldplay", description: "Sunday Closing.", icon: "Star" }
                        ],
                        paddingY: "12",
                        backgroundColor: "purple-900"
                    }
                }
            ]
        }
    },
    {
        id: "event-wedding",
        name: "Wedding Expo",
        category: "event",
        description: "Elegant wedding expo template",
        data: {
            root: { props: { title: "Wedding Expo" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-wedding",
                        logoText: "BridalShow",
                        links: [{ label: "Exhibitors", href: "#features" }, { label: "Fashion Show", href: "#hero" }, { label: "Register", href: "#cta" }],
                        ctaText: "Get Tickets",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "The Ultimate Wedding Experience",
                        subtitle: "Meet top vendors, see the latest fashion, and plan your dream wedding all in one place.",
                        bgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Register Now",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "What to Expect",
                        columns: "4",
                        features: [
                            { title: "Venues", description: "Find your location.", icon: "MapPin" },
                            { title: "Dresses", description: "Try on gowns.", icon: "Heart" },
                            { title: "Catering", description: "Taste samples.", icon: "Coffee" },
                            { title: "Floral", description: "Bouquet ideas.", icon: "Sun" }
                        ],
                        paddingY: "12",
                        backgroundColor: "rose-50"
                    }
                }
            ]
        }
    },
    {
        id: "event-gala",
        name: "Charity Gala",
        category: "event",
        description: "Formal charity gala template",
        data: {
            root: { props: { title: "Annual Gala" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-gala",
                        logoText: "HopeGala",
                        links: [{ label: "Mission", href: "#stats" }, { label: "Sponsors", href: "#features" }, { label: "RSVP", href: "#cta" }],
                        ctaText: "Donate",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "A Night of Hope",
                        subtitle: "Join us for an evening of elegance, entertainment, and giving back. Supporting children in need.",
                        bgImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Purchase Tables",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "$2M", label: "Goal" },
                            { value: "500", label: "Guests" },
                            { value: "100%", label: "Impact" }
                        ],
                        backgroundColor: "slate-900"
                    }
                }
            ]
        }
    },
    {
        id: "event-art",
        name: "Art Exhibition",
        category: "event",
        description: "Modern art exhibition template",
        data: {
            root: { props: { title: "Art Exhibition" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-art",
                        logoText: "MOMA",
                        links: [{ label: "Artists", href: "#features" }, { label: "Visit", href: "#hero" }, { label: "Tickets", href: "#cta" }],
                        ctaText: "Book Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Abstract Realities",
                        subtitle: "An immersive journey through contemporary abstract art. On view through December.",
                        bgImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Plan Your Visit",
                        overlayOpacity: "20",
                        align: "left",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Featured Artists",
                        columns: "3",
                        features: [
                            { title: "Yayoi Kusama", description: "Infinity Rooms.", icon: "Circle" },
                            { title: "Banksy", description: "Street Art.", icon: "Eye" },
                            { title: "Kaws", description: "Pop Culture.", icon: "Smile" }
                        ],
                        paddingY: "12",
                        backgroundColor: "zinc-100"
                    }
                }
            ]
        }
    }
];
