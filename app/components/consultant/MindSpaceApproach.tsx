"use client";

import { useState } from "react";

const approaches = {
    technology: {
        number: "01",
        label: "Technology solutions",
        heading: "From an idea to a working digital product.",
        description:
            "Every development project starts with understanding the problem a business needs to solve. The solution is then planned, designed and developed around that requirement.",
        steps: [
            {
                number: "01",
                title: "Understand the requirement",
                description:
                    "Identify the business objective, users, features and technical requirements of the project.",
            },
            {
                number: "02",
                title: "Plan, design and develop",
                description:
                    "Define the solution, create the experience and build the website, application or software around the agreed scope.",
            },
            {
                number: "03",
                title: "Test and deliver",
                description:
                    "Review functionality, resolve issues and hand over the completed solution with the agreed support arrangements.",
            },
        ],
        outcome:
            "A digital solution designed around a real business or user requirement.",
        footer: "For businesses, startups and organisations",
    },

    training: {
        number: "02",
        label: "Training & certification",
        heading: "Learning that moves beyond the classroom.",
        description:
            "Training should connect concepts with practical ability. Our approach focuses on structured learning, guided practice and opportunities to demonstrate what has been learned.",
        steps: [
            {
                number: "01",
                title: "Identify learning goals",
                description:
                    "Understand the learner's current level, interests and the skills they want to develop.",
            },
            {
                number: "02",
                title: "Learn through practice",
                description:
                    "Follow a structured programme supported by technical exercises, practical tasks and projects.",
            },
            {
                number: "03",
                title: "Review and recognise progress",
                description:
                    "Evaluate completed learning activities and provide programme completion certificates where applicable.",
            },
        ],
        outcome:
            "Practical knowledge, demonstrated learning and recognised programme completion where offered.",
        footer: "For students, graduates and professionals",
    },

    careers: {
        number: "04",
        label: "Careers & placements",
        heading: "Connect professional preparation with opportunity.",
        description:
            "Career support should help candidates understand their strengths, present their skills and prepare for relevant employment opportunities.",
        steps: [
            {
                number: "01",
                title: "Understand career direction",
                description:
                    "Review education, existing skills, experience and the roles a candidate wants to pursue.",
            },
            {
                number: "02",
                title: "Prepare for the workplace",
                description:
                    "Support resume development, interview preparation, professional skills and practical readiness.",
            },
            {
                number: "03",
                title: "Explore relevant opportunities",
                description:
                    "Connect candidates with suitable job or internship opportunities where available and provide placement assistance.",
            },
        ],
        outcome:
            "Better career preparation and access to relevant opportunities, without promising guaranteed employment.",
        footer: "For graduates, job seekers and professionals",
    },
} as const;

type ApproachKey = keyof typeof approaches;

const tabs: { key: ApproachKey; label: string }[] = [
    { key: "technology", label: "Technology" },
    { key: "training", label: "Training" },
    { key: "careers", label: "Careers & Placements" },
];

export default function MindSpaceApproach() {
    const [activeKey, setActiveKey] =
        useState<ApproachKey>("technology");

    const active = approaches[activeKey];

    return (
        <section
            id="mindspace-approach"
            className="relative overflow-hidden bg-[#0B101A] py-24 font-questrial text-[#F5F7FB] sm:py-32 lg:py-36"
        >
            <div className="pointer-events-none absolute -right-48 top-10 h-[400px] w-[400px] rounded-full bg-[#2F7BFF]/[0.06] blur-[130px]" />

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">

                {/* Top eyebrow — matches About / MindSpaceEcosystem */}
                <div className="flex justify-between items-center gap-4 mb-[clamp(24px,3.4vw,44px)] max-sm:items-start">
                    <div className="flex max-w-7xl items-center gap-3">
                        <span className="h-px w-8 bg-[#2F7BFF]" />
                        <span className="font-questrial text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                            MindSpace / Our approaches
                        </span>
                        <span className="h-px max-w-20 flex-1 bg-white/10" />
                    </div>
                    <span className="font-questrial text-white/90 text-[10px] tracking-[0.08em] uppercase max-sm:max-w-[100px] max-sm:text-right max-sm:leading-relaxed">
                        Three paths. One plan.
                    </span>
                </div>

                {/* Hero text — two-line flush-left headline + paragraph, matches About */}
                <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,72px)] mb-[clamp(24px,3.4vw,44px)] md:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
                    {/* LEFT — headline, two lines, blue italic accent on line 2 */}
                    <h2
                        className="m-0 w-full font-questrial text-[clamp(38px,6.4vw,72px)] leading-[0.94] tracking-[-0.055em] font-[600] max-sm:text-[clamp(36px,11vw,58px)]"
                    >
                        <span className="block overflow-hidden pb-[0.10em]">
                            <span className="inline-block">
                                Different challenges.
                            </span>
                        </span>
                        <span className="block overflow-hidden pb-[0.10em]">
                            <span className="inline-block text-[#80ADFF] italic font-medium">
                                A considered way forward.
                            </span>
                        </span>
                    </h2>

                    {/* RIGHT — description paragraph matching About */}
                    <div className="max-w-[520px] pb-2 md:justify-self-end">
                        <span className="font-questrial text-[10px] font-[650] uppercase tracking-[0.18em] text-[#A9C7FF]">
                            One platform. Three paths.
                        </span>
                        <p className="mt-[17px] font-questrial text-white/90 text-[clamp(15px,1.25vw,18px)] leading-[1.85]">
                            Every technology project, training goal and career
                            plan needs a different approach. Choose a service
                            to see how we work.
                        </p>
                        <a
                            className="group mt-5 inline-flex items-center gap-3 pb-1.5 font-questrial text-[#F5F7FB] no-underline border-b border-[#2F7BFF] text-[13px] font-[650] tracking-[0.04em] transition-all duration-300 hover:gap-4 hover:text-[#A9C7FF]"
                            href="#contact"
                        >
                            Talk to our team
                            <span className="text-[#80ADFF] text-base" aria-hidden="true">
                                ↗
                            </span>
                        </a>
                    </div>
                </div>

                {/* Division selector */}
                <div className="mt-10 border-b border-white/10">
                    <div
                        role="group"
                        aria-label="Select a MindSpace service division"
                        className="flex flex-wrap gap-x-7 gap-y-2 sm:gap-x-10"
                    >
                        {tabs.map((tab) => {
                            const selected = activeKey === tab.key;

                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => setActiveKey(tab.key)}
                                    className={`group relative py-4 text-left font-questrial text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${selected
                                        ? "text-white"
                                        : "text-white/40 hover:text-white/80"
                                        }`}
                                >
                                    {tab.label}

                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] bg-[#2F7BFF] transition-all duration-300 ${selected ? "w-full" : "w-0"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Service blueprint */}
                <div
                    id="approach-blueprint"
                    className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16"
                >
                    {/* Left: selected division */}
                    <div className="relative lg:col-span-5">
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-2 -top-12 select-none font-mono text-[clamp(8rem,18vw,14rem)] font-medium leading-none tracking-[-0.1em] text-white/[0.025]"
                        >
                            {active.number}
                        </span>

                        <div className="relative">
                            <div className="mb-7 flex items-center gap-3">
                                <span className="font-mono text-[11px] text-[#2F7BFF]">
                                    / {active.number}
                                </span>

                                <span className="h-px w-8 bg-[#2F7BFF]/60" />

                                <span className="font-questrial text-[11px] uppercase tracking-[0.2em] text-white/40">
                                    Selected division
                                </span>
                            </div>

                            <p className="mb-5 font-questrial text-[12px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                {active.label}
                            </p>

                            <h3
                                className="max-w-[490px] font-questrial text-[clamp(2rem,4vw,3.7rem)] font-medium leading-[1.04] tracking-[-0.06em]"
                                aria-live="polite"
                            >
                                {active.heading}
                            </h3>

                            <p className="mt-7 max-w-[440px] font-questrial text-[18px] leading-[1.95] text-white/80">
                                {active.description}
                            </p>

                            <div className="mt-12 border-t border-white/10 pt-6">
                                <span className="font-questrial text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                                    Who this is for
                                </span>

                                <p className="mt-3 font-questrial text-[15px] text-white/75">
                                    {active.footer}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: tailored delivery stages */}
                    <div className="relative lg:col-span-7">
                        <div className="mb-8 flex items-center justify-between">
                            <span className="font-questrial text-[12px] font-semibold uppercase tracking-[0.2em] text-white/75">
                                How we approach it
                            </span>

                            <span className="font-mono text-[12px] text-white/35">
                                {active.number} — 03
                            </span>
                        </div>

                        <div className="relative">
                            {/* Connecting line */}
                            <div
                                aria-hidden="true"
                                className="absolute bottom-12 left-[17px] top-8 w-px bg-gradient-to-b from-[#2F7BFF] via-[#2F7BFF]/40 to-transparent"
                            />

                            <div className="relative">
                                {active.steps.map((step, index) => (
                                    <article
                                        key={`${activeKey}-${step.number}`}
                                        className={`relative grid grid-cols-[36px_1fr] gap-5 py-7 sm:grid-cols-[48px_1fr] sm:gap-7 ${index !== active.steps.length - 1
                                            ? "border-b border-white/10"
                                            : ""
                                            }`}
                                    >
                                        <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#2F7BFF]/50 bg-[#0B101A] font-mono text-[10px] text-[#A9C7FF] sm:h-10 sm:w-10">
                                            {step.number}
                                        </div>

                                        <div className="pt-1">
                                            <h4 className="font-questrial text-[clamp(1.25rem,2.2vw,1.8rem)] font-medium leading-tight tracking-[-0.04em] text-white">
                                                {step.title}
                                            </h4>

                                            <p className="mt-3 max-w-[500px] font-questrial text-[16px] leading-[1.9] text-[#929EAF]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Practical outcome */}
                        <div className="mt-8 border-l-2 border-[#2F7BFF] bg-[#111B2B] px-5 py-5 sm:px-7">
                            <span className="font-questrial text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                The intended outcome
                            </span>

                            <p
                                key={activeKey}
                                className="mt-3 max-w-[560px] font-questrial text-[14px] leading-[1.8] text-white/85"
                                aria-live="polite"
                            >
                                {active.outcome}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Closing line */}
                <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                    <p className="max-w-[500px] font-questrial text-[14px] leading-[1.8] text-white/65">
                        Every service has its own requirements. Our approach
                        begins by understanding what each one needs.
                    </p>

                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 font-questrial text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A9C7FF] transition-colors hover:text-white"
                    >
                        Talk to MindSpace

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}