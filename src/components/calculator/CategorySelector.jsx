import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories';

const categoryValues = Object.values(categories);

export const CategorySelector = ({ activeCategory, setActiveCategory }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 mx-auto max-w-max p-1 rounded-2xl tactile-container">
      {categoryValues.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
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
  );
};
