/**
 * Cinematic easing utilities — shared across Framer Motion & GSAP
 */

// ── Framer Motion transition presets ──────────────────────────────────────────
export const ease = {
  /** Apple/Linear-style snappy spring */
  spring: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 } as const,
  /** Cinematic ease-out for entries */
  out: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  /** Premium ease-in-out */
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
  /** Overshoot entrance */
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Silky reveal */
  reveal: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

// ── GSAP easing strings ────────────────────────────────────────────────────────
export const gsapEase = {
  out: "power3.out",
  inOut: "power3.inOut",
  bounce: "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
} as const;

// ── Duration presets (seconds) ─────────────────────────────────────────────────
export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

// ── Stagger helpers ───────────────────────────────────────────────────────────
export const stagger = {
  tight: 0.05,
  normal: 0.1,
  loose: 0.18,
} as const;
