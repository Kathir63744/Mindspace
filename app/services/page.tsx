import Image from "next/image";
import Link from "next/link";
import Services, { SectionBadge } from "../components/consultant/Services";
import Navbar from "../components/consultant/Navbar";

export default function ServicesPage() {
    return (
        <main className="bg-[#0B0B0C] text-white">
            <Navbar />
            {/* 1. Hero Section */}
            <section className="relative flex h-[50vh] min-h-[400px] w-full items-center justify-center overflow-hidden border-b border-white/5">
                <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Global Education"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent" />

                <div className="relative z-10 mx-auto max-w-[90rem] px-8 lg:px-24 text-center pt-20">
                    <SectionBadge text="What We Do" />
                    <h1 className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
                        Our <span className="text-teal-400 italic">Services.</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
                        Expert guidance for every step of your international education journey. From university shortlisting to visa approval.
                    </p>
                </div>
            </section>

            {/* 2. The Services Component */}
            <Services />

            {/* 3. Bottom CTA */}
            <section className="py-24 text-center">
                <h2 className="font-display text-3xl font-bold text-white">Not sure where to start?</h2>
                <p className="mt-4 text-white/50">Speak to an expert counsellor today.</p>
                <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-teal-400 px-8 py-4 font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-teal-300"
                >
                    Book a Free Consultation
                </Link>
            </section>
        </main>
    );
}