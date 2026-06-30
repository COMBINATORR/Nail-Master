import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { works } from '../data/works';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';
const bgCard = 'bg-[var(--bg-card)]';

export const Portfolio = () => {
  const { t } = useTranslation();

  const [activeWork, setActiveWork] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    handleSliderMove(clientX);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleSliderMove(clientX);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove, { passive: true });
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  return (
    <section id="portfolio" className={`border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>
          {t('portfolioTitle')}
        </h2>
        <p className={`${textSecondary} text-sm mb-8`}>
          {t('portfolioSubtitle')}
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Tabs for switching works */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {works.map((w, index) => {
              const isActive = activeWork === index;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setActiveWork(index);
                    setSliderPosition(50);
                    setIsDragging(false);
                  }}
                  className={`flex-shrink-0 snap-start snap-always px-5 py-2.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'active-tactile-pill scale-[1.02]' 
                      : 'border border-[var(--border-color)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-bronze-500/30'
                    }`}
                >
                  {t(w.titleKey)}
                </button>
              );
            })}
          </div>

          {/* The interactive container */}
          <div 
            ref={sliderRef}
            className={`relative h-[320px] sm:h-[400px] md:h-[480px] w-full rounded-3xl overflow-hidden border ${border} shadow-2xl select-none touch-none cursor-ew-resize`}
            onMouseDown={(e) => {
              if (e.button === 0) handleStart(e.clientX);
            }}
            onTouchStart={(e) => {
              if (e.touches && e.touches[0]) {
                handleStart(e.touches[0].clientX);
              }
            }}
          >
            {/* After Image (Full width background) */}
            <img 
              src={works[activeWork].after} 
              alt="After manicure" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              draggable="false"
            />
            {/* After label */}
            <div className="absolute right-6 top-6 bg-bronze-500/90 backdrop-blur-md text-charcoal-950 font-display font-black text-[10px] sm:text-xs px-4 py-2 rounded-xl z-20 tracking-widest shadow-lg">
              {t('afterText')}
            </div>

            {/* Before Image (Positioned absolutely, clipped horizontally) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src={works[activeWork].before} 
                alt="Before manicure" 
                className="absolute inset-0 w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
            {/* Before label */}
            <div className="absolute left-6 top-6 bg-charcoal-950/80 backdrop-blur-md text-white border border-white/10 font-display font-black text-[10px] sm:text-xs px-4 py-2 rounded-xl z-20 tracking-widest shadow-lg">
              {t('beforeText')}
            </div>

            {/* Slide Line Divider */}
            <div 
              className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-bronze-400 via-bronze-500 to-bronze-600 z-30 cursor-ew-resize shadow-[0_0_10px_rgba(197,168,128,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag handle */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-deep)]/40 backdrop-blur-md border border-bronze-500/60 shadow-xl flex items-center justify-center cursor-ew-resize transition-transform duration-150 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
              >
                {/* Left & Right custom vector arrows */}
                <svg className="w-5 h-5 text-bronze-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 16l-4-4 4-4m4 8l4-4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Helper UX caption strictly below the slider */}
          <div className="text-center mt-3.5">
            <span className={`text-[10px] uppercase tracking-widest ${textMuted} font-bold opacity-80`}>
              {t('dragSliderToCompare')}
            </span>
          </div>

          {/* Work details block */}
          <div className={`mt-6 p-5 border ${border} rounded-2xl ${bgCard} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl transition-all duration-300`}>
            <div className="max-w-xl">
              <h4 className={`font-display font-bold text-sm ${textPrimary} uppercase tracking-wider mb-1`}>
                {t(works[activeWork].titleKey)}
              </h4>
              <p className={`${textSecondary} text-xs leading-relaxed`}>
                {t(works[activeWork].descKey)}
              </p>
            </div>
            <div className="flex gap-6 flex-shrink-0 text-xs font-bold uppercase tracking-wider w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[var(--border-subtle)]">
              <div className="flex flex-col gap-1">
                <span className={`${textMuted} text-[9px]`}>{t('ageLabel')}</span>
                <span className="text-bronze-400 font-display text-sm">{works[activeWork].age}</span>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)] hidden md:block" />
              <div className="flex flex-col gap-1">
                <span className={`${textMuted} text-[9px]`}>{t('timeLabel')}</span>
                <span className="text-bronze-400 font-display text-sm">
                  {(() => {
                    const timeStr = works[activeWork].time;
                    const match = timeStr.match(/(\d+)\s*ч\s*(?:(\d+)\s*мин)?/);
                    if (!match) return timeStr;
                    const h = parseInt(match[1], 10);
                    const m = match[2] ? parseInt(match[2], 10) : 0;
                    const hl = t('hour_short', 'ч');
                    const ml = t('min_short', 'мин');
                    return `${h} ${hl}${m > 0 ? ` ${m} ${ml}` : ''}`;
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
