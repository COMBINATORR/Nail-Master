import { useState, useEffect, useRef } from 'react';
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



const SectionLabel = () => null;

const nailShapes = [
  { id: 'sharp_square', nameRu: 'Четкий квадрат', nameKk: 'Анық квадрат', nameEn: 'Sharp square', path: "M10,18 L10,8 L22,8 L22,18" },
  { id: 'soft_square', nameRu: 'Мягкий квадрат', nameKk: 'Жұмсақ квадрат', nameEn: 'Soft square', path: "M10,18 L10,10 Q10,8 12,8 L20,8 Q22,8 22,10 L22,18" },
  { id: 'oval', nameRu: 'Овал', nameKk: 'Овал', nameEn: 'Oval', path: "M10,18 C10,11 12,6 16,6 C20,6 22,11 22,18" },
  { id: 'almond', nameRu: 'Миндаль', nameKk: 'Миндаль', nameEn: 'Almond', path: "M10,18 C10,14 13,7 16,4 C19,7 22,14 22,18" },
];

let isConsoleMessagePrinted = false;

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
  const categories = {
    manicure: {
      id: 'manicure',
      nameKey: 'catManicureName',
      services: [
        { id: 'classic', nameKey: 'serviceManicureClassicName', descKey: 'serviceManicureClassicDesc', price: 4000, time: 60 },
        { id: 'gel', nameKey: 'serviceManicureGelName', descKey: 'serviceManicureGelDesc', price: 6000, time: 90 }
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
        { id: 'bikini', nameKey: 'serviceSugarBikiniName', descKey: 'serviceSugarBikiniDesc', price: 5000, time: 30 },
        { id: 'legs', nameKey: 'serviceSugarLegsName', descKey: 'serviceSugarLegsDesc', price: 6000, time: 40 },
        { id: 'underarms', nameKey: 'serviceSugarUnderarmsName', descKey: 'serviceSugarUnderarmsDesc', price: 2000, time: 15 },
        { id: 'arms', nameKey: 'serviceSugarArmsName', descKey: 'serviceSugarArmsDesc', price: 5000, time: 25 },
        { id: 'fullbody', nameKey: 'serviceSugarFullBodyName', descKey: 'serviceSugarFullBodyDesc', price: 15000, time: 90 }
      ],
      options: [
        { id: 'bikinipit', nameKey: 'optSugarBikiniPit', price: 6000, time: 30 },
        { id: 'cleaning', nameKey: 'optSugarCleaning', price: 3000, time: 15 },
        { id: 'face', nameKey: 'optSugarFace', price: 1500, time: 10 }
      ]
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCareTab, setActiveCareTab] = useState('manicure');

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
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Only run security scripts in production, ignoring local environment (localhost / 127.0.0.1)
    const isProduction = import.meta.env.PROD && 
                         window.location.hostname !== 'localhost' && 
                         window.location.hostname !== '127.0.0.1';

    if (!isProduction) return;

    // 1. Passive Defense: Block Context Menu
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Block Dragstart (Drag & Drop prevention for images & links)
    const handleDragStart = (e) => e.preventDefault();
    document.addEventListener('dragstart', handleDragStart);

    // Block Copy Actions (Ctrl+C / Cmd+C)
    const handleCopy = (e) => e.preventDefault();
    document.addEventListener('copy', handleCopy);

    // Globally disable text selection and image dragging via dynamically injected styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Block keyboard developer shortcut keys
    const handleKeyDown = (e) => {
      
      // F12 key
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I / Cmd+Opt+I (Inspect)
      // Ctrl+Shift+C / Cmd+Opt+C (Select element)
      // Ctrl+Shift+J / Cmd+Opt+J (Console)
      // Ctrl+U / Cmd+Opt+U (View Source)
      const isInspectKeys = e.shiftKey && (e.keyCode === 73 || e.keyCode === 67 || e.keyCode === 74);
      const isMacInspectKeys = e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 67 || e.keyCode === 74);
      const isViewSource = (e.ctrlKey && e.keyCode === 85) || (e.metaKey && e.altKey && e.keyCode === 85);

      if (isInspectKeys || isMacInspectKeys || isViewSource) {
        e.preventDefault();
        return false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 2. Active Trap: Console debugging breakpoint loop
    let intervalId;
    const triggerDebuggerLoop = () => {
      // eslint-disable-next-line no-debugger
      debugger;
    };
    
    // Self-invoking protection wrapper
    (() => {
      intervalId = setInterval(triggerDebuggerLoop, 150);
    })();

    // 3. Output stylized ASCII Manifest to the console
    const manifestArt = `
███████ ██    ██ ████████ ██      
██      ██    ██    ██    ██      
███████ ██    ██    ██    ██      
     ██  ██  ██     ██    ██      
███████   ████      ██    ███████ 
    `;
    const messageStyle = 'color: #B89548; font-weight: bold; font-family: monospace; font-size: 11px; line-height: 1.2;';
    const warningStyle = 'color: #ef4444; font-weight: 800; font-family: sans-serif; font-size: 13px;';
    
    console.log(`%c${manifestArt}`, messageStyle);
    console.log('%cCyber Shield Active. Реверс-инжиниринг заблокирован. SPCWLKR Digital Studio', warningStyle);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalId);
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
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

  const getNext10Days = () => {
    const days = [];
    const daysOfWeekRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const daysOfWeekKk = ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'];
    const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayNum = date.getDate();
      const monthNum = date.getMonth() + 1;
      const monthStr = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
      const dayOfWeekIndex = date.getDay();
      
      const weekdayRu = daysOfWeekRu[dayOfWeekIndex];
      const weekdayKk = daysOfWeekKk[dayOfWeekIndex];
      const weekdayEn = daysOfWeekEn[dayOfWeekIndex];
      
      const formattedDate = `${dayNum < 10 ? '0' + dayNum : dayNum}.${monthStr}`;
      
      days.push({
        id: `${date.getFullYear()}-${monthStr}-${dayNum < 10 ? '0' + dayNum : dayNum}`,
        dayNum,
        weekday: lang === 'en' ? weekdayEn : lang === 'ru' ? weekdayRu : weekdayKk,
        formatted: formattedDate
      });
    }
    return days;
  };

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
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') setTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

    useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) setShowLangPopup(false);
      if (themePopupRef.current && !themePopupRef.current.contains(e.target)) setShowThemeMenu(false);
      if (logoRef.current && !logoRef.current.contains(e.target)) {
        logoRef.current.classList.remove('active');
      }
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

  const handleLogoClick = (e) => {
    e.currentTarget.classList.toggle('active');

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
      heroCta: "Подобрать услуги",
      trustTitle: "ПОЧЕМУ МНЕ ДОВЕРЯЮТ",
      trustSubtitle: "Я гарантирую безопасность, прозрачность и высокий уровень сервиса",
      trust1Title: "100% стерильные инструменты",
      trust1Desc: "3-этапная дезинфекция по стандартам СанПиН. Инструменты стерилизуются в сухожаре, крафт-пакет вскрывается исключительно при вас.",
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
      servicesNotSelected: "Услуги не выбраны",
      serviceCta: "Записаться",
      guaranteeIndicatorText: "Гарантия SVTL: Вы записываетесь напрямую к Светлане. Скрытая подмена мастера, передача вашего времени новичку или стажеру полностью исключены. Персональный контроль качества.",
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
      formCta: "Подтвердить в WhatsApp",
      modalSuccessTitle: "Заявка отправлена!",
      modalSuccessDesc: "Я уже готовлюсь связаться с вами в WhatsApp. До встречи на процедуре!",
      modalClose: "ОК",
      careTitle: "ПАМЯТКА КЛИЕНТА",
      careSubtitle: "Простые и эффективные правила ухода за кожей и ногтями после визита",
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
      serviceSugarFullBodyName: "Всего тела",
      serviceSugarFullBodyDesc: "Бикини, руки/ноги полностью, подмышки, усики",
      
      optSugarBikiniPit: "Бикини + Подмышки",
      optSugarCleaning: "Чистка глубокого бикини / удаление вросших волос / удаление комедонов",
      optSugarFace: "Депиляция зоны на лице (усики/подбородок)",
    },
    kk: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "АТЫРАУДАҒЫ МАНИКЮР • ПЕДИКЮР • ШУГАРИНГ",
      heroTitle: "СІЗДІҢ СҰЛУЛЫҒЫҢЫЗ ҮШІН ПРЕМИУМ КҮТІМ ЖӘНЕ ЭСТЕТИКА",
      heroSubtitle: "МІНСІЗ САПА • 100% СТЕРИЛЬДІЛІК",
      heroDesc: "Сертификатталған шебер Светланадан жеке тәсіл. Қауіпсіз процедуралар, премиум материалдар және сіздің жайлылығыңыз бен сұлулығыңызға қамқорлық жасайтын кабинет.",
      heroCta: "Қызметтерді таңдау",
      trustTitle: "МАҒАН НЕГЕ СЕНЕДІ",
      trustSubtitle: "Мен қауіпсіздікке, ашықтыққа және жоғары қызмет көрсету деңгейіне кепілдік беремін",
      trust1Title: "100% стерильді құралдар",
      trust1Desc: "СанПиН стандарттары бойынша 3 кезеңді дезинфекция. Құралдар сухожарда стерильденеді, крафт-пакет тек сіздің көзіңізше ашамын.",
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
      servicesNotSelected: "Қызметтер таңдалмады",
      serviceCta: "Жазылу",
      guaranteeIndicatorText: "SVTL кепілдігі: Сіз тікелей Светланаға жазыласыз. Шеберді жасырын ауыстыру, сіздің уақытыңызды жаңадан бастаушыға немесе стажерға беру мүлдем мүмкін емес. Жеке сапа бақылауы.",
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
      formCta: "WhatsApp арқылы растау",
      modalSuccessTitle: "Өтінім жіберілді!",
      modalSuccessDesc: "Мен WhatsApp арқылы хабарласуға дайынмын. Процедурада кездескенше!",
      modalClose: "ОК",
      careTitle: "КЛИЕНТ ЖАДЫНАМАСЫ",
      careSubtitle: "Қабылдаудан кейінгі тері мен тырнақты күтудің қарапайым және тиімді ережелері",
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
      serviceSugarFullBodyName: "Толық дене",
      serviceSugarFullBodyDesc: "Бикини, қолдар/аяқтар толық, қолтық асты, мұрт",
      
      optSugarBikiniPit: "Бикини + Қолтық асты",
      optSugarCleaning: "Терең бикини тазалау / ішке өскен түктерді кетіру / комедондарды тазалау",
      optSugarFace: "Бет аймағындағы депиляция (мұрт/иек)",
    },
    en: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "MANICURE • PEDICURE • SUGARING IN ATYRAU",
      heroTitle: "PREMIUM CARE AND AESTHETICS FOR YOUR BEAUTY",
      heroSubtitle: "IMPECCABLE QUALITY • 100% STERILE",
      heroDesc: "Personalized approach from certified artist Svetlana. Safe treatments, premium materials, and a cozy studio designed with your comfort and beauty in mind.",
      heroCta: "Select services",
      trustTitle: "WHY CLIENTS TRUST ME",
      trustSubtitle: "I guarantee safety, transparency, and the highest standards of service",
      trust1Title: "100% Sterile Instruments",
      trust1Desc: "3-stage sterilization following sanitary standards. Tools are sterilized in a dry heat oven, and the kraft bag is opened strictly in front of you.",
      trust2Title: "Zero Hidden Charges",
      trust2Desc: "Treatment prices are locked in before we begin. You will always know the exact amount with no unexpected extras at checkout.",
      trust3Title: "Respecting Your Time",
      trust3Desc: "Strict session timing. Your manicure or sugaring will be fast, neat, and precisely on schedule.",
      servicesTitle: "MY SERVICES",
      servicesSubtitle: "Choose category, service, and options — price and duration are calculated automatically.",
      servicesSelectBase: "1. Select service:",
      servicesSelectOptions: "2. Extra options:",
      servicesTotal: "Total Estimate:",
      servicesTotalPrice: "Price",
      servicesTotalTime: "Duration",
      servicesSelectedPreview: "Your Visit",
      servicesNotSelected: "Services not selected",
      serviceCta: "Book now",
      guaranteeIndicatorText: "SVTL Guarantee: You book directly with Svetlana. Master replacement or passing your time to a beginner/trainee is completely excluded. Personal quality control.",
      guaranteesTitle: "GUARANTEES",
      guaranteesSubtitle: "You are protected by my personal standards of quality",
      g1Title: "Personal Responsibility", g1Desc: "You book directly with me. I take full responsibility for every stage of your treatment and comfort.",
      g2Title: "Absolute Safety", g2Desc: "Only certified hypoallergenic materials and 100% disposable consumables are used.",
      g3Title: "Punctuality",         g3Desc: "Appointments are strictly on time. No queues, waiting, or unnecessary delays.",
      g4Title: "Transparent Pricing",        g4Desc: "All extra requests are discussed beforehand. Complete financial honesty with no surprises.",
      fearTitle: "MYTHS • FAQ",
      fearSubtitle: "Answering my clients' most common questions",
      formTitle: "BOOK AN APPOINTMENT",
      formComfort: "The studio is equipped with air conditioning. Fresh coffee, tea, pleasant music, and dedicated service are always included.",
      formHelp: "Fill in your details, and I will contact you on WhatsApp within 5 minutes to confirm your preferred time.",
      namePlaceholder: "Your name",
      phonePlaceholder: "Phone number (WhatsApp)",
      formCta: "Confirm via WhatsApp",
      modalSuccessTitle: "Request Sent!",
      modalSuccessDesc: "I'm already preparing to contact you on WhatsApp. See you at your appointment!",
      modalClose: "OK",
      careTitle: "CLIENT AFTERCARE GUIDE",
      careSubtitle: "Simple and effective tips to care for your skin and nails after your appointment",
      footerText: "SVTL Aesthetics Studio in Atyrau. Manicure, pedicure, sugaring.",
      rights: "All rights reserved.",
      total: "Total",
      portfolioTitle: "OUR WORKS",
      portfolioSubtitle: "Interactive comparison: drag the slider side to side to evaluate the manicure quality.",
      beforeText: "BEFORE",
      afterText: "AFTER",
      workNudeTitle: "Classic Nude",
      workNudeDesc: "Delicate cuticle treatment without cuts, nail plate alignment, and coverage with premium nude builder gel.",
      workFrenchTitle: "Elegant French",
      workFrenchDesc: "Classic French manicure on medium length. Perfectly crisp smile line and nail structure reinforcement.",
      workBordeauxTitle: "Deep Bordeaux",
      workBordeauxDesc: "Comprehensive anti-aging hand and cuticle treatment, reinforcing weakened nails, finished with a noble wine shade.",
      workLavenderTitle: "Gentle Lavender",
      workLavenderDesc: "Fresh pastel lavender design. Thin yet durable gel polish coating.",
      workRedTitle: "Vibrant Red",
      workRedDesc: "Classic manicure with flawless deep red gel polish applied right under the cuticle. Perfect architecture and long-lasting shine.",
      ageLabel: "Hand Age",
      timeLabel: "Work Time",

      // Categories & services names
      catManicureName: "Manicure",
      catPedicureName: "Pedicure",
      catSugaringName: "Sugaring",
      
      serviceManicureClassicName: "Hygienic Manicure",
      serviceManicureClassicDesc: "Hardware/combined manicure focusing on cuticle care and nail shaping without polish.",
      serviceManicureGelName: "Manicure with Gel Polish",
      serviceManicureGelDesc: "Manicure + structure reinforcement, nail plate alignment with builder base, and premium under-cuticle color application.",
      serviceManicureExtName: "Nail Extensions",
      serviceManicureExtDesc: "Modeling nail length and architecture with builder gel on nail forms, tailored to your ideal shape.",
      
      optManiDesign: "Design (French/gradient/nail art)",
      optManiStrengthen: "Extra reinforcement (gel/acrylic)",
      optManiRepair: "Nail repair (1-2 nails)",
      optManiSpa: "SPA care (paraffin treatment & massage)",

      servicePediExpressName: "Express Pedicure",
      servicePediExpressDesc: "Toenail care with premium gel polish application. Quick and beautiful.",
      servicePediSmartName: "Full Smart Pedicure",
      servicePediSmartDesc: "Complete foot treatment using Smart discs (removing cracks, calluses) + toenail care with gel polish.",
      servicePediHygieneName: "Hygienic Pedicure",
      servicePediHygieneDesc: "Hardware treatment for feet and toenails without polish. Health and purity for your feet.",
      
      optPediDesign: "Toenail design",
      optPediCracks: "Removal of core calluses / deep cracks",
      optPediSpa: "SPA care (peeling, nourishing mask, massage)",

      serviceSugarBikiniName: "Brazilian Bikini",
      serviceSugarBikiniDesc: "Delicate and gentle hair removal in the intimate zone using sugar paste, with antiseptic care.",
      serviceSugarLegsName: "Full Legs",
      serviceSugarLegsDesc: "Full leg sugaring (thighs and calves). Silky smooth skin for up to 4 weeks.",
      serviceSugarUnderarmsName: "Underarms",
      serviceSugarUnderarmsDesc: "Quick underarm hair removal using hypoallergenic sugar paste.",
      serviceSugarArmsName: "Full Arms",
      serviceSugarArmsDesc: "Sugaring of arms along the entire length (up to the shoulder). Makes skin perfectly smooth.",
      serviceSugarFullBodyName: "Full Body",
      serviceSugarFullBodyDesc: "Bikini, full arms/legs, underarms, upper lip",
      
      optSugarBikiniPit: "Bikini + Underarms",
      optSugarCleaning: "Deep bikini cleansing / ingrown hair removal / comedone removal",
      optSugarFace: "Facial depilation (upper lip/chin)",
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
    ],
    en: [
      { q: "Will the polish chip quickly?", a: "I guarantee 28 days of wear. If any chip occurs, I will redo it for free on the same day." },
      { q: "Does the e-file hurt?", a: "I work with a gentle micro-treatment technique. No burns, cuts, or discomfort." },
      { q: "What about sterility?", a: "3-stage medical-grade sterilization. The kraft bag is opened in front of you. Nail files are single-use." },
      { q: "Are there hidden costs?", a: "Prices are fixed before we start. Removal and plate alignment are already included." },
      { q: "What if the shape isn't right?", a: "The shape and length are aligned with you step-by-step before applying any base." }
    ]
  };

  const careTipsData = {
    ru: {
      manicure: [
        {
          title: "Первые 24 часа",
          desc: "Избегайте длительного контакта с горячей водой (бани, сауны, горячие ванны), чтобы покрытие зафиксировалось.",
          badge: "Важно",
          icon: "time"
        },
        {
          title: "Домашние дела",
          desc: "Пользуйтесь резиновыми перчатками при контакте с бытовой химией, чтобы сохранить идеальный блеск топа.",
          badge: "Защита",
          icon: "protect"
        },
        {
          title: "Ежедневный уход",
          desc: "Наносите масло для кутикулы и увлажняющий крем каждый день — это предотвратит сухость и заусенцы.",
          badge: "Уход",
          icon: "care"
        },
        {
          title: "Срок носки",
          desc: "Рекомендуемый срок носки — 3–4 недели. Не перенашивайте покрытие во избежание трещин ногтевого ложа.",
          badge: "Сроки",
          icon: "calendar"
        }
      ],
      pedicure: [
        {
          title: "Комфортная обувь",
          desc: "Избегайте тесной обуви и узких носков в первые дни, чтобы не создавать лишнего давления на пальцы.",
          badge: "Свобода",
          icon: "shoe"
        },
        {
          title: "Глубокое увлажнение",
          desc: "Используйте питательный крем для ног перед сном (желательно с мочевиной для максимальной мягкости).",
          badge: "Мягкость",
          icon: "cream"
        },
        {
          title: "Сухость и чистота",
          desc: "Тщательно вытирайте кожу между пальцами после душа, чтобы предотвратить опрелости и трещины.",
          badge: "Гигиена",
          icon: "dry"
        },
        {
          title: "Коррекция ногтей",
          desc: "Подрезайте ногти строго прямо, без закругления уголков, чтобы избежать проблемы вросшего ногтя.",
          badge: "Форма",
          icon: "shape"
        }
      ],
      sugaring: [
        {
          title: "Ограничения на 24 часа",
          desc: "Исключите спортзал, сауну, бассейн и солярий, чтобы не вызвать раздражение открытых волосяных фолликулов.",
          badge: "Запрет",
          icon: "ban"
        },
        {
          title: "Свободный гардероб",
          desc: "Носите свободное белье и одежду из натуральных тканей в первые сутки во избежание излишнего трения.",
          badge: "Комфорт",
          icon: "cloth"
        },
        {
          title: "Профилактика",
          desc: "Через 3–5 дней начните делать легкий энзимный пилинг, чтобы отшелушить кожу и избежать вросших волос.",
          badge: "Пилинг",
          icon: "peel"
        },
        {
          title: "Увлажнение",
          desc: "Используйте легкий увлажняющий лосьон без комедогенных масел и спирта для восстановления кожи.",
          badge: "Лосьон",
          icon: "lotion"
        }
      ]
    },
    kk: {
      manicure: [
        {
          title: "Алғашқы 24 сағат",
          desc: "Жабын толық бекуі үшін ыстық сумен ұзақ жанасудан (монша, сауна, ыстық ванна) аулақ болыңыз.",
          badge: "Маңызды",
          icon: "time"
        },
        {
          title: "Үй шаруасы",
          desc: "Топтың мінсіз жылтырлығын сақтау үшін тұрмыстық химиямен тазалау кезінде резеңке қолғап киіңіз.",
          badge: "Қорғау",
          icon: "protect"
        },
        {
          title: "Күнделікті күтім",
          desc: "Күн сайын кутикула майын және ылғалдандырғыш кремді қолданыңыз — бұл терінің құрғауы мен сынуын болдырмайды.",
          badge: "Күтім",
          icon: "care"
        },
        {
          title: "Жүру мерзімі",
          desc: "Ұсынылатын жүру мерзімі — 3-4 апта. Тырнақ пластинасының зақымдалуын болдырмау үшін тым ұзақ кимеңіз.",
          badge: "Мерзімі",
          icon: "calendar"
        }
      ],
      pedicure: [
        {
          title: "Ыңғайлы аяқ киім",
          desc: "Саусақтарға артық қысым түсірмеу үшін алғашқы күндері тар аяқ киім мен тығыз шұлық кимеңіз.",
          badge: "Бос болу",
          icon: "shoe"
        },
        {
          title: "Терең ылғалдандыру",
          desc: "Ұйықтар алдында аяққа арналған нәрлендіргіш кремді (жұмсақтық үшін несепнәр қосылған дұрыс) қолданыңыз.",
          badge: "Жұмсақтық",
          icon: "cream"
        },
        {
          title: "Құрғақтық пен тазалық",
          desc: "Жарықтар пен базданудың алдын алу үшін душтан кейін саусақтардың арасын мұқият құрғатыңыз.",
          badge: "Гигиена",
          icon: "dry"
        },
        {
          title: "Тырнақты түзету",
          desc: "Тырнақтың теріге өсуіне жол бермеу үшін тырнақтарды бұрыштарын дөңгелетпей, тек түзу кесіңіз.",
          badge: "Пішіні",
          icon: "shape"
        }
      ],
      sugaring: [
        {
          title: "24 сағаттық шектеулер",
          desc: "Ашық шаш фолликулаларының тітіркенуін тудырмау үшін спортзал, сауна, бассейн және солярийді шектеңіз.",
          badge: "Шектеу",
          icon: "ban"
        },
        {
          title: "Бос гардероб",
          desc: "Үйкелісті болдырмау үшін алғашқы тәулікте табиғи матадан жасалған бос іш киім мен киім киіңіз.",
          badge: "Жайлылық",
          icon: "cloth"
        },
        {
          title: "Профилактика",
          desc: "Түктердің ішке өсуін болдырмау үшін 3-5 күннен кейін жеңіл энзимді пилинг жасауды бастаңыз.",
          badge: "Пилинг",
          icon: "peel"
        },
        {
          title: "Ылғалдандыру",
          desc: "Теріні қалпына келтіру үшін комедогенді майлар мен спиртсіз жеңіл ылғалдандырғыш лосьонды қолданыңыз.",
          badge: "Лосьон",
          icon: "lotion"
        }
      ]
    },
    en: {
      manicure: [
        {
          title: "First 24 hours",
          desc: "Avoid prolonged contact with hot water (baths, saunas, hot showers) to let the polish fully cure.",
          badge: "Important",
          icon: "time"
        },
        {
          title: "Household chores",
          desc: "Wear rubber gloves when handling household chemicals to preserve the mirror shine of the top coat.",
          badge: "Protection",
          icon: "protect"
        },
        {
          title: "Daily care",
          desc: "Apply cuticle oil and moisturizer daily to prevent dryness and hangnails.",
          badge: "Care",
          icon: "care"
        },
        {
          title: "Duration",
          desc: "The recommended wear time is 3–4 weeks. Do not wear it longer to avoid stress cracks on the nail bed.",
          badge: "Timing",
          icon: "calendar"
        }
      ],
      pedicure: [
        {
          title: "Comfortable shoes",
          desc: "Avoid tight footwear and narrow socks in the first days to prevent unnecessary pressure on your toes.",
          badge: "Comfort",
          icon: "shoe"
        },
        {
          title: "Deep moisture",
          desc: "Apply a nourishing foot cream before bed (preferably with urea for maximum softness).",
          badge: "Softness",
          icon: "cream"
        },
        {
          title: "Dry and clean",
          desc: "Dry the skin between your toes thoroughly after showering to prevent cracking and dampness.",
          badge: "Hygiene",
          icon: "dry"
        },
        {
          title: "Nail trimming",
          desc: "Cut toenails straight across without rounding the corners to prevent ingrown toenails.",
          badge: "Shape",
          icon: "shape"
        }
      ],
      sugaring: [
        {
          title: "Limit for 24h",
          desc: "Avoid gym sessions, saunas, swimming pools, and tanning beds to prevent irritation of open hair follicles.",
          badge: "Restricted",
          icon: "ban"
        },
        {
          title: "Loose clothing",
          desc: "Wear loose natural-fabric underwear and clothing on the first day to prevent friction.",
          badge: "Comfort",
          icon: "cloth"
        },
        {
          title: "Prevention",
          desc: "Start a light enzyme peel after 3-5 days to exfoliate skin and prevent ingrown hairs.",
          badge: "Peeling",
          icon: "peel"
        },
        {
          title: "Hydration",
          desc: "Use a lightweight moisturizing lotion without comedogenic oils or alcohol to restore skin.",
          badge: "Lotion",
          icon: "lotion"
        }
      ]
    }
  };

  const t = translations[lang] || translations['ru'];

  /* ─── Calculator ─── */
  const catObj = categories[activeCategory];
  const selectedServices = catObj.services.filter(s => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((s, svc) => s + svc.price, 0) + selectedOptions.reduce((s, id) => {
    const o = catObj.options.find(x => x.id === id); return s + (o ? o.price : 0);
  }, 0);
  const totalTime = selectedServices.reduce((s, svc) => s + svc.time, 0) + selectedOptions.reduce((s, id) => {
    const o = catObj.options.find(x => x.id === id); return s + (o ? o.time : 0);
  }, 0);
  const fmtTime = (m) => {
    const h = Math.floor(m / 60), mn = m % 60;
    const hl = lang === 'en' ? 'h.' : lang === 'ru' ? 'ч.' : 'сағ.';
    const ml = lang === 'en' ? 'min.' : 'мин.';
    return `${h > 0 ? `${h} ${hl} ` : ''}${mn > 0 ? `${mn} ${ml}` : ''}`;
  };
  const toggleService = (id) => setSelectedServiceIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleOption = (id) => setSelectedOptions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const generateWhatsAppText = (includeNameAndPhone = false) => {
    const categoryName = t[catObj?.nameKey] || '';
    const serviceNames = selectedServices.map(s => t[s.nameKey] || '').filter(Boolean);
    const optionNames = selectedOptions
      .map(id => {
        const o = catObj?.options?.find(opt => opt.id === id);
        return o ? t[o.nameKey] : null;
      })
      .filter(Boolean);
    const allServicesText = [...serviceNames, ...optionNames].join(' + ');

    const shapeObj = nailShapes.find(s => s.id === nailShape);
    const shapeText = activeCategory !== 'sugaring'
      ? (lang === 'en' ? (shapeObj?.id === 'sharp_square' ? 'Sharp Square' : shapeObj?.id === 'soft_square' ? 'Soft Square' : shapeObj?.id === 'oval' ? 'Oval' : 'Almond') : lang === 'ru' ? shapeObj?.nameRu : shapeObj?.nameKk)
      : (lang === 'en' ? 'Not required' : lang === 'ru' ? 'Не требуется' : 'Қажет емес');

    const modeText = visitMode === 'relax'
      ? (lang === 'en' ? 'Relax in silence' : lang === 'ru' ? 'Relax в тишине' : 'Тыныштықтағы Relax')
      : (lang === 'en' ? 'Friendly chat' : lang === 'ru' ? 'Душевная беседа' : 'Жылы сұхбат');

    const greeting = lang === 'en' ? 'Hello!' : 'Салем!';
    const requestText = lang === 'en' ? 'I would like to book an appointment at SVTL Nails & Aesthetic.' : 'Хочу записаться в SVTL Nails & Aesthetic.';
    const servicesLabel = lang === 'en' ? 'Services' : 'Услуги';
    const shapeLabel = lang === 'en' ? 'Nail shape' : 'Форма ногтей';
    const priceLabel = lang === 'en' ? 'Fixed price' : 'Фиксированная цена';

    const dayObj = getNext10Days().find(d => d.id === selectedDate);
    const dateStr = dayObj ? dayObj.formatted : '';
    const dateLabel = lang === 'en' ? 'Appointment' : lang === 'ru' ? 'Запись на' : 'Жазылу';
    const timeWord = lang === 'en' ? 'at' : lang === 'ru' ? 'в' : 'сағат';
    const modeWord = lang === 'en' ? 'Mode' : lang === 'ru' ? 'Режим' : 'Режимі';

    let msg = `${greeting} ${requestText}\n` +
      `${servicesLabel}: ${allServicesText} (${categoryName})\n` +
      `${shapeLabel}: ${shapeText}\n` +
      `${dateLabel}: ${dateStr} ${timeWord} ${selectedTime}. ${modeWord}: ${modeText}\n` +
      `${priceLabel}: ${totalPrice.toLocaleString()} ₸.`;

    if (includeNameAndPhone && name) {
      const nameLabel = lang === 'en' ? 'Name' : 'Имя';
      const phoneLabel = lang === 'en' ? 'Phone' : 'Телефон';
      msg += `\n${nameLabel}: ${name}\n${phoneLabel}: ${phone}`;
    }
    return msg;
  };

  const handleCalculatorCta = () => {
    document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    if (selectedServices.length === 0 && selectedOptions.length === 0) {
      alert(lang === 'en' ? 'Please select at least one service.' : lang === 'ru' ? 'Пожалуйста, выберите хотя бы одну услугу.' : 'Кем дегенде бір қызметті таңдаңыз.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert(lang === 'en' ? 'Please select a date and time.' : lang === 'ru' ? 'Пожалуйста, выберите дату и время.' : 'Күн мен уақытты таңдаңыз.');
      return;
    }
    setIsSubmitting(true);

    const waText = generateWhatsAppText(true);
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
      <header className={`sticky top-0 z-40 backdrop-blur-md ${bgHeader} border-b ${border} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center relative">
          {/* Mobile Sandwich menu (Left side on mobile, hidden on desktop) */}
          <button onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-full btn-tactile-circle text-[var(--text-secondary)] hover:text-bronze-500 transition-all z-10"
            aria-label="Toggle mobile menu"
          >
            <MenuIcon className="w-4 h-4" />
          </button>

          {/* Logo with hover SVG neon animation (Centered on mobile, left-aligned on desktop) */}
          <div 
            ref={logoRef}
            className="logo-container group !absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:!static lg:translate-x-0 lg:translate-y-0"
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
          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {['#trust','#services','#portfolio','#care-guide','#guarantees','#faq','#location','#appointment-form'].map((href, i) => {
              const labels = { 
                ru: ['Обо мне','Услуги','Работы','Памятка','Гарантии','FAQ','Адрес','Запись'], 
                kk: ['Мен туралы','Қызметтер','Жұмыстар','Күтім','Кепілдіктер','FAQ','Мекен-жай','Жазылу'],
                en: ['About me','Services','Works','Aftercare','Guarantees','FAQ','Address','Booking']
              };
              return (
                <a key={href} href={href}
                   className={`text-xs font-bold uppercase tracking-wider ${textMuted} hover:text-bronze-500 transition-colors`}>
                  {labels[lang][i]}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-1.5 z-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className={`hidden sm:inline-flex p-2 rounded-full ${bgSubtle} text-[var(--text-secondary)] instagram-glow-hover`}>
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
               className={`hidden sm:inline-flex p-2 rounded-full ${bgSubtle} text-[var(--text-secondary)] whatsapp-glow-hover`}>
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <div className="hidden sm:block h-5 w-px bg-[var(--border-color)] mx-0.5" />
            
            {/* Appearance switch popover dropdown */}
            <div className="relative" ref={themePopupRef}>
              <button onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 px-3 rounded-full btn-tactile-circle text-[var(--text-secondary)] hover:text-bronze-500 transition-all flex items-center gap-1.5"
                title={lang === 'ru' ? 'Внешний вид' : lang === 'kk' ? 'Сыртқы түрі' : 'Appearance'}>
                {isDayTheme ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${showThemeMenu ? 'rotate-180' : ''}`} />
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 top-full mt-2 bg-charcoal-950/95 border border-white/10 rounded-2xl shadow-2xl p-4 min-w-[220px] z-50 popup-backdrop animate-fadeIn text-white">
                  <div className="flex p-1 mb-4 tactile-container">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'btn-switch-active-day' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                    >
                      <SunIcon className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'День' : lang === 'kk' ? 'Күн' : 'Day'}</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'btn-switch-active-night' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                    >
                      <MoonIcon className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'Ночь' : lang === 'kk' ? 'Түн' : 'Night'}</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2">
                      {lang === 'ru' ? 'Премиум палитры' : lang === 'kk' ? 'Премиум палитралар' : 'Premium Palettes'}
                    </div>
                    
                    <button 
                      onClick={() => setTheme('emerald')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'emerald' ? 'bg-white/10 text-white border border-white/20' : 'text-neutral-300 hover:bg-white/5 border border-transparent'}`}
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'nudefashion' ? 'bg-white/10 text-white border border-white/20' : 'text-neutral-300 hover:bg-white/5 border border-transparent'}`}
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'sage' ? 'bg-white/10 text-white border border-white/20' : 'text-neutral-300 hover:bg-white/5 border border-transparent'}`}
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${theme === 'cyber' ? 'bg-white/10 text-white border border-white/20' : 'text-neutral-300 hover:bg-white/5 border border-transparent'}`}
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
            
            <div className="relative" ref={langPopupRef}>
              <button onClick={() => setShowLangPopup(!showLangPopup)}
                className="p-2 px-3 rounded-full btn-tactile-circle text-[var(--text-secondary)] hover:text-bronze-500 transition-all flex items-center gap-1.5">
                <GlobeIcon />
                <span className="text-[9px] font-bold uppercase">{lang === 'ru' ? 'RU' : lang === 'kk' ? 'KZ' : 'EN'}</span>
              </button>
              {showLangPopup && (
                <div className={`absolute right-0 top-full mt-2 ${bgCard} border ${border} rounded-xl shadow-xl overflow-hidden z-50 popup-backdrop min-w-[130px] animate-fadeIn`}>
                  <button onClick={() => { setLang('ru'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'ru' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} hover:bg-[var(--bg-subtle)]`}`}>
                    <span>🇷🇺</span> Русский
                  </button>
                  <button onClick={() => { setLang('kk'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'kk' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} hover:bg-[var(--bg-subtle)]`}`}>
                    <span>🇰🇿</span> Қазақша
                  </button>
                  <button onClick={() => { setLang('en'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'en' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} hover:bg-[var(--bg-subtle)]`}`}>
                    <span>🇬🇧</span> English
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
                  {catObj.options.map((opt) => {
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
                        const o = catObj.options.find(x => x.id === id); if (!o) return null;
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
          <SectionLabel text="CARE AFTER VISIT" />
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
          <SectionLabel text="LOCATION" />
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
              <SectionLabel text="BOOK" />
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
                      const o = catObj.options.find(x => x.id === id); if (!o) return null;
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
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} required
                    className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} required
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
                      {getNext10Days().map(d => {
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--text-muted)] hover:text-[#E1306C] transition-colors duration-200">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--text-muted)] hover:text-[#25D366] transition-colors duration-200">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a href="tel:+77016698086"
                 className="text-[var(--text-muted)] hover:text-[#4A90D9] transition-colors duration-200">
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
        <div className="fixed inset-0 z-50 lg:hidden popup-backdrop">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-md" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className={`absolute top-0 left-0 h-full w-4/5 max-w-[320px] bg-[var(--bg-header)] border-r ${border} shadow-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 transform`}>
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className={`p-2.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[#E1306C] transition-colors flex-1 flex justify-center`}>
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                   className={`p-2.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[#25D366] transition-colors flex-1 flex justify-center`}>
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
