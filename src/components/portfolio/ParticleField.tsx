import { useEffect, useRef } from "react";

interface P { x: number; y: number; vx: number; vy: number; bx: number; by: number; r: number; c: string; }

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const COLORS = ["0,255,204", "112,0,255"];
    const COUNT = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const particles: P[] = Array.from({ length: COUNT }, () => {
      const bx = Math.random() * w;
      const by = Math.random() * h;
      return {
        x: bx, y: by, bx, by,
        vx: 0, vy: 0,
        r: (0.5 + Math.random() * 1) * devicePixelRatio,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * devicePixelRatio;
      mouse.y = e.clientY * devicePixelRatio;
    };
    const onResize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const THRESH = 150 * devicePixelRatio;
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < THRESH && d > 0) {
          const f = (1 - d / THRESH) * 0.6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        // spring back
        p.vx += (p.bx - p.x) * 0.005;
        p.vy += (p.by - p.y) * 0.005;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, 0.45)`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-60"
      aria-hidden
    />
  );
}
