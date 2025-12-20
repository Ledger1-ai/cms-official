import { Template } from "./types";

export const financeTemplates: Template[] = [
    {
        id: "finance-fintech",
        name: "Fintech App",
        category: "finance",
        description: "Modern fintech startup with green and blue security vibes",
        data: {
            root: { props: { title: "Fintech App" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-fintech",
                        logoText: "PayPulse",
                        links: [{ label: "Features", href: "#features-1" }, { label: "Security", href: "#stats-1" }, { label: "Pricing", href: "#pricing-1" }],
                        ctaText: "Get App",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Banking for the Digital Age",
                        subtitle: "Experience seamless money management with zero fees, instant transfers, and smart budgeting tools.",
                        bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Open Account",
                        secondaryAction: "Learn More",
                        overlayOpacity: "80",
                        align: "center",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "2M+", label: "Users" },
                            { value: "$0", label: "Monthly Fees" },
                            { value: "256-bit", label: "Encryption" },
                            { value: "4.9/5", label: "App Store" }
                        ],
                        backgroundColor: "emerald-950/20",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Smart Money Features",
                        columns: "3",
                        features: [
                            { title: "Instant Transfers", description: "Send money instantly.", icon: "Zap" },
                            { title: "Smart Savings", description: "Auto-roundup spare change.", icon: "TrendingUp" },
                            { title: "Spending Insights", description: "Track where your money goes.", icon: "PieChart" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    },
    {
        id: "finance-investment",
        name: "Investment Firm",
        category: "finance",
        description: "Trustworthy investment landing page with gold and navy",
        data: {
            root: { props: { title: "Investment" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-investment",
                        logoText: "Capital",
                        links: [{ label: "Strategy", href: "#features-1" }, { label: "Performance", href: "#stats-1" }, { label: "Team", href: "#cta-1" }],
                        ctaText: "Client Login",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Wealth Management Redefined",
                        subtitle: "We help high-net-worth individuals preserve and grow their wealth through disciplined, long-term investment strategies.",
                        bgImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Request Prospectus",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "screen",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "$10B+", label: "Assets Under Management" },
                            { value: "15%", label: "Avg Annual Return" },
                            { value: "30", label: "Years Experience" }
                        ],
                        backgroundGradient: "from-slate-900 to-indigo-950",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Our Philosophy",
                        columns: "3",
                        features: [
                            { title: "Global Diversification", description: "Across asset classes.", icon: "Globe" },
                            { title: "Risk Management", description: "Protecting downside.", icon: "Shield" },
                            { title: "Tax Efficiency", description: "Optimizing after-tax returns.", icon: "Briefcase" }
                        ],
                        paddingY: "16"
                    }
                }
            ]
        }
    },
    {
        id: "finance-crypto",
        name: "Crypto Exchange",
        category: "finance",
        description: "Dark mode crypto landing page with neon accents",
        data: {
            root: { props: { title: "Crypto" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-crypto",
                        logoText: "BitFlow",
                        links: [{ label: "Exchange", href: "#hero-1" }, { label: "Markets", href: "#stats-1" }, { label: "Earn", href: "#cta-1" }],
                        ctaText: "Trade Now",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "The World's Fastest Crypto Exchange",
                        subtitle: "Buy, sell, and trade over 200 cryptocurrencies with low fees and institutional-grade security.",
                        bgImage: "https://images.unsplash.com/photo-1621416894512-538542952586?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Start Trading",
                        overlayOpacity: "80",
                        align: "center",
                        overlayGradient: "to-r",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "$50B", label: "Quarterly Volume" },
                            { value: "<0.1%", label: "Trading Fees" },
                            { value: "200+", label: "Coins Listed" }
                        ],
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Advanced Features",
                        columns: "3",
                        features: [
                            { title: "Margin Trading", description: "Up to 100x leverage.", icon: "TrendingUp" },
                            { title: "Staking", description: "Earn up to 12% APY.", icon: "Lock" },
                            { title: "API Access", description: "For algo traders.", icon: "Code" }
                        ],
                        paddingY: "12"
                    }
                }
            ]
        }
    }
];
