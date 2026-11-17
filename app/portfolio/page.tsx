import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

export const metadata: Metadata = {
    title: "Our Portfolio | MindSpace",
    description: "Real examples of our work.",
};

const PROJECTS = [
    { title: "Fintech Dashboard", category: "Custom Software", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", size: "aspect-[4/3] md:aspect-[16/9] md:col-span-2" },
    { title: "EdTech Platform", category: "Web Development", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80", size: "aspect-[4/3] md:aspect-[4/5] md:col-span-1 md:mt-24" },
    { title: "Health App", category: "Mobile App", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", size: "aspect-[4/3] md:aspect-square md:col-span-1" },
    { title: "Logistics System", category: "Enterprise Software", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?auto=format&fit=crop&w=1200&q=80", size: "aspect-[4/3] md:aspect-[16/10] md:col-span-2 md:-mt-12" },
    { title: "Retail E-commerce", category: "Web Development", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80", size: "aspect-[4/3] md:aspect-[3/2] md:col-span-3" },
];

export default function PortfolioPage() {
    return (
        <main className="bg-[#050505] text-[#F3F5FA] selection:bg-[#2F7BFF] selection:text-white min-h-screen">
            <Navbar />

            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF] mb-6">Selected Works</p>
                            <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                                We ship real<br />products.
                            </h1>
                        </div>
                        <p className="max-w-xs text-[15px] leading-[1.7] text-[#8A96A8] pb-2">
                            A collection of custom software, web platforms, and mobile apps we've built for our clients.
                        </p>
                    </div>

                    {/* Asymmetrical Image Stack Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PROJECTS.map((project, i) => (
                            <div key={i} className={`group relative overflow-hidden rounded-2xl bg-[#0B0F17] ${project.size}`}>
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                                    <p className="text-[#2F7BFF] text-sm font-semibold mb-2">{project.category}</p>
                                    <h3 className="font-display text-3xl text-white">{project.title}</h3>
                                </div>

                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-2xl transition-colors duration-500 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}