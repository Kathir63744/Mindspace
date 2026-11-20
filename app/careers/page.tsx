// app/careers/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";
import { VISUALS, type CareerVisual } from "./[slug]/data";

export const metadata: Metadata = {
    title: "Careers — MindSpace",
    description:
        "Career direction, resume support, interviews, job search, internships and placement. We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed.",
};

const SERVICES = [
    { title: "Career direction", href: "/careers/career-direction", desc: "Role fit, industry mapping, 90-day plan." },
    { title: "Resume & LinkedIn", href: "/careers/resume-linkedin", desc: "ATS rewrite + LinkedIn polish." },
    { title: "Interview coaching", href: "/careers/interview-coaching", desc: "Recorded mocks with written feedback." },
    { title: "Job search support", href: "/careers/job-search-support", desc: "Target list, templates, weekly rhythm." },
    { title: "Internship assistance", href: "/careers/internships", desc: "Matched, project-based internships." },
    { title: "Placement support", href: "/careers/placement-support", desc: "We help you prepare for and connect with relevant opportunities — hiring decisions are made by employers, employment is not guaranteed." },
    { title: "On-the-job readiness", href: "/careers/on-the-job-readiness", desc: "Tools, communication and first-weeks plan." },
];

const METRICS = [
    { value: "12k+", label: "Candidates Placed" },
    { value: "150+", label: "Hiring Partners" },
    { value: "94%", label: "Success Rate" },
    { value: "6-12", label: "Weeks to Ready" },
];

const TESTIMONIALS = [
    {
        quote:
            "The structured path took me from completely lost to having three solid offers in six weeks. The mock interviews were brutally honest and exactly what I needed.",
        author: "Sarah Jenkins",
        role: "Product Designer at TechFlow",
    },
    {
        quote:
            "I had the skills but couldn't get past the ATS. The resume restructuring and warm intros from the placement team changed everything for my career trajectory.",
        author: "David Chen",
        role: "Software Engineer at Vercel",
    },
    {
        quote:
            "MindSpace doesn't just give you generic advice. They map out exactly what you need to do, week by week, and hold you accountable.",
        author: "Elena Rodriguez",
        role: "Data Analyst at Stripe",
    },
];

export default function CareersPage() {
    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* ================= HERO ================= */}
            <section className="relative flex min-h-[85svh] w-full flex-col items-center justify-center overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: "120px 120px",
                            backgroundPosition: "center center",
                        }}
                    />
                    <div className="relative flex h-full w-full max-w-[1400px] flex-wrap items-center justify-center pointer-events-none">
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="absolute h-[120px] w-[120px] border border-[#2F7BFF]/20 bg-[#2F7BFF]/5 shadow-[0_0_30px_rgba(47,123,255,0.1)] transition-all duration-1000 animate-pulse"
                                style={{
                                    top: `${15 + (i % 3) * 25}%`,
                                    left: `${10 + i * 12}%`,
                                    animationDelay: `${i * 300}ms`,
                                    animationDuration: "4s",
                                    borderColor: `rgba(47, 123, 255, ${0.15 + (i % 3) * 0.1})`,
                                    backgroundColor: `rgba(47, 123, 255, ${0.02 + (i % 3) * 0.02})`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center px-6">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#2F7BFF]">
                        <span className="h-2 w-2 rounded-full bg-[#2F7BFF] animate-pulse" />
                        The MindSpace Career Track
                    </div>
                    <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[1.05] tracking-[-0.03em] text-[#2F7BFF] drop-shadow-[0_0_20px_rgba(47,123,255,0.2)]">
                        The Long View
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-[1.8] text-[#A0AEC0] sm:text-[18px]">
                        Our partners are placing bets on what's next. Here's what
                        they're seeing that others aren't, and why they think the
                        next decade will look radically different from the last
                        with AI.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="#process"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[#2F7BFF] px-8 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-transform hover:scale-105 shadow-[0_0_20px_rgba(47,123,255,0.4)]"
                        >
                            Explore Tracks
                        </Link>
                        <Link
                            href="#metrics"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/5"
                        >
                            View Results
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= METRICS ================= */}
            <section id="metrics" className="relative z-20 border-y border-white/10 bg-[#0A0D14]">
                <div className="mx-auto max-w-[1200px] px-6 py-12">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {METRICS.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                                    {metric.value}
                                </p>
                                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#8A96A8]">
                                    {metric.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PLACEMENT EXPLANATION ================= */}
            <section className="relative z-10 mx-auto w-full max-w-[1000px] px-6 py-20">
                <div className="rounded-3xl border border-[#2F7BFF]/25 bg-[#0B0F17] p-8 sm:p-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#2F7BFF]">
                        How placement works
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] tracking-[-0.03em] text-white">
                        We prepare you and connect you. Employers make the hiring decision.
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.8] text-[#A9BCD9]">
                        We help candidates prepare for and connect with relevant job
                        opportunities. Hiring decisions are made by employers, and
                        employment is not guaranteed.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-[#050505] p-5">
                            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7CC4FF]">
                                What we do
                            </h3>
                            <ul className="mt-3 space-y-2 text-[13.5px] leading-snug text-[#D3D8E2]">
                                <li>Prepare your resume, interview and search strategy</li>
                                <li>Make warm introductions to hiring teams we work with</li>
                                <li>Coach you through follow-ups and offer negotiation</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#050505] p-5">
                            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7CC4FF]">
                                What we can&apos;t promise
                            </h3>
                            <ul className="mt-3 space-y-2 text-[13.5px] leading-snug text-[#D3D8E2]">
                                <li>That an employer will make an offer</li>
                                <li>That a role will be open when you apply</li>
                                <li>That any specific outcome is guaranteed</li>
                            </ul>
                        </div>
                    </div>

                    <p className="mt-6 text-[12.5px] leading-relaxed text-[#8A96A8]">
                        We do not charge a fee for employment. All hiring decisions,
                        terms and conditions rest with the employer.
                    </p>
                </div>
            </section>

            {/* ================= FEATURE TILES ================= */}
            <section className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-24">
                <div className="mb-16 flex flex-col items-center text-center">
                    <h2 className="font-display text-4xl font-medium">
                        Visualizing the path
                    </h2>
                    <p className="mt-4 max-w-xl text-[#8A96A8]">
                        A glimpse into the environments and situations we prepare
                        you for.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {(Object.entries(VISUALS) as [string, CareerVisual][])
                        .filter(([slug]) => slug !== "on-the-job-readiness")
                        .slice(0, 3)
                        .map(([slug, visual], i) => (
                            <div
                                key={slug}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F17] transition-all hover:border-[#2F7BFF]/50"
                            >
                                <div className="aspect-square w-full overflow-hidden">
                                    {visual.hero?.src ? (
                                        <img
                                            src={visual.hero.src}
                                            alt={visual.hero.alt || "Career visual"}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-[#1A1F2B] text-[#8A96A8]">
                                            No image available
                                        </div>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F7BFF]">
                                        0{i + 1} // {visual.eyebrow || "Work Readiness"}
                                    </span>
                                    <h3 className="mt-3 font-display text-2xl text-white">
                                        {visual.headline?.join(" ") || "Career Track"}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-[#8A96A8] line-clamp-3">
                                        {visual.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* ================= PROCESS LIST ================= */}
            <section
                id="process"
                className="bg-[#0A0D14] py-24 border-t border-white/5 relative z-10"
            >
                <div className="mx-auto max-w-[1000px] px-6">
                    <div className="mb-16 text-center">
                        <h2 className="font-display text-4xl mb-4">The Process</h2>
                        <p className="text-[#8A96A8]">
                            Seven steps from confusion to placement.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        {SERVICES.map((svc, i) => (
                            <Link
                                key={i}
                                href={svc.href}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 py-10 transition-all hover:bg-white/[0.02] hover:px-6 rounded-xl"
                            >
                                <div className="flex items-center gap-8">
                                    <span className="font-mono text-2xl text-[#2F7BFF] opacity-50 group-hover:opacity-100 transition-opacity">
                                        0{i + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white group-hover:text-[#2F7BFF] transition-colors">
                                            {svc.title}
                                        </h3>
                                        <p className="text-[15px] text-[#8A96A8] mt-2">
                                            {svc.desc}
                                        </p>
                                    </div>
                                </div>
                                <span className="hidden sm:flex items-center gap-2 text-[#2F7BFF] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                                    View details <span>→</span>
                                </span>
                            </Link>
                        ))}
                    </div>

                    <p className="mt-10 rounded-2xl border border-white/10 bg-[#050505] p-5 text-[12.5px] leading-relaxed text-[#8A96A8]">
                        <strong className="text-[#7CC4FF]">Placement note:</strong>{" "}
                        We help candidates prepare for and connect with relevant job
                        opportunities. Hiring decisions are made by employers, and
                        employment is not guaranteed. We do not charge candidates for
                        employment.
                    </p>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section className="py-24 relative z-10">
                <div className="mx-auto max-w-[1200px] px-6">
                    <h2 className="font-display text-4xl mb-16 text-center">
                        Success Stories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <div
                                key={i}
                                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0B0F17] p-8"
                            >
                                <p className="text-[15px] leading-relaxed text-[#A0AEC0] italic">
                                    "{t.quote}"
                                </p>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-[#2F7BFF]/20 flex items-center justify-center text-[#2F7BFF] font-bold">
                                        {t.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">
                                            {t.author}
                                        </p>
                                        <p className="text-xs text-[#8A96A8]">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}