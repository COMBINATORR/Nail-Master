import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { careTipsData } from '../data/careRules';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';
import { mobileStackProps } from './ui/scrollStackDefaults';
import { useIsMobileStack } from '../hooks/useMediaQuery';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

const CareTipCard = ({ tip }) => (
  <div className="liquid-glass liquid-glass-hover flex flex-col gap-4 p-5 rounded-2xl">
    <div className="flex justify-between items-center">
      <span className="liquid-glass-pill text-[10px] font-sans font-black uppercase tracking-widest px-3 py-1 rounded-full text-care">
        {tip.badge}
      </span>
    </div>
    <div>
      <h3 className={`font-display text-base lg:text-lg font-black uppercase tracking-wider ${textPrimary} mb-2`}>
        {tip.title}
      </h3>
      <p className={`${textSecondary} text-xs leading-relaxed`}>
        {tip.desc}
      </p>
    </div>
  </div>
);

export const CareGuide = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ru';
  const isMobile = useIsMobileStack();
  const [activeCareTab, setActiveCareTab] = useState('manicure');
  const tips = careTipsData[lang]?.[activeCareTab] || careTipsData.ru[activeCareTab] || [];

  return (
    <section id="care-guide" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2 text-center`}>
          {t('careTitle')}
        </h2>
        <p className={`${textSecondary} text-sm max-w-xl mb-8 text-center mx-auto`}>
          {t('careSubtitle')}
        </p>

        {/* Interactive Care Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 max-w-md p-1 rounded-2xl liquid-glass mx-auto">
          {['manicure', 'pedicure', 'sugaring'].map((tab) => {
            const isActive = activeCareTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCareTab(tab)}
                className={`flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer
                  ${isActive
                    ? 'active-tactile-pill scale-[1.02]'
                    : 'border border-transparent hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {t(tab)}
              </button>
            );
          })}
        </div>

        {isMobile ? (
          <ScrollStack key={activeCareTab} {...mobileStackProps}>
            {tips.map((tip, index) => (
              <ScrollStackItem key={`${activeCareTab}-${index}`}>
                <CareTipCard tip={tip} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip, index) => (
              <CareTipCard key={`${activeCareTab}-${index}`} tip={tip} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
