import { useEffect, useRef, useState } from "react";

const CHARS = "!@#$%*?X01";

interface Props { text: string; trigger?: "hover" | "mount"; className?: string; }

export function Scramble({ text, trigger = "mount", className }: Props) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);
  const frame = useRef(0);

  const run = () => {
    cancelAnimationFrame(raf.current);
    frame.current = 0;
    const FRAMES = 26;
    const step = () => {
      const progress = frame.current / FRAMES;
      const revealCount = Math.floor(text.length * progress);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") { s += " "; continue; }
        if (i < revealCount) s += ch;
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      frame.current++;
      if (frame.current <= FRAMES) raf.current = requestAnimationFrame(step);
      else setOut(text);
    };
    step();
  };

  useEffect(() => {
    if (trigger === "mount") run();
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {out}
    </span>
  );
}
