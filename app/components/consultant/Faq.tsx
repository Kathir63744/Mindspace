
"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionBadge } from "./Services";

const faqData = [
    {
        category: "General",
        items: [
            {
                q: "What is Mind Space?",
                a: "Mind Space is a premier educational consultancy that bridges the gap between ambitious students and top global universities. We provide end-to-end guidance for admissions, visas, and career planning.",
            },
            {
                q: "What is included in a consultation?",
                a: "A consultation includes a full profile evaluation, course and university shortlisting, and a clear roadmap covering finances, visa requirements, and application timelines.",
            },
            {
                q: "Where can I study?",
                a: "We have direct partnerships and successful placements in top institutions across the UK, USA, Canada, Australia, Germany, and several other European countries.",
            },
            {
                q: "Which courses are right for me?",
                a: "Our expert counsellors assess your academic background, career goals, and budget to recommend suitable courses and universities.",
            },
        ],
    },
    {
        category: "Pricing & Process",
        items: [
            {
                q: "How much do your services cost?",
                a: "Our pricing varies based on the level of service and the country you are applying to. Contact us for a detailed, transparent pricing structure.",
            },
            {
                q: "Are there hidden charges?",
                a: "No. We believe in transparency. All service fees, university application fees, and visa charges are explained upfront before you commit.",
            },
            {
                q: "Do you help with scholarships?",
                a: "Yes. We help you identify and apply for merit-based and need-based scholarships to make your global education more affordable.",
            },
            {
                q: "What is your visa success rate?",
                a: "Our published information states a 98% visa success rate. Individual outcomes depend on eligibility, documentation, and the visa authority's decision.",
            },
        ],
    },
];

const allQuestions = faqData.flatMap((group) =>
    group.items.map((item) => ({
        ...item,
        category: group.category,
    }))
);

export default function Faq() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeQuestion = allQuestions[activeIndex];

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-[#080B12] px-5 py-24 text-[#F5F7FB] sm:px-8 lg:px-12 lg:py-32"
        >
            {/* Background detail */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/[0.07] blur-[140px]"
            />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <div className="mx-autmb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                Frequently Asked Ques
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>

                        <h2 className="mt-8 text-5xl font-medium leading-[1.04] tracking-[-0.065em] sm:text-6xl lg:text-[88px]">
                            The details
                            <br />
                            <span className="text-[#7F8BA0]">
                                that matter<span className="text-[#2F7BFF]">.</span>
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-xs pb-2">
                        <p className="text-sm leading-7 text-[#929EAF] sm:text-base">
                            Every big decision comes with questions. Here are
                            some answers to help you move forward with clarity.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#2F7BFF]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                Find your clarity
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    {/* Question navigator */}
                    <div>
                        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]">
                                Browse questions
                            </span>
                            <span className="text-xs tabular-nums text-[#778397]">
                                0{allQuestions.length} topics
                            </span>
                        </div>

                        {faqData.map((group, groupIndex) => {
                            const groupStart = faqData
                                .slice(0, groupIndex)
                                .reduce((sum, item) => sum + item.items.length, 0);

                            return (
                                <div key={group.category} className="mb-10">
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2F7BFF]">
                                            0{groupIndex + 1}
                                        </span>
                                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#778397]">
                                            {group.category}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        {group.items.map((item, itemIndex) => {
                                            const index = groupStart + itemIndex;
                                            const isActive = activeIndex === index;

                                            return (
                                                <button
                                                    key={item.q}
                                                    type="button"
                                                    onClick={() => setActiveIndex(index)}
                                                    aria-pressed={isActive}
                                                    className={`group flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-all duration-300 sm:px-5 ${isActive
                                                        ? "bg-[#111B2D]"
                                                        : "hover:bg-white/[0.035]"
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-6 shrink-0 text-[10px] tabular-nums transition-colors ${isActive
                                                            ? "text-[#2F7BFF]"
                                                            : "text-[#596579]"
                                                            }`}
                                                    >
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                    <span
                                                        className={`flex-1 text-sm leading-6 transition-colors sm:text-[15px] ${isActive
                                                            ? "font-medium text-white"
                                                            : "text-[#929EAF] group-hover:text-white"
                                                            }`}
                                                    >
                                                        {item.q}
                                                    </span>

                                                    <span
                                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isActive
                                                            ? "rotate-45 border-[#2F7BFF] bg-[#2F7BFF] text-white"
                                                            : "border-white/10 text-[#778397] group-hover:border-white/30"
                                                            }`}
                                                    >
                                                        <svg
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            className="h-3.5 w-3.5"
                                                        >
                                                            <path
                                                                d="M8 3V13M3 8H13"
                                                                stroke="currentColor"
                                                                strokeWidth="1.4"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Answer display */}
                    <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0D121D] p-7 sm:p-10 lg:p-12">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[#2F7BFF]/10"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-4 -top-8 h-48 w-48 rounded-full border border-[#2F7BFF]/10"
                        />

                        <div className="relative">
                            <div className="mb-16 flex items-center justify-between">
                                <span className="rounded-full border border-[#2F7BFF]/25 bg-[#2F7BFF]/[0.08] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                    {activeQuestion.category}
                                </span>

                                <span className="text-sm tabular-nums text-[#596579]">
                                    {String(activeIndex + 1).padStart(2, "0")}
                                    <span className="mx-2 text-[#2F7BFF]">/</span>
                                    {String(allQuestions.length).padStart(2, "0")}
                                </span>
                            </div>

                            <div key={activeIndex}>
                                <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2F7BFF]">
                                    Your question
                                </span>

                                <h3 className="max-w-xl text-3xl font-medium leading-[1.15] tracking-[-0.045em] sm:text-4xl lg:text-[48px]">
                                    {activeQuestion.q}
                                </h3>

                                <div className="my-9 h-px w-full bg-white/[0.08]" />

                                <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]">
                                    The answer
                                </span>

                                <p className="max-w-xl text-base leading-8 text-[#A2AAB8] sm:text-lg sm:leading-9">
                                    {activeQuestion.a}
                                </p>
                            </div>
                        </div>

                        <div className="relative mt-14 flex items-center justify-between border-t border-white/[0.08] pt-6">
                            <span className="text-xs text-[#596579]">
                                Need more information?
                            </span>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex(
                                            (activeIndex - 1 + allQuestions.length) %
                                            allQuestions.length
                                        )
                                    }
                                    aria-label="Previous question"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#2F7BFF] hover:bg-[#2F7BFF]"
                                >
                                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                        <path
                                            d="M12.5 4.5L7 10L12.5 15.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex(
                                            (activeIndex + 1) % allQuestions.length
                                        )
                                    }
                                    aria-label="Next question"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#2F7BFF] hover:bg-[#2F7BFF]"
                                >
                                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                        <path
                                            d="M7.5 4.5L13 10L7.5 15.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="relative mt-24 overflow-hidden border-y border-white/10 py-12 sm:py-16">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2F7BFF]">
                                Still figuring things out?
                            </span>

                            <h3 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl">
                                Your journey deserves
                                <span className="text-[#7F8BA0]"> a conversation.</span>
                            </h3>
                        </div>

                        <Link
                            href="/contact"
                            className="group inline-flex w-fit items-center gap-5 rounded-full bg-[#2F7BFF] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1F68E8]"
                        >
                            Talk to our team
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Bottom detail */}
                <div className="mt-7 flex flex-col justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#596579] sm:flex-row">
                    <span>MindSpace / Questions & answers</span>
                    <span>Make your next move with clarity.</span>
                </div>
            </div>
        </section>
    );
}
