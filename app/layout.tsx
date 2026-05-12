import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PromptLedger — AI Spend Audit Tool",
  description: "Identify AI overspending and get defensible recommendations for your startup or engineering team.",
  keywords: ["AI audit", "SaaS spend", "LLM costs", "cloud cost optimization"],
  authors: [{ name: "PromptLedger Team" }],
  openGraph: {
    title: "PromptLedger — AI Spend Audit Tool",
    description: "Defensible AI spend audits for high-growth engineering teams.",
    url: "https://promptledger.io",
    siteName: "PromptLedger",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptLedger — AI Spend Audit Tool",
    description: "Stop overpaying for AI. Audit your API and subscription spend in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        {/* Inline fallback for the font-variable to prevent build errors while maintaining the layout structure */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-inter: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          body {
            font-family: var(--font-inter);
          }
        `}} />
      </head>
      <body
        className="font-sans h-full bg-slate-950 text-slate-200 antialiased selection:bg-indigo-500/30 selection:text-indigo-200"
      >
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          {/* Background depth layers */}
          <div 
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-3xl"
            aria-hidden="true" 
          />
          <div 
            className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] bg-slate-900/50 blur-[120px]" 
            aria-hidden="true" 
          />
          
          <main className="relative flex flex-1 flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}