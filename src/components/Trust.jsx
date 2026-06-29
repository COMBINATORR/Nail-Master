import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';
const bgCard = 'bg-[var(--bg-card)]';

export const Trust = () => {
  const { t } = useTranslation();

  return (
    <section id="trust" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>{t('trustTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: '01', title: t('trust1Title'), desc: t('trust1Desc') },
            { num: '02', title: t('trust2Title'), desc: t('trust2Desc') },
            { num: '03', title: t('trust3Title'), desc: t('trust3Desc') },
          ].map((card) => (
            <div key={card.num} className={`border ${border} rounded-2xl p-6 ${bgCard} hover:border-bronze-500/25 transition-all group`}>
              <span className="font-display font-black text-4xl text-bronze-500/40 group-hover:text-bronze-500/70 transition-colors leading-none block mb-3">{card.num}</span>
              <h3 className={`font-display font-bold text-sm tracking-wider uppercase ${textPrimary} mb-2`}>{card.title}</h3>
              <p className={`${textSecondary} text-sm leading-relaxed`}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
