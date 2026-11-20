// app/services/page.tsx
import type { Metadata } from "next";
import Footer from "@/app/components/consultant/Footer";
import Navbar from "@/app/components/consultant/Navbar";
import ServicesHero from "@/app/components/consultant/services/ServicesHero";
import { Catalogue } from "@/app/components/consultant/services/ServicesSections";

export const metadata: Metadata = {
    title: "Services | MindSpace",
    description:
        "Website, mobile app, web application and custom software development — one engineering team across every platform.",
};

/* ============================================================
   HOW WE WORK — Technology process (5 steps, exact wording)
============================================================ */

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
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF] selection:text-white">
            <Navbar />
            <ServicesHero />
            <Catalogue />

            {/* ================= HOW WE WORK (services only) ================= */}
            <section
                id="process"
                className="relative scroll-mt-24 overflow-hidden bg-[#07090F] py-24 text-white lg:py-32"
            >
                <div className="mx-auto max-w-[1240px] px-6">
                    <div className="mb-14 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2F7BFF]">
                            How we work
                        </p>
                        <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em]">
                            How We Work
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[#A9BCD9]">
                            Select a service to see the steps involved.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {TECH_STEPS.map((step, i) => (
                            <div
                                key={step.title}
                                className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#0B0F17] to-[#050505] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#2F7BFF]/60 hover:shadow-[0_24px_60px_-24px_rgba(47,123,255,0.5)]"
                            >
                                <span className="font-mono text-sm text-[#2F7BFF]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="mt-3 font-display text-[1.05rem] leading-snug text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-[#8A96A8]">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 rounded-2xl border border-white/10 bg-[#050505] p-5 text-[12.5px] leading-relaxed text-[#8A96A8]">
                        <strong className="text-[#7CC4FF]">Note:</strong>{" "}
                        Scope, pricing and timelines are agreed before work begins.
                        Changes to agreed scope are handled in writing.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}