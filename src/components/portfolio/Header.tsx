const LINKS = [
  { label: "Index", href: "#hero" },
  { label: "Work", href: "#project-matrix" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 md:px-20"
      style={{
        background: "rgba(13,13,17,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <a href="#hero" data-magnetic="true" className="font-display text-base font-bold tracking-tight text-white">
        ⌁ SATYANK<span className="text-primary">.</span>
      </a>
      <nav className="ml-auto flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-white/70">
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            data-magnetic="true"
            className="magnetic-underline transition-colors hover:text-white"
          >
            <span className="text-text-faint mr-2 font-mono">0{i + 1}</span>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
