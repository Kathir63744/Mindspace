// app/contact/page.tsx
"use client";

import { useState } from "react";
import { siteConfig } from "../components/consultant/data";
import Navbar from "../components/consultant/Navbar";
import Footer from "../components/consultant/Footer";

/* =========================================================
   FAQ DATA
========================================================= */

const faqData = [
    {
        category: "General",
        items: [
            {
                q: "What does MindSpace do?",
                a: "MindSpace provides technology solutions, professional training, and job placement and career support for businesses and individuals.",
            },
            {
                q: "What technology services do you offer?",
                a: "We offer website development, mobile app development, web application development and custom software development. Each project is scoped around the client's requirements.",
            },
            {
                q: "What professional training do you offer?",
                a: "We offer technical and programming training, practical projects, job readiness training, and corporate and communication training. Contact us for current programme availability.",
            },
            {
                q: "What career support do you provide?",
                a: "We provide career guidance, resume and LinkedIn profile support, interview preparation, job search support, internship assistance and placement assistance.",
            },
            {
                q: "Do you guarantee a job?",
                a: "No. We provide preparation and placement assistance, but hiring decisions are made by employers.",
            },
            {
                q: "Is placement assistance included with training?",
                a: "Placement assistance depends on the programme or service selected. We explain what is included before enrolment.",
            },
        ],
    },
    {
        category: "Pricing & Process",
        items: [
            {
                q: "How much do your services cost?",
                a: "Fees depend on the project, programme or support required. We explain the scope and applicable fees before you proceed.",
            },
            {
                q: "How do I get started?",
                a: "Select the service you need on our Contact page and tell us briefly about your requirements. Our team will explain the next steps.",
            },
        ],
    },
];

/* =========================================================
   CONTACT PROCESS
========================================================= */

const approach = [
    {
        number: "01",
        title: "Understand",
        description: "Tell us what you need and what you want to achieve.",
    },
    {
        number: "02",
        title: "Explore",
        description: "We review the relevant services and explain your options.",
    },
    {
        number: "03",
        title: "Move forward",
        description:
            "We agree on the scope, applicable fees and next steps before work begins.",
    },
];

/* =========================================================
   SERVICE OPTIONS
========================================================= */

const SERVICE_OPTIONS = [
    {
        value: "Technology Solutions",
        label: "Technology Solutions",
        hint: "Websites, mobile apps, web apps, custom software",
    },
    {
        value: "Professional Training",
        label: "Professional Training",
        hint: "Technical programmes, projects, communication",
    },
    {
        value: "Job Placement & Career Support",
        label: "Job Placement & Career Support",
        hint: "Guidance, resume, interviews, placement",
    },
];

/* =========================================================
   APPROACH VISUAL CONTENT
========================================================= */

const approachContent = [
    {
        heading: "Start with",
        highlight: "clarity.",
        description:
            "We listen to your goals, understand your needs, and establish a clear direction before making decisions.",
        detail: "LISTEN · DEFINE · ALIGN",
    },
    {
        heading: "Discover your",
        highlight: "possibilities.",
        description:
            "We explore the right solutions, learning paths, and opportunities that align with where you want to go.",
        detail: "DISCOVER · PLAN · PREPARE",
    },
    {
        heading: "Turn plans into",
        highlight: "progress.",
        description:
            "We help you take the next step with a defined plan, practical execution, and the right support along the way.",
        detail: "EXECUTE · GROW · ADVANCE",
    },
];

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
    const [name, setName] = useState("");
    const [service, setService] = useState<string>(
        SERVICE_OPTIONS[0].value
    );
    const [messageText, setMessageText] = useState("");
    const [openFaq, setOpenFaq] = useState<string | null>(
        faqData[0].items[0].q
    );

    const phoneNumber = siteConfig.phone.replace(/\D/g, "");

    /* ---------------------------------------------------------
       MESSAGE BUILDER
    --------------------------------------------------------- */

    const buildMessage = () => {
        const trimmedName = name.trim();
        const trimmedMessage = messageText.trim();

        const lines = [
            `Hi MindSpace, my name is ${trimmedName || "—"}.`,
            `I'd like to know more about: ${service}.`,
        ];

        if (trimmedMessage) {
            lines.push("", trimmedMessage);
        }

        return lines.join("\n");
    };

    const message = buildMessage();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    const emailUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `MindSpace enquiry — ${service}`
    )}&body=${encodeURIComponent(`${message}\n\nThank you.`)}`;

    const canSubmit = name.trim().length > 0;

    /* ---------------------------------------------------------
       SHARED SPACING
    --------------------------------------------------------- */

    const pageGutter = "px-6 sm:px-10 lg:px-20 2xl:px-28";
    const container = "mx-auto max-w-[1600px]";

    return (
        <main className="font-questrial min-h-screen overflow-hidden bg-[#080B12] text-[#F5F7FC] selection:bg-[#2F7BFF] selection:text-white">
            <Navbar />

            {/* =================================================
                HERO
            ================================================= */}
            <section
                className={`${pageGutter} relative pb-24 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-48`}
            >
                {/* Ambient background */}
                <div className="pointer-events-none absolute -right-48 top-10 h-[600px] w-[600px] rounded-full bg-[#2F7BFF]/[0.10] blur-[150px]" />

                <div
                    className={`relative ${container} grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-24 xl:gap-28`}
                >
                    {/* Hero left */}
                    <div>
                        <div className="mb-12 flex items-center gap-4 sm:mb-16">
                            <span className="h-px w-10 bg-[#2F7BFF]" />

                            <span className="text-[14px] uppercase tracking-[0.22em] text-[#D4E3FF]">
                                A conversation starts here
                            </span>
                        </div>

                        <h1 className="max-w-5xl text-[clamp(3rem,7.5vw,7.5rem)] font-normal leading-[0.97] tracking-[-0.07em] text-white">
                            Let&apos;s Discuss
                            <br />
                            <span className="text-[#82B1FF]">
                                Your Next Step.
                            </span>
                        </h1>

                        <div className="mt-12 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-center sm:gap-12">
                            <p className="max-w-[520px] text-[17px] leading-[1.9] text-[#E0E8F4] sm:text-[18px]">
                                Tell us about your technology project,
                                training needs, or career goals.
                                Our team will help you understand
                                the next steps.
                            </p>

                            <a
                                href="#connect"
                                className="group inline-flex w-fit shrink-0 items-center gap-5 border-b border-[#2F7BFF] pb-3 text-[15px] text-white transition-colors hover:text-[#82B1FF]"
                            >
                                Start here
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Hero right */}
                    <div className="relative border-l border-[#344155] pl-8 sm:pl-10 lg:mb-4 lg:ml-auto lg:max-w-[370px]">
                        <span className="mb-8 block text-[14px] uppercase tracking-[0.22em] text-[#C5D5ED]">
                            The MindSpace approach
                        </span>

                        <p className="text-[clamp(25px,3vw,36px)] font-normal leading-snug tracking-[-0.04em] text-white">
                            Less uncertainty.
                            <br />
                            <span className="text-[#82B1FF]">
                                More possibility.
                            </span>
                        </p>

                        <p className="mt-6 text-[16px] leading-[1.9] text-[#E0E8F4]">
                            Practical support for your business,
                            skills and career goals.
                        </p>

                        <div className="mt-9 h-px w-16 bg-[#2F7BFF]" />
                    </div>
                </div>
            </section>

            {/* =================================================
                APPROACH — HOW WE MOVE FORWARD
            ================================================= */}
            <section
                className={`${pageGutter} relative overflow-hidden border-y border-[#25344A] bg-[#0B101A] py-24 sm:py-28 lg:py-32`}
            >
                {/* Ambient light */}
                <div className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-[#2F7BFF]/10 blur-[140px]" />

                <div className={`relative ${container}`}>
                    {/* Heading */}
                    <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
                        <div>
                            <div className="mb-7 flex items-center gap-3">
                                <span className="h-[2px] w-9 bg-[#2F7BFF]" />

                                <span className="font-questrial text-[14px] uppercase tracking-[0.22em] text-[#8DB8FF]">
                                    How we move forward
                                </span>
                            </div>

                            <h2 className="font-questrial text-[clamp(38px,5.5vw,72px)] leading-[1.06] tracking-[-0.055em] text-white">
                                A clear direction.
                                <br />
                                <span className="text-[#69A0FF]">
                                    Real progress.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-[440px] font-questrial text-[17px] leading-[1.85] text-[#E1E8F2] lg:ml-auto">
                            Every good outcome begins with understanding.
                            We make the process easier to navigate, with
                            practical guidance and a focus on what comes next.
                        </p>
                    </div>

                    {/* Process */}
                    <div className="relative">
                        {/* Connector */}
                        <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-[#34445B] lg:block" />

                        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:gap-12">
                            {approach.map((item, index) => {
                                const content = approachContent[index];

                                return (
                                    <article
                                        key={item.number}
                                        className={`group relative pb-10 md:pb-0 ${index !== 2
                                            ? "md:pr-5 lg:pr-8"
                                            : ""
                                            } ${index !== 0
                                                ? "md:pl-5 lg:pl-8"
                                                : ""
                                            }`}
                                    >
                                        {/* Step marker */}
                                        <div className="relative z-10 mb-12 flex items-center justify-between lg:mb-14">
                                            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#2F7BFF] bg-[#0B101A] transition-all duration-300 group-hover:bg-[#2F7BFF] group-hover:shadow-[0_0_24px_rgba(47,123,255,0.25)]">
                                                <span className="font-questrial text-[15px] text-[#8DB8FF] group-hover:text-white">
                                                    {item.number}
                                                </span>
                                            </div>

                                            <span className="font-questrial text-[14px] tracking-[0.15em] text-[#C2D5F2]">
                                                STEP {item.number}
                                            </span>
                                        </div>

                                        {/* Label */}
                                        <div className="mb-5 flex items-center gap-2.5">
                                            <span className="h-2 w-2 rounded-full bg-[#2F7BFF]" />

                                            <span className="font-questrial text-[14px] uppercase tracking-[0.19em] text-[#8DB8FF]">
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* Heading */}
                                        <h3 className="font-questrial text-[clamp(29px,2.7vw,38px)] leading-[1.22] tracking-[-0.04em] text-white">
                                            {content.heading}

                                            <span className="relative mt-1 block w-fit text-[#69A0FF]">
                                                {content.highlight}

                                                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />
                                            </span>
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-6 max-w-[400px] font-questrial text-[17px] leading-[1.9] text-[#E1E8F2] transition-colors duration-300 group-hover:text-white">
                                            {content.description}
                                        </p>

                                        {/* Bottom details */}
                                        <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#344054] pt-5">
                                            <span className="font-questrial text-[13px] tracking-[0.1em] text-[#C2D5F2]">
                                                {content.detail}
                                            </span>

                                            <span className="text-[20px] text-[#8DB8FF] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                ↗
                                            </span>
                                        </div>

                                        {/* Hover line */}
                                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-500 group-hover:w-full" />
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* Closing statement */}
                    <div className="mt-16 flex flex-col justify-between gap-5 border-t border-[#25344A] pt-8 sm:mt-20 sm:flex-row sm:items-center lg:mt-24">
                        <p className="font-questrial text-[22px] leading-snug tracking-[-0.025em] text-white sm:text-[25px]">
                            Not just a plan.
                            <span className="text-[#69A0FF]">
                                {" "}A way forward that moves you.
                            </span>
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#2F7BFF]" />

                            <span className="font-questrial text-[14px] tracking-[0.12em] text-[#C2D5F2]">
                                Intentional from the start
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
        CONNECT / CONTACT FORM
    ================================================= */}
            <section
                id="connect"
                className={`${pageGutter} relative py-24 sm:py-28 lg:py-36`}
            >
                <div className="pointer-events-none absolute -left-48 top-10 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/[0.07] blur-[150px]" />

                <div className={`relative ${container} grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 xl:gap-28`}>
                    {/* Left: headline */}
                    <div>
                        <span className="text-[14px] uppercase tracking-[0.22em] text-[#8DB8FF]">
                            Let&apos;s make it happen
                        </span>

                        <h2 className="mt-8 text-[clamp(42px,6vw,76px)] font-normal leading-[1.02] tracking-[-0.065em] text-white">
                            Tell us
                            <br />
                            what you
                            <br />
                            <span className="text-[#82B1FF]">
                                need help with.
                            </span>
                        </h2>

                        <p className="mt-10 max-w-[500px] text-[17px] leading-[1.9] text-[#E0E8F4] sm:text-[18px]">
                            No long forms. Pick a service, add a short note,
                            and we&apos;ll take it from there.
                        </p>

                        <div className="mt-14 border-t border-[#344155] pt-8">
                            <span className="text-[14px] uppercase tracking-[0.2em] text-[#C5D5ED]">
                                Prefer a direct call?
                            </span>

                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="mt-5 block text-[23px] text-white transition-colors hover:text-[#82B1FF] sm:text-[26px]"
                            >
                                {siteConfig.phone}
                            </a>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="flex flex-col justify-center gap-10 lg:gap-12">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="visitor-name"
                                className="mb-5 block text-[14px] uppercase tracking-[0.2em] text-[#C5D5ED]"
                            >
                                First, your name
                            </label>

                            <input
                                id="visitor-name"
                                type="text"
                                autoComplete="given-name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && name.trim()) {
                                        window.open(
                                            whatsappUrl,
                                            "_blank",
                                            "noopener,noreferrer"
                                        );
                                    }
                                }}
                                placeholder="What should we call you?"
                                className="w-full border-b border-[#45536A] bg-transparent py-5 text-[25px] text-white outline-none transition-colors placeholder:text-[#B3C0D2] focus:border-[#2F7BFF] sm:text-[32px]"
                            />
                        </div>

                        {/* Service */}
                        <div>
                            <span className="mb-6 block text-[14px] uppercase tracking-[0.2em] text-[#C5D5ED]">
                                What do you need help with?
                            </span>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {SERVICE_OPTIONS.map((option) => {
                                    const selected = service === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setService(option.value)}
                                            aria-pressed={selected}
                                            className={`group flex min-h-[160px] flex-col justify-between rounded-xl border p-5 text-left transition-all duration-300 sm:min-h-[180px] sm:p-6 ${selected
                                                ? "border-[#2F7BFF] bg-[#2F7BFF]/[0.11] shadow-[0_0_0_2px_rgba(47,123,255,0.12)]"
                                                : "border-[#344155] bg-[#0B101A] hover:border-[#2F7BFF]/70"
                                                }`}
                                        >
                                            <span className="flex items-start justify-between gap-3">
                                                <span
                                                    className={`text-[16px] leading-[1.6] ${selected
                                                        ? "text-white"
                                                        : "text-[#E0E8F4] group-hover:text-white"
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>

                                                <span
                                                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors ${selected
                                                        ? "border-[#2F7BFF] bg-[#2F7BFF] text-white"
                                                        : "border-[#8295B1] text-transparent"
                                                        }`}
                                                >
                                                    ✓
                                                </span>
                                            </span>

                                            <span className="mt-5 text-[14px] leading-[1.75] text-[#C8D5E7]">
                                                {option.hint}
                                            </span>

                                            <div
                                                className={`mt-5 h-[2px] transition-all duration-300 ${selected
                                                    ? "w-full bg-[#2F7BFF]"
                                                    : "w-0 bg-[#2F7BFF] group-hover:w-1/2"
                                                    }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="visitor-message"
                                className="mb-5 block text-[14px] uppercase tracking-[0.2em] text-[#C5D5ED]"
                            >
                                Tell us briefly about your project, training needs, or career goals.
                            </label>

                            <textarea
                                id="visitor-message"
                                rows={4}
                                value={messageText}
                                onChange={(event) => setMessageText(event.target.value)}
                                placeholder="A short sentence is enough — we'll follow up with the right questions."
                                className="w-full resize-y rounded-xl border border-[#344155] bg-[#0B101A] px-5 py-5 text-[17px] leading-[1.9] text-white outline-none transition-colors placeholder:text-[#B3C0D2] focus:border-[#2F7BFF] focus:ring-1 focus:ring-[#2F7BFF]/40"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a
                                href={canSubmit ? whatsappUrl : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-disabled={!canSubmit}
                                className={`group inline-flex min-h-[60px] flex-1 items-center justify-between gap-5 rounded-full px-7 text-[16px] transition-all duration-300 ${canSubmit
                                    ? "bg-[#2F7BFF] text-white hover:bg-[#2369E5]"
                                    : "cursor-not-allowed bg-[#1A2639] text-[#B0BED2]"
                                    }`}
                            >
                                <span>Start on WhatsApp</span>

                                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </a>

                            <a
                                href={canSubmit ? emailUrl : undefined}
                                aria-disabled={!canSubmit}
                                className={`inline-flex min-h-[60px] items-center justify-center rounded-full border px-8 text-[16px] transition-colors ${canSubmit
                                    ? "border-[#506078] text-white hover:border-[#2F7BFF] hover:text-[#82B1FF]"
                                    : "cursor-not-allowed border-[#344155] text-[#B0BED2]"
                                    }`}
                            >
                                Email instead
                            </a>
                        </div>

                        <p className="text-[14px] leading-[1.8] text-[#C2D0E2]">
                            Your name, selected service and note are included in the
                            message when you choose how to connect.
                        </p>
                    </div>
                </div>
            </section>

            {/* =================================================
        FAQ
    ================================================= */}
            <section
                className={`${pageGutter} border-t border-[#25344A] bg-[#0B101A] py-24 sm:py-28 lg:py-36`}
            >
                <div className={`mx-auto ${container} grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 xl:gap-28`}>
                    {/* FAQ left */}
                    <div className="lg:sticky lg:top-28 lg:h-fit">
                        <span className="text-[14px] uppercase tracking-[0.22em] text-[#8DB8FF]">
                            Before we connect
                        </span>

                        <h2 className="mt-8 text-[clamp(44px,5.5vw,72px)] font-normal leading-[1.03] tracking-[-0.06em] text-white">
                            Good to
                            <br />
                            <span className="text-[#82B1FF]">
                                know.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-[450px] text-[17px] leading-[1.9] text-[#E0E8F4]">
                            A few things you might want to know before starting
                            your journey with MindSpace.
                        </p>

                        <a
                            href="#connect"
                            className="mt-10 inline-flex items-center gap-4 text-[15px] text-[#82B1FF] transition-colors hover:text-white"
                        >
                            Have another question?
                            <span>↗</span>
                        </a>
                    </div>

                    {/* FAQ right */}
                    <div>
                        {faqData.map((group, groupIndex) => (
                            <div key={group.category} className="mb-14 last:mb-0">
                                <div className="mb-7 flex items-center gap-5">
                                    <span className="text-[14px] tabular-nums text-[#8DB8FF]">
                                        0{groupIndex + 1}
                                    </span>

                                    <h3 className="text-[14px] uppercase tracking-[0.2em] text-[#D0DCEB]">
                                        {group.category}
                                    </h3>
                                </div>

                                <div className="border-t border-[#344155]">
                                    {group.items.map((item, itemIndex) => {
                                        const isOpen = openFaq === item.q;

                                        return (
                                            <div
                                                key={item.q}
                                                className="border-b border-[#344155]"
                                            >
                                                <button
                                                    type="button"
                                                    aria-expanded={isOpen}
                                                    onClick={() =>
                                                        setOpenFaq(isOpen ? null : item.q)
                                                    }
                                                    className="flex w-full items-center justify-between gap-7 py-7 sm:py-8"
                                                >
                                                    <span className="flex items-start gap-6 text-left">
                                                        <span className="mt-1 text-[14px] tabular-nums text-[#B4C5DC]">
                                                            {String(itemIndex + 1).padStart(2, "0")}
                                                        </span>

                                                        <span
                                                            className={`text-[18px] leading-[1.7] transition-colors sm:text-[19px] ${isOpen
                                                                ? "text-white"
                                                                : "text-[#E0E8F4] hover:text-white"
                                                                }`}
                                                        >
                                                            {item.q}
                                                        </span>
                                                    </span>

                                                    <span
                                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 ${isOpen
                                                            ? "rotate-45 border-[#2F7BFF] bg-[#2F7BFF] text-white"
                                                            : "border-[#53647C] text-[#C2D5F2]"
                                                            }`}
                                                    >
                                                        +
                                                    </span>
                                                </button>

                                                <div
                                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen
                                                        ? "grid-rows-[1fr]"
                                                        : "grid-rows-[0fr]"
                                                        }`}
                                                >
                                                    <div className="overflow-hidden">
                                                        <p className="max-w-[800px] pb-8 pl-12 text-[16px] leading-[1.95] text-[#D4DFED] sm:pl-14 sm:text-[17px]">
                                                            {item.a}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================================================
        FINAL CONTACT STRIP
    ================================================= */}
            <section className={`${pageGutter} py-20 sm:py-24 lg:py-28`}>
                <div className={`mx-auto ${container}`}>
                    <div className="flex flex-col justify-between gap-10 border-y border-[#344155] py-10 sm:py-12 lg:flex-row lg:items-center lg:gap-16">
                        <div>
                            <span className="text-[14px] uppercase tracking-[0.22em] text-[#8DB8FF]">
                                MindSpace
                            </span>

                            <p className="mt-5 text-[clamp(22px,3vw,34px)] leading-snug tracking-[-0.03em] text-white">
                                Your next chapter starts with a conversation.
                            </p>
                        </div>

                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="group inline-flex items-center gap-5 text-[16px] text-white transition-colors hover:text-[#82B1FF]"
                        >
                            {siteConfig.email}

                            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                ↗
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}