import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from './Icons';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';
const bgCard = 'bg-[var(--bg-card)]';

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
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>
          {t('trustTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const isOpen = activeCard === i;
            return (
              <div 
                key={card.num} 
                className={`border ${border} rounded-2xl p-5 md:p-6 ${bgCard} hover:border-bronze-500/25 transition-all group cursor-pointer md:cursor-default select-none`}
                onClick={() => setActiveCard(isOpen ? null : i)}
              >
                <div className="flex justify-between items-center md:block">
                  <div className="flex items-center md:block gap-3">
                    <span className="font-display font-black text-3xl md:text-4xl text-bronze-500/40 group-hover:text-bronze-500/70 transition-colors leading-none block md:mb-3">
                      {card.num}
                    </span>
                    <h3 className={`font-display font-black text-base lg:text-lg tracking-wider uppercase ${textPrimary} md:mb-2`}>
                      {card.title}
                    </h3>
                  </div>
                  <div className="md:hidden">
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-bronze-500' : 'text-[var(--text-muted)]'}`} />
                  </div>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden md:max-h-none md:opacity-100 md:mt-0 md:pt-0 md:border-t-0 ${isOpen ? 'max-h-60 opacity-100 mt-3 pt-3 border-t ' + border : 'max-h-0 opacity-0'}`}>
                  <p className={`${textSecondary} text-xs leading-relaxed`}>
                    {card.desc}
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
