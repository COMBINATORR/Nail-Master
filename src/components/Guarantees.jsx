import { useTranslation } from 'react-i18next';
import { CheckIcon } from './Icons';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';
const bgSubtle = 'bg-[var(--bg-subtle)]';

export const Guarantees = () => {
  const { t } = useTranslation();

  return (
    <section id="guarantees" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>{t('guaranteesTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: t('g1Title'), desc: t('g1Desc') },
            { title: t('g2Title'), desc: t('g2Desc') },
            { title: t('g3Title'), desc: t('g3Desc') },
            { title: t('g4Title'), desc: t('g4Desc') },
          ].map((g, i) => (
            <div key={i} className={`flex flex-col gap-3 p-5 ${bgSubtle} border ${border} rounded-2xl hover:border-bronze-500/20 transition-all`}>
              <div className="bg-bronze-500/10 p-2 rounded-lg w-fit"><CheckIcon /></div>
              <div>
                <h3 className={`font-display text-sm font-bold uppercase tracking-wider ${textPrimary} mb-1.5`}>{g.title}</h3>
                <p className={`${textSecondary} text-xs leading-relaxed`}>{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
