import type { Metadata } from "next";
import Hero from "@/components/landing/hero";
import ToolsStrip from "@/components/landing/tools-strip";
import FeatureSection from "@/components/landing/feature-section";
import HowItWorks from "@/components/landing/how-it-works";
import CtaSection from "@/components/landing/cta-section";
import {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  BASE_URL,
  SITE_NAME,
} from "@/lib/Metadata";

// Explicit per-page metadata — overrides root layout defaults for the homepage.
// Canonical URL is the root; no template wrapping needed here.
export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    images: [
      {
        url: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "PromptLedger — Audit & Optimize Your AI Spend",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

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