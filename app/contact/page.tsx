"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "../components/consultant/data";
import Navbar from "../components/consultant/Navbar";
import Footer from "../components/consultant/Footer";

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

const approach = [
    {
        number: "01",
        title: "Understand",
        description:
            "Tell us what you need and what you want to achieve.",
    },
    {
        number: "02",
        title: "Explore",
        description:
            "We review the relevant services and explain your options.",
    },
    {
        number: "03",
        title: "Move forward",
        description:
            "We agree on the scope, applicable fees and next steps before work begins.",
    },
];

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

export default function ContactPage() {
    const [name, setName] = useState("");
    const [service, setService] = useState<string>(SERVICE_OPTIONS[0].value);
    const [messageText, setMessageText] = useState("");
    const [openFaq, setOpenFaq] = useState<string | null>(
        faqData[0].items[0].q
    );

    const phoneNumber = siteConfig.phone.replace(/\D/g, "");

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

    return (
        <main className="min-h-screen overflow-hidden bg-[#080B12] text-[#F5F7FB] selection:bg-[#2F7BFF] selection:text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative px-6 pb-20 pt-32 sm:px-10 sm:pt-40 lg:px-20 lg:pb-28">
                <div className="pointer-events-none absolute -right-48 top-10 h-[600px] w-[600px] rounded-full bg-[#2F7BFF]/[0.09] blur-[150px]" />

                <div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
                    <div>
                        <div className="mb-10 flex items-center gap-3">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                A conversation starts here
                            </span>
                        </div>

                        <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.94] tracking-[-0.075em]">
                            Let’s Discuss
                            <br />
                            <span className="text-[#A9C7FF]">
                                Your Next Step.
                            </span>
                        </h1>

                        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                            <p className="max-w-md text-sm leading-7 text-[#929EAF] sm:text-base">
                                Tell us about your technology project, training needs, or career goals. Our team will help you understand the next steps.
                            </p>

                            <a
                                href="#connect"
                                className="group inline-flex w-fit shrink-0 items-center gap-4 border-b border-[#2F7BFF] pb-3 text-sm font-semibold text-white transition hover:text-[#A9C7FF]"
                            >
                                Start here
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="relative border-l border-white/10 pl-7 lg:mb-3 lg:ml-auto lg:max-w-[330px]">
                        <span className="mb-6 block text-[10px] uppercase tracking-[0.22em] text-[#68758B]">
                            The MindSpace approach
                        </span>
                        <p className="text-2xl font-medium leading-snug tracking-[-0.04em] sm:text-3xl">
                            Less uncertainty.
                            <br />
                            <span className="text-[#68758B]">
                                More possibility.
                            </span>
                        </p>
                        <p className="mt-5 text-sm leading-7 text-[#929EAF]">
                            Practical support for your business, skills and career goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* APPROACH */}
            <section className="border-y border-white/[0.08] bg-[#0B101A] px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
                <div className="mx-auto max-w-[1240px]">
                    <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-end">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2F7BFF]">
                                How we move forward
                            </span>
                            <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-6xl">
                                A clearer path.
                                <br />
                                <span className="text-[#68758B]">
                                    One step at a time.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-sm text-sm leading-7 text-[#929EAF] lg:ml-auto">
                            Good decisions start with the right questions.
                            We keep the process personal, practical and
                            focused on your next step.
                        </p>
                    </div>

                    <div className="grid border-t border-white/10 md:grid-cols-3">
                        {approach.map((item, index) => (
                            <div
                                key={item.number}
                                className={`group border-b border-white/10 py-8 md:border-b-0 md:py-10 ${index !== 2
                                    ? "md:border-r md:border-white/10 md:pr-8"
                                    : ""
                                    } ${index !== 0
                                        ? "md:pl-8"
                                        : ""
                                    }`}
                            >
                                <div className="mb-12 flex items-center justify-between">
                                    <span className="text-xs tabular-nums text-[#2F7BFF]">
                                        / {item.number}
                                    </span>
                                    <span className="text-xl text-[#68758B] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#2F7BFF]">
                                        ↗
                                    </span>
                                </div>

                                <h3 className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                                    {item.title}
                                </h3>

                                <p className="mt-4 max-w-sm text-sm leading-7 text-[#929EAF]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONNECT / CONTACT FORM */}
            <section
                id="connect"
                className="relative px-6 py-20 sm:px-10 lg:px-20 lg:py-28"
            >
                <div className="pointer-events-none absolute -left-48 top-10 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/[0.06] blur-[150px]" />

                <div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
                    {/* Left: headline */}
                    <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2F7BFF]">
                            Let&apos;s make it happen
                        </span>

                        <h2 className="mt-7 max-w-2xl text-5xl font-medium leading-[1.02] tracking-[-0.065em] sm:text-7xl">
                            Tell us
                            <br />
                            what you
                            <br />
                            <span className="text-[#68758B]">
                                need help with.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-md text-sm leading-7 text-[#929EAF] sm:text-base">
                            No long forms. Pick a service, add a short note,
                            and we&apos;ll take it from there.
                        </p>

                        <div className="mt-10 border-t border-white/10 pt-7">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#68758B]">
                                Prefer a direct call?
                            </span>
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="mt-3 block text-lg font-medium transition hover:text-[#A9C7FF]"
                            >
                                {siteConfig.phone}
                            </a>
                        </div>
                    </div>

                    {/* Right: form fields */}
                    <div className="flex flex-col justify-center gap-9">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="visitor-name"
                                className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]"
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
                                className="w-full border-b border-white/20 bg-transparent py-4 text-2xl text-white outline-none transition placeholder:text-[#465166] focus:border-[#2F7BFF] sm:text-3xl"
                            />
                        </div>

                        {/* Service selection */}
                        <div>
                            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]">
                                What do you need help with?
                            </span>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {SERVICE_OPTIONS.map((option) => {
                                    const selected = service === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() =>
                                                setService(option.value)
                                            }
                                            aria-pressed={selected}
                                            className={`flex h-full flex-col justify-between rounded-2xl border px-4 py-4 text-left transition ${selected
                                                ? "border-[#2F7BFF] bg-[#2F7BFF]/10 text-white shadow-[0_0_0_3px_rgba(47,123,255,0.15)]"
                                                : "border-white/12 bg-[#0B101A] text-[#A2AAB8] hover:border-[#2F7BFF]/60 hover:text-white"
                                                }`}
                                        >
                                            <span className="flex items-start justify-between gap-2">
                                                <span className="text-[13.5px] font-semibold leading-snug">
                                                    {option.label}
                                                </span>
                                                <span
                                                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${selected
                                                        ? "border-[#2F7BFF] bg-[#2F7BFF] text-white"
                                                        : "border-white/25 text-transparent"
                                                        }`}
                                                    aria-hidden="true"
                                                >
                                                    ✓
                                                </span>
                                            </span>
                                            <span className="mt-3 text-[11.5px] leading-relaxed text-[#778397]">
                                                {option.hint}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="visitor-message"
                                className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]"
                            >
                                Tell us briefly about your project, training needs, or career goals.
                            </label>

                            <textarea
                                id="visitor-message"
                                rows={4}
                                value={messageText}
                                onChange={(event) =>
                                    setMessageText(event.target.value)
                                }
                                placeholder="A short sentence is enough — we'll follow up with the right questions."
                                className="w-full resize-y rounded-2xl border border-white/15 bg-[#0B101A] px-4 py-4 text-[15px] leading-7 text-white outline-none transition placeholder:text-[#465166] focus:border-[#2F7BFF] focus:ring-1 focus:ring-[#2F7BFF]/40"
                            />
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href={canSubmit ? whatsappUrl : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-disabled={!canSubmit}
                                className={`group inline-flex min-h-14 flex-1 items-center justify-between gap-4 rounded-full px-6 text-sm font-semibold transition ${canSubmit
                                    ? "bg-[#2F7BFF] text-white hover:bg-[#1F68E8]"
                                    : "cursor-not-allowed bg-[#1A2639] text-[#68758B]"
                                    }`}
                            >
                                <span>Start on WhatsApp</span>
                                <span className="text-lg transition-transform group-hover:translate-x-1">
                                    ↗
                                </span>
                            </a>

                            <a
                                href={canSubmit ? emailUrl : undefined}
                                aria-disabled={!canSubmit}
                                className={`inline-flex min-h-14 items-center justify-center rounded-full border px-7 text-sm font-semibold transition ${canSubmit
                                    ? "border-white/15 text-white hover:border-[#2F7BFF] hover:text-[#A9C7FF]"
                                    : "cursor-not-allowed border-white/10 text-[#596579]"
                                    }`}
                            >
                                Email instead
                            </a>
                        </div>

                        <p className="text-xs leading-6 text-[#68758B]">
                            Your name, selected service and note are included
                            in the message when you choose how to connect.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-white/[0.08] bg-[#0B101A] px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
                <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                    <div className="lg:sticky lg:top-28 lg:h-fit">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2F7BFF]">
                            Before we connect
                        </span>

                        <h2 className="mt-6 text-5xl font-medium leading-[1.03] tracking-[-0.06em] sm:text-6xl">
                            Good to
                            <br />
                            <span className="text-[#68758B]">
                                know.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-[#929EAF]">
                            A few things you might want to know before starting
                            your journey with MindSpace.
                        </p>

                        <a
                            href="#connect"
                            className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[#A9C7FF] transition hover:text-white"
                        >
                            Have another question?
                            <span>↗</span>
                        </a>
                    </div>

                    <div>
                        {faqData.map((group, groupIndex) => (
                            <div
                                key={group.category}
                                className="mb-12 last:mb-0"
                            >
                                <div className="mb-5 flex items-center gap-4">
                                    <span className="text-xs tabular-nums text-[#2F7BFF]">
                                        0{groupIndex + 1}
                                    </span>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#778397]">
                                        {group.category}
                                    </h3>
                                </div>

                                <div className="border-t border-white/10">
                                    {group.items.map((item, itemIndex) => {
                                        const isOpen = openFaq === item.q;

                                        return (
                                            <div
                                                key={item.q}
                                                className="border-b border-white/10"
                                            >
                                                <button
                                                    type="button"
                                                    aria-expanded={isOpen}
                                                    onClick={() =>
                                                        setOpenFaq(
                                                            isOpen ? null : item.q
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                                                >
                                                    <span className="flex items-start gap-5">
                                                        <span className="mt-1 text-[10px] tabular-nums text-[#596579]">
                                                            {String(itemIndex + 1).padStart(2, "0")}
                                                        </span>
                                                        <span
                                                            className={`text-base font-medium leading-7 transition-colors sm:text-lg ${isOpen
                                                                ? "text-white"
                                                                : "text-[#A2AAB8] hover:text-white"
                                                                }`}
                                                        >
                                                            {item.q}
                                                        </span>
                                                    </span>

                                                    <span
                                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 ${isOpen
                                                            ? "rotate-45 border-[#2F7BFF] bg-[#2F7BFF] text-white"
                                                            : "border-white/15 text-[#778397]"
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
                                                        <p className="max-w-2xl pb-7 pl-10 text-sm leading-8 text-[#929EAF] sm:pl-12">
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

            {/* FINAL CONTACT STRIP */}
            <section className="px-6 py-16 sm:px-10 lg:px-20">
                <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 border-b border-t border-white/10 py-10 sm:flex-row sm:items-center">
                    <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2F7BFF]">
                            MindSpace
                        </span>
                        <p className="mt-3 text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                            Your next chapter starts with a conversation.
                        </p>
                    </div>

                    <a
                        href={`mailto:${siteConfig.email}`}
                        className="group inline-flex items-center gap-4 text-sm font-semibold text-white transition hover:text-[#A9C7FF]"
                    >
                        {siteConfig.email}
                        <span className="transition-transform group-hover:translate-x-1">
                            ↗
                        </span>
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}