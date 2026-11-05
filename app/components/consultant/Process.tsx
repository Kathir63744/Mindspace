import Image from "next/image";
import { processContent, processSteps } from "./data";
import { SectionBadge } from "./Services";

// We add specific images and taglines for each step to make it visually connected
const stepVisuals = [
    {
        img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop", // Consultation
        tagline: "We Listen",
    },
    {
        img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop", // Shortlisting
        tagline: "We Plan",
    },
    {
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop", // Application
        tagline: "We Apply",
    },
    {
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop", // Visa
        tagline: "We Secure",
    },
    {
        img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop", // Fly
        tagline: "You Fly",
    }
];

export default function Process() {
    return (
        <section id="process" className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">

            {/* Ambient Glow */}
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2dd4bf]/5 blur-[120px]" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <SectionBadge text="How It Works" />
                    <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                        {processContent.heading}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/50">
                        {processContent.body}
                    </p>
                </div>

                {/* THE CONNECTED ROUTE MAP */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#151517] shadow-2xl">
                    <div className="grid grid-cols-1 divide-y divide-white/5 sm:grid-cols-5 sm:divide-x sm:divide-y-0">

                        {processSteps.map((step, i) => (
                            <div key={step.title} className="group relative flex flex-col">

                                {/* 1. TOP: Image with Tagline Overlay */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={stepVisuals[i].img}
                                        alt={step.title}
                                        fill
                                        className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                                    />
                                    {/* Gradient to blend image into the dark text area below */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151517] via-transparent to-black/40" />

                                    {/* Unique Tagline */}
                                    <div className="absolute bottom-4 left-0 right-0 text-center">
                                        <span className="font-display text-lg font-bold text-[#2dd4bf] uppercase tracking-widest drop-shadow-md">
                                            {stepVisuals[i].tagline}
                                        </span>
                                    </div>
                                </div>

                                {/* 2. BOTTOM: Step Details */}
                                <div className="relative flex flex-1 flex-col p-6">

                                    {/* NEW TREND: Floating Number Chip overlapping the image */}
                                    <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B0B0C] border border-white/10 shadow-lg transition-colors duration-300 group-hover:border-[#2dd4bf] group-hover:bg-[#2dd4bf]">
                                        <span className="font-display text-sm font-bold text-white transition-colors group-hover:text-[#0B0B0C]">
                                            0{i + 1}
                                        </span>
                                    </div>

                                    <h3 className="mt-2 font-display text-lg font-bold text-white transition-colors group-hover:text-[#2dd4bf]">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                                        {step.body}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
}