import { useCallback, useEffect, useId, useRef, useState } from 'react';

const identityMatrix =
  '1, 0, 0, 0, ' +
  '0, 1, 0, 0, ' +
  '0, 0, 1, 0, ' +
  '0, 0, 0, 1';

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

/** place 1 gold · 2 silver · 3 bronze */
const backgroundColor = ['#f3e3ac', '#ddd', '#f1cfa6'];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/**
 * 3D award badge — mouse tilt on desktop, gyroscope on mobile.
 */
export const AwardBadge = ({
  brand = 'SVTL AWARDS',
  title = 'Лучший педикюр 2026',
  place,
  link,
}) => {
  const uid = useId().replace(/:/g, '');
  const ref = useRef(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0);
  const [matrix, setMatrix] = useState(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false);
  const [useGyro, setUseGyro] = useState(false);
  const [gyroReady, setGyroReady] = useState(false);

  const enterTimeout = useRef(null);
  const leaveTimeout1 = useRef(null);
  const leaveTimeout2 = useRef(null);
  const leaveTimeout3 = useRef(null);
  const moveTimeout = useRef(null);
  const enterAnimTimeout = useRef(null);
  const hoverActive = useRef(false);
  const rafGyro = useRef(null);

  useEffect(() => {
    return () => {
      [
        enterTimeout,
        leaveTimeout1,
        leaveTimeout2,
        leaveTimeout3,
        moveTimeout,
        enterAnimTimeout,
      ].forEach((r) => {
        if (r.current) clearTimeout(r.current);
      });
      if (rafGyro.current) cancelAnimationFrame(rafGyro.current);
    };
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
        if (index === 0 || index === 5 || index === 10) {
          return '1';
        }
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

  /** Map deviceorientation → matrix3d-like tilt + holographic spin */
  const applyGyro = useCallback((beta, gamma) => {
    // beta: front-back, gamma: left-right
    const b = clamp((beta ?? 45) - 45, -35, 35);
    const g = clamp(gamma ?? 0, -45, 45);

    // approximate matrix3d from small rotations (radians)
    const rx = (-b / 45) * 0.35;
    const ry = (g / 45) * 0.4;
    const sx = 1 - Math.abs(g) * 0.0004;
    const sy = 1 - Math.abs(b) * 0.0004;
    const sz = 1 - (Math.abs(g) + Math.abs(b)) * 0.00025;

    const next =
      `${sx}, 0, ${ry}, 0, ` +
      `${rx * 0.3}, ${sy}, ${-rx}, 0, ` +
      `${-ry * 0.5}, ${rx * 0.4}, ${sz}, 0, ` +
      `0, 0, 0, 1`;

    setMatrix(next);
    setFirstOverlayPosition(g * 1.2 + b * 0.4);
  }, []);

  const enableGyro = useCallback(async () => {
    if (typeof window === 'undefined') return false;

    const attach = () => {
      const onOrient = (e) => {
        // Some desktops fire empty events — ignore
        if (e.beta == null && e.gamma == null) return;
        if (hoverActive.current) return; // mouse wins when hovering
        if (rafGyro.current) cancelAnimationFrame(rafGyro.current);
        rafGyro.current = requestAnimationFrame(() => {
          applyGyro(e.beta, e.gamma);
        });
      };
      window.addEventListener('deviceorientation', onOrient, { passive: true });
      setUseGyro(true);
      setGyroReady(true);
      setDisableOverlayAnimation(true);
      return () => window.removeEventListener('deviceorientation', onOrient);
    };

    try {
      // iOS 13+ requires permission on a user gesture
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        const state = await DeviceOrientationEvent.requestPermission();
        if (state === 'granted') {
          return attach();
        }
        return null;
      }
      // Android / desktop with sensors
      if ('DeviceOrientationEvent' in window) {
        return attach();
      }
    } catch {
      // permission denied or unavailable
    }
    return null;
  }, [applyGyro]);

  // Auto-subscribe on non-iOS (no permission API)
  useEffect(() => {
    let cleanup;
    let cancelled = false;

    const setup = async () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        // wait for first tap on badge
        return;
      }
      if ('DeviceOrientationEvent' in window) {
        cleanup = await enableGyro();
      }
    };

    setup();
    return () => {
      cancelled = true;
      if (typeof cleanup === 'function') cleanup();
    };
  }, [enableGyro]);

  const onMouseEnter = (e) => {
    if (useGyro && !window.matchMedia('(pointer: fine)').matches) return;
    hoverActive.current = true;

    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current);
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current);
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current);
    setDisableOverlayAnimation(true);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);
      });
    });

    const nextMatrix = getMatrix(e.clientX, e.clientY);
    const oppositeMatrix = getOppositeMatrix(nextMatrix, e.clientY, true);

    setMatrix(oppositeMatrix);
    setIsTimeoutFinished(false);
    if (enterAnimTimeout.current) clearTimeout(enterAnimTimeout.current);
    enterAnimTimeout.current = setTimeout(() => {
      setIsTimeoutFinished(true);
    }, 200);
  };

  const onMouseMove = (e) => {
    if (useGyro && !window.matchMedia('(pointer: fine)').matches) return;
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
    if (useGyro && !window.matchMedia('(pointer: fine)').matches) return;
    hoverActive.current = false;

    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);

    if (enterTimeout.current) clearTimeout(enterTimeout.current);

    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150);
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffect(() => {
    if (isTimeoutFinished && hoverActive.current) {
      setMatrix(currentMatrix);
    }
  }, [currentMatrix, isTimeoutFinished]);

  const onPointerDown = async () => {
    // iOS: enable sensors on first interaction
    if (!gyroReady && typeof DeviceOrientationEvent?.requestPermission === 'function') {
      await enableGyro();
    }
  };

  const overlayAnimations = [...Array(10).keys()]
    .map(
      (e) => `
    @keyframes overlayAnimation${uid}${e + 1} {
      0% { transform: rotate(${e * 10}deg); }
      50% { transform: rotate(${(e + 1) * 10}deg); }
      100% { transform: rotate(${e * 10}deg); }
    }
  `,
    )
    .join(' ');

  const fill = backgroundColor[(place || 1) - 1] || backgroundColor[0];
  const displayTitle = place ? `${title} #${place}` : title;
  const blurId = `blur-${uid}`;
  const maskId = `badgeMask-${uid}`;

  // Slightly smaller type for longer titles
  const titleSize = displayTitle.length > 20 ? 13 : 15;

  const overlayColors = [
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
      <style>{overlayAnimations}</style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: 'center center',
          transition: useGyro && !hoverActive.current ? 'transform 80ms linear' : 'transform 200ms ease-out',
          willChange: 'transform',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" className="w-full h-auto">
          <defs>
            <filter id={blurId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
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
          <g style={{ mixBlendMode: 'overlay' }} mask={`url(#${maskId})`}>
            {overlayColors.map((color, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                  transformOrigin: 'center center',
                  transition:
                    useGyro && !hoverActive.current
                      ? 'transform 80ms linear'
                      : !disableInOutOverlayAnimation
                        ? 'transform 200ms ease-out'
                        : 'none',
                  animation: disableOverlayAnimation
                    ? 'none'
                    : `overlayAnimation${uid}${i + 1} 5s infinite`,
                  willChange: 'transform',
                }}
              >
                <polygon
                  points="0,0 260,54 260,0 0,54"
                  fill={color}
                  filter={`url(#${blurId})`}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </Tag>
  );
};

export default AwardBadge;
