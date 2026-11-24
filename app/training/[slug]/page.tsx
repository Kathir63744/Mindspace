
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

import {
    resolveTheme,
    getThemeVariables,
} from "@/app/components/consultant/themes/MindSpaceTheme";

import { SERVICES, VISUALS } from "./data";
import OnlineImage from "./OnlineImage";



type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((item) => item.slug === slug);

    if (!service) {
        return {
            title: "Training Not Found | MindSpace",
        };
    }

    return {
        title: `${service.title} | MindSpace Training`,
        description: service.need,
    };
}

/* ============================================================
   TRAINING PROCESS
============================================================ */

const HOW_WE_WORK_STEPS = [
    {
        step: "01",
        title: "Understand Your Goals",
        body: "Tell us about your current skills, interests and learning objectives.",
    },
    {
        step: "02",
        title: "Choose Your Programme",
        body: "We explain relevant training options, learning structure and requirements.",
    },
    {
        step: "03",
        title: "Learn & Practise",
        body: "Build your knowledge through guided learning, practical exercises and projects.",
    },
    {
        step: "04",
        title: "Review Your Progress",
        body: "Receive feedback on your work and identify areas where you can improve.",
    },
    {
        step: "05",
        title: "Plan Your Next Step",
        body: "Explore further learning and relevant opportunities for your development.",
    },
];

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function ArrowIcon({
    className = "",
}: {
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M5 12H19M12 5L19 12L12 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SectionEyebrow({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--ms-accent)]">
            <span className="h-px w-7 bg-[var(--ms-accent)]" />
            {children}
        </div>
    );
}

/* ============================================================
   HERO
============================================================ */

function TrainingDetailHero({
    service,
    visual,
}: {
    service: (typeof SERVICES)[number];
    visual: (typeof VISUALS)[string];
}) {
    return (
        <section className="relative min-h-[780px] overflow-hidden bg-[var(--ms-background)] pb-20 pt-32 sm:min-h-[850px] sm:pt-40">
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-15%] top-[-15%] h-[600px] w-[600px] rounded-full bg-[var(--ms-accent)]/[0.07] blur-[150px]" />
                <div className="absolute bottom-0 left-0 h-[50%] w-full bg-gradient-to-t from-[var(--ms-background)] to-transparent" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-6 sm:px-12 lg:px-28">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                    {/* Text */}
                    <div className="relative z-10">
                        <SectionEyebrow>
                            MindSpace / {service.pillar} training
                        </SectionEyebrow>

                        <h1 className="mt-8 max-w-[780px] text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.92] tracking-[-0.065em] text-[var(--ms-text)]">
                            {service.title}
                        </h1>

                        <p className="mt-8 max-w-[530px] text-[15px] leading-8 text-[var(--ms-muted)] sm:text-base sm:leading-8">
                            {visual.sub}
                        </p>

                        <div className="mt-10 grid max-w-[530px] grid-cols-2 border-t border-[var(--ms-border)] pt-7">
                            <div className="pr-5">
                                <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--ms-muted)]">
                                    Format
                                </span>
                                <p className="mt-2 text-sm leading-6 text-[var(--ms-text)] sm:text-base">
                                    Live & Project-Based
                                </p>
                            </div>

                            <div className="border-l border-[var(--ms-border)] pl-5">
                                <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--ms-muted)]">
                                    Outcome
                                </span>
                                <p className="mt-2 text-sm leading-6 text-[var(--ms-text)] sm:text-base">
                                    Certificate
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-5">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-4 bg-[var(--ms-accent)] px-6 py-4 text-sm text-[#06130B] transition-all hover:brightness-110"
                            >
                                Discuss this programme
                                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <a
                                href="#programme"
                                className="text-xs text-[var(--ms-muted)] transition-colors hover:text-[var(--ms-text)]"
                            >
                                Explore programme ↓
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="absolute -inset-5 border border-[var(--ms-accent)]/15" />

                        <OnlineImage
                            src={visual.hero.src}
                            alt={visual.hero.alt}
                            priority
                            className="relative aspect-[4/4.5] w-full"
                            imageClassName="transition-transform duration-1000 hover:scale-[1.03]"
                        />

                        {/* Image overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ms-background)]/65 via-transparent to-transparent" />

                        {/* Image footer */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-7">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">
                                    MindSpace learning
                                </p>
                                <p className="mt-2 text-sm text-white/90">
                                    Learn by doing. Grow by understanding.
                                </p>
                            </div>

                            <span className="flex h-10 w-10 items-center justify-center border border-white/30 text-white">
                                ↗
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom information strip */}
                <div className="mt-20 grid grid-cols-2 border-y border-[var(--ms-border)] py-5 sm:grid-cols-4">
                    {[
                        ["01", "Learn"],
                        ["02", "Practice"],
                        ["03", "Build"],
                        ["04", "Progress"],
                    ].map(([number, label]) => (
                        <div
                            key={number}
                            className="flex items-center gap-3 py-2 sm:justify-center"
                        >
                            <span className="text-[11px] tracking-[0.15em] text-[var(--ms-accent)]">
                                {number}
                            </span>
                            <span className="text-md tracking-wide text-[var(--ms-text)]">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   HIGHLIGHTS
============================================================ */

function TrainingHighlights({
    visual,
}: {
    visual: (typeof VISUALS)[string];
}) {
    return (
        <section
            id="programme"
            className="relative overflow-hidden bg-[var(--ms-background-alt)] py-24 sm:py-32"
        >
            <div className="pointer-events-none absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-[var(--ms-accent)]/[0.04] blur-[120px]" />

            <div className="relative mx-auto max-w-[1200px] px-6 sm:px-12">
                <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
                    {/* Section introduction */}
                    <div>
                        <SectionEyebrow>Programme overview</SectionEyebrow>

                        <h2 className="mt-7 text-[clamp(2.7rem,5vw,5rem)] leading-[0.95] tracking-[-0.06em] text-[var(--ms-text)]">
                            What you
                            <br />
                            will <span className="text-[var(--ms-accent)]">explore.</span>
                        </h2>

                        <p className="mt-7 max-w-[340px] text-md leading-7 text-[var(--ms-muted)]">
                            Explore the key areas of this programme and how each contributes
                            towards your learning.
                        </p>

                        <div className="mt-10 hidden aspect-[4/5] max-w-[360px] overflow-hidden lg:block">
                            <OnlineImage
                                src={visual.hero.src}
                                alt={visual.hero.alt}
                                className="h-full w-full"
                                imageClassName="opacity-70"
                            />
                        </div>
                    </div>

                    {/* Highlights list */}
                    <div>
                        {visual.highlights.map((highlight, index) => (
                            <div
                                key={`${highlight.title}-${index}`}
                                className="group relative grid grid-cols-[45px_1fr] gap-5 border-t border-[var(--ms-border)] py-7 sm:grid-cols-[70px_1fr] sm:gap-8 sm:py-9"
                            >
                                <span className="pt-1 font-mono text-[14px] tracking-[0.15em] text-[var(--ms-accent)]/70">
                                    0{index + 1}
                                </span>

                                <div>
                                    <h3 className="text-xl tracking-[-0.03em] text-[var(--ms-text)] transition-colors group-hover:text-[var(--ms-accent)] sm:text-2xl">
                                        {highlight.title}
                                    </h3>

                                    <p className="mt-3 max-w-[500px] text-md leading-7 text-[var(--ms-muted)]">
                                        {highlight.body}
                                    </p>
                                </div>

                                {/* Hover marker */}
                                <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--ms-accent)] transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))}
                        <div className="border-t border-[var(--ms-border)]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   HOW WE WORK
============================================================ */

function HowWeWork() {
    return (
        <section className="bg-[var(--ms-background)] py-24 sm:py-32">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-28">
                {/* Header */}
                <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-end">
                    <div>
                        <SectionEyebrow>Training process / 01—05</SectionEyebrow>

                        <h2 className="mt-7 max-w-[850px] text-[clamp(2.8rem,6.5vw,6.5rem)] leading-[0.95] tracking-[-0.06em] text-[var(--ms-text)]">
                            How we
                            <span className="text-[var(--ms-accent)]"> work.</span>
                        </h2>
                    </div>

                    <p className="max-w-[360px] pb-2 text-sm leading-7 text-[var(--ms-muted)]">
                        From understanding where you are to identifying where you want to go,
                        we make the process clear from the beginning.
                    </p>
                </div>

                {/* Process timeline */}
                <div className="relative">
                    <div className="absolute left-0 right-0 top-[15px] hidden h-px bg-[var(--ms-border)] lg:block" />

                    <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                        {HOW_WE_WORK_STEPS.map((step, index) => (
                            <div key={step.step} className="relative">
                                {/* Timeline point */}
                                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ms-accent)] bg-[var(--ms-background)] transition-colors hover:bg-[var(--ms-accent)]">
                                    <span className="h-2 w-2 rounded-full bg-[var(--ms-accent)]" />
                                </div>

                                <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-[var(--ms-accent)]">
                                    STEP {step.step}
                                </p>

                                <h3 className="mt-4 text-xl leading-snug tracking-[-0.03em] text-[var(--ms-text)] sm:text-2xl">
                                    {step.title}
                                </h3>

                                <p className="mt-4 max-w-[270px] text-md leading-7 text-[var(--ms-muted)]">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Note */}
                <div className="mt-16 flex gap-4 border border-[var(--ms-border)] bg-[var(--ms-surface)] p-5 sm:p-7">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-[var(--ms-accent)]/40 text-[var(--ms-accent)]">
                        i
                    </span>

                    <p className="text-sm leading-6 text-[var(--ms-muted)]">
                        <strong className="font-medium text-[var(--ms-text)]">
                            Programme note:
                        </strong>{" "}
                        Programme options, schedule and fees are agreed before enrolment
                        begins. Changes to the agreed scope are handled in writing.
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   CLOSING CTA
============================================================ */

function TrainingClosingCTA({
    title,
}: {
    title: string;
}) {
    return (
        <section className="mx-5 mb-20 sm:mx-12 sm:mb-28 lg:mx-28">
            <div className="relative overflow-hidden border border-[var(--ms-border)] bg-[var(--ms-surface)]">
                <div className="grid lg:grid-cols-[1fr_0.75fr]">
                    {/* Text */}
                    <div className="relative flex flex-col justify-center px-7 py-16 sm:px-12 sm:py-20 lg:px-16">
                        <div className="absolute right-7 top-7 h-9 w-9 border border-[var(--ms-accent)]/30 sm:right-12 sm:top-12">
                            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[var(--ms-accent)]" />
                        </div>

                        <SectionEyebrow>Start your next chapter</SectionEyebrow>

                        <h2 className="mt-8 max-w-[720px] text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[0.95] tracking-[-0.06em] text-[var(--ms-text)]">
                            Ready to turn
                            <br />
                            learning into
                            <br />
                            <span className="text-[var(--ms-accent)]">possibility?</span>
                        </h2>

                        <p className="mt-7 max-w-[420px] text-md leading-7 text-[var(--ms-muted)]">
                            Take the first step. Let&apos;s discuss your goals and find a
                            learning direction that makes sense for you.
                        </p>

                        <Link
                            href="/contact"
                            className="group mt-9 inline-flex w-fit items-center gap-5 border border-[var(--ms-accent)] px-6 py-4 text-sm text-[var(--ms-text)] transition-all hover:bg-[var(--ms-accent)] hover:text-[#06130B]"
                        >
                            Start a conversation
                            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="relative min-h-[340px] lg:min-h-full">
                        <OnlineImage
                            src={title ? VISUALS[title]?.hero.src ?? "" : ""}
                            alt={title}
                            className="absolute inset-0"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--ms-surface)]/25" />

                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-9 sm:left-9 sm:right-9">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/65">
                                MindSpace / Training
                            </span>
                            <span className="flex h-9 w-9 items-center justify-center border border-white/40 text-white">
                                ↗
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom green line */}
                <div className="h-[2px] w-full bg-[var(--ms-accent)]" />
            </div>
        </section>
    );
}

/* ============================================================
   PAGE
============================================================ */

export default async function TrainingDetail({ params }: Props) {
    const { slug } = await params;

    const service = SERVICES.find((item) => item.slug === slug);
    const visual = VISUALS[slug];

    if (!service || !visual) notFound();

    const theme = resolveTheme(service.pillar || "training", slug);
    const themeVars = getThemeVariables(theme);

    return (
        <main
            className="min-h-screen overflow-x-hidden bg-[var(--ms-background)] text-[var(--ms-text)]"
            style={themeVars}
        >
            <Navbar />

            <TrainingDetailHero service={service} visual={visual} />

            <TrainingHighlights visual={visual} />

            <HowWeWork />

            <TrainingClosingCTA title={slug} />

            <Footer />
        </main>
    );
}
