import Hero from "@/components/landing/hero";
import ToolsStrip from "@/components/landing/tools-strip";
import FeatureSection from "@/components/landing/feature-section";
import HowItWorks from "@/components/landing/how-it-works";
import CtaSection from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolsStrip />
      <FeatureSection />
      <HowItWorks />
      <CtaSection />
    </>
  );
}