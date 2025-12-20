import { Template } from "./types";

export const travelTemplates: Template[] = [
    {
        id: "travel-agency",
        name: "Travel Agency",
        category: "travel",
        description: "Vibrant travel agency landing page with destination showcases",
        data: {
            root: { props: { title: "Travel Agency" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-travel",
                        logoText: "Wanderlust",
                        links: [{ label: "Destinations", href: "#features-1" }, { label: "Tours", href: "#hero-1" }, { label: "Blog", href: "#text-1" }],
                        ctaText: "Plan Trip",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Explore the Unknown",
                        subtitle: "Curated travel experiences for the modern adventurer. Discover hidden gems and local culture.",
                        bgImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Find Adventures",
                        secondaryAction: "Popular Destinations",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Trending Destinations",
                        columns: "3",
                        features: [
                            { title: "Kyoto, Japan", description: "Ancient temples & culture.", icon: "MapPin" },
                            { title: "Santorini, Greece", description: "Sun, sea, and white domes.", icon: "MapPin" },
                            { title: "Machu Picchu, Peru", description: "The lost city of Incas.", icon: "MapPin" }
                        ],
                        paddingY: "16"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "100+", label: "Destinations" },
                            { value: "50k+", label: "Travelers" },
                            { value: "24/7", label: "Support" }
                        ],
                        backgroundGradient: "from-sky-500 to-indigo-500",
                    }
                }
            ]
        }
    },
    {
        id: "travel-hotel",
        name: "Luxury Resort",
        category: "travel",
        description: "Elegant hotel booking page with immersive imagery",
        data: {
            root: { props: { title: "Luxury Resort" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-hotel",
                        logoText: "TheAzure",
                        links: [{ label: "Rooms", href: "#features-rooms" }, { label: "Amenities", href: "#features- amenities" }, { label: "Dining", href: "#text-1" }],
                        ctaText: "Book Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Sanctuary by the Sea",
                        subtitle: "Experience unparalleled luxury and breathtaking ocean views at The Azure Resort & Spa.",
                        bgImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Check Availability",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-amenities",
                        title: "World-Class Amenities",
                        columns: "4",
                        features: [
                            { title: "Infinity Pool", description: "Overlooking the ocean.", icon: "Sun" },
                            { title: "Spa & Wellness", description: "Holistic treatments.", icon: "Heart" },
                            { title: "Private Beach", description: "Exclusive access.", icon: "Compass" },
                            { title: "Fine Dining", description: "Michelin-starred chefs.", icon: "Star" }
                        ],
                        paddingY: "12",
                        backgroundColor: "slate-50",
                    }
                }
            ]
        }
    },
    {
        id: "travel-guide",
        name: "City Guide",
        category: "travel",
        description: "Modern city guide template",
        data: {
            root: { props: { title: "City Guide" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-guide",
                        logoText: "NYCGuide",
                        links: [{ label: "Eat", href: "#features" }, { label: "Stay", href: "#hero" }, { label: "Play", href: "#stats" }],
                        ctaText: "Get Map",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Discover New York City",
                        subtitle: "The ultimate guide to the city that never sleeps. Best restaurants, hidden bars, and must-see art.",
                        bgImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Explore Neighborhoods",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Top Picks",
                        columns: "3",
                        features: [
                            { title: "Dining", description: "Michelin stars.", icon: "Coffee" },
                            { title: "Museums", description: "World class art.", icon: "Map" },
                            { title: "Nightlife", description: "Rooftop bars.", icon: "Moon" }
                        ],
                        paddingY: "12",
                        backgroundColor: "zinc-900"
                    }
                }
            ]
        }
    },
    {
        id: "travel-adventure",
        name: "Adventure Tour",
        category: "travel",
        description: "Action-packed adventure travel template",
        data: {
            root: { props: { title: "Adventure Tour" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-adventure",
                        logoText: "WildEarth",
                        links: [{ label: "Tours", href: "#features" }, { label: "Destinations", href: "#hero" }, { label: "Book", href: "#cta" }],
                        ctaText: "Book Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Wilderness Awaits",
                        subtitle: "Guided hiking, climbing, and kayaking tours in the world's most spectacular landscapes.",
                        bgImage: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Find Your Trip",
                        overlayOpacity: "20",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "50+", label: "Countries" },
                            { value: "500+", label: "Guides" },
                            { value: "10k+", label: "Explorers" }
                        ],
                        backgroundColor: "green-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Activity Levels",
                        columns: "3",
                        features: [
                            { title: "Easy", description: "Scenic walks.", icon: "Sun" },
                            { title: "Moderate", description: "Full day hikes.", icon: "MapPin" },
                            { title: "Extreme", description: "Technical climbs.", icon: "Activity" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "travel-transport",
        name: "Transport / Airline",
        category: "travel",
        description: "Transport and logistics travel template",
        data: {
            root: { props: { title: "Transport" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-transport",
                        logoText: "AeroJet",
                        links: [{ label: "Book", href: "#hero" }, { label: "Status", href: "#stats" }, { label: "Check-in", href: "#cta" }],
                        ctaText: "Sign In",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Fly with Comfort",
                        subtitle: "Experience premium service and nonstop flights to over 100 destinations worldwide.",
                        bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Search Flights",
                        overlayOpacity: "50",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Why Fly Us",
                        columns: "3",
                        features: [
                            { title: "Legroom", description: "Best in class.", icon: "Maximize" },
                            { title: "WiFi", description: "High speed.", icon: "Wifi" },
                            { title: "Lounge", description: "Premium access.", icon: "Coffee" }
                        ],
                        paddingY: "12",
                        backgroundColor: "sky-50"
                    }
                }
            ]
        }
    }
];
