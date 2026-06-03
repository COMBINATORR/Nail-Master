import React, { useState, useEffect, useRef } from 'react';
import work1_before from './assets/work1_before.png';
import work1_after from './assets/work1_after.png';
import work2_before from './assets/work2_before.png';
import work2_after from './assets/work2_after.png';
import work3_before from './assets/work3_before.png';
import work3_after from './assets/work3_after.png';
import work4_before from './assets/work4_before.png';
import work4_after from './assets/work4_after.png';
import work5_before from './assets/work5_before.png';
import work5_after from './assets/work5_after.png';

/* ─── SVG Icon Components ─── */
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
);

const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>
);

const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
);

const SystemIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/></svg>
);

const GlobeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

/* ─── Premium Beauty Background Icons ─── */
const NailPolishIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="2" width="4" height="7" rx="1" />
    <path d="M6 9h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" />
    <path d="M9 14c1.5 0 1.5 2 3 2s1.5-2 3-2" />
  </svg>
);

const ScissorsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="8.5" y1="7.5" x2="19" y2="18" />
    <line x1="8.5" y1="16.5" x2="19" y2="6" />
  </svg>
);

const NailFileIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="10" width="20" height="4" rx="2" transform="rotate(-45 12 12)" />
    <line x1="6" y1="12" x2="18" y2="12" strokeDasharray="2 2" transform="rotate(-45 12 12)" />
  </svg>
);

const CreamIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 7h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
    <path d="M4 11h16v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7z" />
    <path d="M9 15a3 3 0 0 0 6 0" />
  </svg>
);

const LipIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12c1.5-2.5 4-3.5 8-3.5s6.5 1 8 3.5c-1.5 2.5-4 3.5-8 3.5S5.5 14.5 4 12z" />
    <path d="M4 12h16" />
  </svg>
);

const CombIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="3" rx="1" />
    <line x1="5" y1="8" x2="5" y2="18" />
    <line x1="8" y1="8" x2="8" y2="18" />
    <line x1="11" y1="8" x2="11" y2="18" />
    <line x1="14" y1="8" x2="14" y2="18" />
    <line x1="17" y1="8" x2="17" y2="18" />
    <line x1="20" y1="8" x2="20" y2="18" />
  </svg>
);

const MirrorIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6" />
    <path d="M12 15v6" />
    <path d="M9 21h6" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowUpIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

const scatteredIconsList = [
  { top: '3%', left: '8%', rotate: 'rotate-12', Icon: NailPolishIcon },
  { top: '6%', right: '7%', rotate: '-rotate-45', Icon: ScissorsIcon },
  { top: '11%', left: '82%', rotate: 'rotate-30', Icon: CreamIcon },
  { top: '15%', left: '12%', rotate: '-rotate-12', Icon: LipIcon },
  { top: '19%', right: '10%', rotate: 'rotate-45', Icon: NailFileIcon },
  { top: '23%', left: '5%', rotate: '-rotate-30', Icon: CombIcon },
  { top: '28%', right: '5%', rotate: 'rotate-15', Icon: MirrorIcon },
  { top: '32%', left: '85%', rotate: '-rotate-15', Icon: NailPolishIcon },
  { top: '37%', left: '10%', rotate: 'rotate-45', Icon: ScissorsIcon },
  { top: '41%', right: '8%', rotate: '-rotate-45', Icon: CreamIcon },
  { top: '46%', left: '7%', rotate: 'rotate-12', Icon: LipIcon },
  { top: '51%', right: '12%', rotate: '-rotate-12', Icon: NailFileIcon },
  { top: '56%', left: '80%', rotate: 'rotate-30', Icon: CombIcon },
  { top: '60%', left: '14%', rotate: '-rotate-30', Icon: MirrorIcon },
  { top: '65%', right: '6%', rotate: 'rotate-45', Icon: NailPolishIcon },
  { top: '70%', left: '9%', rotate: '-rotate-15', Icon: ScissorsIcon },
  { top: '74%', right: '11%', rotate: 'rotate-15', Icon: CreamIcon },
  { top: '79%', left: '84%', rotate: '-rotate-45', Icon: LipIcon },
  { top: '83%', left: '6%', rotate: 'rotate-12', Icon: NailFileIcon },
  { top: '87%', right: '8%', rotate: '-rotate-12', Icon: CombIcon },
  { top: '92%', left: '11%', rotate: 'rotate-30', Icon: MirrorIcon },
  { top: '96%', right: '10%', rotate: '-rotate-30', Icon: NailPolishIcon },
];

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('svtl-lang') || 'ru');
  const [theme, setTheme] = useState(() => localStorage.getItem('svtl-theme') || 'dark');
  const [activeFaq, setActiveFaq] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const langPopupRef = useRef(null);
  const categories = {
    manicure: {
      id: 'manicure',
      nameKey: 'catManicureName',
      services: [
        { id: 'classic', nameKey: 'serviceManicureClassicName', descKey: 'serviceManicureClassicDesc', price: 7000, time: 60 },
        { id: 'gel', nameKey: 'serviceManicureGelName', descKey: 'serviceManicureGelDesc', price: 10000, time: 90 },
        { id: 'extensions', nameKey: 'serviceManicureExtName', descKey: 'serviceManicureExtDesc', price: 14000, time: 120 }
      ],
      options: [
        { id: 'design', nameKey: 'optManiDesign', price: 2000, time: 20 },
        { id: 'strengthen', nameKey: 'optManiStrengthen', price: 1500, time: 15 },
        { id: 'repair', nameKey: 'optManiRepair', price: 1000, time: 10 },
        { id: 'spa', nameKey: 'optManiSpa', price: 1500, time: 15 }
      ]
    },
    pedicure: {
      id: 'pedicure',
      nameKey: 'catPedicureName',
      services: [
        { id: 'express', nameKey: 'servicePediExpressName', descKey: 'servicePediExpressDesc', price: 8000, time: 60 },
        { id: 'smart', nameKey: 'servicePediSmartName', descKey: 'servicePediSmartDesc', price: 12000, time: 90 },
        { id: 'hygiene', nameKey: 'servicePediHygieneName', descKey: 'servicePediHygieneDesc', price: 9000, time: 60 }
      ],
      options: [
        { id: 'design', nameKey: 'optPediDesign', price: 2000, time: 20 },
        { id: 'cracks', nameKey: 'optPediCracks', price: 3000, time: 20 },
        { id: 'spa', nameKey: 'optPediSpa', price: 2000, time: 20 }
      ]
    },
    sugaring: {
      id: 'sugaring',
      nameKey: 'catSugaringName',
      services: [
        { id: 'bikini', nameKey: 'serviceSugarBikiniName', descKey: 'serviceSugarBikiniDesc', price: 8000, time: 30 },
        { id: 'legs', nameKey: 'serviceSugarLegsName', descKey: 'serviceSugarLegsDesc', price: 7000, time: 40 },
        { id: 'underarms', nameKey: 'serviceSugarUnderarmsName', descKey: 'serviceSugarUnderarmsDesc', price: 3000, time: 15 },
        { id: 'arms', nameKey: 'serviceSugarArmsName', descKey: 'serviceSugarArmsDesc', price: 5000, time: 25 }
      ],
      options: [
        { id: 'mask', nameKey: 'optSugarMask', price: 2000, time: 15 },
        { id: 'peeling', nameKey: 'optSugarPeeling', price: 2500, time: 15 },
        { id: 'face', nameKey: 'optSugarFace', price: 1500, time: 10 }
      ]
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeCategory, setActiveCategory] = useState('manicure');
  const [selectedServiceId, setSelectedServiceId] = useState('classic');
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (categories[activeCategory]) {
      setSelectedServiceId(categories[activeCategory].services[0].id);
    }
    setSelectedOptions([]);
  }, [activeCategory]);



  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const [activeWork, setActiveWork] = useState(0);

  useEffect(() => {
    setSliderPosition(50);
    setIsDragging(false);
  }, [activeWork]);

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
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    document.body.classList.toggle('light', !isDark);
    localStorage.setItem('svtl-theme', theme);
  }, [theme, isDark]);

  useEffect(() => { localStorage.setItem('svtl-lang', lang); }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') setTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) setShowLangPopup(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cycleTheme = () => {
    const order = ['dark', 'light', 'system'];
    setTheme(order[(order.indexOf(theme) + 1) % order.length]);
  };

  const ThemeIcon = () => {
    if (theme === 'dark') return <MoonIcon />;
    if (theme === 'light') return <SunIcon />;
    return <SystemIcon />;
  };

  /* ─── Theme-aware class helpers ─── */
  const bg       = isDark ? 'bg-transparent'              : 'bg-transparent';
  const bgDeep   = isDark ? 'bg-charcoal-950/70'          : 'bg-white/80';
  const bgCard   = isDark ? 'bg-charcoal-950/50'          : 'bg-white/80';
  const bgSubtle = isDark ? 'bg-white/4'                  : 'bg-charcoal-50/80';
  const bgHeader = isDark ? 'bg-charcoal-950/80'          : 'bg-[#f8f6f2]/90';
  const bgAlt    = isDark ? 'bg-charcoal-950/30'          : 'bg-bronze-50/30';
  const bgDeep80 = isDark ? 'bg-charcoal-950/80'          : 'bg-white/90';

  const textPrimary   = isDark ? 'text-white'       : 'text-charcoal-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-charcoal-500';
  const textMuted     = isDark ? 'text-neutral-500' : 'text-charcoal-400';
  const textFaint     = isDark ? 'text-neutral-600' : 'text-charcoal-300';

  const border       = isDark ? 'border-white/10'  : 'border-charcoal-200';
  const borderSubtle = isDark ? 'border-white/5'   : 'border-charcoal-100';

  /* ─── Data ─── */
  const works = [
    {
      id: 'nude',
      titleKey: 'workNudeTitle',
      descKey: 'workNudeDesc',
      before: work1_before,
      after: work1_after,
      age: '20+',
      time: '1 ч 15 мин'
    },
    {
      id: 'french',
      titleKey: 'workFrenchTitle',
      descKey: 'workFrenchDesc',
      before: work2_before,
      after: work2_after,
      age: '35+',
      time: '1 ч 30 мин'
    },
    {
      id: 'bordeaux',
      titleKey: 'workBordeauxTitle',
      descKey: 'workBordeauxDesc',
      before: work3_before,
      after: work3_after,
      age: '55+',
      time: '1 ч 20 мин'
    },
    {
      id: 'lavender',
      titleKey: 'workLavenderTitle',
      descKey: 'workLavenderDesc',
      before: work4_before,
      after: work4_after,
      age: '25+',
      time: '1 ч 15 мин'
    },
    {
      id: 'red',
      titleKey: 'workRedTitle',
      descKey: 'workRedDesc',
      before: work5_before,
      after: work5_after,
      age: '45+',
      time: '1 ч 15 мин'
    }
  ];

  const translations = {
    ru: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "МАНИКЮР • ПЕДИКЮР • ШУГАРИНГ В АТЫРАУ",
      heroTitle: "ПРЕМИАЛЬНЫЙ УХОД И ЭСТЕТИКА ДЛЯ ВАШЕЙ КРАСОТЫ",
      heroSubtitle: "БЕЗУПРЕЧНОЕ КАЧЕСТВО • 100% СТЕРИЛЬНОСТЬ",
      heroDesc: "Индивидуальный подход от сертифицированного мастера Светланы. Безопасные процедуры, премиальные материалы и уютный кабинет с заботой о вашем комфорте и красоте.",
      heroCta: "Рассчитать стоимость и зафиксировать скидку",
      trustTitle: "ПОЧЕМУ МНЕ ДОВЕРЯЮТ",
      trustSubtitle: "Я гарантирую безопасность, прозрачность и высокий уровень сервиса",
      trust1Title: "100% стерильные инструменты",
      trust1Desc: "3-этапная дезинфекция по стандартам СанПиН. Инструменты стерилизуются в сухожаре ГП-10, крафт-пакет вскрывается исключительно при вас.",
      trust2Title: "0 скрытых наценок",
      trust2Desc: "Стоимость процедур фиксируется до их начала. Вы всегда знаете точную сумму без внезапных доплат в конце визита.",
      trust3Title: "Цените ваше время",
      trust3Desc: "Строгий тайминг процедур. Маникюр или шугаринг проходят быстро, аккуратно и без задержек по времени.",
      servicesTitle: "МОИ УСЛУГИ",
      servicesSubtitle: "Выберите направление, услугу и опции — стоимость и время рассчитаются автоматически.",
      servicesSelectBase: "1. Выберите услугу:",
      servicesSelectOptions: "2. Дополнительные опции:",
      servicesTotal: "Итоговый расчет:",
      servicesTotalPrice: "Стоимость",
      servicesTotalTime: "Время",
      servicesSelectedPreview: "Ваш визит",
      serviceCta: "Зафиксировать расчет и записаться",
      guaranteesTitle: "ГАРАНТИИ",
      guaranteesSubtitle: "Вы защищены моими личными стандартами качества",
      g1Title: "Личная ответственность", g1Desc: "Вы записываетесь лично ко мне. Я отвечаю за каждый этап процедуры и ваш комфорт.",
      g2Title: "Абсолютная безопасность", g2Desc: "Только сертифицированные гипоаллергенные материалы и 100% одноразовые расходники.",
      g3Title: "Пунктуальность",         g3Desc: "Прием строго в назначенное время. Никаких очередей или томительного ожидания.",
      g4Title: "Прозрачный прайс",        g4Desc: "Все доп. манипуляции обсуждаются заранее. Полная финансовая честность.",
      fearTitle: "СТРАХИ • FAQ",
      fearSubtitle: "Отвечаю на частые вопросы клиентов",
      formTitle: "ЗАПИСЬ НА ВИЗИТ",
      formComfort: "Кабинет оборудован кондиционером. Всегда свежий кофе, чай, приятная музыка и заботливый сервис.",
      formHelp: "Оставьте ваши данные, я свяжусь с вами в WhatsApp в течение 5 минут для подтверждения времени.",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "Номер телефона (WhatsApp)",
      formCta: "Подтвердить запись через WhatsApp",
      modalSuccessTitle: "Заявка отправлена!",
      modalSuccessDesc: "Я уже готовлюсь связаться с вами в WhatsApp. До встречи на процедуре!",
      modalClose: "Перейти в WhatsApp",
      footerText: "Студия эстетики SVTL в Атырау. Маникюр, педикюр, шугаринг.",
      rights: "Все права защищены.",
      total: "Итого",
      portfolioTitle: "РЕЗУЛЬТАТЫ РАБОТ",
      portfolioSubtitle: "Интерактивное сравнение: потяните ползунок в стороны, чтобы оценить качество маникюра.",
      beforeText: "ДО",
      afterText: "ПОСЛЕ",
      workNudeTitle: "Классический нюд",
      workNudeDesc: "Деликатная обработка кутикулы без порезов, выравнивание ногтевой пластины и покрытие премиальным нюдовым базовым гелем.",
      workFrenchTitle: "Элегантный френч",
      workFrenchDesc: "Классический французский маникюр на средней длине. Идеально ровная линия улыбки и укрепление структуры ногтя.",
      workBordeauxTitle: "Глубокий бордо",
      workBordeauxDesc: "Комплексный антивозрастной уход за кожей рук и кутикулой, укрепление ослабленных ногтей и покрытие благородным винным оттенком.",
      workLavenderTitle: "Нежная лаванда",
      workLavenderDesc: "Свежий дизайн с использованием пастельно-лавандового оттенка. Тонкое, но прочное покрытие гель-лаком.",
      workRedTitle: "Яркий красный",
      workRedDesc: "Классический маникюр с безупречным глубоким красным покрытием «под кутикулу». Идеальная архитектура и стойкий глянец.",
      ageLabel: "Возраст рук",
      timeLabel: "Время работы",

      // Categories & services names
      catManicureName: "Маникюр",
      catPedicureName: "Педикюр",
      catSugaringName: "Шугаринг",
      
      serviceManicureClassicName: "Гигиенический маникюр",
      serviceManicureClassicDesc: "Аппаратный/комбинированный маникюр с обработкой кутикулы и формой ногтей без покрытия.",
      serviceManicureGelName: "Маникюр с гель-лаком",
      serviceManicureGelDesc: "Маникюр + укрепление, выравнивание пластины базой и покрытие премиальным гель-лаком под кутикулу.",
      serviceManicureExtName: "Наращивание ногтей",
      serviceManicureExtDesc: "Моделирование длины и архитектуры ногтей гелем на формах с подбором идеальной формы.",
      
      optManiDesign: "Дизайн (френч/градиент/рисунки)",
      optManiStrengthen: "Доп. укрепление гелем / акрилом",
      optManiRepair: "Ремонт ногтя (1-2 шт)",
      optManiSpa: "СПА-уход (парафинотерапия и массаж)",

      servicePediExpressName: "Экспресс-педикюр",
      servicePediExpressDesc: "Обработка пальчиков ног с покрытием гель-лаком. Быстрый и красивый уход.",
      servicePediSmartName: "Полный Smart-педикюр",
      servicePediSmartDesc: "Обработка всей стопы Smart-дисками (удаление трещин, натоптышей) + обработка пальчиков с гель-лаком.",
      servicePediHygieneName: "Гигиенический педикюр",
      servicePediHygieneDesc: "Аппаратная обработка стоп и пальчиков без покрытия лаком. Здоровье и чистота ваших ног.",
      
      optPediDesign: "Дизайн ногтей на ногах",
      optPediCracks: "Удаление стержневых мозолей / глубоких трещин",
      optPediSpa: "СПА-уход (пилинг, питательная маска, массаж)",

      serviceSugarBikiniName: "Глубокое бикини",
      serviceSugarBikiniDesc: "Деликатное и бережное удаление волос сахарной пастой в интимной зоне с антисептическим уходом.",
      serviceSugarLegsName: "Ноги полностью",
      serviceSugarLegsDesc: "Депиляция ног по всей длине сахарной пастой (бедра, голени). Гладкая кожа до 4 недель.",
      serviceSugarUnderarmsName: "Подмышки",
      serviceSugarUnderarmsDesc: "Быстрое удаление волос в подмышечной зоне гипоаллергенной пастой.",
      serviceSugarArmsName: "Руки полностью",
      serviceSugarArmsDesc: "Шугаринг рук по всей длине (до плеча). Кожа становится идеально гладкой.",
      
      optSugarMask: "Успокаивающая альгинатная маска",
      optSugarPeeling: "Энзимный пилинг против вросших волос",
      optSugarFace: "Депиляция зоны на лице (усики/подбородок)",
    },
    kk: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "АТЫРАУДАҒЫ МАНИКЮР • ПЕДИКЮР • ШУГАРИНГ",
      heroTitle: "СІЗДІҢ СҰЛУЛЫҒЫҢЫЗ ҮШІН ПРЕМИУМ КҮТІМ ЖӘНЕ ЭСТЕТИКА",
      heroSubtitle: "МІНСІЗ САПА • 100% СТЕРИЛЬДІЛІК",
      heroDesc: "Сертификатталған шебер Светланадан жеке тәсіл. Қауіпсіз процедуралар, премиум материалдар және сіздің жайлылығыңыз бен сұлулығыңызға қамқорлық жасайтын кабинет.",
      heroCta: "Құнын есептеу және жеңілдікті бекіту",
      trustTitle: "МАҒАН НЕГЕ СЕНЕДІ",
      trustSubtitle: "Мен қауіпсіздікке, ашықтыққа және жоғары қызмет көрсету деңгейіне кепілдік беремін",
      trust1Title: "100% стерильді құралдар",
      trust1Desc: "СанПиН стандарттары бойынша 3 кезеңді дезинфекция. Құралдар ГП-10 сухожарында стерильденеді, крафт-пакет тек сіздің көзіңізше ашамын.",
      trust2Title: "0 жасырын үстемелер",
      trust2Desc: "Процедуралардың құны жұмыс басталғанға дейін бекітіледі. Сіз әрқашан визит соңында ешқандай қосымша төлемсіз нақты соманы білесіз.",
      trust3Title: "Уақытыңызды бағалаңыз",
      trust3Desc: "Процедуралардың қатаң таймингі. Маникюр немесе шугаринг тез, ұқыпты және уақытты кешіктірмей өтеді.",
      servicesTitle: "ҚЫЗМЕТТЕРІМ",
      servicesSubtitle: "Бағытты, қызметті және опцияларды таңдаңыз — құны мен уақыты автоматты түрде есептеледі.",
      servicesSelectBase: "1. Қызметті таңдаңыз:",
      servicesSelectOptions: "2. Қосымша опциялар:",
      servicesTotal: "Қорытынды есеп:",
      servicesTotalPrice: "Құны",
      servicesTotalTime: "Уақыты",
      servicesSelectedPreview: "Сіздің сеанс",
      serviceCta: "Есептеуді бекіту және жазылу",
      guaranteesTitle: "КЕПІЛДІКТЕР",
      guaranteesSubtitle: "Сіз менің жеке сапа стандарттарыммен қорғалғансыз",
      g1Title: "Жеке жауапкершілік", g1Desc: "Сіз тікелей маған жазыласыз. Мен процедураның әрбір кезеңі мен жайлылығыңыз үшін жауап беремін.",
      g2Title: "Абсолютті қауіпсіздік", g2Desc: "Тек сертификатталған гипоаллергенді материалдар және 100% бір реттік шығын материалдары.",
      g3Title: "Ұқыптылық",          g3Desc: "Қабылдау белгіленген уақытта қатаң түрде жүреді. Кезектер немесе ұзақ күту жоқ.",
      g4Title: "Ашық баға",          g4Desc: "Барлық қосымша манипуляциялар алдын ала талқыланады. Толық қаржылық адалдық.",
      fearTitle: "ҚОРҚЫНЫШТАР • FAQ",
      fearSubtitle: "Клиенттердің жиі сұрақтарына жауап беремін",
      formTitle: "ҚАБЫЛДАУҒА ЖАЗЫЛУ",
      formComfort: "Кабинет кондиционермен жабдықталған. Әрқашан жаңа кофе, шай, жағымды музыка және қамқорлық қызметі бар.",
      formHelp: "Деректеріңізді қалдырыңыз, мен уақытты растау үшін 5 минут ішінде WhatsApp арқылы хабарласамын.",
      namePlaceholder: "Сіздің есіміңіз",
      phonePlaceholder: "Телефон нөмірі (WhatsApp)",
      formCta: "WhatsApp арқылы жазылуды растау",
      modalSuccessTitle: "Өтінім жіберілді!",
      modalSuccessDesc: "Мен WhatsApp арқылы хабарласуға дайынмын. Процедурада кездескенше!",
      modalClose: "WhatsApp-қа өту",
      footerText: "Атыраудағы SVTL эстетика студиясы. Маникюр, педикюр, шугаринг.",
      rights: "Барлық құқықтар қорғалған.",
      total: "Жиыны",
      portfolioTitle: "ЖҰМЫС НӘТИЖЕЛЕРІ",
      portfolioSubtitle: "Интерактивті салыстыру: маникюр сапасын бағалау үшін жүгірткіні екі жаққа тартыңыз.",
      beforeText: "ДЕЙІН",
      afterText: "КЕЙІН",
      workNudeTitle: "Классикалық нюд",
      workNudeDesc: "Кутикуланы кесіксіз нәзік өңдеу, тырнақ пластинасын тегістеу және премиум нюд базалық гельмен жабу.",
      workFrenchTitle: "Элегантты френч",
      workFrenchDesc: "Орташа ұзындықтағы классикалық француз маникюрі. Тырнақ құрылымын нығайту және мінсіз күлімсіреу сызығы.",
      workBordeauxTitle: "Терең бордо",
      workBordeauxDesc: "Қол терісі мен кутикулаға арналған кешенді қартаюға қарсы күтім, әлсіреген тырнақтарды нығайту және асыл шарап түсті жабын.",
      workLavenderTitle: "Нәзік лаванда",
      workLavenderDesc: "Пастельді лаванда реңкін қолданатын жаңа дизайн. Гель-лакпен жұқа, бірақ берік жабын.",
      workRedTitle: "Ашық қызыл",
      workRedDesc: "Кутикула астына мінсіз қанық қызыл түспен жабылған классикалық маникюр. Мінсіз архитектура және тұрақты жылтыр.",
      ageLabel: "Қол жасы",
      timeLabel: "Жұмыс уақыты",

      // Categories & services names
      catManicureName: "Маникюр",
      catPedicureName: "Педикюр",
      catSugaringName: "Шугаринг",
      
      serviceManicureClassicName: "Гигиеналық маникюр",
      serviceManicureClassicDesc: "Жабынсыз кутикуланы өңдеу және тырнақтарға пішін берумен аппараттық/комбинацияланған маникюр.",
      serviceManicureGelName: "Гель-лакпен маникюр",
      serviceManicureGelDesc: "Маникюр + нығайту, тырнақ пластинасын базамен тегістеу және кутикула астына премиум гель-лак жабу.",
      serviceManicureExtName: "Тырнақ өсіру",
      serviceManicureExtDesc: "Мінсіз пішінді таңдай отырып, формаларда тырнақтардың ұзындығы мен архитектурасын гельмен модельдеу.",
      
      optManiDesign: "Дизайн (френч/градиент/суреттер)",
      optManiStrengthen: "Гельмен / akрилмен қосымша нығайту",
      optManiRepair: "Тырнақты жөндеу (1-2 дана)",
      optManiSpa: "СПА-күтім (парафинотерапия және массаж)",

      servicePediExpressName: "Экспресс-педикюр",
      servicePediExpressDesc: "Аяқ саусақтарын өңдеу және гель-лак жабу. Жылдам әрі әдемі күтім.",
      servicePediSmartName: "Толық Smart-педикюр",
      servicePediSmartDesc: "Smart-дискілермен бүкіл табанды өңдеу (жарықтарды, сүйелдерді кетіру) + саусақтарды өңдеу және гель-лак жабу.",
      servicePediHygieneName: "Гигиеналық педикюр",
      servicePediHygieneDesc: "Табан мен саусақтарды лаксыз аппараттық өңдеу. Аяғыңыздың денсаулығы мен тазалығы.",
      
      optPediDesign: "Аяқ саусақтарындағы тырнақ дизайны",
      optPediCracks: "Терең жарықтар мен сүйелдерді кетіру",
      optPediSpa: "СПА-күтім (пилинг, қоректік маска, массаж)",

      serviceSugarBikiniName: "Терең бикини",
      serviceSugarBikiniDesc: "Интимдік аймақтағы түктерді антисептикалық күтіммен қант пастасымен нәзік әрі мұқият кетіру.",
      serviceSugarLegsName: "Толық аяқтар",
      serviceSugarLegsDesc: "Аяқтарды толық ұзындығы бойынша қант пастасымен депиляциялау (сан, сирақ). 4 аптаға дейін тегіс тері.",
      serviceSugarUnderarmsName: "Қолтық асты",
      serviceSugarUnderarmsDesc: "Қолтық асты аймағындағы түктерді гипоаллергенді пастамен жылдам кетіру.",
      serviceSugarArmsName: "Толық қолдар",
      serviceSugarArmsDesc: "Қолдарды толық ұзындығы бойынша шугарингтеу (иыққа дейін). Тері мінсіз тегіс болады.",
      
      optSugarMask: "Тыныштандыратын альгинатты маска",
      optSugarPeeling: "Түктердің ішке өсуіне қарсы энзимді пилинг",
      optSugarFace: "Бет аймағындағы депиляция (мұрт/иек)",
    }
  };

  const faqData = {
    ru: [
      { q: "Покрытие быстро слезет?",   a: "Гарантия носки 28 дней. Скол — переделаю бесплатно в день обращения." },
      { q: "Будет больно от аппарата?", a: "Я работаю по микротехнологии мягкой обработки. Никаких прожигов и порезов." },
      { q: "А стерильность?",           a: "3-этапная медицинская стерилизация. Крафт-пакет вскрываю при вас. Пилки одноразовые." },
      { q: "Будут скрытые доплаты?",    a: "Стоимость фиксируется до начала. Снятие и выравнивание уже в прайсе." },
      { q: "Форма будет не та?",         a: "Форма и длина согласуются с вами пошагово до покрытия базой." }
    ],
    kk: [
      { q: "Жабын тез түсіп қалады ма?", a: "28 күндік кепілдік. Сызат болса — тегін қайта жасаймын." },
      { q: "Аппараттан ауырады ма?",     a: "Жұмсақ өңдеу технологиясымен жұмыс істеймін. Күю мен кесік жоқ." },
      { q: "Стерильділік сақтала ма?",   a: "3 кезеңді стерилизация. Крафт-пакет көзіңізше ашылады. Егеулер бір реттік." },
      { q: "Жасырын үстемелер бола ма?", a: "Құны жұмыс алдында бекітіледі. Алып тастау мен тегістеу прайске кіреді." },
      { q: "Пішіні басқаша бола ма?",    a: "Пішін мен ұзындық базаны жаққанға дейін сізбен келісіледі." }
    ]
  };

  const t = translations[lang];

  /* ─── Calculator ─── */
  const catObj = categories[activeCategory];
  const baseServiceObj = catObj.services.find(s => s.id === selectedServiceId) || catObj.services[0];
  const totalPrice = baseServiceObj.price + selectedOptions.reduce((s, id) => {
    const o = catObj.options.find(x => x.id === id); return s + (o ? o.price : 0);
  }, 0);
  const totalTime = baseServiceObj.time + selectedOptions.reduce((s, id) => {
    const o = catObj.options.find(x => x.id === id); return s + (o ? o.time : 0);
  }, 0);
  const fmtTime = (m) => {
    const h = Math.floor(m / 60), mn = m % 60, hl = lang === 'ru' ? 'ч.' : 'сағ.';
    return `${h > 0 ? `${h} ${hl} ` : ''}${mn > 0 ? `${mn} мин.` : ''}`;
  };
  const toggleOption = (id) => setSelectedOptions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const getWAMessage = () => {
    const categoryName = t[catObj.nameKey];
    const sn = t[baseServiceObj.nameKey];
    const ol = selectedOptions.map(id => t[catObj.options.find(o => o.id === id).nameKey]).join(', ');
    return lang === 'ru'
      ? `Привет! Хочу записаться на ${categoryName.toLowerCase()}:\n💅 ${sn}${ol ? ' + ' + ol : ''}\n💰 ${totalPrice} ₸\n⏱️ ${fmtTime(totalTime)}\nИмя: ${name}\nТел: ${phone}`
      : `Сәлем! ${categoryName.toLowerCase()} қызметіне жазылғым келеді:\n💅 ${sn}${ol ? ' + ' + ol : ''}\n💰 ${totalPrice} ₸\n⏱️ ${fmtTime(totalTime)}\nЕсімім: ${name}\nТел: ${phone}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setShowModal(true); }, 1000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.open(`https://wa.me/77016698086?text=${encodeURIComponent(getWAMessage())}`, '_blank', 'noopener,noreferrer');
    setName(''); setPhone('');
  };

  const scrollToForm = () => document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });

  /* ─── Shared subcomponents ─── */
  const SectionLabel = ({ text }) => (
    <div className="flex items-center gap-1.5 mb-2">
      <span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ {text} ✦</span>
    </div>
  );

  const NavControls = () => (
    <div className="flex items-center gap-1.5">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
         className={`hidden sm:inline-flex p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-[#E1306C]' : 'text-charcoal-400 hover:text-[#E1306C]'} transition-colors`}>
        <InstagramIcon className="w-4 h-4" />
      </a>
      <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
         className={`hidden sm:inline-flex p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-[#25D366]' : 'text-charcoal-400 hover:text-[#25D366]'} transition-colors`}>
        <WhatsAppIcon className="w-4 h-4" />
      </a>
      <div className={`hidden sm:block h-5 w-px ${isDark ? 'bg-white/10' : 'bg-charcoal-200'} mx-0.5`}></div>
      <button onClick={cycleTheme}
        className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors`}
        title={theme === 'dark' ? 'Тёмная' : theme === 'light' ? 'Светлая' : 'Системная'}>
        <ThemeIcon />
      </button>
      <div className="relative animate-fadeIn" ref={langPopupRef}>
        <button onClick={() => setShowLangPopup(!showLangPopup)}
          className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors flex items-center gap-1`}>
          <GlobeIcon />
          <span className="text-[9px] font-bold uppercase">{lang === 'ru' ? 'RU' : 'KZ'}</span>
        </button>
        {showLangPopup && (
          <div className={`absolute right-0 top-full mt-2 ${isDark ? 'bg-charcoal-800 border-white/10' : 'bg-white border-charcoal-200'} border rounded-xl shadow-xl overflow-hidden z-50 popup-backdrop min-w-[130px]`}>
            <button onClick={() => { setLang('ru'); setShowLangPopup(false); }}
              className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'ru' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}>
              <span>🇷🇺</span> Русский
            </button>
            <button onClick={() => { setLang('kk'); setShowLangPopup(false); }}
              className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'kk' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}>
              <span>🇰🇿</span> Қазақша
            </button>
          </div>
        )}
      </div>
      <div className={`h-5 w-px ${isDark ? 'bg-white/10' : 'bg-charcoal-200'} mx-0.5 lg:hidden`}></div>
      <button onClick={() => setIsMobileMenuOpen(true)}
        className={`lg:hidden p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors`}
        aria-label="Toggle mobile menu"
      >
        <MenuIcon className="w-4 h-4" />
      </button>
    </div>
  );

  /* ─── RENDER ─── */
  return (
    <div className={`relative min-h-screen ${bg} bg-grain ${isDark ? 'text-neutral-100' : 'text-charcoal-800'} font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950`}>

      {/* ═══════════ PREMIUM BACKGROUND LAYERS (fixed, behind everything) ═══════════ */}
      <div className="premium-orbs" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
      <div className="bg-grid-lines" aria-hidden="true"></div>

      {/* ═══════════ SCATTERED BEAUTY BACKGROUND ICONS ═══════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {scatteredIconsList.map((item, idx) => {
          const IconComp = item.Icon;
          return (
            <div
              key={idx}
              className={`absolute ${item.rotate} transition-opacity duration-300`}
              style={{
                top: item.top,
                ...(item.left ? { left: item.left } : { right: item.right }),
              }}
            >
              <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-bronze-500" style={{ opacity: isDark ? 0.022 : 0.045 }} />
            </div>
          );
        })}
      </div>

      {/* ═══════════ SCROLL PROGRESS BAR ═══════════ */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-bronze-700 via-bronze-400 to-bronze-200 z-[100] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* ═══════════ HEADER — full width on desktop ═══════════ */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${bgHeader} border-b ${border} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center">
          <div className="flex flex-col items-start leading-none">
            <span className={`font-sans font-bold text-2xl tracking-widest ${textPrimary}`}>SVTL</span>
            <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
          </div>
          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {['#trust','#services','#portfolio','#guarantees','#faq','#location','#appointment-form'].map((href, i) => {
              const labels = { 
                ru: ['О мне','Услуги','Работы','Гарантии','FAQ','Адрес','Запись'], 
                kk: ['Мен туралы','Қызметтер','Жұмыстар','Кепілдіктер','FAQ','Мекен-жай','Жазылу'] 
              };
              return (
                <a key={href} href={href}
                   className={`text-xs font-bold uppercase tracking-wider ${textMuted} hover:text-bronze-500 transition-colors`}>
                  {labels[lang][i]}
                </a>
              );
            })}
          </nav>
          <NavControls />
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
              <div className="inline-flex items-center gap-1.5 border border-bronze-500/30 bg-bronze-500/5 px-3 py-1 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-500 animate-pulse"></span>
                <span className="text-bronze-300 font-bold tracking-widest text-[9px] uppercase">{t.heroSuperTitle}</span>
              </div>
              <h1 className={`font-display font-black tracking-tighter ${textPrimary} leading-[1.05] uppercase mb-5
                             text-4xl sm:text-5xl lg:text-6xl xl:text-7xl`}>
                {t.heroTitle}
              </h1>
              <div className="border border-bronze-500/20 bg-bronze-950/20 rounded-xl p-3 mb-6 inline-block">
                <span className="text-bronze-400 font-sans font-bold text-xs tracking-wider uppercase">✦ {t.heroSubtitle} ✦</span>
              </div>
              <p className={`${textSecondary} text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8`}>{t.heroDesc}</p>
              <button onClick={scrollToForm} id="hero-cta-btn"
                className="w-full lg:w-auto bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 px-8 py-4 rounded-xl font-bold tracking-wider uppercase text-xs transition-all duration-300 shadow-[0_4px_24px_rgba(197,168,128,0.25)]">
                {t.heroCta}
              </button>
            </div>

            {/* Right: stat cards (desktop only) */}
            <div className="hidden lg:grid grid-cols-1 gap-4 w-72 xl:w-80 flex-shrink-0">
              {[
                { num: '28', unit: 'дней', label: 'гарантия покрытия' },
                { num: '100%', unit: '', label: 'одноразовые расходники' },
                { num: '0 ₸', unit: '', label: 'скрытых доплат' },
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
          <SectionLabel text="INFO" />
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
          <SectionLabel text="SERVICES" />
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>{t.servicesTitle}</h2>
          <p className={`${textSecondary} text-sm mb-10`}>{t.servicesSubtitle}</p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.values(categories).map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl font-display font-bold text-[11px] uppercase tracking-wider border transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 border-bronze-500 shadow-lg shadow-bronze-500/10' 
                      : `${border} ${isDark ? 'bg-charcoal-900/50 hover:bg-charcoal-900 text-neutral-400 hover:text-white' : 'bg-white hover:bg-charcoal-50 text-charcoal-600 hover:text-charcoal-900'}`
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
                    const isActive = selectedServiceId === svc.id;
                    return (
                      <div key={svc.id} onClick={() => setSelectedServiceId(svc.id)}
                        className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden
                          ${isDark ? 'bg-charcoal-900/50' : 'bg-white/80'}
                          ${isActive
                            ? `border-bronze-500 shadow-[0_0_20px_rgba(197,168,128,0.12)] ${isDark ? 'bg-charcoal-900' : 'bg-white'}`
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

              {/* Extra options */}
              <div>
                <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-4">{t.servicesSelectOptions}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                  {catObj.options.map((opt) => {
                    const isChecked = selectedOptions.includes(opt.id);
                    return (
                      <div key={opt.id} onClick={() => toggleOption(opt.id)}
                        className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-300 flex items-center justify-between
                          ${isDark ? 'bg-charcoal-900/30' : 'bg-white/60'}
                          ${isChecked ? 'border-bronze-500/50' : `${borderSubtle} opacity-80 hover:opacity-100`}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                            ${isChecked ? 'bg-bronze-500 border-bronze-500 text-charcoal-950' : isDark ? 'border-white/20' : 'border-charcoal-300'}`}>
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
              <div className={`border border-bronze-500/30 rounded-2xl p-6 ${isDark ? 'bg-charcoal-950/90' : 'bg-white'} shadow-2xl relative overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-5">{t.servicesTotal}</h4>

                {/* Receipt */}
                <div className={`${isDark ? 'bg-white/3' : 'bg-charcoal-50'} rounded-xl p-4 mb-5 space-y-1.5`}>
                  <div className={`flex justify-between items-center font-bold ${textPrimary} text-sm`}>
                    <span>{t[baseServiceObj.nameKey]}</span>
                    <span className="text-bronze-500">{baseServiceObj.price.toLocaleString()} ₸</span>
                  </div>
                  {selectedOptions.map(id => {
                    const o = catObj.options.find(x => x.id === id); if (!o) return null;
                    return (
                      <div key={id} className={`flex justify-between items-center text-xs ${textMuted} pl-4`}>
                        <span>+ {t[o.nameKey]}</span>
                        <span>+{o.price.toLocaleString()} ₸</span>
                      </div>
                    );
                  })}
                  <div className={`border-t ${border} pt-2.5 mt-1 flex justify-between items-center font-black ${textPrimary}`}>
                    <span className="text-xs uppercase tracking-wider">{t.total}:</span>
                    <span className="text-bronze-400 text-base">{totalPrice.toLocaleString()} ₸</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className={`${textSecondary} text-xs`}>{t.servicesTotalTime}:</span>
                  <span className="font-display font-bold text-bronze-300 text-sm tracking-wider">≈ {fmtTime(totalTime)}</span>
                </div>

                <button onClick={scrollToForm}
                  className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 py-3.5 rounded-xl font-bold tracking-wider uppercase text-xs transition-all duration-300 shadow-lg">
                  {t.serviceCta} ✦
                </button>
              </div>

              {/* Trust badges */}
              <div className={`border ${border} rounded-2xl p-4 ${bgCard} grid grid-cols-3 gap-3 text-center`}>
                {[
                  { icon: '🛡️', label: lang === 'ru' ? '28 дней\nгарантия' : '28 күн\nкепілдік' },
                  { icon: '🔬', label: lang === 'ru' ? '3-уровн.\nстерильность' : '3 деңгейлі\nстерилизация' },
                  { icon: '⏱️', label: lang === 'ru' ? 'До 2 часов\nработа' : '2 сағатқа\ndейін' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{b.icon}</span>
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
          <SectionLabel text="PORTFOLIO" />
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
                    onClick={() => setActiveWork(index)}
                    className={`flex-shrink-0 snap-start px-5 py-2.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider border transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 border-bronze-500 shadow-lg shadow-bronze-500/10' 
                        : `${border} ${isDark ? 'bg-charcoal-900/50 hover:bg-charcoal-900 text-neutral-400 hover:text-white' : 'bg-white hover:bg-charcoal-50 text-charcoal-600 hover:text-charcoal-900'}`
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
                  style={{ width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }}
                  draggable="false"
                />
              </div>
              {/* Before label */}
              <div className="absolute left-6 top-6 bg-charcoal-950/80 backdrop-blur-md text-white border border-white/10 font-display font-black text-[10px] sm:text-xs px-4 py-2 rounded-xl z-20 tracking-widest shadow-lg">
                {t.beforeText}
              </div>

              {/* Slide Line Divider */}
              <div 
                className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-bronze-400 via-bronze-500 to-bronze-600 z-30 cursor-ew-resize shadow-[0_0_10px_rgba(197,168,128,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag handle */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-950/95 border-2 border-bronze-500 shadow-2xl flex items-center justify-center cursor-ew-resize transition-transform duration-150 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
                >
                  {/* Left arrow */}
                  <svg className="w-3 h-3 text-bronze-500 -ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                  {/* Right arrow */}
                  <svg className="w-3 h-3 text-bronze-500 -mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </div>
              </div>

              {/* Instructions tooltip overlay that disappears when dragging starts */}
              {sliderPosition === 50 && !isDragging && (
                <div className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-[2px] flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300">
                  <div className="bg-charcoal-950/90 border border-bronze-500/30 px-6 py-3.5 rounded-2xl text-center shadow-2xl max-w-xs mx-4">
                    <div className="text-bronze-400 text-lg mb-1.5 animate-bounce">↔</div>
                    <p className="text-white text-xs font-bold uppercase tracking-wider leading-snug">
                      {lang === 'ru' ? 'Потяните ползунок' : 'Жүгірткіні тартыңыз'}
                    </p>
                  </div>
                </div>
              )}
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
                <div className={`h-8 w-px ${isDark ? 'bg-white/10' : 'bg-charcoal-200'} hidden md:block`}></div>
                <div className="flex flex-col gap-1">
                  <span className={`${textMuted} text-[9px]`}>{t.timeLabel}</span>
                  <span className="text-bronze-400 font-display text-sm">
                    {lang === 'ru' ? works[activeWork].time : works[activeWork].time.replace('ч', 'сағ').replace('мин', 'мин')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GUARANTEES ═══════════ */}
      <section id="guarantees" className={`border-b ${border} py-14 lg:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionLabel text="RULES" />
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
          <SectionLabel text="FAQ" />
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10`}>{t.fearTitle}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-5xl">
            {faqData[lang].map((item, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className={`${isDark ? 'bg-charcoal-900' : 'bg-white'} border ${borderSubtle} rounded-2xl overflow-hidden transition-all duration-300`}>
                  <button onClick={() => setActiveFaq(isOpen ? null : i)}
                    className={`w-full flex justify-between items-center p-5 text-left ${isDark ? 'hover:text-bronze-500' : 'hover:text-bronze-600'} transition-colors`}>
                    <span className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>{item.q}</span>
                    <ChevronDownIcon className={`flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-bronze-500' : textMuted}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? `max-h-40 border-t ${borderSubtle}` : 'max-h-0'}`} style={{ overflow: 'hidden' }}>
                    <div className={`p-5 ${textSecondary} text-sm leading-relaxed ${isDark ? 'bg-charcoal-900/50' : 'bg-charcoal-50/50'}`}>{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ LOCATION MAP ═══════════ */}
      <section id="location" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionLabel text="LOCATION" />
          <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-3`}>
            {lang === 'ru' ? 'КАК ДОБРАТЬСЯ' : 'МЕКЕН-ЖАЙ'}
          </h2>
          <p className={`${textSecondary} text-sm mb-8`}>
            {lang === 'ru'
              ? 'Кабинет находится в студии лазерной эпиляции Shade. Вход со стороны проспекта.'
              : 'Кабинет Shade лазерлік эпиляция студиясында орналасқан. Кіреберіс даңғыл жағынан.'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Map iframe — takes 2/3 width on desktop */}
            <div className={`lg:col-span-2 rounded-2xl overflow-hidden border ${border} shadow-xl`} style={{height: '380px'}}>
              <iframe
                title="Google Maps — Shade, Проспект Азаттык 93, Атырау"
                src="https://maps.google.com/maps?q=%D0%9F%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82+%D0%90%D0%B7%D0%B0%D1%82%D1%82%D1%8B%D0%BA+93+%D0%90%D1%82%D1%8B%D1%80%D0%B0%D1%83+%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD&t=m&z=17&output=embed&hl=ru"
                width="100%"
                height="100%"
                style={{border:'none', display:'block'}}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
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
                      {lang === 'ru' ? 'Адрес' : 'Мекен-жайы'}
                    </p>
                    <p className={`${textSecondary} text-sm leading-relaxed`}>
                      {lang === 'ru'
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
                      {lang === 'ru' ? 'График' : 'Жұмыс уақыты'}
                    </p>
                    <p className={`${textSecondary} text-sm`}>
                      {lang === 'ru' ? 'Пн–Вс: 10:00–20:00' : 'Дс–Жс: 10:00–20:00'}
                    </p>
                    <p className={`${textMuted} text-xs mt-0.5`}>
                      {lang === 'ru' ? 'Только по записи' : 'Тек алдын ала жазылу'}
                    </p>
                  </div>
                </div>

                <div className={`border-t ${borderSubtle} pt-4 flex items-start gap-3`}>
                  <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                    <PhoneIcon className="w-4 h-4 text-bronze-500" />
                  </div>
                  <div>
                    <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                      {lang === 'ru' ? 'Телефон / WhatsApp' : 'Телефон / WhatsApp'}
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
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 font-bold py-3.5 px-5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {lang === 'ru' ? 'Открыть в 2ГИС' : '2ГИС-та ашу'}
              </a>

              <a
                href="https://wa.me/77016698086?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9A%D0%B0%D0%BA%20%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BC%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-bold py-3.5 px-5 rounded-xl text-xs tracking-wider uppercase transition-all`}
              >
                <WhatsAppIcon className="w-4 h-4" />
                {lang === 'ru' ? 'Спросить маршрут' : 'Бағыт сұрау'}
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
              <SectionLabel text="BOOK" />
              <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6`}>{t.formTitle}</h2>
              <div className="bg-bronze-500/10 border border-bronze-500/20 p-4 rounded-xl text-bronze-300 text-sm mb-6 leading-relaxed flex items-start gap-3">
                <span className="text-xl">❄️</span><p>{t.formComfort}</p>
              </div>
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
            <div className={`border border-bronze-500/20 rounded-2xl p-6 lg:p-8 ${isDark ? 'bg-charcoal-950/80' : 'bg-white'} shadow-2xl`}>
              <div className="flex justify-center mb-4">
                <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">BOOK APPOINTMENT</span>
              </div>

              {/* Receipt */}
              <div className={`${isDark ? 'bg-bronze-500/5' : 'bg-bronze-50'} border border-bronze-500/20 rounded-xl p-4 mb-5 text-sm`}>
                <span className="text-bronze-400 font-bold block mb-2 uppercase tracking-wider text-[9px]">{t.servicesSelectedPreview}:</span>
                <div className={`flex justify-between font-bold ${textPrimary} mb-1`}>
                  <span>{t[baseServiceObj.nameKey]}</span>
                  <span className="text-bronze-500">{baseServiceObj.price.toLocaleString()} ₸</span>
                </div>
                {selectedOptions.map(id => {
                  const o = catObj.options.find(x => x.id === id); if (!o) return null;
                  return <div key={id} className={`flex justify-between text-xs ${textMuted} pl-3`}><span>+ {t[o.nameKey]}</span><span>+{o.price.toLocaleString()} ₸</span></div>;
                })}
                <div className={`border-t ${border} mt-3 pt-2.5 flex justify-between font-black ${textPrimary}`}>
                  <span className="text-xs uppercase tracking-wider">{t.total}:</span>
                  <span className="text-bronze-400">{totalPrice.toLocaleString()} ₸ ({fmtTime(totalTime)})</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} required
                  className={`${isDark ? 'bg-charcoal-900 border-white/10 text-white placeholder-neutral-500' : 'bg-charcoal-50 border-charcoal-200 text-charcoal-800 placeholder-charcoal-400'} border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full`} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} required
                  className={`${isDark ? 'bg-charcoal-900 border-white/10 text-white placeholder-neutral-500' : 'bg-charcoal-50 border-charcoal-200 text-charcoal-800 placeholder-charcoal-400'} border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full`} />
                <button type="submit" disabled={isSubmitting} id="form-submit-btn"
                  className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 disabled:opacity-50 text-charcoal-950 font-bold py-4 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 shadow-md flex justify-center items-center gap-2">
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
            <div className="flex flex-col leading-none">
              <span className={`font-sans font-bold text-2xl tracking-widest ${textPrimary}`}>SVTL</span>
              <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
            </div>

            <p className={`${textMuted} text-xs max-w-xs lg:text-center`}>{t.footerText}</p>

            {/* Social icons — clean, no circles */}
            <div className="flex gap-5 items-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className={`${isDark ? 'text-neutral-500' : 'text-charcoal-400'} hover:text-[#E1306C] transition-colors duration-200`}>
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                 className={`${isDark ? 'text-neutral-500' : 'text-charcoal-400'} hover:text-[#25D366] transition-colors duration-200`}>
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a href="tel:+77016698086"
                 className={`${isDark ? 'text-neutral-500' : 'text-charcoal-400'} hover:text-[#4A90D9] transition-colors duration-200`}>
                <PhoneIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className={`border-t ${borderSubtle} mt-8 pt-6 text-center`}>
            <p className={`${textFaint} text-[10px]`}>© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
          </div>
        </div>
      </footer>

      {/* ═══════════ SUCCESS MODAL ═══════════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm popup-backdrop">
          <div className={`${isDark ? 'bg-charcoal-800' : 'bg-white'} border border-bronze-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl`}>
            <div className="w-14 h-14 bg-bronze-500/10 text-bronze-500 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">✓</div>
            <h3 className={`font-display text-xl font-black uppercase tracking-tight ${textPrimary} mb-3`}>{t.modalSuccessTitle}</h3>
            <p className={`${textSecondary} text-sm leading-relaxed mb-6`}>{t.modalSuccessDesc}</p>
            <button onClick={handleModalClose} className="w-full bg-bronze-500 hover:bg-bronze-600 text-charcoal-950 font-bold py-3 rounded-xl text-sm tracking-wide transition-all">{t.modalClose}</button>
          </div>
        </div>
      )}

      {/* ═══════════ MOBILE MENU OVERLAY (Sandwich Panel) ═══════════ */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden popup-backdrop">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-md" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className={`absolute top-0 right-0 h-full w-4/5 max-w-[320px] ${isDark ? 'bg-charcoal-900/95 border-l border-white/10' : 'bg-[#fcfbf9]/95 border-l border-charcoal-200'} shadow-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 transform`}>
            <div>
              {/* Header inside Mobile Menu */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col items-start leading-none">
                  <span className={`font-sans font-bold text-xl tracking-widest ${textPrimary}`}>SVTL</span>
                  <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-white' : 'text-charcoal-500 hover:text-charcoal-900'} transition-colors`}
                  aria-label="Close menu"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-6">
                {['#trust','#services','#portfolio','#guarantees','#faq','#location','#appointment-form'].map((href, i) => {
                  const labels = { 
                    ru: ['О мне','Услуги','Работы','Гарантии','FAQ','Адрес','Запись'], 
                    kk: ['Мен туралы','Қызметтер','Жұмыстар','Кепілдіктер','FAQ','Мекен-жай','Жазылу'] 
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className={`p-2.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-[#E1306C]' : 'text-charcoal-400 hover:text-[#E1306C]'} transition-colors flex-1 flex justify-center`}>
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                   className={`p-2.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-[#25D366]' : 'text-charcoal-400 hover:text-[#25D366]'} transition-colors flex-1 flex justify-center`}>
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
              
              {/* Language selection in drawer */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>Язык / Тіл:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setLang('ru'); setIsMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'ru' ? 'bg-bronze-500/20 text-bronze-500' : `${textMuted} ${bgSubtle}`}`}
                  >
                    RU
                  </button>
                  <button 
                    onClick={() => { setLang('kk'); setIsMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'kk' ? 'bg-bronze-500/20 text-bronze-500' : `${textMuted} ${bgSubtle}`}`}
                  >
                    KZ
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
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border shadow-xl transition-all duration-500 flex items-center justify-center
          ${showBackToTop 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
          }
          ${isDark 
            ? 'bg-charcoal-900/90 border-white/10 text-bronze-400 hover:text-bronze-300 hover:border-bronze-500/50 hover:shadow-bronze-500/10' 
            : 'bg-white/90 border-charcoal-200 text-bronze-600 hover:text-bronze-700 hover:border-bronze-500/50 hover:shadow-bronze-500/10'
          }
          backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
