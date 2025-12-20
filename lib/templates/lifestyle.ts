import { Template } from "./types";

export const lifestyleTemplates: Template[] = [
    {
        id: "lifestyle-yoga",
        name: "Yoga Studio",
        category: "lifestyle",
        description: "Calm yoga studio template with zen imagery",
        data: {
            root: { props: { title: "Yoga Studio" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-yoga",
                        logoText: "ZenSpace",
                        links: [{ label: "Classes", href: "#features-1" }, { label: "Teachers", href: "#text-1" }, { label: "Schedule", href: "#cta-join" }],
                        ctaText: "Join Now",
                        ctaLink: "#cta-join",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Find Your Balance",
                        subtitle: "Vinyasa, Hatha, and Yin yoga for all levels. Connect with your breath and body.",
                        bgImage: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Schedule",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Classes",
                        columns: "3",
                        features: [
                            { title: "Morning Flow", description: "Energize your day.", icon: "Sun" },
                            { title: "Power Yoga", description: "Build strength.", icon: "Activity" },
                            { title: "Meditation", description: "Calm the mind.", icon: "Smile" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-50"
                    }
                }
            ]
        }
    },
    {
        id: "lifestyle-gym",
        name: "Fitness Gym",
        category: "lifestyle",
        description: "High-energy gym landing page with bold typography",
        data: {
            root: { props: { title: "Fitness Gym" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-gym",
                        logoText: "IronClad",
                        links: [{ label: "Facilities", href: "#features-1" }, { label: "Training", href: "#hero-1" }, { label: "Membership", href: "#cta-join" }],
                        ctaText: "Free Pass",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Train Like a Beast",
                        subtitle: "24/7 access, state-of-the-art equipment, and expert trainers to help you crush your goals.",
                        bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Join Now",
                        overlayOpacity: "70",
                        align: "center",
                        overlayGradient: "to-r",
                        primaryActionUrl: "#",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "24/7", label: "Access" },
                            { value: "50+", label: "Classes/Week" },
                            { value: "20", label: "Trainers" }
                        ],
                        backgroundColor: "red-950/20"
                    }
                }
            ]
        }
    },
    {
        id: "lifestyle-spa",
        name: "Day Spa",
        category: "lifestyle",
        description: "Relaxing spa template with soft colors",
        data: {
            root: { props: { title: "Day Spa" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-spa",
                        logoText: "Serenity",
                        links: [{ label: "Treatments", href: "#features-1" }, { label: "Packages", href: "#hero-1" }, { label: "Book", href: "#cta-book" }],
                        ctaText: "Book Appointment",
                        ctaLink: "#cta-book",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Escape to Tranquility",
                        subtitle: "Rejuvenate your mind, body, and soul with our signature massage and facial treatments.",
                        bgImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Menu",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                }
            ]
        }
    },
    {
        id: "lifestyle-barber",
        name: "Barbershop",
        category: "lifestyle",
        description: "Classic barbershop template",
        data: {
            root: { props: { title: "Barbershop" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-barber",
                        logoText: "TheBlade",
                        links: [{ label: "Services", href: "#features" }, { label: "Barbers", href: "#hero" }, { label: "Booking", href: "#cta" }],
                        ctaText: "Book Cut",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Classic Cuts & Shaves",
                        subtitle: "Experience the art of traditional grooming in a modern setting. Walk-ins welcome.",
                        bgImage: "https://images.unsplash.com/photo-1503951914290-93a354cd338c?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Book Online",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Menu",
                        columns: "3",
                        features: [
                            { title: "Haircut", description: "$30 - Includes wash.", icon: "Scissors" },
                            { title: "Hot Shave", description: "$25 - Towel service.", icon: "Smile" },
                            { title: "Beard Trim", description: "$15 - Line up.", icon: "User" }
                        ],
                        paddingY: "12",
                        backgroundColor: "neutral-100"
                    }
                }
            ]
        }
    },
    {
        id: "lifestyle-pilates",
        name: "Pilates Studio",
        category: "lifestyle",
        description: "Elegant pilates studio template",
        data: {
            root: { props: { title: "Pilates Studio" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-pilates",
                        logoText: "CoreForm",
                        links: [{ label: "Classes", href: "#features" }, { label: "Instructors", href: "#hero" }, { label: "New Students", href: "#cta" }],
                        ctaText: "Intro Offer",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Strengthen. Lengthen. Tone.",
                        subtitle: "Reformer and mat pilates classes designed to transform your body and mind.",
                        bgImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "First Class Free",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Classes",
                        columns: "3",
                        features: [
                            { title: "Reformer", description: "Machine based.", icon: "Activity" },
                            { title: "Mat", description: "Floor work.", icon: "Layers" },
                            { title: "Private", description: "1-on-1 coaching.", icon: "User" }
                        ],
                        paddingY: "12",
                        backgroundColor: "rose-50"
                    }
                }
            ]
        }
    },
    {
        id: "lifestyle-tattoo",
        name: "Tattoo Studio",
        category: "lifestyle",
        description: "Edgy tattoo studio template",
        data: {
            root: { props: { title: "Tattoo Studio" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-tattoo",
                        logoText: "INK",
                        links: [{ label: "Artists", href: "#features" }, { label: "Gallery", href: "#hero" }, { label: "Consult", href: "#cta" }],
                        ctaText: "Book Consult",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Art on Skin",
                        subtitle: "Award-winning artists specializing in realism, traditional, and custom designs.",
                        bgImage: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Artists",
                        overlayOpacity: "70",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Styles",
                        columns: "3",
                        features: [
                            { title: "Realism", description: "Photo quality.", icon: "Image" },
                            { title: "Traditional", description: "Bold lines.", icon: "Anchor" },
                            { title: "Fine Line", description: "Delicate detail.", icon: "PenTool" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-900"
                    }
                }
            ]
        }
    },
    {
        id: "lifestyle-nutrition",
        name: "Nutritionist",
        category: "lifestyle",
        description: "Healthy lifestyle and nutrition template",
        data: {
            root: { props: { title: "Nutritionist" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-nutrition",
                        logoText: "Nourish",
                        links: [{ label: "Philosophy", href: "#hero" }, { label: "Programs", href: "#features" }, { label: "Blog", href: "#cta" }],
                        ctaText: "Start Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Eat Well, Live Better",
                        subtitle: "Personalized nutrition coaching to help you reach your health goals without restrictive diets.",
                        bgImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Free Consultation",
                        overlayOpacity: "40",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "500+", label: "Clients" },
                            { value: "100%", label: "Personalized" },
                            { value: "Science", label: "Based Approach" }
                        ],
                        backgroundColor: "green-50"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Programs",
                        columns: "3",
                        features: [
                            { title: "Weight Loss", description: "Sustainable results.", icon: "TrendingDown" },
                            { title: "Performance", description: "Fuel for athletes.", icon: "Zap" },
                            { title: "Wellness", description: "Gut health & energy.", icon: "Heart" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    }
];
