import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Index" },
  { id: "project-matrix", label: "Work" },
  { id: "archive", label: "Archive" },
  { id: "contact", label: "Contact" },
];

export function LeftHUD() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = SECTIONS.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { threshold: 0.35 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 select-none lg:block">
      <div
        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-text-faint"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span className="text-primary">0{active + 1}</span>
        <span>//</span>
        <span>0{SECTIONS.length}</span>
        <span>—</span>
        <span className="text-white/60">{SECTIONS[active].label}</span>
      </div>
    </div>
  );
}

export function RightHUD() {
  const [t, setT] = useState("--:--:-- UTC");
  useEffect(() => {
    const upd = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setT(`${hh}:${mm}:${ss} UTC`);
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 select-none lg:block">
      <div
        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-text-faint"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="ping-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        <span>online</span>
        <span>—</span>
        <span className="text-white/60">{t}</span>
      </div>
    </div>
  );
}
