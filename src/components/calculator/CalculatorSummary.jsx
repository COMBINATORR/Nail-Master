import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';

const CAT_ORDER = ['manicure', 'pedicure', 'sugaring'];

export const CalculatorSummary = ({
  selectedServices,
  selectedOptions,
  optionsById,
  totalPrice,
  totalTime,
  fmtTime,
  handleCalculatorCta,
  nailShape,
  needsNailShape,
  hasSelection,
}) => {
  const { t } = useTranslation();
  const empty = selectedServices.length === 0 && selectedOptions.length === 0;
  const showShape = needsNailShape && nailShape && !empty;

  const groups = useMemo(() => {
    const map = new Map();
    const ensure = (categoryId, categoryNameKey) => {
      if (!map.has(categoryId)) {
        map.set(categoryId, {
          categoryId,
          categoryNameKey,
          services: [],
          options: [],
        });
      }
      return map.get(categoryId);
    };

    for (const svc of selectedServices) {
      const g = ensure(svc.categoryId || 'other', svc.categoryNameKey);
      g.services.push(svc);
    }
    for (const id of selectedOptions) {
      const o = optionsById[id];
      if (!o) continue;
      const g = ensure(o.categoryId || 'other', o.categoryNameKey);
      g.options.push({ id, ...o });
    }

    return CAT_ORDER
      .filter((id) => map.has(id))
      .map((id) => map.get(id))
      .concat([...map.values()].filter((g) => !CAT_ORDER.includes(g.categoryId)));
  }, [selectedServices, selectedOptions, optionsById]);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
      <div className="liquid-glass-strong rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-6 w-28 h-28 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-3 mb-5 relative">
          <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400">
            {t('servicesTotal')}
          </h4>
          {!empty && (
            <span className="liquid-glass-pill text-[9px] font-bold uppercase tracking-wider text-bronze-400 px-2.5 py-0.5 rounded-full">
              {selectedServices.length + selectedOptions.length} {t('servicesItems')}
            </span>
          )}
        </div>

        <div className="liquid-glass-body rounded-xl p-4 mb-5 space-y-3 relative">
          {empty ? (
            <div className={`text-center py-6 px-2 ${textSecondary}`}>
              <div className="mx-auto mb-3 w-10 h-10 rounded-full liquid-glass flex items-center justify-center">
                <svg className="w-5 h-5 text-bronze-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-xs font-semibold">{t('servicesNotSelected')}</p>
              <p className={`text-[10px] mt-1.5 ${textMuted} leading-relaxed`}>{t('servicesEmptyHint')}</p>
            </div>
          ) : (
            <>
              {groups.map((g) => (
                <div key={g.categoryId} className="space-y-1.5">
                  {groups.length > 1 && g.categoryNameKey && (
                    <div className="text-[9px] font-black uppercase tracking-widest text-bronze-500/90 pt-0.5">
                      {t(g.categoryNameKey)}
                    </div>
                  )}
                  {g.services.map((svc) => (
                    <div key={svc.key || `${g.categoryId}:${svc.id}`} className={`flex justify-between items-center font-bold ${textPrimary} text-sm gap-3`}>
                      <span className="leading-snug">{t(svc.nameKey)}</span>
                      <span className="text-bronze-500 flex-shrink-0">{svc.price.toLocaleString()} ₸</span>
                    </div>
                  ))}
                  {g.options.map((o) => (
                    <div key={o.key || o.id} className={`flex justify-between items-center text-xs ${textMuted} pl-3 border-l-2 border-bronze-500/20 gap-2`}>
                      <span>+ {t(o.nameKey)}</span>
                      <span className="flex-shrink-0">+{o.price.toLocaleString()} ₸</span>
                    </div>
                  ))}
                </div>
              ))}
              {showShape && (
                <div className={`flex justify-between items-center text-xs ${textMuted} pl-3 border-l-2 border-bronze-500/25`}>
                  <span>{t('shapeLabel')}: {t('shape_' + nailShape)}</span>
                </div>
              )}
            </>
          )}
          <div className={`border-t ${border} pt-3 mt-1 flex justify-between items-center font-black ${textPrimary}`}>
            <span className="text-xs uppercase tracking-wider">{t('total')}:</span>
            <span key={totalPrice} className="text-bronze-400 text-lg tabular-nums calc-price-pop">
              {totalPrice.toLocaleString()} ₸
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5 gap-3">
          <span className={`${textSecondary} text-xs`}>{t('servicesTotalTime')}:</span>
          <span className="font-display font-bold text-bronze-300 text-sm tracking-wider tabular-nums">
            {totalTime > 0 ? `≈ ${fmtTime(totalTime)}` : '—'}
          </span>
        </div>

        <div className="flex gap-2.5 items-start p-3 liquid-glass rounded-xl mb-5">
          <svg className="w-5 h-5 text-bronze-400 drop-shadow-[0_0_6px_rgba(197,168,128,0.5)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className={`${textMuted} text-[10px] leading-relaxed font-sans`}>
            {t('guaranteeIndicatorText')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCalculatorCta}
          disabled={empty}
          className={`w-full py-3.5 rounded-xl text-xs uppercase transition-all duration-300
            ${empty
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
        ].map((b) => (
          <div key={b.id} className="flex flex-col items-center gap-1.5">
            <span style={{ color: b.role || 'var(--accent)' }}>
              {b.id === 'guarantee' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><path d="m9 12 2 2 4-4"/></svg>
              )}
              {b.id === 'sterility' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4"/><circle cx="12" cy="12" r="3"/></svg>
              )}
              {b.id === 'duration' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
              )}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${textMuted} leading-tight whitespace-pre-line`}>{b.label}</span>
          </div>
        ))}
      </div>

      {hasSelection && (
        <div className="calc-mobile-bar lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none">
          <div className="liquid-glass-strong rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-2xl pointer-events-auto max-w-lg mx-auto">
            <div className="min-w-0">
              <div className="font-display font-black text-bronze-400 text-base tabular-nums leading-none">
                {totalPrice.toLocaleString()} ₸
              </div>
              <div className={`${textMuted} text-[10px] mt-1 tabular-nums`}>
                ≈ {fmtTime(totalTime)}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCalculatorCta}
              className="btn-premium-tactile border-beam-active flex-shrink-0 px-5 py-2.5 rounded-xl text-[10px] uppercase"
            >
              {t('serviceCta')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
