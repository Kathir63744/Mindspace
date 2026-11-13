import type { Metadata } from "next";
import PillarLanding, { PillarLandingData } from "../components/pillar/PillarLanding";




export const metadata: Metadata = {
    title: "Careers — MindSpace",
    description:
        "Career direction, resume work, interview coaching, internships and placement support in one structured track.",
};

const data: PillarLandingData = {
    slug: "careers",
    label: "Careers",
    eyebrow: "Work readiness",
    headline: ["Prepare for the", "work ahead."],
    sub: "Career direction, resume work, interview coaching, internships and placement support — one structured track.",
    hero: {
        src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85",
        alt: "Team working together",
    },
    proofPoints: [
        { value: "6–12", label: "Weeks to readiness" },
        { value: "5+", label: "Partner networks" },
        { value: "1:1", label: "Coaching model" },
        { value: "3", label: "Mock interviews" },
    ],
    services: [
        {
            title: "Career direction",
            href: "/careers/career-direction",
            need: "you need clarity on which roles to target",
        },
        {
            title: "Resume & LinkedIn",
            href: "/careers/resume-linkedin",
            need: "your resume needs restructuring for ATS",
        },
        {
            title: "Interview coaching",
            href: "/careers/interview-coaching",
            need: "you need mock interviews with feedback",
        },
        {
            title: "Internships",
            href: "/careers/internships",
            need: "you want matched internship opportunities",
        },
        {
            title: "Placement support",
            href: "/careers/placement-support",
            need: "you want warm introductions and follow-ups",
        },
        {
            title: "On-the-job readiness",
            href: "/careers/on-the-job-readiness",
            need: "you want tools and communication ready for day one",
        },
    ],
    gallery: [
        {
            src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
            alt: "Interview preparation",
            caption: "Interviews",
            span: "md:col-span-7",
        },
        {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
            alt: "Team meeting",
            caption: "Team fit",
            span: "md:col-span-5",
        },
        {
            src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
            alt: "Professional handshake",
            caption: "Placements",
            span: "md:col-span-5",
        },
        {
            src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85",
            alt: "Team collaborating",
            caption: "On the job",
            span: "md:col-span-7",
        },
    ],
    whyTitle: "Support that maps to real roles.",
    whyBody:
        "Career progress depends on clear next steps — not generic advice. Every step is tied to a specific role or outcome.",
    whyItems: [
        {
            title: "Role-fit first",
            body: "Direction before resumes — clarity before applications.",
        },
        {
            title: "Coaching that sticks",
            body: "Mock interviews with structured feedback rounds.",
        },
        {
            title: "Warm introductions",
            body: "Partner networks and follow-ups that actually happen.",
        },
    ],
    quote: {
        text: "The coaching helped me understand what interviewers were actually asking. That reframed the whole process.",
        source: "Career track, 2024",
    },
    closing: {
        title: "Start with a direction.",
        body: "Tell us where you are and where you want to be. We'll map the first three steps.",
    },
};

export default function CareersPage() {
    return <PillarLanding data={data} />;
}