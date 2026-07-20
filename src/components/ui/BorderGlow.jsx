import { useRef, useCallback, useEffect } from 'react';
import './BorderGlow.css';

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  let raf = 0;
  let timeout = 0;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) raf = requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  timeout = setTimeout(() => {
    raf = requestAnimationFrame(tick);
  }, delay);
  return () => {
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
  };
}

/** Full orbit sweep (~1 turn) — same motion as React Bits `animated` demo. */
function playSweep(card, { onDone } = {}) {
  if (!card) return () => {};

  const angleStart = 110;
  const angleEnd = 465; // ~355° travel ≈ full orbit
  const cleanups = [];

  card.classList.add('sweep-active');
  card.style.setProperty('--cursor-angle', `${angleStart}deg`);

  cleanups.push(
    animateValue({
      duration: 450,
      onUpdate: (v) => card.style.setProperty('--edge-proximity', String(v)),
    })
  );
  cleanups.push(
    animateValue({
      ease: easeInCubic,
      duration: 1400,
      end: 50,
      onUpdate: (v) => {
        card.style.setProperty(
          '--cursor-angle',
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`
        );
      },
    })
  );
  cleanups.push(
    animateValue({
      ease: easeOutCubic,
      delay: 1400,
      duration: 2000,
      start: 50,
      end: 100,
      onUpdate: (v) => {
        card.style.setProperty(
          '--cursor-angle',
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`
        );
      },
    })
  );
  cleanups.push(
    animateValue({
      ease: easeInCubic,
      delay: 2300,
      duration: 1200,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty('--edge-proximity', String(v)),
      onEnd: () => {
        card.classList.remove('sweep-active');
        onDone?.();
      },
    })
  );

  return () => {
    cleanups.forEach((fn) => fn?.());
    card.classList.remove('sweep-active');
    card.style.setProperty('--edge-proximity', '0');
  };
}

function prefersCoarsePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  /** Tap/click plays a full glow orbit (great for mobile). */
  sweepOnTap = false,
  /** When card enters viewport, play one sweep (once). Best on mobile. */
  sweepOnView = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef(null);
  const sweepingRef = useRef(false);
  const cancelSweepRef = useRef(null);
  const viewedRef = useRef(false);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    // During sweep, don't fight the animation with finger/mouse noise
    if (sweepingRef.current) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(card, x, y);
    const angle = getCursorAngle(card, x, y);

    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  const triggerSweep = useCallback(() => {
    const card = cardRef.current;
    if (!card || sweepingRef.current) return;

    cancelSweepRef.current?.();
    sweepingRef.current = true;
    cancelSweepRef.current = playSweep(card, {
      onDone: () => {
        sweepingRef.current = false;
        cancelSweepRef.current = null;
      },
    });
  }, []);

  // Demo-style mount animation
  useEffect(() => {
    if (!animated) return undefined;
    triggerSweep();
    return () => {
      cancelSweepRef.current?.();
      sweepingRef.current = false;
    };
  }, [animated, triggerSweep]);

  // One sweep when card scrolls into view (coarse pointer / mobile)
  useEffect(() => {
    if (!sweepOnView || !cardRef.current) return undefined;
    if (!prefersCoarsePointer()) return undefined;

    const el = cardRef.current;
    let delayTimer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || viewedRef.current) return;
        viewedRef.current = true;
        delayTimer = window.setTimeout(() => triggerSweep(), 180);
      },
      { threshold: 0.45, rootMargin: '0px 0px -8% 0px' }
    );

    io.observe(el);
    return () => {
      clearTimeout(delayTimer);
      io.disconnect();
    };
  }, [sweepOnView, triggerSweep]);

  useEffect(() => () => {
    cancelSweepRef.current?.();
  }, []);

  const handleActivate = useCallback(() => {
    if (!sweepOnTap) return;
    triggerSweep();
  }, [sweepOnTap, triggerSweep]);

  // iOS/Safari: pointerup is more reliable than click for non-links
  const handlePointerUp = useCallback((e) => {
    if (!sweepOnTap) return;
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      e.preventDefault();
      triggerSweep();
    }
  }, [sweepOnTap, triggerSweep]);

  const handleKeyDown = useCallback((e) => {
    if (!sweepOnTap) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerSweep();
    }
  }, [sweepOnTap, triggerSweep]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);
  const interactive = sweepOnTap;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? 'Play border glow' : undefined}
      className={`border-glow-card ${className}${interactive ? ' border-glow-card--tappable' : ''}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
