import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from './Icons';

const bgCard = 'bg-[var(--bg-card)]';
const bgSubtle = 'bg-[var(--bg-subtle)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const borderSubtle = 'border-[var(--border-subtle)]';
const border = 'border-[var(--border-color)]';

export const Guarantees = () => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    { title: t('g1Title'), desc: t('g1Desc') },
    { title: t('g2Title'), desc: t('g2Desc') },
    { title: t('g3Title'), desc: t('g3Desc') },
    { title: t('g4Title'), desc: t('g4Desc') },
  ];

  return (
    <section id="guarantees" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>
          {t('guaranteesTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((g, i) => {
            const isOpen = activeCard === i;
            return (
              <div 
                key={i} 
                className={`flex flex-col ${bgCard} border ${borderSubtle} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer lg:cursor-default select-none`}
                onClick={() => setActiveCard(isOpen ? null : i)}
              >
                <div className="w-full flex justify-between items-center p-5 text-left lg:cursor-default">
                  <h3 className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>
                    {g.title}
                  </h3>
                  <div className="lg:hidden">
                    <ChevronDownIcon className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-bronze-500' : 'text-[var(--text-muted)]'}`} />
                  </div>
                </div>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden lg:max-h-none lg:opacity-100 lg:border-t lg:${borderSubtle} ${
                    isOpen ? 'max-h-60 opacity-100 border-t ' + borderSubtle : 'max-h-0 opacity-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={`p-5 ${textSecondary} text-sm leading-relaxed ${bgSubtle}`}>
                    {g.desc}
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
