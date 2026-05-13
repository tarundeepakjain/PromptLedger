import type { Metadata } from "next";

// ─── Site-wide constants ──────────────────────────────────────────────────────
export const SITE_NAME = "PromptLedger";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const DEFAULT_TITLE = "PromptLedger — Audit & Optimize Your AI Spend";
export const DEFAULT_DESCRIPTION =
  "Instantly analyze your AI tool stack, uncover wasted spend, compare alternatives, and save thousands annually on Cursor, Claude, ChatGPT, Copilot, Gemini, and more.";
export const OG_IMAGE_URL = `${BASE_URL}/og-image.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// ─── Base metadata (used in root layout) ─────────────────────────────────────
export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  // Canonical URL is set per-page; metadataBase handles resolution
  alternates: {
    canonical: "/",
  },

  // Open Graph
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

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL],
    // Add @handle if available: creator: "@promptledger",
  },

  // Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// ─── Helper: build metadata for a public audit share page ────────────────────
export function buildAuditMetadata(
  auditId: string,
  annualSavings: number | null,
  toolNames: string[] | null
): Metadata {
  const auditUrl = `${BASE_URL}/audit/${auditId}`;

  // Graceful fallback when audit data is unavailable
  if (annualSavings === null) {
    return {
      title: "Your AI Stack Audit | PromptLedger",
      description: DEFAULT_DESCRIPTION,
      alternates: { canonical: auditUrl },
      openGraph: {
        type: "website",
        siteName: SITE_NAME,
        title: "Your AI Stack Audit | PromptLedger",
        description: DEFAULT_DESCRIPTION,
        url: auditUrl,
        images: [
          {
            url: OG_IMAGE_URL,
            width: OG_IMAGE_WIDTH,
            height: OG_IMAGE_HEIGHT,
            alt: "PromptLedger AI Spend Audit",
            type: "image/png",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Your AI Stack Audit | PromptLedger",
        description: DEFAULT_DESCRIPTION,
        images: [OG_IMAGE_URL],
      },
    };
  }

  const formattedSavings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(annualSavings);

  // Build a natural tool list for the description
  const toolPhrase =
    toolNames && toolNames.length > 0
      ? toolNames.slice(0, 3).join(", ")
      : "AI subscriptions";

  const dynamicTitle = `Save ${formattedSavings}/year on AI tools | PromptLedger`;
  const dynamicDescription = `This AI stack audit found unnecessary spend across ${toolPhrase}. See the full breakdown and switch to cheaper alternatives without losing productivity.`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: { canonical: auditUrl },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: dynamicTitle,
      description: dynamicDescription,
      url: auditUrl,
      images: [
        {
          url: OG_IMAGE_URL,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: `PromptLedger audit — save ${formattedSavings}/year`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: [OG_IMAGE_URL],
    },
  };
}