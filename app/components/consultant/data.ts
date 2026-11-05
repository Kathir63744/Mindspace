/* ---------- Site details ---------- */
export const siteConfig = {
    name: "Mind Space",
    tagline: "Software and career solutions",
    phone: "+00 00000 00000",
    email: "info@example.com",
    address: "Client address to be added",
    hours: "Mon to Sat, 9:30 am to 6:30 pm",
    logo: "/logo.png",
};

/* ---------- Services ---------- */
export type ServiceGroup = "build" | "grow";

export type Service = {
    id: string;
    group: ServiceGroup;
    icon: "globe" | "mobile" | "code" | "compass" | "cap" | "chat";
    title: string;
    short: string;
    body: string;
    href: string;
};

export const services: Service[] = [
    {
        id: "website-development",
        group: "build",
        icon: "globe",
        title: "Website development",
        short: "Fast, responsive websites that bring in customers.",
        body: "We design and build responsive, search-friendly websites, from company pages to online stores, and connect them to your enquiry forms and email.",
        href: "/services/website-development",
    },
    {
        id: "app-development",
        group: "build",
        icon: "mobile",
        title: "App development",
        short: "Mobile apps built around how your users behave.",
        body: "Android and iOS apps planned around your users, from first prototype to store launch and updates.",
        href: "/services/app-development",
    },
    {
        id: "software-development",
        group: "build",
        icon: "code",
        title: "Software development",
        short: "Custom software shaped to how your business works.",
        body: "Custom business software, from internal tools and dashboards to full platforms, built around how your team works.",
        href: "/services/software-development",
    },
    {
        id: "job-consultation",
        group: "grow",
        icon: "compass",
        title: "Job consultation",
        short: "One-to-one guidance on roles, resumes and next steps.",
        body: "One-to-one sessions to choose a role, improve your resume and prepare for the next step in your career.",
        href: "/training/job-consultation",
    },
    {
        id: "job-training",
        group: "grow",
        icon: "cap",
        title: "Job training",
        short: "Hands-on, job-ready skills with practice and mentoring.",
        body: "Practical, job-ready training with hands-on projects, mock interviews and mentoring.",
        href: "/training/job-training",
    },
    {
        id: "corporate-communication",
        group: "grow",
        icon: "chat",
        title: "Corporate and communication training",
        short: "Workplace and communication training for your teams.",
        body: "Programs for teams on workplace skills, spoken and written communication, and professional behaviour.",
        href: "/training/corporate-communication",
    },
];

export const servicesContent = {
    heading: "Software for your business. Skills for your people.",
    body: "Use one service or combine them. Tell us what you need and we will suggest where to start.",
    cta: { label: "Talk to us", href: "/contact" },
};

/* ---------- Navigation ---------- */
export type NavChild = { label: string; href: string; note?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

// Hardcoded for 100% reliability
export const navItems: NavItem[] = [
    {
        label: "Services",
        children: [
            { label: "Website development", href: "/services/website-development", note: "Fast, responsive websites." },
            { label: "App development", href: "/services/app-development", note: "Mobile apps built for users." },
            { label: "Software development", href: "/services/software-development", note: "Custom software for your business." },
        ]
    },
    {
        label: "Training and careers",
        children: [
            { label: "Job consultation", href: "/training/job-consultation", note: "One-to-one guidance." },
            { label: "Job training", href: "/training/job-training", note: "Hands-on, job-ready skills." },
            { label: "Corporate and communication training", href: "/training/corporate-communication", note: "Workplace training for teams." },
        ]
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

/* ---------- Hero ---------- */
export const heroContent = {
    line1: "We build software.",
    line2: "We build careers.",
    body: "Websites, apps and custom software for your business. Job guidance and training for your people and your future.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "Explore training", href: "/training/job-training" },
    scrollLabel: "Scroll to explore",
    groupLabels: { build: "Software for business", grow: "Training for people and teams" },
};

/* ---------- Keep the rest of your existing data below (stories, faqs, etc) ---------- */
export const stories = [
    {
        id: "a",
        name: "Joshua Lange",
        role: "Research Scientist",
        location: "Stockholm, Sweden",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        quote: "I feel like I've gained a valuable skill set that looks great on my CV. You don't have to change careers; you can make your current job better, more efficient, and make your life easier."
    },
    {
        id: "b",
        name: "Shabana Khatau",
        role: "Systems and Applications Advisor",
        location: "London, England",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        quote: "I wasted quite a bit of time before learning about Mind Space. Anyone who would come up to me, I would direct them straight to Mind Space. Don't waste any time on anyone else; just start there."
    },
    {
        id: "c",
        name: "Jimmy Soto",
        role: "SOC Security Specialist",
        location: "Washington, DC - Baltimore",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        quote: "Mind Space played into the whole gamification aspect because of how user-friendly it is. Completing a module felt like an achievement, and it helped me have a pathway to dive into cybersecurity, coming from a completely different world."
    },
];

export const storiesContent = {
    heading: "Real success from real learners",
    body: "With the right skills, anything's possible. See how real learners are evolving their careers with Mind Space.",
};

export const faqs = [
    { q: "How do we start a project?", a: "Send the enquiry form or call us. We'll reply with a short discovery call to understand scope, timeline and budget before quoting." },
    { q: "Do you work with small businesses?", a: "Yes. Most of our work is with small and mid-sized teams who need something practical, not something oversized." },
    { q: "Can you take over an existing website or app?", a: "Usually yes. We audit the current build first, then tell you honestly whether a fix, a rebuild, or a partial replacement is cheaper." },
    { q: "Is training in person or online?", a: "Both. Corporate and communication training is delivered on-site or online, depending on your team's location and schedule." },
    { q: "How are you priced?", a: "Fixed price for defined projects, monthly retainer for ongoing support, and per-batch for training. Replace this with the client's actual pricing policy." },
];

export const faqContent = {
    heading: "Questions we get first",
    helpLine: "Still unsure about something?",
    cta: { label: "Talk to us", href: "/contact" },
};

export const enquiryContent = {
    heading: "Tell us what you need.",
    body: "Fill in a few details and we'll reply with a short discovery call to plan the next step.",
    levels: ["Website or app", "Custom software", "Job consultation", "Job training", "Corporate training", "Something else"],
};

export const footerContent = {
    about: "Software, apps and career training for people and businesses.",
    disclaimer: "Mind Space builds software and delivers training. We are not a university or government body.",
    company: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    legal: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of use", href: "/terms" },
    ],
};
/* =====================================================================
   SUPPORTING DATA (Required for Destinations.tsx, Process.tsx, Enquiry.tsx)
   ===================================================================== */

// 1. For Process.tsx
export const processSteps = [
    { title: "Talk to us", body: "Tell us what you need. We listen before we recommend." },
    { title: "Get a plan", body: "You get a clear scope: what we build, what it costs, and how long it takes." },
    { title: "Build and review", body: "We work in short cycles and show you progress before the next stage." },
    { title: "Launch", body: "We deploy, connect your forms, and hand over the code." },
    { title: "Stay supported", body: "Ongoing fixes, updates and training. You keep a direct line." },
];

export const processContent = {
    heading: "One clear process, whichever service you pick.",
    body: "Software, apps, consulting or training — the same honest steps from first call to handover.",
};

// 2. For Destinations.tsx and Enquiry.tsx
export type Destination = {
    id: string;
    country: string;
    intakes: string[];
    permit: string;
    fields: string[];
    note: string;
};

// (I kept a few generic options so the Dropdown in Enquiry.tsx doesn't break)
export const destinations: Destination[] = [
    { id: "not-sure", country: "Not sure yet", intakes: ["TBD"], permit: "TBD", fields: ["TBD"], note: "We can help you decide." },
    { id: "uk", country: "United Kingdom", intakes: ["Sep", "Jan"], permit: "Student visa", fields: ["Business", "Tech"], note: "Top universities." },
    { id: "usa", country: "United States", intakes: ["Aug", "Jan"], permit: "F-1 visa", fields: ["STEM", "MBA"], note: "Wide range of options." },
];

export const destinationsContent = {
    heading: "Where would you like to go?",
    body: "Choose an option to get started.",
};