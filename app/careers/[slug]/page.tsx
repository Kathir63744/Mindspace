import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { SERVICES, VISUALS } from "./data";

export const instant = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return SERVICES.map((s: { slug: any; }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((s: { slug: string; }) => s.slug === slug);
    if (!service) return { title: "Not found" };
    return { title: `${service.title} — Careers`, description: service.need };
}

export default async function CareersDetail({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES.find((s: { slug: string; }) => s.slug === slug);
    const visual = VISUALS[slug];
    if (!service || !visual) notFound();

    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* CENTERED HERO - MATCHES MAIN PAGE STYLE */}
            <section className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden pt-32 pb-20 text-center">
                {/* Grid Backdrop */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        backgroundPosition: 'center center',
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,123,255,0.1),transparent_50%)]" />
                
                <div className="relative z-10 mx-auto max-w-4xl px-6">
                   
                    <div>
                        
                    </div>
                    
                    <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white">
                        {service.title}
                    </h1>
                    
                    <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.7] text-[#8A96A8]">
                        {visual.sub}
                    </p>
                </div>
            </section>

            {/* FLOATING STATS */}
            <div className="relative z-20 mx-auto -mt-10 max-w-[800px] px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#0A0D14] p-6 shadow-2xl">
                    <div className="text-center p-4">
                        <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Timeline</p>
                        <p className="mt-2 font-display text-xl text-white">1-2 Weeks</p>
                    </div>
                    <div className="text-center p-4">
                        <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Format</p>
                        <p className="mt-2 font-display text-xl text-white">1:1 Coaching</p>
                    </div>
                    <div className="text-center p-4">
                        <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Outcome</p>
                        <p className="mt-2 font-display text-xl text-white">Ready to apply</p>
                    </div>
                </div>
            </div>

            {/* HERO IMAGE / MOSAIC VISUAL */}
            <section className="mx-auto max-w-[1000px] px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visual.mosaic?.map((img: any, i: number) => (
                        <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                             <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                             <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider text-white">
                                 {img.caption}
                             </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHAT YOU GET (HIGHLIGHTS) */}
            <section className="mx-auto max-w-[1000px] px-6 pb-24">
                <h2 className="font-display text-3xl mb-10 text-center">What you will get</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    {visual.highlights.map((h: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; body: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
                        <div key={i} className="rounded-2xl border border-white/10 bg-[#0B0F17] p-8">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2F7BFF]/10 text-[#2F7BFF] font-bold text-xl">
                                ✓
                            </div>
                            <h3 className="font-display text-xl text-white">{h.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#8A96A8] mt-3">{h.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PROCESS STEPS */}
            <section className="bg-[#0A0D14] py-24 border-y border-white/5">
                <div className="mx-auto max-w-[1000px] px-6">
                    <h2 className="font-display text-3xl mb-12 text-center">How it works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {visual.process?.map((step: any, i: number) => (
                            <div key={i} className="relative p-6 rounded-2xl bg-[#050505] border border-white/5">
                                <span className="text-[#2F7BFF] font-mono text-sm mb-4 block">{step.step}</span>
                                <h4 className="font-display text-lg text-white mb-2">{step.title}</h4>
                                <p className="text-sm text-[#8A96A8]">{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24">
                <div className="mx-auto max-w-[800px] px-6">
                    <h2 className="font-display text-3xl mb-10 text-center">Common questions</h2>
                    <div className="space-y-4">
                        {visual.faq.map((f: { q: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; a: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
                            <details key={i} className="group rounded-2xl border border-white/10 bg-[#0B0F17] p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between text-white font-medium text-lg">
                                    <span>{f.q}</span>
                                    <span className="text-[#2F7BFF] text-2xl transition-transform duration-300 group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 text-[15px] leading-relaxed text-[#8A96A8] border-t border-white/5 pt-4">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-24 relative overflow-hidden border-t border-white/5 bg-[#0A0D14]">
                <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                    <h2 className="font-display text-4xl font-bold mb-6">Ready to start?</h2>
                    <p className="text-[#8A96A8] mb-8 text-lg">Book a free 15-minute discovery call to see if this track is right for you.</p>
                    <Link 
                        href="/contact"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-[#2F7BFF] px-10 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
                    >
                        Book Discovery Call
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}