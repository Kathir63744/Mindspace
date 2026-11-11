
"use client";

import { useMemo, useState } from "react";

const categories = [
    "All",
    "Admissions",
    "University Guidance",
    "Visa Support",
    "Career Planning",
];

const experts = [
    {
        id: 1,
        name: "Advisor Name",
        role: "Senior Education Consultant",
        category: "Admissions",
        image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=85",
        initials: "01",
        experience: "Admissions & applications",
        tags: ["Profile Evaluation", "Application Strategy", "Documentation"],
        description:
            "Helping students understand admission requirements and prepare stronger applications.",
    },
    {
        id: 2,
        name: "Advisor Name",
        role: "University Guidance Specialist",
        category: "University Guidance",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=85",
        initials: "02",
        experience: "University selection",
        tags: ["Course Selection", "University Research", "Study Planning"],
        description:
            "Supporting students in finding suitable universities and academic pathways.",
    },
    {
        id: 3,
        name: "Advisor Name",
        role: "Visa Documentation Specialist",
        category: "Visa Support",
        image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=85",
        initials: "03",
        experience: "Visa preparation",
        tags: ["Document Review", "Visa Guidance", "Interview Preparation"],
        description:
            "Guiding students through visa documentation and preparation requirements.",
    },
    {
        id: 4,
        name: "Advisor Name",
        role: "Career Guidance Consultant",
        category: "Career Planning",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=85",
        initials: "04",
        experience: "Career development",
        tags: ["Career Direction", "Goal Planning", "Opportunity Mapping"],
        description:
            "Helping students connect their education choices with future career goals.",
    },
];

export default function Expertise() {
    const [selected, setSelected] = useState("All");

    const filteredExperts = useMemo(() => {
        if (selected === "All") return experts;

        return experts.filter(
            (expert) => expert.category === selected
        );
    }, [selected]);

    return (
        <section
            id="expertise"
            className="relative isolate overflow-hidden bg-[#07090F] py-24 sm:py-32"
        >
            {/* Background atmosphere */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/10 blur-[150px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-64 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/[0.06] blur-[140px]"
            />

            <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-20">

                {/* Section heading */}
                <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1fr_350px] lg:items-end">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#2F7BFF]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                The people behind MindSpace
                            </span>
                        </div>

                        <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                            Expertise that moves
                            <span className="block text-[#A9C7FF]">
                                your journey forward.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:pb-2">
                        <p className="text-sm leading-7 text-white/50">
                            Meet the specialists behind every important
                            decision, offering focused guidance at each
                            stage of your education journey.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#2F7BFF] shadow-[0_0_12px_rgba(47,123,255,0.8)]" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                                Guidance · Experience · Direction
                            </span>
                        </div>
                    </div>
                </div>

                {/* Category navigation */}
                <div className="mb-9 flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => {
                        const active = selected === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setSelected(category)}
                                aria-pressed={active}
                                className={`shrink-0 rounded-lg border px-5 py-3 text-xs font-medium transition-all duration-300 ${active
                                    ? "border-[#2F7BFF] bg-[#2F7BFF] text-white shadow-[0_5px_24px_rgba(47,123,255,0.2)]"
                                    : "border-white/10 bg-white/[0.035] text-white/55 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Expert profile panels */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {filteredExperts.map((expert) => (
                        <article
                            key={expert.id}
                            className="group relative flex min-h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-[#0D121D] transition-all duration-500 hover:-translate-y-1 hover:border-[#2F7BFF]/45 hover:bg-[#101827]"
                        >
                            {/* Portrait */}
                            <div className="relative w-[36%] min-w-[115px] shrink-0 overflow-hidden bg-[#111827] sm:w-[34%]">
                                <img
                                    src={expert.image}
                                    alt={`Professional portrait representing ${expert.role}`}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Image overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/80 via-[#07090F]/5 to-[#2F7BFF]/10" />

                                {/* Profile number */}
                                <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-black/30 px-2.5 py-1.5 text-[9px] tracking-[0.18em] text-white/80 backdrop-blur-md sm:left-4 sm:top-4">
                                    EXP. {expert.initials}
                                </span>

                                {/* Bottom image detail */}
                                <div className="absolute bottom-4 left-3 right-3 sm:bottom-5 sm:left-4">
                                    <span className="inline-flex rounded-md border border-[#A9C7FF]/30 bg-[#0D1D3B]/75 px-2.5 py-1.5 text-[9px] font-medium text-[#C9DCFF] backdrop-blur-md">
                                        {expert.category}
                                    </span>
                                </div>
                            </div>

                            {/* Profile information */}
                            <div className="relative flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-6 lg:p-7">

                                {/* Decorative corner */}
                                <span className="absolute right-0 top-0 h-16 w-16 border-r border-t border-[#2F7BFF]/20 transition-all duration-500 group-hover:h-20 group-hover:w-20 group-hover:border-[#2F7BFF]/60" />

                                <span className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                    MindSpace specialist
                                </span>

                                <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-white transition-colors group-hover:text-[#A9C7FF] sm:text-2xl">
                                    {expert.name}
                                </h3>

                                <p className="mt-2 text-[11px] font-medium leading-5 text-white/55 sm:text-xs">
                                    {expert.role}
                                </p>

                                {/* Experience highlight */}
                                <div className="mt-5 border-l-2 border-[#2F7BFF] pl-3">
                                    <span className="text-[9px] uppercase tracking-[0.16em] text-white/35">
                                        Experience focus
                                    </span>

                                    <p className="mt-1 text-xs font-medium text-[#A9C7FF]">
                                        {expert.experience}
                                    </p>
                                </div>

                                <p className="mt-4 text-[11px] leading-5 text-white/40 sm:text-xs">
                                    {expert.description}
                                </p>

                                {/* Expertise tags */}
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {expert.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[9px] leading-none text-white/55 transition-colors group-hover:border-[#2F7BFF]/25 group-hover:text-[#C9DCFF]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom marker */}
                                <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                                        Professional guidance
                                    </span>

                                    <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BFF] shadow-[0_0_10px_rgba(47,123,255,0.8)] transition-transform duration-300 group-hover:scale-150" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Footer detail */}
                <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <p className="text-xs leading-5 text-white/35">
                        The right guidance makes every decision clearer.
                    </p>

                    <span className="text-[10px] font-semibold tracking-[0.16em] text-[#A9C7FF]">
                        {String(filteredExperts.length).padStart(2, "0")} PROFILES
                    </span>
                </div>
            </div>
        </section>
    );
}
