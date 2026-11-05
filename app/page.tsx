import About from "./components/consultant/About";
import Enquiry from "./components/consultant/Enquiry";
import ExperienceSlider from "./components/consultant/ExperienceSlider";
import Faq from "./components/consultant/Faq";
import FeatureHighlight from "./components/consultant/FeatureHighlight";
import Footer from "./components/consultant/Footer";
import GoogleMap from "./components/consultant/GoogleMap";
import HeroBanner from "./components/consultant/HeroBanner";
import Navbar from "./components/consultant/Navbar";
import Process from "./components/consultant/Process";
import Services from "./components/consultant/Services";
import Stories from "./components/consultant/Stories";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <About />
        <FeatureHighlight />
        <Services />
        <Process />
        <GoogleMap/>
        <ExperienceSlider />
        <Stories />
        <Faq />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}