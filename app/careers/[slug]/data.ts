// app/careers/[slug]/data.ts
import type { DetailService, DetailVisual } from "../../components/pillar/PillarDetail";

/* ============================================================
   Extra per-page fields (extend DetailVisual locally)
============================================================ */

export type CareerStat = { label: string; value: string };
export type CareerCta = { label: string; sub: string };

export type CareerVisual = DetailVisual & {
    mind: string;
    stats: CareerStat[];
    cta: CareerCta;
};

export const SERVICES: DetailService[] = [
    { title: "Career direction", slug: "career-direction", need: "you need clarity on which roles to target" },
    { title: "Resume & LinkedIn", slug: "resume-linkedin", need: "your resume needs restructuring for ATS" },
    { title: "Interview coaching", slug: "interview-coaching", need: "you need mock interviews with feedback" },
    { title: "Job search support", slug: "job-search-support", need: "you need a weekly system, not more job boards" },
    { title: "Internship assistance", slug: "internships", need: "you want matched internship opportunities" },
    { title: "Placement support", slug: "placement-support", need: "we help you prepare for and connect with relevant opportunities — hiring decisions are made by employers, employment is not guaranteed" },
    // Alias so old navbar links don't 404
    { title: "On-the-job readiness", slug: "on-the-job-readiness", need: "you want tools and communication ready for day one" },
];

export const VISUALS: Record<string, CareerVisual> = {
    /* ==========================================================
       1. CAREER DIRECTION — "I'm confused, where do I start?"
    ========================================================== */
    "career-direction": {
        eyebrow: "Clarity · Step 01",
        headline: ["Know where", "you're going."],
        sub: "A structured session that maps your strengths, background and constraints to real roles — and hands you a written 90-day plan.",
        mind: "You're not lazy. You just don't know which role fits you yet. This session fixes that first.",
        stats: [
            { label: "Format", value: "1:1 session" },
            { label: "Deliverable", value: "Role map + plan" },
            { label: "Timeline", value: "1–2 weeks" },
        ],
        cta: {
            label: "Book your clarity session",
            sub: "Walk away with a named role, a shortlist of companies, and a 90-day plan — not generic advice.",
        },
        hero: {
            src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=85",
            alt: "Planning direction",
        },
        mosaic: [
            {
                src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85",
                alt: "Planning",
                caption: "Plan",
                span: "md:col-span-7",
            },
            {
                src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
                alt: "Team",
                caption: "Roles",
                span: "md:col-span-5",
            },
        ],
        highlights: [
            { title: "Role fit", body: "Which roles genuinely match your background — and which ones you should stop chasing." },
            { title: "Industry mapping", body: "Where those roles exist, who's hiring, and how people actually enter." },
            { title: "Written action plan", body: "A 90-day plan with skills to build, companies to target, and next steps — delivered as a document you keep." },
        ],
        process: [
            { step: "01", title: "Intake", body: "A short questionnaire on background, interests and constraints." },
            { step: "02", title: "1:1 call", body: "60 minutes exploring what you actually want to do." },
            { step: "03", title: "Role map", body: "A shortlist of roles matched to your profile." },
            { step: "04", title: "Action plan", body: "90-day plan written and delivered within 48 hours." },
        ],
        faq: [
            { q: "What if I still don't know after the session?", a: "We keep going. You get a second follow-up within 2 weeks to refine the plan — no extra charge." },
            { q: "Do you guarantee a job?", a: "No. This is guidance, not placement. If you want introductions, the Placement support track is the next step." },
            { q: "How long does this take?", a: "Typically 1–2 sessions spread across 1–2 weeks, plus a written plan delivered within 48 hours of the call." },
        ],
    },

    /* ==========================================================
       2. RESUME & LINKEDIN — "I apply but hear nothing."
    ========================================================== */
    "resume-linkedin": {
        eyebrow: "Callbacks · Step 02",
        headline: ["A resume that", "gets read."],
        sub: "ATS-aware rewrite + LinkedIn profile that gets found — delivered in 5 business days, with one revision round.",
        mind: "It's probably not you. It's that your resume never reaches a human. Let's fix the first screen.",
        stats: [
            { label: "Format", value: "Done-for-you" },
            { label: "Delivery", value: "5 business days" },
            { label: "Includes", value: "1 revision" },
        ],
        cta: {
            label: "Get a free resume teardown",
            sub: "Send your current resume. We'll send back 3 specific things blocking callbacks — before you pay a cent.",
        },
        hero: {
            src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1800&q=85",
            alt: "Resume",
        },
        mosaic: [
            {
                src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=85",
                alt: "Resume",
                caption: "Resume",
                span: "md:col-span-5",
            },
            {
                src: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=1200&q=85",
                alt: "LinkedIn",
                caption: "LinkedIn",
                span: "md:col-span-7",
            },
        ],
        highlights: [
            { title: "ATS structure", body: "Format and keywords that pass parsers — without looking robotic to humans." },
            { title: "Bullet rewrites", body: "Every line rewritten with action verb + what you did + real number." },
            { title: "LinkedIn polish", body: "Headline, summary and experience refreshed so recruiters can find you." },
        ],
        process: [
            { step: "01", title: "Teardown", body: "Free 3-point audit of your current resume." },
            { step: "02", title: "Rewrite", body: "ATS-safe structure and rewritten bullets." },
            { step: "03", title: "LinkedIn", body: "Headline, About and experience refresh." },
            { step: "04", title: "Deliver", body: "PDF + editable doc, with one revision round." },
        ],
        faq: [
            { q: "Do you invent experience or metrics?", a: "No. We use real numbers you provide, or we coach you to estimate them honestly. No fabrication." },
            { q: "What if I don't have metrics?", a: "We'll show you how to find or estimate them from the work you actually did. Most people have more than they think." },
            { q: "Do you write cover letters?", a: "Yes — as an add-on. Standard package includes resume + LinkedIn." },
        ],
    },

    /* ==========================================================
       3. INTERVIEW COACHING — "I freeze / ramble."
    ========================================================== */
    "interview-coaching": {
        eyebrow: "Confidence · Step 03",
        headline: ["Interviews,", "practised."],
        sub: "Recorded mock interviews with written feedback — so you walk in rehearsed, not hoping.",
        mind: "Stop rehearsing in your head. The only way to stop freezing is to practise out loud with feedback.",
        stats: [
            { label: "Format", value: "Recorded mocks" },
            { label: "Feedback", value: "Within 24h" },
            { label: "Mocks", value: "3 included" },
        ],
        cta: {
            label: "Book a mock interview",
            sub: "Role-specific behavioural and technical mocks, with written feedback on structure, tone and body language.",
        },
        hero: {
            src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=85",
            alt: "Interview",
        },
        mosaic: [
            {
                src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
                alt: "Interview",
                caption: "Mock",
                span: "md:col-span-7",
            },
            {
                src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
                alt: "Team",
                caption: "Feedback",
                span: "md:col-span-5",
            },
        ],
        highlights: [
            { title: "Behavioral rounds", body: "STAR-structured answers to the themes that come up in every real interview." },
            { title: "Technical rounds", body: "Role-specific drills — coding, case, product sense, or system design." },
            { title: "Written feedback", body: "Every session recorded and reviewed within 24 hours — with 3 specific fixes before the real interview." },
        ],
        process: [
            { step: "01", title: "Brief", body: "Your target roles, timeline and past interview experience." },
            { step: "02", title: "Mock 1", body: "Baseline interview — recorded and scored." },
            { step: "03", title: "Drills", body: "Targeted practice on the weakest answers." },
            { step: "04", title: "Mock 2", body: "Final mock + written improvement plan." },
        ],
        faq: [
            { q: "How many mocks are included?", a: "Three, typically — one baseline, one drill-focused, one final. Rush options available if your interview is in 48h." },
            { q: "Which roles do you cover?", a: "Engineering, product, design, data, and adjacent. Coaches are matched to your industry." },
            { q: "Is the session recorded?", a: "Yes. You get the recording plus written feedback within 24 hours." },
        ],
    },

    /* ==========================================================
       4. JOB SEARCH SUPPORT — "I'm applying into a void."
    ========================================================== */
    "job-search-support": {
        eyebrow: "System · Step 04",
        headline: ["A search that", "actually moves."],
        sub: "A target company list, outreach templates, and a weekly tracker — plus 4 weeks of accountability calls.",
        mind: "Applying isn't a strategy. You don't need more job boards — you need a target list and a weekly rhythm.",
        stats: [
            { label: "Format", value: "4-week sprint" },
            { label: "Includes", value: "Target list" },
            { label: "Support", value: "2 × check-ins" },
        ],
        cta: {
            label: "Build my search plan",
            sub: "Get a 20–30 company target list matched to your role, outreach templates, and a weekly rhythm that produces interviews.",
        },
        hero: {
            src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1800&q=85",
            alt: "Job search",
        },
        mosaic: [
            {
                src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=85",
                alt: "Search",
                caption: "Targeting",
                span: "md:col-span-7",
            },
            {
                src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
                alt: "Tracker",
                caption: "Tracking",
                span: "md:col-span-5",
            },
        ],
        highlights: [
            { title: "Target company list", body: "20–30 companies matched to your role, level, and location — not a scraped job board." },
            { title: "Outreach templates", body: "LinkedIn and email templates with follow-up sequences you can copy and send." },
            { title: "Weekly tracker + calls", body: "A Google Sheet with stages (applied → viewed → interview → offer) plus 2 × 30-min check-ins over 4 weeks." },
        ],
        process: [
            { step: "01", title: "Audit", body: "Current search effort, targeting and response rate." },
            { step: "02", title: "Target list", body: "20–30 matched companies delivered in week 1." },
            { step: "03", title: "Outreach", body: "Templates + first-week execution with feedback." },
            { step: "04", title: "Review", body: "Weekly tracker review + adjust the plan." },
        ],
        faq: [
            { q: "Do you apply on my behalf?", a: "No. We build the target list and templates; you execute. That's why it works — you stay in the loop on every role." },
            { q: "Is this just job board access?", a: "No. The target list is researched and matched to you — not a feed of open roles." },
            { q: "What if I don't have a resume ready?", a: "Start with Resume & LinkedIn first. This track assumes your resume passes the first screen." },
        ],
    },

    /* ==========================================================
       5. INTERNSHIPS — "I can't get experience without experience."
    ========================================================== */
    "internships": {
        eyebrow: "First foot · Step 05",
        headline: ["Real work,", "real teams."],
        sub: "Matched internships with partner teams — structured, mentored, and designed to convert into a full-time reference or offer.",
        mind: "You're not stuck because you're not good enough. You're stuck because no one has given you the first project yet.",
        stats: [
            { label: "Format", value: "Project-based" },
            { label: "Duration", value: "8–12 weeks" },
            { label: "Outcome", value: "Reference + portfolio" },
        ],
        cta: {
            label: "Apply for matching",
            sub: "A structured internship with a real project, a mentor, and a written reference at the end. Not a coffee-fetching role.",
        },
        hero: {
            src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85",
            alt: "Working team",
        },
        mosaic: [
            {
                src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
                alt: "Team",
                caption: "On the job",
                span: "md:col-span-7",
            },
            {
                src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85",
                alt: "Collaboration",
                caption: "Collaboration",
                span: "md:col-span-5",
            },
        ],
        highlights: [
            { title: "Matched to a real project", body: "You're placed in a host team with a defined deliverable — not a general internship pool." },
            { title: "Mentor + review", body: "A named mentor, a mid-point review, and a written reference at the end." },
            { title: "Conversion path", body: "Strong interns get priority for our Placement support track or a direct intro to the host team." },
        ],
        process: [
            { step: "01", title: "Profile", body: "Skills, direction, and what you want out of the internship." },
            { step: "02", title: "Match", body: "We shortlist 1–2 host teams that fit your track." },
            { step: "03", title: "Interview", body: "You interview with the host team — we prep you." },
            { step: "04", title: "Start", body: "Onboarding support + mentor assigned." },
        ],
        faq: [
            { q: "Is it paid?", a: "Depends on the host team. We tell you upfront per opportunity — no surprises." },
            { q: "Can I do it remotely?", a: "Most host teams support remote or hybrid — it's listed per opportunity." },
            { q: "What if I don't get matched?", a: "You get priority in the next matching round at no extra cost, plus a review of what to improve." },
        ],
    },

    /* ==========================================================
       6. PLACEMENT SUPPORT — "I'm ready but invisible."
    ========================================================== */
    "placement-support": {
        eyebrow: "Introductions · Step 06",
        headline: ["Introductions", "that go somewhere."],
        sub: "We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed.",
        mind: "You're ready. Now you need warm intros — not another cold application into a portal.",
        stats: [
            { label: "Format", value: "3–5 intros/mo" },
            { label: "Includes", value: "Negotiation" },
            { label: "Model", value: "Sprint or success" },
        ],
        cta: {
            label: "Check eligibility",
            sub: "We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed.",
        },
        hero: {
            src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=85",
            alt: "Handshake",
        },
        mosaic: [
            {
                src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
                alt: "Handshake",
                caption: "Intros",
                span: "md:col-span-5",
            },
            {
                src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
                alt: "Team",
                caption: "Teams",
                span: "md:col-span-7",
            },
        ],
        highlights: [
            { title: "Warm introductions", body: "3–5 targeted intros per month to hiring teams whose role matches your profile." },
            { title: "Follow-ups that happen", body: "Structured follow-ups after every intro — no ghosting on our side." },
            { title: "Offer negotiation", body: "We review the offer, benchmark salary, and coach you through the ask." },
        ],
        process: [
            { step: "01", title: "Eligibility", body: "Portfolio + reviewed resume + at least one mock interview." },
            { step: "02", title: "Introduce", body: "3–5 partner team intros per month." },
            { step: "03", title: "Follow", body: "Structured follow-ups + interview prep per intro." },
            { step: "04", title: "Offer", body: "Offer review + negotiation coaching." },
        ],
        faq: [
            { q: "Do you guarantee placement?", a: "No. We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed." },
            { q: "Which roles?", a: "Engineering, product, design, data and adjacent. Partner teams hire across levels." },
            { q: "How many intros do I get?", a: "3–5 targeted introductions per month for 6 weeks (or longer, on the success model)." },
        ],
    },
};

/* ============================================================
   ALIAS — keep old slug working so navbar doesn't 404
============================================================ */
VISUALS["on-the-job-readiness"] = {
    ...VISUALS["placement-support"],
    eyebrow: "Day one · Step 06",
    headline: ["Day one,", "ready."],
    sub: "We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed.",
    mind: "You got the offer. Now make sure day one doesn't undo the work that got you here.",
    stats: [
        { label: "Format", value: "1:1 coaching" },
        { label: "Includes", value: "Tool setup" },
        { label: "Outcome", value: "Confident week one" },
    ],
    cta: {
        label: "Get day-one ready",
        sub: "We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed.",
    },
    highlights: [
        { title: "Tools", body: "The everyday tools and workflows your team will actually use — set up before you start." },
        { title: "Communication", body: "Writing updates, asking for help, and escalating without drama." },
        { title: "First weeks", body: "A practical checklist for starting well — from day one to week four." },
    ],
    process: [
        { step: "01", title: "Tools", body: "Everyday tools and setup." },
        { step: "02", title: "Workflow", body: "Task tracking and communication." },
        { step: "03", title: "Writing", body: "Clear updates and questions." },
        { step: "04", title: "Checklist", body: "First-weeks practical plan." },
    ],
    faq: [
        { q: "Do you guarantee placement?", a: "No. We help candidates prepare for and connect with relevant job opportunities. Hiring decisions are made by employers, and employment is not guaranteed." },
        { q: "Is this role-specific?", a: "It's general, with role-specific adjustments based on the tools your team uses." },
        { q: "When should I take this?", a: "After you accept the offer, before day one." },
    ],
};