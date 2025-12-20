
import { Template } from "./types";

export const entertainmentTemplates: Template[] = [
    {
        id: "ent-streaming",
        name: "Streaming Service",
        category: "entertainment",
        description: "Dark, immersive streaming platform template",
        data: {
            root: { props: { title: "StreamFlix" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-streaming",
                        logoText: "StreamFlix",
                        links: [{ label: "Movies", href: "#features" }, { label: "Series", href: "#hero" }, { label: "Live", href: "#cta" }],
                        ctaText: "Start Free Trial",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Unlimited Entertainment",
                        subtitle: "Watch thousands of movies, TV shows, and original content on any device.",
                        bgImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8efe30?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Watch Now",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "screen",
                        overlayGradient: "radial"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Trending Now",
                        columns: "4",
                        features: [
                            { title: "Sci-Fi", description: "Future worlds.", icon: "Tv" },
                            { title: "Action", description: "Adrenaline rush.", icon: "Zap" },
                            { title: "Drama", description: "Emotional stories.", icon: "Heart" },
                            { title: "Comedy", description: "Laugh out loud.", icon: "Smile" }
                        ],
                        paddingY: "12",
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
                                plan: "Premium",
                                price: "$14.99",
                                frequency: "/mo",
                                description: "4K Ultra HD",
                                features: "No Ads, 4 Screens, Downloads",
                                buttonText: "Subscribe",
                                highlightColor: "red",
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
        id: "ent-music",
        name: "Music Artist",
        category: "entertainment",
        description: "Bold template for musicians and bands",
        data: {
            root: { props: { title: "Artist" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-music",
                        logoText: "NEON",
                        links: [{ label: "Tour", href: "#tour" }, { label: "Music", href: "#music" }, { label: "Merch", href: "#store" }],
                        ctaText: "Listen",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "The Midnight Tour",
                        subtitle: "New album out now. Experience the sound of the future live in your city.",
                        bgImage: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get Tickets",
                        secondaryAction: "Stream Album",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "tour",
                        title: "Tour Dates",
                        columns: "3",
                        features: [
                            { title: "New York", description: "Madison Square Garden", icon: "MapPin" },
                            { title: "London", description: "O2 Arena", icon: "MapPin" },
                            { title: "Tokyo", description: "Tokyo Dome", icon: "MapPin" }
                        ],
                        paddingY: "16",
                        backgroundColor: "slate-900"
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "store",
                        text: "Visit Merch Store",
                        variant: "outline",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        borderRadius: "full",
                        shadow: "none",
                        fullWidth: false,
                        className: "",
                        marginBottom: "24",
                        marginTop: "12"
                    }
                }
            ]
        }
    },
    {
        id: "ent-gaming",
        name: "Gaming Studio",
        category: "entertainment",
        description: "High-energy gaming studio template",
        data: {
            root: { props: { title: "Gaming" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-gaming",
                        logoText: "PixelForge",
                        links: [{ label: "Games", href: "#games" }, { label: "Careers", href: "#careers" }, { label: "Press", href: "#cta" }],
                        ctaText: "Play Free",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Crafting Worlds",
                        subtitle: "We build immersive multiplayer experiences that push the boundaries of play.",
                        bgImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Games",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "games",
                        title: "Our Titles",
                        columns: "3",
                        features: [
                            { title: "Star Command", description: "Sci-fi RTS.", icon: "Crosshair" },
                            { title: "Shadow Realms", description: "Dark fantasy RPG.", icon: "Sword" },
                            { title: "Neon Racers", description: "Cyberpunk racing.", icon: "Zap" }
                        ],
                        paddingY: "12",
                        backgroundColor: "black"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "10M+", label: "Players" },
                            { value: "20+", label: "Awards" },
                            { value: "5", label: "Global Studios" }
                        ],
                        backgroundColor: "teal-900"
                    }
                }
            ]
        }
    },
    {
        id: "ent-cinema",
        name: "Movie Theater",
        category: "entertainment",
        description: "Cinema booking template",
        data: {
            root: { props: { title: "Cinema" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-cinema",
                        logoText: "CinePlex",
                        links: [{ label: "Now Playing", href: "#movies" }, { label: "Coming Soon", href: "#hero" }, { label: "Food", href: "#cta" }],
                        ctaText: "Buy Tickets",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Experience the Magic",
                        subtitle: "IMAX laser projection and Dolby Atmos sound. The ultimate movie-going experience.",
                        bgImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Get Showtimes",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "movies",
                        title: "Now Showing",
                        columns: "4",
                        features: [
                            { title: "Space Odyssey", description: "Action / Sci-Fi", icon: "Film" },
                            { title: "The Detective", description: "Crime / Thriller", icon: "Film" },
                            { title: "Wedding Daze", description: "Romance / Comedy", icon: "Film" },
                            { title: "Jungle Quest", description: "Adventure", icon: "Film" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "ent-podcast",
        name: "Podcast Network",
        category: "entertainment",
        description: "Modern podcast network template",
        data: {
            root: { props: { title: "Podcast" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-podcast",
                        logoText: "EchoCast",
                        links: [{ label: "Shows", href: "#shows" }, { label: "Hosts", href: "#hero" }, { label: "Advertise", href: "#cta" }],
                        ctaText: "Listen Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Stories Worth Listening To",
                        subtitle: "Award-winning podcasts covering news, technology, culture, and true crime.",
                        bgImage: "https://images.unsplash.com/photo-1478737270239-2f52b27e9088?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Browse Shows",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "shows",
                        title: "Top Charts",
                        columns: "3",
                        features: [
                            { title: "Daily Tech", description: "Morning briefing.", icon: "Mic" },
                            { title: "Crime Scene", description: "Investigative journalism.", icon: "Headphones" },
                            { title: "The Interview", description: "Deep conversations.", icon: "Users" }
                        ],
                        paddingY: "12",
                        backgroundColor: "orange-50"
                    }
                }
            ]
        }
    },
    {
        id: "ent-news",
        name: "News Portal",
        category: "entertainment",
        description: "Content-heavy news portal template",
        data: {
            root: { props: { title: "News" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-news",
                        logoText: "TheDaily",
                        links: [{ label: "World", href: "#world" }, { label: "Tech", href: "#tech" }, { label: "Business", href: "#biz" }],
                        ctaText: "Subscribe",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Truth, Delivered Daily",
                        subtitle: "Independent journalism that goes deeper. Analysis, opinion, and reporting you can trust.",
                        bgImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Read Top Stories",
                        overlayOpacity: "50",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "topics",
                        title: "Trending Topics",
                        columns: "4",
                        features: [
                            { title: "Climate", description: "Environmental updates.", icon: "Globe" },
                            { title: "Markets", description: "Stock analysis.", icon: "TrendingUp" },
                            { title: "Politics", description: "Global affairs.", icon: "Mic" },
                            { title: "Culture", description: "Arts and life.", icon: "Feather" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    }
];
