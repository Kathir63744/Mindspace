import Image from "next/image";
import Link from "next/link";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]";

export default function FeatureHighlight() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">
            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                        Your journey abroad.<br />
                        <span className="text-teal-400 ">Starts with a conversation.</span>
                    </h2>
                </div>

                {/* Main Banner Card */}
                <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#151517] shadow-2xl lg:aspect-[21/9]">

                    {/* Background Image */}
                    <Image
                        src="/feature-bg.png"
                        alt="Student consultation and study abroad guidance"
                        fill
                        className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                        priority
                    />

                    {/* Desktop Overlay Gradient (Dark on right for text) */}
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0B0B0C]/90 via-[#0B0B0C]/50 to-transparent hidden lg:block" />

                    {/* Mobile/Tablet Overlay (Dark at bottom) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent lg:hidden" />

                    {/* Floating Content Panel - ALIGNED RIGHT */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 lg:items-end lg:justify-center lg:p-16 xl:p-24">

                        <div className="flex flex-col items-start text-left lg:items-end lg:text-right">

                          

                            {/* Title */}
                            <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                Get expert guidance<br /> for your future.
                            </h3>

                            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-teal-100">
                                Courses • Visas • Applications
                            </p>

                            {/* Divider */}
                            <div className="my-6 h-1 w-12 bg-teal-400" />

                            {/* Subtitle */}
                            <p className="mb-8 max-w-sm text-base leading-relaxed text-white/80">
                                Speak directly with our experienced counsellors. We help you choose the right course, secure your visa, and apply to top universities with confidence.
                            </p>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/contact"
                                    className={`inline-flex items-center justify-center gap-3 rounded-full bg-teal-400 px-6 py-3 text-sm font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-[#FFCB5C] ${focusRing}`}
                                >
                                    Book a Free Demo
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 ${focusRing}`}
                                >
                                    Send an Enquiry
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}