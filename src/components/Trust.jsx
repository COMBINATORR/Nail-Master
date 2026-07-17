import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from './Icons';

const bgCard = 'bg-[var(--bg-card)]';
const bgSubtle = 'bg-[var(--bg-subtle)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const borderSubtle = 'border-[var(--border-subtle)]';
const border = 'border-[var(--border-color)]';

export const Trust = () => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    { num: '01', title: t('trust1Title'), desc: t('trust1Desc') },
    { num: '02', title: t('trust2Title'), desc: t('trust2Desc') },
    { num: '03', title: t('trust3Title'), desc: t('trust3Desc') },
  ];

  return (
    <section id="trust" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10 text-center`}>
          {t('trustTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const isOpen = activeCard === i;
            return (
              <div 
                key={card.num} 
                className={`flex flex-col ${bgCard} border ${borderSubtle} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer md:cursor-default select-none`}
                onClick={() => setActiveCard(isOpen ? null : i)}
              >
                <div className="w-full flex justify-between items-center p-5 text-left md:cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-2xl text-bronze-500/40 leading-none">
                      {card.num}
                    </span>
                    <span className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>
                      {card.title}
                    </span>
                  </div>
                  <div className="md:hidden">
                    <ChevronDownIcon className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-bronze-500' : 'text-[var(--text-muted)]'}`} />
                  </div>
                </div>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden md:max-h-none md:opacity-100 md:border-t md:${borderSubtle} ${
                    isOpen ? 'max-h-60 opacity-100 border-t ' + borderSubtle : 'max-h-0 opacity-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={`p-5 ${textSecondary} text-sm leading-relaxed ${bgSubtle}`}>
                    {card.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
