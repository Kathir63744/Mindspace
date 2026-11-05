import Link from "next/link";
import { services } from "./data";

const icons: Record<string, React.ReactNode> = {
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" strokeLinecap="round" strokeLinejoin="round" /></>,
    mobile: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" strokeLinecap="round" strokeLinejoin="round" /></>,
    code: <><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" strokeLinejoin="round" /></>,
    cap: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" /></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" /></>,
};

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]";

export default function TrainingList() {
    // Filter only the training programs (group: "grow")
    const trainingPrograms = services.filter((s) => s.group === "grow");

    return (
        <section id="training" className="relative isolate overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">
            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {trainingPrograms.map((s) => (
                        <Link
                            key={s.id}
                            href={s.href}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#151517]/80 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2dd4bf]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${focusRing}`}
                        >
                            {/* Hover Glow Background */}
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2dd4bf]/5 blur-[30px] transition-colors duration-500 group-hover:bg-[#2dd4bf]/10" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[#2dd4bf] ring-1 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2dd4bf]/10 group-hover:ring-[#2dd4bf]/30">
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                        {icons[s.icon]}
                                    </svg>
                                </div>

                                <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#2dd4bf]">
                                    {s.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/60">
                                    {s.body}
                                </p>
                            </div>

                            {/* Explore Arrow */}
                            <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors group-hover:text-[#2dd4bf]">
                                View Program
                                <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}