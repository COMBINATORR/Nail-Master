import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

export const Guarantees = () => {
  const { t } = useTranslation();

  const cards = [
    { badge: '01', title: t('g1Title'), desc: t('g1Desc') },
    { badge: '02', title: t('g2Title'), desc: t('g2Desc') },
    { badge: '03', title: t('g3Title'), desc: t('g3Desc') },
    { badge: '04', title: t('g4Title'), desc: t('g4Desc') },
  ];

  return (
    <section id="guarantees" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2 text-center`}>
          {t('guaranteesTitle')}
        </h2>
        <p className={`${textSecondary} text-sm max-w-xl mb-8 text-center mx-auto`}>
          {t('guaranteesSubtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((g, i) => (
            <div
              key={i}
              className="liquid-glass liquid-glass-hover flex flex-col gap-4 p-5 rounded-2xl"
            >
              <div className="flex justify-between items-center">
                <span className="liquid-glass-pill text-[10px] font-sans font-black uppercase tracking-widest px-3 py-1 rounded-full text-accent">
                  {g.badge}
                </span>
              </div>
              <div>
                <h3 className={`font-display text-base lg:text-lg font-black uppercase tracking-wider ${textPrimary} mb-2`}>
                  {g.title}
                </h3>
                <p className={`${textSecondary} text-xs leading-relaxed`}>
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
