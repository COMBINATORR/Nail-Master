/**
 * BorderGlow contour colors per site theme.
 * glowColor = H S L (no units) for edge bloom; colors = mesh hex (never pure white).
 */

const shared = {
  edgeSensitivity: 35,
  backgroundColor: 'var(--border-glow-bg, #120F17)',
  borderRadius: 16,
  glowRadius: 18,
  glowIntensity: 1,
  coneSpread: 22,
  fillOpacity: 0.18,
  className: 'w-full border-glow-card--site',
  sweepOnTap: true,
  sweepOnView: true,
};

export const borderGlowByTheme = {
  dark: {
    ...shared,
    glowColor: '40 55 58',
    colors: ['#cbb075', '#B89548', '#8c6c2e'],
  },
  light: {
    ...shared,
    glowColor: '38 42 52',
    colors: ['#e8d5b0', '#c4a060', '#d4c4a8'],
    fillOpacity: 0.14,
    glowIntensity: 0.95,
  },
  emerald: {
    ...shared,
    glowColor: '155 45 42',
    colors: ['#E2D3B0', '#3BCF98', '#1a6b55'],
  },
  nudefashion: {
    ...shared,
    glowColor: '24 38 52',
    colors: ['#F3E8DC', '#C4A484', '#B8956C'],
    fillOpacity: 0.14,
    glowIntensity: 0.95,
  },
  sage: {
    ...shared,
    glowColor: '100 22 42',
    colors: ['#E8EBE3', '#8A9A7C', '#A8B89A'],
    fillOpacity: 0.14,
    glowIntensity: 0.95,
  },
  cyber: {
    ...shared,
    glowColor: '188 70 58',
    colors: ['#7ecfdf', '#c47a9a', '#a8e8f5'],
    glowIntensity: 1.1,
    fillOpacity: 0.2,
  },
};

/** @deprecated use getBorderGlowProps(theme) */
export const borderGlowSiteProps = borderGlowByTheme.dark;

export function getBorderGlowProps(theme) {
  return borderGlowByTheme[theme] || borderGlowByTheme.dark;
}
