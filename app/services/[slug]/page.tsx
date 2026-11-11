import { services } from "@/app/components/consultant/data";
import Footer from "@/app/components/consultant/Footer";
import Navbar from "@/app/components/consultant/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBadge } from "@/app/components/consultant/Services";

export function generateStaticParams() {
  return services.map((service: { id: any }) => ({
    slug: service.id,
  }));
}

const serviceDetails: Record<string, any> = {
  "website-development": {
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    overview: "Your website is often the first impression a customer has of your business. We don't just build templates; we engineer custom, high-performance websites from scratch. Whether you need a sleek portfolio, a complex e-commerce store, or a corporate platform, we focus on speed, security, and search engine visibility.",
    whoItsFor: ["Businesses with an outdated, slow website", "Startups needing a professional launchpad", "Companies wanting to sell products online", "Firms looking to generate more B2B leads"],
    included: ["Custom UI/UX Design (Figma)", "Mobile-Responsive Development", "On-Page SEO Optimization", "Content Management System (CMS)", "Contact Form & CRM Integration", "Analytics & Performance Tracking"],
    process: [{ title: "Discovery", desc: "We learn about your brand, your audience, and your business goals." }, { title: "Wireframing & Design", desc: "We create the visual layout and user journey before writing any code." }, { title: "Development", desc: "We build the site using modern frameworks like Next.js and React." }, { title: "Testing & Launch", desc: "We rigorously test across devices and then deploy to your domain." }],
    outcome: "A lightning-fast, secure, and beautifully designed website that turns visitors into loyal customers."
  },
  "app-development": {
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    overview: "Mobile apps are no longer a luxury; they are a necessity for engaging with modern users. We design and build native and cross-platform mobile applications for iOS and Android. Our apps are built to be intuitive, fast, and deeply integrated with your backend systems.",
    whoItsFor: ["Businesses needing a customer-facing app", "Companies requiring internal team tools", "Startups with an app-first product strategy", "E-commerce brands wanting to boost retention"],
    included: ["iOS & Android Native Development", "Cross-Platform (React Native) Options", "App Store & Google Play Submission", "Push Notifications & In-App Purchases", "Backend API & Database Setup", "Ongoing App Maintenance"],
    process: [{ title: "Strategy & Scope", desc: "Defining the core features and user personas for the app." }, { title: "Prototyping", desc: "Creating clickable prototypes to test the user experience." }, { title: "Development Sprints", desc: "Building the app in iterative two-week cycles." }, { title: "Store Launch", desc: "Handling the entire app store submission and review process." }],
    outcome: "A seamless, engaging mobile app that keeps your users connected to your brand 24/7."
  },
  "software-development": {
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    overview: "Off-the-shelf software often forces you to change how your business operates. We build custom software—from internal dashboards and CRMs to complex SaaS platforms—tailored exactly to your workflows. Our solutions are built to scale as your business grows, ensuring you never outgrow your tools.",
    whoItsFor: ["Companies with complex, unique internal workflows", "Teams outgrowing spreadsheets and basic tools", "Businesses needing custom data dashboards", "Enterprises requiring secure internal portals"],
    included: ["Custom System Architecture", "Role-Based Access Control (RBAC)", "Third-Party API Integrations", "Database Design & Management", "Data Migration & Security Audits", "Staff Training & Documentation"],
    process: [{ title: "Requirements Gathering", desc: "Mapping out every workflow and data point your team needs." }, { title: "Architecture Design", desc: "Designing a scalable and secure database and system structure." }, { title: "Agile Development", desc: "Building the software in modules with continuous feedback." }, { title: "Deployment & Training", desc: "Rolling out the software and training your team on how to use it." }],
    outcome: "A robust, scalable software platform that streamlines your operations and saves your team countless hours."
  }
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s: { id: string; }) => s.id === slug);
  const details = serviceDetails[slug];

  if (!service || !details) return notFound();

  return (
    <main className="min-h-screen bg-[#07090F] text-white selection:bg-[#2F7BFF] selection:text-white">
      <Navbar />

      {/* =========================================
          1. FULL-SCREEN IMMERSIVE HERO
      ========================================= */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
        <Image
          src={details.heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover opacity-30 grayscale mix-blend-overlay"
        />
        {/* Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/80 via-transparent to-[#07090F]/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center mt-16 flex flex-col items-center">
          
          <SectionBadge text={`Service / ${service.title}`} />

          <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
            {service.title}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70 sm:text-xl leading-relaxed drop-shadow-lg">
            {service.short}
          </p>
        </div>
      </section>

      {/* =========================================
          2. DETAILED CONTENT SECTION
      ========================================= */}
      <section className="relative z-20 bg-[#07090F] py-24 sm:py-32">
        <div className="mx-auto max-w-[90rem] px-6 lg:px-24">
          <div className="grid gap-16 lg:grid-cols-12">

            <div className="lg:col-span-8">
              {/* Overview */}
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Service Overview</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                {details.overview}
              </p>

              {/* Who It's For */}
              <h3 className="mt-16 font-display text-2xl font-bold text-white">Who It's For</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {details.whoItsFor.map((item: string, i: number) => (
                  <div key={i} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-[#0D121D] p-5 transition-colors hover:border-[#2F7BFF]/30 hover:bg-[#111827]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F7BFF]/10 text-[#A9C7FF] transition-colors group-hover:bg-[#2F7BFF] group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* What's Included */}
              <h3 className="mt-16 font-display text-2xl font-bold text-white">What's Included</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {details.included.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl border border-[#2F7BFF]/20 bg-[#2F7BFF]/5 p-5 transition-colors hover:border-[#2F7BFF]/50">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2F7BFF]/20 text-[#A9C7FF]">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* Our Process */}
              <h3 className="mt-16 font-display text-2xl font-bold text-white">Our Process</h3>
              <div className="relative mt-8 flex flex-col gap-6 before:absolute before:left-5 before:top-5 before:bottom-5 before:w-px before:bg-white/10">
                {details.process.map((step: any, i: number) => (
                  <div key={i} className="group relative flex gap-6 rounded-2xl border border-white/5 bg-[#0D121D] p-6 transition-colors hover:border-[#2F7BFF]/30 hover:bg-[#111827]">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#07090F] border border-white/10 font-display text-lg font-bold text-[#A9C7FF] transition-colors group-hover:border-[#2F7BFF] group-hover:bg-[#2F7BFF] group-hover:text-white">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 overflow-hidden rounded-3xl border border-white/10 bg-[#0D121D] p-8 shadow-2xl shadow-[#2F7BFF]/5">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#2F7BFF] to-transparent opacity-50" />
                
                <h3 className="font-display text-xl font-bold text-white">The Outcome</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/60">
                  {details.outcome}
                </p>
                <div className="mt-8 border-t border-white/10 pt-8">
                  <Link 
                    href="/contact" 
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F7BFF] px-6 py-4 font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#4a8cff] shadow-[0_0_20px_rgba(47,123,255,0.3)] hover:shadow-[0_0_30px_rgba(47,123,255,0.5)]"
                  >
                    Book a Discovery Call
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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