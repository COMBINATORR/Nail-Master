import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { CategorySelector } from './calculator/CategorySelector';
import { ServiceList } from './calculator/ServiceList';
import { NailShapeSelector } from './calculator/NailShapeSelector';
import { ExtraOptions } from './calculator/ExtraOptions';
import { CalculatorSummary } from './calculator/CalculatorSummary';

const bgAlt = 'bg-[var(--bg-alt)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

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
  const { t } = useTranslation();
  const catObj = categories[activeCategory];

  return (
    <section id="services" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2 text-center`}>{t('servicesTitle')}</h2>
        <p className={`${textSecondary} text-sm mb-10 text-center max-w-2xl mx-auto`}>{t('servicesSubtitle')}</p>

        <CategorySelector
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <ServiceList
              catObj={catObj}
              selectedServiceIds={selectedServiceIds}
              toggleService={toggleService}
              fmtTime={fmtTime}
            />

            <NailShapeSelector
              activeCategory={activeCategory}
              nailShape={nailShape}
              setNailShape={setNailShape}
            />

            <ExtraOptions
              activeCategory={activeCategory}
              catObj={catObj}
              selectedOptions={selectedOptions}
              toggleOption={toggleOption}
              fmtTime={fmtTime}
            />
          </div>

          <CalculatorSummary
            selectedServices={selectedServices}
            selectedOptions={selectedOptions}
            optionsById={optionsById}
            totalPrice={totalPrice}
            totalTime={totalTime}
            fmtTime={fmtTime}
            handleCalculatorCta={handleCalculatorCta}
          />
        </div>
      </div>
    </section>
  );
};
