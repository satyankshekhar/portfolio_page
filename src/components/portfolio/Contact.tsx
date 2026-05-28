import { useState } from "react";

function Field({ label, value, onChange, type = "text", multi = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; multi?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  return (
    <div className="relative pt-6">
      <label
        className={`pointer-events-none absolute left-0 font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
          active ? "top-0 text-[10px] text-primary" : "top-8 text-xs text-text-faint"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
      >
        {label}
      </label>
      {multi ? (
        <textarea
          value={value}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="peer w-full resize-none border-0 border-b-2 border-stroke bg-transparent py-4 text-white outline-none transition-colors focus:border-primary"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="peer w-full border-0 border-b-2 border-stroke bg-transparent py-4 text-white outline-none transition-colors focus:border-primary"
        />
      )}
    </div>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const stamp = new Date().toISOString();
  const status = name || email || msg ? "ACTIVE_TYPING" : "IDLE";

  return (
    <section id="contact" className="relative px-6 py-32 md:px-20">
      <div className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// 04 — Open Channel</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Start a <span className="text-text-faint">/</span> conversation
        </h2>
        <p className="mt-6 max-w-xl text-sm text-text-dim">
          For collaborations, school events, or literary discussions — drop a note. Every story
          starts with a single idea.
        </p>
      </div>

      <div className="mb-14 grid gap-3 font-mono text-xs uppercase tracking-[0.25em] text-text-dim md:grid-cols-3">
        <a href="mailto:your-email@example.com" data-magnetic="true" className="border border-stroke px-4 py-3 hover:border-primary hover:text-white">→ Email</a>
        <div data-magnetic="true" className="border border-stroke px-4 py-3">→ Author · Atharav Anand Mishra</div>
        <div data-magnetic="true" className="border border-stroke px-4 py-3">→ Class 8 Student</div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <form
          onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:your-email@example.com?subject=From ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`; }}
          className="space-y-2"
        >
          <Field label="reader_name" value={name} onChange={setName} />
          <Field label="reader_email" value={email} onChange={setEmail} type="email" />
          <Field label="message_payload" value={msg} onChange={setMsg} multi />

          <button
            type="submit"
            data-magnetic="true"
            className="group mt-10 inline-flex w-full items-center justify-between border border-stroke bg-surface-1 px-7 py-5 text-left transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            style={{ transition: "all 0.4s var(--ease-inertia)" }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em]">
              SEND_MESSAGE
            </span>
            <span className="text-primary transition-transform group-hover:translate-x-1 group-hover:text-primary-foreground">→</span>
          </button>
        </form>

        <div
          className="overflow-hidden rounded-[6px] border border-stroke bg-background"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
        >
          <div className="flex items-center gap-2 border-b border-stroke bg-surface-1 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-text-dim">
              atharav@desk:~/letters
            </span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-[12px] leading-[1.7] text-text-dim">
{`[sys] Desk lamp on. Page open.
[sys] Awaiting your note...

`}
<span className="text-primary">{`{`}</span>
{`
  `}<span className="text-secondary">"readerName"</span>{`: `}<span className="text-white">"{name || "_"}"</span>{`,
  `}<span className="text-secondary">"readerEmail"</span>{`: `}<span className="text-white">"{email || "_"}"</span>{`,
  `}<span className="text-secondary">"messagePayload"</span>{`: `}<span className="text-white">"{msg.slice(0, 60) || "_"}{msg.length > 60 ? "..." : ""}"</span>{`,
  `}<span className="text-secondary">"inputStatus"</span>{`: `}<span className="text-primary">"{status}"</span>{`,
  `}<span className="text-secondary">"timestamp"</span>{`: `}<span className="text-white">"{stamp}"</span>{`
`}<span className="text-primary">{`}`}</span>
          </pre>
        </div>
      </div>

      <blockquote className="mt-24 border-l-2 border-primary pl-6 font-display text-xl italic text-white/80 md:text-2xl">
        “Every great author once started with a single idea.”
      </blockquote>

      <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-stroke pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint md:flex-row md:items-center">
        <span>© 2026 atharav anand mishra · young author</span>
        <span>signal: <span className="text-primary">writing</span> · class viii</span>
      </footer>
    </section>
  );
}
