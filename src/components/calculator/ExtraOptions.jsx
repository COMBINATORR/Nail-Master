import { useTranslation } from 'react-i18next';
import { itemKey } from '../../hooks/useBooking';

const textPrimary = 'text-[var(--text-primary)]';
const textMuted = 'text-[var(--text-muted)]';

export const ExtraOptions = (props) => {
  const { activeCategory, catObj, selectedOptions, toggleOption, fmtTime, hideHeader = false } = props;
  const { t } = useTranslation();
  const stepLabel = activeCategory !== 'sugaring' ? '03' : '02';
  const title = activeCategory !== 'sugaring' ? t('extraOptions') : t('servicesSelectOptions');

  return (
    <div>
      {!hideHeader && (
        <div className="flex items-center gap-2 mb-4">
          <span className="liquid-glass-pill font-display text-[9px] font-black tracking-widest text-bronze-500 uppercase px-2.5 py-0.5 rounded-full">
            {stepLabel}
          </span>
          <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500">
            {title}
          </h3>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2" role="group" aria-label={title}>
        {catObj?.options?.map((opt) => {
          const key = itemKey(catObj.id, opt.id);
          const isChecked = selectedOptions.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleOption(key)}
              aria-pressed={isChecked}
              className={`liquid-glass-chip liquid-glass-chip-noscale rounded-xl p-3.5 cursor-pointer transition-all duration-300 flex items-center justify-between gap-2
                active:scale-[0.98] active:duration-100 text-left w-full
                ${isChecked ? 'liquid-glass-chip-active tactile-card-selected' : 'opacity-80 hover:opacity-100'}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                  ${isChecked
                    ? 'bg-bronze-500 border-bronze-500 text-charcoal-950 shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_35%,transparent)]'
                    : 'border-[var(--border-color)] bg-transparent'
                  }`}
                  aria-hidden="true"
                >
                  {isChecked && <span className="font-bold text-[10px] leading-none">✓</span>}
                </div>
                <div className="min-w-0">
                  <span className={`${textPrimary} text-xs font-bold block leading-snug`}>{t(opt.nameKey)}</span>
                  <span className={`text-[9px] ${textMuted}`}>+{fmtTime(opt.time)}</span>
                </div>
              </div>
              <span className="font-display text-bronze-400 text-xs font-black ml-1 flex-shrink-0 whitespace-nowrap">
                +{opt.price.toLocaleString()} ₸
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
