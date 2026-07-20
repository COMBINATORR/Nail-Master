import { useTranslation } from 'react-i18next';
import { itemKey } from '../../hooks/useBooking';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';

export const ServiceList = ({ catObj, selectedServiceIds, toggleService, fmtTime }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="liquid-glass-pill font-display text-[9px] font-black tracking-widest text-bronze-500 uppercase px-2.5 py-0.5 rounded-full">
          01
        </span>
        <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500">
          {t('servicesSelectBase')}
        </h3>
      </div>
      <div className="space-y-3" role="group" aria-label={t('servicesSelectBase')}>
        {catObj.services.map((svc) => {
          const key = itemKey(catObj.id, svc.id);
          const isActive = selectedServiceIds.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleService(key)}
              aria-pressed={isActive}
              className={`w-full text-left liquid-glass rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden active:scale-[0.98] active:duration-100
              ${isActive
                ? 'liquid-glass-chip-active tactile-card-selected calc-service-selected'
                : 'opacity-85 hover:opacity-100 liquid-glass-hover'}`}
            >
              {isActive && (
                <span
                  className="absolute top-0 right-0 w-9 h-9 bg-bronze-500/15 border-b border-l border-bronze-500/35 rounded-bl-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-bronze-400 font-bold text-xs">✓</span>
                </span>
              )}
              <div className="flex justify-between items-start gap-3 mb-2 pr-8">
                <h4 className={`font-display font-bold uppercase tracking-wide ${textPrimary} text-sm lg:text-base leading-snug`}>
                  {t(svc.nameKey)}
                </h4>
                <span className="liquid-glass-pill font-display font-black text-bronze-500 text-xs lg:text-sm px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                  {svc.price.toLocaleString()} ₸
                </span>
              </div>
              <p className={`${textSecondary} text-xs leading-relaxed mb-3`}>{t(svc.descKey)}</p>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-bronze-400 font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 7v5l3 3" />
                </svg>
                {fmtTime(svc.time)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
