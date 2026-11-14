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
    return { title: `${service.title} — Study Abroad`, description: service.need };
}

export default async function StudyAbroadDetail({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    const visual = VISUALS[slug];
    if (!service || !visual) notFound();

    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* CINEMATIC HERO */}
            <section className="relative h-[75svh] w-full overflow-hidden">
                <img src={visual.hero.src} alt={visual.hero.alt} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-end px-6 pb-20">
                    <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#A9C7FF]">
                        <Link href="/">Home</Link> <span>/</span>
                        <Link href="/study-abroad">Study Abroad</Link> <span>/</span>
                        <span className="text-white">{service.title}</span>
                    </nav>
                    <h1 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                        {service.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-[#DCE9FF]">{visual.sub}</p>
                </div>
            </section>

            {/* OVERVIEW & MOSAIC */}
            <section className="mx-auto max-w-[1200px] px-6 py-24">
                <div className="grid gap-16 lg:grid-cols-2">
                    <div>
                        <h2 className="font-display text-3xl mb-6">What this covers</h2>
                        <ul className="space-y-4">
                            {visual.highlights.map((h, i) => (
                                <li key={i} className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                                    <span className="text-[#2F7BFF] mt-1">✦</span>
                                    <div>
                                        <h3 className="font-semibold text-white">{h.title}</h3>
                                        <p className="text-sm text-[#8A96A8] mt-1">{h.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid gap-4">
                        {visual.mosaic.map((m, i) => (
                            <div key={i} className="group relative h-[250px] overflow-hidden rounded-2xl">
                                <img src={m.src} alt={m.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20" />
                                <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">{m.caption}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="bg-[#0A0D14] py-24 border-y border-white/5">
                <div className="mx-auto max-w-[1200px] px-6">
                    <h2 className="font-display text-3xl mb-12">The Process</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {visual.process.map((p, i) => (
                            <div key={i} className="rounded-2xl border border-white/10 bg-[#050505] p-6">
                                <span className="font-mono text-[#2F7BFF] text-sm">{p.step}</span>
                                <h3 className="mt-4 font-display text-xl">{p.title}</h3>
                                <p className="mt-2 text-sm text-[#8A96A8]">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}