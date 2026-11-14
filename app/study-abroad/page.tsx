import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

export const metadata: Metadata = {
    title: "Study Abroad — MindSpace",
    description: "Global education guidance.",
};

const SERVICES = [
    { title: "Country & course mapping", href: "/study-abroad/country-course-mapping", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80", desc: "Match goals to destinations." },
    { title: "University shortlisting", href: "/study-abroad/university-shortlisting", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80", desc: "Curated lists that fit your profile." },
    { title: "Admission support", href: "/study-abroad/admission-support", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80", desc: "Essays and applications handled." },
    { title: "Visa filing", href: "/study-abroad/visa-support", img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80", desc: "Documentation and interview prep." },
];

export default function StudyAbroadPage() {
    return (
        <main className="bg-[#050505] text-white selection:bg-[#2F7BFF]">
            <Navbar />

            {/* SPLIT HERO */}
            <section className="relative flex min-h-[90svh] w-full flex-col overflow-hidden lg:flex-row">
                <div className="relative z-10 flex w-full flex-col justify-center bg-[#050505] px-6 py-32 sm:px-12 lg:w-1/2 lg:px-20">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#2F7BFF]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Global Education</span>
                    </div>
                    <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                        Study where<br />the future is.
                    </h1>
                    <p className="mt-8 max-w-md text-[16px] leading-[1.7] text-[#8A96A8]">
                        Countries, universities, admissions, documentation and visas — one guided pathway from shortlist to arrival.
                    </p>
                    <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
                        <div>
                            <p className="font-display text-3xl text-white">15+</p>
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8] mt-1">Countries</p>
                        </div>
                        <div>
                            <p className="font-display text-3xl text-white">250+</p>
                            <p className="text-[10px] uppercase tracking-wider text-[#8A96A8] mt-1">Universities</p>
                        </div>
                    </div>
                </div>
                <div className="relative h-[50svh] w-full lg:h-auto lg:w-1/2">
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=85" alt="Graduation" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent lg:hidden" />
                </div>
            </section>

            {/* HORIZONTAL SCROLLING SERVICES */}
            <section className="bg-[#0A0D14] py-24">
                <div className="mx-auto max-w-[1600px] px-6 lg:px-20 mb-12">
                    <h2 className="font-display text-3xl sm:text-4xl">Your pathway.</h2>
                </div>
                <div className="flex overflow-x-auto gap-6 px-6 pb-12 lg:px-20 snap-x snap-mandatory [scrollbar-width:none]">
                    {SERVICES.map((svc, i) => (
                        <Link key={i} href={svc.href} className="group relative flex h-[400px] w-[300px] sm:w-[400px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/10">
                            <img src={svc.img} alt={svc.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                            <div className="relative mt-auto p-8">
                                <span className="text-[#2F7BFF] font-mono text-sm mb-2 block">0{i + 1}</span>
                                <h3 className="font-display text-2xl mb-2">{svc.title}</h3>
                                <p className="text-sm text-[#8A96A8]">{svc.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}