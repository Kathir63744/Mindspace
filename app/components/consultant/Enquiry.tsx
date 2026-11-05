"use client";

import { useState } from "react";
import Image from "next/image";
import { destinations, enquiryContent, siteConfig } from "./data";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
    "w-full rounded-xl border border-white/10 bg-[#0B0B0C]/50 px-4 py-3.5 text-white placeholder:text-white/30 focus:border-[#2dd4bf] focus:outline-none focus:ring-1 focus:ring-[#2dd4bf] transition-all";

function Field({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/50">
                {label}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function Enquiry() {
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

        const next: Record<string, string> = {};
        if (!data.name?.trim()) next.name = "Enter your name.";
        if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Enter a valid email address.";
        if (!/^\+?[\d\s-]{7,}$/.test(data.phone ?? "")) next.phone = "Enter a phone number we can reach you on.";
        if (!data.consent) next.consent = "Please agree so we can contact you.";

        setErrors(next);
        if (Object.keys(next).length) return;

        setStatus("sending");
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Request failed");
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    const describe = (id: string) => (errors[id] ? `${id}-error` : undefined);

    return (
        <section id="enquiry" className="relative w-full lg:h-screen min-h-[800px] overflow-hidden bg-[#0B0B0C] flex items-center">

            {/* LEFT SIDE: Cinematic Image & Contact Info (Hidden on Mobile) */}
            <div className="absolute left-0 top-0 hidden h-full w-1/2 lg:block">
                <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Students on campus"
                    fill
                    className="object-cover opacity-60"
                />
                {/* Gradient to fade the image into the black background on the right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/40 via-[#0B0B0C]/80 to-[#0B0B0C]" />

                {/* Contact Details overlay on the image */}
                <div className="absolute inset-0 flex flex-col justify-center p-16 xl:p-24">
                    <div className="max-w-md">
                        <h2 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white">
                            Let's build your <span className="text-[#2dd4bf] italic">future.</span>
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-white/70">
                            {enquiryContent.body}
                        </p>

                        <div className="mt-12 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-white/40">Phone</p>
                                    <a href={`tel:${siteConfig.phone}`} className="text-lg font-bold text-white hover:text-[#2dd4bf]">{siteConfig.phone}</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <path d="M22 6l-10 7L2 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-white/40">Email</p>
                                    <a href={`mailto:${siteConfig.email}`} className="text-lg font-bold text-white hover:text-[#2dd4bf]">{siteConfig.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Floating Form Card */}
            <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 lg:px-24">
                <div className="flex justify-center lg:justify-end">

                    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#151517]/80 p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-12">

                        {/* Mobile Header (shows only on small screens) */}
                        <div className="mb-8 block lg:hidden">
                            <h2 className="font-display text-3xl font-bold text-white">Let's build your future.</h2>
                            <p className="mt-2 text-white/50">{enquiryContent.body}</p>
                        </div>

                        {status === "sent" ? (
                            <div role="status" className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf]">
                                    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="font-display text-2xl font-bold text-white">We have your details.</h3>
                                <p className="mt-3 max-w-sm text-white/50">
                                    A counsellor will contact you shortly to plan your next step.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5"
                                >
                                    Send another enquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                                <div className="hidden" aria-hidden="true">
                                    <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                                </div>

                                <Field id="name" label="Full Name" error={errors.name}>
                                    <input id="name" name="name" placeholder="John Doe" className={inputCls} />
                                </Field>

                                <Field id="email" label="Email Address" error={errors.email}>
                                    <input id="email" name="email" type="email" placeholder="john@example.com" className={inputCls} />
                                </Field>

                                <Field id="phone" label="Phone Number" error={errors.phone}>
                                    <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputCls} />
                                </Field>

                                <Field id="destination" label="Preferred Country">
                                    <select id="destination" name="destination" defaultValue="" className={inputCls}>
                                        <option value="" className="bg-[#151517]">Not decided</option>
                                        {destinations.map((d) => (
                                            <option key={d.id} value={d.country} className="bg-[#151517]">
                                                {d.country}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <div className="sm:col-span-2">
                                    <Field id="level" label="Level of Study">
                                        <select id="level" name="level" defaultValue="" className={inputCls}>
                                            <option value="" className="bg-[#151517]">Select</option>
                                            {enquiryContent.levels.map((l) => (
                                                <option key={l} value={l} className="bg-[#151517]">
                                                    {l}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                <div className="sm:col-span-2">
                                    <Field id="message" label="Message (Optional)">
                                        <textarea id="message" name="message" rows={3} placeholder="How can we help you?" className={inputCls} />
                                    </Field>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="flex items-center gap-3 text-sm text-white/50">
                                        <input
                                            type="checkbox"
                                            name="consent"
                                            className="h-4 w-4 rounded border-white/20 bg-[#0B0B0C] accent-[#2dd4bf]"
                                        />
                                        I agree to be contacted about my enquiry.
                                    </label>
                                    {errors.consent && <p className="mt-1 text-sm text-red-400">{errors.consent}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#2dd4bf] px-8 py-4 font-bold text-[#0B0B0C] transition-transform hover:scale-[1.02] disabled:opacity-50"
                                    >
                                        {status === "sending" ? "Sending..." : "Submit Enquiry"}
                                    </button>
                                    {status === "error" && (
                                        <p className="mt-3 text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}