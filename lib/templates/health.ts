import { Template } from "./types";

export const healthTemplates: Template[] = [
    {
        id: "health-clinic",
        name: "Medical Clinic",
        category: "health",
        description: "Professional medical clinic website with trustworthy blue design",
        data: {
            root: { props: { title: "Medical Clinic" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-clinic",
                        logoText: "MediCare",
                        links: [{ label: "Services", href: "#services-1" }, { label: "Doctors", href: "#doctors-1" }, { label: "Contact", href: "#cta-book" }],
                        ctaText: "Book Appointment",
                        ctaLink: "#cta-book",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Compassionate Care for Your Family",
                        subtitle: "Expert physicians, state-of-the-art facilities, and a patient-first approach. Serving the community for over 20 years.",
                        bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Book Appointment",
                        primaryActionUrl: "#",
                        secondaryAction: "Our Services",
                        secondaryActionUrl: "#",
                        overlayOpacity: "60",
                        align: "left",
                        minHeight: "[70vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Our Medical Services",
                        columns: "4",
                        features: [
                            { title: "Primary Care", description: "Comprehensive health exams.", icon: "Heart" },
                            { title: "Pediatrics", description: "Specialized care for children.", icon: "Sun" },
                            { title: "Cardiology", description: "Heart health experts.", icon: "Activity" },
                            { title: "Urgent Care", description: "Walk-ins welcome.", icon: "Clock" }
                        ],
                        paddingY: "16",
                        backgroundColor: "blue-50/5",
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "20+", label: "Years Experience" },
                            { value: "50+", label: "Specialists" },
                            { value: "10k+", label: "Happy Patients" },
                            { value: "24/7", label: "Emergency Care" }
                        ],
                        backgroundColor: "sky-950/20",
                    }
                },
                {
                    type: "HeadingBlock",
                    props: {
                        id: "doctors-title",
                        title: "Meet Our Specialists",
                        align: "center",
                        size: "lg",
                        marginTop: "16",
                        marginBottom: "8"
                    }
                },
                {
                    type: "ColumnsBlock",
                    props: {
                        id: "doctors-1",
                        leftContent: "👨‍⚕️ --Dr. Sarah Smith--\nChief of Cardiology\n20+ years experience",
                        rightContent: "👩‍⚕️ --Dr. James Wilson--\nHead of Pediatrics\nCompassionate child care",
                        marginBottom: "16"
                    }
                },
                {
                    type: "TestimonialBlock",
                    props: {
                        id: "testimonial-1",
                        quote: " The doctors here genuinely care. They took the time to listen to my concerns and explained everything clearly.",
                        author: "Emily Johnson",
                        role: "Patient",
                        avatar: "https://i.pravatar.cc/150?u=emily",
                    }
                },
                {
                    type: "ButtonBlock",
                    props: {
                        id: "cta-book",
                        text: "Schedule Your Visit",
                        variant: "default",
                        size: "lg",
                        align: "center",
                        hoverEffect: "glow",
                        borderRadius: "full",
                        shadow: "lg",
                        fullWidth: false,
                        className: "",
                        marginBottom: "16",
                        marginTop: "16"
                    }
                }
            ]
        }
    },
    {
        id: "health-dental",
        name: "Dental Studio",
        category: "health",
        description: "Modern dental clinic with clean aesthetic",
        data: {
            root: { props: { title: "Dental Studio" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-dental",
                        logoText: "SmileStudio",
                        links: [{ label: "Treatments", href: "#services-1" }, { label: "Results", href: "#hero-1" }, { label: "FAQ", href: "#faq-1" }],
                        ctaText: "Free Consultation",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Smile with Confidence",
                        subtitle: "Premium cosmetic and restorative dentistry in a relaxing, spa-like environment.",
                        bgImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Book Consultation",
                        overlayOpacity: "50",
                        align: "center",
                        minHeight: "screen",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "services-1",
                        title: "Treatments",
                        columns: "3",
                        features: [
                            { title: "Invisalign", description: "Clear aligners for straight teeth.", icon: "Smile" },
                            { title: "Whitening", description: "Professional laser whitening.", icon: "Sun" },
                            { title: "Implants", description: "Permanent tooth replacement.", icon: "Tool" }
                        ],
                        paddingY: "12"
                    }
                },
                {
                    type: "StatsBlock",
                    props: {
                        id: "stats-1",
                        stats: [
                            { value: "5,000+", label: "Smiles Transformed" },
                            { value: "4.9/5", label: "Google Rating" },
                            { value: "15", label: "Year Warranty" }
                        ],
                    }
                }
            ]
        }
    },
    {
        id: "health-therapy",
        name: "Mental Wellness",
        category: "health",
        description: "Calm and soothing therapy practice website",
        data: {
            root: { props: { title: "Mental Wellness" } },
            content: [
                {
                    type: "HeaderBlock",
                    props: {
                        id: "header-therapy",
                        logoText: "MindfulSpace",
                        links: [{ label: "Approach", href: "#hero-1" }, { label: "Therapists", href: "#doctors-1" }, { label: "Resources", href: "#features-1" }],
                        ctaText: "Get Help",
                        ctaLink: "#",
                        fixed: "true"
                    }
                },
                {
                    type: "HeroBlock",
                    props: {
                        id: "hero-1",
                        title: "Find Space to Breathe",
                        subtitle: "Holistic mental health support tailored to your journey. Licensed therapists, safe space.",
                        bgImage: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1920&q=80",
                        primaryAction: "Find a Therapist",
                        overlayOpacity: "40",
                        align: "center",
                        minHeight: "[65vh]",
                    }
                },
                {
                    type: "FeaturesGridBlock",
                    props: {
                        id: "features-1",
                        title: "Our Approach",
                        columns: "3",
                        features: [
                            { title: "Cognitive Behavioral", description: "Evidence-based therapy.", icon: "Brain" },
                            { title: "Mindfulness", description: "Stay present and grounded.", icon: "Sun" },
                            { title: "Group Therapy", description: "Heal together.", icon: "Users" }
                        ],
                        paddingY: "12",
                        backgroundGradient: "from-teal-50 to-green-50",
                    }
                }
            ]
        }
    }
];
