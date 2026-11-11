
"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "../components/consultant/data";
import Navbar from "../components/consultant/Navbar";
import Footer from "../components/consultant/Footer";

const faqData = [
    {
        category: "Getting started",
        items: [
            {
                q: "What is MindSpace?",
                a: "MindSpace is an education consultancy helping students explore international study opportunities, choose the right universities and navigate the application journey.",
            },
            {
                q: "How do I get started?",
                a: "Start by sharing your name with us. Our team can connect with you directly and help you understand the next steps for your study abroad plans.",
            },
            {
                q: "Do I need to know which country I want to study in?",
                a: "Not at all. We can help you explore destinations based on your academic background, interests, career goals and budget.",
            },
        ],
    },
    {
        category: "Our guidance",
        items: [
            {
                q: "Which countries do you support?",
                a: "We support students exploring destinations including the UK, USA, Canada, Australia, Germany and other international study destinations.",
            },
            {
                q: "Can you help me choose a university?",
                a: "Yes. We help you understand course options and shortlist universities that align with your academic profile, preferences and future plans.",
            },
            {
                q: "Do you assist with applications and visas?",
                a: "We provide guidance throughout the application journey, including university applications, documentation and visa preparation.",
            },
            {
                q: "Do you help with scholarships?",
                a: "We help students explore relevant scholarship opportunities and understand the eligibility and application requirements.",
            },
        ],
    },
    {
        category: "Working together",
        items: [
            {
                q: "How much do your services cost?",
                a: "Our service fees depend on the support required and the destination. We explain the applicable costs before you decide to proceed.",
            },
            {
                q: "Can I speak to someone before deciding?",
                a: "Absolutely. You can connect with our team directly to discuss your plans, ask questions and understand how we can help.",
            },
        ],
    },
];

const approach = [
    {
        number: "01",
        title: "Understand",
        description:
            "Every journey starts with understanding your ambitions, academic background and what you want from your future.",
    },
    {
        number: "02",
        title: "Explore",
        description:
            "Discover destinations, courses and universities that make sense for your goals and circumstances.",
    },
    {
        number: "03",
        title: "Move forward",
        description:
            "Get guidance through applications, documentation and the important decisions along the way.",
    },
];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [openFaq, setOpenFaq] = useState<string | null>(
        faqData[0].items[0].q
    );

    const phoneNumber = siteConfig.phone.replace(/\D/g, "");
    const message = `Hi MindSpace, my name is ${name.trim()}. I'd like to know more about studying abroad and your guidance.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const emailUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        "Study abroad enquiry"
    )}&body=${encodeURIComponent(
        `Hi MindSpace,\n\nMy name is ${name.trim()}.\nI'd like to know more about your study abroad guidance.\n\nThank you.`
    )}`;

    return (
        <main className="min-h-screen overflow-hidden bg-[#080B12] text-[#F5F7FB] selection:bg-[#2F7BFF] selection:text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-32">
                <div className="pointer-events-none absolute -right-48 top-10 h-[600px] w-[600px] rounded-full bg-[#2F7BFF]/[0.09] blur-[150px]" />

                <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                    <div>
                        <div className="mb-10 flex items-center gap-3">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                A conversation starts here
                            </span>
                        </div>

                        <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.94] tracking-[-0.075em]">
                            Your future
                            <br />
                            deserves a
                            <br />
                            <span className="text-[#68758B]">
                                bigger world.
                            </span>
                        </h1>

                        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                            <p className="max-w-md text-sm leading-7 text-[#929EAF] sm:text-base">
                                Have a destination in mind? Still exploring?
                                Either way, let's start with a conversation
                                about where you want to go.
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
                            Personal guidance to help turn your international
                            education ambitions into a clear plan.
                        </p>
                    </div>
                </div>
            </section>

            {/* APPROACH */}
            <section className="border-y border-white/[0.08] bg-[#0B101A] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-[1400px]">
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

            {/* CONNECT */}
            <section
                id="connect"
                className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
            >
                <div className="pointer-events-none absolute -left-48 top-10 h-[500px] w-[500px] rounded-full bg-[#2F7BFF]/[0.06] blur-[150px]" />

                <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
                    <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2F7BFF]">
                            Let's make it happen
                        </span>

                        <h2 className="mt-7 max-w-2xl text-5xl font-medium leading-[1.02] tracking-[-0.065em] sm:text-7xl">
                            Tell us
                            <br />
                            what to call
                            <br />
                            <span className="text-[#68758B]">
                                you.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-md text-sm leading-7 text-[#929EAF] sm:text-base">
                            No long forms. No complicated process.
                            Just your name, and we'll take it from there.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center">
                        <label
                            htmlFor="visitor-name"
                            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]"
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
                            className="w-full border-b border-white/20 bg-transparent py-5 text-2xl text-white outline-none transition placeholder:text-[#465166] focus:border-[#2F7BFF] sm:text-3xl"
                        />

                        <p className="mt-4 text-xs leading-6 text-[#68758B]">
                            Your name will be included in the message when
                            you choose how to connect.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={name.trim() ? whatsappUrl : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-disabled={!name.trim()}
                                className={`group inline-flex min-h-14 flex-1 items-center justify-between gap-4 rounded-full px-6 text-sm font-semibold transition ${name.trim()
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
                                href={name.trim() ? emailUrl : undefined}
                                aria-disabled={!name.trim()}
                                className={`inline-flex min-h-14 items-center justify-center rounded-full border px-7 text-sm font-semibold transition ${name.trim()
                                    ? "border-white/15 text-white hover:border-[#2F7BFF] hover:text-[#A9C7FF]"
                                    : "cursor-not-allowed border-white/10 text-[#596579]"
                                    }`}
                            >
                                Email instead
                            </a>
                        </div>

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
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-white/[0.08] bg-[#0B101A] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
                <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
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
            <section className="px-5 py-20 sm:px-8 lg:px-12">
                <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 border-b border-t border-white/10 py-10 sm:flex-row sm:items-center">
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
