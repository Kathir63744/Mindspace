import type { Metadata } from "next";
import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

export const metadata: Metadata = {
    title: "Meet the Team | MindSpace",
    description: "The people who build, teach, and hire.",
};

const TEAM = [
    { name: "Arjun Mehta", role: "Lead Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", offset: "mt-0" },
    { name: "Sarah Jenkins", role: "Head of Training", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", offset: "mt-12" },
    { name: "David Chen", role: "Software Engineer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80", offset: "mt-0" },
    { name: "Priya Sharma", role: "Career Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", offset: "mt-16" },
    { name: "Marcus Thorne", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80", offset: "mt-4" },
    { name: "Elena Rodriguez", role: "DevOps Specialist", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", offset: "mt-0" },
];

export default function TeamPage() {
    return (
        <main className="bg-[#050505] text-[#F3F5FA] selection:bg-[#2F7BFF] selection:text-white min-h-screen">
            <Navbar />

            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,123,255,0.15),transparent_50%)]" />

                <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
                    <div className="max-w-3xl mb-24">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF] mb-6">The Minds Behind MindSpace</p>
                        <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                            Practitioners,<br />not theorists.
                        </h1>
                        <p className="mt-6 text-[16px] leading-[1.7] text-[#8A96A8]">
                            The people who teach also build and hire. We are a collective of engineers, designers, and educators focused on real-world outcomes.
                        </p>
                    </div>

                    {/* Staggered Image Stack Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                        {TEAM.map((member, i) => (
                            <div key={i} className={`group relative ${member.offset} transition-transform duration-500 hover:-translate-y-2`}>
                                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#0B0F17]">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="absolute inset-0 h-full w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                                    {/* Card Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="font-display text-2xl text-white">{member.name}</h3>
                                        <p className="text-sm text-[#2F7BFF] font-medium mt-1">{member.role}</p>
                                    </div>

                                    {/* Hover Accent */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#2F7BFF]/50 rounded-3xl transition-colors duration-500 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}