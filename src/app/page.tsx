// app/hub/page.tsx — Server Component
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Hub • A.R.C Foundation",
  description:
    "Choose between the current event site and the primary A.R.C website.",
};

const EVENT_LINK = "https://7days.arcfoundation.net";                 // ← change if your event lives elsewhere
const HOME_LINK = "https://main.arcfoundation.net"; // ← change to your primary A.R.C site

export default function EventHubPage() {
  return (
    <main className="min-h-[100svh] relative overflow-hidden bg-[#0b0b0e]">
      {/* Starfield + vignette */}
      <div className="eh-stars" aria-hidden />
      <div className="eh-vignette" aria-hidden />

      {/* Split grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[100svh]">
        {/* Left: EVENT */}
        <Panel
          href={EVENT_LINK}
          ariaLabel="Go to the current event"
          side="left"
          title="EVENT"
          subtitle="CURRENT AVAILABLE EVENT"
          // background tint = deep crimson
          gradient="linear-gradient(180deg, rgba(201,42,42,0.55) 0%, rgba(201,42,42,0.15) 100%)"
          // Optional blurred emblem in the back
          emblemSrc="/event-emblem.png"   // place optional image in /public, or set to undefined
        />

        {/* Right: HOME */}
        <Panel
          href={HOME_LINK}
          ariaLabel="Go to the primary A.R.C website"
          side="right"
          title="HOME"
          subtitle="PRIMARY A.R.C WEBSITE"
          // background tint = midnight blue
          gradient="linear-gradient(180deg, rgba(15,35,65,0.55) 0%, rgba(15,35,65,0.15) 100%)"
          emblemSrc="/arc-logo-blur.png"  // optional; blurred big A mark
          external
        />
      </section>

      {/* Center divider for desktop */}
      <div className="hidden md:block eh-divider" aria-hidden />

      {/* Footer microcopy */}
      <footer className="absolute bottom-0 left-0 right-0 text-[12px] leading-5 text-white/70 px-3 py-2">
        © {new Date().getFullYear()} A.R.C Foundation. All rights reserved.
      </footer>
    </main>
  );
}

/* ---------- Panel (Server-safe, no onClick) ---------- */
type PanelProps = {
  href: string;
  ariaLabel: string;
  side: "left" | "right";
  title: string;
  subtitle: string;
  gradient: string;
  emblemSrc?: string;
  external?: boolean;
};

function Panel({
  href,
  ariaLabel,
  side,
  title,
  subtitle,
  gradient,
  emblemSrc,
  external,
}: PanelProps) {
  const content = (
    <div
      className={`relative group isolate flex items-center justify-center min-h-[50svh] md:min-h-[100svh] overflow-hidden`}
      style={{ backgroundImage: gradient }}
    >
      {/* Optional blurred emblem */}
      {emblemSrc ? (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 flex items-center justify-center"
          style={{
            filter: "blur(32px) opacity(0.7)",
            transform: side === "left" ? "scale(1.1)" : "scale(1.2)",
          }}
        >
          {/* Use CSS background for performance; avoids <Image> client overhead here */}
          <div
            className="h-[55vh] w-[55vh] max-h-[70vw] max-w-[70vw] bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${emblemSrc})` }}
          />
        </div>
      ) : null}

      {/* Panel glow on hover */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            side === "left"
              ? "radial-gradient(600px 300px at 30% 65%, rgba(255,255,255,0.10), transparent)"
              : "radial-gradient(600px 300px at 70% 65%, rgba(255,255,255,0.10), transparent)",
        }}
      />

      {/* Content */}
      <div className="text-center select-none">
        <h2
          className="text-white font-extrabold tracking-[0.18em]"
          style={{
            fontSize: "clamp(2.25rem, 4.2vw, 5.5rem)",
            letterSpacing: "0.18em",
            transform: "skewY(-4deg)",
            textShadow: "0 10px 18px rgba(0,0,0,0.35)",
          }}
        >
          {title}
        </h2>
        <p
          className="text-white/85 mt-1"
          style={{
            fontSize: "clamp(0.9rem, 1.4vw, 1.7rem)",
            textShadow: "0 8px 14px rgba(0,0,0,0.35)",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Interactive affordance: subtle scale on hover */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );

  // External links open in new tab with rel attrs; internal use Next <Link>
  return external ? (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noreferrer noopener"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
    >
      {content}
    </a>
  ) : (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
    >
      {content}
    </Link>
  );
}
