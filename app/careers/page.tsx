import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

export const metadata: Metadata = {
    title: "Careers — MindSpace",
    description: "Career direction and placement support.",
};

const SERVICES = [
    { title: "Career direction", href: "/careers/career-direction", desc: "Role fit and industry mapping." },
    { title: "Resume & LinkedIn", href: "/careers/resume-linkedin", desc: "Restructured, ATS-friendly." },
    { title: "Interview coaching", href: "/careers/interview-coaching", desc: "Mock interviews with feedback." },
    { title: "Internships", href: "/careers/internships", desc: "Matched opportunities." },
    { title: "Placement support", href: "/careers/placement-support", desc: "Warm introductions." },
    { title: "On-the-job readiness", href: "/careers/on-the-job-readiness", desc: "Tools for day one." },
];

export default function CareersPage() {
    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* DASHBOARD HERO */}
            <section className="relative flex min-h-[80svh] w-full items-center overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,123,255,0.2),transparent_40%)]" />
                <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start px-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Accepting new candidates
                        </div>
                        <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                            Prepare for<br />the work ahead.
                        </h1>
                        <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-[#8A96A8]">
                            Career direction, resumes, interviews, internships and placement support in one structured track.
                        </p>
                    </div>

                    <div className="mt-12 grid w-full max-w-md grid-cols-2 gap-4 lg:mt-0">
                        <div className="rounded-2xl border border-white/10 bg-[#0B0F17] p-6 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Weeks to ready</p>
                            <p className="mt-2 font-display text-3xl text-[#2F7BFF]">6-12</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#0B0F17] p-6 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Mock interviews</p>
                            <p className="mt-2 font-display text-3xl text-[#2F7BFF]">03</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#0B0F17] p-6 backdrop-blur-md col-span-2">
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8]">Partner Networks</p>
                            <p className="mt-2 font-display text-3xl text-[#2F7BFF]">5+</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE LIST */}
            <section className="bg-[#0A0D14] py-24">
                <div className="mx-auto max-w-[1000px] px-6">
                    <h2 className="font-display text-3xl mb-12 border-b border-white/10 pb-6">The Process</h2>
                    <div className="flex flex-col">
                        {SERVICES.map((svc, i) => (
                            <Link key={i} href={svc.href} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.02]">
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-sm text-[#8A96A8]">0{i + 1}</span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white group-hover:text-[#2F7BFF] transition-colors">{svc.title}</h3>
                                        <p className="text-sm text-[#8A96A8] mt-1">{svc.desc}</p>
                                    </div>
                                </div>
                                <span className="hidden sm:block text-[#2F7BFF] opacity-0 group-hover:opacity-100 transition-opacity">View details →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}