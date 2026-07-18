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

import { useTheme } from './hooks/useTheme';
import { useScroll } from './hooks/useScroll';
import { useEasterEgg } from './hooks/useEasterEgg';
import { useBooking } from './hooks/useBooking';


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
  let currentEpoch = now.getTime();

  const next10Days = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(currentEpoch);

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

    const newDate = new Date(currentEpoch);
    newDate.setDate(newDate.getDate() + 1);
    currentEpoch = newDate.getTime();
  }

  return next10Days;
};

export default function App() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    localStorage.setItem('svtl-lang', lang);
  }, [lang]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(() => typeof window !== 'undefined' && !!window.L);

  useEffect(() => {
    if (leafletLoaded) return;

    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.L) {
        setLeafletLoaded(true);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [leafletLoaded]);

  const next10Days = useMemo(() => getNext10Days(lang), [lang]);

  const { theme, setTheme, isDayTheme, isNightTheme } = useTheme();
  const { isScrolled, isScrolledCapsule, showBackToTop } = useScroll();
  const { showGravityRestore, handleRestoreGravity, handleLogoClick } = useEasterEgg();

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
    totalPrice, totalTime, fmtTime,
    toggleService, toggleOption,
    handleCalculatorCta, handleSubmit, handleModalClose
  } = useBooking({ lang, t, next10Days });

  const scrollToServices = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative min-h-screen bg-transparent bg-grain text-[var(--text-primary)] font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950">

      {/* ═══════════ PREMIUM BACKGROUND LAYERS (fixed, behind everything) ═══════════ */}
      <div className="fluid-background" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle className="blob-1" cx="25" cy="30" r="28" fill="var(--blob-1)" />
          <circle className="blob-2" cx="75" cy="70" r="30" fill="var(--blob-2)" />
          <circle className="blob-3" cx="80" cy="20" r="25" fill="var(--blob-3)" />
          <circle className="blob-4" cx="20" cy="80" r="26" fill="var(--blob-4)" />
        </svg>
      </div>
      <div className="ambient-atmosphere" aria-hidden="true" />

      <div className="content-layer">
      {/* ═══════════ SCROLL PROGRESS BAR ═══════════ */}
      <ScrollProgressBar />

      {/* ═══════════ HEADER ═══════════ */}
      <Header
        theme={theme}
        setTheme={setTheme}
        isDayTheme={isDayTheme}
        isNightTheme={isNightTheme}
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
