import { Scramble } from "./Scramble";

export function Hero() {
  const headline = ["Design.", "Build.", "Ship."];
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-24 md:px-20"
    >
      <div className="mb-10 flex items-center gap-4">
        <span className="h-px w-10 bg-secondary" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          // Satyank Shekhar — Software Engineer · Portfolio v.2026
        </p>
      </div>

      <h1
        className="font-display font-black leading-[0.95] tracking-[-0.04em]"
        style={{ fontSize: "clamp(48px, 8vw, 128px)" }}
      >
        {headline.map((line, i) => (
          <span key={i} className="char-rise block overflow-hidden">
            {line.split("").map((ch, j) => (
              <span
                key={j}
                style={{ animationDelay: `${i * 0.15 + j * 0.025}s` }}
                className="text-gradient-fade inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p className="mt-10 max-w-xl text-base leading-[1.6] text-text-dim md:text-lg">
        <span className="text-white">M.Tech CSE @ SVNIT Surat</span> · <span className="text-white">GATE AIR 2741</span>.
        I build <span className="text-white">AI-powered software systems</span>,{" "}
        <span className="text-white">autonomous agents</span>, and{" "}
        <span className="text-white">scalable backends</span> — from RAG pipelines and
        agentic workflows to computer vision and clean REST APIs.
      </p>

      <div className="mt-14 flex flex-wrap items-center gap-6">
        <a
          href="#project-matrix"
          data-magnetic="true"
          className="group inline-flex items-center gap-3 border border-stroke bg-surface-1 px-7 py-4 text-sm font-medium tracking-wide text-white transition-all hover:border-primary"
          style={{ transition: "border-color 0.4s var(--ease-inertia), transform 0.4s var(--ease-inertia)" }}
        >
          <Scramble text="VIEW PROJECTS" trigger="hover" className="text-xs tracking-[0.2em]" />
          <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
        </a>
        <a
          href="#archive"
          data-magnetic="true"
          className="magnetic-underline text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white"
        >
          Browse the archive
        </a>
      </div>

      <div className="pointer-events-none absolute left-6 bottom-8 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint md:block">
        ↓ scroll · sector_01
      </div>
      <div className="pointer-events-none absolute right-6 bottom-8 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint md:block">
        ai systems · backend · agents
      </div>
    </section>
  );
}
