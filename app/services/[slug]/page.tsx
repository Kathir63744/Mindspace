import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

import {
  SERVICES,
  PILLARS,
  type IconName,
} from "@/app/components/consultant/services/ServicesData";

import {
  Eyebrow,
  GradientText,
  Icon,
  Reveal,
  StyleTag,
  focusRing,
} from "@/app/components/consultant/services/ServicesUi";
import ServiceBackgroundVideo from "@/app/components/consultant/services/ServiceBackgrounVideo";
import ServiceBackgrounVideo from "@/app/components/consultant/services/ServiceBackgrounVideo";

/* ============================================================
   Detail data
============================================================ */

type ServiceDetail = {
  heroImage: string;
  heroAlt: string;
  tagline: string;
  overview: string;
  whoItsFor: string[];
  included: string[];
  process: { title: string; desc: string }[];
  outcome: string;
  deliverables: { icon: IconName; title: string; text: string }[];
  timeframe: string;
  startingFrom: string;
};

const DETAILS: Record<string, ServiceDetail> = {
  "website-development": {
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    heroAlt: "Website design and development",
    tagline: "Fast, responsive, and built to convert.",
    overview:
      "Your website is often the first impression a customer has of your business. We build sites that load fast, look sharp, and guide visitors to take action.",
    whoItsFor: [
      "Businesses with an outdated, slow website",
      "Startups needing a professional launchpad",
      "Companies wanting to sell products online",
      "Firms looking to generate more B2B leads",
    ],
    included: [
      "Custom UI/UX design (Figma)",
      "Mobile-responsive development",
      "On-page SEO optimization",
      "Content management system (CMS)",
      "Contact form & CRM integration",
      "Analytics & performance tracking",
    ],
    process: [
      { title: "Discovery", desc: "We learn about your brand, your audience, and your business goals." },
      { title: "Wireframing & design", desc: "We create the visual layout and user journey before writing any code." },
      { title: "Development", desc: "We build the site using modern frameworks like Next.js and React." },
      { title: "Testing & launch", desc: "We rigorously test across devices and then deploy to your domain." },
    ],
    outcome:
      "A lightning-fast, secure, and beautifully designed website that turns visitors into loyal customers.",
    deliverables: [
      { icon: "globe", title: "Production-ready site", text: "Deployed to your domain with SSL and analytics wired up." },
      { icon: "pen", title: "Figma design file", text: "Every screen, component and state documented for future edits." },
      { icon: "trend", title: "SEO foundations", text: "Schema, sitemap, meta tags and Core Web Vitals in the green." },
    ],
    timeframe: "4–8 weeks",
    startingFrom: "From $4,800",
  },
  "app-development": {
    heroImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    heroAlt: "Mobile app development",
    tagline: "Native and cross-platform apps people keep.",
    overview:
      "Mobile apps are no longer a luxury. We build apps that are fast, intuitive, and integrated with your backend from day one.",
    whoItsFor: [
      "Businesses needing a customer-facing app",
      "Companies requiring internal team tools",
      "Startups with an app-first product strategy",
      "E-commerce brands wanting to boost retention",
    ],
    included: [
      "iOS & Android native development",
      "Cross-platform (React Native) options",
      "App Store & Google Play submission",
      "Push notifications & in-app purchases",
      "Backend API & database setup",
      "Ongoing app maintenance",
    ],
    process: [
      { title: "Strategy & scope", desc: "Defining the core features and user personas for the app." },
      { title: "Prototyping", desc: "Creating clickable prototypes to test the user experience." },
      { title: "Development sprints", desc: "Building the app in iterative two-week cycles." },
      { title: "Store launch", desc: "Handling the entire app store submission and review process." },
    ],
    outcome:
      "A seamless, engaging mobile app that keeps your users connected to your brand 24/7.",
    deliverables: [
      { icon: "mobile", title: "iOS & Android binaries", text: "Signed builds uploaded to both stores, with release notes." },
      { icon: "layers", title: "Backend API", text: "Documented endpoints, auth, database schema and admin panel." },
      { icon: "shield", title: "Store submission handled", text: "App Store and Play Store review, metadata and screenshots." },
    ],
    timeframe: "8–14 weeks",
    startingFrom: "From $12,000",
  },
  "software-development": {
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    heroAlt: "Custom software and dashboards",
    tagline: "Systems shaped around how your team works.",
    overview:
      "Off-the-shelf software often forces you to change how your business operates. We build systems that fit your actual workflow.",
    whoItsFor: [
      "Companies with complex, unique internal workflows",
      "Teams outgrowing spreadsheets and basic tools",
      "Businesses needing custom data dashboards",
      "Enterprises requiring secure internal portals",
    ],
    included: [
      "Custom system architecture",
      "Role-based access control (RBAC)",
      "Third-party API integrations",
      "Database design & management",
      "Data migration & security audits",
      "Staff training & documentation",
    ],
    process: [
      { title: "Requirements gathering", desc: "Mapping out every workflow and data point your team needs." },
      { title: "Architecture design", desc: "Designing a scalable and secure database and system structure." },
      { title: "Agile development", desc: "Building the software in modules with continuous feedback." },
      { title: "Deployment & training", desc: "Rolling out the software and training your team on how to use it." },
    ],
    outcome:
      "A robust, scalable software platform that streamlines your operations and saves your team countless hours.",
    deliverables: [
      { icon: "code", title: "Custom platform", text: "Full-stack app, deployed to your cloud or ours." },
      { icon: "users", title: "Role-based access", text: "Granular permissions, audit logs, SSO-ready." },
      { icon: "file", title: "Docs & training", text: "Runbooks, API docs and live training for your team." },
    ],
    timeframe: "10–20 weeks",
    startingFrom: "From $18,000",
  },
};

const FALLBACK_DETAILS = DETAILS["website-development"];
export const instant = false;
/* ============================================================
   Static params / metadata
============================================================ */

export function generateStaticParams() {
  return SERVICES.filter((s) => s.linked).map((s) => ({
    slug: s.href.split("/").pop()!,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(
    (s) => s.href.endsWith(`/${slug}`) && s.linked
  );
  if (!service) return { title: "Service not found | MindSpace" };
  return {
    title: `${service.title} | MindSpace`,
    description: service.need,
  };
}

/* ============================================================
   Page
============================================================ */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find(
    (s) => s.href.endsWith(`/${slug}`) && s.linked
  );
  if (!service) return notFound();

  const details = DETAILS[slug] || FALLBACK_DETAILS;
  const pillar = PILLARS.find((p) => p.tag === service.pillar);
  const relatedServices = SERVICES.filter(
    (s) => s.pillar === service.pillar && s.href !== service.href
  ).slice(0, 3);

  return (
    <main className="relative w-full bg-[#050505] text-white selection:bg-[#2F7BFF] selection:text-white">
      <StyleTag />
      <Navbar />

      {/* ============================================================
                HERO — VIDEO BACKGROUND, EDITORIAL SUMMARY
            ============================================================ */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#050505]">
        {/* 1. Video Background */}
        <ServiceBackgroundVideo src="/service-bg.mp4" rate={0.85} />

        {/* 2. Subtle radial vignette to darken the center just enough for the huge text to pop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.2)_60%,transparent_100%)]"
        />

        {/* 3. Bottom fade to blend seamlessly into the next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[30%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"
        />

        {/* 4. Centered Content Wrapper */}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 text-center sm:py-40">

          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-[#2F7BFF] shadow-[0_0_12px_rgba(47,123,255,0.8)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A9C7FF]">
                {service.pillar}
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* Massive, dominant headline */}
            <h1 className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white drop-shadow-2xl">
              {service.title.split(" ").slice(0, -1).join(" ")}{" "}
              <GradientText>
                {service.title.split(" ").slice(-1)}
              </GradientText>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-[700px] text-[16px] leading-[1.6] text-[#DCE9FF] sm:text-[20px]">
              {details.tagline}
            </p>
          </Reveal>

          {/* Floating summary stats row (no buttons) */}
          <Reveal delay={300}>
            <div className="mx-auto mt-16 flex w-fit flex-wrap items-center justify-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 backdrop-blur-md sm:gap-12">
              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A96A8] mb-1">
                  Timeline
                </p>
                <p className="font-display text-[15px] sm:text-lg text-white">
                  {details.timeframe}
                </p>
              </div>

              <div className="hidden h-8 w-px bg-white/10 sm:block" />

              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A96A8] mb-1">
                  Starting From
                </p>
                <p className="font-display text-[15px] sm:text-lg text-white">
                  {details.startingFrom}
                </p>
              </div>

              <div className="hidden h-8 w-px bg-white/10 sm:block" />

              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A96A8] mb-1">
                  Outcome
                </p>
                <p className="font-display text-[15px] sm:text-lg text-white">
                  Deployment
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ============================================================
                OVERVIEW
            ============================================================ */}

      <section
        id="overview"
        className="relative scroll-mt-24 bg-[#050505] py-20 text-white lg:py-28"
      >
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.045em]">
                {service.title}{" "}
                <span className="text-[#7CC4FF]">in practice.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.85] text-[#A9BCD9]">
                {details.overview}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative rounded-3xl border border-[#2F7BFF]/30 bg-[#0A1024]/70 p-6 backdrop-blur-xl">
                <dl className="space-y-5">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.26em] text-[#9CCBFF]">
                      Typical timeline
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl tracking-[-0.03em]">
                      {details.timeframe}
                    </dd>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <dt className="text-[10px] uppercase tracking-[0.26em] text-[#9CCBFF]">
                      Starting from
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl tracking-[-0.03em]">
                      {details.startingFrom}
                    </dd>
                  </div>
                  {pillar && (
                    <div className="border-t border-white/10 pt-5">
                      <dt className="text-[10px] uppercase tracking-[0.26em] text-[#9CCBFF]">
                        Pillar
                      </dt>
                      <dd className="mt-1.5 text-[14px] text-white/80">
                        {service.pillar}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
                DELIVERABLES
            ============================================================ */}

      <section className="relative bg-[#050505] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal>
            <Eyebrow>What lands in your hands</Eyebrow>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {details.deliverables.map((d, i) => (
              <li key={d.title}>
                <Reveal delay={i * 80}>
                  <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0F1A]/80 to-[#050505] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#2F7BFF]/60">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF] transition-colors duration-300 group-hover:bg-[#2F7BFF] group-hover:text-white">
                      <Icon name={d.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.15rem] leading-[1.2] tracking-[-0.03em]">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#9FB2CF]">
                      {d.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
                WHO IT'S FOR + INCLUDED
            ============================================================ */}

      <section className="relative bg-[#080B12] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.04em]">
                You need this when{" "}
                <GradientText>{service.need}</GradientText>
              </h2>

              <ul className="mt-8 space-y-3">
                {details.whoItsFor.map((item, i) => (
                  <li key={item}>
                    <Reveal x={-20} y={0} delay={i * 60}>
                      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0B0F1A]/60 p-4 text-[14px] leading-snug text-[#DCE9FF]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#2F7BFF]/30 text-[#9CD3FF]">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {item}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <Eyebrow>What&apos;s included</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.04em]">
                Everything in the scope.
              </h2>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {details.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[#2F7BFF]/25 bg-[#0B0F1A]/50 p-4 text-[13.5px] leading-snug text-[#DCE9FF]"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#2F7BFF]/40 text-[#9CD3FF]">
                      <Icon name="check" className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
                PROCESS
            ============================================================ */}

      <section className="relative bg-[#050505] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.045em]">
              From first call to{" "}
              <GradientText>final handover.</GradientText>
            </h2>
          </Reveal>

          <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <span
              aria-hidden="true"
              className="absolute inset-x-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#2F7BFF]/40 to-transparent lg:block"
            />
            {details.process.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 100}>
                  <div className="relative rounded-3xl border border-white/10 bg-[#0B0F1A]/60 p-6 transition-colors hover:border-[#2F7BFF]/50">
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-[#2F7BFF]/40 bg-[#050505] font-display text-lg text-[#7CC4FF]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-display text-[1.1rem] tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#9FB2CF]">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
                OUTCOME + CTA
            ============================================================ */}

      <section className="relative isolate overflow-hidden bg-[#050505] py-24 text-center text-white lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 80% at 50% 100%, rgba(47,123,255,0.10), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[900px] px-6">
          <Reveal>
            <Eyebrow>The outcome</Eyebrow>
            <p className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] tracking-[-0.03em]">
              {details.outcome}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-2 rounded-full bg-[#2F7BFF] px-7 py-3.5 text-[14.5px] text-white shadow-[0_0_35px_rgba(47,123,255,0.25)] transition-colors hover:bg-[#4a8cff] ${focusRing}`}
              >
                Book a free consultation
                <Icon
                  name="arrow"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/services"
                className={`rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-[14.5px] text-white/90 backdrop-blur-md transition-colors hover:border-[#7CC4FF]/60 ${focusRing}`}
              >
                Browse all services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
                RELATED
            ============================================================ */}

      {pillar && relatedServices.length > 0 && (
        <section className="relative bg-[#080B12] py-20 text-white lg:py-24">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <Eyebrow>Also in {pillar.tag}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.04em]">
                  Related services
                </h2>
              </Reveal>

              <Link
                href={`/services/${pillar.id}`}
                className={`group inline-flex items-center gap-2 text-[13px] text-[#7CC4FF] hover:text-white ${focusRing}`}
              >
                Explore the full {pillar.tag} path
                <Icon
                  name="arrow"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((r, i) => (
                <li key={r.title}>
                  <Reveal delay={i * 80}>
                    <Link
                      href={r.href}
                      className={`group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0F1A]/80 to-[#050505] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#2F7BFF]/60 ${focusRing}`}
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF] transition-colors duration-300 group-hover:bg-[#2F7BFF] group-hover:text-white">
                        <Icon name={r.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-[1.15rem] leading-[1.2] tracking-[-0.03em]">
                        {r.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#9FB2CF]">
                        <span className="text-[#7CC4FF]">
                          You need this when
                        </span>{" "}
                        {r.need}.
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#7CC4FF] transition-colors group-hover:text-white">
                        {r.linked ? "View details" : "Ask about this"}
                        <Icon
                          name="arrow"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}