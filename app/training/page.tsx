import type { Metadata } from "next";
import PillarLanding, { type PillarLandingData } from "../components/pillar/PillarLanding";

export const metadata: Metadata = {
    title: "Training — MindSpace",
    description:
        "Hands-on technical programmes, real projects and certificates built around what employers are hiring for.",
};

const data: PillarLandingData = {
    slug: "training",
    label: "Training",
    eyebrow: "Practical learning",
    headline: ["Skills that", "ship to production."],
    sub: "Hands-on programmes, real projects and certificates — built around what employers are actually hiring for.",
    hero: {
        src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=85",
        alt: "Technical training session",
    },
    proofPoints: [
        { value: "6", label: "Core tracks" },
        { value: "3–5", label: "Portfolio projects" },
        { value: "100%", label: "Live instructors" },
        { value: "1:12", label: "Mentor ratio" },
    ],
    services: [
        {
            title: "Programming foundations",
            href: "/training/programming-foundations",
            need: "you're starting from basics and want a real footing",
        },
        {
            title: "Web development",
            href: "/training/web-development",
            need: "you want to build and ship real web products",
        },
        {
            title: "Mobile app development",
            href: "/training/app-development",
            need: "you want to build cross-platform mobile apps",
        },
        {
            title: "Data & AI basics",
            href: "/training/data-ai",
            need: "SQL, Pandas, and practical ML workflows are your next step",
        },
        {
            title: "Cloud & DevOps",
            href: "/training/cloud-devops",
            need: "you want deployable infrastructure skills",
        },
        {
            title: "Portfolio & certification",
            href: "/training/portfolio-certification",
            need: "you want a public portfolio and a certificate",
        },
    ],
    gallery: [
        {
            src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
            alt: "Live coding session",
            caption: "Live coding",
            span: "md:col-span-5",
        },
        {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
            alt: "Team working with laptops",
            caption: "Team projects",
            span: "md:col-span-7",
        },
        {
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
            alt: "Pair programming",
            caption: "Pair work",
            span: "md:col-span-7",
        },
        {
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
            alt: "Code editor",
            caption: "Build sessions",
            span: "md:col-span-5",
        },
    ],
    whyTitle: "Learning that produces work.",
    whyBody:
        "A certificate is only useful when it comes with something you can point to. Every track ends with shipped projects.",
    whyItems: [
        {
            title: "Hands-on by design",
            body: "Projects every week, not just at the end.",
        },
        {
            title: "Live instructors",
            body: "Sessions led by working practitioners.",
        },
        {
            title: "Portfolio-ready",
            body: "You leave with code, case studies and a certificate.",
        },
    ],
    quote: {
        text: "The project work got me my first interview. The certificate opened the door; the portfolio walked me through it.",
        source: "Web development track, 2024",
    },
    closing: {
        title: "Start with a roadmap.",
        body: "Tell us your goal and where you're starting from. We'll map the first three milestones.",
    },
};

export default function TrainingPage() {
    return <PillarLanding data={data} />;
}