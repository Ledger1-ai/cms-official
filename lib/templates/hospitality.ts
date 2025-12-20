
import { Template } from "./types";

export const hospitalityTemplates: Template[] = [
    {
        id: "hosp-boutique",
        name: "Boutique Hotel",
        category: "hospitality",
        description: "Stylish boutique hotel template",
        data: {
            root: { props: { title: "Boutique Hotel" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-boutique",
                        logoText: "TheVogue",
                        links: [{ label: "Rooms", href: "#features" }, { label: "Dining", href: "#text" }, { label: "Events", href: "#cta" }],
                        ctaText: "Book Stay",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Artistry in Hospitality",
                        subtitle: "A design-led hotel in the heart of the city's most vibrant district.",
                        bgImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Check Availability",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Experience",
                        columns: "3",
                        features: [
                            { title: "Rooftop Bar", description: "Panoramic views.", icon: "Martini" },
                            { title: "Art Gallery", description: "Local artists.", icon: "Image" },
                            { title: "Spa", description: "Urban retreat.", icon: "Moon" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-50"
                    }
                }
            ]
        }
    },
    {
        id: "hosp-resort",
        name: "Beach Resort",
        category: "hospitality",
        description: "Relaxing beach resort template",
        data: {
            root: { props: { title: "Resort" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-resort",
                        logoText: "BlueLagoon",
                        links: [{ label: "Villas", href: "#features" }, { label: "Activities", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Reserve",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Paradise Found",
                        subtitle: "Crystal clear waters, white sand beaches, and infinite relaxation.",
                        bgImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Explore Villas",
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
                            { value: "5", label: "Restaurants" },
                            { value: "3", label: "Infinity Pools" },
                            { value: "Private", label: "Beach Access" }
                        ],
                        backgroundGradient: "from-cyan-500 to-blue-500"
                    }
                }
            ]
        }
    },
    {
        id: "hosp-bnb",
        name: "Bed & Breakfast",
        category: "hospitality",
        description: "Cozy B&B template",
        data: {
            root: { props: { title: "B&B" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-bnb",
                        logoText: "RoseCottage",
                        links: [{ label: "Rooms", href: "#features" }, { label: "Breakfast", href: "#hero" }, { label: "Location", href: "#cta" }],
                        ctaText: "Book Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Your Home Away From Home",
                        subtitle: "Charming rooms and homemade breakfast in a historic countryside setting.",
                        bgImage: "https://images.unsplash.com/photo-1522771753018-b80e1ddcdcc3?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Rooms",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Amenities",
                        columns: "3",
                        features: [
                            { title: "Farm Breakfast", description: "Fresh ingredients.", icon: "Coffee" },
                            { title: "Garden", description: "Peaceful relaxation.", icon: "Sun" },
                            { title: "WiFi", description: "Stay connected.", icon: "Wifi" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "hosp-venue",
        name: "Event Venue",
        category: "hospitality",
        description: "Elegant wedding and event venue template",
        data: {
            root: { props: { title: "Venue" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-venue",
                        logoText: "GrandHall",
                        links: [{ label: "Weddings", href: "#features" }, { label: "Corporate", href: "#hero" }, { label: "Gallery", href: "#cta" }],
                        ctaText: "Inquire",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Unforgettable Moments",
                        subtitle: "The perfect setting for weddings, galas, and corporate events.",
                        bgImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Download Brochure",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "500", label: "Guest Capacity" },
                            { value: "3", label: "Ballrooms" },
                            { value: "100%", label: "Customizable" }
                        ],
                        backgroundColor: "fuchsia-950/20"
                    }
                }
            ]
        }
    },
    {
        id: "hosp-club",
        name: "Nightclub",
        category: "hospitality",
        description: "High-energy nightclub template",
        data: {
            root: { props: { title: "Club" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-club",
                        logoText: "PULSE",
                        links: [{ label: "Events", href: "#features" }, { label: "VIP", href: "#hero" }, { label: "Gallery", href: "#cta" }],
                        ctaText: "Guestlist",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Own the Night",
                        subtitle: "World-class DJs, immersive sound, and exclusive VIP experiences.",
                        bgImage: "https://images.unsplash.com/photo-1566415103948-e35658e42776?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Book Table",
                        overlayOpacity: "70",
                        align: "center",
                        minHeight: "screen",
                        overlayGradient: "to-b"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "The Experience",
                        columns: "3",
                        features: [
                            { title: "Main Stage", description: "Top tier talent.", icon: "Speaker" },
                            { title: "VIP Lounge", description: "Exclusive access.", icon: "Star" },
                            { title: "Cocktails", description: "Craft mixology.", icon: "Martini" }
                        ],
                        paddingY: "12",
                        backgroundColor: "black"
                    }
                }
            ]
        }
    },
    {
        id: "hosp-casino",
        name: "Casino & Hotel",
        category: "hospitality",
        description: "Luxurious casino resort template",
        data: {
            root: { props: { title: "Casino" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-casino",
                        logoText: "Royale",
                        links: [{ label: "Casino", href: "#features" }, { label: "Hotel", href: "#hero" }, { label: "Rewards", href: "#cta" }],
                        ctaText: "Play Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Play in Style",
                        subtitle: "Experience the thrill of high-stakes gaming and 5-star luxury.",
                        bgImage: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Casino Floor",
                        secondaryAction: "Book Suite",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Gaming Options",
                        columns: "4",
                        features: [
                            { title: "Slots", description: "1000+ Machines.", icon: "Zap" },
                            { title: "Poker", description: "Daily Tournaments.", icon: "Users" },
                            { title: "Blackjack", description: "High Limits.", icon: "Layers" },
                            { title: "Roulette", description: "Live Dealers.", icon: "Disc" }
                        ],
                        paddingY: "12",
                        backgroundColor: "red-950/20"
                    }
                }
            ]
        }
    }
];
