import type { DetailService, DetailVisual } from "@/app/components/pillar/PillarDetail";

export const SERVICES: DetailService[] = [
    { title: "Country & course mapping", slug: "country-course-mapping", need: "you need to match goals and budgets to real destinations" },
    { title: "University shortlisting", slug: "university-shortlisting", need: "you want universities that fit your profile" },
    { title: "Admission & SOP support", slug: "admission-support", need: "essays and applications need to be handled end-to-end" },
    { title: "Financial documentation", slug: "financial-documentation", need: "proof of funds, scholarships or loans need structuring" },
    { title: "Visa filing", slug: "visa-support", need: "the visa file, mocks and filing must be done right" },
    { title: "Pre-departure", slug: "pre-departure", need: "accommodation, travel and arrival need orientation" },
];

export const VISUALS: Record<string, DetailVisual> = {
    "country-course-mapping": {
        eyebrow: "Global education",
        headline: ["The right fit", "starts with the map."],
        sub: "Match academic goals, budgets and outcomes to destinations and programmes before applying.",
        hero: { src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=85", alt: "World map" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85", alt: "Students", caption: "Goals", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85", alt: "Travel", caption: "Destinations", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Destination matching", body: "Countries and cities matched to fit, budget and outcomes." },
            { title: "Course mapping", body: "Programme shortlists that actually match your profile." },
            { title: "Cost analysis", body: "Tuition, living and total spend — side by side." },
        ],
        process: [
            { step: "01", title: "Profile", body: "Background, goals and budget." },
            { step: "02", title: "Map", body: "Country and course options." },
            { step: "03", title: "Compare", body: "Costs, outcomes and timelines." },
            { step: "04", title: "Commit", body: "A shortlist you can act on." },
        ],
        faq: [
            { q: "How many countries do you cover?", a: "UK, USA, Canada, Australia, Germany, Ireland, New Zealand and more." },
            { q: "How long does mapping take?", a: "Typically 1–2 weeks depending on profile complexity." },
        ],
    },
    "university-shortlisting": {
        eyebrow: "Global education",
        headline: ["A shortlist", "that actually fits."],
        sub: "A curated university list built around your profile, not a wishlist.",
        hero: { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=85", alt: "University library" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85", alt: "Graduation", caption: "Outcomes", span: "md:col-span-5" },
            { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85", alt: "Library", caption: "Campus", span: "md:col-span-7" },
        ],
        highlights: [
            { title: "Profile review", body: "Academic strength, tests and extracurriculars assessed." },
            { title: "Fit ranking", body: "Schools ranked by fit — not by brand only." },
            { title: "Ambition vs safety", body: "A balanced list with reach, match and safety tiers." },
        ],
        process: [
            { step: "01", title: "Review", body: "Profile and priorities." },
            { step: "02", title: "Research", body: "Programmes and outcomes." },
            { step: "03", title: "Rank", body: "Fit, cost, location, outcomes." },
            { step: "04", title: "Shortlist", body: "A balanced, actionable list." },
        ],
        faq: [
            { q: "How many universities per shortlist?", a: "Typically 6–10 across reach, match and safety tiers." },
            { q: "Do you rank by outcomes?", a: "Yes — placements, alumni, and cost of attendance factor in." },
        ],
    },
    "admission-support": {
        eyebrow: "Global education",
        headline: ["Applications", "handled end-to-end."],
        sub: "Essays, SOPs, applications and follow-ups — handled with clarity and rigour.",
        hero: { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=85", alt: "Writing documents" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85", alt: "Handshake", caption: "Outcome", span: "md:col-span-6" },
            { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85", alt: "Writing", caption: "Essays", span: "md:col-span-6" },
        ],
        highlights: [
            { title: "SOP & essay drafts", body: "Structured drafts, edits and final polish." },
            { title: "Application filing", body: "Forms filled, checked, submitted on time." },
            { title: "Follow-ups", body: "Status tracking and communication with the university." },
        ],
        process: [
            { step: "01", title: "Brief", body: "Goals and story." },
            { step: "02", title: "Draft", body: "SOP and essay drafts." },
            { step: "03", title: "Review", body: "Edits and final polish." },
            { step: "04", title: "File", body: "Applications submitted." },
        ],
        faq: [
            { q: "Do you write the SOP for me?", a: "We guide drafts, structure and edits — the voice stays yours." },
            { q: "How many drafts per essay?", a: "Typically 2–3 rounds of revision." },
        ],
    },
    "financial-documentation": {
        eyebrow: "Global education",
        headline: ["Proof of funds,", "done properly."],
        sub: "Documentation for proof of funds, scholarships and education loans — structured and checkable.",
        hero: { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=85", alt: "Financial documents" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85", alt: "Financial docs", caption: "Funds", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=85", alt: "Banking", caption: "Structure", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Proof of funds", body: "Bank statements, sponsorship and structuring." },
            { title: "Scholarship guidance", body: "Merit and need-based options mapped." },
            { title: "Loan coordination", body: "Lender options and documentation support." },
        ],
        process: [
            { step: "01", title: "Review", body: "Current financial position." },
            { step: "02", title: "Structure", body: "Docs and sponsorship." },
            { step: "03", title: "Scholarships", body: "Options applied to." },
            { step: "04", title: "Finalise", body: "A complete, checkable file." },
        ],
        faq: [
            { q: "Do you arrange loans?", a: "We coordinate with lenders and support documentation — approval depends on the lender." },
            { q: "How early should funds be ready?", a: "At least 3–6 months before the visa stage." },
        ],
    },
    "visa-support": {
        eyebrow: "Global education",
        headline: ["The visa file", "done right."],
        sub: "Visa file preparation, mock interviews and application tracking — handled with rigour.",
        hero: { src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1800&q=85", alt: "Passport" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=85", alt: "Passport", caption: "Documents", span: "md:col-span-5" },
            { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85", alt: "Travel", caption: "Travel", span: "md:col-span-7" },
        ],
        highlights: [
            { title: "File preparation", body: "Documents collated, cross-checked and filed." },
            { title: "Mock interviews", body: "Practised responses with structured feedback." },
            { title: "Application tracking", body: "Status and follow-ups tracked to decision." },
        ],
        process: [
            { step: "01", title: "Prepare", body: "Documents and forms." },
            { step: "02", title: "Mock", body: "Interview practice rounds." },
            { step: "03", title: "File", body: "Submit the visa application." },
            { step: "04", title: "Track", body: "Follow-up to decision." },
        ],
        faq: [
            { q: "What is the visa success rate?", a: "Historically 98% for our prepared applications." },
            { q: "How early should the file start?", a: "At least 8 weeks before the intended travel date." },
        ],
    },
    "pre-departure": {
        eyebrow: "Global education",
        headline: ["Arrive", "ready."],
        sub: "Accommodation, travel and arrival orientation — the last mile handled.",
        hero: { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85", alt: "Airplane" },
        mosaic: [
            { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85", alt: "Travel", caption: "Travel", span: "md:col-span-7" },
            { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85", alt: "Students", caption: "Arrival", span: "md:col-span-5" },
        ],
        highlights: [
            { title: "Accommodation", body: "Housing options mapped to budget and commute." },
            { title: "Travel planning", body: "Flights, insurance and timelines." },
            { title: "Arrival orientation", body: "Banking, SIM, transport and campus setup." },
        ],
        process: [
            { step: "01", title: "Housing", body: "Options and bookings." },
            { step: "02", title: "Travel", body: "Flights and insurance." },
            { step: "03", title: "Orientation", body: "Practical setup on arrival." },
            { step: "04", title: "Support", body: "Ongoing help in the first weeks." },
        ],
        faq: [
            { q: "Do you book accommodation?", a: "We guide options and support booking — final booking is yours." },
            { q: "Is support ongoing after arrival?", a: "Yes, for the first few weeks of settling in." },
        ],
    },
};