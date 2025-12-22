import MarketingLayout from "@/components/marketing/MarketingLayout";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
    return (
        <MarketingLayout variant="blue">
            <main className="container mx-auto px-6 py-32">
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
        </MarketingLayout>
    );
}


