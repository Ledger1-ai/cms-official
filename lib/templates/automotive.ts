
import { Template } from "./types";

export const automotiveTemplates: Template[] = [
    {
        id: "auto-dealership",
        name: "Car Dealership",
        category: "automotive",
        description: "Modern car dealership landing page",
        data: {
            root: { props: { title: "Dealership" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-dealership",
                        logoText: "EliteAuto",
                        links: [{ label: "Inventory", href: "#features" }, { label: "Financing", href: "#stats" }, { label: "Service", href: "#cta" }],
                        ctaText: "View Stock",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Drive Your Dream",
                        subtitle: "Premium selection of luxury and performance vehicles. Competitive financing available.",
                        bgImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Search Inventory",
                        secondaryAction: "Value Trade-In",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Browse by Type",
                        columns: "3",
                        features: [
                            { title: "SUVs", description: "Family friendly.", icon: "Truck" },
                            { title: "Sedans", description: "Commuter comfort.", icon: "Wind" },
                            { title: "Sports", description: "Performance.", icon: "Zap" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "500+", label: "Cars in Stock" },
                            { value: "0%", label: "APR Available" },
                            { value: "7 Day", label: "Return Policy" }
                        ],
                        backgroundColor: "slate-900"
                    }
                }
            ]
        }
    },
    {
        id: "auto-repair",
        name: "Auto Repair",
        category: "automotive",
        description: "Trustworthy mechanic shop template",
        data: {
            root: { props: { title: "Auto Repair" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-repair",
                        logoText: "ProFix",
                        links: [{ label: "Services", href: "#features" }, { label: "Reviews", href: "#testimonial" }, { label: "Appointment", href: "#cta" }],
                        ctaText: "Book Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Honest, Reliable Auto Repair",
                        subtitle: "ASE certified technicians. Same day service on most repairs. We treat your car like our own.",
                        bgImage: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Schedule Service",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Our Services",
                        columns: "3",
                        features: [
                            { title: "Diagnostics", description: "Check engine light?", icon: "Activity" },
                            { title: "Brakes", description: "Safe stopping.", icon: "Disc" },
                            { title: "Oil Change", description: "Quick maintenance.", icon: "Droplet" }
                        ],
                        paddingY: "12",
                        backgroundColor: "slate-100"
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial",
                        quote: "Finally a mechanic I can trust. They showed me exactly what was wrong and fixed it for a fair price.",
                        author: "Mike T.",
                        role: "Customer",
                        avatar: "https://i.pravatar.cc/150?u=mike",
                    }
                }
            ]
        }
    },
    {
        id: "auto-rental",
        name: "Car Rental",
        category: "automotive",
        description: "Sleek car rental booking template",
        data: {
            root: { props: { title: "Rental" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-rental",
                        logoText: "GoRental",
                        links: [{ label: "Fleet", href: "#features" }, { label: "Locations", href: "#map" }, { label: "Deals", href: "#cta" }],
                        ctaText: "Rent Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Rent the Perfect Ride",
                        subtitle: "From economy to luxury, find the perfect vehicle for your trip.",
                        bgImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Find a Car",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Why Rent With Us",
                        columns: "3",
                        features: [
                            { title: "Unlimited Miles", description: "Drive as far as you want.", icon: "Map" },
                            { title: "24/7 Assistance", description: "We're here to help.", icon: "Phone" },
                            { title: "New Fleet", description: "Latest models.", icon: "Star" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "auto-detailing",
        name: "Auto Detailing",
        category: "automotive",
        description: "Premium car detailing service template",
        data: {
            root: { props: { title: "Detailing" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-detailing",
                        logoText: "Pristine",
                        links: [{ label: "Packages", href: "#pricing" }, { label: "Gallery", href: "#gallery" }, { label: "Book", href: "#cta" }],
                        ctaText: "Book Detail",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Showroom Shine, Every Time",
                        subtitle: "Mobile auto detailing service. We come to your home or office.",
                        bgImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "View Packages",
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
                            { title: "Ceramic Coating", description: "Long term protection.", icon: "Shield" },
                            { title: "Interior Deep Clean", description: "Steam cleaning.", icon: "Sparkles" },
                            { title: "Paint Correction", description: "Remove scratches.", icon: "Sun" }
                        ],
                        paddingY: "12",
                        backgroundColor: "sky-50"
                    }
                }
            ]
        }
    },
    {
        id: "auto-parts",
        name: "Auto Parts",
        category: "automotive",
        description: "E-commerce style auto parts template",
        data: {
            root: { props: { title: "Auto Parts" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-parts",
                        logoText: "PartsPro",
                        links: [{ label: "Shop", href: "#features" }, { label: "Brands", href: "#brands" }, { label: "Support", href: "#cta" }],
                        ctaText: "Cart (0)",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Quality Parts for Every Make",
                        subtitle: "OEM and aftermarket parts at unbeatable prices. Fast shipping nationwide.",
                        bgImage: "https://images.unsplash.com/photo-1486262715619-01b8c2297605?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Shop Now",
                        overlayOpacity: "70",
                        align: "left",
                        minHeight: "[60vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features",
                        title: "Categories",
                        columns: "4",
                        features: [
                            { title: "Engine", description: "Filters, plugs, belts.", icon: "Settings" },
                            { title: "Brakes", description: "Pads, rotors, calipers.", icon: "Disc" },
                            { title: "Suspension", description: "Shocks, struts.", icon: "Activity" },
                            { title: "Interior", description: "Mats, covers.", icon: "Grid" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "auto-logistics",
        name: "Transport Logistics",
        category: "automotive",
        description: "Corporate logistics and transport template",
        data: {
            root: { props: { title: "Logistics" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-logistics",
                        logoText: "GlobalTrans",
                        links: [{ label: "Solutions", href: "#features" }, { label: "Network", href: "#map" }, { label: "Quote", href: "#cta" }],
                        ctaText: "Track Shipment",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero",
                        title: "Moving the World Forward",
                        subtitle: "Global freight forwarding and supply chain solutions.",
                        bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Our Solutions",
                        overlayOpacity: "60",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats",
                        stats: [
                            { value: "100+", label: "Countries" },
                            { value: "1M+", label: "Shipments" },
                            { value: "99.9%", label: "On Time" }
                        ],
                        backgroundGradient: "from-blue-900 to-indigo-900"
                    }
                }
            ]
        }
    }
];
