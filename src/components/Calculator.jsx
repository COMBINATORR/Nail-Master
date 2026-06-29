import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { nailShapes } from '../data/nailShapes';

const bgAlt = 'bg-[var(--bg-alt)]';
const bgDeep = 'bg-[var(--bg-deep)]';
const bgSubtle = 'bg-[var(--bg-subtle)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';
const borderSubtle = 'border-[var(--border-subtle)]';
const bgCard = 'bg-[var(--bg-card)]';

export const Calculator = ({
  activeCategory,
  setActiveCategory,
  selectedServiceIds,
  toggleService,
  selectedOptions,
  toggleOption,
  nailShape,
  setNailShape,
  totalPrice,
  totalTime,
  fmtTime,
  handleCalculatorCta,
  selectedServices,
  optionsById
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const catObj = categories[activeCategory];

  return (
    <section id="services" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>{t('servicesTitle')}</h2>
        <p className={`${textSecondary} text-sm mb-10`}>{t('servicesSubtitle')}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-8 mx-auto max-w-max p-1 rounded-2xl tactile-container">
          {Object.values(categories).map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                }}
                className={`px-6 py-3 rounded-xl font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'active-tactile-pill scale-[1.02]' 
                    : 'border border-transparent hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {t(cat.nameKey)}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left col: selection */}
          <div className="space-y-8">
            {/* Base services */}
            <div>
              <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">{t('servicesSelectBase')}</h3>
              <div className="space-y-3">
                {catObj.services.map((svc) => {
                  const isActive = selectedServiceIds.includes(svc.id);
                  return (
                    <div key={svc.id} onClick={() => toggleService(svc.id)}
                      className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden bg-[var(--bg-card)] active:scale-[0.98] active:duration-100
                      ${isActive
                        ? `border-bronze-500 shadow-[0_0_20px_rgba(197,168,128,0.12)] tactile-card-selected`
                        : `${borderSubtle} opacity-70 hover:opacity-100`}`}>
                      {isActive && (
                        <div className="absolute top-0 right-0 w-9 h-9 bg-bronze-500/10 border-b border-l border-bronze-500/30 rounded-bl-xl flex items-center justify-center">
                          <span className="text-bronze-400 font-bold text-xs">✓</span>
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h4 className={`font-display font-bold uppercase tracking-wide ${textPrimary} text-sm lg:text-base`}>{t(svc.nameKey)}</h4>
                        <span className="font-display font-black text-bronze-500 text-sm lg:text-base ml-2 flex-shrink-0">{svc.price.toLocaleString()} ₸</span>
                      </div>
                      <p className={`${textSecondary} text-xs leading-relaxed mb-2`}>{t(svc.descKey)}</p>
                      <span className="text-[10px] text-bronze-400 font-bold uppercase tracking-wider">⏱ {fmtTime(svc.time)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desired Nail Shape Selection */}
            {activeCategory !== 'sugaring' && (
              <div>
                <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">
                  {t('chooseNailShape')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {nailShapes.map((shape) => {
                    const isActive = nailShape === shape.id;
                    return (
                      <div
                        key={shape.id}
                        onClick={() => setNailShape(shape.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center bg-[var(--bg-card)] active:scale-[0.96] active:duration-100
                          ${isActive 
                            ? `border-bronze-500 text-bronze-400 bg-bronze-500/5 shadow-[0_0_15px_rgba(197,168,128,0.12)] tactile-card-selected`
                            : `${borderSubtle} opacity-80 hover:opacity-100`
                          }`}
                      >
                        {/* SVG Nail shape */}
                        <svg width="40" height="40" viewBox="0 0 32 32" className="mb-2">
                          {/* Finger contour */}
                          <path 
                            d="M8,30 C8,20 8,16 9,14 C10,12 11,11 16,11 C21,11 22,12 23,14 C24,16 24,20 24,30" 
                            fill="none" 
                            stroke="var(--border-color)" 
                            strokeWidth="1" 
                            strokeDasharray="2 2" 
                          />
                          {/* Nail tip outline */}
                          <path 
                            d={shape.path} 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                          />
                        </svg>
                        <span className="text-[11px] font-bold tracking-tight leading-snug">
                          {t('shape_' + shape.id)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extra options */}
            <div>
              <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">
                {activeCategory !== 'sugaring' 
                  ? t('extraOptions')
                  : t('servicesSelectOptions')
                }
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                {catObj?.options?.map((opt) => {
                  const isChecked = selectedOptions.includes(opt.id);
                  return (
                    <div key={opt.id} onClick={() => toggleOption(opt.id)}
                      className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-300 flex items-center justify-between
                        bg-[var(--bg-card)] active:scale-[0.98] active:duration-100
                        ${isChecked ? 'border-bronze-500/50 tactile-card-selected' : `${borderSubtle} opacity-80 hover:opacity-100`}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                          ${isChecked ? 'bg-bronze-500 border-bronze-500 text-charcoal-950' : 'border-[var(--border-color)]'}`}>
                          {isChecked && <span className="font-bold text-[10px]">✓</span>}
                        </div>
                        <div>
                          <span className={`${textPrimary} text-xs font-bold block leading-snug`}>{t(opt.nameKey)}</span>
                          <span className={`text-[9px] ${textMuted}`}>+{fmtTime(opt.time)}</span>
                        </div>
                      </div>
                      <span className="font-display text-bronze-400 text-xs font-black ml-2 flex-shrink-0">+{opt.price.toLocaleString()} ₸</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right col: sticky total + form preview */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className={`border border-bronze-500/30 rounded-2xl p-6 ${bgDeep} shadow-2xl relative overflow-hidden`}>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-5">{t('servicesTotal')}</h4>

              {/* Receipt */}
              <div className={`${bgSubtle} rounded-xl p-4 mb-5 space-y-1.5`}>
                {selectedServices.length === 0 && selectedOptions.length === 0 ? (
                  <div className={`text-center py-4 ${textSecondary} text-xs font-semibold`}>
                    {t('servicesNotSelected')}
                  </div>
                ) : (
                  <>
                    {selectedServices.map(svc => (
                      <div key={svc.id} className={`flex justify-between items-center font-bold ${textPrimary} text-sm`}>
                        <span>{t(svc.nameKey)}</span>
                        <span className="text-bronze-500">{svc.price.toLocaleString()} ₸</span>
                      </div>
                    ))}
                    {selectedOptions.map(id => {
                      const o = optionsById[id]; if (!o) return null;
                      return (
                        <div key={id} className={`flex justify-between items-center text-xs ${textMuted} pl-4`}>
                          <span>+ {t(o.nameKey)}</span>
                          <span>+{o.price.toLocaleString()} ₸</span>
                        </div>
                      );
                    })}
                  </>
                )}
                <div className={`border-t ${border} pt-2.5 mt-1 flex justify-between items-center font-black ${textPrimary}`}>
                  <span className="text-xs uppercase tracking-wider">{t('total')}:</span>
                  <span className="text-bronze-400 text-base">{totalPrice.toLocaleString()} ₸</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <span className={`${textSecondary} text-xs`}>{t('servicesTotalTime')}:</span>
                <span className="font-display font-bold text-bronze-300 text-sm tracking-wider">≈ {fmtTime(totalTime)}</span>
              </div>

              {/* Legal and Personal Guarantee Badge */}
              <div className="flex gap-2.5 items-start p-3 border border-bronze-500/10 bg-bronze-500/5 rounded-xl mb-5">
                <svg className="w-5 h-5 text-bronze-400 drop-shadow-[0_0_6px_rgba(197,168,128,0.5)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className={`${textMuted} text-[10px] leading-relaxed font-sans`}>
                  {t('guaranteeIndicatorText')}
                </p>
              </div>

              <button 
                onClick={handleCalculatorCta}
                disabled={selectedServices.length === 0 && selectedOptions.length === 0}
                className={`w-full py-3.5 rounded-xl text-xs uppercase transition-all duration-300
                  ${(selectedServices.length === 0 && selectedOptions.length === 0)
                    ? 'bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] cursor-not-allowed opacity-50 shadow-none'
                    : 'btn-premium-tactile border-beam-active'
                  }`}
              >
                {t('serviceCta')}
              </button>
            </div>

            {/* Trust badges */}
            <div className={`border ${border} rounded-2xl p-4 ${bgCard} grid grid-cols-3 gap-3 text-center`}>
              {[
                { id:'guarantee', label: t('badgeGuarantee') },
                { id:'sterility', label: t('badgeSterility') },
                { id:'duration', label: t('badgeDuration') },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span style={{color:'var(--accent)'}}>
                    {b.id === 'guarantee' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><path d="m9 12 2 2 4-4"/></svg>
                    )}
                    {b.id === 'sterility' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                    {b.id === 'duration' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                    )}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${textMuted} leading-tight whitespace-pre-line`}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
