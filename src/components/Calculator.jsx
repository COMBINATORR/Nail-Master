import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { CategorySelector } from './calculator/CategorySelector';
import { ServiceList } from './calculator/ServiceList';
import { NailShapeSelector } from './calculator/NailShapeSelector';
import { ExtraOptions } from './calculator/ExtraOptions';
import { CalculatorSummary } from './calculator/CalculatorSummary';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
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
  optionsById,
  categoryCounts = {},
  needsNailShape = false,
}) => {
  const { t } = useTranslation();
  const catObj = categories[activeCategory];
  const hasSelection = selectedServices.length > 0 || selectedOptions.length > 0;
  const isSugaring = activeCategory === 'sugaring';

  const mobileSteps = useMemo(() => {
    const steps = [
      { id: 'service', label: t('calcStepService') },
    ];
    if (!isSugaring) {
      steps.push({ id: 'shape', label: t('calcStepShape') });
    }
    steps.push(
      { id: 'options', label: t('calcStepOptions') },
      { id: 'summary', label: t('calcStepSummary') },
    );
    return steps;
  }, [isSugaring, t]);

  const [mobileStep, setMobileStep] = useState(0);

  // Reset / clamp step when category changes (e.g. shape step disappears on sugaring)
  useEffect(() => {
    setMobileStep((s) => Math.min(s, mobileSteps.length - 1));
  }, [activeCategory, mobileSteps.length]);

  const currentStep = mobileSteps[mobileStep] || mobileSteps[0];
  const isLastStep = mobileStep >= mobileSteps.length - 1;
  const isFirstStep = mobileStep <= 0;

  const canNextFromService = hasSelection;

  const onMobileNext = () => {
    if (currentStep?.id === 'service' && !canNextFromService) return;
    setMobileStep((s) => Math.min(s + 1, mobileSteps.length - 1));
  };

  const onMobileBack = () => {
    setMobileStep((s) => Math.max(s - 1, 0));
  };

  const goToStep = (index) => {
    if (index < mobileStep) setMobileStep(index);
  };

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setMobileStep(0);
  };

  const sharedListProps = {
    catObj,
    selectedServiceIds,
    toggleService,
    fmtTime,
  };

  return (
    <section id="services" className={`border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex justify-center mb-4">
          <span className="liquid-glass-pill font-display text-[8px] tracking-[0.2em] text-bronze-500 font-bold uppercase px-3 py-0.5 rounded-full">
            {t('servicesPill')}
          </span>
        </div>
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2 text-center`}>
          {t('servicesTitle')}
        </h2>
        <p className={`${textSecondary} text-sm mb-8 lg:mb-10 text-center max-w-2xl mx-auto`}>
          {t('servicesSubtitle')}
        </p>

        {/* ─── DESKTOP: full two-column layout ─── */}
        <div className="hidden lg:block" data-testid="calc-desktop">
          <CategorySelector
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categoryCounts={categoryCounts}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div key={activeCategory} className="space-y-8 calc-panel-enter">
              <ServiceList {...sharedListProps} />
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
              nailShape={nailShape}
              needsNailShape={needsNailShape}
              hasSelection={hasSelection}
              showMobileBar={false}
            />
          </div>
        </div>

        {/* ─── MOBILE: stepped wizard (like booking) ─── */}
        <div className="lg:hidden" data-testid="calc-mobile">
          <div className="liquid-glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-5 flex-wrap">
              {mobileSteps.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => goToStep(idx)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                      ${mobileStep === idx
                        ? 'liquid-glass-chip liquid-glass-chip-active text-[var(--text-primary)]'
                        : mobileStep > idx
                          ? 'liquid-glass-chip text-bronze-400 cursor-pointer'
                          : 'text-[var(--text-muted)] opacity-70'
                      }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="hidden xs:inline sm:inline max-w-[4.5rem] truncate">{s.label}</span>
                  </button>
                  {idx < mobileSteps.length - 1 && (
                    <span className="w-3 sm:w-5 h-px bg-[var(--border-color)] opacity-60" />
                  )}
                </div>
              ))}
            </div>

            {/* Live mini total */}
            <div className="liquid-glass rounded-xl p-3 mb-5 text-left">
              <span className="text-bronze-400 font-bold block mb-1 uppercase tracking-wider text-[9px]">
                {t('servicesTotal')}
              </span>
              {hasSelection ? (
                <p className={`text-xs ${textPrimary} font-semibold tabular-nums`}>
                  {totalPrice.toLocaleString()} ₸
                  {totalTime > 0 ? ` · ≈ ${fmtTime(totalTime)}` : ''}
                  <span className={`${textMuted} font-medium`}>
                    {' · '}
                    {selectedServices.length + selectedOptions.length} {t('servicesItems')}
                  </span>
                </p>
              ) : (
                <p className={`text-xs ${textMuted}`}>{t('servicesEmptyHint')}</p>
              )}
            </div>

            <div key={`${activeCategory}-${currentStep?.id}`} className="calc-panel-enter min-h-[12rem]">
              {currentStep?.id === 'service' && (
                <div className="space-y-5">
                  <CategorySelector
                    activeCategory={activeCategory}
                    setActiveCategory={handleCategoryChange}
                    categoryCounts={categoryCounts}
                  />
                  <ServiceList {...sharedListProps} hideHeader />
                </div>
              )}

              {currentStep?.id === 'shape' && (
                <NailShapeSelector
                  activeCategory={activeCategory}
                  nailShape={nailShape}
                  setNailShape={setNailShape}
                  hideHeader
                />
              )}

              {currentStep?.id === 'options' && (
                <ExtraOptions
                  activeCategory={activeCategory}
                  catObj={catObj}
                  selectedOptions={selectedOptions}
                  toggleOption={toggleOption}
                  fmtTime={fmtTime}
                  hideHeader
                />
              )}

              {currentStep?.id === 'summary' && (
                <CalculatorSummary
                  selectedServices={selectedServices}
                  selectedOptions={selectedOptions}
                  optionsById={optionsById}
                  totalPrice={totalPrice}
                  totalTime={totalTime}
                  fmtTime={fmtTime}
                  handleCalculatorCta={handleCalculatorCta}
                  nailShape={nailShape}
                  needsNailShape={needsNailShape}
                  hasSelection={hasSelection}
                  showMobileBar={false}
                  compact
                  hideBadges
                />
              )}
            </div>

            {/* Nav */}
            {!isLastStep && (
              <div className="flex gap-2 mt-6">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={onMobileBack}
                    className="liquid-glass flex-1 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all hover:scale-[1.02]"
                  >
                    {t('formStepBack')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onMobileNext}
                  disabled={currentStep?.id === 'service' && !canNextFromService}
                  className={`flex-[1.4] btn-premium-tactile disabled:opacity-40 disabled:cursor-not-allowed py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all border-beam-active ${isFirstStep ? 'w-full flex-1' : ''}`}
                >
                  {t('formStepNext')}
                </button>
              </div>
            )}

            {isLastStep && !isFirstStep && (
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={onMobileBack}
                  className="liquid-glass flex-1 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all hover:scale-[1.02]"
                >
                  {t('formStepBack')}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileStep(0)}
                  className="liquid-glass flex-1 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all hover:scale-[1.02]"
                >
                  {t('calcAddMore')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
