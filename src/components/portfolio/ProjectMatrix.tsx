interface P {
  id: string;
  span: 8 | 4;
  title: string;
  category: string;
  year: string;
  hue: string;
  stack: string[];
  href: string;
  blurb?: string;
}

const PROJECTS: P[] = [
  {
    id: "01",
    span: 8,
    title: "The Final Thesis",
    category: "Debut Novel",
    year: "2026",
    hue: "from-[#00FFCC]/20 to-[#7000FF]/10",
    stack: ["Mystery", "Fiction", "Debut"],
    href: "#contact",
    blurb: "A first book · crafted with curiosity and care.",
  },
  {
    id: "02",
    span: 4,
    title: "Short Stories",
    category: "Creative Writing",
    year: "2025",
    hue: "from-[#7000FF]/25 to-[#00FFCC]/5",
    stack: ["Storytelling"],
    href: "#archive",
  },
  {
    id: "03",
    span: 4,
    title: "Reading Journal",
    category: "Fiction & Mystery",
    year: "Ongoing",
    hue: "from-[#00FFCC]/15 to-transparent",
    stack: ["Reading", "Notes"],
    href: "#archive",
  },
  {
    id: "04",
    span: 8,
    title: "Voice & Vision",
    category: "Public Speaking",
    year: "2025",
    hue: "from-[#7000FF]/15 to-[#00FFCC]/10",
    stack: ["Speaking", "Literature", "School"],
    href: "#archive",
    blurb: "Active in school literary activities — sharing ideas out loud.",
  },
];

export function ProjectMatrix() {
  return (
    <section id="project-matrix" className="relative px-6 py-32 md:px-20">
      <div className="mb-16 flex items-end justify-between gap-6 border-b border-stroke pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// 02 — Selected Work</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            The <span className="text-text-faint">/</span> Bookshelf
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-text-dim md:block">
          A debut novel and the smaller works around it — stories, notes, and the practice of writing every day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {PROJECTS.map((p) => (
          <a
            key={p.id}
            href={p.href}
            data-magnetic="true"
            className={`group relative overflow-hidden border border-stroke bg-surface-1 transition-all ${p.span === 8 ? "md:col-span-8" : "md:col-span-4"}`}
            style={{ transition: "border-color 0.6s var(--ease-inertia)" }}
          >
            <div className={`relative h-[420px] w-full overflow-hidden bg-gradient-to-br ${p.hue}`}>
              <div
                className="absolute inset-0 opacity-60 transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(0,255,204,0.15), transparent 60%), radial-gradient(circle at 70% 70%, rgba(112,0,255,0.18), transparent 60%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: "var(--gradient-fade)" }} />

              <div className="absolute left-6 top-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
                <span className="text-primary">#{p.id}</span>
                <span>{p.year}</span>
              </div>
              <div className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
                {p.category}
              </div>

              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                    {p.title}
                  </h3>
                  {p.blurb && (
                    <p className="mt-3 max-w-md font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                      {p.blurb}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-stroke px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="hidden h-12 w-12 items-center justify-center border border-stroke text-primary transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:flex">
                  ↗
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
