import { Template } from "./types";

export const businessTemplates: Template[] = [
    {
        id: "business-corporate",
        name: "Corporate",
        category: "business",
        description: "Professional corporate site with navy blue trust signals",
        data: {
            root: { props: { title: "Corporate" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-corp",
                        logoText: "Nexus",
                        links: [{ label: "Solutions", href: "#services-1" }, { label: "Impact", href: "#stats-1" }, { label: "Clients", href: "#testimonial-corp" }],
                        ctaText: "Get Started",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Enterprise Solutions Built for Scale",
                        subtitle: "Nexus Global delivers enterprise technology consulting and digital transformation services to Fortune 500 companies.",
                        bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Request Consultation",
                        primaryActionUrl: "#",
                        secondaryAction: "View Case Studies",
                        secondaryActionUrl: "#",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[65vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "25+", label: "Years Experience" },
                            { value: "500+", label: "Enterprise Clients" },
                            { value: "40", label: "Countries" },
                            { value: "$5B+", label: "Value Delivered" }
                        ],
                        backgroundColor: "indigo-950/20",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Our Expertise",
                        columns: "3",
                        features: [
                            { title: "Digital Transformation", description: "Modernize your technology stack.", icon: "Rocket" },
                            { title: "Cloud Migration", description: "Secure, scalable cloud solutions.", icon: "Cloud" },
                            { title: "Cybersecurity", description: "Protect your digital assets.", icon: "Lock" },
                            { title: "Data Analytics", description: "Insights that drive decisions.", icon: "TrendingUp" },
                            { title: "AI Integration", description: "Intelligent automation.", icon: "Cpu" },
                            { title: "Strategic Consulting", description: "Expert guidance at every step.", icon: "Compass" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-corp",
                        quote: "A truly transformative partnership.",
                        author: "James Wilson",
                        role: "Director",
                        avatar: "https://i.pravatar.cc/150?u=james",
                        marginTop: "12"
                    }
                }
            ]
        }
    },
    {
        id: "business-consulting",
        name: "Consulting Firm",
        category: "business",
        description: "Professional consulting with emerald success accents",
        data: {
            root: { props: { title: "Consulting Firm" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-consulting",
                        logoText: "Apex",
                        links: [{ label: "Approach", href: "#hero-1" }, { label: "Services", href: "#services-1" }, { label: "Results", href: "#stats-consulting" }],
                        ctaText: "Contact Us",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Strategic Growth Partners",
                        subtitle: "Apex Advisory helps ambitious companies unlock growth through strategy, operations, and organizational transformation.",
                        bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Schedule Discovery Call",
                        secondaryAction: "Our Approach",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "How We Help",
                        columns: "3",
                        features: [
                            { title: "Growth Strategy", description: "Market expansion and revenue acceleration.", icon: "TrendingUp" },
                            { title: "Operations", description: "Efficiency and process optimization.", icon: "Layers" },
                            { title: "M&A Advisory", description: "Due diligence and integration.", icon: "Briefcase" }
                        ],
                        backgroundColor: "emerald-950/20",
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "Apex helped us identify $50M in operational savings and execute a transformation that positioned us for acquisition at 3x our target valuation.",
                        author: "Catherine Wu",
                        role: "Former CEO, TechScale Inc",
                        avatar: "https://i.pravatar.cc/150?u=catherine",
                        marginTop: "8",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-consulting",
                        stats: [
                            { value: "3x", label: "Valuation Growth" },
                            { value: "$50M", label: "Savings" }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: "business-law",
        name: "Law Firm",
        category: "business",
        description: "Trustworthy legal services with classic gold accents",
        data: {
            root: { props: { title: "Law Firm" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-law",
                        logoText: "SterlingLaw",
                        links: [{ label: "Practice Areas", href: "#practice-1" }, { label: "Experience", href: "#stats-1" }, { label: "Contact", href: "#hero-1" }],
                        ctaText: "Consultation",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Excellence in Legal Representation",
                        subtitle: "Sterling & Associates has been protecting the interests of individuals and businesses for over 40 years.",
                        bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Free Consultation",
                        secondaryAction: "Practice Areas",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "practice-1",
                        title: "Practice Areas",
                        columns: "4",
                        features: [
                            { title: "Corporate Law", description: "Business formation and M&A.", icon: "Building" },
                            { title: "Litigation", description: "Trial and dispute resolution.", icon: "Shield" },
                            { title: "Real Estate", description: "Property transactions.", icon: "MapPin" },
                            { title: "Estate Planning", description: "Wills, trusts, and probate.", icon: "Award" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "40+", label: "Years of Experience" },
                            { value: "5,000+", label: "Cases Won" },
                            { value: "98%", label: "Client Satisfaction" },
                            { value: "50", label: "Attorneys" }
                        ],
                        backgroundGradient: "from-orange-500 to-red-600",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-law",
                        quote: "We felt protected and understood throughout the entire process.",
                        author: "Robert Chen",
                        role: "Business Owner",
                        avatar: "https://i.pravatar.cc/150?u=robert",
                        marginTop: "12"
                    }
                }
            ]
        }
    },
    {
        id: "business-realestate",
        name: "Real Estate",
        category: "business",
        description: "Luxury real estate with sophisticated gold tones",
        data: {
            root: { props: { title: "Real Estate" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-realestate",
                        logoText: "PrimeEstate",
                        links: [{ label: "Properties", href: "#hero-1" }, { label: "Services", href: "#services-1" }, { label: "Contact", href: "#testimonial-real" }],
                        ctaText: "Find Home",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Find Your Dream Home",
                        subtitle: "Premier residential and commercial properties in the most sought-after locations. Let us guide you home.",
                        bgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Search Properties",
                        secondaryAction: "List Your Property",
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
                            { value: "$2B+", label: "Properties Sold" },
                            { value: "1,500+", label: "Happy Clients" },
                            { value: "25", label: "Years Experience" },
                            { value: "50+", label: "Agents" }
                        ],
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Our Services",
                        columns: "3",
                        features: [
                            { title: "Buying", description: "Find your perfect property.", icon: "ShoppingCart" },
                            { title: "Selling", description: "Maximize your property's value.", icon: "TrendingUp" },
                            { title: "Rentals", description: "Quality rental properties.", icon: "Building" }
                        ],
                        paddingY: "12",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-real",
                        quote: "Found our dream home in 2 weeks!",
                        author: "Lisa & Tom",
                        role: "New Homeowners",
                        avatar: "https://i.pravatar.cc/150?u=lisa",
                        marginTop: "12"
                    }
                }
            ]
        }
    },
    {
        id: "business-vc",
        name: "Venture Capital",
        category: "business",
        description: "Modern venture capital firm template",
        data: {
            root: { props: { title: "Venture Capital" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-vc",
                        logoText: "CatalystVC",
                        links: [{ label: "Portfolio", href: "#features" }, { label: "Team", href: "#stats" }, { label: "Pitch", href: "#cta" }],
                        ctaText: "Founders",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Backing the Bold",
                        subtitle: "We invest in early-stage founders building the future of enterprise software and AI.",
                        bgImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Portfolio",
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
                            { value: "$500M", label: "AUM" },
                            { value: "45", label: "Portfolio Companies" },
                            { value: "12", label: "IPOs" }
                        ],
                        backgroundColor: "black"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Focus Areas",
                        columns: "3",
                        features: [
                            { title: "SaaS", description: "B2B Software.", icon: "Cloud" },
                            { title: "Fintech", description: "Financial infrastructure.", icon: "DollarSign" },
                            { title: "Deep Tech", description: "AI & Robotics.", icon: "Cpu" }
                        ],
                        paddingY: "12",
                    }
                }
            ]
        }
    },
    {
        id: "business-recruitment",
        name: "Recruitment Agency",
        category: "business",
        description: "Professional recruitment agency template",
        data: {
            root: { props: { title: "Recruitment" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-recruitment",
                        logoText: "TalentScout",
                        links: [{ label: "For Employers", href: "#features" }, { label: "For Candidates", href: "#hero" }, { label: "Jobs", href: "#cta" }],
                        ctaText: "Find Talent",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Connecting Top Talent with Leading Companies",
                        subtitle: "Specialized recruitment for technology, finance, and healthcare sectors.",
                        bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Search Jobs",
                        secondaryAction: "Hire Talent",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Our Expertise",
                        columns: "3",
                        features: [
                            { title: "Executive Search", description: "C-Level placements.", icon: "UserCheck" },
                            { title: "Contract Staffing", description: "Flexible solutions.", icon: "Clock" },
                            { title: "RPO", description: "Outsourced recruiting.", icon: "Users" }
                        ],
                        paddingY: "12",
                        backgroundColor: "blue-50"
                    }
                }
            ]
        }
    },
    {
        id: "business-coworking",
        name: "Coworking Space",
        category: "business",
        description: "Vibrant coworking space template",
        data: {
            root: { props: { title: "Coworking" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-coworking",
                        logoText: "HubSpot",
                        links: [{ label: "Locations", href: "#hero" }, { label: "Amenities", href: "#features" }, { label: "Membership", href: "#pricing" }],
                        ctaText: "Book Tour",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Work Where You Thrive",
                        subtitle: "Flexible workspaces, private offices, and meeting rooms designed for productivity and community.",
                        bgImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Locations",
                        overlayOpacity: "40",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Amenities",
                        columns: "4",
                        features: [
                            { title: "High-Speed WiFi", description: "Gigabit internet.", icon: "Wifi" },
                            { title: "Coffee Bar", description: "Unlimited brew.", icon: "Coffee" },
                            { title: "Meeting Rooms", description: "Tech-enabled.", icon: "Monitor" },
                            { title: "24/7 Access", description: "Secure entry.", icon: "Key" }
                        ],
                        paddingY: "12",
                        backgroundColor: "orange-50"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing",
                        columns: "1",
                        cards: [
                            {
                                plan: "Hot Desk",
                                price: "$199",
                                frequency: "/mo",
                                description: "Flexible seating",
                                features: "24/7 Access, WiFi, Coffee",
                                buttonText: "Join Now",
                                highlightColor: "orange",
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
        id: "business-logistics",
        name: "Logistics Company",
        category: "business",
        description: "Global logistics and supply chain template",
        data: {
            root: { props: { title: "Logistics" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-logistics",
                        logoText: "GlobalLog",
                        links: [{ label: "Services", href: "#features" }, { label: "Track", href: "#hero" }, { label: "Contact", href: "#cta" }],
                        ctaText: "Get Quote",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Moving the World Forward",
                        subtitle: "Seamless global logistics, freight forwarding, and supply chain management solutions.",
                        bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Track Shipment",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Services",
                        columns: "3",
                        features: [
                            { title: "Ocean Freight", description: "Global shipping.", icon: "Anchor" },
                            { title: "Air Cargo", description: "Express delivery.", icon: "Send" },
                            { title: "Warehousing", description: "Storage solutions.", icon: "Package" }
                        ],
                        paddingY: "12",
                        backgroundColor: "sky-50"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "1M+", label: "Shipments" },
                            { value: "200+", label: "Countries" },
                            { value: "99.9%", label: "On-Time" }
                        ],
                        backgroundColor: "sky-900"
                    }
                }
            ]
        }
    }
];
