
import { Template } from "./types";

export const sportsTemplates: Template[] = [
    {
        id: "sports-crossfit",
        name: "CrossFit Box",
        category: "sports",
        description: "Intense fitness gym template",
        data: {
            root: { props: { title: "CrossFit" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-crossfit",
                        logoText: "IronBox",
                        links: [{ label: "WOD", href: "#features" }, { label: "Coaches", href: "#team" }, { label: "Join", href: "#cta" }],
                        ctaText: "Free Class",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Forge Your Elite Fitness",
                        subtitle: "High-intensity functional training for everyone. Join a community that pushes you to be better.",
                        bgImage: "https://images.unsplash.com/photo-1517963879466-e825c15f99fa?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Training",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "500+", label: "Members" },
                            { value: "10+", label: "Classes Daily" },
                            { value: "100%", label: "Results" }
                        ],
                        backgroundColor: "stone-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "The Workout",
                        columns: "3",
                        features: [
                            { title: "Strength", description: "Heavy lifting.", icon: "Activity" },
                            { title: "Metcon", description: "Cardio endurance.", icon: "Zap" },
                            { title: "Community", description: "Train together.", icon: "Users" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "sports-team",
        name: "Sports Team",
        category: "sports",
        description: "Professional sports team template",
        data: {
            root: { props: { title: "Team" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-team",
                        logoText: "CityUnited",
                        links: [{ label: "Schedule", href: "#features" }, { label: "Roster", href: "#hero" }, { label: "Tickets", href: "#cta" }],
                        ctaText: "Buy Tickets",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "We Are United",
                        subtitle: "Experience the passion, the glory, and the game. Support your city's team.",
                        bgImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Season Tickets",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Match Day",
                        columns: "3",
                        features: [
                            { title: "Tickets", description: "Secure your seat.", icon: "Ticket" },
                            { title: "Merch", description: "Wear the colors.", icon: "Shirt" },
                            { title: "Hospitality", description: "VIP experience.", icon: "Star" }
                        ],
                        paddingY: "12",
                        backgroundColor: "blue-950/20"
                    }
                }
            ]
        }
    },
    {
        id: "sports-golf",
        name: "Golf Course",
        category: "sports",
        description: "Elegant golf club template",
        data: {
            root: { props: { title: "Golf" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-golf",
                        logoText: "FairwayClub",
                        links: [{ label: "Course", href: "#hero" }, { label: "Membership", href: "#features" }, { label: "Book Tee Time", href: "#cta" }],
                        ctaText: "Book Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Championship Golf",
                        subtitle: "18 holes of pristine fairways and challenging greens designed by legends.",
                        bgImage: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Book Tee Time",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Club Amenities",
                        columns: "3",
                        features: [
                            { title: "Pro Shop", description: "Top gear.", icon: "ShoppingBag" },
                            { title: "Clubhouse", description: "Dining & Events.", icon: "Coffee" },
                            { title: "Practice Range", description: "Improve game.", icon: "Target" }
                        ],
                        paddingY: "12",
                        backgroundColor: "green-50"
                    }
                }
            ]
        }
    },
    {
        id: "sports-trainer",
        name: "Personal Trainer",
        category: "sports",
        description: "Personal fitness brand template",
        data: {
            root: { props: { title: "Trainer" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-trainer",
                        logoText: "CoachMike",
                        links: [{ label: "Philosophy", href: "#hero" }, { label: "Results", href: "#stats" }, { label: "Training", href: "#cta" }],
                        ctaText: "Start Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Transform Your Body",
                        subtitle: "Customized training and nutrition plans built for your lifestyle and goals.",
                        bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Success Stories",
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
                            { value: "500+", label: "Clients Transformed" },
                            { value: "10", label: "Years Exp" },
                            { value: "NASM", label: "Certified" }
                        ],
                        backgroundColor: "orange-600"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "How It Works",
                        columns: "3",
                        features: [
                            { title: "Assessment", description: "Deep dive.", icon: "Clipboard" },
                            { title: "Plan", description: "Custom routine.", icon: "Activity" },
                            { title: "Check-ins", description: "Accountability.", icon: "MessageCircle" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "sports-marathon",
        name: "Marathon Event",
        category: "sports",
        description: "Race event registration template",
        data: {
            root: { props: { title: "Marathon" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-marathon",
                        logoText: "CityRun",
                        links: [{ label: "Course", href: "#features" }, { label: "Register", href: "#cta" }, { label: "Results", href: "#footer" }],
                        ctaText: "Sign Up",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Run The City",
                        subtitle: "Join 10,000 runners for the annual City Marathon. 5K, 10K, and Full Marathon distances.",
                        bgImage: "https://images.unsplash.com/photo-1552674605-5d28c4e142fd?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Register Now",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Race Details",
                        columns: "3",
                        features: [
                            { title: "Scenic Route", description: "Through the park.", icon: "Map" },
                            { title: "Medals", description: "For all finishers.", icon: "Award" },
                            { title: "After Party", description: "Live music.", icon: "Music" }
                        ],
                        paddingY: "12",
                        backgroundColor: "slate-50"
                    }
                }
            ]
        }
    },
    {
        id: "sports-martial-arts",
        name: "Martial Arts Dojo",
        category: "sports",
        description: "Traditional martial arts template",
        data: {
            root: { props: { title: "Dojo" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-dojo",
                        logoText: "ZenDojo",
                        links: [{ label: "Classes", href: "#features" }, { label: "Instructors", href: "#hero" }, { label: "Join", href: "#cta" }],
                        ctaText: "Free Trial",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Discipline. Respect. Strength.",
                        subtitle: "Learn traditional Karate, Judo, and Jiu-Jitsu from world-class masters.",
                        bgImage: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Schedule",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Programs",
                        columns: "3",
                        features: [
                            { title: "Kids Class", description: "Build confidence.", icon: "Smile" },
                            { title: "Adults", description: "Self defense.", icon: "Shield" },
                            { title: "Competition", description: "Elite team.", icon: "Trophy" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-100"
                    }
                }
            ]
        }
    }
];
