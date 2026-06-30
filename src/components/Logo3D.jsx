import { useRef, useEffect } from 'react';

const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export const Logo3D = () => {
  const specLightRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!canHover) return; // Skip mouse tracking on touch devices
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let cachedRect = null;

    const handleMouseEnter = () => {
      cachedRect = wrapper.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!specLightRef.current) return;
      if (!cachedRect) {
        cachedRect = wrapper.getBoundingClientRect();
      }
      specLightRef.current.setAttribute('x', (((e.clientX - cachedRect.left) / cachedRect.width) * 32).toFixed(1));
      specLightRef.current.setAttribute('y', (((e.clientY - cachedRect.top) / cachedRect.height) * 32).toFixed(1));
    };

    const handleResize = () => {
      cachedRect = null;
    };

    const handleMouseLeave = () => {
      if (specLightRef.current) {
        specLightRef.current.setAttribute('x', '22');
        specLightRef.current.setAttribute('y', '6');
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const txtStyle = { userSelect: 'none' };

  return (
    <svg
      ref={wrapperRef}
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      className="logo-svg"
      style={{ overflow: 'visible', cursor: 'pointer' }}
    >
      {/* SVG filters only rendered on desktop — zero GPU cost on mobile */}
      {canHover && (
        <defs>
          <filter id="logo-3d-shade" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="bevel" />
            <feDiffuseLighting in="bevel" surfaceScale="5" diffuseConstant="1.0" lightingColor="#ffffff" result="diffuse">
              <feDistantLight azimuth="225" elevation="45" />
            </feDiffuseLighting>
            <feComposite in="diffuse" in2="SourceGraphic" operator="in" result="lit" />
            <feBlend in="SourceGraphic" in2="lit" mode="multiply" />
          </filter>

          <filter id="logo-specular" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blurA" />
            <feSpecularLighting in="blurA" surfaceScale="5" specularConstant="1.0" specularExponent="22" lightingColor="#ffffff" result="spec">
              <fePointLight ref={specLightRef} x="22" y="6" z="12" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      )}

      {/* Extrusion depth — static, lightweight on all devices */}
      <text x="16.9" y="17.9" className="logo-base-text logo-extrude" style={{ ...txtStyle, opacity: 0.2 }}>S</text>
      <text x="16.6" y="17.6" className="logo-base-text logo-extrude" style={{ ...txtStyle, opacity: 0.25 }}>S</text>
      <text x="16.3" y="17.3" className="logo-base-text logo-extrude" style={{ ...txtStyle, opacity: 0.3 }}>S</text>

      {/* Main face — with diffuse 3D filter on desktop, plain on mobile */}
      <text
        x="16"
        y="17"
        filter={canHover ? 'url(#logo-3d-shade)' : undefined}
        className="logo-base-text transition-colors duration-300 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-[.active]:text-[var(--text-primary)]"
        style={txtStyle}
      >
        S
      </text>

      {/* Specular gloss — only on desktop */}
      {canHover && (
        <text
          x="16"
          y="17"
          filter="url(#logo-specular)"
          className="logo-spec-layer"
          style={{ ...txtStyle, fill: 'white', pointerEvents: 'none' }}
        >
          S
        </text>
      )}
    </svg>
  );
};
