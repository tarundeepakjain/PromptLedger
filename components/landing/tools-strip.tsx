import Image from "next/image";

const tools = [
  { name: "OpenAI", logo: "/tools/openai.svg" },
  { name: "Anthropic", logo: "/tools/claude.svg" },
  { name: "Cursor", logo: "/tools/cursor.svg" },
  { name: "Gemini", logo: "/tools/gemini.svg" },
  { name: "GitHub Copilot", logo: "/tools/githubcopilot.svg" },
  { name: "Windsurf", logo: "/tools/windsurf.svg" },
];

export default function ToolsStrip() {
  return (
    <section className="py-16 border-y border-white/[0.06] bg-[#111214]/40">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-10">
          Supports all major AI tools
        </p>
        <div className="flex items-center justify-center flex-wrap gap-10">
          {tools.map(({ name, logo }) => (
            <div key={name} className="flex items-center gap-2.5 text-white/40 hover:text-white/70 transition-colors group">
              <div className="w-6 h-6 relative opacity-50 group-hover:opacity-80 transition-opacity">
                <Image src={logo} alt={name} fill className="object-contain" />
              </div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}