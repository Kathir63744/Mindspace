
import About from "./components/consultant/About";
import EraOfMakers from "./components/consultant/EraOfMakers";
import ExperienceSlider from "./components/consultant/ExperienceSlider";
import Expertise from "./components/consultant/Expertise";
import Faq from "./components/consultant/Faq";
import FeatureHighlight from "./components/consultant/FeatureHighlight";
import Footer from "./components/consultant/Footer";
import GoogleMap from "./components/consultant/GoogleMap";
import HeroBanner from "./components/consultant/HeroBanner";
import JourneyShowcase from "./components/consultant/JourneyShowcase";
import MindSpaceApproach from "./components/consultant/MindSpaceApproach";
import MindSpaceEcosystem from "./components/consultant/MindSpaceEcoSystem";
import Navbar from "./components/consultant/Navbar";
import Process from "./components/consultant/Process";
import Services from "./components/consultant/Services";
import Stories from "./components/consultant/Stories";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 01 — Brand introduction */}
        <HeroBanner />

        {/* 02 — Company identity */}
        <About />

        {/* 03 — Four business divisions */}
        <MindSpaceEcosystem />

        {/* 04 — How MindSpace creates value */}
        <MindSpaceApproach />

        {/* 05 — Our actual services */}
        <Services />

        {/* 06 — Capabilities and expertise */}
        <Expertise />

        {/* 07 — What makes MindSpace distinctive */}
        <FeatureHighlight />

        {/* 08 — How our services work */}
        <Process />

        {/* 09 — Experiences across our divisions */}
        <JourneyShowcase />

        {/* 10 — Projects, experience and outcomes */}
        <ExperienceSlider />

        {/* 11 — Client and student experiences */}
        <Stories />

        {/* 12 — MindSpace perspectives and insights */}
        <EraOfMakers />

        {/* 13 — Common questions */}
        <Faq />

        {/* 14 — Find and visit MindSpace */}
        <GoogleMap />
      </main>

      <Footer />
    </>
  );
}
