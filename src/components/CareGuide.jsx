import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { careTipsData } from '../data/careRules';
import {
  ShieldIcon,
  CreamIcon,
  NailPolishIcon,
  MirrorIcon,
  NailFileIcon,
  LipIcon,
  ScissorsIcon,
  CombIcon,
  CheckIcon
} from './Icons';

const bgSubtle = 'bg-[var(--bg-subtle)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

export const CareGuide = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ru';
  const [activeCareTab, setActiveCareTab] = useState('manicure');

  const getIcon = (type) => {
    const iconClasses = "w-5 h-5 text-bronze-500";
    if (type === 'time' || type === 'ban') return <ShieldIcon className={iconClasses} />;
    if (type === 'protect') return <CreamIcon className={iconClasses} />;
    if (type === 'care') return <NailPolishIcon className={iconClasses} />;
    if (type === 'calendar') return <MirrorIcon className={iconClasses} />;
    if (type === 'shoe') return <ShieldIcon className={iconClasses} />;
    if (type === 'cream') return <CreamIcon className={iconClasses} />;
    if (type === 'dry') return <MirrorIcon className={iconClasses} />;
    if (type === 'shape') return <NailFileIcon className={iconClasses} />;
    if (type === 'cloth') return <LipIcon className={iconClasses} />;
    if (type === 'peel') return <ScissorsIcon className={iconClasses} />;
    if (type === 'lotion') return <CombIcon className={iconClasses} />;
    return <CheckIcon className={iconClasses} />;
  };

  return (
    <section id="care-guide" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>
          {t('careTitle')}
        </h2>
        <p className={`${textSecondary} text-sm max-w-xl mb-8`}>
          {t('careSubtitle')}
        </p>

        {/* Interactive Care Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 max-w-md p-1 rounded-2xl tactile-container">
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
                    : 'border border-transparent hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {t(tab)}
              </button>
            );
          })}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {careTipsData[lang][activeCareTab].map((tip, index) => {
            return (
              <div 
                key={index} 
                className={`flex flex-col gap-4 p-5 ${bgSubtle} border ${border} rounded-2xl hover:border-bronze-500/20 transition-all hover:-translate-y-1 duration-300`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest border border-bronze-500/35 bg-bronze-500/10 px-3 py-1 rounded-lg text-bronze-400">
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
          })}
        </div>
      </div>
    </section>
  );
};
