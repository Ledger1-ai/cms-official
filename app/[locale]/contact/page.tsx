// Reusing the header and background components
import DemoHeader from "@/components/demo/DemoHeader";
import InteractiveBackground from "@/components/demo/InteractiveBackground";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
            <InteractiveBackground />
            <DemoHeader />

            <main className="container mx-auto px-6 py-32 relative z-10">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Get in Touch</h1>
                        <p className="text-slate-400 text-lg">We&apos;d love to hear from you. Please fill out the form below.</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <ContactForm source="CONTACT_PAGE" />
                    </div>
                </div>
            </main>
        </div>
    );
}


