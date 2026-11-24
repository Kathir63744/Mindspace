//consultant/app/careers/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Questrial } from "next/font/google";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

import {
    resolveTheme,
    getThemeVariables,
} from "@/app/components/consultant/themes/MindSpaceTheme";

import { SERVICES, VISUALS, type CareerVisual } from "./data";

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((service) => service.slug === slug);

    if (!service) return { title: "Career Service Not Found" };

    return {
        title: `${service.title} — Careers | MindSpace`,
        description: service.need,
    };
}

const questrial = Questrial({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const HOW_WE_WORK_STEPS = [
    {
        step: "01",
        title: "Review Your Profile",
        body: "We review your experience, skills and career interests.",
    },
    {
        step: "02",
        title: "Build Your Career Plan",
        body: "Identify suitable roles and areas for preparation.",
    },
    {
        step: "03",
        title: "Prepare Your Applications",
        body: "Strengthen your resume, professional profile and interview skills.",
    },
    {
        step: "04",
        title: "Explore Opportunities",
        body: "Receive assistance identifying and applying for relevant opportunities.",
    },
    {
        step: "05",
        title: "Follow Up",
        body: "Receive guidance through interview follow-ups and next steps.",
    },
];

const placementSlugs = [
    "placement-support",
    "on-the-job-readiness",
];

export default async function CareersDetail({ params }: Props) {
    const { slug } = await params;

    const service = SERVICES.find((service) => service.slug === slug);
    const visual = VISUALS[slug] as CareerVisual | undefined;

    if (!service || !visual) notFound();

    const isPlacementPage = placementSlugs.includes(slug);

    const theme = resolveTheme(service.pillar || "careers", slug);
    const themeVars = getThemeVariables(theme);

    return (
        <main
            className={`${questrial.className} careers-questrial relative min-h-screen`}
            style={themeVars}
        >
            {/* CAREERS-ONLY FONT OVERRIDE */}
            <style>{`
                .careers-questrial,
                .careers-questrial * {
                    font-family: ${questrial.style.fontFamily} !important;
                }
            `}</style>

            <Navbar />

            {/* HERO */}
            <section className="relative flex min-h-[58svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-32 text-center">
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, var(--ms-border) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--ms-border) 1px, transparent 1px)
                        `,
                        backgroundSize: "80px 80px",
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at top, var(--ms-glow), transparent 60%)",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-4xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--ms-accent)]">
                        {visual.eyebrow}
                    </p>

                    <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,5rem)] font-bold uppercase leading-[1.04] tracking-[-0.04em]">
                        {service.title}
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-[28px] leading-[1.8] text-[var(--ms-muted)] md:text-base">
                        {visual.sub}
                    </p>

                    <p className="mx-auto mt-4 max-w-2xl text-lg  leading-[1.8] text-[var(--ms-secondary)]">
                        {visual.mind}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className="rounded-full bg-[var(--ms-accent)] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
                        >
                            Start Your Career Journey
                        </Link>

                        <Link
                            href="/careers"
                            className="rounded-full border border-[var(--ms-border)] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[var(--ms-text)] transition-colors hover:bg-[var(--ms-surface)]"
                        >
                            All Career Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="relative z-20 mx-auto -mt-7 max-w-[900px] px-5">
                <div className="grid grid-cols-1 divide-y divide-[var(--ms-border)] overflow-hidden rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-surface)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {visual.stats.map((stat) => (
                        <div key={stat.label} className="px-5 py-6 text-center">
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--ms-muted)]">
                                {stat.label}
                            </p>
                            <p className="mt-2 font-display text-xl font-semibold">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* IMAGE MOSAIC */}
            {visual.mosaic?.length ? (
                <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ms-accent)]">
                                Career in focus
                            </p>
                            <h2 className="mt-3 font-display text-2xl sm:text-3xl">
                                Visualizing your next step
                            </h2>
                        </div>

                        <span className="hidden text-xs text-[var(--ms-muted)] sm:block">
                            {String(visual.mosaic.length).padStart(2, "0")} moments
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {visual.mosaic.map((img, index) => (
                            <div
                                key={`${img.src}-${index}`}
                                className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-surface)]"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                                    <span className="text-xs font-semibold tracking-wide text-white">
                                        {img.caption}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/65">
                                        0{index + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            {/* HIGHLIGHTS */}
            <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6">
                <div className="mb-10 max-w-2xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ms-accent)]">
                        What this service brings
                    </p>
                    <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight">
                        What you will get
                    </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    {visual.highlights.map((highlight, index) => (
                        <article
                            key={highlight.title}
                            className="group relative overflow-hidden rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-6 transition-colors hover:bg-[var(--ms-surface-alt)] sm:p-7"
                        >
                            <div className="flex items-start justify-between">
                                <span className="font-mono text-sm text-[var(--ms-accent)]">
                                    0{index + 1}
                                </span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ms-border)] text-[var(--ms-accent)] transition-colors group-hover:bg-[var(--ms-accent-soft)]">
                                    ↗
                                </span>
                            </div>

                            <h3 className="mt-6 font-display text-2xl font-semibold">
                                {highlight.title}
                            </h3>

                            <p className="mt-3 max-w-md text-lg leading-7 text-[var(--ms-muted)]">
                                {highlight.body}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* PLACEMENT DISCLAIMER */}
            {isPlacementPage && (
                <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6">
                    <div className="overflow-hidden rounded-3xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-6 sm:p-9">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ms-accent)]">
                            Placement transparency
                        </p>

                        <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-tight">
                            We prepare you and connect you. Employers make the hiring decision.
                        </h2>

                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--ms-muted)]">
                            We help candidates prepare for and connect with relevant job
                            opportunities. Hiring decisions are made by employers, and employment
                            is not guaranteed.
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-background)] p-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ms-secondary)]">
                                    What we do
                                </h3>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--ms-muted)]">
                                    <li>Prepare your resume, interview and search strategy</li>
                                    <li>Make introductions to hiring teams we work with</li>
                                    <li>Coach you through follow-ups and offer negotiation</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-background)] p-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ms-secondary)]">
                                    What we cannot promise
                                </h3>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--ms-muted)]">
                                    <li>An employer will make an offer</li>
                                    <li>A role will still be available when you apply</li>
                                    <li>A specific employment outcome is guaranteed</li>
                                </ul>
                            </div>
                        </div>

                        <p className="mt-5 text-xs leading-6 text-[var(--ms-muted)]">
                            We do not charge a fee for employment. All hiring decisions, terms
                            and conditions rest with the employer.
                        </p>
                    </div>
                </section>
            )}

            {/* HOW WE WORK */}
            <section className="border-y border-[var(--ms-border)] bg-[var(--ms-background-alt)] py-20">
                <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
                    <div className="mb-10 max-w-2xl">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ms-accent)]">
                            Careers &amp; placements process
                        </p>

                        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight">
                            How we work
                        </h2>

                        <p className="mt-4 text-md leading-7 text-[var(--ms-muted)]">
                            A structured process that turns your current position into a clearer
                            next step.
                        </p>
                    </div>

                    <div className="mb-7 flex items-center gap-3">
                        <span className="rounded-full border border-[var(--ms-border)] bg-[var(--ms-accent-soft)] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[var(--ms-secondary)]">
                            Careers &amp; placements
                        </span>
                        <span className="h-px flex-1 bg-[var(--ms-border)]" />
                        <span className="font-mono text-[14px] text-[var(--ms-muted)]">
                            01 — 05
                        </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {HOW_WE_WORK_STEPS.map((step) => (
                            <article
                                key={step.step}
                                className="rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-5 transition-colors hover:bg-[var(--ms-surface-alt)]"
                            >
                                <span className="font-mono text-sm  text-[var(--ms-accent)]">
                                    {step.step}
                                </span>

                                <h3 className="mt-5 text-lg font-semibold leading-snug">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[var(--ms-muted)]">
                                    {step.body}
                                </p>
                            </article>
                        ))}
                    </div>

                    <p className="mt-6 rounded-xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-4 text-sm leading-6 text-[var(--ms-muted)]">
                        <strong className="text-[var(--ms-secondary)]">Important:</strong>{" "}
                        We help candidates prepare for and connect with relevant job
                        opportunities. Hiring decisions are made by employers, and employment
                        is not guaranteed.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="mx-auto max-w-[850px] px-5 sm:px-6">
                    <div className="mb-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ms-accent)]">
                            Answers &amp; guidance
                        </p>
                        <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                            Common questions
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {visual.faq.map((faq, index) => (
                            <details
                                key={`${faq.q}-${index}`}
                                className="group rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-5"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                                    <span>{faq.q}</span>
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--ms-border)] text-[var(--ms-accent)] transition-transform group-open:rotate-45">
                                        +
                                    </span>
                                </summary>

                                <p className="mt-4 border-t border-[var(--ms-border)] pt-4 text-md leading-7 text-[var(--ms-muted)]">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 pb-20 sm:px-6">
                <div className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-8 sm:p-12">
                    <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ms-accent)]">
                                Take the next step
                            </p>
                            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                                Your next chapter starts with a clear direction.
                            </h2>
                            <p className="mt-4 text-md leading-7 text-[var(--ms-muted)]">
                                Explore your options and find the career support that fits where you
                                are today.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--ms-accent)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
                        >
                            Talk to MindSpace ↗
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}