import type { Metadata } from "next";
import PillarLanding, { PillarLandingData } from "../components/pillar/PillarLanding";



export const metadata: Metadata = {
    title: "Study Abroad — MindSpace",
    description:
        "Country exploration, university shortlisting, admission guidance, documentation and student visa support.",
};

const data: PillarLandingData = {
    slug: "study-abroad",
    label: "Study abroad",
    eyebrow: "Global education",
    headline: ["Study where", "the future is."],
    sub: "University exploration, application support, documentation and student visas — one guided pathway from shortlist to arrival.",
    hero: {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85",
        alt: "Graduation ceremony",
    },
    proofPoints: [
        { value: "15+", label: "Destination countries" },
        { value: "250+", label: "Partner universities" },
        { value: "98%", label: "Visa success rate" },
        { value: "1:1", label: "Counsellor model" },
    ],
    services: [
        { title: "Country & course mapping", href: "/study-abroad/country-course-mapping", need: "you need to match goals and budgets to real destinations" },
        { title: "University shortlisting", href: "/study-abroad/university-shortlisting", need: "you want universities that fit your profile" },
        { title: "Admission & SOP support", href: "/study-abroad/admission-support", need: "essays and applications need to be handled end-to-end" },
        { title: "Financial documentation", href: "/study-abroad/financial-documentation", need: "proof of funds, scholarships or loans need structuring" },
        { title: "Visa filing", href: "/study-abroad/visa-support", need: "the visa file, mocks and filing must be done right" },
        { title: "Pre-departure", href: "/study-abroad/pre-departure", need: "accommodation, travel and arrival need orientation" },
    ],
    gallery: [
        { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85", alt: "University library", caption: "Campus", span: "md:col-span-7" },
        { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85", alt: "Students studying together", caption: "Study", span: "md:col-span-5" },
        { src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=85", alt: "Passport and documents", caption: "Documentation", span: "md:col-span-5" },
        { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85", alt: "Travel planning", caption: "Travel", span: "md:col-span-7" },
    ],
    whyTitle: "Guidance with a clear outcome.",
    whyBody: "Most study-abroad journeys stall on unclear documents, unclear timelines, or unclear fit. We keep each step specific.",
    whyItems: [
        { title: "Realistic shortlists", body: "Universities that match your profile — not a wishlist." },
        { title: "Document rigour", body: "Files checked, cross-checked, and filed on time." },
        { title: "Visa readiness", body: "Interview prep and mock reviews before each filing." },
    ],
    quote: {
        text: "The application felt like a project plan. Every deadline was clear, and every document was checked twice.",
        source: "Postgraduate applicant, 2024",
    },
    closing: {
        title: "Start with a conversation.",
        body: "Tell us your goals and timeline. We'll map the first three steps.",
    },
};

export default function StudyAbroadPage() {
    return <PillarLanding data={data} />;
}