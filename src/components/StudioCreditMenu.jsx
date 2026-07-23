import { useCallback, useEffect, useRef, useState } from 'react';
import { PhoneIcon, WhatsAppIcon, TelegramIcon } from './Icons';

const PHONE_E164 = '77023798074';
const PHONE_DISPLAY = '+7 (702) 379-80-74';

const ACTIONS = [
  {
    id: 'phone',
    label: 'Позвонить',
    href: `tel:+${PHONE_E164}`,
    external: false,
    Icon: PhoneIcon,
    accent: '#4A90D9',
    angle: -55,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: `https://wa.me/${PHONE_E164}`,
    external: true,
    Icon: WhatsAppIcon,
    accent: '#25D366',
    angle: 0,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/grokhunter',
    external: true,
    Icon: TelegramIcon,
    accent: '#2AABEE',
    angle: 55,
  },
];

const HOLD_MS = 300;
const RADIUS = 82;
const HIT_RADIUS = 48;

function iconOffset(angleDeg, radius = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function openAction(action) {
  if (!action) return;
  if (action.external) {
    window.open(action.href, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = action.href;
  }
}

/**
 * Pinterest-style long-press fan on the studio credit.
 * Hold → icons fan out; drag to one; release → call / WhatsApp / Telegram.
 * Short click toggles the same fan (desktop-friendly).
 */
export const StudioCreditMenu = () => {
  const rootRef = useRef(null);
  const btnRefs = useRef({});
  const holdTimer = useRef(null);
  const pointerId = useRef(null);
  const openedByHold = useRef(false);
  const suppressClick = useRef(false);

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [pressed, setPressed] = useState(false);

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const close = useCallback(() => {
    clearHold();
    setOpen(false);
    setActiveId(null);
    setPressed(false);
    openedByHold.current = false;
    pointerId.current = null;
  }, []);

  const pickNearest = useCallback((clientX, clientY) => {
    let best = null;
    let bestDist = HIT_RADIUS;

    for (const action of ACTIONS) {
      const node = btnRefs.current[action.id];
      if (!node) continue;
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(clientX - cx, clientY - cy);
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
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

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
      // rAF so buttons mount and get rects
      requestAnimationFrame(() => {
        setActiveId(pickNearest(clientX, clientY));
      });
    }, HOLD_MS);
  };

  const onPointerMove = (e) => {
    if (!open) return;
    if (pointerId.current != null && e.pointerId !== pointerId.current) return;
    setActiveId(pickNearest(e.clientX, e.clientY));
  };

  const onPointerUp = (e) => {
    clearHold();
    setPressed(false);

    if (open && openedByHold.current) {
      const id = pickNearest(e.clientX, e.clientY);
      const action = ACTIONS.find((a) => a.id === id);
      close();
      if (action) {
        // slight delay so UI can close before navigation
        setTimeout(() => openAction(action), 40);
      }
      return;
    }

    // Short press: toggle fan
    if (!openedByHold.current && !suppressClick.current) {
      if (open) close();
      else openMenu();
    }
  };

  const onPointerCancel = () => {
    clearHold();
    setPressed(false);
    // Only abort if we were mid long-press selection
    if (openedByHold.current) {
      close();
    }
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
          className="fixed inset-0 z-40 cursor-default bg-black/30 backdrop-blur-[2px]"
          onClick={close}
        />
      )}

      {/* Fan — opens upward from credit */}
      <div
        className="pointer-events-none absolute left-1/2 bottom-[calc(100%-4px)] z-50"
        style={{ width: 0, height: 0 }}
        role="menu"
        aria-hidden={!open}
      >
        {ACTIONS.map((action, i) => {
          const { x, y } = iconOffset(action.angle);
          const isActive = activeId === action.id;
          const Icon = action.Icon;

          return (
            <button
              key={action.id}
              ref={(node) => {
                btnRefs.current[action.id] = node;
              }}
              type="button"
              role="menuitem"
              tabIndex={open ? 0 : -1}
              aria-label={`${action.label}${action.id === 'phone' ? ` ${PHONE_DISPLAY}` : ''}`}
              data-action-id={action.id}
              className={`
                studio-credit-fan-btn pointer-events-auto absolute
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-[var(--border-color)]
                transition-[opacity,transform,box-shadow,color] duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
              style={{
                left: x,
                top: y,
                transform: `translate(-50%, -50%) scale(${open ? (isActive ? 1.2 : 1) : 0.4})`,
                transitionDelay: open ? `${60 + i * 50}ms` : '0ms',
                color: isActive ? action.accent : 'var(--text-primary)',
                boxShadow: isActive
                  ? `0 0 0 2px color-mix(in srgb, ${action.accent} 60%, transparent), 0 10px 28px rgba(0,0,0,0.4)`
                  : '0 8px 24px rgba(0,0,0,0.28)',
              }}
              onClick={(ev) => {
                ev.stopPropagation();
                openAction(action);
                close();
              }}
              onPointerEnter={() => setActiveId(action.id)}
              onPointerDown={(ev) => {
                // allow selecting during hold without stealing capture badly
                ev.stopPropagation();
                setActiveId(action.id);
              }}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {open && (
        <span
          className="pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap
                     text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]"
          style={{ bottom: 'calc(100% + 96px)' }}
        >
          {activeId
            ? ACTIONS.find((a) => a.id === activeId)?.label
            : 'Выберите контакт'}
        </span>
      )}

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
