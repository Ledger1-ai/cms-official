import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
    title: "FAQ - Ledger1CMS",
    description: "Frequently asked questions about Ledger1CMS.",
};

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function FAQPage() {
    const faqs: { question: string; answer: string }[] = [
        // ... (remaining array content)
        // ...
    ];

    return (
        <MarketingLayout>
            <main className="py-20 md:py-32">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center">
                        Frequently Asked <span className="text-purple-400">Questions</span>
                    </h1>
                    <p className="text-xl text-slate-400 text-center mb-16">
                        Everything you need to know about Ledger1CMS.
                    </p>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 bg-white/5 rounded-xl px-4 data-[state=open]:border-purple-500/50 transition-colors">
                                <AccordionTrigger className="text-lg font-medium hover:text-purple-400 hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-400 text-base pb-6 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
        </MarketingLayout>
    );
}
