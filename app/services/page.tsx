///services/page.tsx 
import type { Metadata } from "next";
import Footer from "@/app/components/consultant/Footer";
import Navbar from "@/app/components/consultant/Navbar";
import ServicesHero from "@/app/components/consultant/services/ServicesHero";
import {
    Catalogue,
    ChaosToConfidence,
    EndToEnd,
    Faq,
    FinalCta,
    Showcase,
    WhyUs,
} from "@/app/components/consultant/services/ServicesSections";

export const metadata: Metadata = {
    title: "Services | MindSpace",
    description:
        "Technology solutions, study abroad guidance, professional training and career support, together on one platform.",
};

export default function ServicesPage() {
    return (
        <main className="bg-[#050B1E] text-white selection:bg-[#2F7BFF] selection:text-white">
            <Navbar />
            <ServicesHero />
            <ChaosToConfidence />
            <EndToEnd />
            <Showcase />
            <Catalogue />
            <WhyUs />
            <Faq />
            <FinalCta />
            <Footer />
        </main>
    );
}