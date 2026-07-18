import { useTranslation } from 'react-i18next';
import { nailShapes } from '../../data/nailShapes';

export const NailShapeSelector = ({ activeCategory, nailShape, setNailShape }) => {
  const { t } = useTranslation();

  if (activeCategory === 'sugaring') return null;

  return (
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
              className={`liquid-glass-chip rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center active:scale-[0.96] active:duration-100
                ${isActive
                  ? 'liquid-glass-chip-active text-bronze-400 tactile-card-selected'
                  : 'opacity-80 hover:opacity-100'
                }`}
            >
              <svg width="40" height="40" viewBox="0 0 32 32" className="mb-2">
                <path
                  d="M8,30 C8,20 8,16 9,14 C10,12 11,11 16,11 C21,11 22,12 23,14 C24,16 24,20 24,30"
                  fill="none"
                  stroke="var(--border-color)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
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
  );
};
