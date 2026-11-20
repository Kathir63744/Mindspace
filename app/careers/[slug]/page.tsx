// app/careers/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";
import { SERVICES, VISUALS, type CareerVisual } from "./data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return { title: "Not found" };
    return { title: `${service.title} — Careers`, description: service.need };
}

/* ============================================================
   HOW WE WORK — Careers & Placements 5-step process
============================================================ */

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

export default async function CareersDetail({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    const visual = VISUALS[slug] as CareerVisual | undefined;
    if (!service || !visual) notFound();

    const isPlacementPage =
        slug === "placement-support" || slug === "on-the-job-readiness";

    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* ================= HERO (tightened) ================= */}
            <section className="relative flex min-h-[52svh] flex-col items-center justify-center overflow-hidden pt-28 pb-14 text-center">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: "80px 80px",
                        backgroundPosition: "center center",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,123,255,0.1),transparent_50%)]" />

                <div className="relative z-10 mx-auto max-w-3xl px-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2F7BFF]">
                        {visual.eyebrow}
                    </p>
                    <h1 className="mt-4 font-display text-[clamp(2.2rem,5.2vw,3.8rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white">
                        {service.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-[#8A96A8]">
                        {visual.sub}
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-[13px] italic leading-[1.7] text-[#7CC4FF]/80">
                        {visual.mind}
                    </p>
                </div>
            </section>

            {/* ================= FLOATING STATS (tightened) ================= */}
            <div className="relative z-20 mx-auto -mt-8 max-w-[760px] px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#0A0D14] p-4 shadow-2xl">
                    {visual.stats.map((s) => (
                        <div key={s.label} className="text-center px-3 py-3">
                            <p className="text-[9px] uppercase tracking-wider text-[#8A96A8]">
                                {s.label}
                            </p>
                            <p className="mt-1.5 font-display text-lg text-white">
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= MOSAIC (tightened) ================= */}
            <section className="mx-auto max-w-[1000px] px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {visual.mosaic?.map((img, i) => (
                        <div
                            key={i}
                            className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-white">
                                {img.caption}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= HIGHLIGHTS (tightened) ================= */}
            <section className="mx-auto max-w-[1000px] px-6 pb-16">
                <h2 className="font-display text-2xl mb-6 text-center">
                    What you will get
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {visual.highlights.map((h, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-white/10 bg-[#0B0F17] p-6"
                        >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2F7BFF]/10 text-[#2F7BFF] font-bold text-lg">
                                ✓
                            </div>
                            <h3 className="font-display text-lg text-white">{h.title}</h3>
                            <p className="text-[14px] leading-relaxed text-[#8A96A8] mt-2">
                                {h.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= PLACEMENT EXPLANATION (placement pages only, tightened) ================= */}
            {isPlacementPage && (
                <section className="mx-auto max-w-[1200px] px-6 pb-16">
                    <div className="rounded-2xl border border-[#2F7BFF]/25 bg-[#0B0F17] p-6 sm:p-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2F7BFF]">
                            How placement works
                        </p>
                        <h2 className="mt-3 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.15] tracking-[-0.03em] text-white">
                            We prepare you and connect you. Employers make the hiring decision.
                        </h2>
                        <p className="mt-3 text-[14px] leading-[1.8] text-[#A9BCD9]">
                            We help candidates prepare for and connect with relevant job
                            opportunities. Hiring decisions are made by employers, and
                            employment is not guaranteed.
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7CC4FF]">
                                    What we do
                                </h3>
                                <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-[#D3D8E2]">
                                    <li>Prepare your resume, interview and search strategy</li>
                                    <li>Make warm introductions to hiring teams we work with</li>
                                    <li>Coach you through follow-ups and offer negotiation</li>
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7CC4FF]">
                                    What we can&apos;t promise
                                </h3>
                                <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-[#D3D8E2]">
                                    <li>That an employer will make an offer</li>
                                    <li>That a role will be open when you apply</li>
                                    <li>That any specific outcome is guaranteed</li>
                                </ul>
                            </div>
                        </div>

                        <p className="mt-4 text-[12px] leading-relaxed text-[#8A96A8]">
                            We do not charge a fee for employment. All hiring decisions,
                            terms and conditions rest with the employer.
                        </p>
                    </div>
                </section>
            )}

            {/* ================= HOW WE WORK (new, tightened) ================= */}
            <section className="bg-[#0A0D14] py-16 border-y border-white/5">
                <div className="mx-auto max-w-[1000px] px-1">
                    <div className="mb-8 max-w-[720px]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">
                            Careers &amp; Placements process
                        </p>
                        <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                            How We Work
                        </h2>
                        <p className="mt-3 text-[14px] leading-[1.7] text-[#8A96A8]">
                            Select a service to see the steps involved.
                        </p>
                    </div>

                    {/* Careers & Placements tab indicator */}
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-full border border-[#2F7BFF] bg-[#2F7BFF]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9CCBFF]">
                            Careers &amp; Placements
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
                                className="relative flex flex-col rounded-xl border border-white/10 bg-[#050505] p-4 transition-colors hover:border-[#2F7BFF]/50"
                            >
                                <span className="font-mono text-[10px] tracking-[0.15em] text-[#2F7BFF]">
                                    {step.step}
                                </span>

                                <h3 className="mt-3 text-[13px] font-semibold leading-snug text-white">
                                    {step.title}
                                </h3>

                                <p className="mt-1.5 text-[11.5px] leading-5 text-[#8A96A8]">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Note */}
                    <p className="mt-6 rounded-xl border border-white/10 bg-[#050505] p-4 text-[11.5px] leading-5 text-[#8A96A8]">
                        <strong className="text-[#7CC4FF]">Note:</strong>{" "}
                        We help candidates prepare for and connect with relevant job
                        opportunities. Hiring decisions are made by employers, and
                        employment is not guaranteed.
                    </p>
                </div>
            </section>

            {/* ================= FAQ (tightened) ================= */}
            <section className="py-16">
                <div className="mx-auto max-w-[800px] px-6">
                    <h2 className="font-display text-2xl mb-6 text-center">
                        Common questions
                    </h2>
                    <div className="space-y-3">
                        {visual.faq.map((f, i) => (
                            <details
                                key={i}
                                className="group rounded-xl border border-white/10 bg-[#0B0F17] p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
                            >
                                <summary className="flex items-center justify-between text-white font-medium text-[15px]">
                                    <span>{f.q}</span>
                                    <span className="text-[#2F7BFF] text-xl transition-transform duration-300 group-open:rotate-45">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-3 text-[13.5px] leading-relaxed text-[#8A96A8] border-t border-white/5 pt-3">
                                    {f.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>


            <Footer />
        </main>
    );
}