import { Template } from "./types";

export const portfolioTemplates: Template[] = [
    {
        id: "portfolio-developer",
        name: "Developer Portfolio",
        category: "portfolio",
        description: "Clean developer portfolio with blue tech vibes",
        data: {
            root: { props: { title: "Developer Portfolio" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-developer",
                        logoText: "Alex.Dev",
                        links: [{ label: "Skills", href: "#skills-1" }, { label: "Projects", href: "#projects-1" }, { label: "Contact", href: "#cta-1" }],
                        ctaText: "Hire Me",
                        ctaLink: "#cta-1",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Hi, I'm Alex Chen",
                        subtitle: "Full-stack developer passionate about building products that solve real problems. Currently crafting experiences at TechCorp.",
                        bgImage: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Projects",
                        primaryActionUrl: "#",
                        secondaryAction: "Contact Me",
                        secondaryActionUrl: "#",
                        overlayOpacity: "80",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "skills-1",
                        title: "Tech Stack",
                        columns: "4",
                        features: [
                            { title: "React/Next.js", description: "Modern frontend development", icon: "Code" },
                            { title: "Node.js", description: "Scalable backend systems", icon: "Layers" },
                            { title: "PostgreSQL", description: "Database architecture", icon: "Database" },
                            { title: "AWS/GCP", description: "Cloud infrastructure", icon: "Cloud" }
                        ],
                        backgroundColor: "indigo-950/20",
                        paddingY: "12",
                    }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "heading-1",
                        title: "Featured Projects",
                        align: "center",
                        size: "lg",
                        marginTop: "12",
                        marginBottom: "8",
                    }
                },
                {
                    type: "ColumnsBlock",
                    props: {
                        id: "projects-1",
                        leftContent: "🚀 TaskFlow - A project management app used by 10k+ teams. Built with Next.js, Prisma, and PostgreSQL.",
                        rightContent: "📊 DataViz Pro - Real-time analytics dashboard processing 1M+ events/day. React, D3.js, and WebSockets.",
                        marginBottom: "8",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-1",
                        text: "Let's Work Together →",
                        variant: "gradient",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        marginTop: "8",
                        marginBottom: "16",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false
                    }
                }
            ]
        }
    },
    {
        id: "portfolio-photographer",
        name: "Photographer Portfolio",
        category: "portfolio",
        description: "Elegant photography portfolio with minimal aesthetic",
        data: {
            root: { props: { title: "Photography Portfolio" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-photographer",
                        logoText: "Sofia.Photo",
                        links: [{ label: "Gallery", href: "#hero-1" }, { label: "Services", href: "#services-1" }, { label: "Testimonials", href: "#testimonial-1" }],
                        ctaText: "Book Session",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Capturing Moments That Matter",
                        subtitle: "Sofia Martinez • Portrait & Documentary Photographer based in Los Angeles",
                        bgImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Gallery",
                        primaryActionUrl: "#",
                        secondaryAction: "Book a Session",
                        secondaryActionUrl: "#",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "What I Do",
                        columns: "3",
                        features: [
                            { title: "Portraits", description: "Authentic personal & professional portraits.", icon: "Camera" },
                            { title: "Events", description: "Weddings, celebrations, and milestones.", icon: "Heart" },
                            { title: "Commercial", description: "Brand and product photography.", icon: "Package" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "Sofia has an incredible eye for light and emotion. Our family photos are now the most treasured thing we own.",
                        author: "The Williams Family",
                        role: "Portrait Session",
                        avatar: "https://i.pravatar.cc/150?u=williams",
                        marginTop: "8",
                    }
                }
            ]
        }
    },
    {
        id: "portfolio-artist",
        name: "Artist Showcase",
        category: "portfolio",
        description: "Vibrant artist portfolio with creative purple tones",
        data: {
            root: { props: { title: "Artist Showcase" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-artist",
                        logoText: "Riley.Art",
                        links: [{ label: "Collection", href: "#hero-1" }, { label: "About", href: "#stats-1" }, { label: "Works", href: "#heading-1" }],
                        ctaText: "Commission",
                        ctaLink: "#artist-links",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Art That Speaks",
                        subtitle: "Riley Park • Contemporary mixed-media artist exploring identity, nature, and the human experience",
                        bgImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Collection",
                        primaryActionUrl: "#",
                        secondaryAction: "Commission Work",
                        secondaryActionUrl: "#",
                        overlayOpacity: "50",
                        overlayGradient: "to-t",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "200+", label: "Artworks Created" },
                            { value: "15", label: "Solo Exhibitions" },
                            { value: "50+", label: "Collections" },
                            { value: "12", label: "Awards" }
                        ],
                        backgroundGradient: "from-purple-600 to-pink-600",
                    }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "heading-1",
                        title: "Available Works",
                        align: "center",
                        size: "lg",
                        marginTop: "16",
                        marginBottom: "8",
                    }
                },
                {
                    type: "TextBlock",
                    props: {
                        id: "text-1",
                        content: "Original pieces and limited edition prints available for collectors. Each piece comes with a certificate of authenticity and conservation-grade framing options.",
                        align: "center",
                        maxWidth: "3xl",
                        marginBottom: "8",
                    }
                },
                {
                    type: "ColumnsBlock",
                    props: {
                        id: "artist-links",
                        leftContent: "🎨 Commission a custom piece",
                        rightContent: "📦 View shipping information",
                        marginBottom: "16"
                    }
                }
            ]
        }
    },
    {
        id: "portfolio-videographer",
        name: "Videographer",
        category: "portfolio",
        description: "Cinematic videography portfolio template",
        data: {
            root: { props: { title: "Videographer" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-videographer",
                        logoText: "CINEMA",
                        links: [{ label: "Reel", href: "#hero" }, { label: "Projects", href: "#features" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Book Shoot",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Visual Storytelling",
                        subtitle: "Creating cinematic experiences for brands and artists.",
                        bgImage: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Watch Reel",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Projects",
                        columns: "3",
                        features: [
                            { title: "Commercial", description: "Brand campaigns.", icon: "Video" },
                            { title: "Music Video", description: "Artistic visuals.", icon: "Music" },
                            { title: "Documentary", description: "Real stories.", icon: "Film" }
                        ],
                        paddingY: "12",
                        backgroundColor: "black"
                    }
                }
            ]
        }
    },
    {
        id: "portfolio-architect",
        name: "Architect Portfolio",
        category: "portfolio",
        description: "Minimalist architecture portfolio template",
        data: {
            root: { props: { title: "Architect" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-architect",
                        logoText: "ARCH",
                        links: [{ label: "Works", href: "#hero" }, { label: "Philosophy", href: "#text" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Consult",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Form Follows Function",
                        subtitle: "Sustainable, modern architecture for the future of living.",
                        bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Works",
                        overlayOpacity: "30",
                        align: "left",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "50+", label: "Projects" },
                            { value: "International", label: "Awards" },
                            { value: "LEED", label: "Certified" }
                        ],
                        backgroundColor: "stone-50"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Selected Works",
                        columns: "3",
                        features: [
                            { title: "Residential", description: "Modern homes.", icon: "Home" },
                            { title: "Commercial", description: "Office spaces.", icon: "Briefcase" },
                            { title: "Public", description: "Museums & parks.", icon: "Map" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "portfolio-ux",
        name: "UX Designer",
        category: "portfolio",
        description: "Professional UX/UI designer portfolio template",
        data: {
            root: { props: { title: "UX Design" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-ux",
                        logoText: "Design.io",
                        links: [{ label: "Case Studies", href: "#features" }, { label: "Resume", href: "#stats" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Portfolio PDF",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Designing Intuitive Digital Experiences",
                        subtitle: "Product Designer specializing in complex SaaS applications and design systems.",
                        bgImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Read Case Studies",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "My Process",
                        columns: "4",
                        features: [
                            { title: "Research", description: "User interviews.", icon: "Search" },
                            { title: "Wireframe", description: "Low-fi prototypes.", icon: "Layout" },
                            { title: "Design", description: "Visual UI.", icon: "PenTool" },
                            { title: "Test", description: "Usability testing.", icon: "CheckCircle" }
                        ],
                        paddingY: "12",
                        backgroundColor: "slate-50"
                    }
                }
            ]
        }
    },
    {
        id: "portfolio-illustrator",
        name: "Illustrator",
        category: "portfolio",
        description: "Whimsical illustrator portfolio template",
        data: {
            root: { props: { title: "Illustrator" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-illustrator",
                        logoText: "Doodle",
                        links: [{ label: "Portfolio", href: "#features" }, { label: "Store", href: "#hero" }, { label: "Sketchbook", href: "#cta" }],
                        ctaText: "Shop Prints",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Imagination on Paper",
                        subtitle: "Freelance illustrator creating editorial, book, and commercial illustrations.",
                        bgImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Portfolio",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Work Categories",
                        columns: "3",
                        features: [
                            { title: "Children's Books", description: "Storytelling.", icon: "BookOpen" },
                            { title: "Editorial", description: "Magazine spots.", icon: "FileText" },
                            { title: "Patterns", description: "Surface design.", icon: "Grid" }
                        ],
                        paddingY: "12",
                        backgroundColor: "yellow-50"
                    }
                }
            ]
        }
    }
];
