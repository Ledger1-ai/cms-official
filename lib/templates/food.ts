import { Template } from "./types";

export const foodTemplates: Template[] = [
    {
        id: "food-restaurant",
        name: "Fine Dining",
        category: "food",
        description: "Elegant restaurant website with dark appetizing imagery",
        data: {
            root: { props: { title: "Fine Dining" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-restaurant",
                        logoText: "Lumina",
                        links: [{ label: "Menu", href: "#features-1" }, { label: "Reservations", href: "#cta-book" }, { label: "Private Events", href: "#text-1" }],
                        ctaText: "Book Table",
                        ctaLink: "#cta-book",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "A Culinary Journey Through Modern France",
                        subtitle: "Experience the vibrant flavors of seasonal ingredients tailored by Chef Jean-Luc.",
                        bgImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Menu",
                        secondaryAction: "Reservations",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "TextBlock",
                    props: {
                        id: "text-1",
                        content: "We believe in the power of food to bring people together. Every dish tells a story of tradition, innovation, and passion.",
                        align: "center",
                        maxWidth: "2xl",
                        marginTop: "16",
                        marginBottom: "16"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Signature Dishes",
                        columns: "3",
                        features: [
                            { title: "Truffle Risotto", description: "Aged parmesan & black truffle.", icon: "Star" },
                            { title: "Duck Confit", description: "Served with roasted figs.", icon: "Star" },
                            { title: "Choc Soufflé", description: "Valrhona chocolate.", icon: "Star" }
                        ],
                        paddingY: "12",
                        backgroundColor: "stone-950/30"
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-book",
                        text: "Reserve a Table",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
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
        id: "food-coffee",
        name: "Coffee Shop",
        category: "food",
        description: "Cozy coffee shop landing with warm tones",
        data: {
            root: { props: { title: "Coffee Shop" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-coffee",
                        logoText: "Brew&Bean",
                        links: [{ label: "Locations", href: "#stats-1" }, { label: "Menu", href: "#features-1" }, { label: "Shop", href: "#cta-1" }],
                        ctaText: "Order Online",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Roasted with Passion",
                        subtitle: "Small batch, ethically sourced coffee roasted right here in the neighborhood.",
                        bgImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Find a Location",
                        overlayOpacity: "50",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Our Favorites",
                        columns: "3",
                        features: [
                            { title: "Cold Brew", description: "Steeped for 24 hours.", icon: "Coffee" },
                            { title: "Latte Art", description: "Crafted by expert baristas.", icon: "Heart" },
                            { title: "Pastries", description: "Baked fresh daily.", icon: "Sun" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "3", label: "Locations" },
                            { value: "100%", label: "Fair Trade" },
                            { value: "50k", label: "Cups Served" }
                        ],
                        backgroundGradient: "from-orange-900 to-amber-900"
                    }
                }
            ]
        }
    },
    {
        id: "food-bakery",
        name: "Bakery",
        category: "food",
        description: "Artisan bakery template",
        data: {
            root: { props: { title: "Bakery" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-bakery",
                        logoText: "Crumb&Co",
                        links: [{ label: "Bread", href: "#features" }, { label: "Cakes", href: "#hero" }, { label: "Order", href: "#cta" }],
                        ctaText: "Order Online",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Freshly Baked Every Morning",
                        subtitle: "Artisan sourdough, delicate pastries, and custom cakes made with organic ingredients.",
                        bgImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Menu",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Daily Specials",
                        columns: "3",
                        features: [
                            { title: "Sourdough", description: "Fermented 48hrs.", icon: "Disc" },
                            { title: "Croissants", description: "Real butter.", icon: "Moon" },
                            { title: "Coffee", description: "Local roast.", icon: "Coffee" }
                        ],
                        paddingY: "12",
                        backgroundColor: "orange-50"
                    }
                }
            ]
        }
    },
    {
        id: "food-truck",
        name: "Food Truck",
        category: "food",
        description: "Fun food truck template",
        data: {
            root: { props: { title: "Food Truck" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-food-truck",
                        logoText: "TacoStreet",
                        links: [{ label: "Menu", href: "#features" }, { label: "Schedule", href: "#hero" }, { label: "Catering", href: "#cta" }],
                        ctaText: "Find Us",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Street Food Revolution",
                        subtitle: "Authentic flavors roaming the city streets. Follow us to find your next meal.",
                        bgImage: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Schedule",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Popular Items",
                        columns: "3",
                        features: [
                            { title: "Tacos", description: "Carne Asada.", icon: "Star" },
                            { title: "Burritos", description: "Loaded & huge.", icon: "Box" },
                            { title: "Nachos", description: "Shareable.", icon: "Grid" }
                        ],
                        paddingY: "12",
                        backgroundColor: "yellow-50"
                    }
                }
            ]
        }
    },
    {
        id: "food-farm",
        name: "Organic Farm",
        category: "food",
        description: "Farm-to-table organic produce template",
        data: {
            root: { props: { title: "Organic Farm" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-farm",
                        logoText: "SunnyFields",
                        links: [{ label: "Produce", href: "#features" }, { label: "CSA", href: "#stats" }, { label: "Visit", href: "#cta" }],
                        ctaText: "Join CSA",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Straight from the Earth",
                        subtitle: "Certified organic fruits and vegetables grown with sustainable practices.",
                        bgImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Shop Produce",
                        overlayOpacity: "30",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "100%", label: "Organic" },
                            { value: "50+", label: "Crops" },
                            { value: "500", label: "CSA Members" }
                        ],
                        backgroundColor: "green-900"
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "In Season",
                        columns: "3",
                        features: [
                            { title: "Vegetables", description: "Fresh picked.", icon: "Sun" },
                            { title: "Fruits", description: "Sweet & juicy.", icon: "Heart" },
                            { title: "Eggs", description: "Free range.", icon: "Circle" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    }
];
