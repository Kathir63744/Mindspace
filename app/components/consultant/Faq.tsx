"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionBadge } from "./Services";

// Grouped FAQ Data based on your image
const faqData = [
    {
        category: "General",
        items: [
            {
                q: "What is Mind Space?",
                a: "Mind Space is a premier educational consultancy that bridges the gap between ambitious students and top global universities. We provide end-to-end guidance for admissions, visas, and career planning."
            },
            {
                q: "What is included in a consultation?",
                a: "A consultation includes a full profile evaluation, course and university shortlisting, and a clear roadmap covering finances, visa requirements, and application timelines."
            },
            {
                q: "Where can I study?",
                a: "We have direct partnerships and successful placements in top institutions across the UK, USA, Canada, Australia, Germany, and several other European countries."
            },
            {
                q: "Which courses are right for me?",
                a: "Our expert counsellors will assess your academic background, career goals, and budget to recommend the best-fit courses and universities for you."
            }
        ]
    },
    {
        category: "Pricing & Process",
        items: [
            {
                q: "How much do your services cost?",
                a: "Our pricing varies based on the level of service and the country you are applying to. Please contact us for a detailed, transparent pricing structure."
            },
            {
                q: "Are there hidden charges?",
                a: "No. We believe in 100% transparency. All service fees, university application fees, and visa charges are explained upfront before you commit."
            },
            {
                q: "Do you help with scholarships?",
                a: "Yes. We help you identify and apply for merit-based and need-based scholarships to make your global education more affordable."
            },
            {
                q: "What is your visa success rate?",
                a: "We have a 98% visa success rate. Our team meticulously prepares your financial documents, SOPs, and interview prep to ensure a smooth approval."
            }
        ]
    }
];

export default function Faq() {
    // Store the currently open question. Use a unique string key (e.g., "General-0")
    const [openKey, setOpenKey] = useState<string | null>(null);

    const toggleFaq = (key: string) => {
        setOpenKey(openKey === key ? null : key);
    };

    return (
        <section id="faq" className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">

            {/* Ambient Background Glow */}
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2dd4bf]/5 blur-[120px]" />

            <div className="mx-auto max-w-3xl px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16 text-center">
                    <SectionBadge text="FAQ" />
                    <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-base text-white/50">
                        Everything you need to know about our services and the study abroad process.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-12">
                    {faqData.map((group) => (
                        <div key={group.category}>

                            {/* Category Label */}
                            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white/60">
                                {group.category}
                            </h3>

                            {/* Questions in Category */}
                            <div className="flex flex-col gap-3">
                                {group.items.map((item, index) => {
                                    const uniqueKey = `${group.category}-${index}`;
                                    const isOpen = openKey === uniqueKey;

                                    return (
                                        <div
                                            key={uniqueKey}
                                            className={`overflow-hidden rounded-xl border border-transparent transition-colors duration-300 ${isOpen ? "bg-[#1A1A1D] border-white/5" : "bg-[#151517] hover:bg-[#1A1A1D]"
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleFaq(uniqueKey)}
                                                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                            >
                                                <span className={`font-display text-base font-bold transition-colors ${isOpen ? "text-[#2dd4bf]" : "text-white"}`}>
                                                    {item.q}
                                                </span>
                                                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? "rotate-180 text-[#2dd4bf]" : "text-white/40"}`}>
                                                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>

                                            {/* Answer Slide Down */}
                                            <div
                                                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                    }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-white/60">
                                                        {item.a}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-white/40">
                        Still have questions?{" "}
                        <Link
                            href="/contact"
                            className="font-semibold text-[#2dd4bf] underline underline-offset-4 hover:text-[#5eead4]"
                        >
                            Contact our team
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    );
}