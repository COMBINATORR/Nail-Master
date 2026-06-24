import { useState, useEffect, useRef, useMemo } from 'react';

import { works, categories, translations, nailShapes, faqData, careTipsData } from './data';
import { generateWhatsAppText } from './whatsapp';
import {
  CheckIcon,
  ChevronDownIcon,
  InstagramIcon,
  WhatsAppIcon,
  PhoneIcon,
  SunIcon,
  MoonIcon,
  ShieldIcon,
  NailPolishIcon,
  ScissorsIcon,
  NailFileIcon,
  CreamIcon,
  LipIcon,
  CombIcon,
  MirrorIcon,
  MenuIcon,
  CloseIcon,
  ArrowUpIcon
} from './components/Icons';




let isConsoleMessagePrinted = false;

const daysOfWeekRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const daysOfWeekKk = ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'];
const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let cachedToday = null;
let cachedDaysEn = null;
let cachedDaysRu = null;
let cachedDaysKk = null;

const getNext10Days = (lang) => {
  const now = new Date();
  const dateStr = now.toDateString();

  if (cachedToday !== dateStr) {
    cachedToday = dateStr;
    cachedDaysEn = [];
    cachedDaysRu = [];
    cachedDaysKk = [];

    now.setHours(0, 0, 0, 0);
    let currentEpoch = now.getTime();

    for (let i = 0; i < 10; i++) {
      const date = new Date(currentEpoch);

      const dayNum = date.getDate();
      const monthNum = date.getMonth() + 1;
      const monthStr = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
      const dayOfWeekIndex = date.getDay();

      const weekdayRu = daysOfWeekRu[dayOfWeekIndex];
      const weekdayKk = daysOfWeekKk[dayOfWeekIndex];
      const weekdayEn = daysOfWeekEn[dayOfWeekIndex];

      const dayNumStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
      const formattedDate = `${dayNumStr}.${monthStr}`;
      const id = `${date.getFullYear()}-${monthStr}-${dayNumStr}`;

      cachedDaysEn.push({
        id,
        dayNum,
        weekday: weekdayEn,
        formatted: formattedDate
      });
      cachedDaysRu.push({
        id,
        dayNum,
        weekday: weekdayRu,
        formatted: formattedDate
      });
      cachedDaysKk.push({
        id,
        dayNum,
        weekday: weekdayKk,
        formatted: formattedDate
      });

      const newDate = new Date(currentEpoch);
      newDate.setDate(newDate.getDate() + 1);
      currentEpoch = newDate.getTime();
    }
  }

  if (lang === 'en') return cachedDaysEn;
  if (lang === 'ru') return cachedDaysRu;
  return cachedDaysKk;
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('svtl-lang') || 'ru');
  const [theme, setTheme] = useState(() => localStorage.getItem('svtl-theme') || 'dark');
  const [activeFaq, setActiveFaq] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [nailShape, setNailShape] = useState('oval');
  const [visitMode, setVisitMode] = useState('relax');
  const langPopupRef = useRef(null);
  const themePopupRef = useRef(null);
  const logoRef = useRef(null);
  const [showGravityRestore, setShowGravityRestore] = useState(false);
  const clickTracker = useRef({ count: 0, lastClickTime: 0 });
  const affectedElements = useRef([]);
  const mapInstanceRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCareTab, setActiveCareTab] = useState('manicure');
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

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            setScrollProgress((window.scrollY / totalScroll) * 100);
          } else {
            setScrollProgress(0);
          }
          setShowBackToTop(window.scrollY > 300);

          if (logoRef.current) {
            if (window.scrollY > 10) {
              logoRef.current.classList.add('active');
            } else {
              logoRef.current.classList.remove('active');
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount to handle initial page load scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeCategory, setActiveCategory] = useState('manicure');
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const [activeWork, setActiveWork] = useState(0);

  const next10Days = useMemo(() => getNext10Days(lang), [lang]);

  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    handleSliderMove(clientX);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleSliderMove(clientX);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove, { passive: true });
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

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

  useEffect(() => { localStorage.setItem('svtl-lang', lang); }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.L) return;
    const L = window.L;

    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const mapNode = document.getElementById('studio-map');
      if (!mapNode) return;

      // Clear any pre-existing Leaflet instance on this DOM node to avoid "Map container is already initialized" crash
      if (mapNode._leaflet_id) {
        const parent = mapNode.parentNode;
        if (parent) {
          const newMapNode = document.createElement('div');
          newMapNode.id = 'studio-map';
          newMapNode.className = 'w-full h-full';
          parent.replaceChild(newMapNode, mapNode);
        }
      }

      const map = L.map('studio-map', {
        center: [47.092838, 51.920108],
        zoom: 17,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const tileUrl = isNightTheme
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 20
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'map-custom-marker',
        html: `
          <div class="marker-pulse-wrapper">
            <div class="marker-pulse"></div>
            <div class="marker-dot"></div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([47.092838, 51.920108], { icon: customIcon }).addTo(map);

      const popupTexts = {
        ru: '<b>Shade Studio</b><br/>Проспект Азаттык 93',
        kk: '<b>Shade Studio</b><br/>Азаттық даңғылы 93',
        en: '<b>Shade Studio</b><br/>93 Azattyk Avenue'
      };
      marker.bindPopup(popupTexts[lang] || popupTexts['ru']).openPopup();
    } catch (error) {
      console.error('Leaflet Map Initialization Error:', error);
    }

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      } catch (error) {
        console.error('Leaflet Cleanup Error:', error);
      }
    };
  }, [theme, lang, isNightTheme, leafletLoaded]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') setTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

    useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) setShowLangPopup(false);
      if (themePopupRef.current && !themePopupRef.current.contains(e.target)) setShowThemeMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!isConsoleMessagePrinted) {
      console.log(
        "%c🚀 Powered by SPCWLKR Digital Studio %c\n\nПонравился чистый код, скорость и кастомные микро-интерактивы этого сайта?\nЭтот интерфейс спроектирован в невесомости на передовом технологическом стеке.\n\nИщете кастомное цифровое решение для вашего бизнеса?\n💬 Telegram: @grokhunter\n💼 Портфолио: в разработке...\n",
        "background: #0a0b0d; color: #22d3ee; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);",
        "color: #9ca3af; font-size: 12px; font-family: monospace;"
      );
      isConsoleMessagePrinted = true;
    }
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
      console.log("Audio play failed:", err);
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
      console.log("Audio play failed:", err);
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
      
      el.style.transition = 'transform 1100ms cubic-bezier(0.5, 0.05, 0.9, 0.45)';
      el.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
      el.style.pointerEvents = 'none';
      
      list.push({ el, origStyle });
    });
    
    affectedElements.current = list;
  };

  const handleRestoreGravity = () => {
    playPowerUp();
    clickTracker.current.count = 0;
    
    affectedElements.current.forEach(({ el }) => {
      el.style.transition = 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.transform = 'none';
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

    /* ─── Theme-aware class helpers ─── */
  const bg       = 'bg-transparent';
  const bgDeep   = 'bg-[var(--bg-deep)]';
  const bgCard   = 'bg-[var(--bg-card)]';
  const bgSubtle = 'bg-[var(--bg-subtle)]';
  const bgHeader = 'bg-[var(--bg-header)]';
  const bgAlt    = 'bg-[var(--bg-alt)]';

  const textPrimary   = 'text-[var(--text-primary)]';
  const textSecondary = 'text-[var(--text-secondary)]';
  const textMuted     = 'text-[var(--text-muted)]';
  const logoColorClass = 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-[.active]:text-[var(--text-primary)]';
  const textFaint     = 'text-[var(--text-muted)]/60';

  const border       = 'border-[var(--border-color)]';
  const borderSubtle = 'border-[var(--border-subtle)]';

  /* ─── Data ─── */

  const t = translations[lang] || translations['ru'];

  /* ─── Calculator ─── */
  const catObj = categories[activeCategory];

  const optionsById = catObj?.options?.reduce((acc, opt) => {
    acc[opt.id] = opt;
    return acc;
  }, {}) || {};

  const selectedServices = catObj.services.filter(s => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((s, svc) => s + svc.price, 0) + selectedOptions.reduce((s, id) => {
    const o = optionsById[id]; return s + (o ? o.price : 0);
  }, 0);
  const totalTime = selectedServices.reduce((s, svc) => s + svc.time, 0) + selectedOptions.reduce((s, id) => {
    const o = optionsById[id]; return s + (o ? o.time : 0);
  }, 0);
  const fmtTime = (m) => {
    const h = Math.floor(m / 60), mn = m % 60;
    const hl = lang === 'en' ? 'h.' : lang === 'ru' ? 'ч.' : 'сағ.';
    const ml = lang === 'en' ? 'min.' : 'мин.';
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
      t,
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
    
    // Direct user-action link navigation to prevent browser popup block
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

  const renderFaqCard = (item, i, keyPrefix) => {
    const isOpen = activeFaq === i;
    return (
      <div key={`${keyPrefix}-${i}`} className={`${bgCard} border ${borderSubtle} rounded-2xl overflow-hidden transition-all duration-300`}>
        <button onClick={() => setActiveFaq(isOpen ? null : i)}
          className="w-full flex justify-between items-center p-5 text-left hover:text-bronze-500 transition-colors">
          <span className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>{item.q}</span>
          <ChevronDownIcon className={`flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-bronze-500' : textMuted}`} />
        </button>
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 border-t ' + borderSubtle : 'max-h-0'}`} style={{ overflow: 'hidden' }}>
          <div className={`p-5 ${textSecondary} text-sm leading-relaxed ${bgSubtle}`}>{item.a}</div>
        </div>
      </div>
    );
  };

  /* ─── RENDER ─── */
    return (
    <div className={`relative min-h-screen ${bg} bg-grain text-[var(--text-primary)] font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950`}>

      {/* ═══════════ PREMIUM BACKGROUND LAYERS (fixed, behind everything) ═══════════ */}
      <div className="fluid-background" aria-hidden="true">
        <svg className="w-full h-full opacity-65" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Blob 1 */}
          <circle className="blob-1" cx="25" cy="30" r="28" fill="var(--blob-1)" />
          {/* Blob 2 */}
          <circle className="blob-2" cx="75" cy="70" r="30" fill="var(--blob-2)" />
          {/* Blob 3 */}
          <circle className="blob-3" cx="80" cy="20" r="25" fill="var(--blob-3)" />
          {/* Blob 4 */}
          <circle className="blob-4" cx="20" cy="80" r="26" fill="var(--blob-4)" />
        </svg>
      </div>

      {/* ═══════════ SCROLL PROGRESS BAR ═══════════ */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-bronze-700 via-bronze-400 to-bronze-200 z-[100] pointer-events-none" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* ═══════════ HEADER — full width on desktop ═══════════ */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl ${bgHeader} border-b ${border} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center relative">
          {/* Sandwich menu (Left side, visible on both mobile and desktop) */}
          <button onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[var(--text-secondary)] hover:text-bronze-500 transition-all z-10 cursor-pointer"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Logo with hover SVG neon animation (Absolute-centered on all screens) */}
          <div 
            ref={logoRef}
            className="logo-container group !absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleLogoClick}
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="logo-svg">
              {/* Monumental Serif Text Base S */}
              <text 
                x="16" 
                y="16" 
                className={`logo-base-text transition-colors duration-300 ${logoColorClass}`}
              >
                S
              </text>
            </svg>
            
            {/* Floating text underlay */}
            <div className="logo-details">
              <div className="logo-line"></div>
              <span className="logo-subtext">
                Nails &amp; Aesthetic
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 z-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden sm:inline-flex p-2 text-[var(--text-secondary)] instagram-glow-hover">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hidden sm:inline-flex p-2 text-[var(--text-secondary)] whatsapp-glow-hover">
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <div className="hidden sm:block h-5 w-px bg-[var(--border-color)] mx-0.5" />
            
            {/* Appearance switch popover dropdown */}
            <div className="relative" ref={themePopupRef}>
              <button onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 text-[var(--text-secondary)] hover:text-bronze-500 transition-all flex items-center"
                title={lang === 'ru' ? 'Внешний вид' : lang === 'kk' ? 'Сыртқы түрі' : 'Appearance'}>
                {isDayTheme ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
              </button>
              {showThemeMenu && (
                <div className={`absolute right-0 top-full mt-2 ${bgHeader} border ${border} rounded-2xl shadow-2xl p-4 min-w-[220px] z-50 popup-backdrop animate-fadeIn ${textPrimary} backdrop-blur-xl`}>
                  <div className="flex p-1 mb-4 tactile-container">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'btn-switch-active-day' : `${textMuted} hover:${textPrimary} border border-transparent`}`}
                    >
                      <SunIcon className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'День' : lang === 'kk' ? 'Күн' : 'Day'}</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'btn-switch-active-night' : `${textMuted} hover:${textPrimary} border border-transparent`}`}
                    >
                      <MoonIcon className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'Ночь' : lang === 'kk' ? 'Түн' : 'Night'}</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${textMuted} mb-2`}>
                      {lang === 'ru' ? 'Премиум палитры' : lang === 'kk' ? 'Премиум палитралар' : 'Premium Palettes'}
                    </div>
                    
                    <button 
                      onClick={() => setTheme('emerald')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'emerald' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#061F17' }}></span>
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#F1E4C3' }}></span>
                        </span>
                        <span>Emerald Spa</span>
                      </div>
                      {theme === 'emerald' && <span className="text-emerald-400">✓</span>}
                    </button>

                    <button 
                      onClick={() => setTheme('nudefashion')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'nudefashion' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#F4EFEA' }}></span>
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#2B2927' }}></span>
                        </span>
                        <span>Fashion Nude</span>
                      </div>
                      {theme === 'nudefashion' && <span className="text-neutral-400">✓</span>}
                    </button>

                    <button 
                      onClick={() => setTheme('sage')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'sage' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#F0F2EE' }}></span>
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#4A5D4E' }}></span>
                        </span>
                        <span>Sage Eco</span>
                      </div>
                      {theme === 'sage' && <span className="text-green-400">✓</span>}
                    </button>

                    <button 
                      onClick={() => setTheme('cyber')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'cyber' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#0D0B14' }}></span>
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#22D3EE' }}></span>
                        </span>
                        <span>Cyber Beauty</span>
                      </div>
                      {theme === 'cyber' && <span className="text-cyan-400">✓</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Divider between theme and language */}
            <div className="h-4 w-px bg-[var(--border-color)] mx-1" />
            
            {/* Language selector */}
            <div className="relative" ref={langPopupRef}>
              <button onClick={() => setShowLangPopup(!showLangPopup)}
                className="p-2 text-[var(--text-secondary)] hover:text-bronze-500 transition-all flex items-center">
                <span className="text-xs font-bold uppercase tracking-widest">{lang === 'ru' ? 'RU' : lang === 'kk' ? 'KZ' : 'EN'}</span>
              </button>
              {showLangPopup && (
                <div className={`absolute right-0 top-full mt-2 ${bgHeader} border ${border} rounded-2xl shadow-2xl p-4 min-w-[180px] z-50 popup-backdrop animate-fadeIn ${textPrimary} backdrop-blur-xl space-y-2`}>
                  <div className={`text-[10px] uppercase font-bold tracking-wider ${textMuted} mb-2`}>
                    {lang === 'ru' ? 'Выбор языка' : lang === 'kk' ? 'Тілді таңдау' : 'Select Language'}
                  </div>

                  <button onClick={() => { setLang('ru'); setShowLangPopup(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'ru' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                    <div className="flex items-center gap-2">
                      <span>🇷🇺</span>
                      <span>Русский</span>
                    </div>
                    {lang === 'ru' && <span className="text-bronze-400">✓</span>}
                  </button>

                  <button onClick={() => { setLang('kk'); setShowLangPopup(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'kk' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                    <div className="flex items-center gap-2">
                      <span>🇰🇿</span>
                      <span>Қазақша</span>
                    </div>
                    {lang === 'kk' && <span className="text-bronze-400">✓</span>}
                  </button>

                  <button onClick={() => { setLang('en'); setShowLangPopup(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'en' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span>English</span>
                    </div>
                    {lang === 'en' && <span className="text-bronze-400">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ HERO — two-column on desktop ═══════════ */}
      <section className={`relative overflow-hidden border-b ${border}`}>
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-bronze-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-bronze-700/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 pt-12 pb-14 lg:pt-20 lg:pb-24">
            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center border border-bronze-500/30 bg-bronze-500/5 px-3 py-1 rounded-full mb-5">
                <span className="text-bronze-300 font-bold tracking-widest text-[9px] uppercase">{t.heroSuperTitle}</span>
              </div>
              <h1 className={`font-display font-black tracking-tighter ${textPrimary} leading-[1.05] uppercase mb-5
                             text-4xl sm:text-5xl lg:text-6xl xl:text-7xl`}>
                {t.heroTitle}
              </h1>
              <div className="border border-bronze-500/20 bg-bronze-950/20 rounded-xl p-3 mb-6 inline-block">
                <span className="text-bronze-400 font-sans font-bold text-xs tracking-wider uppercase">{t.heroSubtitle}</span>
              </div>
              <p className={`${textSecondary} text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8`}>{t.heroDesc}</p>
              <button onClick={scrollToServices} id="hero-cta-btn"
                className="w-full lg:w-auto btn-premium-tactile px-8 py-4 rounded-xl text-xs uppercase transition-all duration-300">
                {t.heroCta}
              </button>
            </div>

            {/* Right: stat cards (desktop only) */}
            <div className="hidden lg:grid grid-cols-1 gap-4 w-72 xl:w-80 flex-shrink-0">
              {[
                { 
                  num: '28', 
                  unit: lang === 'en' ? 'days' : lang === 'ru' ? 'дней' : 'күн', 
                  label: lang === 'en' ? 'coating guarantee' : lang === 'ru' ? 'гарантия покрытия' : 'жабын кепілдігі' 
                },
                { 
                  num: '100%', 
                  unit: '', 
                  label: lang === 'en' ? 'disposable consumables' : lang === 'ru' ? 'одноразовые расходники' : 'бір реттік шығын материалдары' 
                },
                { 
                  num: '0 ₸', 
                  unit: '', 
                  label: lang === 'en' ? 'hidden charges' : lang === 'ru' ? 'скрытых доплат' : 'жасырын үстемелер' 
                },
              ].map((s, i) => (
                <div key={i} className={`${bgCard} border ${border} rounded-2xl p-5 hover:border-bronze-500/30 transition-all`}>
                  <div className={`font-display font-black text-3xl ${textPrimary} mb-0.5`}>
                    {s.num} <span className="text-bronze-500 text-lg">{s.unit}</span>
                  </div>
                  <div className={`text-xs ${textMuted} uppercase tracking-wider font-bold`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST ═══════════ */}
      <section id="trust" className={`border-b ${border} py-14 lg:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>{t.trustTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: t.trust1Title, desc: t.trust1Desc },
              { num: '02', title: t.trust2Title, desc: t.trust2Desc },
              { num: '03', title: t.trust3Title, desc: t.trust3Desc },
            ].map((card) => (
              <div key={card.num} className={`border ${border} rounded-2xl p-6 ${bgCard} hover:border-bronze-500/25 transition-all group`}>
                <span className="font-display font-black text-4xl text-bronze-500/40 group-hover:text-bronze-500/70 transition-colors leading-none block mb-3">{card.num}</span>
                <h3 className={`font-display font-bold text-sm tracking-wider uppercase ${textPrimary} mb-2`}>{card.title}</h3>
                <p className={`${textSecondary} text-sm leading-relaxed`}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES CALCULATOR ═══════════ */}
      <section id="services" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>{t.servicesTitle}</h2>
          <p className={`${textSecondary} text-sm mb-10`}>{t.servicesSubtitle}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-8 mx-auto max-w-max p-1 rounded-2xl tactile-container">
            {Object.values(categories).map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedServiceIds([]);
                    setSelectedOptions([]);
                  }}
                  className={`px-6 py-3 rounded-xl font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'active-tactile-pill scale-[1.02]' 
                      : 'border border-transparent hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  {t[cat.nameKey]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left col: selection */}
            <div className="space-y-8">
              {/* Base services */}
              <div>
                <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">{t.servicesSelectBase}</h3>
                <div className="space-y-3">
                  {catObj.services.map((svc) => {
                    const isActive = selectedServiceIds.includes(svc.id);
                    return (
                      <div key={svc.id} onClick={() => toggleService(svc.id)}
                        className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden bg-[var(--bg-card)]
                        ${isActive
                          ? `border-bronze-500 shadow-[0_0_20px_rgba(197,168,128,0.12)]`
                          : `${borderSubtle} opacity-70 hover:opacity-100`}`}>
                        {isActive && (
                          <div className="absolute top-0 right-0 w-9 h-9 bg-bronze-500/10 border-b border-l border-bronze-500/30 rounded-bl-xl flex items-center justify-center">
                            <span className="text-bronze-400 font-bold text-xs">✓</span>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2 pr-8">
                          <h4 className={`font-display font-bold uppercase tracking-wide ${textPrimary} text-sm lg:text-base`}>{t[svc.nameKey]}</h4>
                          <span className="font-display font-black text-bronze-500 text-sm lg:text-base ml-2 flex-shrink-0">{svc.price.toLocaleString()} ₸</span>
                        </div>
                        <p className={`${textSecondary} text-xs leading-relaxed mb-2`}>{t[svc.descKey]}</p>
                        <span className="text-[10px] text-bronze-400 font-bold uppercase tracking-wider">⏱ {fmtTime(svc.time)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desired Nail Shape Selection */}
              {activeCategory !== 'sugaring' && (
                <div>
                  <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">
                    {lang === 'en' ? '2. Choose nail shape:' : lang === 'ru' ? '2. Выберите форму ногтей:' : '2. Тырнақ пішінін таңдаңыз:'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {nailShapes.map((shape) => {
                      const isActive = nailShape === shape.id;
                      return (
                        <div
                          key={shape.id}
                          onClick={() => setNailShape(shape.id)}
                                                    className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center bg-[var(--bg-card)]
                            ${isActive 
                              ? `border-bronze-500 text-bronze-400 bg-bronze-500/5 shadow-[0_0_15px_rgba(197,168,128,0.12)]`
                              : `${borderSubtle} opacity-80 hover:opacity-100`
                            }`}
                        >
                          {/* SVG Nail shape */}
                          <svg width="40" height="40" viewBox="0 0 32 32" className="mb-2">
                            {/* Finger contour */}
                            <path 
                              d="M8,30 C8,20 8,16 9,14 C10,12 11,11 16,11 C21,11 22,12 23,14 C24,16 24,20 24,30" 
                              fill="none" 
                              stroke="var(--border-color)" 
                              strokeWidth="1" 
                              strokeDasharray="2 2" 
                            />
                            {/* Nail tip outline */}
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
                            {lang === 'en' ? shape.nameEn : lang === 'ru' ? shape.nameRu : shape.nameKk}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extra options */}
              <div>
                <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">
                  {activeCategory !== 'sugaring' 
                    ? (lang === 'en' ? '3. Extra options:' : lang === 'ru' ? '3. Дополнительные опции:' : '3. Қосымша опциялар:')
                    : t.servicesSelectOptions
                  }
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                  {catObj?.options?.map((opt) => {
                    const isChecked = selectedOptions.includes(opt.id);
                    return (
                                            <div key={opt.id} onClick={() => toggleOption(opt.id)}
                        className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-300 flex items-center justify-between
                          bg-[var(--bg-card)]
                          ${isChecked ? 'border-bronze-500/50' : `${borderSubtle} opacity-80 hover:opacity-100`}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                            ${isChecked ? 'bg-bronze-500 border-bronze-500 text-charcoal-950' : 'border-[var(--border-color)]'}`}>
                            {isChecked && <span className="font-bold text-[10px]">✓</span>}
                          </div>
                          <div>
                            <span className={`${textPrimary} text-xs font-bold block leading-snug`}>{t[opt.nameKey]}</span>
                            <span className={`text-[9px] ${textMuted}`}>+{fmtTime(opt.time)}</span>
                          </div>
                        </div>
                        <span className="font-display text-bronze-400 text-xs font-black ml-2 flex-shrink-0">+{opt.price.toLocaleString()} ₸</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right col: sticky total + form preview */}
                        <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className={`border border-bronze-500/30 rounded-2xl p-6 ${bgDeep} shadow-2xl relative overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-5">{t.servicesTotal}</h4>

                {/* Receipt */}
                <div className={`${bgSubtle} rounded-xl p-4 mb-5 space-y-1.5`}>
                  {selectedServices.length === 0 && selectedOptions.length === 0 ? (
                    <div className={`text-center py-4 ${textSecondary} text-xs font-semibold`}>
                      {t.servicesNotSelected}
                    </div>
                  ) : (
                    <>
                      {selectedServices.map(svc => (
                        <div key={svc.id} className={`flex justify-between items-center font-bold ${textPrimary} text-sm`}>
                          <span>{t[svc.nameKey]}</span>
                          <span className="text-bronze-500">{svc.price.toLocaleString()} ₸</span>
                        </div>
                      ))}
                      {selectedOptions.map(id => {
                        const o = optionsById[id]; if (!o) return null;
                        return (
                          <div key={id} className={`flex justify-between items-center text-xs ${textMuted} pl-4`}>
                            <span>+ {t[o.nameKey]}</span>
                            <span>+{o.price.toLocaleString()} ₸</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                  <div className={`border-t ${border} pt-2.5 mt-1 flex justify-between items-center font-black ${textPrimary}`}>
                    <span className="text-xs uppercase tracking-wider">{t.total}:</span>
                    <span className="text-bronze-400 text-base">{totalPrice.toLocaleString()} ₸</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className={`${textSecondary} text-xs`}>{t.servicesTotalTime}:</span>
                  <span className="font-display font-bold text-bronze-300 text-sm tracking-wider">≈ {fmtTime(totalTime)}</span>
                </div>

                {/* Legal and Personal Guarantee Badge */}
                <div className="flex gap-2.5 items-start p-3 border border-bronze-500/10 bg-bronze-500/5 rounded-xl mb-5">
                  <svg className="w-5 h-5 text-bronze-400 drop-shadow-[0_0_6px_rgba(197,168,128,0.5)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className={`${textMuted} text-[10px] leading-relaxed font-sans`}>
                    {t.guaranteeIndicatorText}
                  </p>
                </div>

                <button 
                  onClick={handleCalculatorCta}
                  disabled={selectedServices.length === 0 && selectedOptions.length === 0}
                  className={`w-full py-3.5 rounded-xl text-xs uppercase transition-all duration-300
                    ${(selectedServices.length === 0 && selectedOptions.length === 0)
                      ? 'bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] cursor-not-allowed opacity-50 shadow-none'
                      : 'btn-premium-tactile'
                    }`}
                >
                  {t.serviceCta}
                </button>
              </div>

              {/* Trust badges */}
              <div className={`border ${border} rounded-2xl p-4 ${bgCard} grid grid-cols-3 gap-3 text-center`}>
                {[
                  { id:'guarantee', label: lang === 'en' ? '28 days\nguarantee' : lang === 'ru' ? '28 дней\nгарантия' : '28 күн\nкепілдік' },
                  { id:'sterility', label: lang === 'en' ? '3-stage\nsterility' : lang === 'ru' ? '3-уровн.\nстерильность' : '3 деңгейлі\nстерилизация' },
                  { id:'duration', label: lang === 'en' ? 'Up to 2 hours\nduration' : lang === 'ru' ? 'До 2 часов\nработа' : '2 сағатқа\ndейін' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span style={{color:'var(--accent)'}}>
                      {b.id === 'guarantee' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><path d="m9 12 2 2 4-4"/></svg>
                      )}
                      {b.id === 'sterility' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                      {b.id === 'duration' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                      )}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${textMuted} leading-tight whitespace-pre-line`}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PORTFOLIO BEFORE/AFTER SLIDER ═══════════ */}
      <section id="portfolio" className={`border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>
            {t.portfolioTitle}
          </h2>
          <p className={`${textSecondary} text-sm mb-8`}>
            {t.portfolioSubtitle}
          </p>

          <div className="max-w-3xl mx-auto">
            {/* Tabs for switching works */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {works.map((w, index) => {
                const isActive = activeWork === index;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      setActiveWork(index);
                      setSliderPosition(50);
                      setIsDragging(false);
                    }}
                    className={`flex-shrink-0 snap-start snap-always px-5 py-2.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'active-tactile-pill scale-[1.02]' 
                        : 'border border-[var(--border-color)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-bronze-500/30'
                      }`}
                  >
                    {t[w.titleKey]}
                  </button>
                );
              })}
            </div>

            {/* The interactive container */}
            <div 
              ref={sliderRef}
              className={`relative h-[320px] sm:h-[400px] md:h-[480px] w-full rounded-3xl overflow-hidden border ${border} shadow-2xl select-none touch-none cursor-ew-resize`}
              onMouseDown={(e) => {
                if (e.button === 0) handleStart(e.clientX);
              }}
              onTouchStart={(e) => {
                if (e.touches && e.touches[0]) {
                  handleStart(e.touches[0].clientX);
                }
              }}
            >
              {/* After Image (Full width background) */}
              <img 
                src={works[activeWork].after} 
                alt="After manicure" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />
              {/* After label */}
              <div className="absolute right-6 top-6 bg-bronze-500/90 backdrop-blur-md text-charcoal-950 font-display font-black text-[10px] sm:text-xs px-4 py-2 rounded-xl z-20 tracking-widest shadow-lg">
                {t.afterText}
              </div>

              {/* Before Image (Positioned absolutely, clipped horizontally) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img 
                  src={works[activeWork].before} 
                  alt="Before manicure" 
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable="false"
                />
              </div>
              {/* Before label */}
              <div className="absolute left-6 top-6 bg-charcoal-950/80 backdrop-blur-md text-white border border-white/10 font-display font-black text-[10px] sm:text-xs px-4 py-2 rounded-xl z-20 tracking-widest shadow-lg">
                {t.beforeText}
              </div>

              {/* Slide Line Divider */}
              <div 
                className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-bronze-400 via-bronze-500 to-bronze-600 z-30 cursor-ew-resize shadow-[0_0_10px_rgba(197,168,128,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag handle */}
                                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-deep)]/40 backdrop-blur-md border border-bronze-500/60 shadow-xl flex items-center justify-center cursor-ew-resize transition-transform duration-150 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
                >
                  {/* Left & Right custom vector arrows */}
                  <svg className="w-5 h-5 text-bronze-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 16l-4-4 4-4m4 8l4-4-4-4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Helper UX caption strictly below the slider */}
            <div className="text-center mt-3.5">
              <span className={`text-[10px] uppercase tracking-widest ${textMuted} font-bold opacity-80`}>
                {lang === 'en' ? '← Drag the slider to compare →' : lang === 'ru' ? '← Потяните ползунок для сравнения →' : '← Салыстыру үшін жүгірткіні тартыңыз →'}
              </span>
            </div>

            {/* Work details block */}
            <div className={`mt-6 p-5 border ${border} rounded-2xl ${bgCard} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl transition-all duration-300`}>
              <div className="max-w-xl">
                <h4 className={`font-display font-bold text-sm ${textPrimary} uppercase tracking-wider mb-1`}>
                  {t[works[activeWork].titleKey]}
                </h4>
                <p className={`${textSecondary} text-xs leading-relaxed`}>
                  {t[works[activeWork].descKey]}
                </p>
              </div>
              <div className="flex gap-6 flex-shrink-0 text-xs font-bold uppercase tracking-wider w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 ${borderSubtle}">
                <div className="flex flex-col gap-1">
                  <span className={`${textMuted} text-[9px]`}>{t.ageLabel}</span>
                  <span className="text-bronze-400 font-display text-sm">{works[activeWork].age}</span>
                </div>
                                <div className={`h-8 w-px bg-[var(--border-color)] hidden md:block`} />
                <div className="flex flex-col gap-1">
                  <span className={`${textMuted} text-[9px]`}>{t.timeLabel}</span>
                  <span className="text-bronze-400 font-display text-sm">
                    {lang === 'en' ? works[activeWork].time.replace('ч', 'h').replace('мин', 'min') : lang === 'ru' ? works[activeWork].time : works[activeWork].time.replace('ч', 'сағ').replace('мин', 'мин')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CLIENT CARE GUIDE ═══════════ */}
      <section id="care-guide" className={`border-b ${border} py-14 lg:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>
            {t.careTitle}
          </h2>
          <p className={`${textSecondary} text-sm max-w-xl mb-8`}>
            {t.careSubtitle}
          </p>

          {/* Interactive Care Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 max-w-md p-1 rounded-2xl tactile-container">
            {['manicure', 'pedicure', 'sugaring'].map((tab) => {
              const tabLabels = {
                manicure: lang === 'en' ? 'Manicure' : lang === 'ru' ? 'Маникюр' : 'Маникюр',
                pedicure: lang === 'en' ? 'Pedicure' : lang === 'ru' ? 'Педикюр' : 'Педикюр',
                sugaring: lang === 'en' ? 'Sugaring' : lang === 'ru' ? 'Шугаринг' : 'Шугаринг'
              };
              const isActive = activeCareTab === tab;
              return (
                                <button
                  key={tab}
                  onClick={() => setActiveCareTab(tab)}
                  className={`flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'active-tactile-pill scale-[1.02]' 
                      : 'border border-transparent hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careTipsData[lang][activeCareTab].map((tip, index) => {
              const getIcon = (type) => {
                const iconClasses = "w-5 h-5 text-bronze-500";
                if (type === 'time' || type === 'ban') return <ShieldIcon className={iconClasses} />;
                if (type === 'protect') return <CreamIcon className={iconClasses} />;
                if (type === 'care') return <NailPolishIcon className={iconClasses} />;
                if (type === 'calendar') return <MirrorIcon className={iconClasses} />;
                if (type === 'shoe') return <ShieldIcon className={iconClasses} />;
                if (type === 'cream') return <CreamIcon className={iconClasses} />;
                if (type === 'dry') return <MirrorIcon className={iconClasses} />;
                if (type === 'shape') return <NailFileIcon className={iconClasses} />;
                if (type === 'cloth') return <LipIcon className={iconClasses} />;
                if (type === 'peel') return <ScissorsIcon className={iconClasses} />;
                if (type === 'lotion') return <CombIcon className={iconClasses} />;
                return <CheckIcon className={iconClasses} />;
              };

              return (
                <div 
                  key={index} 
                  className={`flex flex-col gap-4 p-5 ${bgSubtle} border ${border} rounded-2xl hover:border-bronze-500/20 transition-all hover:-translate-y-1 duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div className="bg-bronze-500/10 p-2.5 rounded-xl w-fit">
                      {getIcon(tip.icon)}
                    </div>
                    <span className="text-[9px] font-sans font-black uppercase tracking-wider border border-bronze-500/20 bg-bronze-500/5 px-2 py-0.5 rounded-full text-bronze-400">
                      {tip.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-display text-sm font-bold uppercase tracking-wider ${textPrimary} mb-2`}>
                      {tip.title}
                    </h3>
                    <p className={`${textSecondary} text-xs leading-relaxed`}>
                      {tip.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ GUARANTEES ═══════════ */}
      <section id="guarantees" className={`border-b ${border} py-14 lg:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>{t.guaranteesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: t.g1Title, desc: t.g1Desc },
              { title: t.g2Title, desc: t.g2Desc },
              { title: t.g3Title, desc: t.g3Desc },
              { title: t.g4Title, desc: t.g4Desc },
            ].map((g, i) => (
              <div key={i} className={`flex flex-col gap-3 p-5 ${bgSubtle} border ${border} rounded-2xl hover:border-bronze-500/20 transition-all`}>
                <div className="bg-bronze-500/10 p-2 rounded-lg w-fit"><CheckIcon /></div>
                <div>
                  <h3 className={`font-display text-sm font-bold uppercase tracking-wider ${textPrimary} mb-1.5`}>{g.title}</h3>
                  <p className={`${textSecondary} text-xs leading-relaxed`}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>{t.fearTitle}</h2>
          {/* Mobile FAQ list */}
          <div className="flex flex-col gap-3 lg:hidden max-w-5xl">
            {faqData[lang].map((item, i) => renderFaqCard(item, i, 'mob'))}
          </div>

          {/* Desktop FAQ columns */}
          <div className="hidden lg:grid grid-cols-2 gap-3 max-w-5xl items-start">
            <div className="flex flex-col gap-3">
              {faqData[lang].map((item, i) => i % 2 === 0 ? renderFaqCard(item, i, 'desk-l') : null)}
            </div>
            <div className="flex flex-col gap-3">
              {faqData[lang].map((item, i) => i % 2 !== 0 ? renderFaqCard(item, i, 'desk-r') : null)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LOCATION MAP ═══════════ */}
      <section id="location" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-3`}>
            {lang === 'en' ? 'HOW TO FIND US' : lang === 'ru' ? 'КАК ДОБРАТЬСЯ' : 'МЕКЕН-ЖАЙ'}
          </h2>
          <p className={`${textSecondary} text-sm mb-8`}>
            {lang === 'en'
              ? 'The studio is located inside Shade laser hair removal studio. Entrance from the avenue side.'
              : lang === 'ru'
                ? 'Кабинет находится в студии лазерной эпиляции Shade. Вход со стороны проспекта.'
                : 'Кабинет Shade лазерлік эпиляция студиясында орналасқан. Кіреберіс даңғыл жағынан.'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Interactive Custom Leaflet Map Container */}
            <div className={`lg:col-span-2 rounded-2xl overflow-hidden border ${border} shadow-xl z-0 relative`} style={{height: '380px'}}>
              <div id="studio-map" className="w-full h-full"></div>
            </div>

            {/* Info card — 1/3 width */}
            <div className="flex flex-col gap-4">

              {/* Address */}
              <div className={`${bgCard} border ${border} rounded-2xl p-5 flex-1`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-bronze-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                      {lang === 'en' ? 'Address' : lang === 'ru' ? 'Адрес' : 'Мекен-жайы'}
                    </p>
                    <p className={`${textSecondary} text-sm leading-relaxed`}>
                      {lang === 'en'
                        ? '93 Azattyk Avenue — inside Shade laser hair removal studio'
                        : lang === 'ru'
                          ? 'Проспект Азаттык, 93 — студия лазерной эпиляции Shade'
                          : 'Азаттық даңғылы, 93 — Shade лазерлік эпиляция студиясы'}
                    </p>
                    <p className={`${textMuted} text-xs mt-1`}>Атырау, 60011/E01Y0B0</p>
                  </div>
                </div>

                <div className={`border-t ${borderSubtle} pt-4 flex items-start gap-3 mb-4`}>
                  <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-bronze-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                      {lang === 'en' ? 'Working hours' : lang === 'ru' ? 'График' : 'Жұмыс уақыты'}
                    </p>
                    <p className={`${textSecondary} text-sm`}>
                      {lang === 'en' ? 'Mon–Sun: 09:00–23:00' : lang === 'ru' ? 'Пн–Вс: 09:00–23:00' : 'Дс–Жс: 09:00–23:00'}
                    </p>
                    <p className={`${textMuted} text-xs mt-0.5`}>
                      {lang === 'en' ? 'By appointment only' : lang === 'ru' ? 'Только по записи' : 'Тек алдын ала жазылу'}
                    </p>
                  </div>
                </div>

                <div className={`border-t ${borderSubtle} pt-4 flex items-start gap-3`}>
                  <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                    <PhoneIcon className="w-4 h-4 text-bronze-500" />
                  </div>
                  <div>
                    <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                      {lang === 'en' ? 'Phone / WhatsApp' : lang === 'ru' ? 'Телефон / WhatsApp' : 'Телефон / WhatsApp'}
                    </p>
                    <a href="tel:+77016698086" className="text-bronze-400 hover:text-bronze-300 text-sm font-bold transition-colors">
                      +7 701 669 8086
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <a
                href="https://2gis.kz/atyrau/search/Shade%20%D0%90%D0%B7%D0%B0%D1%82%D1%82%D1%8B%D0%BA%2093"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 btn-premium-tactile py-3.5 px-5 rounded-xl text-xs uppercase transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {lang === 'en' ? 'Open in 2GIS' : lang === 'ru' ? 'Открыть в 2ГИС' : '2ГИС-та ашу'}
              </a>

              <a
                href="https://wa.me/77016698086?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9A%D0%B0%D0%BA%20%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BC%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-bold py-3.5 px-5 rounded-xl text-xs tracking-wider uppercase transition-all`}
              >
                <WhatsAppIcon className="w-4 h-4" />
                {lang === 'en' ? 'Ask route' : lang === 'ru' ? 'Спросить маршрут' : 'Бағыт сұрау'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BOOKING FORM ═══════════ */}
      <section id="appointment-form" className={`${bg} py-14 lg:py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Left: copy */}
            <div>
              <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6`}>{t.formTitle}</h2>
              <p className={`${textSecondary} text-sm leading-relaxed mb-6`}>{t.formHelp}</p>

              {/* Contact links */}
              <div className="flex gap-3">
                <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 border border-[#25D366]/30 text-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10 px-4 py-2.5 rounded-xl text-xs font-bold transition-all">
                  <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:+77016698086"
                   className={`flex items-center gap-2 border ${border} ${textSecondary} hover:text-bronze-500 hover:border-bronze-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all`}>
                  <PhoneIcon className="w-4 h-4" /> +7 701 669 8086
                </a>
              </div>
            </div>

            {/* Right: form card */}
            <div className={`border border-bronze-500/20 rounded-2xl p-6 lg:p-8 ${bgCard} shadow-2xl`}>
              <div className="flex justify-center mb-4">
                <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">BOOK APPOINTMENT</span>
              </div>

              {/* Receipt */}
              <div className="bg-bronze-500/5 border border-bronze-500/20 rounded-xl p-4 mb-5 text-sm">
                <span className="text-bronze-400 font-bold block mb-2 uppercase tracking-wider text-[9px]">{t.servicesSelectedPreview}:</span>
                {selectedServices.length === 0 && selectedOptions.length === 0 ? (
                  <div className={`text-center py-4 ${textSecondary} text-xs font-semibold`}>
                    {t.servicesNotSelected}
                  </div>
                ) : (
                  <>
                    {selectedServices.map(svc => (
                      <div key={svc.id} className={`flex justify-between font-bold ${textPrimary} mb-1`}>
                        <span>{t[svc.nameKey]}</span>
                        <span className="text-bronze-500">{svc.price.toLocaleString()} ₸</span>
                      </div>
                    ))}
                    {selectedOptions.map(id => {
                      const o = optionsById[id]; if (!o) return null;
                      return <div key={id} className={`flex justify-between text-xs ${textMuted} pl-3`}><span>+ {t[o.nameKey]}</span><span>+{o.price.toLocaleString()} ₸</span></div>;
                    })}
                  </>
                )}
                <div className={`border-t ${border} mt-3 pt-2.5 flex justify-between font-black ${textPrimary}`}>
                  <span className="text-xs uppercase tracking-wider">{t.total}:</span>
                  <span className="text-bronze-400">{totalPrice.toLocaleString()} ₸ ({fmtTime(totalTime)})</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Compact AC & Coffee Banner */}
                <div className="flex gap-2.5 items-center p-3 bg-bronze-500/5 border border-bronze-500/10 rounded-xl text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  <span className="text-xs">☕</span>
                  <p className="flex-1">{t.formComfort}</p>
                </div>

                {/* Input Fields */}
                <div className="space-y-2">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} required maxLength={50} pattern="[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s\-]+"
                    className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} required maxLength={15} pattern="[\+0-9\s\-]+"
                    className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
                </div>

                {/* Date & Time Picker */}
                <div className="space-y-3.5">
                  {/* Date Picker Strip */}
                  <div className="space-y-1.5">
                    <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                      {lang === 'en' ? 'Select Date:' : lang === 'ru' ? 'Выбрать дату:' : 'Күнді таңдау:'}
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
                      {next10Days.map(d => {
                        const isSelected = selectedDate === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDate(d.id)}
                            className={`flex-shrink-0 snap-start w-[52px] py-2.5 border rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                              ${isSelected
                                ? 'border-bronze-500 bg-bronze-500/10 text-[var(--text-primary)] shadow-[0_0_12px_rgba(197,168,128,0.2)]'
                                : 'border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-bronze-500/30'
                              }`}
                          >
                            <span className="text-[9px] uppercase opacity-60 font-medium tracking-tighter">{d.weekday}</span>
                            <span className="text-xs font-black mt-0.5">{d.dayNum}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots Grid */}
                  <div className="space-y-1.5">
                    <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                      {lang === 'en' ? 'Select Time:' : lang === 'ru' ? 'Выбрать время:' : 'Уақытты таңдау:'}
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'].map(time => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-1 border rounded-xl text-center text-xs font-bold transition-all duration-300 cursor-pointer
                              ${isSelected
                                ? 'border-bronze-500 bg-bronze-500/10 text-[var(--text-primary)] shadow-[0_0_12px_rgba(197,168,128,0.2)]'
                                : 'border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-bronze-500/30'
                              }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Visit Mode Switch */}
                <div className="space-y-1.5">
                  <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                    {lang === 'en' ? 'Visit mode:' : lang === 'ru' ? 'Режим визита:' : 'Визит форматы:'}
                  </span>
                  <div className="grid grid-cols-2 p-1 gap-1 rounded-xl tactile-container">
                    <button
                      type="button"
                      onClick={() => setVisitMode('relax')}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer
                        ${visitMode === 'relax'
                          ? 'active-tactile-pill scale-[1.02]'
                          : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                        }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>{lang === 'en' ? 'Relax in silence' : lang === 'ru' ? 'Relax в тишине' : 'Тыныштықтағы Relax'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitMode('talk')}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer
                        ${visitMode === 'talk'
                          ? 'active-tactile-pill scale-[1.02]'
                          : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                        }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{lang === 'en' ? 'Friendly chat' : lang === 'ru' ? 'Душевная беседа' : 'Жылы сұхбат'}</span>
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} id="form-submit-btn"
                  className="w-full btn-premium-tactile disabled:opacity-50 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300 flex justify-center items-center gap-2 mt-4">
                  {isSubmitting
                    ? <span className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></span>
                    : t.formCta}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className={`border-t ${border} py-10 ${bgDeep} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            {/* Logo */}
            <div className="static-logo">
              <span className="static-logo-title text-3xl sm:text-4xl">
                <span>S</span><span>V</span><span>T</span><span>L</span>
              </span>
              <span className="static-logo-subtitle text-[13px] sm:text-[15px]">Nails &amp; Aesthetic</span>
            </div>

            <p className={`${textMuted} text-xs max-w-xs lg:text-center`}>{t.footerText}</p>

            {/* Social icons — clean, no circles */}
                        <div className="flex gap-5 items-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--text-muted)] hover:text-[#E1306C] transition-colors duration-200">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[var(--text-muted)] hover:text-[#25D366] transition-colors duration-200">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a href="tel:+77016698086" aria-label="Call" className="text-[var(--text-muted)] hover:text-[#4A90D9] transition-colors duration-200">
                <PhoneIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className={`border-t ${borderSubtle} mt-8 pt-6 text-center`}>
            <p className={`${textFaint} text-[10px]`}>© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
            <p className="spcwlkr-credit mt-3">Powered by SPCWLKR Digital Studio</p>
          </div>
        </div>
      </footer>

            {/* ═══════════ SUCCESS MODAL ═══════════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm popup-backdrop">
          <div className={`bg-[var(--bg-card)] border border-bronze-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl`}>
            <div className="w-14 h-14 bg-bronze-500/10 text-bronze-500 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">✓</div>
            <h3 className={`font-display text-xl font-black uppercase tracking-tight ${textPrimary} mb-3`}>{t.modalSuccessTitle}</h3>
            <p className={`${textSecondary} text-sm leading-relaxed mb-6`}>{t.modalSuccessDesc}</p>
            <button onClick={handleModalClose} className="w-full btn-premium-tactile py-3 rounded-xl text-sm tracking-wide transition-all">{t.modalClose}</button>
          </div>
        </div>
      )}

      {/* ═══════════ MOBILE MENU OVERLAY (Sandwich Panel) ═══════════ */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 popup-backdrop">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-xl" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className={`absolute top-0 left-0 h-full w-4/5 max-w-[320px] bg-[var(--bg-header)] border-r ${border} shadow-2xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 transform`}>
            <div>
              {/* Header inside Mobile Menu */}
              <div className="flex justify-between items-center mb-10">
                <div className="static-logo">
                  <span className="static-logo-title text-2xl">
                    <span>S</span><span>V</span><span>T</span><span>L</span>
                  </span>
                  <span className="static-logo-subtitle text-[11px]">Nails &amp; Aesthetic</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors`}
                  aria-label="Close menu"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-6">
                {['#trust','#services','#portfolio','#care-guide','#guarantees','#faq','#location','#appointment-form'].map((href, i) => {
                  const labels = { 
                    ru: ['Обо мне','Услуги','Работы','Памятка','Гарантии','FAQ','Адрес','Запись'], 
                    kk: ['Мен туралы','Қызметтер','Жұмыстар','Күтім','Кепілдіктер','FAQ','Мекен-жай','Жазылу'],
                    en: ['About me','Services','Works','Aftercare','Guarantees','FAQ','Address','Booking']
                  };
                  return (
                    <a 
                      key={href} 
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-wider ${textSecondary} hover:text-bronze-500 transition-colors border-b ${borderSubtle} pb-3`}
                    >
                      {labels[lang][i]}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Footer inside Mobile Menu */}
                        <div className="flex flex-col gap-5 border-t border-white/5 pt-6">
              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`p-2.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[#E1306C] transition-colors flex-1 flex justify-center`}>
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`p-2.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[#25D366] transition-colors flex-1 flex justify-center`}>
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
              
              {/* Language selection in drawer */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>Language / Язык / Тіл:</span>
                <div className="flex p-0.5 border border-white/5 rounded-lg tactile-container w-32">
                  <button 
                    onClick={() => { setLang('ru'); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-1 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'ru' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    RU
                  </button>
                  <button 
                    onClick={() => { setLang('kk'); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-1 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'kk' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    KZ
                  </button>
                  <button 
                    onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-1 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'en' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Appearance selection in drawer */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/5">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>
                  {lang === 'ru' ? 'Внешний вид / Тема:' : lang === 'kk' ? 'Сыртқы түрі / Тема:' : 'Appearance / Theme:'}
                </span>
                
                {/* Day / Night tactile buttons */}
                <div className="flex p-1 border border-white/5 tactile-container">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'btn-switch-active-day' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                  >
                    <SunIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'День' : lang === 'kk' ? 'Күн' : 'Day'}</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'btn-switch-active-night' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                  >
                    <MoonIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'Ночь' : lang === 'kk' ? 'Түн' : 'Night'}</span>
                  </button>
                </div>

                {/* 4 Premium Presets */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button 
                    onClick={() => setTheme('emerald')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'emerald' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#061F17' }}></span>
                    <span>Emerald</span>
                  </button>
                  <button 
                    onClick={() => setTheme('nudefashion')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'nudefashion' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#F4EFEA' }}></span>
                    <span>Nude</span>
                  </button>
                  <button 
                    onClick={() => setTheme('sage')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'sage' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#F0F2EE' }}></span>
                    <span>Sage</span>
                  </button>
                  <button 
                    onClick={() => setTheme('cyber')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'cyber' ? 'active-tactile-pill scale-[1.02]' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#0D0B14' }}></span>
                    <span>Cyber</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
