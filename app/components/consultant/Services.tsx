import Image from "next/image";
import Link from "next/link";

// Updated icons for education consultancy
const icons: Record<string, React.ReactNode> = {
    globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    document: (
        <>
            <path d="M7 3h7l4 4v14H7z" strokeLinejoin="round" />
            <path d="M14 3v4h4M10 12h5M10 16h5" strokeLinecap="round" />
        </>
    ),
    shield: (
        <>
            <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    compass: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" strokeLinejoin="round" />
        </>
    ),
    cap: (
        <>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    chat: (
        <>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
};

// Education Services Data
const services = [
    { id: "counselling", title: "Career Counselling", body: "One-on-one sessions to understand your goals and map out the right academic path.", icon: "compass", href: "/contact" },
    { id: "admissions", title: "University Admissions", body: "Shortlisting universities, SOP review, and application submission to top global institutions.", icon: "cap", href: "/contact" },
    { id: "visa", title: "Visa Assistance", body: "End-to-end support for your student visa, from documentation to interview prep.", icon: "document", href: "/contact" },
    { id: "tests", title: "Test Preparation", body: "Expert coaching for IELTS, TOEFL, GRE, and GMAT to meet entry requirements.", icon: "globe", href: "/contact" },
    { id: "scholarships", title: "Scholarship Guidance", body: "Helping you find and apply for financial aid and scholarships to fund your studies.", icon: "shield", href: "/contact" },
    { id: "pre-departure", title: "Pre-Departure Briefing", body: "Guidance on accommodation, forex, travel, and life in your new country.", icon: "chat", href: "/contact" },
];

const servicesContent = {
    heading: "Your path to studying abroad.",
    body: "We provide comprehensive support at every step of your international education journey.",
    cta: { label: "Book a Consultation", href: "/contact" }
};

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]";

export function SectionBadge({ text }: { text: string }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB547]/30 bg-[#FFB547]/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-100">
                {text}
            </span>
        </div>
    );
}

export default function Services() {
    return (
        <section id="services" className="relative isolate overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">
            <Image
                src="/services-bg.jpg"
                alt=""
                fill
                className="-z-20 object-cover opacity-10 mix-blend-luminosity"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0B0C] via-[#0B0B0C]/80 to-[#0B0B0C]" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">

                {/* CENTERED HEADER SECTION */}
                <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-24">
                    <SectionBadge text="Our Services" />

                    <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                        Expert guidance for<br />
                        <span className="text-teal-400 ">every step.</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
                        {servicesContent.body}
                    </p>
                </div>

                {/* TWO COLUMN LAYOUT */}
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-stretch">

                    {/* LEFT SIDE: Showcase Image, Features & CTA (Sticky) */}
                    <div className="lg:sticky lg:top-32 lg:col-span-5 flex flex-col h-full">
                        <div className="relative w-full">
                            <div className="absolute -inset-2 rounded-[2rem] bg-[#FFB547]/5 blur-xl" />
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                                <Image
                                    src="/our-services.jpg" // Replace with an image of a student/counsellor
                                    alt="Mind Space services"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 to-transparent" />
                            </div>
                        </div>

                        <div className="mt-10 flex-1">
                            <h3 className="font-display text-2xl font-bold text-white mb-6">
                                Why consult with us?
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Personalized university shortlisting",
                                    "High visa success rate with expert file prep",
                                    "Scholarship and financial aid assistance",
                                    "Support from application to arrival"
                                ].map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/70">
                                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFB547]/20 text-teal-400">
                                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="text-[15px] leading-relaxed">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10">
                            <Link
                                href={servicesContent.cta.href}
                                className={`group inline-flex items-center gap-3 rounded-full bg-teal-400 px-8 py-4 font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-[#FFCB5C] ${focusRing}`}
                            >
                                {servicesContent.cta.label}
                                <svg viewBox="0 0 20 20" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE: 3x3 Service Cards Grid */}
                    <div className="lg:col-span-7">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {services.map((s) => (
                                <Link
                                    key={s.id}
                                    href={s.href}
                                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#151517]/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FDE6C4]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${focusRing}`}
                                >
                                    {/* WHEAT COLORED BACKGROUND CURVES */}
                                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#FDE6C4]/5 blur-[20px] transition-colors duration-500 group-hover:bg-[#FDE6C4]/10" />
                                    <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-tl from-[#FDE6C4]/10 via-[#FDE6C4]/5 to-transparent transition-transform duration-500 group-hover:scale-110" />

                                    <div className="relative z-10 mb-8">
                                        <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-[#FDE6C4]">
                                            {s.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                                            {s.body}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-end justify-between mt-auto">
                                        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-white/50 transition-colors group-hover:text-[#FDE6C4] ${focusRing}`}>
                                            Learn more
                                            <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-400/10 text-[#FDE6C4] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                {icons[s.icon]}
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}