import { useTranslation } from 'react-i18next';
import { AnimatedGradientText } from './AnimatedGradientText';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

export const Hero = ({ scrollToServices }) => {
  const { t } = useTranslation();

  return (
    <section className={`relative overflow-x-clip overflow-y-visible border-b ${border}`}>
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bronze-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-bronze-700/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="pt-12 pb-14 lg:pt-20 lg:pb-24 flex justify-center">
          <div className="max-w-3xl w-full text-center flex flex-col items-center">
            <div className="liquid-glass-pill inline-flex items-center px-3 py-1 rounded-full mb-5">
              <span className="text-bronze-300 font-bold tracking-widest text-[9px] uppercase">{t('heroSuperTitle')}</span>
            </div>
            <h1 className={`font-display font-black tracking-tighter ${textPrimary} leading-[1.05] uppercase mb-6
                           text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center`}>
              {t('heroTitlePre')}
              <AnimatedGradientText>{t('heroTitleHighlight')}</AnimatedGradientText>
              {t('heroTitlePost')}
            </h1>
            <p className={`${textSecondary} text-sm leading-relaxed max-w-lg mx-auto mb-8 text-center`}>
              <span className="block text-bronze-400 font-display font-bold text-xs tracking-widest uppercase mb-3">
                {t('heroSubtitle')}
              </span>
              {t('heroDesc')}
            </p>
            <button onClick={scrollToServices} id="hero-cta-btn"
              className="btn-premium-tactile border-beam-active px-8 py-4 rounded-full text-xs uppercase transition-all duration-300 hover:scale-105 active:scale-95">
              {t('heroCta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
