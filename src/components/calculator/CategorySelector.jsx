import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories';

const categoryValues = Object.values(categories);

export const CategorySelector = ({ activeCategory, setActiveCategory, categoryCounts = {} }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 max-w-md p-1 rounded-2xl liquid-glass mx-auto">
        {categoryValues.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={isActive}
              className={`relative flex-1 min-w-[5.5rem] text-center py-3 px-3 rounded-xl font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer
                ${isActive
                  ? 'active-tactile-pill scale-[1.02] text-[var(--text-primary)]'
                  : 'border border-transparent hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                {t(cat.nameKey)}
                {count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1 rounded-full text-[9px] font-black tabular-nums
                      ${isActive
                        ? 'bg-bronze-500 text-charcoal-950'
                        : 'bg-bronze-500/25 text-bronze-400'
                      }`}
                    aria-label={`${count}`}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-[var(--text-muted)] mt-2.5 max-w-md mx-auto leading-relaxed">
        {t('servicesMultiHint')}
      </p>
    </div>
  );
};
