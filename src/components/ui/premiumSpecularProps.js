/**
 * Shared SpecularButton props tuned for the nail-master bronze brand.
 * Glass fill + warm gold rim highlight.
 */
export const premiumSpecularProps = {
  size: 'md',
  radius: 12,
  tint: '#B89548',
  tintOpacity: 0.22,
  blur: 8,
  textColor: '#f5f0e6',
  lineColor: '#E8D5A8',
  baseColor: '#6B5428',
  intensity: 1.15,
  shineSize: 12,
  shineFade: 36,
  thickness: 1.1,
  speed: 0.3,
  followMouse: true,
  proximity: 280,
  autoAnimate: true,
};

export const heroSpecularProps = {
  ...premiumSpecularProps,
  size: 'lg',
  radius: 999,
  tintOpacity: 0.28,
  blur: 10,
  intensity: 1.25,
  autoAnimate: true,
};
