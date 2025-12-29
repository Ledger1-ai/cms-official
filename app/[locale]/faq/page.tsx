import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/actions/cms/faq";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import ReactMarkdown from "react-markdown";

export const metadata = {
    title: "FAQ - Basalt CMS",
    description: "Frequently asked questions about Basalt CMS.",
};

export default async function FAQPage() {
    const allFaqs = await getFaqs();
    const faqs = allFaqs.filter(f => f.isVisible);

    return (
        <MarketingLayout>
            <main className="py-20 md:py-32">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center">
                        Frequently Asked <span className="text-purple-400">Questions</span>
                    </h1>
                    <p className="text-xl text-slate-400 text-center mb-16">
                        Everything you need to know about Basalt CMS.
                    </p>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <AccordionItem key={faq.id} value={`item-${index}`} className="border border-white/10 bg-white/5 rounded-xl px-4 data-[state=open]:border-purple-500/50 transition-colors">
                                    <AccordionTrigger className="text-lg font-medium hover:text-purple-400 hover:no-underline py-6 text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 text-base pb-6 leading-relaxed prose prose-invert max-w-none">
                                        <ReactMarkdown>{faq.answer}</ReactMarkdown>
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        ) : (
                            <div className="text-center text-slate-500 py-12">
                                <p>No questions added yet. Check back soon!</p>
                            </div>
                        )}
                    </Accordion>
                </div>
            </main>
        </MarketingLayout>
    );
}
