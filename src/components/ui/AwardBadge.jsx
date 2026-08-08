import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { isMobileLike, prefersReducedMotion } from '../../lib/perf';

const identityMatrix =
  '1, 0, 0, 0, ' +
  '0, 1, 0, 0, ' +
  '0, 0, 1, 0, ' +
  '0, 0, 0, 1';

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;
const backgroundColor = ['#f3e3ac', '#ddd', '#f1cfa6'];
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Gyro: max ~12 updates/sec, only when badge is on screen
const GYRO_MIN_MS = 80;
const GYRO_DELTA = 0.8;

/**
 * Award badge with optional 3D tilt.
 * Mobile: lightweight CSS rotate, gyro only while in viewport & throttled.
 * Desktop: full mouse matrix interaction.
 */
export const AwardBadge = ({
  brand = 'SVTL AWARDS',
  title = 'Лучший педикюр 2026',
  place,
  link,
}) => {
  const uid = useId().replace(/:/g, '');
  const ref = useRef(null);
  const tiltRef = useRef(null);
  const overlayLayerRef = useRef(null);

  const [matrix, setMatrix] = useState(identityMatrix);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0);
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(true);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false);
  const [useGyro, setUseGyro] = useState(false);
  const [inView, setInView] = useState(false);

  const enterTimeout = useRef(null);
  const leaveTimeout1 = useRef(null);
  const leaveTimeout2 = useRef(null);
  const leaveTimeout3 = useRef(null);
  const moveTimeout = useRef(null);
  const enterAnimTimeout = useRef(null);
  const hoverActive = useRef(false);
  const lastGyroAt = useRef(0);
  const lastBeta = useRef(null);
  const lastGamma = useRef(null);
  const mobile = useRef(false);
  const reduced = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    mobile.current = isMobileLike();
    reduced.current = prefersReducedMotion();
    setIsMobile(mobile.current);
    // Never run idle infinite overlay loops on mobile — major GPU heat
    setDisableOverlayAnimation(true);
  }, []);

  // Only spend work when badge is visible
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      [enterTimeout, leaveTimeout1, leaveTimeout2, leaveTimeout3, moveTimeout, enterAnimTimeout].forEach(
        (r) => {
          if (r.current) clearTimeout(r.current);
        },
      );
    };
  }, []);

  const applyTiltDom = useCallback((rotX, rotY, overlayDeg) => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    if (overlayLayerRef.current && overlayDeg != null) {
      overlayLayerRef.current.style.transform = `rotate(${overlayDeg}deg)`;
    }
  }, []);

  const getDimensions = () => {
    const rect = ref?.current?.getBoundingClientRect();
    return {
      left: rect?.left || 0,
      right: rect?.right || 0,
      top: rect?.top || 0,
      bottom: rect?.bottom || 0,
    };
  };

  const getMatrix = (clientX, clientY) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    const scale = [
      maxScale - ((maxScale - minScale) * Math.abs(xCenter - clientX)) / (xCenter - left || 1),
      maxScale - ((maxScale - minScale) * Math.abs(yCenter - clientY)) / (yCenter - top || 1),
      maxScale -
        ((maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY))) /
          (xCenter - left + yCenter - top || 1),
    ];

    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / (yCenter || 1) - (xCenter - clientX) / (xCenter || 1)),
      x2: maxRotate - ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left || 1),
      x3: 0,
      y0: 0,
      y2: maxRotate - ((maxRotate - minRotate) * (top - clientY)) / (top - bottom || 1),
      y3: 0,
      z0: -(maxRotate - ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left || 1)),
      z1: 0.2 - ((0.2 + 0.6) * (top - clientY)) / (top - bottom || 1),
      z3: 0,
    };

    return (
      `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`
    );
  };

  const getOppositeMatrix = (_matrix, clientY, onMouseEnter) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onMouseEnter ? 0.7 : 4;
    const multiplier = onMouseEnter ? -1 : 1;

    return _matrix
      .split(', ')
      .map((item, index) => {
        if (index === 2 || index === 4 || index === 8) {
          return (-parseFloat(item) * multiplier) / weakening;
        }
        if (index === 0 || index === 5 || index === 10) return '1';
        if (index === 6) {
          return (
            (multiplier *
              (maxRotate - ((maxRotate - minRotate) * (top - oppositeY)) / (top - bottom || 1))) /
            weakening
          );
        }
        if (index === 9) {
          return (
            (maxRotate - ((maxRotate - minRotate) * (top - oppositeY)) / (top - bottom || 1)) /
            weakening
          );
        }
        return item;
      })
      .join(', ');
  };

  /** Gyro → DOM only (no React re-render storm) */
  const applyGyro = useCallback(
    (beta, gamma) => {
      if (reduced.current || document.hidden) return;
      const now = performance.now();
      if (now - lastGyroAt.current < GYRO_MIN_MS) return;

      const b = clamp((beta ?? 45) - 45, -35, 35);
      const g = clamp(gamma ?? 0, -45, 45);

      if (
        lastBeta.current != null &&
        Math.abs(b - lastBeta.current) < GYRO_DELTA &&
        Math.abs(g - lastGamma.current) < GYRO_DELTA
      ) {
        return;
      }
      lastBeta.current = b;
      lastGamma.current = g;
      lastGyroAt.current = now;

      // Simple rotateX/Y is cheaper than matrix3d re-layout
      const rotX = clamp((-b / 45) * 12, -12, 12);
      const rotY = clamp((g / 45) * 16, -16, 16);
      applyTiltDom(rotX, rotY, g * 0.9 + b * 0.3);
    },
    [applyTiltDom],
  );

  // Gyro only when visible + allowed
  useEffect(() => {
    if (!inView || reduced.current || typeof window === 'undefined') return undefined;
    if (!('DeviceOrientationEvent' in window)) return undefined;

    // iOS needs explicit permission — only after user tap
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      return undefined;
    }

    let alive = true;
    const onOrient = (e) => {
      if (!alive || e.beta == null && e.gamma == null) return;
      if (hoverActive.current) return;
      applyGyro(e.beta, e.gamma);
    };

    window.addEventListener('deviceorientation', onOrient, { passive: true });
    setUseGyro(true);

    return () => {
      alive = false;
      window.removeEventListener('deviceorientation', onOrient);
      setUseGyro(false);
      applyTiltDom(0, 0, 0);
    };
  }, [inView, applyGyro, applyTiltDom]);

  // Pause gyro work when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) applyTiltDom(0, 0, 0);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [applyTiltDom]);

  const onMouseEnter = (e) => {
    if (mobile.current || reduced.current) return;
    if (useGyro && !window.matchMedia('(pointer: fine)').matches) return;
    hoverActive.current = true;

    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current);
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current);
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);

    const nextMatrix = getMatrix(e.clientX, e.clientY);
    setMatrix(getOppositeMatrix(nextMatrix, e.clientY, true));
    setIsTimeoutFinished(false);
    if (enterAnimTimeout.current) clearTimeout(enterAnimTimeout.current);
    enterAnimTimeout.current = setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const onMouseMove = (e) => {
    if (mobile.current || reduced.current) return;
    if (!hoverActive.current) return;

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    if (moveTimeout.current) clearTimeout(moveTimeout.current);
    moveTimeout.current = setTimeout(() => {
      setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);
    }, 150);

    if (isTimeoutFinished) {
      setCurrentMatrix(getMatrix(e.clientX, e.clientY));
    }
  };

  const onMouseLeave = (e) => {
    if (mobile.current || reduced.current) return;
    hoverActive.current = false;

    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);
    if (enterTimeout.current) clearTimeout(enterTimeout.current);

    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    setDisableInOutOverlayAnimation(false);
    leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition((p) => -p / 4), 150);
    leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
    leaveTimeout3.current = setTimeout(() => {
      setDisableInOutOverlayAnimation(true);
    }, 500);
  };

  useEffect(() => {
    if (isTimeoutFinished && hoverActive.current) {
      setMatrix(currentMatrix);
    }
  }, [currentMatrix, isTimeoutFinished]);

  const onPointerDown = async () => {
    if (reduced.current) return;
    if (!inView) return;
    if (typeof DeviceOrientationEvent?.requestPermission !== 'function') return;
    if (useGyro) return;
    try {
      const state = await DeviceOrientationEvent.requestPermission();
      if (state !== 'granted') return;
      // one-shot attach while visible
      const onOrient = (e) => {
        if (e.beta == null && e.gamma == null) return;
        applyGyro(e.beta, e.gamma);
      };
      window.addEventListener('deviceorientation', onOrient, { passive: true });
      setUseGyro(true);
      ref.current.__gyroCleanup = () => window.removeEventListener('deviceorientation', onOrient);
    } catch {
      /* denied */
    }
  };

  useEffect(() => {
    return () => {
      ref.current?.__gyroCleanup?.();
    };
  }, []);

  const fill = backgroundColor[(place || 1) - 1] || backgroundColor[0];
  const displayTitle = place ? `${title} #${place}` : title;
  const blurId = `blur-${uid}`;
  const maskId = `badgeMask-${uid}`;
  const titleSize = displayTitle.length > 20 ? 13 : 15;

  // Fewer overlay layers on mobile (blur filters are expensive)
  const overlayColors = isMobile
    ? ['hsl(30, 100%, 50%)', 'hsl(271, 85%, 47%)', 'white']
    : [
        'hsl(358, 100%, 62%)',
        'hsl(30, 100%, 50%)',
        'hsl(60, 100%, 50%)',
        'hsl(96, 100%, 50%)',
        'hsl(233, 85%, 47%)',
        'hsl(271, 85%, 47%)',
        'hsl(300, 20%, 35%)',
        'transparent',
        'transparent',
        'white',
      ];

  const Tag = link ? 'a' : 'div';
  const linkProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : { role: 'img', 'aria-label': `${brand} — ${displayTitle}` };

  return (
    <Tag
      ref={ref}
      {...linkProps}
      className="block w-[180px] sm:w-[260px] h-auto select-none touch-manipulation"
      style={{ cursor: link ? 'pointer' : 'default' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onPointerDown={onPointerDown}
    >
      <div
        ref={tiltRef}
        style={{
          // Mobile: transform only via ref (gyro) so React re-renders don't reset tilt
          // Desktop: matrix3d from mouse state
          ...(isMobile
            ? {}
            : {
                transform: `perspective(700px) matrix3d(${matrix})`,
              }),
          transformOrigin: 'center center',
          transition: useGyro ? 'transform 100ms linear' : 'transform 200ms ease-out',
          willChange: inView && useGyro ? 'transform' : 'auto',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" className="w-full h-auto">
          <defs>
            <filter id={blurId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={isMobile ? 1.5 : 3} />
            </filter>
            <mask id={maskId}>
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
          </defs>
          <rect width="260" height="54" rx="10" fill={fill} />
          <rect
            x="4"
            y="4"
            width="252"
            height="46"
            rx="8"
            fill="transparent"
            stroke="#bbb"
            strokeWidth="1"
          />
          <text
            fontFamily="Helvetica-Bold, Helvetica, Arial, sans-serif"
            fontSize="9"
            fontWeight="bold"
            fill="#666"
            x="53"
            y="20"
          >
            {brand}
          </text>
          <text
            fontFamily="Helvetica-Bold, Helvetica, Arial, sans-serif"
            fontSize={titleSize}
            fontWeight="bold"
            fill="#666"
            x="52"
            y="40"
          >
            {displayTitle}
          </text>
          <g transform="translate(10, 11)">
            <path
              fill="#666"
              d="M17 2.5l2.4 7.2H27l-6 4.4 2.3 7.1L17 17l-6.3 4.2 2.3-7.1-6-4.4h7.6L17 2.5z"
            />
          </g>
          {/* Single rotating overlay group on mobile instead of 10 animated layers */}
          <g style={{ mixBlendMode: 'overlay' }} mask={`url(#${maskId})`}>
            <g
              ref={overlayLayerRef}
              style={{
                transformOrigin: 'center center',
                transition: !disableInOutOverlayAnimation ? 'transform 200ms ease-out' : 'none',
              }}
            >
              {overlayColors.map((color, i) => (
                <polygon
                  key={i}
                  points="0,0 260,54 260,0 0,54"
                  fill={color}
                  filter={i === 0 ? `url(#${blurId})` : undefined}
                  opacity="0.45"
                  transform={`rotate(${firstOverlayPosition + i * (isMobile ? 30 : 10)} 130 27)`}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    </Tag>
  );
};

export default AwardBadge;
