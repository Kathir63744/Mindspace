import Image from "next/image";
import Link from "next/link";
import TrainingList from "../components/consultant/TrainingList"; // Fixed path
import { SectionBadge } from "../components/consultant/Services";
import Navbar from "../components/consultant/Navbar";

export default function TrainingPage() {
    return (
        <main className="bg-[#0B0B0C] text-white">
                <Navbar/>
            {/* Hero Section */}
            <section className="relative flex h-[50vh] min-h-[400px] w-full items-center justify-center overflow-hidden border-b border-white/5">
                <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                    alt="Career Training"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent" />

                <div className="relative z-10 mx-auto max-w-[90rem] px-8 lg:px-24 text-center pt-20">
                    <SectionBadge text="Training & Careers" />
                    <h1 className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
                        Upskill your <span className="text-teal-400 italic">future.</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
                        Job-ready training, corporate communication workshops, and one-on-one career consultation.
                    </p>
                </div>
            </section>

            {/* Training Programs Grid */}
            <TrainingList />

            {/* Bottom CTA */}
            <section className="py-24 text-center">
                <h2 className="font-display text-3xl font-bold text-white">Ready to level up?</h2>
                <p className="mt-4 text-white/50">Join our next batch of professionals.</p>
                <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-teal-400 px-8 py-4 font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-teal-300"
                >
                    Enroll Now
                </Link>
            </section>
        </main>
    );
}