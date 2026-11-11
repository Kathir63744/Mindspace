"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionBadge } from "../components/consultant/Services";
import Footer from "../components/consultant/Footer";
import Navbar from "../components/consultant/Navbar";

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F7BFF]";

const chapters = [
    {
        id: "01",
        title: "The Genesis",
        heading: "Born from a simple frustration.",
        body: "Mind Space was born out of a broken process. Too many talented students were losing their way in the maze of complex university applications, ever-changing visa regulations, and confusing financial planning.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "The Evolution",
        heading: "A network built on trust.",
        body: "What started as a small team of former admissions officers has grown into a global network. Today, we don't just process applications; we build comprehensive strategies and mentor students to find their perfect fit.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "03",
        title: "The Future",
        heading: "Your success is our success.",
        body: "Our philosophy is simple: we are the bridge between ambition and success. Whether you are a student taking your first step towards a global career, or a business looking for top-tier talent, we get you there.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    }
];

const dnaData = {
    mission: {
        title: "Our Mission",
        text: "To empower students with the accurate information, expert guidance, and unwavering support they need to access world-class education, regardless of their background.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    vision: {
        title: "Our Vision",
        text: "To be the most trusted global education consultancy, recognized for our integrity, technology-driven approach, and commitment to student success.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop"
    },
    values: [
        {
            title: "Excellence",
            text: "We hold ourselves to the highest standards in every application.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Integrity",
            text: "We are transparent and honest, building trust through ethical practices.",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
        }
    ]
};

export default function AboutPage() {
    const [activeChapter, setActiveChapter] = useState(0);

    return (
        <main className="bg-[#07090F] text-white selection:bg-[#2F7BFF] selection:text-white overflow-hidden">
            <Navbar />

            {/* =========================================
                1. CINEMATIC HERO
            ========================================= */}
            <section className="relative flex min-h-screen w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        alt="Mind Space"
                        fill
                        priority
                        className="object-cover opacity-30 grayscale mix-blend-overlay"
                    />
                    {/* Gradient overlay matching the new blue theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07090F] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col justify-center px-6 lg:px-24 pt-32 pb-20">

                    <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl max-w-4xl">
                        We bridge the gap between <br />
                        <span className="text-[#A9C7FF]">ambition and reality.</span>
                    </h1>
                    <p className="mt-8 max-w-xl text-lg text-white/60 sm:text-xl leading-relaxed">
                        Mind Space simplifies the complex world of international education and career placement.
                    </p>
                </div>
            </section>

            {/* =========================================
                2. INTERACTIVE SCROLL
            ========================================= */}
            <section className="relative border-y border-white/5 bg-[#07090F]">
                {/* Background Glow */}
                <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-[#2F7BFF]/5 blur-[140px]" />

                <div className="mx-auto max-w-[90rem] px-6 lg:px-24">
                    <div className="grid lg:grid-cols-2 lg:gap-24">

                        {/* Left: Scrolling Text */}
                        <div className="flex flex-col py-20 lg:py-32">
                            {chapters.map((chapter, index) => (
                                <div
                                    key={chapter.id}
                                    className="min-h-[50vh] flex flex-col justify-center border-l-2 pl-8 transition-all duration-500 cursor-pointer"
                                    style={{ borderColor: activeChapter === index ? '#2F7BFF' : '#1A1D26' }}
                                    onMouseEnter={() => setActiveChapter(index)}
                                    onClick={() => setActiveChapter(index)}
                                >
                                    <span className={`font-display text-sm font-bold tracking-widest uppercase transition-colors ${activeChapter === index ? 'text-[#A9C7FF]' : 'text-white/20'}`}>
                                        Chapter {chapter.id}
                                    </span>
                                    <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-white">
                                        {chapter.heading}
                                    </h2>
                                    <p className="mt-6 text-base lg:text-lg leading-relaxed text-white/50">
                                        {chapter.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right: Sticky Image Showcase */}
                        <div className="hidden lg:block relative">
                            <div className="sticky top-0 h-screen flex items-center justify-center">
                                <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-[#2F7BFF]/10">
                                    {chapters.map((chapter, index) => (
                                        <Image
                                            key={chapter.id}
                                            src={chapter.image}
                                            alt={chapter.title}
                                            fill
                                            className={`object-cover transition-all duration-700 ease-in-out ${activeChapter === index ? "opacity-100 scale-100" : "opacity-0 scale-110"
                                                }`}
                                        />
                                    ))}

                                    {/* Overlay Stat */}
                                    <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#07090F]/80 p-6 backdrop-blur-md">
                                        <p className="text-3xl font-bold text-[#A9C7FF]">5,000+</p>
                                        <p className="text-sm text-white/60">Students placed globally</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================
                3. OUR DNA (Image-Backed Glass Grid)
            ========================================= */}
            <section className="relative py-24 sm:py-32 bg-[#07090F]">
                <div className="pointer-events-none absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/5 blur-[140px]" />

                <div className="mx-auto max-w-[90rem] px-6 lg:px-24 relative z-10">
                    <div className="mb-16">
                        <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">Our DNA.</h2>
                        <p className="mt-4 text-lg text-white/50 max-w-2xl">The principles that drive everything we do.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">

                        {/* Mission (Large Image Card) */}
                        <div className="group relative overflow-hidden rounded-3xl border border-white/5 md:col-span-2 md:row-span-1 min-h-[300px]">
                            <Image
                                src={dnaData.mission.image}
                                alt="Our Mission"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                            />
                            {/* Dark gradient for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/60 to-transparent" />

                            <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                                <h3 className="font-display text-3xl font-bold text-white">{dnaData.mission.title}</h3>
                                <p className="mt-4 max-w-xl text-base lg:text-lg leading-relaxed text-white/80">
                                    {dnaData.mission.text}
                                </p>
                            </div>
                        </div>

                        {/* Vision (Tall Image Card) */}
                        <div className="group relative overflow-hidden rounded-3xl border border-white/5 md:col-span-1 md:row-span-2 min-h-[400px]">
                            <Image
                                src={dnaData.vision.image}
                                alt="Our Vision"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/40 to-transparent" />

                            <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                                <h3 className="font-display text-2xl font-bold text-white">{dnaData.vision.title}</h3>
                                <p className="mt-4 text-base leading-relaxed text-white/80">
                                    {dnaData.vision.text}
                                </p>
                            </div>
                        </div>

                        {/* Value 1 (Image Card) */}
                        <div className="group relative overflow-hidden rounded-3xl border border-white/5 md:col-span-1 min-h-[250px]">
                            <Image
                                src={dnaData.values[0].image}
                                alt="Excellence"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/50 to-transparent" />

                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <h3 className="font-display text-xl font-bold text-white">{dnaData.values[0].title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {dnaData.values[0].text}
                                </p>
                            </div>
                        </div>

                        {/* Value 2 (Image Card) */}
                        <div className="group relative overflow-hidden rounded-3xl border border-white/5 md:col-span-1 min-h-[250px]">
                            <Image
                                src={dnaData.values[1].image}
                                alt="Integrity"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/50 to-transparent" />

                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <h3 className="font-display text-xl font-bold text-white">{dnaData.values[1].title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {dnaData.values[1].text}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================
                4. BOTTOM CTA
            ========================================= */}
            <section className="relative py-24 sm:py-32 text-center border-t border-white/5 bg-[#07090F] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#2F7BFF]/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-2xl px-6 relative z-10">
                    <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Ready to start your journey?</h2>
                    <p className="mt-6 text-lg text-white/50">Speak to one of our expert counsellors today.</p>
                    <div className="mt-10">
                        <Link
                            href="/contact"
                            className={`inline-flex items-center gap-3 rounded-full bg-[#2F7BFF] px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-[#4a8cff] shadow-[0_0_30px_rgba(47,123,255,0.3)] hover:shadow-[0_0_40px_rgba(47,123,255,0.5)] ${focusRing}`}
                        >
                            Book a Free Consultation
                            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}