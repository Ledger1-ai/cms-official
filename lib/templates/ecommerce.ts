import { Template } from "./types";

export const ecommerceTemplates: Template[] = [
    {
        id: "ecommerce-product",
        name: "Product Launch",
        category: "ecommerce",
        description: "High-converting product page with modern cyan accents",
        data: {
            root: { props: { title: "Product Launch" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-product",
                        logoText: "ProMax",
                        links: [{ label: "Features", href: "#features-1" }, { label: "Specs", href: "#stats-1" }, { label: "Reviews", href: "#testimonial-1" }],
                        ctaText: "Pre-Order",
                        ctaLink: "#cta-buy",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Introducing the ProMax Headphones",
                        subtitle: "Experience studio-quality sound with 40-hour battery life and active noise cancellation. Engineered for audiophiles.",
                        bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Pre-Order Now - $299",
                        primaryActionUrl: "#",
                        secondaryAction: "Compare Models",
                        secondaryActionUrl: "#",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Why ProMax?",
                        columns: "4",
                        features: [
                            { title: "40hr Battery", description: "All-day listening on a single charge.", icon: "Zap" },
                            { title: "Active ANC", description: "Adaptive noise cancellation.", icon: "Shield" },
                            { title: "Hi-Res Audio", description: "24-bit/96kHz certified.", icon: "Music" },
                            { title: "Quick Charge", description: "10min charge = 5hr play.", icon: "Lightning" }
                        ],
                        backgroundColor: "cyan-950/20",
                        paddingY: "12",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "50K+", label: "Pre-Orders" },
                            { value: "4.9★", label: "Early Reviews" },
                            { value: "40hr", label: "Battery Life" },
                            { value: "#1", label: "Rated Headphones" }
                        ],
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: "The best headphones I've ever owned. The sound quality is unmatched, and they're incredibly comfortable for long sessions.",
                        author: "Marcus Johnson",
                        role: "Music Producer",
                        avatar: "https://i.pravatar.cc/150?u=marcus",
                        marginTop: "8",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-buy",
                        text: "Pre-Order Now",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "scale",
                        url: "#",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false,
                        className: "",
                        marginBottom: "16"
                    }
                }
            ]
        }
    },
    {
        id: "ecommerce-fashion",
        name: "Fashion Store",
        category: "ecommerce",
        description: "Elegant fashion e-commerce with rose gold aesthetics",
        data: {
            root: { props: { title: "Fashion Store" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-fashion",
                        logoText: "LUXE",
                        links: [{ label: "New Arrivals", href: "#hero-1" }, { label: "Shop", href: "#categories-1" }, { label: "About", href: "#heading-1" }],
                        ctaText: "Shop Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Summer Collection 2024",
                        subtitle: "Sustainable luxury fashion crafted with intention. Free shipping on orders over $150.",
                        bgImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Shop New Arrivals",
                        primaryActionUrl: "#",
                        secondaryAction: "Our Story",
                        secondaryActionUrl: "#",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "categories-1",
                        title: "Shop by Category",
                        columns: "4",
                        features: [
                            { title: "Dresses", description: "Effortless elegance.", icon: "Tag" },
                            { title: "Accessories", description: "Complete the look.", icon: "Gift" },
                            { title: "Bags", description: "Carry in style.", icon: "ShoppingCart" },
                            { title: "Jewelry", description: "Timeless pieces.", icon: "Sparkles" }
                        ],
                        backgroundGradient: "from-rose-500 to-orange-500",
                        paddingY: "12",
                    }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "heading-1",
                        title: "Why Choose Us",
                        align: "center",
                        size: "lg",
                        marginTop: "12",
                        marginBottom: "6",
                    }
                },
                {
                    type: "ColumnsBlock",
                    props: {
                        id: "values-1",
                        leftContent: "🌿 Sustainably Sourced - Every piece made with organic and recycled materials",
                        rightContent: "🤝 Ethically Made - Fair wages and safe working conditions guaranteed",
                        marginBottom: "8",
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-fashion",
                        quote: "I've never felt more confident. The quality of the fabrics and the attention to detail is simply unmatched.",
                        author: "Elena Rodriguez",
                        role: "fashion-editor",
                        avatar: "https://i.pravatar.cc/150?u=elena",
                        marginTop: "12",
                        marginBottom: "12",
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing-fashion-vip",
                        columns: "1",
                        cards: [
                            {
                                plan: "VIP Membership",
                                price: "$49",
                                frequency: "/year",
                                description: "Exclusive access to new collections and sales.",
                                features: "Early Access, Free Shipping, Personal Stylist, Member Events",
                                buttonText: "Join VIP",
                                highlightColor: "rose",
                                recommended: "true",
                                badgeText: "Best Value",
                            }
                        ],
                        marginBottom: "16",
                    }
                }
            ]
        }
    },
    {
        id: "ecommerce-coming-soon",
        name: "Coming Soon",
        category: "ecommerce",
        description: "Teaser launch page with email capture",
        data: {
            root: { props: { title: "Coming Soon" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-coming-soon",
                        logoText: "ComingSoon",
                        links: [{ label: "Waitlist", href: "#hero-1" }, { label: "Features", href: "#features-sneak" }],
                        ctaText: "Join Waitlist",
                        ctaLink: "#hero-1",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Something Big is Coming",
                        subtitle: "Be the first to know when we launch. Join the waitlist and get exclusive early access.",
                        bgImage: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Join Waitlist",
                        primaryActionUrl: "#",
                        overlayOpacity: "80",
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
                            { value: "5,000+", label: "Already Joined" },
                            { value: "14", label: "Days to Launch" },
                            { value: "50%", label: "Early Bird Discount" }
                        ],
                    }
                },
                {
                    type: "TextBlock",
                    props: {
                        id: "text-1",
                        content: "We're putting the finishing touches on something that will change how you work. Stay tuned.",
                        align: "center",
                        maxWidth: "2xl",
                        marginTop: "12",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-sneak",
                        title: "",
                        columns: "3",
                        features: [
                            { title: "Fast", description: "Built for speed.", icon: "Zap" },
                            { title: "Smart", description: "AI integrated.", icon: "Cpu" },
                            { title: "Secure", description: "Bank-grade security.", icon: "Lock" }
                        ],
                        marginBottom: "16"
                    }
                }
            ]
        }
    },
    {
        id: "ecommerce-electronics",
        name: "Electronics Store",
        category: "ecommerce",
        description: "Tech gadget store template",
        data: {
            root: { props: { title: "Gadget Store" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-electronics",
                        logoText: "TechHaven",
                        links: [{ label: "Phones", href: "#features" }, { label: "Laptops", href: "#hero" }, { label: "Deals", href: "#cta" }],
                        ctaText: "Cart (0)",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Future Tech is Here",
                        subtitle: "Shop the latest smartphones, laptops, and smart home devices. Best prices guaranteed.",
                        bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Shop Deals",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Trending Categories",
                        columns: "4",
                        features: [
                            { title: "Smartphones", description: "Latest models.", icon: "Smartphone" },
                            { title: "Laptops", description: "Work & Play.", icon: "Monitor" },
                            { title: "Audio", description: "Headphones.", icon: "Headphones" },
                            { title: "Wearables", description: "Smartwatches.", icon: "Watch" }
                        ],
                        paddingY: "12",
                        backgroundColor: "gray-50"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing",
                        columns: "1",
                        cards: [
                            {
                                plan: "TechCare",
                                price: "$9.99",
                                frequency: "/mo",
                                description: "Extended warranty",
                                features: "2 year coverage, Accidental damage, 24/7 Support",
                                buttonText: "Add to Cart",
                                highlightColor: "blue",
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
        id: "ecommerce-home",
        name: "Home Decor",
        category: "ecommerce",
        description: "Cozy home decor store template",
        data: {
            root: { props: { title: "Home Decor" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-home",
                        logoText: "Nest",
                        links: [{ label: "Living", href: "#features" }, { label: "Kitchen", href: "#hero" }, { label: "Sale", href: "#cta" }],
                        ctaText: "Cart (0)",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Make Your Home Beautiful",
                        subtitle: "Handcrafted furniture and decor to elevate your living space.",
                        bgImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Shop Collection",
                        overlayOpacity: "30",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Inspiration",
                        columns: "3",
                        features: [
                            { title: "Minimalist", description: "Clean lines.", icon: "Layout" },
                            { title: "Boho", description: "Natural textures.", icon: "Sun" },
                            { title: "Industrial", description: "Raw materials.", icon: "Tool" }
                        ],
                        paddingY: "12",
                        backgroundColor: "orange-50"
                    }
                }
            ]
        }
    },
    {
        id: "ecommerce-beauty",
        name: "Beauty & Skincare",
        category: "ecommerce",
        description: "Clean beauty brand template",
        data: {
            root: { props: { title: "Beauty" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-beauty",
                        logoText: "Glow",
                        links: [{ label: "Face", href: "#features" }, { label: "Body", href: "#hero" }, { label: "About", href: "#cta" }],
                        ctaText: "Shop All",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Radiant Skin Starts Here",
                        subtitle: "100% Vegan, Cruelty-Free Skincare formulated for results.",
                        bgImage: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Shop Routine",
                        overlayOpacity: "20",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "100%", label: "Natural Ingredients" },
                            { value: "50k+", label: "Happy Customers" },
                            { value: "No", label: "Parabens" }
                        ],
                        backgroundColor: "rose-50"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Bestsellers",
                        columns: "3",
                        features: [
                            { title: "Glow Serum", description: "Vitamin C Boost.", icon: "Sun" },
                            { title: "Night Cream", description: "Deep hydration.", icon: "Moon" },
                            { title: "Clay Mask", description: "Detoxify pores.", icon: "Smile" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "ecommerce-digital",
        name: "Digital Products",
        category: "ecommerce",
        description: "Template for selling digital goods",
        data: {
            root: { props: { title: "Digital Store" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-digital",
                        logoText: "CreatorHub",
                        links: [{ label: "Templates", href: "#features" }, { label: "Courses", href: "#hero" }, { label: "Bundles", href: "#pricing" }],
                        ctaText: "Login",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Assets for Creators",
                        subtitle: "High-quality presets, templates, and courses to level up your creative game.",
                        bgImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Browse Store",
                        overlayOpacity: "70",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Popular Categories",
                        columns: "3",
                        features: [
                            { title: "Lightroom Presets", description: "One-click edits.", icon: "Camera" },
                            { title: "Notion Templates", description: "Organize life.", icon: "Layout" },
                            { title: "Video Luts", description: "Cinematic color.", icon: "Video" }
                        ],
                        paddingY: "12",
                        backgroundColor: "neutral-900"
                    }
                },
                {
                    type: "PricingBlock",
                    props: {
                        id: "pricing",
                        columns: "1",
                        cards: [
                            {
                                plan: "All Access",
                                price: "$99",
                                frequency: "/year",
                                description: "Get everything in the store",
                                features: "Unlimited Downloads, New Monthly Assets, Commercial License",
                                buttonText: "Get Access",
                                highlightColor: "purple",
                                recommended: "false",
                                badgeText: "",
                            }
                        ]
                    }
                }
            ]
        }
    }
];
