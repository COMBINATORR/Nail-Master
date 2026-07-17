import { useTranslation } from 'react-i18next';

const textPrimary = 'text-[var(--text-primary)]';
const textMuted = 'text-[var(--text-muted)]';
const borderSubtle = 'border-[var(--border-subtle)]';

export const ExtraOptions = ({ activeCategory, catObj, selectedOptions, toggleOption, fmtTime }) => {
  const { t } = useTranslation();

  return (
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
  );
};
