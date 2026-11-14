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
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">{service.pillar} Track</span>
                    <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                        {service.title}
                    </h1>
                    <p className="mt-6 text-[17px] leading-[1.6] text-[#8A96A8]">{visual.sub}</p>

                    <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Format</p>
                            <p className="font-display text-lg mt-1 text-white">Live & Project-Based</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Outcome</p>
                            <p className="font-display text-lg mt-1 text-white">Certificate</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10">
                        <img src={visual.hero.src} alt={visual.hero.alt} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
                    </div>
                </div>
            </section>

            {/* MODULES / HIGHLIGHTS */}
            <section className="bg-[#0A0D14] py-24">
                <div className="mx-auto max-w-[1000px] px-6">
                    <h2 className="font-display text-3xl mb-10 text-center">What you will build.</h2>
                    <div className="space-y-4">
                        {visual.highlights.map((h, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-white/5 bg-[#050505] p-6 sm:items-center">
                                <span className="font-mono text-2xl text-[#2F7BFF]/50">0{i + 1}</span>
                                <div>
                                    <h3 className="font-display text-xl text-white">{h.title}</h3>
                                    <p className="text-sm text-[#8A96A8] mt-1">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="mx-auto max-w-[1200px] px-6 py-24">
                <h2 className="font-display text-3xl mb-12">How the track runs</h2>
                <div className="flex flex-col border-l border-white/10 pl-6 ml-2 space-y-10">
                    {visual.process.map((p, i) => (
                        <div key={i} className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#2F7BFF]" />
                            <h3 className="font-display text-xl">{p.title}</h3>
                            <p className="text-sm text-[#8A96A8] mt-1 max-w-md">{p.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}