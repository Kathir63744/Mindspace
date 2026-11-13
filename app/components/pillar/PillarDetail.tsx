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



export type DetailService = {
    title: string;
    slug: string;
    need: string;
};

export type DetailVisual = {
    eyebrow: string;
    headline: [string, string];
    sub: string;
    hero: { src: string; alt: string };
    mosaic: { src: string; alt: string; caption: string; span?: string }[];
    highlights: { title: string; body: string }[];
    process: { step: string; title: string; body: string }[];
    faq: { q: string; a: string }[];
};

/* ============================================================
   COMPONENT
============================================================ */

type Props = {
    pillarLabel: string;
    pillarSlug: string;
    service: DetailService;
    allServices: DetailService[];
    visual: DetailVisual;
};

export default function PillarDetail({
    pillarLabel,
    pillarSlug,
    service,
    allServices,
    visual,
}: Props) {
    const related = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

    return (
        <main
            className={`${headingFont.variable} ${bodyFont.variable} overflow-hidden bg-[#050505] text-[#F3F5FA] [font-family:var(--svc-body)] selection:bg-[#2F7BFF] selection:text-white`}
        >
            <Navbar />

            {/* HERO */}
            <section className="relative isolate min-h-[86svh] overflow-hidden">
                <Image
                    src={visual.hero.src}
                    alt={visual.hero.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[#050505]/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(47,123,255,0.22),transparent_60%)]" />

                <div className="relative mx-auto flex min-h-[86svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-40 sm:px-8 sm:pb-24 lg:px-14 xl:px-20">
                    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8A96A8]">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <span className="text-[#2F7BFF]">/</span>
                        <Link href={`/${pillarSlug}`} className="hover:text-white">
                            {pillarLabel}
                        </Link>
                        <span className="text-[#2F7BFF]">/</span>
                        <span className="text-[#A9C7FF]">{service.title}</span>
                    </nav>

                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#2F7BFF]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#A9C7FF]">
                            {visual.eyebrow}
                        </p>
                    </div>

                    <h1 className="max-w-[1150px] text-[clamp(2.4rem,7vw,7rem)] font-semibold leading-[0.96] tracking-[-0.075em] [font-family:var(--svc-heading)]">
                        {visual.headline[0]}
                        <br />
                        <span className="text-[#86ACFF]">{visual.headline[1]}</span>
                    </h1>

                    <div className="mt-8 flex max-w-[900px] flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                        <p className="max-w-[560px] text-[14px] leading-[1.85] text-[#C7D1DE] sm:text-[15px] sm:leading-[1.95]">
                            {visual.sub}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-[52px] items-center gap-3 bg-[#2F7BFF] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_40px_rgba(47,123,255,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#4a8cff]"
                            >
                                Talk to an Expert <span aria-hidden="true">→</span>
                            </Link>
                            <Link
                                href="#highlights"
                                className="inline-flex min-h-[52px] items-center gap-3 border border-white/25 px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 transition-all hover:border-[#2F7BFF] hover:text-white"
                            >
                                What&rsquo;s included
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A96A8]">Focus</span>
                        <span className="text-[13px] text-white/90">{service.title}</span>
                        <span className="hidden text-white/25 sm:inline">·</span>
                        <span className="hidden text-[12px] text-[#8A96A8] sm:inline">
                            You need this when {service.need}.
                        </span>
                    </div>
                </div>
            </section>

            <div className="relative h-[26px] overflow-hidden bg-[#2F7BFF] sm:h-[34px]" />

            {/* HIGHLIGHTS */}
            <section id="highlights" className="relative scroll-mt-24 overflow-hidden bg-[#050505] py-20 sm:py-28">
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF]">
                                What this covers
                            </p>
                            <h2 className="max-w-[900px] text-[clamp(2rem,5.5vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.07em] [font-family:var(--svc-heading)]">
                                Everything you need
                                <br />
                                <span className="text-[#2F7BFF]">in one place.</span>
                            </h2>
                        </div>
                        <div className="lg:col-span-4 lg:justify-self-end">
                            <p className="max-w-[340px] text-[13px] leading-[1.9] text-[#8A96A8]">
                                A structured set of steps built around the outcome you want.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                        {visual.highlights.map((h, i) => (
                            <article
                                key={h.title}
                                className="group relative overflow-hidden rounded-[14px] border border-white/10 bg-[#0B0F17] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2F7BFF]/50 hover:bg-[#0F131C] sm:p-7"
                            >
                                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2F7BFF]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#2F7BFF]/30" />
                                <span className="relative font-mono text-[11px] text-[#2F7BFF]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="relative mt-4 text-[18px] font-semibold tracking-[-0.02em] text-[#F3F5FA] [font-family:var(--svc-heading)] sm:text-[20px]">
                                    {h.title}
                                </h3>
                                <p className="relative mt-2 text-[13px] leading-[1.75] text-[#8A96A8]">
                                    {h.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* MOSAIC */}
            <section className="relative overflow-hidden bg-[#0B0F17] py-20 sm:py-28">
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF]">
                                Showcase
                            </p>
                            <h2 className="max-w-[700px] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.06em] [font-family:var(--svc-heading)]">
                                A closer look at the work.
                            </h2>
                        </div>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 self-start text-[11px] font-bold uppercase tracking-[0.15em] text-[#A9C7FF] hover:text-white"
                        >
                            Start your journey
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-12">
                        {visual.mosaic.map((m, i) => (
                            <div
                                key={i}
                                className={`group relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#0F131C] sm:aspect-auto sm:min-h-[260px] ${m.span ?? "md:col-span-6"}`}
                            >
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
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all group-hover:border-[#2F7BFF] group-hover:bg-[#2F7BFF]">
                                        ↗
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="relative overflow-hidden bg-[#050505] py-20 sm:py-28">
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mb-12 sm:mb-16">
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF]">
                            The process
                        </p>
                        <h2 className="max-w-[800px] text-[clamp(2rem,5.5vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.07em] [font-family:var(--svc-heading)]">
                            How it works, <span className="text-[#2F7BFF]">step by step.</span>
                        </h2>
                    </div>

                    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {visual.process.map((p) => (
                            <article
                                key={p.step}
                                className="relative overflow-hidden rounded-[14px] border border-white/10 bg-gradient-to-b from-[#0F131C] to-[#080B12] p-6"
                            >
                                <span className="text-[32px] font-semibold leading-none tracking-[-0.06em] text-[#2F7BFF]/70 [font-family:var(--svc-heading)]">
                                    {p.step}
                                </span>
                                <h3 className="mt-4 text-[18px] font-semibold text-[#F3F5FA] [font-family:var(--svc-heading)]">
                                    {p.title}
                                </h3>
                                <p className="mt-2 text-[13px] leading-[1.75] text-[#8A96A8]">{p.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative overflow-hidden bg-[#0B0F17] py-20 sm:py-28">
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-4">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF]">
                                Common questions
                            </p>
                            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.06em] [font-family:var(--svc-heading)]">
                                Things people ask before starting.
                            </h2>
                        </div>
                        <div className="lg:col-span-7 lg:col-start-6">
                            {visual.faq.map((f) => (
                                <details
                                    key={f.q}
                                    className="group border-t border-white/10 py-5 last:border-b last:border-white/10"
                                >
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                                        <span className="text-[15px] font-semibold text-white [font-family:var(--svc-heading)] sm:text-[16px]">
                                            {f.q}
                                        </span>
                                        <span className="mt-1 text-[#2F7BFF] transition-transform group-open:rotate-45">
                                            +
                                        </span>
                                    </summary>
                                    <p className="mt-3 max-w-[640px] text-[13px] leading-[1.85] text-[#8A96A8]">
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED */}
            {related.length > 0 && (
                <section className="relative overflow-hidden bg-[#050505] py-20 sm:py-24">
                    <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                        <div className="mb-8 flex items-end justify-between">
                            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.05em] [font-family:var(--svc-heading)]">
                                More in <span className="text-[#2F7BFF]">{pillarLabel}</span>
                            </h2>
                        </div>
                        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/${pillarSlug}/${r.slug}`}
                                    className="group relative overflow-hidden rounded-[14px] border border-white/10 bg-[#0B0F17] p-6 transition-all hover:-translate-y-1 hover:border-[#2F7BFF]/50"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">
                                        {pillarLabel}
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-semibold text-white [font-family:var(--svc-heading)]">
                                        {r.title}
                                    </h3>
                                    <p className="mt-2 text-[13px] leading-[1.75] text-[#8A96A8]">
                                        You need this when {r.need}.
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#A9C7FF] group-hover:text-white">
                                        Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CLOSING */}
            <section className="relative overflow-hidden bg-[#050505] pb-24 pt-20 sm:pb-32 sm:pt-28">
                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="flex flex-col items-start gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A9C7FF]">
                                Ready when you are
                            </p>
                            <h2 className="max-w-[900px] text-[clamp(2rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.07em] [font-family:var(--svc-heading)]">
                                Start with a <span className="text-[#2F7BFF]">conversation.</span>
                            </h2>
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