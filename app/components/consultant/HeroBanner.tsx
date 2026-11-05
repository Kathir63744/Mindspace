"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroContent } from "./data";

const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]";

const sentences = [
    "We bridge the gap between ambitious businesses and top-tier talent.",
    "Tailored software solutions engineered to scale your operations.",
    "Expert-led training designed to shape the next generation of careers."
];

// ==========================================
// 1. STACKING TYPEWRITER COMPONENT (NO REPEAT)
// ==========================================
function StackingTypewriter() {
    const [displayedSentences, setDisplayedSentences] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        // Stop executing if all sentences are typed
        if (sentenceIndex >= sentences.length) return;

        const currentSentence = sentences[sentenceIndex];

        // If we finished typing the current sentence
        if (charIndex >= currentSentence.length) {
            const nextSentenceTimer = setTimeout(() => {
                // Move the completed sentence to the history
                setDisplayedSentences((prev) => [...prev, currentSentence]);
                setCurrentText("");
                setSentenceIndex((prev) => prev + 1);
                setCharIndex(0);
            }, 800); // Pause before starting the next sentence
            return () => clearTimeout(nextSentenceTimer);
        }

        // Typing character by character
        const typingTimer = setTimeout(() => {
            setCurrentText((prev) => prev + currentSentence[charIndex]);
            setCharIndex((prev) => prev + 1);
        }, 40); // Speed of typing

        return () => clearTimeout(typingTimer);
    }, [charIndex, sentenceIndex]);

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            {/* Render the sentences that are already fully typed */}
            {displayedSentences.map((text, i) => (
                <span key={i} className="opacity-70 text-lg sm:text-xl md:text-2xl transition-opacity duration-500">
                    {text}
                </span>
            ))}

            {/* Render the sentence currently being typed */}
            {sentenceIndex < sentences.length && (
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {currentText}
                    {/* Blinking Cursor - disappears when finished */}
                    {sentenceIndex < sentences.length && (
                        <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[2px] animate-pulse bg-[#FFB547]" />
                    )}
                </span>
            )}
        </div>
    );
}

// ==========================================
// 2. HERO BANNER
// ==========================================
export default function HeroBanner() {
    return (
        <section className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#0B0B0C] text-white selection:bg-[#FFB547] selection:text-[#0B0B0C]">

            {/* 1. BACKGROUND IMAGE & OVERLAYS */}
            <Image
                src="/bg3.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="z-10 object-cover opacity-40"
            />

            {/* Radial Vignette */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B0B0C_100%)] opacity-10"
            />

            {/* 2. AMBIENT GLOW */}
            <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB547]/10 blur-[100px]"
            />

            {/* 3. TOP CONTENT (Text & CTAs) */}
            <div className="relative z-20 mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-center px-6 pt-24 pb-12 lg:px-12">
                <div className="mx-auto max-w-3xl text-center">


                    <h1 className="font-display text-blue-400 text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight animate-slide-in" style={{ animationDelay: '0.1s' }}>
                        Build the software.<br />
                        <span className="text-[#9bd1e1]">Shape the career.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg animate-slide-in" style={{ animationDelay: '0.2s' }}>
                        {heroContent.body}
                    </p>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                        <Link
                            href={heroContent.primaryCta.href}
                            className={`group inline-flex items-center gap-3 rounded-full bg-teal-400 px-7 py-3.5 font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-[#FFCB5C] ${focus}`}
                        >
                            Start a project
                            <svg viewBox="0 0 20 20" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link
                            href={heroContent.secondaryCta.href}
                            className={`rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 ${focus}`}
                        >
                            {heroContent.secondaryCta.label}
                        </Link>
                    </div>
                </div>
            </div>

            {/* 4. FULL WIDTH OVERLAY IMAGE SECTION (Stacking Typewriter) */}
            <div className="relative z-20 -mt-18 w-full animate-slide-in" style={{ animationDelay: '0.5s' }}>

                <div className="relative mx-auto flex min-h-[250px] w-full max-w-5xl flex-col items-center justify-center px-6 text-center">

                    {/* Subtle soft glow behind the text */}
                    <div className="absolute inset-0 mx-auto h-full w-[90%] max-w-3xl rounded-full bg-[#0B0B0C]/50 blur-2xl" />

                    <div className="relative">
                        <StackingTypewriter />
                    </div>

                </div>

            </div>

        </section>
    );
}