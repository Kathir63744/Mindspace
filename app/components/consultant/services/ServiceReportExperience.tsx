"use client";

import Link from "next/link";
import {
    useMemo,
    useRef,
    useState,
    type PointerEvent,
    type ReactNode,
} from "react";

import type {
    Service,
    Pillar,
} from "@/app/components/consultant/services/ServicesData";

import ServiceBackgroundVideo from "@/app/components/consultant/services/ServiceBackgrounVideo";
import ServiceSignalAnimation from "@/app/components/consultant/services/ServicesSignalAnimation";
import ServiceUsageHighlights from "@/app/components/consultant/services/ServiceUsageHighlights";
import ServiceMeaningSection from "@/app/components/consultant/services/ServiceMeaningSection";
import ServiceImpactSection from "@/app/components/consultant/services/ServiceImpactSection";

type ReportDetail = {
    tagline: string;
    intro: string;
    audience: {
        title: string;
        description: string;
        need: string;
        outcome: string;
    }[];
    challenge: string;
    useCases: {
        title: string;
        text: string;
        label: string;
    }[];
    deliverables: {
        title: string;
        text: string;
    }[];
    outcome: string;
    timeline: string;
    investment: string;
};

const REPORTS: Record<string, ReportDetail> = {
    /* ==========================================================
       WEBSITE DEVELOPMENT
    ========================================================== */
    "website-development": {
        tagline: "Digital experiences that make the next step obvious.",
        intro:
            "A website should do more than look current. It should help the right people understand your offer, trust your business and take action — on every screen.",
        audience: [
            {
                title: "Growing businesses",
                description:
                    "Your current website no longer reflects the quality or direction of the business.",
                need: "A stronger digital presence",
                outcome:
                    "A clear, credible website that can grow with the business.",
            },
            {
                title: "New ventures & startups",
                description:
                    "You need a confident first impression and a clear place to introduce a new offer.",
                need: "A launch-ready platform",
                outcome:
                    "A focused launch experience with a clear path to enquiry or conversion.",
            },
            {
                title: "Marketing & sales teams",
                description:
                    "Visitors arrive, but the site does not guide them towards the right action.",
                need: "A conversion-focused journey",
                outcome:
                    "Better page structure, clearer calls to action and useful measurement.",
            },
            {
                title: "Teams managing content",
                description:
                    "Updating pages is slow, technical or dependent on a developer for every change.",
                need: "A manageable content workflow",
                outcome:
                    "An editing setup that supports everyday updates and future growth.",
            },
        ],
        challenge:
            "A slow, unclear or difficult-to-maintain website creates friction before a conversation even begins. Visitors should not have to work hard to understand what you do, why it matters or what to do next.",
        useCases: [
            {
                label: "01 / Presence",
                title: "Explain what you do",
                text: "Bring your services, value and point of difference together in a structure people can understand quickly.",
            },
            {
                label: "02 / Acquisition",
                title: "Turn visits into enquiries",
                text: "Use focused landing pages, useful content and clear calls to action to help visitors take the next step.",
            },
            {
                label: "03 / Commerce",
                title: "Support online transactions",
                text: "Create product discovery, buying journeys and connected workflows that suit the way you sell.",
            },
            {
                label: "04 / Operations",
                title: "Make updates easier",
                text: "Give your team a manageable content system and a foundation that can be extended over time.",
            },
        ],
        deliverables: [
            {
                title: "Responsive website",
                text: "A considered experience across desktop, tablet and mobile.",
            },
            {
                title: "Content management",
                text: "CMS or editing workflows suited to the people maintaining the site.",
            },
            {
                title: "Search foundations",
                text: "Metadata, sitemap and technical foundations prepared for discoverability.",
            },
            {
                title: "Measurement setup",
                text: "Analytics and agreed conversion events to help understand how the site is used.",
            },
        ],
        outcome:
            "A useful digital front door: clear to navigate, easier to maintain and ready to support the next stage of the business.",
        timeline: "Scoped after discovery",
        investment: "Quoted against the agreed scope",
    },

    /* ==========================================================
       MOBILE APP DEVELOPMENT
    ========================================================== */
    "app-development": {
        tagline: "Mobile products built around the moments people use them.",
        intro:
            "A mobile product needs to fit naturally into real routines. We plan and build connected app experiences for customers, members and internal teams.",
        audience: [
            {
                title: "Customer-facing businesses",
                description:
                    "Your customers need a simpler way to access services, information or transactions.",
                need: "A useful customer app",
                outcome:
                    "A focused mobile journey for the tasks customers repeat.",
            },
            {
                title: "Operations teams",
                description:
                    "Your staff rely on manual steps or disconnected tools while away from their desks.",
                need: "Mobile workflows",
                outcome:
                    "A more accessible way to complete and track operational work.",
            },
            {
                title: "Product startups",
                description:
                    "You have an app-first idea and need to validate the smallest useful product.",
                need: "A practical first release",
                outcome:
                    "A clear MVP scope that can be tested and improved with users.",
            },
            {
                title: "Membership services",
                description:
                    "Your community needs a connected place for updates, accounts and participation.",
                need: "A connected member experience",
                outcome:
                    "A consistent app experience supported by the right data and services.",
            },
        ],
        challenge:
            "An app adds complexity when the user journey, data and operational workflow are not designed together. The product must feel simple on the surface and dependable underneath.",
        useCases: [
            {
                label: "01 / Customer",
                title: "Self-service access",
                text: "Let customers manage key tasks, view information and interact with your service from a mobile device.",
            },
            {
                label: "02 / Field teams",
                title: "Work away from the desk",
                text: "Support staff with mobile forms, task updates, notifications and access to relevant information.",
            },
            {
                label: "03 / Transactions",
                title: "Make actions easier",
                text: "Bring bookings, purchases, payments or requests into a coherent app journey where required.",
            },
            {
                label: "04 / Engagement",
                title: "Keep people connected",
                text: "Use accounts, updates and useful in-app experiences to support ongoing participation.",
            },
        ],
        deliverables: [
            {
                title: "iOS and Android experience",
                text: "Native or cross-platform implementation chosen for the product requirements.",
            },
            {
                title: "Backend and integrations",
                text: "The APIs, authentication and data connections that support the app.",
            },
            {
                title: "Release preparation",
                text: "Device testing, store assets and submission support where included in scope.",
            },
            {
                title: "Product handover",
                text: "Technical notes and guidance for the people responsible for the product.",
            },
        ],
        outcome:
            "A mobile experience that gives people a clear way to complete important tasks and gives your team a platform to improve over time.",
        timeline: "Scoped after product discovery",
        investment: "Quoted against the agreed scope",
    },

    /* ==========================================================
       WEB APPLICATION DEVELOPMENT
    ========================================================== */
    "web-application": {
        tagline:
            "Cloud platforms that turn scattered workflows into one product.",
        intro:
            "A web application is a product, not a page. We design and build cloud-based platforms — portals, dashboards, SaaS products — where logins, roles, data and workflows are architected properly from day one.",
        audience: [
            {
                title: "Product startups",
                description:
                    "You have a platform idea and need a real, working product — not another prototype.",
                need: "A production-ready MVP",
                outcome:
                    "A cloud application with auth, roles and core workflows tested with real users.",
            },
            {
                title: "Operations-heavy businesses",
                description:
                    "Your team relies on spreadsheets, email threads and disconnected tools to run operations.",
                need: "A unified internal portal",
                outcome:
                    "One authenticated platform for tasks, data and hand-offs — with clear permissions.",
            },
            {
                title: "Customer-facing services",
                description:
                    "Your customers need a self-service portal for accounts, billing, requests or data.",
                need: "A customer portal",
                outcome:
                    "A branded, secure portal that reduces support load and gives customers control.",
            },
            {
                title: "Growing SaaS products",
                description:
                    "You've outgrown your first version and need architecture that scales with demand.",
                need: "A scalable, multi-tenant platform",
                outcome:
                    "Cleaner data models, billing, permissions and CI/CD — ready for growth.",
            },
        ],
        challenge:
            "Web applications are products, not pages. If logins, roles, data and workflows aren't architected properly, you'll hit a wall the moment you try to grow — whether that's multi-tenancy, billing, permissions or integrations.",
        useCases: [
            {
                label: "01 / Access",
                title: "Auth and roles",
                text: "Logins, SSO, OAuth, role-based access control and audit logging — designed for teams, not a single user table.",
            },
            {
                label: "02 / Billing",
                title: "Subscriptions and invoices",
                text: "Stripe-powered plans, trials, invoices and upgrade flows, wired into the same data model as the rest of the app.",
            },
            {
                label: "03 / Data",
                title: "Dashboards and workflows",
                text: "Role-appropriate views, filters and actions — so each user sees exactly what they need and can act on it.",
            },
            {
                label: "04 / Integration",
                title: "APIs and third parties",
                text: "REST or GraphQL APIs, webhooks and integrations with the tools your customers already use.",
            },
        ],
        deliverables: [
            {
                title: "Multi-tenant application",
                text: "Next.js front end, Node.js services and a PostgreSQL schema designed for tenant isolation and growth.",
            },
            {
                title: "Auth, roles and audit log",
                text: "SSO / OAuth, RBAC permissions and an audit log covering the actions that matter.",
            },
            {
                title: "Billing and subscriptions",
                text: "Stripe-powered plans, trials and invoices — including webhook handling and receipt emails.",
            },
            {
                title: "APIs and CI/CD",
                text: "Documented REST or GraphQL APIs, plus CI/CD pipelines, staging and production environments.",
            },
        ],
        outcome:
            "A cloud application with the architecture, security and integrations your business can grow into — not a prototype that has to be rebuilt at scale.",
        timeline: "Scoped after discovery and architecture",
        investment: "Quoted against the agreed scope",
    },

    /* ==========================================================
       CUSTOM SOFTWARE DEVELOPMENT
    ========================================================== */
    "software-development": {
        tagline:
            "Custom systems shaped around the way your organisation works.",
        intro:
            "When generic tools stop matching the way your organisation works, custom software can bring workflows, information and people into one coherent system.",
        audience: [
            {
                title: "Growing operations",
                description:
                    "Spreadsheets and manual workarounds are becoming difficult to coordinate.",
                need: "A more connected workflow",
                outcome:
                    "A system that makes process, ownership and information easier to follow.",
            },
            {
                title: "Specialist businesses",
                description:
                    "Your process is specific enough that off-the-shelf tools create compromises.",
                need: "Software shaped to your process",
                outcome:
                    "A platform designed around agreed business rules and real work.",
            },
            {
                title: "Distributed teams",
                description:
                    "People work across locations and need shared information and clear permissions.",
                need: "A shared operating platform",
                outcome:
                    "A consistent place to manage tasks, information and access.",
            },
            {
                title: "Established organisations",
                description:
                    "Several tools hold overlapping data and teams repeat the same work.",
                need: "System integration",
                outcome:
                    "Connected data flows that reduce avoidable duplication.",
            },
        ],
        challenge:
            "Workarounds multiply when systems do not reflect the real process. Information gets repeated, ownership becomes unclear and teams spend time managing tools instead of doing the work.",
        useCases: [
            {
                label: "01 / Workflow",
                title: "Coordinate repeatable work",
                text: "Bring tasks, approvals and hand-offs into a process people can understand and manage.",
            },
            {
                label: "02 / Information",
                title: "Create a reliable source",
                text: "Organise records and business data with clear ownership and access rules.",
            },
            {
                label: "03 / Integration",
                title: "Connect existing tools",
                text: "Move agreed information between systems to reduce repeated entry and fragmented workflows.",
            },
            {
                label: "04 / Visibility",
                title: "Understand what is happening",
                text: "Provide role-appropriate views and reporting for operational decisions.",
            },
        ],
        deliverables: [
            {
                title: "Custom platform",
                text: "A system shaped around the agreed workflows and operating requirements.",
            },
            {
                title: "Access and data controls",
                text: "Role-aware permissions and security measures defined for the project.",
            },
            {
                title: "Integrations",
                text: "Connections to the existing tools and data sources included in the agreed scope.",
            },
            {
                title: "Documentation and handover",
                text: "Technical notes, operating guidance and structured knowledge transfer.",
            },
        ],
        outcome:
            "A more connected way of working, with fewer avoidable hand-offs and software that reflects how the organisation operates.",
        timeline: "Scoped after workflow discovery",
        investment: "Quoted against the agreed scope",
    },
};

/* ============================================================
   NAVIGATION
============================================================ */

const NAV = [
    { id: "highlights", label: "Highlights" },
    { id: "meaning", label: "Meaning" },
    { id: "audience", label: "Who it helps" },
    { id: "use-cases", label: "Core uses" },
    { id: "impact", label: "Impact" },
    { id: "how-we-work", label: "How We Work" },
    { id: "delivery", label: "Deliverables" },
    { id: "outcome", label: "Outcome" },
];

/* ============================================================
   HOW WE WORK — Technology 5-step process
   (Replaces the previous per-service "approach" section)
============================================================ */

const HOW_WE_WORK_STEPS = [
    {
        step: "01",
        title: "Discuss Your Requirements",
        body: "Tell us about your business, users and project goals.",
    },
    {
        step: "02",
        title: "Define the Scope",
        body: "We agree on features, deliverables, pricing and timelines.",
    },
    {
        step: "03",
        title: "Design & Develop",
        body: "We create the solution and share progress for review.",
    },
    {
        step: "04",
        title: "Test & Launch",
        body: "We test the agreed functionality and prepare the solution for launch.",
    },
    {
        step: "05",
        title: "Support & Maintain",
        body: "We provide support and maintenance according to the agreed arrangement.",
    },
];

/* ============================================================
   SMALL HELPERS
============================================================ */

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#82aaff]">
            {children}
        </p>
    );
}

function PersonMark({
    index,
    active,
}: {
    index: number;
    active: boolean;
}) {
    return (
        <span
            className={`relative inline-flex h-11 w-9 shrink-0 items-end justify-center transition-all duration-300 ${active ? "-translate-y-1" : "opacity-60"
                }`}
            aria-hidden="true"
        >
            <span
                className={`absolute top-0 h-[13px] w-[13px] rounded-full border ${active
                    ? "border-[#2F7BFF] bg-[#2F7BFF]"
                    : "border-[#8b9ab1] bg-[#d8e0ea]"
                    }`}
            />
            <span
                className={`mb-0 h-6 w-7 rounded-t-[13px] border ${active
                    ? "border-[#2F7BFF] bg-[#2F7BFF]/20"
                    : "border-[#8b9ab1] bg-[#d8e0ea]/70"
                    }`}
            />
            <span className="sr-only">Audience marker {index + 1}</span>
        </span>
    );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function ServiceReportExperience({
    service,
    pillar,
}: {
    service: Service;
    pillar?: Pillar;
}) {
    const slug = service.href.split("/").pop() ?? "";
    const detail = REPORTS[slug];

    const fallbackAudience = service.gets.slice(0, 4).map((item, index) => ({
        title:
            [
                "Growing teams",
                "New initiatives",
                "Business operators",
                "People planning ahead",
            ][index] ?? "People exploring this service",
        description: `You need support with ${item.toLowerCase()} and want a clear, practical way forward.`,
        need: item,
        outcome: `A defined ${item.toLowerCase()} outcome shaped around your situation.`,
    }));

    const audience = detail?.audience ?? fallbackAudience;

    const useCases =
        detail?.useCases ??
        service.gets.map((item, index) => ({
            label: `0${index + 1} / Core use`,
            title: item,
            text: `Apply ${item.toLowerCase()} to the real needs, people and goals defined during the engagement.`,
        }));

    const deliverables =
        detail?.deliverables ??
        service.gets.map((item) => ({
            title: item,
            text: `A defined part of the ${service.title.toLowerCase()} engagement, agreed during planning and delivered with clear guidance.`,
        }));

    const intro =
        detail?.intro ??
        `${service.title} is designed around a clear destination, a realistic plan and practical support at each stage. The work begins with your situation rather than a one-size-fits-all package.`;

    const challenge =
        detail?.challenge ??
        `When ${service.need}, it can be difficult to know what to prioritise or which step should come first. This service gives the process structure and keeps the next action visible.`;

    const outcome =
        detail?.outcome ??
        `A clearer path through ${service.title.toLowerCase()}, with practical progress and a better understanding of what comes next.`;

    const tagline =
        detail?.tagline ??
        `${service.title} with a clear purpose, practical direction and a result you can use.`;

    const meaningItems = useCases.slice(0, 4).map((item) => ({
        label: item.label,
        title: item.title,
        description: item.text,
    }));

    const impactSource = [
        ...useCases.map((item) => ({
            title: item.title,
            label: item.label,
            description: item.text,
        })),
        ...deliverables.map((item, index) => ({
            title: item.title,
            label: `DELIVERY / ${String(index + 1).padStart(2, "0")}`,
            description: item.text,
        })),
        {
            title: "Clear direction",
            label: "FOUNDATION",
            description: challenge,
        },
    ];

    const impactItems = impactSource.slice(0, 6).map((item, index) => ({
        headline: item.title,
        label: item.label,
        description: item.description,
        tiles: [7, 10, 13, 16, 19, 22][index],
    }));

    const [activeNav, setActiveNav] = useState("highlights");
    const [activeAudience, setActiveAudience] = useState(0);

    const audienceRail = useRef<HTMLDivElement>(null);

    const dragState = useRef({
        pointerId: -1,
        startX: 0,
        startScroll: 0,
        moved: false,
    });

    const [dragging, setDragging] = useState(false);

    const selectedAudience =
        audience[Math.min(activeAudience, audience.length - 1)];

    const people = useMemo(
        () => Array.from({ length: 24 }, (_, i) => i),
        [],
    );

    const goTo = (id: string) => {
        setActiveNav(id);
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const onRailPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (!audienceRail.current) return;

        dragState.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScroll: audienceRail.current.scrollLeft,
            moved: false,
        };

        setDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onRailPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (
            !audienceRail.current ||
            dragState.current.pointerId !== event.pointerId
        ) {
            return;
        }

        const delta = event.clientX - dragState.current.startX;

        if (Math.abs(delta) > 4) {
            dragState.current.moved = true;
        }

        audienceRail.current.scrollLeft =
            dragState.current.startScroll - delta;
    };

    const endRailDrag = (event: PointerEvent<HTMLDivElement>) => {
        if (dragState.current.pointerId !== event.pointerId) return;

        dragState.current.pointerId = -1;
        setDragging(false);
    };

    return (
        <main className="min-h-screen bg-[#080a0f] text-[#eef2f8] selection:bg-[#2F7BFF] selection:text-white">
            <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .report-shell {
          width: min(1240px, calc(100% - 48px));
          margin-inline: auto;
        }

        .report-section {
          scroll-margin-top: 74px;
        }

        .report-grid {
          background-image:
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            );
          background-size: 28px 28px;
        }

        .report-card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #111722;
        }

        .report-number {
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.07em;
        }

        .audience-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
          touch-action: pan-y;
        }

        .audience-rail::-webkit-scrollbar {
          display: none;
        }

        .person-drift {
          animation: person-drift 5s ease-in-out infinite;
        }

        @keyframes person-drift {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 640px) {
          .report-shell {
            width: min(100% - 32px, 1240px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .person-drift {
            animation: none;
          }

          html {
            scroll-behavior: auto;
          }
        }
      `}</style>

            {/* Hero */}
            <header
                id="highlights"
                className="relative flex min-h-[88svh] w-full flex-col justify-center overflow-hidden bg-[#05070c] text-white"
            >
                <ServiceBackgroundVideo src="/service-bg.mp4" rate={0.85} />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,7,12,.35)_0%,rgba(5,7,12,.58)_58%,rgba(5,7,12,.92)_100%)]"
                />

                <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32">
                    <ServiceSignalAnimation
                        service={service}
                        tagline={tagline}
                        pillarNumber={pillar?.number}
                    />
                </div>
            </header>

            {/* Report navigation */}
            <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0c1424]/95 text-white shadow-[0_4px_20px_rgba(0,0,0,.2)] backdrop-blur-xl">
                <div className="report-shell flex min-h-[48px] items-center justify-between gap-4">
                    <Link
                        href="/services"
                        className="shrink-0 text-[10px] font-bold uppercase tracking-[.2em] text-white/90"
                    >
                        MINDSPACE <span className="text-[#2F7BFF]">/</span> REPORT
                    </Link>

                    <nav
                        className="flex min-w-0 items-center overflow-x-auto"
                        aria-label="Report sections"
                    >
                        {NAV.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => goTo(item.id)}
                                className={`whitespace-nowrap border-l border-white/10 px-3 py-[17px] text-[9px] font-medium uppercase tracking-[.13em] transition-colors sm:px-5 ${activeNav === item.id
                                    ? "bg-[#2F7BFF]/15 text-[#8eb7ff]"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Highlights */}
            <section
                id="highlights-content"
                className="report-shell report-section py-12 sm:py-16"
            >
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <SectionLabel>01 / Executive highlights</SectionLabel>

                        <h2 className="max-w-[720px] text-3xl font-medium tracking-[-.055em] text-white sm:text-5xl">
                            What this service is here to move forward.
                        </h2>

                        <p className="mt-4 max-w-[620px] text-[13px] leading-6 text-white/55">
                            {intro}
                        </p>
                    </div>

                    <span className="hidden text-[9px] uppercase tracking-[.15em] text-white/35 sm:block">
                        01 — 03
                    </span>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    {[
                        {
                            no: "01",
                            title: "Clarity",
                            text: "Understand the real requirement before choosing a solution.",
                        },
                        {
                            no: "02",
                            title: "A clear route",
                            text: "Turn a broad goal into manageable stages and decisions.",
                        },
                        {
                            no: "03",
                            title: "Useful progress",
                            text: "Finish with work, guidance and a next step your team can use.",
                        },
                    ].map((card) => (
                        <article
                            key={card.no}
                            className="min-h-[190px] border border-white/10 bg-[#111722] p-5 transition-colors hover:border-[#2F7BFF]/50 sm:p-7"
                        >
                            <div className="flex items-start justify-between">
                                <span className="text-[10px] font-semibold tracking-[.16em] text-white/45">
                                    HIGHLIGHT {card.no}
                                </span>
                                <span className="text-xl text-[#2F7BFF]">↗</span>
                            </div>

                            <h3 className="mt-8 text-[27px] font-medium tracking-[-.06em] text-white">
                                {card.title}
                            </h3>

                            <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-white/55">
                                {card.text}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Meaning */}
            <div id="meaning" className="report-section">
                <ServiceMeaningSection
                    serviceTitle={service.title}
                    items={meaningItems}
                />
            </div>

            {/* Audience */}
            <section
                id="audience"
                className="report-section border-y border-white/10 bg-[#0d1119]"
            >
                <div className="report-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
                    <div>
                        <SectionLabel>02 / Who this is for</SectionLabel>

                        <h2 className="text-3xl font-medium leading-[1.03] tracking-[-.06em] text-white sm:text-5xl">
                            Different people. Different reasons to start.
                        </h2>

                        <p className="mt-5 text-[13px] leading-6 text-white/55">
                            Drag the audience strip to explore the people this
                            service can support. Select a profile to see the need
                            behind the work and the outcome it is designed to
                            create.
                        </p>

                        <div className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.16em] text-white/45">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#2F7BFF]/50 text-[#75a5ff]">
                                ↔
                            </span>
                            Drag to explore
                            <span className="h-px w-10 bg-white/20" />
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/65">
                                Audience field
                            </span>

                            <span className="text-[9px] uppercase tracking-[.13em] text-white/40">
                                {String(activeAudience + 1).padStart(2, "0")} /{" "}
                                {String(audience.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div
                            ref={audienceRail}
                            onPointerDown={onRailPointerDown}
                            onPointerMove={onRailPointerMove}
                            onPointerUp={endRailDrag}
                            onPointerCancel={endRailDrag}
                            onLostPointerCapture={endRailDrag}
                            className={`audience-rail flex select-none gap-3 overflow-x-auto border border-white/10 bg-[#111a29] p-4 ${dragging ? "cursor-grabbing" : "cursor-grab"
                                }`}
                        >
                            {audience.map((person, i) => (
                                <button
                                    key={person.title}
                                    type="button"
                                    onClick={() => {
                                        if (!dragState.current.moved) {
                                            setActiveAudience(i);
                                        }

                                        dragState.current.moved = false;
                                    }}
                                    className={`relative flex min-h-[164px] min-w-[150px] flex-col items-start justify-between border p-4 text-left transition-all sm:min-w-[172px] ${activeAudience === i
                                        ? "border-[#2F7BFF] bg-[#17243a] shadow-[0_8px_24px_rgba(47,123,255,.12)]"
                                        : "border-white/10 bg-[#0d131e] hover:border-white/25 hover:bg-[#151d2b]"
                                        }`}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <span className="text-[9px] font-bold tracking-[.15em] text-[#75a5ff]">
                                            PROFILE 0{i + 1}
                                        </span>

                                        <span
                                            className={`h-2 w-2 ${activeAudience === i
                                                ? "bg-[#2F7BFF]"
                                                : "bg-white/25"
                                                }`}
                                        />
                                    </div>

                                    <div className="person-drift flex w-full items-center justify-center gap-1">
                                        {people
                                            .slice(i * 4, i * 4 + 4)
                                            .map((personIndex) => (
                                                <PersonMark
                                                    key={personIndex}
                                                    index={personIndex}
                                                    active={activeAudience === i}
                                                />
                                            ))}
                                    </div>

                                    <span className="text-[12px] font-semibold leading-5 text-white/90">
                                        {person.title}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 grid gap-0 border border-white/10 bg-[#111722] sm:grid-cols-3">
                            <div className="p-5 sm:border-r sm:border-white/10">
                                <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-white/40">
                                    The situation
                                </span>

                                <p className="mt-3 text-[12px] leading-6 text-white/65">
                                    {selectedAudience.description}
                                </p>
                            </div>

                            <div className="border-t border-white/10 p-5 sm:border-r sm:border-t-0">
                                <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-white/40">
                                    The need
                                </span>

                                <p className="mt-3 text-[12px] font-semibold leading-6 text-white">
                                    {selectedAudience.need}
                                </p>
                            </div>

                            <div className="border-t border-white/10 p-5 sm:border-t-0">
                                <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-white/40">
                                    Designed outcome
                                </span>

                                <p className="mt-3 text-[12px] leading-6 text-white/65">
                                    {selectedAudience.outcome}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Usage Highlights */}
            <ServiceUsageHighlights
                serviceTitle={service.title}
                items={useCases}
            />

            {/* Impact */}
            <div id="impact" className="report-section">
                <ServiceImpactSection
                    title={service.title}
                    items={impactItems}
                />
            </div>

            {/* Context and challenge */}
            <section className="report-section border-y border-white/10 bg-[#0d1119]">
                <div className="report-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
                    <div>
                        <SectionLabel>04 / The context</SectionLabel>

                        <h2 className="text-3xl font-medium leading-[1.05] tracking-[-.06em] text-white sm:text-5xl">
                            Start with the problem, not the package.
                        </h2>

                        <p className="mt-6 text-[14px] leading-7 text-white/60">
                            {challenge}
                        </p>
                    </div>

                    <div className="report-grid border border-white/10 p-5 sm:p-8">
                        <div className="mb-8 flex items-center justify-between gap-3">
                            <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/70">
                                What the engagement considers
                            </span>

                            <span className="text-[9px] uppercase tracking-[.13em] text-white/35">
                                Scope / people / systems
                            </span>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            {[service.need, ...service.gets].map((item, i) => (
                                <div
                                    key={item}
                                    className="flex min-h-[82px] items-start gap-3 border border-white/10 bg-[#101722]/90 p-4"
                                >
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-[#2F7BFF] text-[10px] font-semibold text-white">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <p className="text-[12px] leading-5 text-white/75">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= HOW WE WORK ================= */}
            <section
                id="how-we-work"
                className="report-section border-y border-white/10 bg-[#0a1020]"
            >
                <div className="report-shell py-14 sm:py-20">
                    <div className="mb-10 max-w-[720px]">
                        <SectionLabel>05 / How we work</SectionLabel>

                        <h2 className="text-3xl font-medium leading-[1.03] tracking-[-.06em] text-white sm:text-5xl">
                            How We Work
                        </h2>

                        <p className="mt-5 text-[13px] leading-6 text-white/55">
                            Select a service to see the steps involved.
                        </p>
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                        <span className="rounded-full border border-[#2F7BFF] bg-[#2F7BFF]/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8eb7ff]">
                            Technology
                        </span>
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="text-[9px] uppercase tracking-[.15em] text-white/35">
                            Steps 01 — 05
                        </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {HOW_WE_WORK_STEPS.map((step) => (
                            <div
                                key={step.step}
                                className="relative flex flex-col rounded-2xl border border-white/10 bg-[#111722] p-5 transition-colors hover:border-[#2F7BFF]/50 sm:p-6"
                            >
                                <span className="font-mono text-[11px] tracking-[.15em] text-[#2F7BFF]">
                                    {step.step}
                                </span>

                                <h3 className="mt-4 text-[14px] font-semibold leading-snug text-white">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-[12px] leading-6 text-white/55">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 rounded-2xl border border-white/10 bg-[#0a0f18] p-5 text-[12px] leading-6 text-white/55">
                        <strong className="text-[#7CC4FF]">Note:</strong>{" "}
                        Scope, pricing and timelines are agreed before work
                        begins. Changes to agreed scope are handled in writing.
                    </p>
                </div>
            </section>

            {/* Deliverables */}
            <section
                id="delivery"
                className="report-section border-y border-white/10 bg-[#0d1119]"
            >
                <div className="report-shell py-14 sm:py-20">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <SectionLabel>06 / What you receive</SectionLabel>

                            <h2 className="text-3xl font-medium tracking-[-.06em] text-white sm:text-5xl">
                                The output should be useful after handover.
                            </h2>
                        </div>

                        <span className="text-[9px] uppercase tracking-[.15em] text-white/35">
                            Deliverables / scope
                        </span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        {deliverables.map((item, i) => (
                            <article
                                key={item.title}
                                className="report-card min-h-[180px] p-5 transition-colors hover:border-[#2F7BFF]/50 sm:p-7"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-semibold tracking-[.15em] text-[#75a5ff]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span className="h-2 w-2 bg-[#2F7BFF]" />
                                </div>

                                <h3 className="mt-7 text-xl font-medium tracking-[-.04em] text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-[12px] leading-6 text-white/55">
                                    {item.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outcome */}
            <section
                id="outcome"
                className="report-section border-y border-white/10 bg-[#101a2c] text-white"
            >
                <div className="report-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
                    <div>
                        <SectionLabel>07 / The intended outcome</SectionLabel>

                        <h2 className="max-w-[760px] text-4xl font-medium leading-[.98] tracking-[-.065em] sm:text-6xl">
                            Make the next step feel possible.
                        </h2>

                        <p className="mt-7 max-w-[650px] text-[14px] leading-7 text-white/65">
                            {outcome}
                        </p>
                    </div>

                    <div className="border border-white/15 bg-white/[.04] p-6 sm:p-8">
                        <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-5">
                            <span className="text-[9px] uppercase tracking-[.15em] text-white/40">
                                Timeframe
                            </span>

                            <p className="text-[12px] text-white/85">
                                {detail?.timeline ?? "Agreed during planning"}
                            </p>
                        </div>

                        <div className="grid grid-cols-[110px_1fr] gap-4 pt-5">
                            <span className="text-[9px] uppercase tracking-[.15em] text-white/40">
                                Investment
                            </span>

                            <p className="text-[12px] text-white/85">
                                {detail?.investment ??
                                    "Defined after understanding the scope"}
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Report footer */}
            <footer className="border-t border-white/10 bg-[#080a0f] py-8">
                <div className="report-shell flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/services"
                        className="text-[10px] font-bold uppercase tracking-[.18em] text-white/75 transition hover:text-[#75a5ff]"
                    >
                        ← All services
                    </Link>

                    <span className="text-[9px] uppercase tracking-[.15em] text-white/35">
                        MindSpace / {service.pillar} / {service.title}
                    </span>
                </div>
            </footer>
        </main>
    );
}