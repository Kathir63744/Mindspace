
"use client";

import { useState } from "react";
import { enquiryContent, siteConfig } from "./data";

export default function Enquiry() {
    const [name, setName] = useState("");

    const phoneNumber = siteConfig.phone.replace(/\D/g, "");

    const message = `Hi MindSpace, my name is ${name.trim()}. I'd like to know more about studying abroad and your guidance.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    const emailUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        "Study abroad enquiry"
    )}&body=${encodeURIComponent(
        `Hi MindSpace,\n\nMy name is ${name.trim()}.\nI'd like to know more about your guidance.\n\nThank you.`
    )}`;

    return (
        <section
            id="enquiry"
            className="relative overflow-hidden bg-[#080B12] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
        >
            {/* Background atmosphere */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-0 h-[550px] w-[550px] rounded-full bg-[#2F7BFF]/[0.08] blur-[150px]"
            />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Top label */}
                <div className="mb-16 flex items-center gap-3">
                    <span className="h-px w-9 bg-[#2F7BFF]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                        The first step
                    </span>
                </div>

                {/* Main layout */}
                <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
                    {/* Left content */}
                    <div>
                        <h2 className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.94] tracking-[-0.075em]">
                            Every journey
                            <br />
                            starts
                            <br />
                            <span className="text-[#68758B]">
                                somewhere.
                            </span>
                        </h2>

                        <p className="mt-10 max-w-md text-sm leading-8 text-[#929EAF] sm:text-base">
                            {enquiryContent.body}
                        </p>

                        <div className="mt-14 hidden border-t border-white/10 pt-7 sm:grid sm:grid-cols-2 sm:gap-8">
                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#68758B]">
                                    A little less uncertainty
                                </span>
                                <p className="mt-3 text-sm text-[#C2CAD7]">
                                    Get clarity on your next move.
                                </p>
                            </div>

                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#68758B]">
                                    A world of opportunity
                                </span>
                                <p className="mt-3 text-sm text-[#C2CAD7]">
                                    Explore what is possible.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right connection panel */}
                    <div className="relative">
                        <div className="border-y border-white/10 py-8 sm:py-10">
                            <div className="mb-10 flex items-center justify-between">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#778397]">
                                    Let's get acquainted
                                </span>

                                <span className="text-xs text-[#2F7BFF]">
                                    01 / 01
                                </span>
                            </div>

                            <label
                                htmlFor="enquiry-name"
                                className="mb-4 block text-sm text-[#A2AAB8]"
                            >
                                First things first, what should we call you?
                            </label>

                            <input
                                id="enquiry-name"
                                type="text"
                                autoComplete="given-name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && name.trim()) {
                                        window.open(
                                            whatsappUrl,
                                            "_blank",
                                            "noopener,noreferrer"
                                        );
                                    }
                                }}
                                placeholder="Your name"
                                className="w-full border-b border-white/20 bg-transparent py-5 text-3xl font-medium tracking-[-0.04em] text-white outline-none transition-colors placeholder:text-[#465166] focus:border-[#2F7BFF] sm:text-4xl"
                            />

                            <p className="mt-4 text-xs leading-6 text-[#68758B]">
                                No lengthy forms. Just a simple introduction.
                            </p>

                            <a
                                href={name.trim() ? whatsappUrl : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-disabled={!name.trim()}
                                onClick={(event) => {
                                    if (!name.trim()) event.preventDefault();
                                }}
                                className={`group mt-9 flex w-full items-center justify-between rounded-full px-7 py-5 text-sm font-semibold transition-all duration-300 ${name.trim()
                                        ? "bg-[#2F7BFF] text-white hover:bg-[#1F68E8]"
                                        : "cursor-not-allowed bg-[#17243A] text-[#68758B]"
                                    }`}
                            >
                                <span>Let's talk</span>

                                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </a>

                            <div className="mt-5 text-center">
                                <a
                                    href={name.trim() ? emailUrl : undefined}
                                    onClick={(event) => {
                                        if (!name.trim()) event.preventDefault();
                                    }}
                                    aria-disabled={!name.trim()}
                                    className={`text-xs underline underline-offset-4 transition ${name.trim()
                                            ? "text-[#929EAF] hover:text-white"
                                            : "pointer-events-none text-[#465166]"
                                        }`}
                                >
                                    Prefer email? Write to us instead.
                                </a>
                            </div>
                        </div>

                        {/* Direct contact */}
                        <div className="grid gap-8 pt-8 sm:grid-cols-2">
                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#68758B]">
                                    Call us
                                </span>

                                <a
                                    href={`tel:${siteConfig.phone}`}
                                    className="mt-3 block text-sm font-medium text-white transition hover:text-[#A9C7FF]"
                                >
                                    {siteConfig.phone}
                                </a>
                            </div>

                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#68758B]">
                                    Email us
                                </span>

                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    className="mt-3 block break-all text-sm font-medium text-white transition hover:text-[#A9C7FF]"
                                >
                                    {siteConfig.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom signature */}
                <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#596579]">
                        MindSpace / Start a conversation
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#596579]">
                        Your future. Your direction.
                    </span>
                </div>
            </div>
        </section>
    );
}
