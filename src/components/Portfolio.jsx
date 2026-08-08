import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { works } from '../data/works';
import { ImageAccordion } from './ui/interactive-image-accordion';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';

const formatWorkTime = (timeStr, t) => {
  const match = timeStr.match(/(\d+)\s*ч\s*(?:(\d+)\s*мин)?/);
  if (!match) return timeStr;
  const h = parseInt(match[1], 10);
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const hl = t('hour_short', 'ч');
  const ml = t('min_short', 'мин');
  return `${h} ${hl}${m > 0 ? ` ${m} ${ml}` : ''}`;
};

export const Portfolio = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const accordionItems = useMemo(
    () =>
      works.map((w) => ({
        id: w.id,
        title: t(w.titleKey),
        imageUrl: w.after,
        titleKey: w.titleKey,
        descKey: w.descKey,
        age: w.age,
        time: w.time,
      })),
    [t],
  );

  const current = works[activeIndex] ?? works[0];

  return (
    <section id="portfolio" className={`border-b ${border} py-10 sm:py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-10 lg:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1 min-w-0">
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ${textPrimary} leading-tight tracking-tighter uppercase`}>
              {t('portfolioTitle')}
            </h2>
            <p className={`mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg ${textSecondary} max-w-xl mx-auto md:mx-0`}>
              {t('portfolioSubtitle')}
            </p>

            <div className="mt-5 sm:mt-6 md:mt-8 liquid-glass rounded-2xl p-4 sm:p-5 md:p-6 text-left shadow-xl max-w-xl mx-auto md:mx-0">
              <h3 className={`font-display font-bold text-sm sm:text-base md:text-lg ${textPrimary} uppercase tracking-wider mb-2`}>
                {t(current.titleKey)}
              </h3>
              <p className={`${textSecondary} text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5`}>
                {t(current.descKey)}
              </p>

              <div className="flex gap-6 text-xs font-bold uppercase tracking-wider pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex flex-col gap-1">
                  <span className={`${textMuted} text-[9px]`}>{t('ageLabel')}</span>
                  <span className="text-bronze-400 font-display text-sm">{current.age}</span>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="flex flex-col gap-1">
                  <span className={`${textMuted} text-[9px]`}>{t('timeLabel')}</span>
                  <span className="text-bronze-400 font-display text-sm">
                    {formatWorkTime(current.time, t)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 min-w-0 order-1 md:order-2">
            <ImageAccordion
              items={accordionItems}
              activeIndex={activeIndex}
              onActiveChange={(index) => setActiveIndex(index)}
              maxVisible={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
