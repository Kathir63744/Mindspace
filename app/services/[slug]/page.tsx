import { services } from "@/app/components/consultant/data";
import Footer from "@/app/components/consultant/Footer";
import Navbar from "@/app/components/consultant/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export function generateStaticParams() {
  return services.map((service: { id: any; }) => ({
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
    <main className="min-h-screen bg-[#0B0B0C] text-white">
      <Navbar />

      {/* =========================================
          1. FULL-SCREEN IMMERSIVE HERO
      ========================================= */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <Image
          src={details.heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover opacity-40 mix-blend-luminosity"
        />
        {/* Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/30 to-[#0B0B0C]/20" />


        <div className="relative z-10 mx-auto max-w-4xl px-8 text-center mt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-5 py-2 backdrop-blur-md">


          </div>

          <h1 className=" font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl drop-shadow-2xl">
            {service.title}
          </h1>

          <p className="mx-auto  max-w-2xl text-xl text-white/80 sm:text-2xl drop-shadow-lg">
            {service.short}
          </p>


        </div>
      </section>

      {/* =========================================
          2. DETAILED CONTENT SECTION
      ========================================= */}
      <section className="relative z-20 bg-[#0B0B0C] py-24">
        <div className="mx-auto max-w-[90rem] px-8 lg:px-24">
          <div className="grid gap-16 lg:grid-cols-12">

            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold text-white">Service Overview</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                {details.overview}
              </p>

              <h3 className="mt-12 font-display text-2xl font-bold text-white">Who It's For</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {details.whoItsFor.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#151517] p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-white/40">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <span className="text-sm font-medium text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-12 font-display text-2xl font-bold text-white">What's Included</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {details.included.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-teal-400/10 bg-teal-400/5 p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-400/20 text-teal-400">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-sm font-medium text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-12 font-display text-2xl font-bold text-white">Our Process</h3>
              <div className="mt-6 flex flex-col gap-4">
                {details.process.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 rounded-2xl border border-white/5 bg-[#151517] p-6 transition-colors hover:border-teal-400/30">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 font-display text-lg font-bold text-teal-400">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <p className="mt-1 text-sm text-white/50">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 rounded-3xl border border-white/10 bg-[#151517] p-8 shadow-2xl">
                <h3 className="font-display text-xl font-bold text-white">The Outcome</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/60">
                  {details.outcome}
                </p>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <Link href="/contact" className="flex w-full items-center justify-center rounded-xl bg-teal-400 px-6 py-4 font-bold text-[#0B0B0C] transition-all hover:bg-teal-300">
                    Book a Discovery Call
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