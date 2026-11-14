import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

export const metadata: Metadata = {
    title: "Training — MindSpace",
    description: "Practical technical programmes.",
};

const SERVICES = [
    { title: "Programming foundations", href: "/training/programming-foundations", tag: "Foundation" },
    { title: "Web development", href: "/training/web-development", tag: "Frontend & Backend" },
    { title: "Mobile app development", href: "/training/app-development", tag: "React Native" },
    { title: "Data & AI basics", href: "/training/data-ai", tag: "Data Science" },
    { title: "Cloud & DevOps", href: "/training/cloud-devops", tag: "Infrastructure" },
    { title: "Portfolio & certification", href: "/training/portfolio-certification", tag: "Career Prep" },
];

export default function TrainingPage() {
    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* CENTERED MINIMAL HERO */}
            <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden pt-32 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,123,255,0.15),transparent_50%)]" />
                <div className="relative z-10 mx-auto max-w-3xl px-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF] mb-6">Practical Learning</p>
                    <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                        Skills that ship<br />to production.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.7] text-[#8A96A8]">
                        Hands-on programmes, real projects and certificates — built around what employers are actually hiring for.
                    </p>
                </div>
            </section>

            {/* SYLLABUS GRID */}
            <section className="mx-auto max-w-[1200px] px-6 pb-32">
                <div className="grid gap-4 sm:grid-cols-2">
                    {SERVICES.map((svc, i) => (
                        <Link key={i} href={svc.href} className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0F17] p-8 transition-colors hover:border-[#2F7BFF] hover:bg-[#0F1522]">
                            <div>
                                <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A96A8] mb-4">
                                    {svc.tag}
                                </span>
                                <h3 className="font-display text-2xl text-white group-hover:text-[#2F7BFF] transition-colors">{svc.title}</h3>
                            </div>
                            <div className="mt-8 flex items-center justify-between text-sm text-[#8A96A8]">
                                <span>View curriculum</span>
                                <span className="text-xl">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}