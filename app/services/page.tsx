
import type { Metadata } from "next";
import { Questrial } from "next/font/google";

import Footer from "@/app/components/consultant/Footer";
import Navbar from "@/app/components/consultant/Navbar";
import ServicesHero from "@/app/components/consultant/services/ServicesHero";

import { Catalogue } from "../components/consultant/services/ServicesSections";
import {
    MAIN_THEMES,
    getThemeVariables,
} from "../components/consultant/themes/MindSpaceTheme";

const questrial = Questrial({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
    variable: "--font-questrial",
});

export const metadata: Metadata = {
    title: "Services | MindSpace",
    description:
        "Website, mobile app, web application and custom software development — one engineering team across every platform.",
};

const theme = MAIN_THEMES.technology;

const TECH_STEPS = [
    {
        title: "Discuss Your Requirements",
        body: "Tell us about your business, users and project goals.",
    },
    {
        title: "Define the Scope",
        body: "We agree on features, deliverables, pricing and timelines.",
    },
    {
        title: "Design & Develop",
        body: "We create the solution and share progress for review.",
    },
    {
        title: "Test & Launch",
        body: "We test the agreed functionality and prepare the solution for launch.",
    },
    {
        title: "Support & Maintain",
        body: "We provide support and maintenance according to the agreed arrangement.",
    },
];

export default function ServicesPage() {
    return (
        <div
            id="mindspace-services-page"
            className={`${questrial.className} ${questrial.variable} min-h-screen bg-[var(--ms-background)] text-[var(--ms-text)]`}
            style={getThemeVariables(theme)}
        >
            <Navbar />

            <ServicesHero />

            <Catalogue />

            <section
                id="process"
                className="relative scroll-mt-24 overflow-hidden bg-[var(--ms-background)] py-24 text-[var(--ms-text)] lg:py-32"
            >
                <div className="mx-auto max-w-[1240px] px-6">
                    <div className="mb-14 text-center">
                        <p
                            className="text-[11px] font-semibold uppercase tracking-[0.24em]"
                            style={{ color: "var(--ms-accent)" }}
                        >
                            How we work
                        </p>

                        <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em] text-[var(--ms-text)]">
                            How We Work
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[var(--ms-muted)]">
                            Select a service to see the steps involved.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {TECH_STEPS.map((step, i) => (
                            <div
                                key={step.title}
                                className="relative flex flex-col rounded-2xl border border-white/10 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--ms-accent)] hover:shadow-[0_24px_60px_-24px_var(--ms-accent)]"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, color-mix(in srgb, var(--ms-background) 88%, var(--ms-accent) 6%), color-mix(in srgb, var(--ms-background) 95%, var(--ms-accent) 2%))",
                                }}
                            >
                                <span
                                    className="font-mono text-sm"
                                    style={{ color: "var(--ms-accent)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <h3 className="mt-3 text-[1.05rem] leading-snug text-[var(--ms-text)]">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-[13px] leading-relaxed text-[var(--ms-muted)]">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p
                        className="mt-10 rounded-2xl border border-white/10 p-5 text-[12.5px] leading-relaxed text-[var(--ms-muted)]"
                        style={{
                            background:
                                "color-mix(in srgb, var(--ms-background) 92%, var(--ms-accent) 4%)",
                        }}
                    >
                        <strong style={{ color: "var(--ms-accent)" }}>
                            Note:
                        </strong>{" "}
                        Scope, pricing and timelines are agreed before work
                        begins. Changes to agreed scope are handled in writing.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
