/** Runtime performance helpers — keep phone cool. */

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Touch-first / small screens where continuous GPU work hurts. */
export function isMobileLike() {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  return coarse || narrow || noHover;
}

/** Desktop-only smooth scroll (Lenis rAF is expensive on phones). */
export function canUseSmoothScroll() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (isMobileLike()) return false;
  return window.matchMedia('(pointer: fine)').matches;
}

/** Continuous WebGL / ray effects — desktop night themes only. */
export function canUseHeavyFx() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (isMobileLike()) return false;
  // Save-Data / low-end hints
  const conn = navigator.connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return false;
  return true;
}
