import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let snapTarget: HTMLElement | null = null;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
      }

      const el = (e.target as HTMLElement)?.closest?.<HTMLElement>("[data-magnetic='true']");
      snapTarget = el ?? null;
    };

    const loop = () => {
      const K = 0.18;
      const ring = ringRef.current;
      if (ring) {
        if (snapTarget) {
          const r = snapTarget.getBoundingClientRect();
          const tx = r.left - 6;
          const ty = r.top - 6;
          current.x += (tx - current.x) * K;
          current.y += (ty - current.y) * K;
          ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
          ring.style.width = `${r.width + 12}px`;
          ring.style.height = `${r.height + 12}px`;
          ring.style.borderRadius = "10px";
          ring.style.opacity = "0.9";
        } else {
          const tx = target.x - 20;
          const ty = target.y - 20;
          current.x += (tx - current.x) * K;
          current.y += (ty - current.y) * K;
          ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
          ring.style.width = "40px";
          ring.style.height = "40px";
          ring.style.borderRadius = "50%";
          ring.style.opacity = "0.6";
        }
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1 w-1 rounded-full bg-primary md:block"
        style={{ boxShadow: "0 0 8px var(--primary)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden border border-primary/60 md:block"
        style={{ width: 40, height: 40, transition: "width 0.25s var(--ease-inertia), height 0.25s var(--ease-inertia), border-radius 0.25s var(--ease-inertia), opacity 0.25s var(--ease-inertia)" }}
      />
    </>
  );
}
