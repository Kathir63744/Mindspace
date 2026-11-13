import Link from "next/link";
import Image from "next/image";
import { DM_Sans, Manrope } from "next/font/google";

import Navbar from "../consultant/Navbar";
import Footer from "../consultant/Footer";

const headingFont = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--svc-heading",
});

const bodyFont = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--svc-body",
});

export type PillarService = {
    title: string;
    href: string;
    need: string;
};

export type PillarLandingData = {
    slug: string;
    label: string;
    eyebrow: string;
    headline: [string, string];
    sub: string;
    hero: { src: string; alt: string };
    proofPoints: { value: string; label: string }[];
    services: PillarService[];
    gallery: { src: string; alt: string; caption: string; span?: string }[];
    whyTitle: string;
    whyBody: string;
    whyItems: { title: string; body: string }[];
    quote: { text: string; source: string };
    closing: { title: string; body: string };
};

export default function PillarLanding({ data }: { data: PillarLandingData }) {
    return (
        <main
            className={`${headingFont.variable} ${bodyFont.variable} overflow-hidden bg-[#050505] text-[#F3F5FA] [font-family:var(--svc-body)] selection:bg-[#2F7BFF] selection:text-white`}
        >
            <Navbar />

            {/* HERO */}
            <section className="relative isolate min-h-[82svh] overflow-hidden">
                <Image src={data.hero.src} alt={data.hero.alt} fill priority sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#050505]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(47,123,255,0.22),transparent_60%)]" />

                <div className="relative mx-auto flex min-h-[82svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-40 sm:px-8 sm:pb-24 lg:px-14 xl:px-20">
                    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8A96A8]">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <span className="text-[#2F7BFF]">/</span>
                        <span className="text-[#A9C7FF]">{data.label}</span>
                    </nav>

                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#2F7BFF]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#A9C7FF]">
                            {data.eyebrow}
                        </p>
                    </div>

                    <h1 className="max-w-[1150px] text-[clamp(2.4rem,7vw,6.6rem)] font-semibold leading-[0.96] tracking-[-0.075em] [font-family:var(--svc-heading)]">
                        {data.headline[0]}
                        <br />
                        <span className="text-[#86ACFF]">{data.headline[1]}</span>
                    </h1>

                    <div className="mt-8 flex max-w-[900px] flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                        <p className="max-w-[560px] text-[14px] leading-[1.85] text-[#C7D1DE] sm:text-[15px] sm:leading-[1.95]">
                            {data.sub}
                        </p>
                        <Link
                            href="#services"
                            className="inline-flex min-h-[52px] items-center gap-3 bg-[#2F7BFF] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_40px_rgba(47,123,255,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#4a8cff]"
                        >
                            See {data.label} services <span aria-hidden="true">↓</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* divider */}
            <div className="relative h-[26px] overflow-hidden bg-[#2F7BFF] sm:h-[34px]" />

            {/* PROOF POINTS */}
            <section className="relative bg-[#050505] py-12 sm:py-16">
                <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-8 sm:grid-cols-4 sm:gap-4">
                        {data.proofPoints.map((p) => (
                            <div key={p.label}>
                                <div className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-none tracking-[-0.06em] text-[#F3F5FA] [font-family:var(--svc-heading)]">
                                    {p.value}
                                </div>
                                <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#8A96A8]">
                                    {p.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="relative scroll-mt-24 bg-[#050505] py-16 sm:py-24">
                <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF]">
                                What we offer
                            </p>
                            <h2 className="max-w-[900px] text-[clamp(2rem,5.5vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.07em] [font-family:var(--svc-heading)]">
                                Every step,
                                <br />
                                <span className="text-[#2F7BFF]">covered.</span>
                            </h2>
                        </div>
                        <div className="lg:col-span-4 lg:justify-self-end">
                            <p className="max-w-[340px] text-[13px] leading-[1.9] text-[#8A96A8]">
                                Pick the specific service you need, or start a conversation and we&rsquo;ll point the way.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 border-t border-white/10 sm:gap-4">
                        {data.services.map((svc, i) => (
                            <Link
                                key={svc.href}
                                href={svc.href}
                                className="group grid gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.03] sm:py-8 lg:grid-cols-[60px_1fr_1fr_50px] lg:items-center lg:gap-8"
                            >
                                <span className="font-mono text-[11px] text-[#2F7BFF]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-[clamp(1.4rem,3.4vw,2rem)] font-semibold tracking-[-0.05em] text-[#F3F5FA] transition-colors group-hover:text-[#2F7BFF] [font-family:var(--svc-heading)]">
                                    {svc.title}
                                </h3>
                                <p className="text-[13px] leading-[1.8] text-[#8A96A8]">
                                    You need this when {svc.need}.
                                </p>
                                <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all group-hover:border-[#2F7BFF] group-hover:bg-[#2F7BFF] lg:flex">
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="relative overflow-hidden bg-[#0B0F17] py-20 sm:py-28">
                <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mb-10 sm:mb-14">
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF]">Showcase</p>
                        <h2 className="max-w-[700px] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.06em] [font-family:var(--svc-heading)]">
                            A closer look.
                        </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-12">
                        {data.gallery.map((m, i) => (
                            <div key={i} className={`group relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#0F131C] sm:aspect-auto sm:min-h-[260px] ${m.span ?? "md:col-span-6"}`}>
                                <Image
                                    src={m.src}
                                    alt={m.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 40vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
                                <div className="absolute inset-0 bg-[#2F7BFF]/0 transition-colors duration-500 group-hover:bg-[#2F7BFF]/10" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
                                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-6">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/90">
                                        {m.caption}
                                    </span>
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm">
                                        ↗
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY */}
            <section className="relative overflow-hidden bg-[#050505] py-20 sm:py-28">
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-[380px] w-[380px] rounded-full bg-[#2F7BFF]/[0.10] blur-[140px]" />
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A9C7FF]">
                                Why MindSpace
                            </p>
                            <h2 className="max-w-[560px] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.07em] [font-family:var(--svc-heading)]">
                                {data.whyTitle}
                            </h2>
                            <p className="mt-6 max-w-[440px] text-[14px] leading-[1.9] text-[#9AA6B7]">
                                {data.whyBody}
                            </p>
                        </div>
                        <div className="lg:col-span-6 lg:col-start-7">
                            {data.whyItems.map((item) => (
                                <article key={item.title} className="border-t border-white/12 py-7 sm:py-8">
                                    <h3 className="text-[clamp(1.3rem,2.6vw,1.8rem)] font-semibold tracking-[-0.04em] text-white [font-family:var(--svc-heading)]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-[13px] leading-[1.85] text-[#8A96A8]">{item.body}</p>
                                </article>
                            ))}
                            <div className="border-t border-white/12" />
                        </div>
                    </div>
                </div>
            </section>

            {/* QUOTE */}
            <section className="relative overflow-hidden bg-[#0B0F17] py-20 sm:py-28">
                <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
                    <blockquote className="relative">
                        <p className="text-[clamp(1.4rem,3.4vw,2.6rem)] font-semibold leading-[1.25] tracking-[-0.04em] text-[#F3F5FA] [font-family:var(--svc-heading)]">
                            &ldquo;{data.quote.text}&rdquo;
                        </p>
                        <footer className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[#8A96A8]">
                            — {data.quote.source}
                        </footer>
                    </blockquote>
                </div>
            </section>

            {/* CLOSING */}
            <section className="relative overflow-hidden bg-[#050505] pb-24 pt-20 sm:pb-32 sm:pt-28">
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="flex flex-col items-start gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A9C7FF]">
                                Ready when you are
                            </p>
                            <h2 className="max-w-[900px] text-[clamp(2rem,5vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.07em] [font-family:var(--svc-heading)]">
                                {data.closing.title}
                            </h2>
                            <p className="mt-4 max-w-[560px] text-[13px] leading-[1.85] text-[#8A96A8]">
                                {data.closing.body}
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group inline-flex min-h-[56px] items-center gap-4 bg-[#2F7BFF] px-7 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_40px_rgba(47,123,255,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#4a8cff]"
                        >
                            Talk to an Expert
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}