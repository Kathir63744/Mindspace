"use client";

import { useState } from "react";
import Image from "next/image";
import { destinations, enquiryContent, siteConfig } from "../components/consultant/data";
import Navbar from "../components/consultant/Navbar";
import Footer from "../components/consultant/Footer";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
    "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#2dd4bf] focus:outline-none focus:ring-1 focus:ring-[#2dd4bf] transition-all";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                {label}
            </label>
            {children}
            {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}

export default function ContactPage() {
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

        const next: Record<string, string> = {};
        if (!data.name?.trim()) next.name = "Required.";
        if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Invalid email.";
        if (!/^\+?[\d\s-]{7,}$/.test(data.phone ?? "")) next.phone = "Invalid phone.";
        if (!data.consent) next.consent = "Required.";

        setErrors(next);
        if (Object.keys(next).length) return;

        setStatus("sending");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    const describe = (id: string) => (errors[id] ? `${id}-error` : undefined);

    return (
        <main className="min-h-screen bg-[#0B0B0C] text-white selection:bg-[#2dd4bf] selection:text-[#0B0B0C]">
            <Navbar />

            {/* =========================================
          FULL-SCREEN IMAGE + EMBEDDED FORM
      ========================================= */}
            <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20">

                {/* Background Image (The Canvas) */}
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
                    alt="Office Background"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Dark Overlay to make text readable */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/50" />

                {/* The Compact Glass Form */}
                <div className="relative z-10 w-full max-w-4xl px-6">

                    <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl md:grid-cols-5">

                        {/* Left Column: Contact Info (2 cols) */}
                        <div className="flex flex-col justify-between bg-white/5 p-8 md:col-span-2 md:p-10">
                            <div>
                                <h2 className="font-display text-3xl font-bold text-white">Let's Talk.</h2>
                                <p className="mt-3 text-sm text-white/50">
                                    Fill out the form or contact us directly.
                                </p>

                                <div className="mt-8 space-y-6">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40">Email</p>
                                        <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm font-bold text-white hover:text-[#2dd4bf]">{siteConfig.email}</a>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40">Phone</p>
                                        <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-sm font-bold text-white hover:text-[#2dd4bf]">{siteConfig.phone}</a>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40">Office</p>
                                        <p className="mt-1 text-sm font-bold text-white">{siteConfig.address}</p>
                                        <p className="text-xs text-white/50">{siteConfig.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: The Form (3 cols) */}
                        <div className="p-8 md:col-span-3 md:p-10">
                            {status === "sent" ? (
                                <div role="status" className="flex h-full flex-col items-center justify-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf]">
                                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-white">Sent!</h3>
                                    <p className="mt-2 text-sm text-white/50">We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} noValidate className="flex h-full flex-col justify-center gap-4">

                                    <div className="hidden" aria-hidden="true">
                                        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Field id="name" label="Name" error={errors.name}>
                                            <input id="name" name="name" placeholder="John Doe" className={inputCls} />
                                        </Field>
                                        <Field id="email" label="Email" error={errors.email}>
                                            <input id="email" name="email" type="email" placeholder="john@example.com" className={inputCls} />
                                        </Field>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Field id="phone" label="Phone" error={errors.phone}>
                                            <input id="phone" name="phone" type="tel" placeholder="+1 555 000" className={inputCls} />
                                        </Field>
                                        <Field id="destination" label="Country">
                                            <select id="destination" name="destination" defaultValue="" className={inputCls}>
                                                <option value="" className="bg-[#151517]">Not decided</option>
                                                {destinations.map((d) => (
                                                    <option key={d.id} value={d.country} className="bg-[#151517]">{d.country}</option>
                                                ))}
                                            </select>
                                        </Field>
                                    </div>

                                    <Field id="level" label="Level of Study">
                                        <select id="level" name="level" defaultValue="" className={inputCls}>
                                            <option value="" className="bg-[#151517]">Select</option>
                                            {enquiryContent.levels.map((l) => (
                                                <option key={l} value={l} className="bg-[#151517]">{l}</option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field id="message" label="Message">
                                        <textarea id="message" name="message" rows={3} placeholder="How can we help?" className={inputCls} />
                                    </Field>

                                    <div className="mt-2">
                                        <label className="flex items-start gap-2 text-xs text-white/50">
                                            <input type="checkbox" name="consent" className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-black/40 accent-[#2dd4bf]" />
                                            I agree to be contacted.
                                        </label>
                                        {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="mt-2 w-full rounded-lg bg-[#2dd4bf] px-6 py-3.5 text-sm font-bold text-[#0B0B0C] transition-all hover:bg-[#5eead4] disabled:opacity-50"
                                    >
                                        {status === "sending" ? "Sending..." : "Send Message"}
                                    </button>
                                    {status === "error" && (
                                        <p className="text-center text-xs text-red-400">Error. Try again.</p>
                                    )}
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}