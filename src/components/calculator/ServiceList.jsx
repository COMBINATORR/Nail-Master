import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';

export const ServiceList = ({ catObj, selectedServiceIds, toggleService, fmtTime }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">{t('servicesSelectBase')}</h3>
      <div className="space-y-3">
        {catObj.services.map((svc) => {
          const isActive = selectedServiceIds.includes(svc.id);
          return (
            <div key={svc.id} onClick={() => toggleService(svc.id)}
              className={`liquid-glass rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden active:scale-[0.98] active:duration-100
              ${isActive
                ? 'liquid-glass-chip-active tactile-card-selected'
                : 'opacity-80 hover:opacity-100 liquid-glass-hover'}`}>
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
  );
};
