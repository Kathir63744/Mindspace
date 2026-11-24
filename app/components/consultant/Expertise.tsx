"use client";

import { useMemo, useState } from "react";

const categories = [
    "All",
    "Technology",
    "Training",
    "Career Support"
];

const experts = [
    {
        id: 1,
        name: "David Osei",
        role: "Technology Consultant",
        category: "Technology",
        image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=85",
        initials: "01",
        experience: "Cloud Architecture & Web Systems",
        tags: ["Next.js", "AWS", "Custom Software"],
        description:
            "Advising businesses on digital transformation and leading the architecture of custom software solutions.",
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Professional Trainer",
        category: "Training",
        image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=85",
        initials: "02",
        experience: "Curriculum Design & Mentorship",
        tags: ["Web Development", "Data & AI", "Programming"],
        description:
            "Designing and delivering hands-on training tracks that turn beginners into job-ready developers.",
    },
    {
        id: 3,
        name: "Priya Sharma",
        role: "Career Advisor",
        category: "Career Support",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=85",
        initials: "03",
        experience: "Career Strategy & Interview Prep",
        tags: ["Resume Building", "Mock Interviews", "Career Direction"],
        description:
            "Guiding individuals through career transitions, resume optimization, and interview preparation.",
    },
    {
        id: 4,
        name: "Sarah Jenkins",
        role: "Placement Coordinator",
        category: "Career Support",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=85",
        initials: "04",
        experience: "Partner Networks & Internships",
        tags: ["Job Placement", "Internships", "Employer Relations"],
        description:
            "Connecting trained talent with hiring partners and managing internship and placement opportunities.",
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
            className="relative isolate overflow-hidden bg-[#07090F] py-24 font-questrial sm:py-32"
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

                {/* Top eyebrow — matches About / MindSpaceEcosystem / MindSpaceApproach */}
                <div className="flex justify-between items-center gap-4 mb-[clamp(24px,3.4vw,44px)] max-sm:items-start">
                    <div className="flex max-w-7xl items-center gap-3">
                        <span className="h-px w-8 bg-[#2F7BFF]" />
                        <span className="font-questrial text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                            Our Experts
                        </span>
                        <span className="h-px max-w-20 flex-1 bg-white/10" />
                    </div>
                    <span className="font-questrial text-white/90 text-[10px] tracking-[0.08em] uppercase max-sm:max-w-[100px] max-sm:text-right max-sm:leading-relaxed">
                        Guidance · Experience · Direction
                    </span>
                </div>

                {/* Hero text — two-line headline + description, matches About */}
                <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,72px)] mb-[clamp(24px,3.4vw,44px)] md:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
                    {/* LEFT — headline, two flush-left lines */}
                    <h2 className="m-0 w-full font-questrial text-[clamp(38px,6.4vw,72px)] leading-[0.94] tracking-[-0.055em] font-[600] max-sm:text-[clamp(36px,11vw,58px)]">
                        <span className="block overflow-hidden pb-[0.10em]">
                            <span className="inline-block text-white/90">
                                Meet the people
                            </span>
                        </span>
                        <span className="block overflow-hidden pb-[0.10em]">
                            <span className="inline-block text-[#80ADFF] italic font-medium">
                                behind MindSpace.
                            </span>
                        </span>
                    </h2>

                    {/* RIGHT — paragraph + status label, matching About */}
                    <div className="max-w-[520px] pb-2 md:justify-self-end">
                        <span className="font-questrial text-[10px] font-[650] uppercase tracking-[0.18em] text-[#A9C7FF]">
                            A specialist team
                        </span>
                        <p className="mt-[17px] font-questrial text-white/90 text-[clamp(15px,1.25vw,18px)] leading-[1.85]">
                            Our team brings together experience in technology,
                            professional training, and career and placement
                            support — so every conversation points to the
                            right next step.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#2F7BFF] shadow-[0_0_12px_rgba(47,123,255,0.8)]" />
                            <span className="font-questrial text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
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
                                className={`shrink-0 rounded-lg border px-5 py-3 font-questrial text-sm font-medium transition-all duration-300 ${active
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
                                <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-black/30 px-2.5 py-1.5 font-questrial text-[9px] tracking-[0.18em] text-white/80 backdrop-blur-md sm:left-4 sm:top-4">
                                    EXP. {expert.initials}
                                </span>

                                {/* Bottom image detail */}
                                <div className="absolute bottom-4 left-3 right-3 sm:bottom-5 sm:left-4">
                                    <span className="inline-flex rounded-md border border-[#A9C7FF]/30 bg-[#0D1D3B]/75 px-2.5 py-1.5 font-questrial text-[10px] font-medium text-[#C9DCFF] backdrop-blur-md">
                                        {expert.category}
                                    </span>
                                </div>
                            </div>

                            {/* Profile information */}
                            <div className="relative flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-6 lg:p-7">

                                {/* Decorative corner */}
                                <span className="absolute right-0 top-0 h-16 w-16 border-r border-t border-[#2F7BFF]/20 transition-all duration-500 group-hover:h-20 group-hover:w-20 group-hover:border-[#2F7BFF]/60" />

                                <span className="mb-3 font-questrial text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                    MindSpace Specialist
                                </span>

                                <h3 className="font-questrial text-lg font-medium leading-tight tracking-tight text-white transition-colors group-hover:text-[#A9C7FF] sm:text-2xl">
                                    {expert.name}
                                </h3>

                                <p className="mt-2 font-questrial text-[16px] font-medium leading-5 text-white/55 sm:text-sm">
                                    {expert.role}
                                </p>

                                {/* Experience highlight */}
                                <div className="mt-5 border-l-2 border-[#2F7BFF] pl-3">
                                    <span className="font-questrial text-[10px] uppercase tracking-[0.16em] text-white/55">
                                        Experience focus
                                    </span>

                                    <p className="mt-1 font-questrial text-sm font-medium text-[#A9C7FF]">
                                        {expert.experience}
                                    </p>
                                </div>

                                <p className="mt-4 font-questrial text-[13px] leading-5 text-white/40 sm:text-sm">
                                    {expert.description}
                                </p>

                                {/* Expertise tags */}
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {expert.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-questrial text-[10px] leading-none text-white/55 transition-colors group-hover:border-[#2F7BFF]/25 group-hover:text-[#C9DCFF]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom marker */}
                                <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                                    <span className="font-questrial text-[10px] uppercase tracking-[0.15em] text-white/50">
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
                    <p className="font-questrial text-sm leading-5 text-white/45">
                        The right guidance makes every decision clearer.
                    </p>

                    <span className="font-questrial text-[10px] font-semibold tracking-[0.16em] text-[#A9C7FF]">
                        {String(filteredExperts.length).padStart(2, "0")} PROFILES
                    </span>
                </div>
            </div>
        </section>
    );
}