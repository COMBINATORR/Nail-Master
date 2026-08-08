import { useCallback, useEffect, useRef, useState } from 'react';
import { PhoneIcon, WhatsAppIcon, TelegramIcon } from './Icons';

const PHONE_E164 = '77023798074';
const PHONE_DISPLAY = '+7 (702) 379-80-74';

const ACTIONS = [
  {
    id: 'phone',
    label: 'Звонок',
    href: `tel:+${PHONE_E164}`,
    external: false,
    Icon: PhoneIcon,
    accent: '#5BA3E8',
    angle: -55,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: `https://wa.me/${PHONE_E164}`,
    external: true,
    Icon: WhatsAppIcon,
    accent: '#2DD36F',
    angle: 0,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/grokhunter',
    external: true,
    Icon: TelegramIcon,
    accent: '#3DBBFF',
    angle: 55,
  },
];

const HOLD_MS = 280;
const RADIUS = 86;
const HIT_RADIUS = 56;
const INFLUENCE_RADIUS = 110;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

function iconOffset(angleDeg, radius = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

/** 1 at center → 0 at influence edge */
function influenceFromDist(dist, max = INFLUENCE_RADIUS) {
  if (dist >= max) return 0;
  const t = 1 - dist / max;
  // smoothstep
  return t * t * (3 - 2 * t);
}

function openAction(action) {
  if (!action || typeof action.href !== 'string') return;

  try {
    const url = new URL(action.href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const allowedProtocols = ['http:', 'https:', 'tel:', 'mailto:'];

    if (!allowedProtocols.includes(url.protocol)) {
      console.warn(`Blocked attempt to open URL with unsafe protocol: ${url.protocol}`);
      return;
    }

    if (action.external) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = action.href;
    }
  } catch (err) {
    console.error('Invalid URL provided to openAction:', err);
  }
}

/**
 * Pinterest-style long-press fan with magnetic micro-reactions.
 */
export const StudioCreditMenu = () => {
  const rootRef = useRef(null);
  const btnRefs = useRef({});
  const holdTimer = useRef(null);
  const pointerId = useRef(null);
  const openedByHold = useRef(false);
  const suppressClick = useRef(false);
  const lastVibrateId = useRef(null);
  const rafMove = useRef(null);

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [pressed, setPressed] = useState(false);
  /** @type {Record<string, { influence: number, pullX: number, pullY: number }>} */
  const [magnet, setMagnet] = useState({});

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const resetMagnet = useCallback(() => {
    setMagnet(
      Object.fromEntries(
        ACTIONS.map((a) => [a.id, { influence: 0, pullX: 0, pullY: 0 }]),
      ),
    );
  }, []);

  const close = useCallback(() => {
    clearHold();
    setOpen(false);
    setActiveId(null);
    setPressed(false);
    resetMagnet();
    openedByHold.current = false;
    pointerId.current = null;
    lastVibrateId.current = null;
  }, [resetMagnet]);

  const updateMagnet = useCallback((clientX, clientY) => {
    let best = null;
    let bestDist = HIT_RADIUS;
    const next = {};

    for (const action of ACTIONS) {
      const node = btnRefs.current[action.id];
      if (!node) {
        next[action.id] = { influence: 0, pullX: 0, pullY: 0 };
        continue;
      }
      const r = node.getBoundingClientRect();
      // use rest position center (approx current center without pull for stability)
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      const influence = influenceFromDist(dist);
      // magnetic pull toward finger (max ~10px)
      const pull = influence * 10;
      const len = dist || 1;
      next[action.id] = {
        influence,
        pullX: (dx / len) * pull,
        pullY: (dy / len) * pull,
      };
      if (dist < bestDist) {
        bestDist = dist;
        best = action.id;
      }
    }

    setMagnet(next);
    setActiveId(best);

    // light haptic when selection changes
    if (
      best &&
      best !== lastVibrateId.current &&
      typeof navigator !== 'undefined' &&
      navigator.vibrate
    ) {
      lastVibrateId.current = best;
      navigator.vibrate(6);
    }
    if (!best) lastVibrateId.current = null;

    return best;
  }, []);

  const pickNearest = useCallback((clientX, clientY) => {
    let best = null;
    let bestDist = HIT_RADIUS;
    for (const action of ACTIONS) {
      const node = btnRefs.current[action.id];
      if (!node) continue;
      const r = node.getBoundingClientRect();
      const d = Math.hypot(
        clientX - (r.left + r.width / 2),
        clientY - (r.top + r.height / 2),
      );
      if (d < bestDist) {
        bestDist = d;
        best = action.id;
      }
    }
    return best;
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    setActiveId(null);
    resetMagnet();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(12);
    }
  }, [resetMagnet]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    return () => {
      clearHold();
      if (rafMove.current) cancelAnimationFrame(rafMove.current);
    };
  }, []);

  const onPointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    pointerId.current = e.pointerId;
    setPressed(true);
    openedByHold.current = false;
    suppressClick.current = false;

    const { clientX, clientY } = e;
    clearHold();

    holdTimer.current = setTimeout(() => {
      openedByHold.current = true;
      suppressClick.current = true;
      openMenu();
      requestAnimationFrame(() => {
        updateMagnet(clientX, clientY);
      });
    }, HOLD_MS);
  };

  const onPointerMove = (e) => {
    if (!open) return;
    if (pointerId.current != null && e.pointerId !== pointerId.current) return;

    const { clientX, clientY } = e;
    if (rafMove.current) cancelAnimationFrame(rafMove.current);
    rafMove.current = requestAnimationFrame(() => {
      updateMagnet(clientX, clientY);
    });
  };

  const onPointerUp = (e) => {
    clearHold();
    setPressed(false);

    if (open && openedByHold.current) {
      const id = pickNearest(e.clientX, e.clientY) || activeId;
      const action = ACTIONS.find((a) => a.id === id);
      close();
      if (action) {
        setTimeout(() => openAction(action), 50);
      }
      return;
    }

    if (!openedByHold.current && !suppressClick.current) {
      if (open) close();
      else openMenu();
    }
  };

  const onPointerCancel = () => {
    clearHold();
    setPressed(false);
    if (openedByHold.current) close();
  };

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={rootRef}
      className="studio-credit-menu relative inline-flex flex-col items-center justify-center py-2"
      style={{ touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {open && (
        <button
          type="button"
          aria-label="Закрыть"
          className="studio-credit-backdrop fixed inset-0 z-40 cursor-default"
          onClick={close}
        />
      )}

      <div
        className="pointer-events-none absolute left-1/2 bottom-[calc(100%-4px)] z-50"
        style={{ width: 0, height: 0 }}
        role="menu"
        aria-hidden={!open}
      >
        {ACTIONS.map((action, i) => {
          const { x, y } = iconOffset(action.angle);
          const m = magnet[action.id] || { influence: 0, pullX: 0, pullY: 0 };
          const isActive = activeId === action.id;
          const Icon = action.Icon;
          // base scale + proximity swell + active pop
          const scale = open
            ? 0.88 + m.influence * 0.42 + (isActive ? 0.14 : 0)
            : 0.35;
          const opacity = open ? 0.55 + m.influence * 0.45 : 0;

          return (
            <div
              key={action.id}
              className="absolute flex flex-col items-center"
              style={{
                left: x,
                top: y,
                transform: `translate(calc(-50% + ${open ? m.pullX : 0}px), calc(-50% + ${open ? m.pullY : 0}px))`,
                transition: open
                  ? `transform 90ms linear, opacity 280ms ${EASE}`
                  : `transform 280ms ${EASE}, opacity 200ms ease`,
                transitionDelay: open ? `${40 + i * 55}ms` : '0ms',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'auto' : 'none',
                zIndex: isActive ? 2 : 1,
              }}
            >
              <button
                ref={(node) => {
                  btnRefs.current[action.id] = node;
                }}
                type="button"
                role="menuitem"
                tabIndex={open ? 0 : -1}
                aria-label={`${action.label}${action.id === 'phone' ? ` ${PHONE_DISPLAY}` : ''}`}
                data-action-id={action.id}
                className="studio-credit-fan-btn flex items-center justify-center w-12 h-12 rounded-full border"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  color: isActive || m.influence > 0.35 ? action.accent : 'var(--text-primary)',
                  borderColor: isActive
                    ? action.accent
                    : 'color-mix(in srgb, var(--border-color) 80%, transparent)',
                  boxShadow: isActive
                    ? `0 0 0 2px color-mix(in srgb, ${action.accent} 55%, transparent), 0 12px 32px rgba(0,0,0,0.4), 0 0 24px color-mix(in srgb, ${action.accent} 35%, transparent)`
                    : m.influence > 0.2
                      ? `0 8px 22px rgba(0,0,0,0.3), 0 0 16px color-mix(in srgb, ${action.accent} ${m.influence * 30}%, transparent)`
                      : '0 8px 22px rgba(0,0,0,0.28)',
                  transition: open
                    ? `transform 90ms linear, opacity 90ms linear, color 160ms ease, box-shadow 160ms ease, border-color 160ms ease`
                    : `transform 320ms ${EASE}, opacity 220ms ease`,
                }}
                onClick={(ev) => {
                  ev.stopPropagation();
                  openAction(action);
                  close();
                }}
                onPointerEnter={() => {
                  setActiveId(action.id);
                  lastVibrateId.current = action.id;
                }}
                onPointerDown={(ev) => {
                  ev.stopPropagation();
                  setActiveId(action.id);
                }}
              >
                <Icon
                  className="w-5 h-5 transition-transform duration-150"
                  style={{
                    transform: isActive ? 'scale(1.08)' : `scale(${1 + m.influence * 0.06})`,
                  }}
                />
              </button>

              {/* Per-icon label — always high contrast */}
              <span
                className="studio-credit-fan-label mt-1.5 whitespace-nowrap"
                style={{
                  opacity: open ? 0.75 + m.influence * 0.25 : 0,
                  transform: `scale(${isActive ? 1.06 : 0.96 + m.influence * 0.08})`,
                  color: isActive ? action.accent : undefined,
                  transition: `opacity 180ms ease, transform 90ms linear, color 160ms ease`,
                }}
              >
                {action.label}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={`spcwlkr-credit ${pressed || open ? 'spcwlkr-credit-active' : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`SPCWLKR Digital Studio. Удерживайте для связи: ${PHONE_DISPLAY}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onContextMenu={onContextMenu}
      >
        Powered by SPCWLKR Digital Studio
      </button>
    </div>
  );
};

export default StudioCreditMenu;
