"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionBadge } from "./Services";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]";

const values = [
    {
        title: "University Admissions",
        desc: "We help you shortlist the right universities, prepare your documents, and submit flawless applications to secure your dream offer.",
    },
    {
        title: "Visa Guidance",
        desc: "Our experts guide you through the entire visa process, from financial documentation to interview preparation, ensuring a smooth approval.",
    },
    {
        title: "Test Preparation",
        desc: "Get access to top-tier coaching for IELTS, TOEFL, GRE, and GMAT to meet the entry requirements of global institutions.",
    }
];

export default function About() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-slide logic for the values
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % values.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="about" className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">
            {/* Background Ambience */}
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB547]/5 blur-[120px]" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">

                {/* CENTERED HEADER */}
                <div className="mx-auto mb-16 max-w-4xl text-center lg:mb-24">
                    <SectionBadge text="About Our Consultancy" />
                    <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl uppercase">
                        Guiding you to<br />
                        <span className="text-teal-400  lowercase tracking-normal">global education.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                        Navigating international admissions can be overwhelming. We are here to simplify the process, providing end-to-end support from your first enquiry to your arrival on campus.
                    </p>
                </div>

                {/* SPLIT CONTENT */}
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">

                    {/* LEFT: Staggered Image Collage */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        {/* Image 1 (Top Left) */}
                        <div className="relative aspect-[4/5] w-3/4 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" // Students on campus
                                alt="Students on campus"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>

                        {/* Image 2 (Bottom Right, Overlapping) */}
                        <div className="absolute -bottom-16 right-0 aspect-square w-2/3 overflow-hidden rounded-3xl border-[6px] border-[#0B0B0C] shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" // Counselling session
                                alt="Counselling session"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Core Services List (Auto-sliding) */}
                    <div className="flex flex-col gap-2 pt-16 lg:pt-0">
                        <h3 className="mb-6 font-display text-2xl font-bold text-white">How we help you</h3>

                        {values.map((v, i) => {
                            const isActive = activeIndex === i;
                            return (
                                <div
                                    key={i}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${isActive
                                            ? "border-[#FFB547]/40 bg-[#151517] shadow-[0_0_30px_-10px_rgba(255,181,71,0.15)] translate-x-2"
                                            : "border-white/5 bg-[#151517]/30 hover:bg-[#151517]/60"
                                        }`}
                                >
                                    <div className={`absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-[#FFB547]/0 via-[#FFB547]/5 to-transparent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`} />

                                    <div className="flex items-start gap-5">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold transition-all duration-500 ${isActive
                                                ? "bg-teal-400 text-[#0B0B0C] shadow-lg scale-110"
                                                : "bg-white/5 text-white/40 border border-white/10"
                                            }`}>
                                            0{i + 1}
                                        </div>

                                        <div>
                                            <h4 className={`font-display text-xl font-bold transition-colors duration-500 ${isActive ? "text-teal-400" : "text-white"}`}>
                                                {v.title}
                                            </h4>
                                            <p className={`mt-2 text-[15px] leading-relaxed transition-colors duration-500 ${isActive ? "text-teal-400" : "text-white/50"}`}>
                                                {v.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className={`inline-flex items-center gap-2 border-b-2 border-teal-400 pb-1 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:text-[#FFB547] ${focusRing}`}
                            >
                                Start your application
                                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}