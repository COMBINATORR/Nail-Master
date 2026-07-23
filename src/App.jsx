import './i18n';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowUpIcon } from './components/Icons';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { Calculator } from './components/Calculator';
import { Portfolio } from './components/Portfolio';
import { CareGuide } from './components/CareGuide';
import { Guarantees } from './components/Guarantees';
import { FaqSection } from './components/FaqSection';
import { LocationMap } from './components/LocationMap';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { SuccessModal } from './components/SuccessModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

import { ThemeProvider, useTheme } from './hooks/useTheme';
import { useScroll } from './hooks/useScroll';
import { useEasterEgg } from './hooks/useEasterEgg';
import { useBooking } from './hooks/useBooking';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import LightRays from './components/ui/LightRays';
import { getLightRaysProps } from './components/ui/lightRaysTheme';
import { canUseHeavyFx } from './lib/perf';


/* eslint-disable react-refresh/only-export-components */
export const getNext10Days = (lang) => {
  const daysOfWeek = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    kk: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    ko: ['일', '월', '화', '수', '목', '금', '토']
  };

  const currentLangDays = daysOfWeek[lang] || daysOfWeek.kk;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const next10Days = [];
  const date = new Date(now.getTime());

  for (let i = 0; i < 10; i++) {
    const dayNum = date.getDate();
    const monthNum = date.getMonth() + 1;
    const monthStr = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    const dayOfWeekIndex = date.getDay();

    const weekday = currentLangDays[dayOfWeekIndex];

    const dayNumStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const formattedDate = `${dayNumStr}.${monthStr}`;
    const id = `${date.getFullYear()}-${monthStr}-${dayNumStr}`;

    next10Days.push({
      id,
      dayNum,
      weekday,
      formatted: formattedDate
    });

    date.setDate(date.getDate() + 1);
  }

  return next10Days;
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useDocumentMeta();

  useEffect(() => {
    localStorage.setItem('svtl-lang', lang);
  }, [lang]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(() => typeof window !== 'undefined' && !!window.L);

  useEffect(() => {
    if (leafletLoaded) return;

    let cancelled = false;
    const tryMark = () => {
      if (!cancelled && typeof window !== 'undefined' && window.L) {
        setLeafletLoaded(true);
        return true;
      }
      return false;
    };

    if (tryMark()) return undefined;

    // Prefer load event (Jules #77); sparse poll only as fallback for late CDN scripts
    const onLoad = () => {
      tryMark();
    };
    window.addEventListener('load', onLoad);

    const interval = setInterval(() => {
      if (tryMark()) clearInterval(interval);
    }, 250);
    const maxTimer = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      clearInterval(interval);
      clearTimeout(maxTimer);
    };
  }, [leafletLoaded]);

  const next10Days = useMemo(() => getNext10Days(lang), [lang]);

  const { theme, setTheme, isDayTheme, isNightTheme } = useTheme();
  const { isScrolled, isScrolledCapsule, showBackToTop } = useScroll();
  const { showGravityRestore, handleRestoreGravity, handleLogoClick } = useEasterEgg();
  // Light Rays: dark themes + desktop only (WebGL heats phones)
  const [allowHeavyFx, setAllowHeavyFx] = useState(() =>
    typeof window !== 'undefined' ? canUseHeavyFx() : false,
  );

  useEffect(() => {
    const update = () => setAllowHeavyFx(canUseHeavyFx());
    update();
    const mq = window.matchMedia('(max-width: 768px)');
    const mq2 = window.matchMedia('(pointer: coarse)');
    mq.addEventListener?.('change', update);
    mq2.addEventListener?.('change', update);
    return () => {
      mq.removeEventListener?.('change', update);
      mq2.removeEventListener?.('change', update);
    };
  }, []);

  const showLightRays = isNightTheme && allowHeavyFx;
  const lightRaysProps = useMemo(
    () => (showLightRays ? getLightRaysProps(theme) : null),
    [theme, showLightRays],
  );

  const {
    activeCategory, setActiveCategory,
    selectedServiceIds,
    selectedOptions,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    phone, setPhone,
    name, setName,
    showModal,
    isSubmitting,
    nailShape, setNailShape,
    visitMode, setVisitMode,
    selectedServices, optionsById,
    categoryCounts, needsNailShape,
    totalPrice, totalTime, fmtTime,
    toggleService, toggleOption,
    handleCalculatorCta, handleSubmit, handleModalClose
  } = useBooking({ lang, t, next10Days });

  const scrollToServices = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-transparent bg-grain text-[var(--text-primary)] font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950">

      {/* ═══════════ BACKGROUND: Light Rays on dark themes only ═══════════ */}
      <div className="light-rays-layer" aria-hidden="true">
        <div className="light-rays-layer__base" />
        {showLightRays && lightRaysProps && (
          <LightRays key={theme} {...lightRaysProps} />
        )}
      </div>

      <div className="content-layer">
      {/* ═══════════ SCROLL PROGRESS BAR ═══════════ */}
      <ScrollProgressBar />

      {/* ═══════════ HEADER ═══════════ */}
      <Header
        theme={theme}
        setTheme={setTheme}
        isDayTheme={isDayTheme}
        isNightTheme={isNightTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isScrolled={isScrolled}
        isScrolledCapsule={isScrolledCapsule}
        handleLogoClick={handleLogoClick}
      />

      {/* ═══════════ HERO ═══════════ */}
      <div className="reveal-item">
        <Hero
          scrollToServices={scrollToServices}
        />
      </div>

      {/* ═══════════ TRUST ═══════════ */}
      <div className="reveal-item">
        <Trust />
      </div>

      {/* ═══════════ SERVICES CALCULATOR ═══════════ */}
      <div className="reveal-item">
        <Calculator
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedServiceIds={selectedServiceIds}
          toggleService={toggleService}
          selectedOptions={selectedOptions}
          toggleOption={toggleOption}
          nailShape={nailShape}
          setNailShape={setNailShape}
          totalPrice={totalPrice}
          totalTime={totalTime}
          fmtTime={fmtTime}
          handleCalculatorCta={handleCalculatorCta}
          selectedServices={selectedServices}
          optionsById={optionsById}
          categoryCounts={categoryCounts}
          needsNailShape={needsNailShape}
        />
      </div>

      {/* ═══════════ PORTFOLIO BEFORE/AFTER SLIDER ═══════════ */}
      <div className="reveal-item">
        <Portfolio />
      </div>

      {/* ═══════════ CLIENT CARE GUIDE ═══════════ */}
      <div className="reveal-item">
        <CareGuide />
      </div>

      {/* ═══════════ GUARANTEES ═══════════ */}
      <div className="reveal-item">
        <Guarantees />
      </div>

      {/* ═══════════ FAQ ═══════════ */}
      <div className="reveal-item">
        <FaqSection />
      </div>

      {/* ═══════════ LOCATION MAP ═══════════ */}
      <div className="reveal-item">
        <LocationMap
          theme={theme}
          isNightTheme={isNightTheme}
          leafletLoaded={leafletLoaded}
        />
      </div>

      {/* ═══════════ BOOKING FORM ═══════════ */}
      <div className="reveal-item">
        <BookingForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          next10Days={next10Days}
          visitMode={visitMode}
          setVisitMode={setVisitMode}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          selectedServices={selectedServices}
          selectedOptions={selectedOptions}
          optionsById={optionsById}
          totalPrice={totalPrice}
          totalTime={totalTime}
          fmtTime={fmtTime}
        />
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <div className="reveal-item">
        <Footer />
      </div>

      {/* ═══════════ SUCCESS MODAL ═══════════ */}
      <SuccessModal
        showModal={showModal}
        handleModalClose={handleModalClose}
      />

      {/* ═══════════ MOBILE MENU OVERLAY ═══════════ */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
        isDayTheme={isDayTheme}
        isNightTheme={isNightTheme}
      />

      {/* ═══════════ ELEGANT BACK TO TOP BUTTON ═══════════ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center btn-tactile-circle text-bronze-500
          ${showBackToTop 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
          }
          backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      </div>{/* /.content-layer */}

            {/* ═══════════ GRAVITY EXPLOSION RESTORE BUTTON ═══════════ */}
      {showGravityRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pointer-events-none">
          <button
            id="gravity-restore-btn"
            onClick={handleRestoreGravity}
            className="pointer-events-auto px-6 py-4 bg-charcoal-900/95 border border-bronze-500/30 text-bronze-500 hover:text-bronze-400 font-bold uppercase tracking-wider text-xs rounded-xl shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 animate-fadeIn"
            style={{ 
              boxShadow: '0 0 30px rgba(197, 160, 89, 0.25)',
              cursor: 'pointer'
            }}
          >
            Включить Антигравитацию (SPCWLKR Engine)
          </button>
        </div>
      )}
    </div>
  );
}
