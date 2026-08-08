import { useState, useMemo, useEffect } from 'react';
import { ProgressiveImage } from './ProgressiveImage';

const ACCORDION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const ACCORDION_MS = 900;

/** How many panels fit in the accordion at once (rest via nav). */
export const DEFAULT_MAX_VISIBLE = 5;

/**
 * Sliding window so active item stays among the visible slots.
 * With 20 works we never render 20 strips — only up to maxVisible.
 */
export function getVisibleWindow(activeIndex, total, maxVisible) {
  if (total <= maxVisible) {
    return { start: 0, end: total };
  }
  const half = Math.floor(maxVisible / 2);
  let start = activeIndex - half;
  start = Math.max(0, Math.min(start, total - maxVisible));
  return { start, end: start + maxVisible };
}

export const AccordionItem = ({ item, isActive, onActivate }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={item.title}
      className={`
        image-accordion-item relative h-full rounded-xl sm:rounded-2xl overflow-hidden
        cursor-pointer min-w-0 will-change-[flex-basis,flex-grow]
        ${isActive ? 'flex-[1_1_0%]' : 'flex-[0_0_2.35rem] sm:flex-[0_0_2.75rem] md:flex-[0_0_3.75rem]'}
      `}
      style={{
        transition: `flex ${ACCORDION_MS}ms ${ACCORDION_EASE}, flex-basis ${ACCORDION_MS}ms ${ACCORDION_EASE}`,
      }}
      onMouseEnter={onActivate}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate?.();
        }
      }}
    >
      <ProgressiveImage
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        imgClassName="pointer-events-none select-none"
        style={{
          transform: isActive ? 'scale(1)' : 'scale(1.06)',
          transition: `transform ${ACCORDION_MS}ms ${ACCORDION_EASE}`,
        }}
        draggable={false}
      />

      <span
        className="absolute text-white font-semibold whitespace-nowrap pointer-events-none text-xs sm:text-sm md:text-lg"
        style={{
          left: '50%',
          bottom: isActive ? 16 : 72,
          transform: isActive
            ? 'translateX(-50%) rotate(0deg)'
            : 'translateX(-50%) rotate(90deg)',
          transition: `transform ${ACCORDION_MS}ms ${ACCORDION_EASE}, bottom ${ACCORDION_MS}ms ${ACCORDION_EASE}`,
        }}
      >
        {item.title}
      </span>
    </div>
  );
};

const NavButton = ({ direction, onClick, disabled, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`
      flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full
      flex items-center justify-center
      border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-sm
      text-[var(--text-primary)] transition-all duration-200
      hover:border-bronze-500/50 hover:text-bronze-400
      disabled:opacity-30 disabled:pointer-events-none
      active:scale-95
    `}
  >
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {direction === 'prev' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

/**
 * Image accordion that scales to any list length:
 * - ≤ maxVisible: all panels in one row
 * - > maxVisible: window of maxVisible + prev/next + counter
 */
export function ImageAccordion({
  items,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onActiveChange,
  maxVisible = DEFAULT_MAX_VISIBLE,
  className = '',
}) {
  const [internalIndex, setInternalIndex] = useState(
    Math.min(defaultActiveIndex, Math.max(items.length - 1, 0)),
  );
  const activeIndex =
    typeof controlledIndex === 'number' ? controlledIndex : internalIndex;

  const activate = (index) => {
    if (index < 0 || index >= items.length) return;
    if (typeof controlledIndex !== 'number') setInternalIndex(index);
    onActiveChange?.(index, items[index]);
  };

  // Keep activeIndex in range if list shrinks
  useEffect(() => {
    if (items.length === 0) return;
    if (activeIndex > items.length - 1) {
      activate(items.length - 1);
    }
  }, [items.length]);

  const { start, end } = useMemo(
    () => getVisibleWindow(activeIndex, items.length, maxVisible),
    [activeIndex, items.length, maxVisible],
  );

  const visibleItems = items.slice(start, end);
  const needsNav = items.length > maxVisible;

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="flex items-center gap-2 sm:gap-3 w-full">
        {needsNav && (
          <NavButton
            direction="prev"
            label="Previous"
            disabled={activeIndex <= 0}
            onClick={() => activate(activeIndex - 1)}
          />
        )}

        <div
          className="
            flex flex-row items-stretch flex-1 min-w-0
            gap-1.5 sm:gap-2 md:gap-3
            h-[280px] sm:h-[380px] md:h-[450px]
          "
        >
          {visibleItems.map((item, localIndex) => {
            const globalIndex = start + localIndex;
            return (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={globalIndex === activeIndex}
                onActivate={() => activate(globalIndex)}
              />
            );
          })}
        </div>

        {needsNav && (
          <NavButton
            direction="next"
            label="Next"
            disabled={activeIndex >= items.length - 1}
            onClick={() => activate(activeIndex + 1)}
          />
        )}
      </div>

      {needsNav && (
        <div className="mt-3 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">
            {activeIndex + 1} / {items.length}
          </span>
          {/* Jump rail — all works as tiny thumbnails */}
          <div className="flex flex-wrap justify-center gap-1.5 max-w-full px-1">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.title}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => activate(index)}
                className={`
                  w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300
                  ${
                    index === activeIndex
                      ? 'bg-bronze-500 scale-125'
                      : 'bg-[var(--text-muted)]/35 hover:bg-bronze-400/60'
                  }
                `}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Demo / generic landing block ---
export function LandingAccordionItem({
  title = 'Accelerate Gen-AI Tasks on Any Device',
  description = 'Build high-performance AI apps on-device without the hassle of model compression or edge deployment.',
  ctaLabel = 'Contact Us',
  ctaHref = '#contact',
  items = null,
  defaultActiveIndex = 4,
  maxVisible = DEFAULT_MAX_VISIBLE,
  className = '',
}) {
  const accordionItems = items ?? [
    {
      id: 1,
      title: 'Voice Assistant',
      imageUrl:
        'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'AI Image Generation',
      imageUrl:
        'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'AI Chatbot + Local RAG',
      imageUrl:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'AI Agent',
      imageUrl:
        'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop',
    },
    {
      id: 5,
      title: 'Visual Understanding',
      imageUrl:
        'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <div className={`bg-white font-sans ${className}`.trim()}>
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tighter">
              {title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              {description}
            </p>
            {ctaLabel && (
              <div className="mt-8">
                <a
                  href={ctaHref}
                  className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  {ctaLabel}
                </a>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 min-w-0">
            <ImageAccordion
              items={accordionItems}
              defaultActiveIndex={defaultActiveIndex}
              maxVisible={maxVisible}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingAccordionItem;
