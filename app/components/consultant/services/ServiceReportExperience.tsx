
// app/components/consultant/services/ServiceReportExperience.tsx
"use client";

import Link from "next/link";
import { Questrial } from "next/font/google";
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

const questrial = Questrial({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

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
        <p
            className="mb-4 text-[16px] font-semibold uppercase tracking-[.18em]"
            style={{ color: "var(--ms-secondary)" }}
        >
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
                className="absolute top-0 h-[13px] w-[13px] rounded-full border"
                style={{
                    borderColor: active
                        ? "var(--ms-accent)"
                        : "var(--ms-muted)",
                    background: active
                        ? "var(--ms-accent)"
                        : "var(--ms-muted)",
                }}
            />

            <span
                className="mb-0 h-6 w-7 rounded-t-[13px] border"
                style={{
                    borderColor: active
                        ? "var(--ms-accent)"
                        : "var(--ms-muted)",
                    background: active
                        ? "color-mix(in srgb, var(--ms-accent) 20%, transparent)"
                        : "color-mix(in srgb, var(--ms-muted) 70%, transparent)",
                }}
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
        <div
            data-service-report
            className={`${questrial.className} min-h-screen text-[var(--ms-text)] selection:bg-[var(--ms-accent)] selection:text-white`}
        >
            <style jsx global>{`
                [data-service-report],
                [data-service-report] * {
                    font-family: ${questrial.style.fontFamily}, sans-serif !important;
                }

                html {
                    scroll-behavior: smooth;
                }

                [data-service-report] {
                    --ms-accent: #2F7BFF;
                    --ms-secondary: #69A6FF;
                    --ms-muted: #B5CFFF;
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
                            rgba(47,123,255,0.10) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            rgba(47,123,255,0.10) 1px,
                            transparent 1px
                        );
                    background-size: 28px 28px;
                }

                .report-card {
                    border: 1px solid rgba(47,123,255,0.24);
                    background: #0B1D40;
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

                /*
                 * Larger typography for small text.
                 * Scoped to this service report only.
                 */
                [data-service-report] [class~="text-[12px]"] {
                    font-size: 15px !important;
                    line-height: 1.55;
                }

                [data-service-report] [class~="text-[13px]"] {
                    font-size: 16px !important;
                    line-height: 1.55;
                }

                [data-service-report] [class~="text-[14px]"] {
                    font-size: 17px !important;
                    line-height: 1.55;
                }

                [data-service-report] [class~="text-[15px]"] {
                    font-size: 18px !important;
                    line-height: 1.5;
                }

                [data-service-report] [class~="text-[16px]"] {
                    font-size: 19px !important;
                    line-height: 1.55;
                }

                [data-service-report] [class~="text-[17px]"] {
                    font-size: 20px !important;
                    line-height: 1.6;
                }

                [data-service-report] [class~="text-[18px]"] {
                    font-size: 21px !important;
                    line-height: 1.6;
                }

                @media (max-width: 640px) {
                    .report-shell {
                        width: min(100% - 32px, 1240px);
                    }

                    [data-service-report] [class~="text-[18px]"] {
                        font-size: 19px !important;
                    }

                    [data-service-report] [class~="text-[17px]"] {
                        font-size: 18px !important;
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

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* Hero Header */}
            <header
                id="highlights"
                className="relative flex min-h-[88svh] w-full flex-col justify-center overflow-hidden"
            >
                <ServiceBackgroundVideo src="/service-bg.mp4" rate={0.85} />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                        background: `
                            radial-gradient(
                                ellipse at 22% 38%,
                                color-mix(in srgb, var(--ms-accent) 23%, transparent),
                                transparent 52%
                            ),
                            radial-gradient(
                                ellipse at 80% 58%,
                                color-mix(in srgb, var(--ms-secondary-deep) 32%, transparent),
                                transparent 48%
                            ),
                            linear-gradient(
                                180deg,
                                color-mix(in srgb, var(--ms-background) 25%, transparent),
                                var(--ms-background)
                            )
                        `,
                    }}
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
            <div
                className="sticky top-0 z-40 border-b text-[var(--ms-text)] shadow-[0_4px_20px_rgba(0,0,0,.2)] backdrop-blur-xl"
                style={{
                    background:
                        "color-mix(in srgb, var(--ms-background) 85%, transparent)",
                    borderColor:
                        "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
                }}
            >
                <div className="report-shell flex min-h-[48px] items-center justify-between gap-4">
                    <Link
                        href="/services"
                        className="shrink-0 text-[16px] font-bold uppercase tracking-[.16em] text-[var(--ms-text)]"
                    >
                        MINDSPACE{" "}
                        <span style={{ color: "var(--ms-accent)" }}>/</span>{" "}
                        REPORT
                    </Link>

                    <nav
                        className="flex min-w-0 items-center overflow-x-auto scrollbar-hide"
                        aria-label="Report sections"
                    >
                        {NAV.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => goTo(item.id)}
                                className="whitespace-nowrap border-l py-[17px] text-[16px] font-medium uppercase tracking-[.13em] transition-colors sm:px-5"
                                style={
                                    activeNav === item.id
                                        ? {
                                            borderColor:
                                                "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
                                            background:
                                                "color-mix(in srgb, var(--ms-accent) 15%, transparent)",
                                            color: "#8BC1FF",
                                        }
                                        : {
                                            borderColor:
                                                "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                                            color: "#B5CFFF",
                                        }
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

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
            <section
                className="report-section border-y"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                }}
            >
                <div className="report-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
                    <div>
                        <SectionLabel>04 / The context</SectionLabel>

                        <h2 className="text-3xl font-medium leading-[1.05] tracking-[-.06em] text-[var(--ms-text)] sm:text-5xl">
                            Start with the problem, not the package.
                        </h2>

                        <p className="mt-6 text-[20px] leading-8 text-[#B5CFFF]">
                            {challenge}
                        </p>
                    </div>

                    <div
                        className="report-grid border p-5 sm:p-8"
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                        }}
                    >
                        <div className="mb-8 flex items-center justify-between gap-3">
                            <span className="text-[16px] font-semibold uppercase tracking-[.16em] text-[#8BC1FF]">
                                What the engagement considers
                            </span>

                            <span className="text-[15px] uppercase tracking-[.13em] text-[#B5CFFF]">
                                Scope / people / systems
                            </span>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            {[service.need, ...service.gets].map((item, i) => (
                                <div
                                    key={item}
                                    className="flex min-h-[82px] items-start gap-3 border p-4"
                                    style={{
                                        background: "var(--ms-surface)",
                                        borderColor:
                                            "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                                    }}
                                >
                                    <span
                                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[16px] font-semibold"
                                        style={{
                                            background: "var(--ms-accent)",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <p className="text-[20px] leading-8 text-[var(--ms-text)]">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How we work */}
            <section
                id="how-we-work"
                className="report-section border-y"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                }}
            >
                <div className="report-shell py-14 sm:py-20">
                    <div className="mb-10 max-w-[720px]">
                        <SectionLabel>05 / How we work</SectionLabel>

                        <h2 className="text-3xl font-medium leading-[1.03] tracking-[-.06em] text-[var(--ms-text)] sm:text-5xl">
                            How We Work
                        </h2>

                        <p className="mt-5 text-[20px] leading-8 text-[#B5CFFF]">
                            Select a service to see the steps involved.
                        </p>
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                        <span
                            className="rounded-full border px-4 py-1.5 text-[15px] font-semibold uppercase tracking-[.16em]"
                            style={{
                                borderColor: "#69A6FF",
                                background:
                                    "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
                                color: "#8BC1FF",
                            }}
                        >
                            Technology
                        </span>

                        <span
                            className="h-px flex-1"
                            style={{
                                background:
                                    "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                            }}
                        />

                        <span className="text-[15px] uppercase tracking-[.15em] text-[#B5CFFF]">
                            Steps 01 — 05
                        </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {HOW_WE_WORK_STEPS.map((step) => (
                            <div
                                key={step.step}
                                className="relative flex flex-col rounded-2xl border p-5 transition-colors sm:p-6"
                                style={{
                                    background: "var(--ms-surface)",
                                    borderColor:
                                        "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                                }}
                            >
                                <span
                                    className="font-mono text-[17px] tracking-[.15em]"
                                    style={{ color: "#8BC1FF" }}
                                >
                                    {step.step}
                                </span>

                                <h3 className="mt-4 text-[20px] font-semibold leading-snug text-[var(--ms-text)]">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-[20px] leading-8 text-[#B5CFFF]">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p
                        className="mt-8 rounded-2xl border p-5 text-[20px] leading-8 text-[#B5CFFF]"
                        style={{
                            background: "var(--ms-surface-alt)",
                            borderColor:
                                "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                        }}
                    >
                        <strong style={{ color: "#8BC1FF" }}>
                            Note:
                        </strong>{" "}
                        Scope, pricing and timelines are agreed before work
                        begins. Changes to agreed scope are handled in writing.
                    </p>
                </div>
            </section>

            {/* Deliverables */}
            <section
                id="delivery"
                className="report-section border-y"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                }}
            >
                <div className="report-shell py-14 sm:py-20">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <SectionLabel>06 / What you receive</SectionLabel>

                            <h2 className="text-3xl font-medium tracking-[-.06em] text-[var(--ms-text)] sm:text-5xl">
                                The output should be useful after handover.
                            </h2>
                        </div>

                        <span className="text-[15px] uppercase tracking-[.15em] text-[#B5CFFF]">
                            Deliverables / scope
                        </span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        {deliverables.map((item, i) => (
                            <article
                                key={item.title}
                                className="report-card min-h-[180px] p-5 transition-colors sm:p-7"
                            >
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-[16px] font-semibold tracking-[.15em]"
                                        style={{ color: "#8BC1FF" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span
                                        className="h-2 w-2"
                                        style={{ background: "#69A6FF" }}
                                    />
                                </div>

                                <h3 className="mt-7 text-[28px] font-medium tracking-[-.04em] text-[var(--ms-text)]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-[20px] leading-8 text-[#B5CFFF]">
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
                className="report-section border-y text-[var(--ms-text)]"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                }}
            >
                <div className="report-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
                    <div>
                        <SectionLabel>07 / The intended outcome</SectionLabel>

                        <h2 className="max-w-[760px] text-4xl font-medium leading-[.98] tracking-[-.065em] text-[var(--ms-text)] sm:text-6xl">
                            Make the next step feel possible.
                        </h2>

                        <p className="mt-7 max-w-[650px] text-[20px] leading-8 text-[#B5CFFF]">
                            {outcome}
                        </p>
                    </div>

                    <div
                        className="border p-6 sm:p-8"
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                            background: "var(--ms-surface-alt)",
                        }}
                    >
                        <div
                            className="grid grid-cols-[110px_1fr] gap-4 border-b pb-5"
                            style={{
                                borderColor:
                                    "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                            }}
                        >
                            <span className="text-[15px] uppercase tracking-[.15em] text-[#8BC1FF]">
                                Timeframe
                            </span>

                            <p className="text-[19px] text-[var(--ms-text)]">
                                {detail?.timeline ?? "Agreed during planning"}
                            </p>
                        </div>

                        <div className="grid grid-cols-[110px_1fr] gap-4 pt-5">
                            <span className="text-[15px] uppercase tracking-[.15em] text-[#8BC1FF]">
                                Investment
                            </span>

                            <p className="text-[19px] text-[var(--ms-text)]">
                                {detail?.investment ??
                                    "Defined after understanding the scope"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Report footer */}
            <footer
                className="border-t py-8"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--ms-accent) 30%, transparent)",
                }}
            >
                <div className="report-shell flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/services"
                        className="text-[16px] font-bold uppercase tracking-[.18em] text-[#B5CFFF] transition hover:text-[#8BC1FF]"
                    >
                        ← All services
                    </Link>

                    <span className="text-[15px] uppercase tracking-[.15em] text-[#B5CFFF]">
                        MindSpace / {service.pillar} / {service.title}
                    </span>
                </div>
            </footer>
        </div>
    );
}
