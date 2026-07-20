/**
 * Light Rays — only for dark themes (night / emerald / cyber).
 * Light themes use CSS base only (no WebGL rays).
 */
export const lightRaysByTheme = {
  dark: {
    raysOrigin: 'top-center',
    raysColor: '#F5E6C8',
    raysSpeed: 0.85,
    lightSpread: 1.15,
    rayLength: 4.2,
    pulsating: false,
    fadeDistance: 2.4,
    saturation: 1.05,
    followMouse: true,
    mouseInfluence: 0.08,
    noiseAmount: 0.04,
    distortion: 0.05,
  },
  emerald: {
    raysOrigin: 'top-center',
    raysColor: '#E2D3B0',
    raysSpeed: 0.8,
    lightSpread: 1.15,
    rayLength: 4.1,
    pulsating: false,
    fadeDistance: 2.3,
    saturation: 1.0,
    followMouse: true,
    mouseInfluence: 0.07,
    noiseAmount: 0.04,
    distortion: 0.04,
  },
  cyber: {
    raysOrigin: 'top-center',
    raysColor: '#A8E8F5',
    raysSpeed: 1.0,
    lightSpread: 1.1,
    rayLength: 4.5,
    pulsating: true,
    fadeDistance: 2.5,
    saturation: 1.15,
    followMouse: true,
    mouseInfluence: 0.12,
    noiseAmount: 0.06,
    distortion: 0.08,
  },
};

export function getLightRaysProps(theme) {
  return lightRaysByTheme[theme] || lightRaysByTheme.dark;
}
