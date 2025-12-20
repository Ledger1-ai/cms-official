import { Template } from "./types";

export const nonprofitTemplates: Template[] = [
    {
        id: "nonprofit-charity",
        name: "Charity Foundation",
        category: "nonprofit",
        description: "Heartwarming nonprofit landing page focused on donations",
        data: {
            root: { props: { title: "Charity Foundation" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-charity",
                        logoText: "HopeGlobal",
                        links: [{ label: "Mission", href: "#hero-1" }, { label: "Impact", href: "#stats-1" }, { label: "Get Involved", href: "#cta-donate" }],
                        ctaText: "Donate Now",
                        ctaLink: "#cta-donate",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Empowering Communities, Changing Lives",
                        subtitle: "We provide education, clean water, and healthcare to underserved regions around the world. Join us in making a difference.",
                        bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Donate Today",
                        secondaryAction: "Learn More",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "10k+", label: "Families Helped" },
                            { value: "50", label: "Schools Built" },
                            { value: "100%", label: "Direct Impact" }
                        ],
                        backgroundGradient: "from-emerald-600 to-teal-600",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "programs-1",
                        title: "Our Programs",
                        columns: "3",
                        features: [
                            { title: "Education", description: "Providing scholarships.", icon: "Book" },
                            { title: "Clean Water", description: "Building wells.", icon: "Droplet" },
                            { title: "Medical Aid", description: "Mobile clinics.", icon: "Heart" }
                        ],
                        paddingY: "16"
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-donate",
                        text: "Make a Donation",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        marginTop: "8",
                        marginBottom: "16",
                        borderRadius: "full",
                        shadow: "none",
                        fullWidth: false,
                        className: ""
                    }
                }
            ]
        }
    },
    {
        id: "nonprofit-environment",
        name: "Environment",
        category: "nonprofit",
        description: "Green environmental charity template",
        data: {
            root: { props: { title: "Save Earth" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-environment",
                        logoText: "EcoGuard",
                        links: [{ label: "Projects", href: "#features" }, { label: "News", href: "#hero" }, { label: "Donate", href: "#cta" }],
                        ctaText: "Join Us",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Protect Our Planet",
                        subtitle: "Fighting climate change and preserving biodiversity for future generations.",
                        bgImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Take Action",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Our Focus",
                        columns: "3",
                        features: [
                            { title: "Reforestation", description: "Planting trees.", icon: "Sun" },
                            { title: "Ocean Cleanup", description: "Removing plastic.", icon: "Droplet" },
                            { title: "Clean Energy", description: "Solar & wind.", icon: "Zap" }
                        ],
                        paddingY: "12",
                        backgroundColor: "green-50"
                    }
                }
            ]
        }
    },
    {
        id: "nonprofit-animal",
        name: "Animal Shelter",
        category: "nonprofit",
        description: "Animal rescue and adoption template",
        data: {
            root: { props: { title: "Animal Shelter" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-animal",
                        logoText: "Paws&Claws",
                        links: [{ label: "Adopt", href: "#hero" }, { label: "Volunteer", href: "#features" }, { label: "Donate", href: "#cta" }],
                        ctaText: "Adopt Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Find Your Best Friend",
                        subtitle: "Thousands of animals are waiting for a loving home. Adopt, don't shop.",
                        bgImage: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Pets",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "5,000+", label: "Adoptions" },
                            { value: "100%", label: "No Kill" },
                            { value: "500", label: "Volunteers" }
                        ],
                        backgroundColor: "orange-50"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "How to Help",
                        columns: "3",
                        features: [
                            { title: "Adopt", description: "Save a life.", icon: "Heart" },
                            { title: "Foster", description: "Temporary care.", icon: "Home" },
                            { title: "Donate", description: "Support our mission.", icon: "DollarSign" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "nonprofit-religious",
        name: "Religious Org",
        category: "nonprofit",
        description: "Community church or religious organization template",
        data: {
            root: { props: { title: "Community Church" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-religious",
                        logoText: "Grace",
                        links: [{ label: "About", href: "#hero" }, { label: "Ministries", href: "#features" }, { label: "Events", href: "#cta" }],
                        ctaText: "Visit Us",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Welcome Home",
                        subtitle: "A community of faith, hope, and love. Join us for service every Sunday at 10am.",
                        bgImage: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Plan Your Visit",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Ministries",
                        columns: "3",
                        features: [
                            { title: "Kids", description: "Fun learning.", icon: "Smile" },
                            { title: "Youth", description: "Teens & students.", icon: "Users" },
                            { title: "Outreach", description: "Serving others.", icon: "Heart" }
                        ],
                        paddingY: "12",
                        backgroundColor: "sky-50"
                    }
                }
            ]
        }
    }
];
