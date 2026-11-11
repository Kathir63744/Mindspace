
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

    study: {
        number: "03",
        label: "Study abroad",
        heading: "Make international education a considered decision.",
        description:
            "Choosing to study abroad involves more than selecting a country. Academic goals, course suitability, finances and application requirements all matter.",
        steps: [
            {
                number: "01",
                title: "Understand the student profile",
                description:
                    "Review academic background, interests, intended study level, budget and future goals.",
            },
            {
                number: "02",
                title: "Explore suitable options",
                description:
                    "Research relevant destinations, institutions, courses, entry requirements and available funding options.",
            },
            {
                number: "03",
                title: "Navigate the application journey",
                description:
                    "Assist with applications, documentation and student visa preparation, subject to university and immigration requirements.",
            },
        ],
        outcome:
            "A clearer study plan and guidance through the relevant application stages. Admission and visa decisions remain with the respective authorities.",
        footer: "For students and families",
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
    { key: "study", label: "Study abroad" },
    { key: "careers", label: "Careers" },
];

export default function MindSpaceApproach() {
    const [activeKey, setActiveKey] =
        useState<ApproachKey>("technology");

    const active = approaches[activeKey];

    return (
        <section
            id="mindspace-approach"
            className="relative overflow-hidden bg-[#0B101A] py-24 text-[#F5F7FB] sm:py-32 lg:py-36"
        >
            <div className="pointer-events-none absolute -right-48 top-10 h-[400px] w-[400px] rounded-full bg-[#2F7BFF]/[0.06] blur-[130px]" />

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">

                {/* Section introduction */}
                <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                        <div className="mx-auto mb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                MindSpace / Our approaches
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>

                        <h2 className="max-w-[850px] text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.98] tracking-[-0.07em]">
                            Different challenges.
                            <br />
                            <span className="text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.98] tracking-[-0.07em]">
                                A considered way forward.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:col-span-4 lg:pb-2">
                        <p className="max-w-[390px] text-[14px] leading-[1.9] text-[#A2AAB8]">
                            Technology projects, professional learning,
                            international education and career development
                            need different kinds of support. Explore how we
                            approach each one.
                        </p>
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
                                    className={`group relative py-4 text-left text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${selected
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

                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                                    Selected division
                                </span>
                            </div>

                            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                {active.label}
                            </p>

                            <h3
                                className="max-w-[490px] text-[clamp(2rem,4vw,3.7rem)] font-medium leading-[1.04] tracking-[-0.06em]"
                                aria-live="polite"
                            >
                                {active.heading}
                            </h3>

                            <p className="mt-7 max-w-[440px] text-[14px] leading-[1.95] text-[#929EAF]">
                                {active.description}
                            </p>

                            <div className="mt-12 border-t border-white/10 pt-6">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                                    Who this is for
                                </span>

                                <p className="mt-3 text-[13px] text-white/75">
                                    {active.footer}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: tailored delivery stages */}
                    <div className="relative lg:col-span-7">
                        <div className="mb-8 flex items-center justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                                How we approach it
                            </span>

                            <span className="font-mono text-[10px] text-white/35">
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
                                            <h4 className="text-[clamp(1.25rem,2.2vw,1.8rem)] font-medium leading-tight tracking-[-0.04em] text-white">
                                                {step.title}
                                            </h4>

                                            <p className="mt-3 max-w-[500px] text-[13px] leading-[1.9] text-[#929EAF]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Practical outcome */}
                        <div className="mt-8 border-l-2 border-[#2F7BFF] bg-[#111B2B] px-5 py-5 sm:px-7">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                The intended outcome
                            </span>

                            <p
                                key={activeKey}
                                className="mt-3 max-w-[560px] text-[14px] leading-[1.8] text-white/85"
                                aria-live="polite"
                            >
                                {active.outcome}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Closing line */}
                <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                    <p className="max-w-[500px] text-[12px] leading-[1.8] text-white/45">
                        Every service has its own requirements. Our approach
                        begins by understanding what each one needs.
                    </p>

                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A9C7FF] transition-colors hover:text-white"
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
