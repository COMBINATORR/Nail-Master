import './i18n';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from 'lenis';

import { categories, nailShapes } from './data';
import { generateWhatsAppText } from './whatsapp';
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

  const [theme, setTheme] = useState(() => localStorage.getItem('svtl-theme') || 'dark');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nailShape, setNailShape] = useState('oval');
  const [visitMode, setVisitMode] = useState('relax');
  const [showGravityRestore, setShowGravityRestore] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(() => typeof window !== 'undefined' && !!window.L);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledCapsule, setIsScrolledCapsule] = useState(false);

    const clickTracker = useRef({ count: 0, lastClickTime: 0 });
  const affectedElements = useRef([]);

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

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {

          
          const backToTop = window.scrollY > 300;
          setShowBackToTop((prev) => (prev !== backToTop ? backToTop : prev));

          const scrolled = window.scrollY > 10;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          const scrolledCapsule = window.scrollY > 50;
          setIsScrolledCapsule((prev) => (prev !== scrolledCapsule ? scrolledCapsule : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeCategory, setActiveCategory] = useState('manicure');
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const next10Days = useMemo(() => getNext10Days(lang), [lang]);

  const systemPrefersDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches : true;

  const dayThemes = ['light', 'nudefashion', 'sage'];
  const nightThemes = ['dark', 'emerald', 'cyber'];

  const isDark = nightThemes.includes(theme) || (theme === 'system' && systemPrefersDark);
  const isDayTheme = dayThemes.includes(theme) || (theme === 'system' && !systemPrefersDark);
  const isNightTheme = nightThemes.includes(theme) || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    const themeClasses = ['theme-dark', 'theme-light', 'theme-emerald', 'theme-nudefashion', 'theme-sage', 'theme-cyber'];
    document.body.classList.remove(...themeClasses);
    
    let targetClass = `theme-${theme}`;
    if (theme === 'system') {
      targetClass = systemPrefersDark ? 'theme-dark' : 'theme-light';
    }
    document.body.classList.add(targetClass);

    document.body.classList.toggle('light', !isDark);
    localStorage.setItem('svtl-theme', theme);
  }, [theme, isDark, systemPrefersDark]);

  useEffect(() => {
    localStorage.setItem('svtl-lang', lang);
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') setTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.05
    });

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const playPowerDown = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.4);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    } catch (err) {
      // Audio playback is a non-critical enhancement.
      // It may fail due to browser autoplay policies (e.g., lack of user interaction).
      console.warn('Audio playback failed:', err);
    }
  };

  const playPowerUp = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(30, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.9);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch (err) {
      // Audio playback is a non-critical enhancement.
      // It may fail due to browser autoplay policies (e.g., lack of user interaction).
      console.warn('Audio playback failed:', err);
    }
  };

  const triggerGravityExplosion = () => {
    playPowerDown();
    setShowGravityRestore(true);
    
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'button', 'input', 'textarea', 'select',
      '.trust-card', '.service-category-card', '.portfolio-card', '.faq-item', '.contact-form',
      'footer p', 'footer .static-logo', 'header nav a', 'header .logo-container', 'header button'
    ];
    
    const els = document.querySelectorAll(selectors.join(', '));
    const list = [];
    
    const elementsToUpdate = [];

    // First pass: Read DOM (Layout) to avoid thrashing
    els.forEach((el) => {
      if (el.closest('.fixed') || el.classList.contains('fixed') || el.id === 'gravity-restore-btn') return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const deltaY = window.innerHeight - rect.bottom - (Math.random() * 30);
      const deltaX = (Math.random() - 0.5) * 50;
      const rotation = (Math.random() - 0.5) * 16;
      
      const origStyle = {
        transition: el.style.transition,
        transform: el.style.transform,
        pointerEvents: el.style.pointerEvents
      };
      
      elementsToUpdate.push({ el, deltaX, deltaY, rotation });
      list.push({ el, origStyle });
    });

    // Second pass: Write DOM (Styles)
    requestAnimationFrame(() => {
      elementsToUpdate.forEach(({ el, deltaX, deltaY, rotation }) => {
        el.style.transition = 'transform 1100ms cubic-bezier(0.5, 0.05, 0.9, 0.45)';
        el.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
        el.style.pointerEvents = 'none';
      });
    });
    
    affectedElements.current = list;
  };

  const handleRestoreGravity = () => {
    playPowerUp();
    clickTracker.current.count = 0;
    
    affectedElements.current.forEach(({ el }) => {
      el.style.transition = 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.transform = 'translate(0, 0) rotate(0deg)';
      el.style.pointerEvents = 'auto';
    });
    
    setTimeout(() => {
      affectedElements.current.forEach(({ el, origStyle }) => {
        el.style.transition = origStyle.transition;
        el.style.transform = origStyle.transform;
        el.style.pointerEvents = origStyle.pointerEvents;
      });
      affectedElements.current = [];
      setShowGravityRestore(false);
    }, 600);
  };

  const handleLogoClick = () => {
    const now = Date.now();
    const tracker = clickTracker.current;
    if (now - tracker.lastClickTime < 500) {
      tracker.count += 1;
    } else {
      tracker.count = 1;
    }
    tracker.lastClickTime = now;

    if (tracker.count === 5) {
      triggerGravityExplosion();
      tracker.count = 0;
    }
  };

  /* ─── Calculator ─── */
  const catObj = categories[activeCategory];

  const optionsById = useMemo(() => catObj?.options?.reduce((acc, opt) => {
    acc[opt.id] = opt;
    return acc;
  }, {}) || {}, [catObj]);

  const selectedServices = useMemo(() => catObj.services.filter(s => selectedServiceIds.includes(s.id)), [catObj, selectedServiceIds]);

  const totalPrice = useMemo(() => {
    const sPrice = selectedServices.reduce((sum, svc) => sum + svc.price, 0);
    const oPrice = selectedOptions.reduce((sum, id) => {
      const o = optionsById[id]; return sum + (o ? o.price : 0);
    }, 0);
    return sPrice + oPrice;
  }, [selectedServices, selectedOptions, optionsById]);

  const totalTime = useMemo(() => {
    const sTime = selectedServices.reduce((sum, svc) => sum + svc.time, 0);
    const oTime = selectedOptions.reduce((sum, id) => {
      const o = optionsById[id]; return sum + (o ? o.time : 0);
    }, 0);
    return sTime + oTime;
  }, [selectedServices, selectedOptions, optionsById]);

  const fmtTime = (m) => {
    const h = Math.floor(m / 60), mn = m % 60;
    const hl = t('hour_short', 'ч');
    const ml = t('min_short', 'мин');
    return `${h > 0 ? `${h} ${hl} ` : ''}${mn > 0 ? `${mn} ${ml}` : ''}`;
  };

  const toggleService = (id) => setSelectedServiceIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleOption = (id) => setSelectedOptions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleCalculatorCta = () => {
    document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || name.trim().length === 0 || name.length > 50) {
      alert(lang === 'en' ? 'Please enter a valid name (max 50 chars).' : lang === 'ru' ? 'Пожалуйста, введите корректное имя (до 50 символов).' : 'Жарамды есім енгізіңіз (ең көбі 50 таңба).');
      return;
    }
    const phoneClean = phone.replace(/[^0-9+]/g, '');
    if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 15) {
      alert(lang === 'en' ? 'Please enter a valid phone number.' : lang === 'ru' ? 'Пожалуйста, введите корректный номер телефона.' : 'Жарамды телефон нөмірін енгізіңіз.');
      return;
    }
    if (selectedServices.length === 0 && selectedOptions.length === 0) {
      alert(lang === 'en' ? 'Please select at least one service.' : lang === 'ru' ? 'Пожалуйста, выберите хотя бы одну услугу.' : 'Кем дегенде бір қызметті таңдаңыз.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert(lang === 'en' ? 'Please select a date and time.' : lang === 'ru' ? 'Пожалуйста, выберите дату и время.' : 'Күн мен уақытты таңдаңыз.');
      return;
    }
    setIsSubmitting(true);

    const waText = generateWhatsAppText({
      includeNameAndPhone: true,
      t: (key, defaultValue) => t(key, defaultValue),
      catObj,
      selectedServices,
      selectedOptions,
      optionsById,
      nailShape,
      nailShapes,
      activeCategory,
      lang,
      visitMode,
      next10Days,
      selectedDate,
      selectedTime,
      totalPrice,
      name,
      phone
    });
    const waUrl = `https://wa.me/77016698086?text=${encodeURIComponent(waText)}`;
    
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => { 
      setIsSubmitting(false); 
      setShowModal(true); 
    }, 1000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setName(''); 
    setPhone('');
  };

  const scrollToServices = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative min-h-screen bg-transparent bg-grain text-[var(--text-primary)] font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950">

      {/* ═══════════ PREMIUM BACKGROUND LAYERS (fixed, behind everything) ═══════════ */}
      <div className="fluid-background" aria-hidden="true">
        <svg className="w-full h-full opacity-65" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle className="blob-1" cx="25" cy="30" r="28" fill="var(--blob-1)" />
          <circle className="blob-2" cx="75" cy="70" r="30" fill="var(--blob-2)" />
          <circle className="blob-3" cx="80" cy="20" r="25" fill="var(--blob-3)" />
          <circle className="blob-4" cx="20" cy="80" r="26" fill="var(--blob-4)" />
        </svg>
      </div>

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
