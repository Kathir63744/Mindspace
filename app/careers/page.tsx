
// app/careers/page.tsx

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Questrial } from "next/font/google";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

export const metadata: Metadata = {
    title: "Career Development & Placement Support | MindSpace",
    description:
        "Explore career guidance, resume development, interview coaching, internship assistance and placement support with MindSpace.",
};

const questrial = Questrial({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

/* =========================================================
   CAREERS & PLACEMENTS SERVICES
========================================================= */

const CAREER_SERVICES = [
    {
        number: "01",
        category: "Career planning",
        title: "Career Direction",
        description:
            "Understand your strengths, explore suitable career paths and create a clearer direction for your professional journey.",
        href: "/careers/career-direction",
        keyword: "Discover your direction",
    },
    {
        number: "02",
        category: "Professional profile",
        title: "Resume & LinkedIn",
        description:
            "Build a stronger professional presence with structured resumes, improved LinkedIn profiles and clear career positioning.",
        href: "/careers/resume-linkedin",
        keyword: "Present your potential",
    },
    {
        number: "03",
        category: "Interview preparation",
        title: "Interview Coaching",
        description:
            "Develop your communication, confidence and interview approach through focused preparation and practical guidance.",
        href: "/careers/interview-coaching",
        keyword: "Prepare with confidence",
    },
    {
        number: "04",
        category: "Job opportunities",
        title: "Job Search Support",
        description:
            "Navigate your job search with guidance on finding relevant opportunities, applications and professional follow-ups.",
        href: "/careers/job-search-support",
        keyword: "Find relevant opportunities",
    },
    {
        number: "05",
        category: "Early career",
        title: "Internship Assistance",
        description:
            "Explore internship opportunities and prepare to turn academic knowledge into practical workplace experience.",
        href: "/careers/internships",
        keyword: "Start gaining experience",
    },
    {
        number: "06",
        category: "Career opportunities",
        title: "Placement Support",
        description:
            "Receive structured preparation and assistance connecting with relevant employment opportunities.",
        href: "/careers/placement-support",
        keyword: "Move towards employment",
    },
    {
        number: "07",
        category: "Workplace preparation",
        title: "On-the-Job Readiness",
        description:
            "Build workplace awareness, professional communication and the practical skills needed to enter a working environment.",
        href: "/careers/on-the-job-readiness",
        keyword: "Get workplace ready",
    },
];

/* =========================================================
   CAREERS THEME — PURPLE
========================================================= */

const themeVars = {
    "--ms-background": "#261549",
    "--ms-background-alt": "#1C1036",
    "--ms-surface": "#2F1B5C",
    "--ms-surface-alt": "#3A226B",
    "--ms-border": "rgba(157, 102, 255, 0.20)",
    "--ms-text": "#F5F0FF",
    "--ms-secondary": "#E4D7FA",
    "--ms-muted": "#C9B9E5",
    "--ms-accent": "#9D66FF",
    "--ms-accent-soft": "rgba(157, 102, 255, 0.12)",
    "--ms-glow": "rgba(157, 102, 255, 0.17)",
} as CSSProperties;

/* =========================================================
   PAGE
========================================================= */

export default function CareersPage() {
    return (
        <main
            className={`${questrial.className} careers-page relative min-h-screen overflow-hidden bg-[var(--ms-background)] text-[var(--ms-text)]`}
            style={themeVars}
        >
            <style>{`
                .careers-page,
                .careers-page * {
                    font-family: ${questrial.style.fontFamily}, sans-serif;
                }

                /* =================================================
                   SHARED NAVBAR-ALIGNED PAGE SPACING
                ================================================= */

                .careers-page .careers-hero {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .careers-page .careers-content {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                @media (min-width: 640px) {
                    .careers-page .careers-hero,
                    .careers-page .careers-content {
                        padding-left: 32px;
                        padding-right: 32px;
                    }
                }

                @media (min-width: 1024px) {
                    .careers-page .careers-hero,
                    .careers-page .careers-content {
                        padding-left: 56px;
                        padding-right: 56px;
                    }
                }

                .career-card {
                    transition:
                        border-color 300ms ease,
                        background-color 300ms ease,
                        transform 300ms ease;
                }

                .career-card:hover {
                    transform: translateY(-4px);
                }

                .career-card .career-arrow {
                    transition:
                        transform 300ms ease,
                        background-color 300ms ease,
                        border-color 300ms ease;
                }

                .career-card:hover .career-arrow {
                    transform: translate(3px, -3px);
                }
            `}</style>

            <Navbar />

            {/* =====================================================
                HERO
            ===================================================== */}

            <div className="careers-page">
                <section className="careers-hero relative flex min-h-[420px] items-center justify-center overflow-hidden pb-16 pt-32 text-center sm:min-h-[470px] sm:pb-20 sm:pt-36">
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at 50% 0%, var(--ms-glow), transparent 65%)",
                        }}
                    />

                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.12]"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #A99AC5 1px, transparent 1px),
                                linear-gradient(to bottom, #A99AC5 1px, transparent 1px)
                            `,
                            backgroundSize: "76px 76px",
                            maskImage:
                                "linear-gradient(to bottom, black, transparent 85%)",
                        }}
                    />

                    <div className="relative z-10 mx-auto w-full max-w-4xl">
                        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[var(--ms-border)] bg-[var(--ms-surface)] px-4 py-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ms-accent)] shadow-[0_0_12px_var(--ms-accent)]" />

                            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--ms-secondary)]">
                                Careers & Placements
                            </span>
                        </div>

                        <h1 className="text-[clamp(2.5rem,6.5vw,5rem)] font-normal leading-[1.04] tracking-[-0.045em]">
                            Build your career.
                            <span className="mt-2 block text-[var(--ms-accent)]">
                                Move with purpose.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[var(--ms-muted)] sm:text-base sm:leading-8">
                            Every professional journey starts somewhere.
                            Find the guidance, preparation and support that
                            help you take your next step with clarity.
                        </p>

                        <Link
                            href="#career-services"
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--ms-accent)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
                        >
                            Explore career services
                            <span aria-hidden="true">↘</span>
                        </Link>
                    </div>

                    <div className="absolute bottom-0 left-1/2 h-px w-[min(88%,1000px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ms-border)] to-transparent" />
                </section>

                {/* =================================================
                    CAREER SERVICES GRID
                ================================================= */}

                <section
                    id="career-services"
                    className="careers-content relative mx-auto max-w-[1240px] pb-20 pt-10 sm:pb-24"
                >
                    <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-11 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--ms-accent)]">
                                Find your next step
                            </p>

                            <h2 className="mt-3 text-3xl font-normal tracking-tight sm:text-4xl">
                                Career services
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-7 text-[var(--ms-muted)] sm:text-right">
                            Explore focused support for every stage of your
                            professional journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {CAREER_SERVICES.map((service) => (
                            <Link
                                key={service.number}
                                href={service.href}
                                className="career-card group relative flex min-h-[235px] flex-col overflow-hidden rounded-2xl border border-[var(--ms-border)] bg-[var(--ms-surface)] p-6 sm:p-7"
                            >
                                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--ms-accent)] opacity-0 blur-[75px] transition-opacity duration-500 group-hover:opacity-[0.16]" />

                                <div className="relative flex items-center justify-between gap-3">
                                    <span className="font-mono text-xs tracking-wider text-[var(--ms-accent)]">
                                        / {service.number}
                                    </span>

                                    <span className="rounded-full border border-[var(--ms-border)] px-3 py-1.5 text-[10px] tracking-wide text-[var(--ms-muted)]">
                                        {service.category}
                                    </span>
                                </div>

                                <div className="relative mt-7 flex-1">
                                    <h3 className="text-[21px] font-normal leading-tight tracking-tight text-[var(--ms-text)] transition-colors duration-300 group-hover:text-[var(--ms-accent)] sm:text-[23px]">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 max-w-[370px] text-[14px] leading-7 text-[var(--ms-muted)]">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="relative mt-6 flex items-center justify-between border-t border-[var(--ms-border)] pt-4">
                                    <span className="text-xs tracking-wide text-[var(--ms-secondary)]">
                                        {service.keyword}
                                    </span>

                                    <span className="career-arrow flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ms-border)] text-[var(--ms-secondary)] group-hover:border-[var(--ms-accent)] group-hover:bg-[var(--ms-accent)] group-hover:text-white">
                                        ↗
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* =================================================
                        PLACEMENT TRANSPARENCY
                    ================================================= */}

                    <div className="mt-8 flex flex-col gap-3 rounded-xl border border-[var(--ms-border)] bg-[var(--ms-background-alt)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.17em] text-[var(--ms-accent)]">
                                A transparent approach
                            </p>

                            <p className="mt-2 text-sm leading-6 text-[var(--ms-muted)]">
                                We support your preparation and connect you with
                                relevant opportunities. Hiring decisions remain
                                with employers; employment is not guaranteed.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--ms-secondary)] transition-colors hover:text-[var(--ms-accent)]"
                        >
                            Talk to us <span>↗</span>
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}
