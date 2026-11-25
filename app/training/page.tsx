
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/consultant/Navbar";
import Footer from "../components/consultant/Footer";

type TrainingCategory = {
    title: string;
    href: string;
    tag: string;
    summary: string;
    features: string[];
};

/* ============================================================
   THE FOUR TRAINING CATEGORIES
============================================================ */

const TRAINING_CATEGORIES: TrainingCategory[] = [
    {
        title: "Technical & Programming Training",
        href: "/training/programming-foundations",
        tag: "Foundation",
        summary:
            "Start from zero and build real fluency: syntax, logic, debugging and problem-solving. By the end you'll write small programs confidently and know how to keep learning.",
        features: ["Syntax & logic", "Small projects", "Debug habits"],
    },
    {
        title: "Practical Projects",
        href: "/training/web-development",
        tag: "Hands-on",
        summary:
            "Learn by building. Work on real, end-to-end projects — frontend, backend, database, deployment — and finish with a portfolio you can show employers.",
        features: ["Frontend & backend", "Real datasets", "Deployed apps"],
    },
    {
        title: "Job Readiness Training",
        href: "/training/portfolio-certification",
        tag: "Career Prep",
        summary:
            "Turn your skills into proof. Build a portfolio site, write case studies, prepare for interviews, and earn a certificate that shows what you can actually deliver.",
        features: ["Portfolio site", "Case studies", "Certificate"],
    },
    {
        title: "Corporate & Communication Training",
        href: "/training/communication",
        tag: "Professional",
        summary:
            "Help your team communicate clearly, present confidently and collaborate effectively — the professional skills that turn good engineers into great teammates.",
        features: ["Clear writing", "Presentations", "Team collaboration"],
    },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   CARD
============================================================ */

function TrainingCard({
    category,
    index,
    reducedMotion,
}: {
    category: TrainingCategory;
    index: number;
    reducedMotion: boolean;
}) {
    return (
        <motion.article
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B1711] to-[#050A07] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#32C878]/70 hover:shadow-[0_30px_70px_-24px_rgba(50,200,120,0.35)] sm:p-7"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
        >
            {/* Header: number + tag */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#32C878]">
                    {String(index + 1).padStart(2, "0")} / 04
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#A5E8C2]">
                    {category.tag}
                </span>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-[clamp(1.25rem,2vw,1.5rem)] font-[550] leading-[1.15] tracking-[-0.035em] text-[#F3F8F4] transition-colors group-hover:text-[#79E3A7]">
                {category.title}
            </h3>

            {/* Explanation */}
            <p className="mt-3 text-[13.5px] leading-[1.75] text-[#A4B5A9]">
                {category.summary}
            </p>

            {/* Features */}
            <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {category.features.map((f) => (
                    <li
                        key={f}
                        className="flex items-start gap-2.5 text-[13px] leading-snug text-[#D3DED6]"
                    >
                        <span
                            className="mt-[2px] text-[11px] text-[#32C878]"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                        {f}
                    </li>
                ))}
            </ul>

            {/* Footer link */}
            <Link
                href={category.href}
                className="group/link mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-[12px] font-[650] uppercase tracking-[0.14em] text-[#A5E8C2] transition-colors hover:text-white"
            >
                View details
                <span
                    className="text-[15px] transition-transform duration-250 group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px]"
                    aria-hidden="true"
                >
                    ↗
                </span>
            </Link>
        </motion.article>
    );
}

/* ============================================================
   SECTION
============================================================ */

export default function TrainingShowcase({
    id = "training",
    eyebrow = "MINDSPACE / TRAINING",
    titleLine1 = "Training that ships ",
    titleAccent = "real skills.",
    description = "Four hands-on tracks that take you from learning to building — with real projects, portfolios and certificates.",
    categories = TRAINING_CATEGORIES,
    contactHref = "/contact",
}: {
    id?: string;
    eyebrow?: string;
    titleLine1?: string;
    titleAccent?: string;
    description?: string;
    categories?: TrainingCategory[];
    contactHref?: string;
}) {
    const reducedMotion = useReducedMotion();

    return (
        <section
            className="relative isolate w-full overflow-hidden bg-[#070D09] px-[clamp(20px,6vw,92px)] pt-[clamp(76px,9vw,128px)] pb-12 text-[#F3F8F4] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_82%_8%,rgba(50,200,120,0.12),transparent_34%)] max-sm:px-[18px] max-sm:pt-[66px] max-sm:pb-[34px]"
            id={id}
            aria-labelledby={`${id}-heading`}
        >
            <Navbar />

            <div className="relative z-10 mx-auto max-w-[1440px]">
                {/* Eyebrow */}
                <div className="mx-auto mb-4 flex max-w-7xl items-center gap-3 px-6">
                    <span className="h-px w-9 bg-[#32C878]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A5E8C2]">
                        {eyebrow}
                    </span>
                    <span className="h-px max-w-24 flex-1 bg-white/10" />
                </div>

                {/* Heading + description */}
                <div className="grid grid-cols-1 items-end gap-[clamp(30px,7vw,100px)] py-[clamp(48px,7vw,94px)] md:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)] md:pb-[clamp(48px,6vw,76px)]">
                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, ease: EASE }}
                    >
                        <h2
                            id={`${id}-heading`}
                            className="m-0 max-w-[900px] text-[clamp(48px,7.4vw,98px)] font-medium leading-[0.98] tracking-[-0.075em] text-[#F3F8F4] max-sm:text-[clamp(43px,12vw,66px)]"
                        >
                            {titleLine1}
                            <span className="text-[#A5E8C2]">
                                {titleAccent}
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="max-w-[430px] pb-2 max-md:max-w-[620px]"
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                    >
                        <span className="text-[9px] font-[650] uppercase tracking-[0.16em] text-[#A5E8C2]">
                            PRACTICAL PROGRAMMES
                        </span>
                        <p className="mt-[17px] text-[15px] leading-[1.85] text-[#A4B5A9] max-sm:text-sm">
                            {description}
                        </p>
                        <a
                            className="group mt-6 inline-flex items-center gap-5 border-b border-[#32C878] pb-[9px] text-xs font-semibold text-[#F3F8F4] no-underline transition-all duration-250 hover:gap-[27px] hover:text-[#A5E8C2]"
                            href={contactHref}
                        >
                            Talk to our team
                            <span
                                className="text-[17px] text-[#A5E8C2]"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    </motion.div>
                </div>

                {/* Divider header */}
                <div className="flex justify-between gap-[18px] border-t border-white/[0.13] py-[17px] text-[9px] font-[650] uppercase tracking-[0.16em] text-[#899B8E] max-sm:text-[8px] max-sm:tracking-[0.1em]">
                    <span className="text-[#A5E8C2]">
                        TRAINING TRACKS
                    </span>
                    <span>Four tracks. One platform.</span>
                </div>

                {/* Four cards, horizontal row */}
                <div className="grid grid-cols-1 gap-5 border-t border-white/[0.13] pt-8 sm:grid-cols-2 xl:grid-cols-4">
                    {categories.map((category, index) => (
                        <TrainingCard
                            key={category.href}
                            category={category}
                            index={index}
                            reducedMotion={Boolean(reducedMotion)}
                        />
                    ))}
                </div>

                {/* Footer strip */}
                <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.13] pt-6 sm:flex-row sm:items-center">
                    <p className="text-[11px] text-[#899B8E]">
                        Not sure which track fits? Talk to us and we'll point you
                        to the right starting point.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:text-[#A5E8C2]"
                    >
                        Talk to an expert
                        <span className="transition-transform group-hover:translate-x-1">
                            ↗
                        </span>
                    </Link>
                </div>
            </div>

            <Footer />
        </section>
    );
}
