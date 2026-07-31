/**
 * CareerSetu brand mark.
 * "Setu" = bridge — an arched bridge spanning two pillars (school → career),
 * with a guiding star above it. Drawn inline as SVG so it stays crisp at any size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="cs-arch" x1="6" y1="38" x2="42" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* bridge deck */}
      <path
        d="M5 31h38"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* arch */}
      <path
        d="M7 31c0-9.4 7.6-17 17-17s17 7.6 17 17"
        stroke="url(#cs-arch)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* suspension pillars */}
      <path
        d="M14.5 31v-6.2M24 31V19.4M33.5 31v-6.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* pier feet */}
      <path d="M9 35.5h6M33 35.5h6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" />
      {/* guiding star */}
      <path
        d="M24 5.5l1.6 3.6 3.6 1.6-3.6 1.6L24 16l-1.6-3.7-3.6-1.6 3.6-1.6L24 5.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const box = size === "lg" ? "size-11" : size === "sm" ? "size-8" : "size-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";

  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className ?? ""}`}>
      <span
        className={`gradient-brand shadow-glow grid ${box} shrink-0 place-items-center rounded-[0.9rem] text-primary-foreground`}
      >
        <LogoMark className="size-[70%]" />
      </span>
      <span className={`truncate font-display ${text} font-extrabold tracking-tight`}>
        Career<span className="text-gradient">Setu</span>
      </span>
    </span>
  );
}
