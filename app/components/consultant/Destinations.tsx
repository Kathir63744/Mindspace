import Link from "next/link";
import { destinations, destinationsContent } from "./data";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F4B63F]";

export default function Destinations() {
    return (
        <section id="destinations" className="bg-[#10243E] text-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <div className="max-w-2xl">
                    <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                        {destinationsContent.heading}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-white/70">{destinationsContent.body}</p>
                </div>

                <ul className="mt-14 divide-y divide-white/15 border-y border-white/15">
                    {destinations.map((d) => (
                        <li key={d.id}>
                            <Link
                                href={`/destinations/${d.id}`}
                                className={`group grid items-center gap-3 py-8 transition-colors hover:bg-white/[0.04] sm:px-4 md:grid-cols-12 md:gap-6 ${focusRing}`}
                            >
                                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl md:col-span-4">
                                    {d.country}
                                </span>
                                <span className="leading-relaxed text-white/70 md:col-span-5">{d.note}</span>
                                <span className="md:col-span-2">
                                    <span className="block text-sm text-white/55">Intakes</span>
                                    <span className="font-medium text-[#F4B63F]">{d.intakes.join(", ")}</span>
                                </span>
                                <span className="hidden justify-self-end md:col-span-1 md:block">
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-6 w-6 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#F4B63F]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        aria-hidden="true"
                                    >
                                        <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="sr-only">Explore {d.country}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}