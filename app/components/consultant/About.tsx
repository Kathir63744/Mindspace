"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Types and editable content                                                 */
/* -------------------------------------------------------------------------- */

type AboutThemeName = "midnight" | "peach" | "split";

interface AboutStat {
    value: string;
    label: string;
}

interface AboutContent {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    stats: AboutStat[];
    ticker: string[];
    cta: string;
    badge: string;
    image: string;
    imageAlt: string;
}

const DEFAULT_CONTENT: AboutContent = {
    eyebrow: "A LITTLE ABOUT US",
    headlineLine1: "We turn bold",
    headlineLine2: "ideas into impact.",
    paragraph:
        "MindSpace provides technology solutions, professional training, and job placement and career support for businesses and individuals. We help businesses build digital products and help people develop practical skills and prepare for employment opportunities.",
    stats: [
        { value: "08+", label: "Years of making" },
        { value: "120+", label: "Projects delivered" },
        { value: "40+", label: "Partners in progress" },
        { value: "12", label: "Industry recognitions" },
    ],
    ticker: [
        "Technology solutions",
        "Website development",
        "Mobile apps",
        "Custom software",
        "Professional training",
        "Career support",
        "Job placement",
    ],
    cta: "Get to know us",
    badge: "Technology · Training · Careers",
    image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop",
    imageAlt: "Creative team collaborating around a table",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

/* -------------------------------------------------------------------------- */
/* Small visual components                                                    */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: string }) {
    return (
        <div className="inline-flex items-center gap-[10px] font-questrial text-[#80ADFF] text-[10px] font-bold tracking-[0.22em] uppercase">
            <span className="w-[6px] h-[6px] rounded-full bg-[#2F7BFF] shadow-[0_0_14px_#2F7BFF]" />
            <span>{children}</span>
        </div>
    );
}

function StatItem({ stat, index }: { stat: AboutStat; index: number }) {
    return (
        <motion.div
            className="relative flex gap-3 items-start pt-5 pb-5 pr-3 md:pl-5 md:border-l border-white/10 first:border-l-0 first:pl-0 max-md:border-t max-md:first:border-t-0"
            variants={reveal}
        >
            <span className="pt-1 font-questrial text-[#80ADFF] text-[10px] tracking-[0.12em] font-semibold">
                0{index + 1}
            </span>
            <div>
                <div className="font-questrial text-white text-[clamp(28px,3.4vw,44px)] font-semibold tracking-[-0.055em] leading-none tabular-nums">
                    {stat.value}
                </div>
                <div className="mt-2 font-questrial text-[#9AA6BA] text-[12px] sm:text-[13px] font-semibold leading-tight tracking-[0.1em] uppercase">
                    {stat.label}
                </div>
            </div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

interface AboutProps {
    theme?: AboutThemeName;
    content?: Partial<AboutContent>;
    id?: string;
}

export default function About({ content, id = "about" }: AboutProps) {
    const c: AboutContent = { ...DEFAULT_CONTENT, ...content };
    const visualRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(visualRef, { once: true, amount: 0.2 });

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22 });
    const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22 });
    const imageX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
    const imageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

    const handleMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = visualRef.current?.getBoundingClientRect();
        if (!rect) return;
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const resetPointer = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <>
            <style>{`
                @keyframes scroll {
                    to { transform: translateX(-50%); }
                }
            `}</style>
            <section
                id={id}
                className="relative isolate w-full overflow-hidden bg-[#080B13] text-[#F5F7FC] px-[clamp(18px,5vw,80px)] pt-[clamp(60px,7vw,96px)] pb-6 font-questrial"
                aria-labelledby={`${id}-heading`}
            >
                <div className="absolute -z-10 w-[min(46vw,600px)] aspect-square -top-[30%] -right-[18%] rounded-full bg-[#2F7BFF] blur-[160px] opacity-[0.12] pointer-events-none" />
                <div className="absolute -z-10 inset-0 opacity-[0.16] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

                <div className="relative z-10 max-w-[1440px] mx-auto">
                    {/* Topline */}
                    <motion.div
                        className="flex justify-between items-center gap-4 mb-[clamp(24px,3.4vw,44px)] max-sm:items-start"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <div className="flex max-w-7xl items-center gap-3">
                            <span className="h-px w-8 bg-[#2F7BFF]" />
                            <span className="font-questrial text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                A Little About Us
                            </span>
                            <span className="h-px max-w-20 flex-1 bg-white/10" />
                        </div>
                        <motion.span
                            className="font-questrial text-white/90 text-[10px] tracking-[0.08em] uppercase max-sm:max-w-[100px] max-sm:text-right max-sm:leading-relaxed"
                            variants={reveal}
                        >
                            Independent minds. Shared ambition.
                        </motion.span>
                    </motion.div>

                    {/* Hero text — top-aligned columns */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)] items-start gap-[clamp(24px,4vw,72px)] mb-[clamp(24px,3.4vw,44px)]"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        {/* LEFT — headline, both lines flush left */}
                        <h2
                            id={`${id}-heading`}
                            className="m-0 w-full font-questrial text-[clamp(38px,6.4vw,72px)] leading-[0.94] tracking-[-0.055em] font-[600] max-sm:text-[clamp(36px,11vw,58px)]"
                        >
                            <span className="block overflow-hidden pb-[0.10em]">
                                <motion.span className="inline-block" variants={reveal}>
                                    {c.headlineLine1}
                                </motion.span>
                            </span>

                            <span className="block overflow-hidden pb-[0.10em]">
                                <motion.span
                                    className="inline-block text-[#80ADFF] italic font-medium"
                                    variants={reveal}
                                >
                                    {c.headlineLine2}
                                </motion.span>
                            </span>
                        </h2>

                        {/* RIGHT — bigger paragraph + CTA */}
                        <motion.div
                            className="max-w-[720px] pb-2 md:justify-self-end"
                            variants={reveal}
                        >
                            <p className="m-0 font-questrial text-white/90 text-[clamp(14px,1.15vw,16px)] leading-[1.87]">
                                {c.paragraph}
                            </p>
                            <a
                                className="group inline-flex items-center gap-3 mt-5 pb-1.5 font-questrial text-[#F5F7FC] no-underline border-b border-[#2F7BFF] text-[13px] font-[650] tracking-[0.04em] transition-all duration-300 hover:gap-4 hover:text-[#80ADFF]"
                                href="#contact"
                            >
                                {c.cta}
                                <span className="text-[#80ADFF] text-base" aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* ====================================================== */}
                    {/* VISUAL — bigger image with glass highlight text panel  */}
                    {/* ====================================================== */}
                    <motion.div
                        ref={visualRef}
                        className="relative h-[clamp(320px,38vw,430px)] max-md:h-[clamp(320px,55vw,460px)] max-sm:h-[68vw] max-sm:min-h-[320px] max-sm:max-h-[420px]"
                        onMouseMove={handleMove}
                        onMouseLeave={resetPointer}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: EASE }}
                    >
                        {/* Image */}
                        <motion.div
                            className="absolute inset-0 right-[3%] overflow-hidden rounded-[10px] bg-[#111827] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] max-sm:right-2 max-sm:rounded-[8px]"
                            style={{ x: imageX, y: imageY }}
                        >
                            {/* Strong gradient bottom for panel contrast */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#040810]/10 via-[#040810]/30 to-[#040810]/85 z-10 pointer-events-none" />

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <motion.img
                                className="w-full h-full block object-cover saturate-[0.82]"
                                src={c.image}
                                alt={c.imageAlt}
                                loading="lazy"
                                initial={{ scale: 1.1 }}
                                animate={inView ? { scale: 1.02 } : { scale: 1.1 }}
                                transition={{ duration: 1.3, ease: EASE }}
                            />

                            {/* GLASS PANEL over the image */}
                            <motion.div
                                className="absolute z-20 left-[clamp(16px,3vw,48px)] bottom-[clamp(16px,3vw,40px)] right-[clamp(16px,3vw,48px)] max-w-[640px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] px-6 py-5 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.15)]">
                                    {/* Top sheen */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%)",
                                        }}
                                    />

                                    {/* Small eyebrow inside the panel */}
                                    <div className="relative flex items-center gap-2 mb-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#80ADFF] shadow-[0_0_10px_#80ADFF]" />
                                        <span className="font-questrial text-[#A9C7FF] text-[10px] font-bold uppercase tracking-[0.22em]">
                                            Curiosity, crafted into reality
                                        </span>
                                    </div>

                                    {/* Main highlighted text */}
                                    <strong className="relative block max-w-[560px] font-questrial text-white text-[clamp(20px,2.6vw,34px)] leading-[1.1] tracking-[-0.03em] font-semibold">
                                        Good work starts with a{" "}
                                        <span className="text-[#80ADFF]">different point of view.</span>
                                    </strong>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating stat card (top-right, outside the panel) */}
                        <motion.div
                            className="absolute z-30 right-0 top-[8%] w-[clamp(140px,15vw,180px)] p-4 font-questrial text-[#F5F7FC] bg-[#111827]/90 border border-white/10 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.35)] rounded-xl max-sm:top-[4%] max-sm:p-3 max-sm:w-[124px]"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                        >
                            <span className="block font-questrial text-[#80ADFF] text-[11px] tracking-[0.18em] uppercase">
                                {c.badge}
                            </span>
                            <strong className="block mt-3 font-questrial text-[clamp(24px,3vw,36px)] leading-none tracking-[-0.05em] max-sm:mt-2">
                                {c.stats[0]?.value ?? "08+"}
                            </strong>
                            <p className="mt-1.5 font-questrial text-[#9AA6BA] text-[13px] leading-relaxed">
                                {c.stats[0]?.label ?? "Years of making"}
                            </p>
                        </motion.div>

                        {/* Rotating badge (bottom-right) */}
                        <motion.div
                            className="absolute z-30 right-0 bottom-[12%] w-[58px] h-[58px] grid place-items-center rounded-full text-white bg-[#2F7BFF] shadow-[0_10px_30px_rgba(47,123,255,0.45)] text-lg max-sm:w-[44px] max-sm:h-[44px] max-sm:text-sm"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                            aria-hidden="true"
                        >
                            ✳
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    {c.stats.length > 0 && (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-b border-white/10 mt-[clamp(30px,3vw,48px)]"
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                        >
                            {c.stats.map((stat, index) => (
                                <StatItem key={`${stat.label}-${index}`} stat={stat} index={index} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
}