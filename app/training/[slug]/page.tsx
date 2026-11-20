// app/training/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";
import { SERVICES, VISUALS } from "./data";

export const instant = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return { title: "Not found" };
    return { title: `${service.title} — Training`, description: service.need };
}

/* ============================================================
   HOW WE WORK — Training 5-step process
   (Replaces the previous per-track "process" timeline)
============================================================ */

const HOW_WE_WORK_STEPS = [
    {
        step: "01",
        title: "Understand Your Goals",
        body: "Tell us about your current skills and learning objectives.",
    },
    {
        step: "02",
        title: "Choose Your Programme",
        body: "We explain the relevant training options and requirements.",
    },
    {
        step: "03",
        title: "Learn & Practise",
        body: "Build your knowledge through guided learning and practical exercises.",
    },
    {
        step: "04",
        title: "Review Your Progress",
        body: "Receive feedback on your work and identify areas to improve.",
    },
    {
        step: "05",
        title: "Plan Your Next Step",
        body: "Discuss further learning or relevant career support.",
    },
];

export default async function TrainingDetail({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    const visual = VISUALS[slug];
    if (!service || !visual) notFound();

    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* SPLIT HERO */}
            <section className="mx-auto flex min-h-[80svh] max-w-[1400px] flex-col items-center gap-12 px-6 pt-32 pb-16 lg:flex-row lg:pt-40">
                <div className="w-full lg:w-1/2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">
                        {service.pillar} Track
                    </span>
                    <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                        {service.title}
                    </h1>
                    <p className="mt-6 text-[17px] leading-[1.6] text-[#8A96A8]">
                        {visual.sub}
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">
                                Format
                            </p>
                            <p className="font-display text-lg mt-1 text-white">
                                Live & Project-Based
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">
                                Outcome
                            </p>
                            <p className="font-display text-lg mt-1 text-white">
                                Certificate
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10">
                        <img
                            src={visual.hero.src}
                            alt={visual.hero.alt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
                    </div>
                </div>
            </section>

            {/* MODULES / HIGHLIGHTS */}
            <section className="bg-[#0A0D14] py-24">
                <div className="mx-auto max-w-[1000px] px-6">
                    <h2 className="font-display text-3xl mb-10 text-center">
                        What you will build.
                    </h2>
                    <div className="space-y-4">
                        {visual.highlights.map((h, i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-white/5 bg-[#050505] p-6 sm:items-center"
                            >
                                <span className="font-mono text-2xl text-[#2F7BFF]/50">
                                    0{i + 1}
                                </span>
                                <div>
                                    <h3 className="font-display text-xl text-white">
                                        {h.title}
                                    </h3>
                                    <p className="text-sm text-[#8A96A8] mt-1">
                                        {h.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= HOW WE WORK ================= */}
            <section className="mx-auto max-w-[1200px] px-6 py-24">
                <div className="mb-12 max-w-[720px]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">
                        Training process
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                        How We Work
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.7] text-[#8A96A8]">
                        Select a service to see the steps involved.
                    </p>
                </div>

                {/* Technology / Training tab indicator */}
                <div className="mb-8 flex items-center gap-3">
                    <span className="rounded-full border border-[#2F7BFF] bg-[#2F7BFF]/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9CCBFF]">
                        Training
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#8A96A8]">
                        Steps 01 — 05
                    </span>
                </div>

                {/* Steps */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {HOW_WE_WORK_STEPS.map((step) => (
                        <div
                            key={step.step}
                            className="relative flex flex-col rounded-2xl border border-white/10 bg-[#0B0F17] p-5 transition-colors hover:border-[#2F7BFF]/50 sm:p-6"
                        >
                            <span className="font-mono text-[11px] tracking-[0.15em] text-[#2F7BFF]">
                                {step.step}
                            </span>

                            <h3 className="mt-4 text-[14px] font-semibold leading-snug text-white">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-[12px] leading-6 text-[#8A96A8]">
                                {step.body}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <p className="mt-8 rounded-2xl border border-white/10 bg-[#0B0F17] p-5 text-[12px] leading-6 text-[#8A96A8]">
                    <strong className="text-[#9CCBFF]">Note:</strong>{" "}
                    Programme options, schedule and fees are agreed before
                    enrolment begins. Changes to the agreed scope are handled in
                    writing.
                </p>
            </section>

            <Footer />
        </main>
    );
}