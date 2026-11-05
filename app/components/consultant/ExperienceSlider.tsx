"use client";

import Image from "next/image";
import { SectionBadge } from "./Services";

// 1. The Core Approach Data
const approaches = [
    {
        title: "Expert Counsellors",
        desc: "Our advisors are certified professionals who have studied or worked abroad, bringing firsthand experience to your application."
    },
    {
        title: "Tailored Guidance",
        desc: "We don't believe in one-size-fits-all. Your profile, budget, and goals shape the exact strategy we build for you."
    },
    {
        title: "Visa Expertise",
        desc: "With a 98% success rate, we meticulously prepare your financial documents and interview prep to secure your visa."
    },
    {
        title: "Scholarship Assistance",
        desc: "We help you identify and apply for merit-based and need-based scholarships to make your global education affordable."
    },

];

// 2. The Success Stories Data
const successStories = [
    {
        id: 1,
        name: "Meera Nair",
        role: "MS in Artificial Intelligence",
        dest: "University of Oxford",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Aditya Sharma",
        role: "MBA in Finance",
        dest: "University of Manchester",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Ishita Reddy",
        role: "MS in Biotechnology",
        dest: "University of Edinburgh",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Karan Malhotra",
        role: "MS in Data Analytics",
        dest: "University of California, Berkeley",
        img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Diya Kapoor",
        role: "MSc in Cybersecurity",
        dest: "University of British Columbia",
        img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Rohan Mehta",
        role: "BBA in International Business",
        dest: "University of Sydney",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
    },
];

export default function ExperienceSlider() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">

            {/* Ambient Background Glows (Teal-400) */}
            <div aria-hidden="true" className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2dd4bf]/5 blur-[120px]" />
            <div aria-hidden="true" className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#2dd4bf]/5 blur-[120px]" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">

                {/* =========================================
                    PART 1: The Core Approach Grid
                ========================================= */}
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

                    {/* Left Sticky Title */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">

                        <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                            An experience that keeps students at the <span className="text-[#2dd4bf] italic">center.</span>
                        </h2>
                        <p className="mt-4 text-lg text-white/50">
                            We combine global expertise with personalized care to ensure your journey is seamless.
                        </p>
                    </div>

                    {/* Right Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {approaches.map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#151517] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2dd4bf]/30 hover:bg-[#1A1A1D] hover:shadow-[0_10px_30px_-10px_rgba(45,212,191,0.15)]"
                                >
                                    {/* Hover Highlight Gradient */}
                                    <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-[#2dd4bf]/0 via-[#2dd4bf]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Left Accent Border (Teal-400) */}
                                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#2dd4bf] to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

                                    <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#2dd4bf]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* =========================================
                    PART 2: The Alumni Success Slider
                ========================================= */}
                <div className="text-center">
                    <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Our students are studying at <span className="text-[#2dd4bf] italic">top global institutions</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/50">
                        Join hundreds of successful students who achieved their dream of studying abroad.
                    </p>
                </div>

                {/* Infinite Scrolling Carousel */}
                <div className="relative mt-16 w-full overflow-hidden">
                    {/* Gradient Fades for left and right edges (Matches bg-[#0B0B0C]) */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0B0B0C] to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0B0B0C] to-transparent" />

                    {/* The scrolling track */}
                    <div className="flex w-max animate-infinite-scroll gap-8 hover:[animation-play-state:paused]">
                        {/* We map over the array twice to create a seamless infinite loop */}
                        {[...successStories, ...successStories].map((student, i) => (
                            <div key={i} className="group flex w-64 flex-col items-center">

                                {/* Image Container */}
                                <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-white/5 bg-[#151517] shadow-2xl">
                                    <Image
                                        src={student.img}
                                        alt={student.name}
                                        fill
                                        className="object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                                    />
                                    {/* Inner Gradient Overlay to blend into the ash card */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151517] via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                                </div>

                                {/* Ash-Shaded Floating Highlight Card */}
                                <div className="relative z-10 -mt-10 w-[85%] rounded-xl border border-white/10 bg-teal-900 px-4 py-3 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-[#2dd4bf]/30">
                                    <h4 className="font-display text-lg font-bold text-white">
                                        {student.name}
                                    </h4>
                                    <p className="text-xs font-medium text-white/50">
                                        {student.role}
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-[#2dd4bf]">
                                        {student.dest}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}