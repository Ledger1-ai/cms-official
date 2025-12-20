import { Template } from "./types";

export const educationTemplates: Template[] = [
    {
        id: "edu-university",
        name: "University Landing",
        category: "education",
        description: "Prestigious university home page with academic design",
        data: {
            root: { props: { title: "University" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-university",
                        logoText: "OxfordState",
                        links: [{ label: "Admissions", href: "#hero-1" }, { label: "Academics", href: "#programs-1" }, { label: "Research", href: "#stats-1" }],
                        ctaText: "Apply Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Shaping the Future Since 1895",
                        subtitle: "A world-class research university dedicated to innovation, leadership, and global impact.",
                        bgImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Explore Admissions",
                        secondaryAction: "Virtual Tour",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "45,000", label: "Students" },
                            { value: "120+", label: "Degree Programs" },
                            { value: "18:1", label: "Student-Faculty Ratio" },
                            { value: "#5", label: "National Ranking" }
                        ],
                        backgroundColor: "indigo-900",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "programs-1",
                        title: "Academic Colleges",
                        columns: "4",
                        features: [
                            { title: "Engineering", description: "Innovating for tomorrow.", icon: "Cpu" },
                            { title: "Business", description: "Developing global leaders.", icon: "Briefcase" },
                            { title: "Arts & Sciences", description: "Foundation of knowledge.", icon: "Book" },
                            { title: "Medicine", description: "Advancing healthcare.", icon: "Heart" }
                        ],
                        paddingY: "16"
                    }
                }
            ]
        }
    },
    {
        id: "edu-course",
        name: "Online Course",
        category: "education",
        description: "Modern landing page for selling online courses",
        data: {
            root: { props: { title: "Online Course" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-course",
                        logoText: "MasterClass.IO",
                        links: [{ label: "Curriculum", href: "#features-1" }, { label: "Instructor", href: "#testimonial-1" }, { label: "Pricing", href: "#pricing-1" }],
                        ctaText: "Start Learning",
                        ctaLink: "#pricing-1",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Become a Full-Stack Developer",
                        subtitle: "The complete guide to modern web development. Go from zero to job-ready in 12 weeks.",
                        bgImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Enroll Now - $99",
                        overlayOpacity: "80",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "What You'll Learn",
                        columns: "3",
                        features: [
                            { title: "React & Next.js", description: "Build interactive UIs.", icon: "Code" },
                            { title: "Node.js API", description: "Backend logic.", icon: "Server" },
                            { title: "Deployment", description: "Go live on Vercel.", icon: "Cloud" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing-1",
                        columns: "1",
                        cards: [
                            {
                                plan: "Lifetime Access",
                                price: "$99",
                                frequency: "",
                                description: "One-time payment",
                                features: "20+ Hours Video, Source Code, Discord Community, Certificate",
                                buttonText: "Enroll Now",
                                highlightColor: "teal",
                                recommended: "true",
                                badgeText: "Best Value",
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: "edu-language",
        name: "Language School",
        category: "education",
        description: "Vibrant language learning school template",
        data: {
            root: { props: { title: "Language School" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-language",
                        logoText: "Lingua",
                        links: [{ label: "Courses", href: "#features" }, { label: "Method", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Free Lesson",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Speak with Confidence",
                        subtitle: "Learn a new language with native speakers. Interactive classes for all levels.",
                        bgImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Find a Class",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Popular Languages",
                        columns: "4",
                        features: [
                            { title: "Spanish", description: "Beginner to advanced.", icon: "MessageCircle" },
                            { title: "French", description: "Business & travel.", icon: "Flag" },
                            { title: "Mandarin", description: "Conversational.", icon: "Globe" },
                            { title: "English", description: "ESL programs.", icon: "Book" }
                        ],
                        paddingY: "12",
                        backgroundColor: "orange-50"
                    }
                }
            ]
        }
    },
    {
        id: "edu-bootcamp",
        name: "Coding Bootcamp",
        category: "education",
        description: "Intensive coding bootcamp template",
        data: {
            root: { props: { title: "Coding Bootcamp" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-bootcamp",
                        logoText: "DevCamp",
                        links: [{ label: "Curriculum", href: "#features" }, { label: "Outcomes", href: "#stats" }, { label: "Apply", href: "#cta" }],
                        ctaText: "Apply Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Launch Your Tech Career",
                        subtitle: "24-week intensive program. Learn to code, build a portfolio, and get hired.",
                        bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Download Syllabus",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "98%", label: "Hiring Rate" },
                            { value: "$85k", label: "Avg Starting Salary" },
                            { value: "1200+", label: "Grads" }
                        ],
                        backgroundColor: "indigo-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "The Stack",
                        columns: "3",
                        features: [
                            { title: "Frontend", description: "React & Tailwind.", icon: "Layout" },
                            { title: "Backend", description: "Node & Python.", icon: "Server" },
                            { title: "Database", description: "SQL & Mongo.", icon: "Database" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "edu-k12",
        name: "K-12 School",
        category: "education",
        description: "Private K-12 school template",
        data: {
            root: { props: { title: "K-12 School" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-k12",
                        logoText: "Greenwood",
                        links: [{ label: "Academics", href: "#features" }, { label: "Admissions", href: "#hero" }, { label: "Athletics", href: "#cta" }],
                        ctaText: "Inquire",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Excellence in Education",
                        subtitle: "Nurturing curiosity and character in students from Kindergarten through 12th Grade.",
                        bgImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Visit Us",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Our Values",
                        columns: "3",
                        features: [
                            { title: "Community", description: "Inclusive environment.", icon: "Users" },
                            { title: "Integrity", description: "Building character.", icon: "Shield" },
                            { title: "Innovation", description: "Future ready.", icon: "Zap" }
                        ],
                        paddingY: "12",
                        backgroundColor: "emerald-50"
                    }
                }
            ]
        }
    }
];
