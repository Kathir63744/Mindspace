// app/components/consultant/services/ServicesData.ts

export type IconName =
    | "monitor"
    | "phone"
    | "mobile"
    | "code"
    | "pen"
    | "compass"
    | "university"
    | "file"
    | "shield"
    | "cap"
    | "layers"
    | "trend"
    | "briefcase"
    | "star"
    | "spark"
    | "chat"
    | "check"
    | "x"
    | "arrow"
    | "plus"
    | "globe"
    | "users";

/* ---------- Pillars (the four pillars) ---------- */

export type Pillar = {
    id: string;
    number: string;
    tag: string;
    title: string;
    lead: string;
    image: { src: string; alt: string };
    needs: string[];
    points: { icon: IconName; title: string; text: string }[];
    cta: { label: string; href: string };
    cardTitle: string;
    cardBullets: string[];
};

export const PILLARS: Pillar[] = [
    {
        id: "technology",
        number: "01",
        tag: "Technology",
        title: "Websites, apps and software, built to work.",
        lead: "Websites, mobile apps and custom software that fit how your business actually runs. We build, ship and support.",
        image: { src: "/images/pillar-technology.jpg", alt: "Development team at work" },
        needs: [
            "Your site looks dated or loads slowly",
            "You need an app for customers or staff",
            "Off-the-shelf tools no longer fit",
            "You have an idea and need a technical partner",
        ],
        points: [
            { icon: "globe", title: "Websites", text: "Fast, responsive sites that convert visitors to customers." },
            { icon: "mobile", title: "Mobile apps", text: "iOS and Android apps people keep opening." },
            { icon: "code", title: "Custom software", text: "Internal tools and platforms shaped around your workflow." },
        ],
        cta: { label: "Explore technology", href: "/services" },
        cardTitle: "Websites, apps & custom software",
        cardBullets: [
            "Website & web app development",
            "iOS & Android mobile apps",
            "Custom internal tools & dashboards",
            "UI/UX design & design systems",
        ],
    },
    {
        id: "study-abroad",
        number: "02",
        tag: "Study abroad",
        title: "Clear guidance from shortlist to visa.",
        lead: "University selection, applications and visa support for students taking their education overseas.",
        image: { src: "/images/pillar-study-abroad.jpg", alt: "Student on campus abroad" },
        needs: [
            "You are unsure which country or course fits",
            "Applications need to be done right the first time",
            "Visa paperwork feels overwhelming",
            "You want a realistic plan, not promises",
        ],
        points: [
            { icon: "cap", title: "University & course selection", text: "Match goals, budget and profile to the right programme." },
            { icon: "check", title: "Admissions", text: "Applications, essays and letters of recommendation handled." },
            { icon: "briefcase", title: "Visa support", text: "Documents, timelines and interview prep, step by step." },
        ],
        cta: { label: "Explore study abroad", href: "/study-abroad" },
        cardTitle: "Guidance from shortlist to visa",
        cardBullets: [
            "University & course selection",
            "Admission applications handled",
            "Student visa & document support",
            "Pre-departure briefings",
        ],
    },
    {
        id: "training",
        number: "03",
        tag: "Training",
        title: "Skills employers actually ask for.",
        lead: "Practical training programmes with hands-on projects, mentoring and certificates that prove what you can do.",
        image: { src: "/images/pillar-training.jpg", alt: "Training session" },
        needs: [
            "You want to switch into a new role",
            "Your team needs upskilling",
            "You need proof of skills for hiring",
            "You learn best by building, not watching",
        ],
        points: [
            { icon: "code", title: "Technical tracks", text: "Web, mobile, data and cloud, taught by working engineers." },
            { icon: "cap", title: "Professional skills", text: "Communication, project management and workplace fluency." },
            { icon: "check", title: "Certificates", text: "Recognised proof of what you have actually delivered." },
        ],
        cta: { label: "Explore training", href: "/training" },
        cardTitle: "Skills employers ask for",
        cardBullets: [
            "Industry-aligned training programmes",
            "Hands-on, project-based learning",
            "Professional development tracks",
            "Certificates on completion",
        ],
    },
    {
        id: "careers",
        number: "04",
        tag: "Careers",
        title: "From first resume to first job.",
        lead: "Placement support, internships and interview preparation for people ready to move to the next step.",
        image: { src: "/images/pillar-careers.jpg", alt: "Interview preparation" },
        needs: [
            "You need introductions, not just job boards",
            "Your resume is not getting responses",
            "You freeze in interviews",
            "You want real experience early",
        ],
        points: [
            { icon: "briefcase", title: "Placement support", text: "Introductions to hiring teams that are actually hiring." },
            { icon: "cap", title: "Internships", text: "Real projects with real teams, from day one." },
            { icon: "check", title: "Resume & interview", text: "A resume that gets read, and practice that lands the offer." },
        ],
        cta: { label: "Explore careers", href: "/careers" },
        cardTitle: "From first resume to first job",
        cardBullets: [
            "Placement assistance & introductions",
            "Internships with real teams",
            "Resume & LinkedIn review",
            "Mock interviews & feedback",
        ],
    },
];

/* ---------- Catalogue of individual services ---------- */

export type Service = {
    icon: IconName;
    pillar: string;
    title: string;
    need: string;
    gets: string[];
    href: string;
    linked: boolean;
    /* Optional rich detail — used by the technology cards on /services */
    stack?: string[];
    explain?: string;
    deliverables?: string[];
};

export const SERVICES: Service[] = [
    // ==============================
    // TECHNOLOGY
    // ==============================
    {
        icon: "globe",
        pillar: "Technology",
        title: "Website development",
        need: "your site is slow, dated or not converting",
        gets: ["Responsive design", "SEO foundations", "CMS integration"],
        href: "/services/website-development",
        linked: true,
        stack: ["Next.js", "React", "Tailwind CSS", "Sanity / Contentful", "Vercel"],
        explain:
            "Your website is the first impression of your business. We design and build fast, responsive, SEO-ready sites — marketing pages, landing pages and content platforms — that load in under a second, work on every screen, and let your team edit content without touching code.",
        deliverables: [
            "Custom design system and component library",
            "Headless CMS so your team can publish without a developer",
            "SEO, analytics and Core Web Vitals tuning",
            "Lighthouse 95+ performance target",
        ],
    },
    {
        icon: "mobile",
        pillar: "Technology",
        title: "Mobile app development",
        need: "you need an app for customers or staff",
        gets: ["iOS & Android", "Native performance", "Store launch"],
        href: "/services/app-development",
        linked: true,
        stack: ["React Native", "Flutter", "Expo", "Firebase / Supabase", "App Store / Play Store"],
        explain:
            "When your users live on their phones, a website isn't enough. We ship native-quality apps for iOS and Android from one codebase — with accounts, notifications, payments and offline support — and handle the store submission process end to end.",
        deliverables: [
            "One React Native or Flutter codebase for iOS + Android",
            "Auth, push notifications, payments, offline support",
            "App Store & Play Store submission handled",
            "OTA updates so you can ship without waiting on review",
        ],
    },
    {
        icon: "layers",
        pillar: "Technology",
        title: "Web application development",
        need: "you need a cloud-based platform, not just a site",
        gets: ["Auth & roles", "APIs & integrations", "Billing"],
        href: "/services/web-application",
        linked: true,
        stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "AWS / Vercel", "Stripe"],
        explain:
            "Web applications are products, not pages: logins, roles, dashboards, data and workflows. We design and build cloud-based platforms — internal portals, customer dashboards and SaaS products — with the security, scalability and integrations your business needs to grow into.",
        deliverables: [
            "Auth, role-based access control, multi-tenant architecture",
            "Billing and subscription flows (Stripe)",
            "REST / GraphQL APIs and third-party integrations",
            "CI/CD pipeline and staging environment",
        ],
    },
    {
        icon: "code",
        pillar: "Technology",
        title: "Custom software",
        need: "off-the-shelf tools no longer fit",
        gets: ["Discovery & scoping", "Custom build", "Handover & support"],
        href: "/services/software-development",
        linked: true,
        stack: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS", "GitHub Actions"],
        explain:
            "Sometimes the right answer isn't another subscription — it's software built around how your business actually works. We design and build custom internal systems, integrations and automations, and you own the source code and IP so you are never locked in.",
        deliverables: [
            "Bespoke internal systems and workflow automations",
            "Integrations between the SaaS tools you already use",
            "Docker + AWS deployment, documented infrastructure",
            "Full source code, IP and repo access handed over",
        ],
    },

    // ==============================
    // STUDY ABROAD
    // ==============================
    {
        icon: "globe",
        pillar: "Study abroad",
        title: "Country & course mapping",
        need: "you need to match goals and budgets to real destinations",
        gets: ["Destination matching", "Course mapping", "Cost analysis"],
        href: "/study-abroad/country-course-mapping",
        linked: true,
    },
    {
        icon: "cap",
        pillar: "Study abroad",
        title: "University shortlisting",
        need: "you want universities that fit your profile",
        gets: ["Profile review", "Fit ranking", "Ambition vs safety"],
        href: "/study-abroad/university-shortlisting",
        linked: true,
    },
    {
        icon: "file",
        pillar: "Study abroad",
        title: "Admission & SOP support",
        need: "essays and applications need to be handled end-to-end",
        gets: ["SOP & essay drafts", "Application filing", "Follow-ups"],
        href: "/study-abroad/admission-support",
        linked: true,
    },
    {
        icon: "trend",
        pillar: "Study abroad",
        title: "Financial documentation",
        need: "proof of funds, scholarships or loans need structuring",
        gets: ["Proof of funds", "Scholarship guidance", "Loan coordination"],
        href: "/study-abroad/financial-documentation",
        linked: true,
    },
    {
        icon: "shield",
        pillar: "Study abroad",
        title: "Visa filing",
        need: "the visa file, mocks and filing must be done right",
        gets: ["File preparation", "Mock interviews", "Application tracking"],
        href: "/study-abroad/visa-support",
        linked: true,
    },
    {
        icon: "briefcase",
        pillar: "Study abroad",
        title: "Pre-departure",
        need: "accommodation, travel and arrival need orientation",
        gets: ["Accommodation", "Travel planning", "Arrival orientation"],
        href: "/study-abroad/pre-departure",
        linked: true,
    },

    // ==============================
    // TRAINING
    // ==============================
    {
        icon: "code",
        pillar: "Training",
        title: "Programming foundations",
        need: "you're starting from basics and want a real footing",
        gets: ["Syntax & logic", "Small projects", "Debug habits"],
        href: "/training/programming-foundations",
        linked: true,
    },
    {
        icon: "globe",
        pillar: "Training",
        title: "Web development",
        need: "you want to build and ship real web products",
        gets: ["Frontend", "Backend", "Deploy"],
        href: "/training/web-development",
        linked: true,
    },
    {
        icon: "mobile",
        pillar: "Training",
        title: "Mobile app development",
        need: "you want to build cross-platform mobile apps",
        gets: ["React Native", "APIs & state", "Ship to store"],
        href: "/training/app-development",
        linked: true,
    },
    {
        icon: "trend",
        pillar: "Training",
        title: "Data & AI basics",
        need: "SQL, Pandas, and practical ML workflows are your next step",
        gets: ["SQL & Pandas", "Visualisation", "ML basics"],
        href: "/training/data-ai",
        linked: true,
    },
    {
        icon: "layers",
        pillar: "Training",
        title: "Cloud & DevOps",
        need: "you want deployable infrastructure skills",
        gets: ["Git workflows", "CI/CD", "Containers"],
        href: "/training/cloud-devops",
        linked: true,
    },
    {
        icon: "file",
        pillar: "Training",
        title: "Portfolio & certification",
        need: "you want a public portfolio and a certificate",
        gets: ["Portfolio site", "Case studies", "Certificate"],
        href: "/training/portfolio-certification",
        linked: true,
    },

    // ==============================
    // CAREERS
    // ==============================
    {
        icon: "trend",
        pillar: "Careers",
        title: "Career direction",
        need: "you need clarity on which roles to target",
        gets: ["Role fit", "Industry mapping", "Next steps"],
        href: "/careers/career-direction",
        linked: true,
    },
    {
        icon: "file",
        pillar: "Careers",
        title: "Resume & LinkedIn",
        need: "your resume needs restructuring for ATS",
        gets: ["ATS structure", "Bullet rewrites", "LinkedIn polish"],
        href: "/careers/resume-linkedin",
        linked: true,
    },
    {
        icon: "users",
        pillar: "Careers",
        title: "Interview coaching",
        need: "you need mock interviews with feedback",
        gets: ["Behavioral rounds", "Technical rounds", "Feedback rounds"],
        href: "/careers/interview-coaching",
        linked: true,
    },
    {
        icon: "layers",
        pillar: "Careers",
        title: "Internships",
        need: "you want matched internship opportunities",
        gets: ["Match", "Prepare", "Support"],
        href: "/careers/internships",
        linked: true,
    },
    {
        icon: "shield",
        pillar: "Careers",
        title: "Placement support",
        need: "you want warm introductions and follow-ups",
        gets: ["Partner intros", "Follow-ups", "Negotiation"],
        href: "/careers/placement-support",
        linked: true,
    },
    {
        icon: "code",
        pillar: "Careers",
        title: "On-the-job readiness",
        need: "you want tools and communication ready for day one",
        gets: ["Tools", "Communication", "First weeks"],
        href: "/careers/on-the-job-readiness",
        linked: true,
    },
];

/* ============================================================
   CHAOS -> CONFIDENCE
   Technology-only framing (used by the /services page).
============================================================ */

export const PROBLEMS: string[] = [
    "Frontend, backend and mobile usually sit with three different vendors and three different stacks.",
    "Every handover loses context, conventions and time.",
    "Nobody owns the integration layer between services.",
    "You end up coordinating frameworks, deploys and environments yourself.",
];

export const BENEFITS: string[] = [
    "One team across Next.js, React Native, Node.js and PostgreSQL.",
    "One shared design system and component library across every surface.",
    "One CI/CD pipeline, one staging environment, one release process.",
    "One codebase owner from architecture to maintenance.",
];

/* ---------- End-to-end flow ---------- */

export type FlowStep = { title: string; items: string[] };

export const FLOW: FlowStep[] = [
    {
        title: "Understand",
        items: ["Tell us your goal", "We ask the right questions", "No jargon, no pressure"],
    },
    {
        title: "Plan",
        items: ["A realistic path", "Clear cost and timeline", "Fixed scope, no surprises"],
    },
    {
        title: "Deliver",
        items: ["Short cycles, visible progress", "Weekly check-ins", "Built with you, not behind closed doors"],
    },
    {
        title: "Succeed",
        items: ["Handover with training", "Ongoing support", "A direct line, not a ticket queue"],
    },
];

/* ---------- Why MindSpace ---------- */

export type Principle = { icon: IconName; title: string; text: string };

export const WHY: Principle[] = [
    { icon: "check", title: "One team, four paths", text: "Technology, study abroad, training and careers under one roof." },
    { icon: "cap", title: "Practitioners, not theorists", text: "The people who teach also build and hire." },
    { icon: "code", title: "Real outcomes", text: "Shipped products, admissions letters, certifications and job offers." },
    { icon: "briefcase", title: "Long-term support", text: "We stay after handover so nothing stalls when things change." },
];

/* ---------- FAQ ---------- */

export type FaqItem = { q: string; a: string };

export const FAQ: FaqItem[] = [
    { q: "Which pillar should I start with?", a: "The free consultation sorts this out. Most people start with one and add another later." },
    { q: "Are the four services separate or combined?", a: "Both. Each stands alone, and they are designed to combine when you need more than one." },
    { q: "How are projects priced?", a: "Fixed price for scoped projects, monthly retainer for ongoing support, per-batch for training." },
    { q: "Do you work with small teams and individuals?", a: "Yes. Most of our clients are small and mid-sized, from solo founders to growing teams." },
    { q: "Can you take over something another team started?", a: "Usually yes. We audit what exists first, then tell you honestly whether fix, rebuild or partial replacement is cheaper." },
];

/* ============================================================
   DETAILED SERVICE PAGES — /services/[slug]
   (Used by app/services/[slug]/page.tsx)
============================================================ */

export type ServiceStat = { label: string; value: string };
export type ServiceStep = { step: string; title: string; body: string };
export type ServiceHighlight = { title: string; body: string };
export type ServiceFaq = { q: string; a: string };
export type ServiceCta = { label: string; sub: string };

export type ServiceDetail = {
    slug: string;
    title: string;
    eyebrow: string;
    headline: [string, string];
    sub: string;
    mind: string;
    icon: IconName;
    stack: string[];
    stats: ServiceStat[];
    highlights: ServiceHighlight[];
    process: ServiceStep[];
    deliverables: string[];
    faq: ServiceFaq[];
    cta: ServiceCta;
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
    "website-development": {
        slug: "website-development",
        title: "Website Development",
        eyebrow: "Websites · Step 01",
        headline: ["A website that", "works as hard as you do."],
        sub: "Fast, responsive, SEO-ready websites — from marketing sites to content platforms — built on Next.js and tuned for performance.",
        mind: "Your site is the first impression of your business. If it loads slowly or looks dated, you're losing customers before they read a word.",
        icon: "globe",
        stack: ["Next.js", "React", "Tailwind CSS", "Sanity / Contentful", "Vercel"],
        stats: [
            { label: "Timeline", value: "3–6 weeks" },
            { label: "Performance", value: "<1s LCP target" },
            { label: "CMS", value: "Sanity / Contentful" },
        ],
        highlights: [
            { title: "Design that converts", body: "We design around your funnel — not a template. Every section earns its place." },
            { title: "Built to be edited", body: "Headless CMS so your team can publish pages, posts and updates without a developer." },
            { title: "Performance as a feature", body: "Lighthouse 95+ target, tuned Core Web Vitals, image and font optimisation baked in." },
            { title: "SEO foundations", body: "Semantic HTML, structured data, sitemaps and analytics wired in from day one." },
        ],
        process: [
            { step: "01", title: "Discover", body: "Goals, audience, pages, content sources and success metrics. We audit any existing site." },
            { step: "02", title: "Architecture", body: "Sitemap, page templates, component library and CMS model agreed before design starts." },
            { step: "03", title: "Design", body: "Wireframes → high-fidelity design → interactive prototype, reviewed in weekly demos." },
            { step: "04", title: "Build", body: "Next.js build with CMS integration, responsive layouts and SEO structures in place." },
            { step: "05", title: "QA & Launch", body: "Cross-browser and mobile testing, performance tuning, redirects and go-live." },
            { step: "06", title: "Support", body: "Post-launch monitoring, content support and ongoing iteration under an agreed retainer." },
        ],
        deliverables: [
            "Custom-designed site on Next.js",
            "Headless CMS configured for your content team",
            "Component library and style guide",
            "SEO, analytics and Core Web Vitals tuning",
            "Staging environment and deployment pipeline",
            "30-day post-launch support window",
        ],
        faq: [
            { q: "Do you work with an existing brand?", a: "Yes. We either work from your brand guidelines or design a refreshed system in the same engagement." },
            { q: "Can my team edit content?", a: "Yes. Every build ships with a CMS and a walkthrough for the people who'll update it." },
            { q: "What about hosting?", a: "We deploy to Vercel by default, or to your existing host — your call, and you own the account." },
        ],
        cta: {
            label: "Start your website brief",
            sub: "Tell us about your business, pages and goals — we'll come back with a scope, timeline and fixed price.",
        },
    },

    "app-development": {
        slug: "app-development",
        title: "Mobile App Development",
        eyebrow: "Mobile · Step 02",
        headline: ["An app people", "actually keep."],
        sub: "Native-quality iOS and Android apps from one React Native or Flutter codebase — with the features your product actually needs.",
        mind: "If your users live on their phones, a mobile web experience isn't enough. You need an app that feels native, ships updates fast, and doesn't drain the battery.",
        icon: "mobile",
        stack: ["React Native", "Flutter", "Expo", "Firebase / Supabase", "App Store / Play Store"],
        stats: [
            { label: "Timeline", value: "8–14 weeks" },
            { label: "Platforms", value: "iOS + Android" },
            { label: "Codebase", value: "1 (RN or Flutter)" },
        ],
        highlights: [
            { title: "One codebase, two stores", body: "React Native or Flutter — a single codebase ships to iOS and Android, cutting cost and drift." },
            { title: "Real product features", body: "Auth, push notifications, payments, offline storage, deep links — the features real apps need." },
            { title: "Store submission handled", body: "We prepare listings, screenshots, and handle submission to the App Store and Play Store." },
            { title: "OTA updates", body: "Push code updates without waiting on review, where the platform allows." },
        ],
        process: [
            { step: "01", title: "Discover", body: "Users, core flows, must-have features and constraints. We cut scope to what ships first." },
            { step: "02", title: "Prototype", body: "Clickable prototype so you can feel the flow before a line of code is written." },
            { step: "03", title: "Build", body: "React Native or Flutter build, with backend and third-party integrations wired in." },
            { step: "04", title: "Test", body: "Device testing across screen sizes, iOS and Android versions, and edge cases." },
            { step: "05", title: "Store Launch", body: "App Store and Play Store submission, review handling and first release." },
            { step: "06", title: "Iterate", body: "Analytics, crash reporting and a release cadence for the versions after v1." },
        ],
        deliverables: [
            "iOS and Android apps from one codebase",
            "Auth, push, payments and offline support",
            "App Store and Play Store submission",
            "Crash reporting and analytics",
            "OTA update pipeline",
            "Handover docs and store credentials",
        ],
        faq: [
            { q: "React Native or Flutter?", a: "It depends on your team, feature set and integrations. We recommend one in discovery and explain the tradeoffs." },
            { q: "Can you work with an existing backend?", a: "Yes. We integrate with your existing APIs, or we build a backend alongside the app if there isn't one." },
            { q: "Do you handle the App Store reviews?", a: "Yes. We prepare the listing and manage the review process through first release." },
        ],
        cta: {
            label: "Scope my mobile app",
            sub: "Tell us the core flows and platform targets — we'll return a feature list, timeline and fixed price.",
        },
    },

    "web-application": {
        slug: "web-application",
        title: "Web Application Development",
        eyebrow: "Platforms · Step 03",
        headline: ["A platform that", "grows with you."],
        sub: "Cloud-based web applications — dashboards, portals, SaaS products — with auth, roles, billing and APIs built to scale.",
        mind: "Web apps are products, not pages. If logins, roles, data and workflows aren't architected properly, you'll hit a wall the moment you try to grow.",
        icon: "layers",
        stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "AWS / Vercel", "Stripe"],
        stats: [
            { label: "Timeline", value: "10–18 weeks" },
            { label: "Architecture", value: "Multi-tenant" },
            { label: "Security", value: "SSO / RBAC" },
        ],
        highlights: [
            { title: "Multi-tenant from day one", body: "Isolation, permissions and billing built as first-class — not bolted on later." },
            { title: "Auth and roles", body: "SSO, OAuth, RBAC and audit logging — designed for teams, not just a single user table." },
            { title: "Billing and subscriptions", body: "Stripe-powered plans, trials and invoices, wired into your data model." },
            { title: "APIs and integrations", body: "REST or GraphQL APIs, webhooks and integrations with the tools your customers already use." },
        ],
        process: [
            { step: "01", title: "Discovery", body: "Users, roles, workflows, data and integrations mapped in detail before design starts." },
            { step: "02", title: "Data & API design", body: "Data model, permissions model and API contracts agreed up front." },
            { step: "03", title: "Design", body: "Screens, flows and admin tooling designed against real data scenarios." },
            { step: "04", title: "Build", body: "Next.js front end, Node.js services and PostgreSQL database, with CI/CD from day one." },
            { step: "05", title: "QA & Launch", body: "Integration tests, load testing, security review and staged rollout." },
            { step: "06", title: "Iterate", body: "Post-launch roadmap, monitoring and a release cadence under an agreed retainer." },
        ],
        deliverables: [
            "Multi-tenant Next.js + Node.js application",
            "PostgreSQL schema, migrations and seed data",
            "Auth, roles and audit logging",
            "Stripe billing and subscription flows",
            "REST or GraphQL API with docs",
            "CI/CD, staging and production environments",
        ],
        faq: [
            { q: "Can you take over an existing platform?", a: "Yes. We start with a technical audit, then propose refactor, extend or rebuild based on cost and risk." },
            { q: "How do you handle scale?", a: "Multi-tenant data models, caching, and infrastructure-as-code — all designed for growth from v1." },
            { q: "Who owns the platform?", a: "You do. Source, IP and cloud accounts are yours from day one." },
        ],
        cta: {
            label: "Scope my platform",
            sub: "Share your user roles, workflows and integrations — we'll return an architecture plan, timeline and price.",
        },
    },

    "software-development": {
        slug: "software-development",
        title: "Custom Software Development",
        eyebrow: "Custom · Step 04",
        headline: ["Software that fits", "how you actually work."],
        sub: "When off-the-shelf tools no longer fit, we build custom internal systems, integrations and automations — and you own the source.",
        mind: "The spreadsheet-and-three-subscriptions workaround has a ceiling. At some point it costs more than building the system your business actually needs.",
        icon: "code",
        stack: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS", "GitHub Actions"],
        stats: [
            { label: "Timeline", value: "6–16 weeks" },
            { label: "Scope", value: "Bespoke" },
            { label: "Ownership", value: "Source + IP yours" },
        ],
        highlights: [
            { title: "Built around your workflow", body: "No forced processes. The system matches how your team already operates — then improves it." },
            { title: "Integration-first", body: "Talks to the SaaS tools you already pay for: CRMs, ERPs, payment systems, data warehouses." },
            { title: "Automation where it saves hours", body: "We identify the workflows costing the most manual time and automate them." },
            { title: "You own everything", body: "Source code, IP and infrastructure accounts are yours from day one. No lock-in." },
        ],
        process: [
            { step: "01", title: "Discovery", body: "Current tools, manual workflows and pain points mapped with the people who use them." },
            { step: "02", title: "Scope", body: "We define the minimum system that removes the biggest pains — then plan extensions." },
            { step: "03", title: "Design", body: "Data model, integrations, screens and automations designed against real scenarios." },
            { step: "04", title: "Build", body: "Iterative build with weekly demos, so you see progress and steer early." },
            { step: "05", title: "Test & Handover", body: "Testing against real workflows, documentation, and a handover session with your team." },
            { step: "06", title: "Support", body: "Maintenance, patches and new features under an agreed arrangement." },
        ],
        deliverables: [
            "Custom internal system or automation",
            "Integrations with your existing SaaS tools",
            "Docker + AWS deployment with docs",
            "Source code, repo and IP transferred to you",
            "Handover training session",
            "Optional maintenance and iteration retainer",
        ],
        faq: [
            { q: "How is this different from buying a SaaS tool?", a: "You get exactly the workflow you need, without paying per seat forever — and you own the code." },
            { q: "How big is a typical project?", a: "From a focused automation (6 weeks) to a full internal system (3–4 months). We scope before committing." },
            { q: "Do you build on top of what we already have?", a: "Yes. Where the current stack is solid, we extend it; where it isn't, we replace with a clear plan." },
        ],
        cta: {
            label: "Scope my custom build",
            sub: "Describe the workflow that's costing you time — we'll map the system that removes the pain.",
        },
    },
};