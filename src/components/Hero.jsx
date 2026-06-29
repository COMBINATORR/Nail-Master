import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';
const bgCard = 'bg-[var(--bg-card)]';

export const Hero = ({ scrollToServices }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className={`relative overflow-hidden border-b ${border}`}>
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bronze-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-bronze-700/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 pt-12 pb-14 lg:pt-20 lg:pb-24">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center border border-bronze-500/30 bg-bronze-500/5 px-3 py-1 rounded-full mb-5">
              <span className="text-bronze-300 font-bold tracking-widest text-[9px] uppercase">{t('heroSuperTitle')}</span>
            </div>
            <h1 className={`font-display font-black tracking-tighter ${textPrimary} leading-[1.05] uppercase mb-5
                           text-4xl sm:text-5xl lg:text-6xl xl:text-7xl`}>
              {t('heroTitle')}
            </h1>
            <div className="border border-bronze-500/20 bg-bronze-950/20 rounded-xl p-3 mb-6 inline-block">
              <span className="text-bronze-400 font-sans font-bold text-xs tracking-wider uppercase">{t('heroSubtitle')}</span>
            </div>
            <p className={`${textSecondary} text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8`}>{t('heroDesc')}</p>
            <button onClick={scrollToServices} id="hero-cta-btn"
              className="w-full lg:w-auto btn-premium-tactile px-8 py-4 rounded-xl text-xs uppercase transition-all duration-300">
              {t('heroCta')}
            </button>
          </div>

          {/* Right: stat cards (desktop only) */}
          <div className="hidden lg:grid grid-cols-1 gap-4 w-72 xl:w-80 flex-shrink-0">
            {[
              { 
                num: '28', 
                unit: lang === 'en' ? 'days' : lang === 'ru' ? 'дней' : 'күн', 
                label: lang === 'en' ? 'coating guarantee' : lang === 'ru' ? 'гарантия покрытия' : 'жабын кепілдігі' 
              },
              { 
                num: '100%', 
                unit: '', 
                label: lang === 'en' ? 'disposable consumables' : lang === 'ru' ? 'одноразовые расходники' : 'бір реттік шығын материалдары' 
              },
              { 
                num: '0 ₸', 
                unit: '', 
                label: lang === 'en' ? 'hidden charges' : lang === 'ru' ? 'скрытых доплат' : 'жасырын үстемелер' 
              },
            ].map((s, i) => (
              <div key={i} className={`${bgCard} border ${border} rounded-2xl p-5 hover:border-bronze-500/30 transition-all`}>
                <div className={`font-display font-black text-3xl ${textPrimary} mb-0.5`}>
                  {s.num} <span className="text-bronze-500 text-lg">{s.unit}</span>
                </div>
                <div className={`text-xs ${textMuted} uppercase tracking-wider font-bold`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
