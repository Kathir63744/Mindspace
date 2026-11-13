import type { DetailService, DetailVisual } from "@/app/components/pillar/PillarDetail";

export const SERVICES: DetailService[] = [
    { title: "Programming foundations", slug: "programming-foundations", need: "you're starting from basics and want a real footing" },
    { title: "Web development", slug: "web-development", need: "you want to build and ship real web products" },
    { title: "Mobile app development", slug: "app-development", need: "you want to build cross-platform mobile apps" },
    { title: "Data & AI basics", slug: "data-ai", need: "SQL, Pandas, and practical ML workflows are your next step" },
    { title: "Cloud & DevOps", slug: "cloud-devops", need: "you want deployable infrastructure skills" },
    { title: "Portfolio & certification", slug: "portfolio-certification", need: "you want a public portfolio and a certificate" },
];

export const VISUALS: Record<string, DetailVisual> = {
    "programming-foundations": {
        eyebrow: "Practical learning",
        headline: ["Start from", "the ground up."],
        sub: "Python, JavaScript and core CS — taught through small, buildable tasks each week.",
        hero: { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85", alt: "Coding on screen" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85", alt: "Code", caption: "Foundations", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85", alt: "Live coding", caption: "Live sessions", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Syntax & logic", body: "Variables, control flow, functions, data structures." },
            { title: "Small projects", body: "CLI tools, scripts and mini apps each week." },
            { title: "Debug habits", body: "Reading errors, testing and structured debugging." },
        ],
        process: [
            { step: "01", title: "Basics", body: "Syntax, tooling and first programs." },
            { step: "02", title: "Structure", body: "Functions, data structures and files." },
            { step: "03", title: "Projects", body: "Small buildable tasks each week." },
            { step: "04", title: "Review", body: "Code review and certificate." },
        ],
        faq: [
            { q: "Any prior experience needed?", a: "No — this track starts from zero." },
            { q: "How long is the track?", a: "Typically 8–10 weeks." },
        ],
    },
    "web-development": {
        eyebrow: "Practical learning",
        headline: ["Build for", "the web."],
        sub: "HTML, CSS, JavaScript, React and Node — build and deploy real web products.",
        hero: { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85", alt: "Code editor" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85", alt: "Code", caption: "Frontend", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "Backend", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Frontend", body: "HTML, CSS, JavaScript, React, responsive UI." },
            { title: "Backend", body: "Node, APIs, auth and data persistence." },
            { title: "Deploy", body: "Ship to Vercel/Netlify with real URLs." },
        ],
        process: [
            { step: "01", title: "Basics", body: "HTML, CSS and JS." },
            { step: "02", title: "React", body: "Components, state, routing." },
            { step: "03", title: "Backend", body: "APIs and data." },
            { step: "04", title: "Ship", body: "Deploy a full product." },
        ],
        faq: [
            { q: "Do I need prior experience?", a: "Some HTML/CSS familiarity helps." },
            { q: "Will I have a portfolio?", a: "Yes — 2–3 deployed projects." },
        ],
    },
    "app-development": {
        eyebrow: "Practical learning",
        headline: ["Mobile", "from idea to store."],
        sub: "React Native — build cross-platform apps and ship them to TestFlight or Play Console.",
        hero: { src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1800&q=85", alt: "Mobile apps" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85", alt: "Mobile", caption: "Apps", span: "md:col-span-5" },
            { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "Build", span: "md:col-span-7" },
        ],
        highlights: [
            { title: "React Native", body: "Components, navigation and native modules." },
            { title: "APIs & state", body: "REST, auth, offline sync." },
            { title: "Ship to store", body: "Builds, screenshots and submission." },
        ],
        process: [
            { step: "01", title: "Setup", body: "Tooling and first screen." },
            { step: "02", title: "Build", body: "Screens, navigation and data." },
            { step: "03", title: "Polish", body: "Motion, accessibility and edge cases." },
            { step: "04", title: "Submit", body: "Store build and publish." },
        ],
        faq: [
            { q: "iOS and Android?", a: "One codebase, both platforms." },
            { q: "Do I need a Mac?", a: "For iOS builds, yes — or use a cloud build." },
        ],
    },
    "data-ai": {
        eyebrow: "Practical learning",
        headline: ["Data and", "decision."],
        sub: "SQL, Pandas and practical ML workflows — from raw data to working models.",
        hero: { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85", alt: "Data dashboard" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85", alt: "Dashboard", caption: "Data", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=85", alt: "Notebook", caption: "ML", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "SQL & Pandas", body: "Querying, cleaning and shaping datasets." },
            { title: "Visualisation", body: "Charts that actually communicate." },
            { title: "ML basics", body: "Regression, classification and evaluation." },
        ],
        process: [
            { step: "01", title: "Query", body: "SQL and data access." },
            { step: "02", title: "Clean", body: "Pandas and preparation." },
            { step: "03", title: "Model", body: "Basics with scikit-learn." },
            { step: "04", title: "Present", body: "Findings and dashboard." },
        ],
        faq: [
            { q: "Python needed?", a: "Yes — basics are covered in week 1." },
            { q: "Real datasets?", a: "Yes — public and synthetic datasets." },
        ],
    },
    "cloud-devops": {
        eyebrow: "Practical learning",
        headline: ["Ship with", "confidence."],
        sub: "Git, CI/CD, Docker and cloud deployment — practical infrastructure skills.",
        hero: { src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1800&q=85", alt: "Cloud infrastructure" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=85", alt: "Cloud", caption: "Cloud", span: "md:col-span-5" },
            { src: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=85", alt: "CI/CD", caption: "CI/CD", span: "md:col-span-7" },
        ],
        highlights: [
            { title: "Git workflows", body: "Branching, PRs and history you can read." },
            { title: "CI/CD", body: "Automated builds, tests and deploys." },
            { title: "Containers", body: "Docker and one real cloud deploy." },
        ],
        process: [
            { step: "01", title: "Git", body: "Workflows and collaboration." },
            { step: "02", title: "CI", body: "Automated tests and builds." },
            { step: "03", title: "Containers", body: "Docker images and runs." },
            { step: "04", title: "Deploy", body: "One real cloud deployment." },
        ],
        faq: [
            { q: "Which cloud?", a: "AWS basics with alternatives mentioned." },
            { q: "Cost involved?", a: "Free-tier usage only." },
        ],
    },
    "portfolio-certification": {
        eyebrow: "Practical learning",
        headline: ["Finish with", "something to show."],
        sub: "A public portfolio, reviewed code and a certificate — proof you can build.",
        hero: { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85", alt: "Portfolio" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85", alt: "Portfolio", caption: "Portfolio", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85", alt: "Certificate", caption: "Certificate", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Portfolio site", body: "A clean, fast personal site with 3–5 projects." },
            { title: "Case studies", body: "Structured write-ups for each project." },
            { title: "Certificate", body: "Issued after assessment and review." },
        ],
        process: [
            { step: "01", title: "Curate", body: "Pick the strongest projects." },
            { step: "02", title: "Write", body: "Case studies and structure." },
            { step: "03", title: "Publish", body: "Site and links." },
            { step: "04", title: "Certify", body: "Assessment and certificate." },
        ],
        faq: [
            { q: "Do I need deployed projects?", a: "Yes — 3–5 working deployments." },
            { q: "Is the certificate verifiable?", a: "Yes — with a verifiable ID." },
        ],
    },
};