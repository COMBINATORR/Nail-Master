import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';

export const CalculatorSummary = ({
  selectedServices,
  selectedOptions,
  optionsById,
  totalPrice,
  totalTime,
  fmtTime,
  handleCalculatorCta
}) => {
  const { t } = useTranslation();

  return (
    <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
      <div className="liquid-glass-strong rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-5">{t('servicesTotal')}</h4>

        <div className="liquid-glass-body rounded-xl p-4 mb-5 space-y-1.5">
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

        <div className="flex gap-2.5 items-start p-3 liquid-glass rounded-xl mb-5">
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

      <div className="liquid-glass rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
        {[
          { id: 'guarantee', label: t('badgeGuarantee'), role: 'var(--accent)' },
          { id: 'sterility', label: t('badgeSterility'), role: 'var(--care)' },
          { id: 'duration', label: t('badgeDuration'), role: 'var(--success)' },
        ].map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span style={{ color: b.role || 'var(--accent)' }}>
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
  );
};
