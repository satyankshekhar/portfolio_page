import { useMemo, useState } from "react";

interface Row { year: string; title: string; cat: string; tech: string[]; }

const ROWS: Row[] = [
  { year: "2026", title: "Edge Distillation Pipeline", cat: "ML", tech: ["PyTorch", "CUDA"] },
  { year: "2025", title: "Parallel Lyrebird Optimization", cat: "HPC", tech: ["CUDA", "OpenMP"] },
  { year: "2025", title: "Agentic RAG + Calendly", cat: "LLM", tech: ["LangGraph", "Python"] },
  { year: "2025", title: "M.Tech CSE — SVNIT Surat", cat: "Academic", tech: ["Research"] },
  { year: "2024", title: "Weed Detection in Potato Fields", cat: "Vision", tech: ["YOLOv8", "Mask R-CNN"] },
  { year: "2024", title: "GATE 2024 — AIR 2741 (CS)", cat: "Achievement", tech: ["DSA", "OS", "DBMS"] },
  { year: "2024", title: "Image Denoising — Autoencoders", cat: "ML", tech: ["PyTorch"] },
  { year: "2025", title: "Meta Hacker Cup — Global 5287", cat: "Achievement", tech: ["C++"] },
  { year: "2023", title: "NPTEL Java — Top 5% Gold", cat: "Academic", tech: ["Java"] },
  { year: "2023", title: "Wireless Networking Studies", cat: "Systems", tech: ["ns-3", "OMNeT++"] },
];

const CATS = ["All", "HPC", "ML", "Vision", "LLM", "Systems", "Academic", "Achievement"];

export function Archive() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const rows = useMemo(
    () =>
      ROWS.filter((r) => (cat === "All" || r.cat === cat) && (r.title.toLowerCase().includes(q.toLowerCase()) || r.tech.join(" ").toLowerCase().includes(q.toLowerCase()))),
    [q, cat],
  );

  return (
    <section id="archive" className="relative px-6 py-32 md:px-20">
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// 03 — Archive</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Index <span className="text-text-faint">/</span> Everything
        </h2>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search.archive_"
          className="w-full bg-transparent border-0 border-b border-stroke px-0 py-3 font-mono text-sm text-white outline-none placeholder:text-text-faint focus:border-primary md:w-96"
        />
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              data-magnetic="true"
              onClick={() => setCat(c)}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                cat === c ? "border-primary bg-primary/10 text-primary" : "border-stroke text-text-dim hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-stroke">
        <div className="grid grid-cols-[80px_1fr_140px_60px] gap-4 border-b border-stroke py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-text-faint md:grid-cols-[100px_1fr_200px_240px_60px]">
          <span>Year</span>
          <span>Title</span>
          <span className="hidden md:block">Category</span>
          <span>Stack</span>
          <span className="text-right">Link</span>
        </div>
        {rows.map((r, i) => (
          <a
            key={i}
            href="https://github.com/satyankshekhar"
            target="_blank"
            rel="noreferrer"
            data-magnetic="true"
            className="group grid grid-cols-[80px_1fr_140px_60px] items-center gap-4 border-b border-stroke/50 py-5 transition-all hover:bg-surface-1 hover:pl-3 md:grid-cols-[100px_1fr_200px_240px_60px]"
            style={{ transition: "padding 0.4s var(--ease-inertia), background-color 0.4s var(--ease-inertia)" }}
          >
            <span className="font-mono text-xs text-text-faint">{r.year}</span>
            <span className="text-base text-white transition-colors group-hover:text-primary">{r.title}</span>
            <span className="hidden font-mono text-xs uppercase tracking-wider text-text-dim md:block">{r.cat}</span>
            <span className="flex flex-wrap gap-1.5">
              {r.tech.map((t) => (
                <span key={t} className="border border-stroke px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-text-dim">
                  {t}
                </span>
              ))}
            </span>
            <span className="text-right font-mono text-sm text-primary opacity-50 transition-opacity group-hover:opacity-100">↗</span>
          </a>
        ))}
        {rows.length === 0 && (
          <p className="py-12 text-center font-mono text-xs uppercase tracking-[0.25em] text-text-faint">
            no_results_found //
          </p>
        )}
      </div>
    </section>
  );
}
