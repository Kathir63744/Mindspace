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
    return { title: `${service.title} — Careers`, description: service.need };
}

export default async function CareersDetail({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    const visual = VISUALS[slug];
    if (!service || !visual) notFound();

    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* CENTERED DASHBOARD HERO */}
            <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden pt-32 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,123,255,0.15),transparent_50%)]" />
                <div className="relative z-10 mx-auto max-w-3xl px-6">
                    <span className="rounded-full border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">
                        {service.pillar}
                    </span>
                    <h1 className="mt-8 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                        {service.title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] text-[#8A96A8]">{visual.sub}</p>
                </div>
            </section>

            {/* FLOATING STATS */}
            <div className="relative z-20 mx-auto -mt-10 max-w-[800px] px-6">
                <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#0A0D14] p-6 shadow-2xl">
                    <div className="text-center px-2">
                        <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Timeline</p>
                        <p className="mt-2 font-display text-xl text-white">1-2 Weeks</p>
                    </div>
                    <div className="text-center px-2">
                        <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Format</p>
                        <p className="mt-2 font-display text-xl text-white">1:1 Coaching</p>
                    </div>
                    <div className="text-center px-2">
                        <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Outcome</p>
                        <p className="mt-2 font-display text-xl text-white">Ready to apply</p>
                    </div>
                </div>
            </div>

            {/* WHAT YOU GET */}
            <section className="mx-auto max-w-[1000px] px-6 py-24">
                <h2 className="font-display text-3xl mb-10 text-center">What you will get</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {visual.highlights.map((h, i) => (
                        <div key={i} className="rounded-2xl border border-white/10 bg-[#0B0F17] p-6">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2F7BFF]/10 text-[#2F7BFF]">
                                ✓
                            </div>
                            <h3 className="font-display text-lg text-white">{h.title}</h3>
                            <p className="text-sm text-[#8A96A8] mt-2">{h.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-[#0A0D14] py-24 border-t border-white/5">
                <div className="mx-auto max-w-[800px] px-6">
                    <h2 className="font-display text-3xl mb-10 text-center">Common questions</h2>
                    <div className="space-y-4">
                        {visual.faq.map((f, i) => (
                            <details key={i} className="group rounded-2xl border border-white/10 bg-[#050505] p-6 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between text-white">
                                    <span className="font-medium">{f.q}</span>
                                    <span className="text-[#2F7BFF] transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 text-sm leading-relaxed text-[#8A96A8]">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}