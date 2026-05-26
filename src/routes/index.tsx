import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ParticleField } from "@/components/portfolio/ParticleField";
import { Header } from "@/components/portfolio/Header";
import { LeftHUD, RightHUD } from "@/components/portfolio/SideHUD";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectMatrix } from "@/components/portfolio/ProjectMatrix";
import { Archive } from "@/components/portfolio/Archive";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AX · Engineered Interfaces" },
      { name: "description", content: "A personal digital laboratory — systems, shaders, and interfaces built with intent." },
      { property: "og:title", content: "AX · Engineered Interfaces" },
      { property: "og:description", content: "A personal digital laboratory — systems, shaders, and interfaces built with intent." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground grain">
      <div className="mesh-blur"><span /></div>
      <ParticleField />
      <CustomCursor />
      <Header />
      <LeftHUD />
      <RightHUD />
      <div className="relative z-10">
        <Hero />
        <ProjectMatrix />
        <Archive />
        <Contact />
      </div>
    </main>
  );
}
