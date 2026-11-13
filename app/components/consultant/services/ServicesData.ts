// app/components/consultant/services/servicesData.ts

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
        cta: { label: "Explore technology", href: "/services/technology" },
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
        tag: "Study Abroad",
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
};

export const SERVICES: Service[] = [
    {
        icon: "globe",
        pillar: "Technology",
        title: "Website development",
        need: "your site is slow, dated or not converting",
        gets: ["Responsive design", "SEO foundations", "CMS integration"],
        href: "/services/website-development",
        linked: true,
    },
    {
        icon: "mobile",
        pillar: "Technology",
        title: "Mobile app development",
        need: "you need an app for customers or staff",
        gets: ["iOS & Android", "Native performance", "Store launch"],
        href: "/services/app-development",
        linked: true,
    },
    {
        icon: "code",
        pillar: "Technology",
        title: "Custom software",
        need: "off-the-shelf tools no longer fit",
        gets: ["Discovery & scoping", "Custom build", "Handover & support"],
        href: "/services/software-development",
        linked: true,
    },
    {
        icon: "cap",
        pillar: "Study Abroad",
        title: "University selection",
        need: "you are unsure which course or country fits",
        gets: ["Course shortlist", "Cost & timeline plan", "Realistic options"],
        href: "/study-abroad/university-selection",
        linked: true,
    },
    {
        icon: "briefcase",
        pillar: "Study Abroad",
        title: "Visa support",
        need: "the paperwork feels overwhelming",
        gets: ["Document checklist", "Application review", "Interview prep"],
        href: "/study-abroad/visa-support",
        linked: true,
    },
    {
        icon: "code",
        pillar: "Training",
        title: "Technical tracks",
        need: "you want hands-on, employer-ready skills",
        gets: ["Live projects", "Mentoring", "Certificate"],
        href: "/training/technical-tracks",
        linked: true,
    },
    {
        icon: "cap",
        pillar: "Training",
        title: "Professional skills",
        need: "your team needs upskilling",
        gets: ["Communication", "Project management", "Workshops"],
        href: "/training/professional-skills",
        linked: false,
    },
    {
        icon: "briefcase",
        pillar: "Careers",
        title: "Placement support",
        need: "you need introductions, not job boards",
        gets: ["CV review", "Company intros", "Offer negotiation"],
        href: "/careers/placement",
        linked: true,
    },
    {
        icon: "check",
        pillar: "Careers",
        title: "Interview preparation",
        need: "interviews feel unpredictable",
        gets: ["Mock interviews", "Feedback", "Prep materials"],
        href: "/careers/interview-preparation",
        linked: true,
    },
];

/* ---------- Chaos → confidence section data ---------- */

export const PROBLEMS: string[] = [
    "One vendor builds the site, another runs training, a third handles admissions.",
    "Every handover loses context and time.",
    "Nobody owns the next step.",
    "You end up project managing your own providers.",
];

export const BENEFITS: string[] = [
    "One team across technology, study abroad, training and careers.",
    "One clear plan from where you are to where you want to be.",
    "One contact who stays with you across every step.",
    "One place to add the next stage when you are ready.",
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