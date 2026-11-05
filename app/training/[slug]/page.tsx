import { services } from "@/app/components/consultant/data";
import Footer from "@/app/components/consultant/Footer";
import Navbar from "@/app/components/consultant/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export function generateStaticParams() {
    return services
        .filter((s: { group: string; }) => s.group === "grow")
        .map((service: { id: any; }) => ({
            slug: service.id,
        }));
}

const trainingDetails: Record<string, any> = {
    "job-consultation": {
        heroImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop",
        overview: "Navigating a career change or trying to land your first job can be overwhelming. Our one-on-one job consultation service provides you with a dedicated career coach who will analyze your profile, identify your strengths, and map out a personalized strategy to land the role you want.",
        duration: "4 Weeks",
        format: "1-on-1 Video Calls",
        syllabus: [{ title: "Session 1: Profile Evaluation", desc: "A deep dive into your current resume, skills, and career goals." }, { title: "Session 2: Resume & LinkedIn", desc: "Complete rewrite of your resume and optimization of your LinkedIn profile." }, { title: "Session 3: Interview Prep", desc: "Mock interviews with real industry experts and detailed feedback." }, { title: "Session 4: Negotiation & Strategy", desc: "Strategies for negotiating your salary and evaluating job offers." }],
        outcome: "A polished professional profile, the confidence to ace interviews, and a clear roadmap to your next career step."
    },
    "job-training": {
        heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        overview: "Our Job Training programs are designed to bridge the gap between academic theory and industry reality. We focus on hands-on, project-based learning. You will build real applications, work with senior mentors, and learn the exact tools and workflows used by top tech companies.",
        duration: "8 - 12 Weeks",
        format: "Online / In-Person",
        syllabus: [{ title: "Module 1: Industry Fundamentals", desc: "Mastering the core tools, languages, and frameworks required for the role." }, { title: "Module 2: Real-World Projects", desc: "Building portfolio-ready projects that solve real business problems." }, { title: "Module 3: Code Reviews & Agile", desc: "Working in sprints and receiving weekly feedback from senior engineers." }, { title: "Module 4: Placement Preparation", desc: "Final interview prep, take-home assignment practice, and direct referrals." }],
        outcome: "A robust portfolio, deep technical knowledge, and direct connections to hiring partners in the industry."
    },
    "corporate-communication": {
        heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
        overview: "Great teams are built on great communication. Our Corporate and Communication Training is designed for modern workplaces. We help your teams communicate more clearly, resolve conflicts faster, and present their ideas with confidence to leadership and clients.",
        duration: "2 Days",
        format: "On-Site Workshop",
        syllabus: [{ title: "Module 1: Effective Email Writing", desc: "Learn to write clear, concise, and professional emails that get results." }, { title: "Module 2: Public Speaking & Presentations", desc: "Overcome stage fear and present ideas confidently to leadership." }, { title: "Module 3: Conflict Resolution", desc: "Techniques for handling difficult conversations and resolving team disputes." }, { title: "Module 4: Leadership Communication", desc: "How to motivate teams, deliver constructive feedback, and lead meetings." }],
        outcome: "A more cohesive team, fewer miscommunications, faster project delivery, and stronger leadership presence."
    }
};

export default async function TrainingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s: { id: string; }) => s.id === slug);
    const details = trainingDetails[slug];

    if (!service || !details) return notFound();

    return (
        <main className="min-h-screen bg-[#0B0B0C] text-white">
            <Navbar />

            {/* =========================================
          1. SPLIT-SCREEN HERO DASHBOARD
      ========================================= */}
            <section className="relative mx-auto max-w-[90rem] px-8 pt-32 pb-16 lg:px-24 lg:pt-40 lg:pb-24">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

                    {/* LEFT: Text Content */}
                    <div className="lg:col-span-5 flex flex-col justify-center">

                        {/* Live Status Badge */}
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                                Now Enrolling
                            </span>
                        </div>

                        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                            {service.title}
                        </h1>

                        <p className="mt-6 text-lg text-white/60 leading-relaxed">
                            {service.short}
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 rounded-full bg-teal-400 px-8 py-4 font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-teal-300 shadow-[0_0_30px_rgba(45,212,191,0.2)]"
                            >
                                Apply for this Program
                                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Image Dashboard Card */}
                    <div className="lg:col-span-7">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">

                            <Image
                                src={details.heroImage}
                                alt={service.title}
                                fill
                                priority
                                className="object-cover opacity-80"
                            />

                            {/* Dark gradient to protect the overlay text at the bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/20 to-transparent" />

                            {/* Floating Dashboard Info (Bottom of Image) */}
                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151517]/80 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40">Duration</p>
                                            <p className="text-lg font-bold text-white">{details.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40">Format</p>
                                            <p className="text-lg font-bold text-white">{details.format}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-full bg-teal-400/10 px-4 py-2 text-xs font-bold text-teal-400">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        Certified
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* =========================================
          2. SYLLABUS CONTENT
      ========================================= */}
            <section className="relative z-20 border-t border-white/5 bg-[#0B0B0C] py-24">
                <div className="mx-auto max-w-[90rem] px-8 lg:px-24">
                    <div className="grid gap-16 lg:grid-cols-12">

                        <div className="lg:col-span-8">
                            <h2 className="font-display text-3xl font-bold text-white">Program Overview</h2>
                            <p className="mt-6 text-lg leading-relaxed text-white/60">
                                {details.overview}
                            </p>

                            <h3 className="mt-12 font-display text-2xl font-bold text-white">Curriculum</h3>
                            <div className="mt-6 flex flex-col gap-4">
                                {details.syllabus.map((item: any, i: number) => (
                                    <div key={i} className="flex gap-6 rounded-2xl border border-white/5 bg-[#151517] p-6 transition-colors hover:border-teal-400/30">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-400/10 font-display text-lg font-bold text-teal-400">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                            <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 rounded-3xl border border-white/10 bg-[#151517] p-8 shadow-2xl">
                                <h3 className="font-display text-xl font-bold text-white">The Outcome</h3>
                                <p className="mt-4 text-sm leading-relaxed text-white/60">
                                    {details.outcome}
                                </p>

                                <div className="mt-6 border-t border-white/10 pt-6">
                                    <Link href="/contact" className="flex w-full items-center justify-center rounded-xl bg-teal-400 px-6 py-4 font-bold text-[#0B0B0C] transition-all hover:bg-teal-300">
                                        Secure Your Seat
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}