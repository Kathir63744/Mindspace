import type { DetailService, DetailVisual } from "../../components/pillar/PillarDetail";

export const SERVICES: DetailService[] = [
    { title: "Career direction", slug: "career-direction", need: "you need clarity on which roles to target" },
    { title: "Resume & LinkedIn", slug: "resume-linkedin", need: "your resume needs restructuring for ATS" },
    { title: "Interview coaching", slug: "interview-coaching", need: "you need mock interviews with feedback" },
    { title: "Internships", slug: "internships", need: "you want matched internship opportunities" },
    { title: "Placement support", slug: "placement-support", need: "you want warm introductions and follow-ups" },
    { title: "On-the-job readiness", slug: "on-the-job-readiness", need: "you want tools and communication ready for day one" },
];

export const VISUALS: Record<string, DetailVisual> = {
    "career-direction": {
        eyebrow: "Work readiness",
        headline: ["Know where", "you're going."],
        sub: "Role fit, industry mapping and a clear next step — before resumes and applications.",
        hero: { src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=85", alt: "Planning direction" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85", alt: "Planning", caption: "Planning", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "Roles", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Role fit", body: "Which roles genuinely match your background." },
            { title: "Industry mapping", body: "Where those roles exist and how to enter." },
            { title: "Next steps", body: "A concrete plan — not generic advice." },
        ],
        process: [
            { step: "01", title: "Assess", body: "Skills, background and goals." },
            { step: "02", title: "Map", body: "Roles and industries." },
            { step: "03", title: "Plan", body: "Skills to build, steps to take." },
            { step: "04", title: "Move", body: "First applications with clarity." },
        ],
        faq: [
            { q: "How long does this take?", a: "Typically 1–2 sessions over 1–2 weeks." },
            { q: "What if I'm unsure of goals?", a: "That's exactly the case this track handles." },
        ],
    },
    "resume-linkedin": {
        eyebrow: "Work readiness",
        headline: ["A resume that", "gets read."],
        sub: "Restructured, ATS-friendly and human-readable — designed to get past the first screen.",
        hero: { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1800&q=85", alt: "Resume" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=85", alt: "Resume", caption: "Resume", span: "md:col-span-5" },
            { src: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=1200&q=85", alt: "LinkedIn", caption: "LinkedIn", span: "md:col-span-7" },
        ],
        highlights: [
            { title: "ATS structure", body: "Format and keywords that pass parsers." },
            { title: "Bullet rewrites", body: "Every line rewritten with impact and metrics." },
            { title: "LinkedIn polish", body: "Headline, summary and experience refresh." },
        ],
        process: [
            { step: "01", title: "Review", body: "Current resume and target roles." },
            { step: "02", title: "Restructure", body: "Format and sections." },
            { step: "03", title: "Rewrite", body: "Bullets and metrics." },
            { step: "04", title: "Polish", body: "Final version, ready to send." },
        ],
        faq: [
            { q: "One format for all roles?", a: "One master resume, tailored per role — we show how." },
            { q: "Do you write cover letters?", a: "Yes — as an add-on." },
        ],
    },
    "interview-coaching": {
        eyebrow: "Work readiness",
        headline: ["Interviews,", "practised."],
        sub: "Behavioral and technical mock interviews with structured feedback.",
        hero: { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=85", alt: "Interview" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85", alt: "Interview", caption: "Mock", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "Feedback", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Behavioral rounds", body: "Structured answers to common themes." },
            { title: "Technical rounds", body: "Role-specific drills and hints." },
            { title: "Feedback rounds", body: "Every session reviewed with next steps." },
        ],
        process: [
            { step: "01", title: "Brief", body: "Roles and background." },
            { step: "02", title: "Mock 1", body: "Baseline interview." },
            { step: "03", title: "Practice", body: "Targeted drills." },
            { step: "04", title: "Mock 2", body: "Final mock and feedback." },
        ],
        faq: [
            { q: "How many mocks included?", a: "Typically 3 across behavioral and technical." },
            { q: "Which roles?", a: "Engineering, product, design, data, and adjacent." },
        ],
    },
    "internships": {
        eyebrow: "Work readiness",
        headline: ["Real work,", "real teams."],
        sub: "Matched internship opportunities with partner teams.",
        hero: { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85", alt: "Working team" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "On the job", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85", alt: "Collaboration", caption: "Collaboration", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Match", body: "Opportunities aligned with your direction." },
            { title: "Prepare", body: "Resume and interview prep built in." },
            { title: "Support", body: "Support during the internship itself." },
        ],
        process: [
            { step: "01", title: "Profile", body: "Direction and skills." },
            { step: "02", title: "Match", body: "Internship options." },
            { step: "03", title: "Interview", body: "Team interviews." },
            { step: "04", title: "Start", body: "Onboarding support." },
        ],
        faq: [
            { q: "Paid or unpaid?", a: "Depends on partner and role." },
            { q: "Duration?", a: "Typically 8–12 weeks." },
        ],
    },
    "placement-support": {
        eyebrow: "Work readiness",
        headline: ["Introductions", "that go somewhere."],
        sub: "Warm introductions, follow-ups and offer negotiation support.",
        hero: { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=85", alt: "Handshake" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85", alt: "Handshake", caption: "Intros", span: "md:col-span-5" },
            { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "Teams", span: "md:col-span-7" },
        ],
        highlights: [
            { title: "Partner intros", body: "Warm introductions to hiring teams." },
            { title: "Follow-ups", body: "Structured follow-ups that actually happen." },
            { title: "Negotiation", body: "Offer review and negotiation guidance." },
        ],
        process: [
            { step: "01", title: "Ready", body: "Resume and interview readiness." },
            { step: "02", title: "Introduce", body: "Partner team intros." },
            { step: "03", title: "Follow", body: "Structured follow-ups." },
            { step: "04", title: "Offer", body: "Review and negotiation." },
        ],
        faq: [
            { q: "Do you guarantee placement?", a: "We provide structured support and intros — outcomes depend on fit and interviews." },
            { q: "Which roles?", a: "Engineering, product, design, data and adjacent." },
        ],
    },
    "on-the-job-readiness": {
        eyebrow: "Work readiness",
        headline: ["Day one,", "ready."],
        sub: "Tools, teamwork and communication — the practical side of starting well.",
        hero: { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=85", alt: "Team" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85", alt: "Team", caption: "Teamwork", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85", alt: "Planning", caption: "Tools", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Tools", body: "Common tools and workflows you'll actually use." },
            { title: "Communication", body: "Writing, updates and asking for help." },
            { title: "First weeks", body: "A practical checklist for starting well." },
        ],
        process: [
            { step: "01", title: "Tools", body: "Everyday tools and setup." },
            { step: "02", title: "Workflow", body: "Task tracking and communication." },
            { step: "03", title: "Writing", body: "Clear updates and questions." },
            { step: "04", title: "Checklist", body: "First-weeks practical plan." },
        ],
        faq: [
            { q: "Is this role-specific?", a: "It's general, with role-specific adjustments." },
            { q: "When should I take this?", a: "After offer, before day one." },
        ],
    },
};