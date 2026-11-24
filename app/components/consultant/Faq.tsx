
"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionBadge } from "./Services";

const faqData = [
    {
        category: "General",
        items: [
            {
                q: "What does MindSpace do?",
                a: "MindSpace provides technology solutions, professional training, and job placement and career support for businesses and individuals.",
            },
            {
                q: "What technology services do you offer?",
                a: "We offer website development, mobile app development, web application development and custom software development. Each project is scoped around the client's requirements.",
            },
            {
                q: "What professional training do you offer?",
                a: "We offer technical and programming training, practical projects, job readiness training, and corporate and communication training. Contact us for current programme availability.",
            },
            {
                q: "What career support do you provide?",
                a: "We provide career guidance, resume and LinkedIn profile support, interview preparation, job search support, internship assistance and placement assistance.",
            },
            {
                q: "Do you guarantee a job?",
                a: "No. We provide preparation and placement assistance, but hiring decisions are made by employers.",
            },
            {
                q: "Is placement assistance included with training?",
                a: "Placement assistance depends on the programme or service selected. We explain what is included before enrolment.",
            },
        ],
    },
    {
        category: "Pricing & Process",
        items: [
            {
                q: "How much do your services cost?",
                a: "Fees depend on the project, programme or support required. We explain the scope and applicable fees before you proceed.",
            },
            {
                q: "How do I get started?",
                a: "Select the service you need on our Contact page and tell us briefly about your requirements. Our team will explain the next steps.",
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
            className="relative overflow-hidden bg-[#080B12] px-5 py-24 text-[#F5F7FB] sm:px-8 lg:px-12 lg:py-32 font-questrial"
        >
            {/* Background detail */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/[0.09] blur-[140px]"
            />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <div className="mx-auto mb-4 flex max-w-7xl items-center gap-3 px-6">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C5D9FF]">
                                Frequently Asked Questions
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/20" />
                        </div>

                        <h2 className="mt-8 text-[clamp(38px,6.4vw,72px)] font-[600] leading-[0.94] tracking-[-0.055em] max-sm:text-[clamp(36px,11vw,58px)]">
                            The details
                            <br />
                            <span className="text-[#B3BDCD]">
                                that matter<span className="text-[#2F7BFF]">.</span>
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-xs pb-2">
                        <p className="text-[clamp(15px,1.15vw,16px)] leading-[1.9] text-[#C0CAD8]">
                            Every big decision comes with questions. Here are
                            some answers to help you move forward with clarity.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#2F7BFF]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C5D9FF]">
                                Find your clarity
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    {/* Question navigator */}
                    <div>
                        <div className="mb-7 flex items-center justify-between border-b border-white/15 pb-4">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A7B4C7]">
                                Browse questions
                            </span>
                            <span className="text-[13px] tabular-nums text-[#A7B4C7]">
                                {String(allQuestions.length).padStart(2, "0")} topics
                            </span>
                        </div>

                        {faqData.map((group, groupIndex) => {
                            const groupStart = faqData
                                .slice(0, groupIndex)
                                .reduce((sum, item) => sum + item.items.length, 0);

                            return (
                                <div key={group.category} className="mb-10">
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6CA2FF]">
                                            0{groupIndex + 1}
                                        </span>
                                        <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#A7B4C7]">
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
                                                        : "hover:bg-white/[0.045]"
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-6 shrink-0 text-[11px] tabular-nums transition-colors ${isActive
                                                            ? "text-[#6CA2FF]"
                                                            : "text-[#9AA9BE]"
                                                            }`}
                                                    >
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                    <span
                                                        className={`flex-1 text-[15px] leading-6 transition-colors sm:text-[16px] ${isActive
                                                            ? "font-medium text-white"
                                                            : "text-[#C0CAD8] group-hover:text-white"
                                                            }`}
                                                    >
                                                        {item.q}
                                                    </span>

                                                    <span
                                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isActive
                                                            ? "rotate-45 border-[#2F7BFF] bg-[#2F7BFF] text-white"
                                                            : "border-white/20 text-[#A7B4C7] group-hover:border-white/40"
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
                    <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0D121D] p-7 sm:p-10 lg:p-12">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[#2F7BFF]/15"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-4 -top-8 h-48 w-48 rounded-full border border-[#2F7BFF]/15"
                        />

                        <div className="relative">
                            <div className="mb-16 flex items-center justify-between">
                                <span className="rounded-full border border-[#2F7BFF]/30 bg-[#2F7BFF]/[0.10] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5D9FF]">
                                    {activeQuestion.category}
                                </span>

                                <span className="text-[14px] tabular-nums text-[#A7B4C7]">
                                    {String(activeIndex + 1).padStart(2, "0")}
                                    <span className="mx-2 text-[#6CA2FF]">/</span>
                                    {String(allQuestions.length).padStart(2, "0")}
                                </span>
                            </div>

                            <div key={activeIndex}>
                                <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6CA2FF]">
                                    Your question
                                </span>

                                <h3 className="max-w-xl text-[clamp(30px,3.4vw,48px)] font-[600] leading-[1.06] tracking-[-0.045em]">
                                    {activeQuestion.q}
                                </h3>

                                <div className="my-9 h-px w-full bg-white/[0.12]" />

                                <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A7B4C7]">
                                    The answer
                                </span>

                                <p className="max-w-xl text-[clamp(16px,1.2vw,17px)] leading-[1.9] text-[#D0D8E5]">
                                    {activeQuestion.a}
                                </p>
                            </div>
                        </div>

                        <div className="relative mt-14 flex items-center justify-between border-t border-white/[0.12] pt-6">
                            <span className="text-[13px] text-[#A7B4C7]">
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
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#2F7BFF] hover:bg-[#2F7BFF]"
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
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#2F7BFF] hover:bg-[#2F7BFF]"
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

                {/* Bottom detail */}
                <div className="mt-7 flex flex-col justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A7B4C7] sm:flex-row">
                    <span>MindSpace / Questions & answers</span>
                    <span>Make your next move with clarity.</span>
                </div>
            </div>
        </section>
    );
}
