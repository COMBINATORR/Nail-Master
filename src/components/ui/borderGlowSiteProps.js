/** Tuned BorderGlow props for this site (opaque bg + bronze, no white wash). */
export const borderGlowSiteProps = {
  edgeSensitivity: 35,
  glowColor: '40 55 58',
  backgroundColor: 'var(--border-glow-bg, #120F17)',
  borderRadius: 16,
  glowRadius: 28,
  glowIntensity: 1,
  coneSpread: 22,
  colors: ['#cbb075', '#B89548', '#8c6c2e'],
  fillOpacity: 0.18,
  className: 'w-full border-glow-card--site',
  /** Tap → full bronze orbit (~1 turn). Desktop keeps hover + can also click. */
  sweepOnTap: true,
  /** On mobile, one auto-sweep when the card first scrolls into view. */
  sweepOnView: true,
};

