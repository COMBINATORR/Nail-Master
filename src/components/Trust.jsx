import { useTranslation } from 'react-i18next';
import BorderGlow from './ui/BorderGlow';
import { borderGlowSiteProps } from './ui/borderGlowSiteProps';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

export const Trust = () => {
  const { t } = useTranslation();

  const cards = [
    { badge: '01', title: t('trust1Title'), desc: t('trust1Desc') },
    { badge: '02', title: t('trust2Title'), desc: t('trust2Desc') },
    { badge: '03', title: t('trust3Title'), desc: t('trust3Desc') },
  ];

  return (
    <section id="trust" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2 text-center`}>
          {t('trustTitle')}
        </h2>
        <p className={`${textSecondary} text-sm max-w-xl mb-8 text-center mx-auto`}>
          {t('trustSubtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <BorderGlow key={card.badge} {...borderGlowSiteProps}>
              <div className="flex flex-col gap-4 p-5 h-full">
                <div className="flex justify-between items-center">
                  <span className="liquid-glass-pill text-[10px] font-sans font-black uppercase tracking-widest px-3 py-1 rounded-full text-care">
                    {card.badge}
                  </span>
                </div>
                <div>
                  <h3 className={`font-display text-base lg:text-lg font-black uppercase tracking-wider ${textPrimary} mb-2`}>
                    {card.title}
                  </h3>
                  <p className={`${textSecondary} text-xs leading-relaxed`}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
};
