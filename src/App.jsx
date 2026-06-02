import React, { useState, useEffect, useRef } from 'react';

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

export default function App() {
  /* ─── State ─── */
  const [lang, setLang] = useState(() => localStorage.getItem('svtl-lang') || 'ru');
  const [theme, setTheme] = useState(() => localStorage.getItem('svtl-theme') || 'dark');
  const [activeFaq, setActiveFaq] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const langPopupRef = useRef(null);

  // Interactive Calculator State
  const [selectedService, setSelectedService] = useState('manicure');
  const [selectedOptions, setSelectedOptions] = useState([]);

  /* ─── Theme logic ─── */
  const systemPrefersDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : true;

  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    document.body.classList.toggle('light', !isDark);
    localStorage.setItem('svtl-theme', theme);
  }, [theme, isDark]);

  useEffect(() => {
    localStorage.setItem('svtl-lang', lang);
  }, [lang]);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') setTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  // Close lang popup on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) {
        setShowLangPopup(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cycleTheme = () => {
    const order = ['dark', 'light', 'system'];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const ThemeButtonIcon = () => {
    if (theme === 'dark') return <MoonIcon />;
    if (theme === 'light') return <SunIcon />;
    return <SystemIcon />;
  };

  /* ─── Colour helpers for dynamic classes ─── */
  const bg = isDark ? 'bg-charcoal-900' : 'bg-[#faf9f7]';
  const bgDeep = isDark ? 'bg-charcoal-950' : 'bg-white';
  const bgDeep40 = isDark ? 'bg-charcoal-950/40' : 'bg-bronze-50/50';
  const bgDeep60 = isDark ? 'bg-charcoal-950/60' : 'bg-bronze-50/30';
  const bgDeep80 = isDark ? 'bg-charcoal-950/80' : 'bg-white/95';
  const bgCard = isDark ? 'bg-charcoal-950/40' : 'bg-white';
  const bgCardHover = isDark ? 'bg-charcoal-900' : 'bg-white';
  const bgSubtle = isDark ? 'bg-white/5' : 'bg-charcoal-50';
  const bgHeader = isDark ? 'bg-charcoal-900/95' : 'bg-[#faf9f7]/95';
  const textPrimary = isDark ? 'text-white' : 'text-charcoal-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-charcoal-500';
  const textMuted = isDark ? 'text-neutral-500' : 'text-charcoal-400';
  const textFaint = isDark ? 'text-neutral-600' : 'text-charcoal-300';
  const border = isDark ? 'border-white/10' : 'border-charcoal-200';
  const borderSubtle = isDark ? 'border-white/5' : 'border-charcoal-100';

  /* ─── Services data ─── */
  const baseServices = {
    manicure: { id: 'manicure', nameKey: 'serviceManicureName', descKey: 'serviceManicureDesc', price: 7000, time: 75 },
    pedicure: { id: 'pedicure', nameKey: 'servicePedicureName', descKey: 'servicePedicureDesc', price: 10000, time: 90 },
    extensions: { id: 'extensions', nameKey: 'serviceExtensionsName', descKey: 'serviceExtensionsDesc', price: 12000, time: 120 },
  };

  const extraOptions = [
    { id: 'design', nameKey: 'optionDesign', price: 2000, time: 20 },
    { id: 'strengthen', nameKey: 'optionStrengthen', price: 1500, time: 15 },
    { id: 'repair', nameKey: 'optionRepair', price: 1000, time: 10 },
    { id: 'spa', nameKey: 'optionSpa', price: 1500, time: 15 },
  ];

  /* ─── Translations ─── */
  const translations = {
    ru: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "БЕЗОПАСНЫЙ МАНИКЮР В АТЫРАУ",
      heroTitle: "МАНИКЮР, КОТОРЫЙ ВЫГЛЯДИТ ДОРОГО 4 НЕДЕЛИ",
      heroSubtitle: "БЕЗ ПОРЕЗОВ • ГАРАНТИЯ 28 ДНЕЙ",
      heroDesc: "Если покрытие сколется или отслоится в течение 28 дней, я бесплатно переделаю работу в день обращения — без споров, долгих разборов и игнорирования в мессенджерах.",
      heroCta: "Рассчитать точную стоимость и время визита",
      trustTitle: "ПОЧЕМУ МНЕ ДОВЕРЯЮТ",
      trustSubtitle: "Я решаю главные страхи клиентов на деле, а не на словах",
      trust1Title: "100% одноразовые расходники",
      trust1Desc: "Пилочки, бафы и апельсиновые палочки используются строго индивидуально и утилизируются после процедуры. Герметичный крафт-пакет я вскрываю исключительно в вашем присутствии.",
      trust2Title: "0 тенге скрытых доплат",
      trust2Desc: "Окончательная стоимость фиксируется до начала работы. Никаких внезапных наценок за снятие старого материала, укрепление или финишный уход.",
      trust3Title: "Строго до 2 часов",
      trust3Desc: "Я ценю ваше время. Любой маникюр с покрытием и дизайном занимает не более 1.5–2 часов. Если я не уложусь — скидка за ожидание.",
      servicesTitle: "МОИ УСЛУГИ",
      servicesSubtitle: "Выберите услугу и опции — стоимость и время рассчитаются автоматически.",
      servicesSelectBase: "1. Основная услуга:",
      servicesSelectOptions: "2. Дополнительные опции:",
      servicesTotal: "Итоговый расчет:",
      servicesTotalPrice: "Стоимость",
      servicesTotalTime: "Время",
      servicesSelectedPreview: "Ваш сеанс",
      serviceManicureName: "Аппаратный маникюр",
      serviceManicureDesc: "Безопасная обработка кутикулы. Включает снятие покрытия, гигиенический уход и выравнивание.",
      servicePedicureName: "Эстетический Smart-педикюр",
      servicePedicureDesc: "Обработка стопы Smart-дисками + покрытие пальчиков гель-лаком. Удаление натоптышей и трещин.",
      serviceExtensionsName: "Наращивание ногтей",
      serviceExtensionsDesc: "Моделирование архитектуры, длины и формы (квадрат, овал, миндаль) по вашему референсу.",
      optionDesign: "Сложный дизайн (френч, градиент, втирка)",
      optionStrengthen: "Укрепление гелем",
      optionRepair: "Ремонт / донаращивание (1-2 ногтя)",
      optionSpa: "Парафинотерапия и СПА-уход",
      serviceCta: "Зафиксировать расчет и записаться",
      guaranteesTitle: "ГАРАНТИИ",
      guaranteesSubtitle: "Вы защищены моими личными гарантиями",
      g1Title: "Личная ответственность", g1Desc: "Вы попадаете именно ко мне. Я не перепоручаю работу и не отменяю запись.",
      g2Title: "Фиксация формы", g2Desc: "Форма и длина согласуются пошагово до нанесения базы. «Только освежить → срезали длину» исключено.",
      g3Title: "Пунктуальность", g3Desc: "Мой кабинет открыт вовремя. Если визит задержится по моей вине — прямая скидка.",
      g4Title: "Прозрачная цена", g4Desc: "Никаких доп. манипуляций без обсуждения стоимости. 0 финансовых сюрпризов.",
      fearTitle: "СТРАХИ • FAQ",
      fearSubtitle: "Разбираю частые страхи клиентов из Атырау",
      formTitle: "ЗАПИСЬ",
      formComfort: "В моем кабинете всегда прохладно (кондиционер), чисто и есть напитки.",
      formHelp: "Оставьте номер (WhatsApp) и имя. Я свяжусь в течение 5 минут.",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "Номер телефона (WhatsApp)",
      formCta: "Зафиксировать цену и записаться",
      modalSuccessTitle: "Заявка принята!",
      modalSuccessDesc: "Я свяжусь с вами в течение 5 минут в WhatsApp.",
      modalClose: "Перейти в WhatsApp",
      footerText: "Кабинет безопасного маникюра в Атырау.",
      rights: "Все права защищены.",
      langLabel: "Язык",
    },
    kk: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "АТЫРАУДАҒЫ ҚАУІПСІЗ МАНИКЮР",
      heroTitle: "4 АПТА БОЙЫ ҚЫМБАТ КӨРІНЕТІН МАНИКЮР",
      heroSubtitle: "КЕСІКСІЗ • 28 КҮН КЕПІЛДІК",
      heroDesc: "Егер 28 күн ішінде жабын сылынса немесе түсіп қалса, мен өтініш білдірген күні жұмысты тегін қайта жасап беремін — дау-дамайсыз, ұзақ талқылаусыз.",
      heroCta: "Нақты құны мен келу уақытын есептеу",
      trustTitle: "МАҒАН НЕГЕ СЕНЕДІ",
      trustSubtitle: "Мен клиенттердің қорқыныштарын іспен шешемін",
      trust1Title: "100% бір реттік материалдар",
      trust1Desc: "Егеулер мен бафтар жеке қолданылады. Крафт-пакетті мен тек сіздің көзіңізше ашамын.",
      trust2Title: "0 теңге жасырын төлемдер",
      trust2Desc: "Құны аппаратты алғанға дейін белгіленеді. Кенеттен қосылатын үстемелер жоқ.",
      trust3Title: "2 сағатқа дейін",
      trust3Desc: "Мен уақытыңызды бағалаймын. Үлгермесем — күткеніңіз үшін жеңілдік.",
      servicesTitle: "ҚЫЗМЕТТЕРІМ",
      servicesSubtitle: "Қызметті және опцияларды таңдаңыз — құны мен уақыты автоматты есептеледі.",
      servicesSelectBase: "1. Негізгі қызмет:",
      servicesSelectOptions: "2. Қосымша опциялар:",
      servicesTotal: "Қорытынды есеп:",
      servicesTotalPrice: "Құны",
      servicesTotalTime: "Уақыты",
      servicesSelectedPreview: "Сіздің сеанс",
      serviceManicureName: "Аппараттық маникюр",
      serviceManicureDesc: "Кутикуланы кесіксіз қауіпсіз өңдеу. Жабынды алу, күтім және тегістеу кіреді.",
      servicePedicureName: "Эстетикалық Smart-педикюр",
      servicePedicureDesc: "Smart дискілерімен табанды өңдеу + гель-лак жабынымен саусақтар. Сүйелдерді кетіру.",
      serviceExtensionsName: "Тырнақ өсіру",
      serviceExtensionsDesc: "Сіздің референсіңізге сәйкес архитектура, ұзындық және пішінді модельдеу.",
      optionDesign: "Күрделі дизайн (френч, градиент, втирка)",
      optionStrengthen: "Гельмен нығайту",
      optionRepair: "Жөндеу / ұзарту (1-2 тырнақ)",
      optionSpa: "Парафинотерапия және СПА-күтім",
      serviceCta: "Есептеуді бекіту және жазылу",
      guaranteesTitle: "КЕПІЛДІКТЕР",
      guaranteesSubtitle: "Сіз менің жеке кепілдіктеріммен қорғалғансыз",
      g1Title: "Жеке жауапкершілік", g1Desc: "Сіз тікелей менімен жұмыс істейсіз. Жұмысты шәкірттерге тапсырмаймын.",
      g2Title: "Пішінді бекіту", g2Desc: "Пішін мен ұзындықты базаны жаққанға дейін кезең-кезеңімен келісемін.",
      g3Title: "Ұқыптылық", g3Desc: "Кабинетім уақытында ашылады. Кешіктірсем — тікелей жеңілдік.",
      g4Title: "Ашық баға", g4Desc: "Қосымша манипуляцияларды талқыламай орындамаймын. 0 тосынсый.",
      fearTitle: "ҚОРҚЫНЫШТАР • FAQ",
      fearSubtitle: "Атыраудағы клиенттердің жиі сұрақтарын талдаймын",
      formTitle: "ЖАЗЫЛУ",
      formComfort: "Кабинетімде салқын (кондиционер), таза және сусындар бар.",
      formHelp: "Нөміріңізді (WhatsApp) және есіміңізді қалдырыңыз. 5 минутта хабарласамын.",
      namePlaceholder: "Сіздің есіміңіз",
      phonePlaceholder: "Телефон нөмірі (WhatsApp)",
      formCta: "Бағаны бекіту және жазылу",
      modalSuccessTitle: "Өтінім қабылданды!",
      modalSuccessDesc: "5 минутта WhatsApp арқылы хабарласамын.",
      modalClose: "WhatsApp-қа өту",
      footerText: "Атыраудағы қауіпсіз маникюр кабинеті.",
      rights: "Барлық құқықтар қорғалған.",
      langLabel: "Тіл",
    }
  };

  const interactivePains = {
    ru: [
      { question: "Покрытие быстро слезет?", answer: "Гарантия носки 28 дней. Скол — переделаю бесплатно в день обращения." },
      { question: "Будет больно от аппарата?", answer: "Я работаю по микротехнологии мягкой обработки. Никаких прожигов и порезов." },
      { question: "А стерильность?", answer: "3-этапная медицинская стерилизация. Крафт-пакет вскрываю при вас. Пилки одноразовые." },
      { question: "Будут скрытые доплаты?", answer: "Стоимость фиксируется до начала. Снятие и выравнивание уже в прайсе." },
      { question: "Форма будет не та?", answer: "Форма и длина согласуются с вами пошагово до покрытия базой." }
    ],
    kk: [
      { question: "Жабын тез түсіп қалады ма?", answer: "28 күндік кепілдік. Сызат болса — тегін қайта жасаймын." },
      { question: "Аппараттан ауырады ма?", answer: "Жұмсақ өңдеу технологиясымен жұмыс істеймін. Күю мен кесік жоқ." },
      { question: "Стерильділік сақтала ма?", answer: "3 кезеңді стерилизация. Крафт-пакет көзіңізше ашылады. Егеулер бір реттік." },
      { question: "Жасырын үстемелер бола ма?", answer: "Құны жұмыс алдында бекітіледі. Алып тастау мен тегістеу прайске кіреді." },
      { question: "Пішіні басқаша бола ма?", answer: "Пішін мен ұзындық базаны жаққанға дейін сізбен келісіледі." }
    ]
  };

  const t = translations[lang];

  /* ─── Calculator logic ─── */
  const baseServiceObj = baseServices[selectedService];
  const totalPrice = baseServiceObj.price + selectedOptions.reduce((s, id) => {
    const o = extraOptions.find(x => x.id === id);
    return s + (o ? o.price : 0);
  }, 0);
  const totalTime = baseServiceObj.time + selectedOptions.reduce((s, id) => {
    const o = extraOptions.find(x => x.id === id);
    return s + (o ? o.time : 0);
  }, 0);

  const formatTime = (m) => {
    const h = Math.floor(m / 60), mn = m % 60;
    const hLabel = lang === 'ru' ? 'ч.' : 'сағ.';
    return `${h > 0 ? `${h} ${hLabel} ` : ''}${mn > 0 ? `${mn} мин.` : ''}`;
  };

  const toggleOption = (id) => setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const getWhatsAppMessage = () => {
    const sn = t[baseServiceObj.nameKey];
    const ol = selectedOptions.map(id => t[extraOptions.find(o => o.id === id).nameKey]).join(', ');
    const op = ol ? ` + ${ol}` : '';
    return lang === 'ru'
      ? `Привет! Хочу записаться:\n💅 ${sn}${op}\n💰 ${totalPrice} ₸\n⏱️ ${formatTime(totalTime)}\nИмя: ${name}\nТел: ${phone}`
      : `Сәлем! Жазылғым келеді:\n💅 ${sn}${op}\n💰 ${totalPrice} ₸\n⏱️ ${formatTime(totalTime)}\nЕсімім: ${name}\nТел: ${phone}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setShowModal(true); }, 1000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.open(`https://wa.me/77016698086?text=${encodeURIComponent(getWhatsAppMessage())}`, '_blank', 'noopener,noreferrer');
    setName(''); setPhone('');
  };

  const scrollToForm = () => document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });

  /* ─── RENDER ─── */
  return (
    <div className={`min-h-screen ${bg} ${isDark ? 'text-neutral-100' : 'text-charcoal-800'} font-sans selection:bg-bronze-500 selection:text-charcoal-950 flex flex-col items-center transition-colors duration-300`}>
      <div className={`w-full max-w-md min-h-screen ${bg} border-x ${border} flex flex-col justify-between shadow-2xl relative transition-colors duration-300`}>
        
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-bronze-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* ───── HEADER ───── */}
        <header className={`sticky top-0 z-40 backdrop-blur-md ${bgHeader} border-b ${border} py-3 px-4 flex justify-between items-center transition-colors duration-300`}>
          <div className="flex flex-col items-start leading-none">
            <span className={`font-sans font-bold text-2xl tracking-widest ${textPrimary}`}>SVTL</span>
            <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Social icons */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors`}>
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
               className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors`}>
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            {/* Divider */}
            <div className={`h-5 w-px ${isDark ? 'bg-white/10' : 'bg-charcoal-200'} mx-0.5`}></div>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors`}
              title={theme === 'dark' ? 'Тёмная' : theme === 'light' ? 'Светлая' : 'Системная'}
            >
              <ThemeButtonIcon />
            </button>

            {/* Language Popup */}
            <div className="relative" ref={langPopupRef}>
              <button
                onClick={() => setShowLangPopup(!showLangPopup)}
                className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors flex items-center gap-1`}
              >
                <GlobeIcon />
                <span className="text-[9px] font-bold uppercase">{lang === 'ru' ? 'RU' : 'KZ'}</span>
              </button>

              {showLangPopup && (
                <div className={`absolute right-0 top-full mt-2 ${isDark ? 'bg-charcoal-800 border-white/10' : 'bg-white border-charcoal-200'} border rounded-xl shadow-xl overflow-hidden z-50 popup-backdrop min-w-[120px]`}>
                  <button
                    onClick={() => { setLang('ru'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'ru' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}
                  >
                    <span>🇷🇺</span> Русский
                  </button>
                  <button
                    onClick={() => { setLang('kk'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'kk' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}
                  >
                    <span>🇰🇿</span> Қазақша
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ───── MAIN ───── */}
        <main className="flex-1">

          {/* Hero */}
          <section className={`relative overflow-hidden pt-10 pb-12 px-4 border-b ${border} text-center`}>
            <div className="inline-flex items-center gap-1 border border-bronze-500/30 bg-bronze-500/5 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-500 animate-pulse"></span>
              <span className="text-bronze-300 font-bold tracking-widest text-[9px] uppercase font-sans">{t.heroSuperTitle}</span>
            </div>
            <h1 className={`font-display text-4xl font-black tracking-tighter ${textPrimary} mb-4 leading-[0.9] uppercase`}>{t.heroTitle}</h1>
            <div className="border border-bronze-500/20 bg-bronze-950/20 rounded-xl p-3 mb-6 inline-block">
              <span className="text-bronze-400 font-sans font-bold text-xs tracking-wider uppercase block">✦ {t.heroSubtitle} ✦</span>
            </div>
            <p className={`${textSecondary} text-xs leading-relaxed max-w-sm mx-auto mb-8`}>{t.heroDesc}</p>
            <button onClick={scrollToForm} className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 py-3.5 rounded-xl font-bold tracking-wider uppercase text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.2)]" id="hero-cta-btn">{t.heroCta}</button>
          </section>

          {/* Trust Block */}
          <section className={`py-12 px-4 border-b ${border}`}>
            <div className="flex items-center gap-1.5 mb-2"><span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ INFO ✦</span></div>
            <h2 className={`font-display text-3xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6`}>{t.trustTitle}</h2>
            <div className="space-y-3">
              {[
                { num: '01', title: t.trust1Title, desc: t.trust1Desc },
                { num: '02', title: t.trust2Title, desc: t.trust2Desc },
                { num: '03', title: t.trust3Title, desc: t.trust3Desc },
              ].map((card) => (
                <div key={card.num} className={`border ${border} rounded-xl p-4 flex items-start gap-3.5 ${bgCard} relative group hover:border-bronze-500/25 transition-all`}>
                  <span className="font-display font-black text-2xl text-bronze-500 leading-none">{card.num}</span>
                  <div className="flex-1">
                    <h3 className={`font-display font-bold text-xs tracking-wider uppercase ${textPrimary} mb-1`}>{card.title}</h3>
                    <p className={`${textSecondary} text-[11px] leading-relaxed`}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Services Calculator */}
          <section className={`py-12 px-4 ${bgDeep40} border-b ${border} transition-colors duration-300`}>
            <div className="flex items-center gap-1.5 mb-2"><span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ SERVICES ✦</span></div>
            <h2 className={`font-display text-3xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2`}>{t.servicesTitle}</h2>
            <p className={`${textSecondary} text-[11px] leading-relaxed mb-6`}>{t.servicesSubtitle}</p>

            <div className="space-y-6">
              {/* Base Services */}
              <div>
                <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-3">{t.servicesSelectBase}</h3>
                <div className="space-y-3">
                  {Object.values(baseServices).map((svc) => {
                    const isActive = selectedService === svc.id;
                    return (
                      <div key={svc.id} onClick={() => setSelectedService(svc.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 relative overflow-hidden ${isDark ? 'bg-charcoal-900/50' : 'bg-white/80'} ${isActive ? `border-bronze-500 shadow-[0_0_15px_rgba(197,168,128,0.1)] ${isDark ? 'bg-charcoal-900' : 'bg-white'}` : `${borderSubtle} opacity-70 hover:opacity-100 hover:${border}`}`}>
                        {isActive && (
                          <div className="absolute top-0 right-0 w-8 h-8 bg-bronze-500/10 border-b border-l border-bronze-500/30 rounded-bl-xl flex items-center justify-center">
                            <span className="text-bronze-400 font-bold text-[10px]">✓</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center mb-1.5 pr-6">
                          <h4 className={`font-display font-bold uppercase tracking-wide ${textPrimary} text-xs sm:text-sm`}>{t[svc.nameKey]}</h4>
                          <span className="font-display font-black text-bronze-500 text-xs sm:text-sm">{svc.price} ₸</span>
                        </div>
                        <p className={`${textSecondary} text-[10px] leading-relaxed mb-2`}>{t[svc.descKey]}</p>
                        <span className="text-[9px] text-bronze-400 font-bold uppercase tracking-wider">⏱️ {formatTime(svc.time)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extra Options */}
              <div>
                <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-bronze-500 mb-3">{t.servicesSelectOptions}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {extraOptions.map((opt) => {
                    const isChecked = selectedOptions.includes(opt.id);
                    return (
                      <div key={opt.id} onClick={() => toggleOption(opt.id)}
                        className={`border rounded-xl p-3 cursor-pointer transition-all duration-300 flex items-center justify-between ${isDark ? 'bg-charcoal-900/30' : 'bg-white/60'} ${isChecked ? 'border-bronze-500/50 shadow-[0_0_10px_rgba(197,168,128,0.05)]' : `${borderSubtle} opacity-80 hover:opacity-100`}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-bronze-500 border-bronze-500 text-charcoal-950' : isDark ? 'border-white/20' : 'border-charcoal-300'}`}>
                            {isChecked && <span className="font-bold text-[10px]">✓</span>}
                          </div>
                          <div>
                            <span className={`${textPrimary} text-[11px] font-bold block`}>{t[opt.nameKey]}</span>
                            <span className={`text-[9px] ${textMuted}`}>⏱️ +{formatTime(opt.time)}</span>
                          </div>
                        </div>
                        <span className="font-display text-bronze-400 text-xs font-black">+{opt.price} ₸</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total Panel */}
              <div className={`border border-bronze-500/30 rounded-2xl p-5 ${bgDeep80} shadow-xl relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-bronze-500/5 rounded-full blur-xl"></div>
                <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-3">{t.servicesTotal}</h4>
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between items-center">
                    <span className={`${textSecondary} text-[11px]`}>{t.servicesTotalPrice}:</span>
                    <span className={`font-display font-black ${textPrimary} text-lg`}>{totalPrice} ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${textSecondary} text-[11px]`}>{t.servicesTotalTime}:</span>
                    <span className="font-display font-bold text-bronze-300 text-xs tracking-wider uppercase">~ {formatTime(totalTime)}</span>
                  </div>
                </div>
                <button onClick={scrollToForm} className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 py-3 rounded-xl font-bold tracking-wider uppercase text-[10px] transition-all duration-300 shadow-md flex justify-center items-center gap-1.5">
                  <span>{t.serviceCta}</span><span>✦</span>
                </button>
              </div>
            </div>
          </section>

          {/* Guarantees */}
          <section className={`py-12 px-4 border-b ${border}`}>
            <div className="flex items-center gap-1.5 mb-2"><span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ RULES ✦</span></div>
            <h2 className={`font-display text-3xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6`}>{t.guaranteesTitle}</h2>
            <div className="space-y-3">
              {[
                { title: t.g1Title, desc: t.g1Desc },
                { title: t.g2Title, desc: t.g2Desc },
                { title: t.g3Title, desc: t.g3Desc },
                { title: t.g4Title, desc: t.g4Desc },
              ].map((g, i) => (
                <div key={i} className={`flex gap-3 items-start p-4 ${bgSubtle} border ${border} rounded-xl`}>
                  <div className="bg-bronze-500/10 p-1.5 rounded-lg mt-0.5"><CheckIcon /></div>
                  <div>
                    <h3 className={`font-display text-xs font-bold uppercase tracking-wider ${textPrimary} mb-1`}>{g.title}</h3>
                    <p className={`${textSecondary} text-[11px] leading-relaxed`}>{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className={`py-12 px-4 ${bgDeep60} border-b ${border} transition-colors duration-300`}>
            <div className="flex items-center gap-1.5 mb-2"><span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ FAQ ✦</span></div>
            <h2 className={`font-display text-3xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6`}>{t.fearTitle}</h2>
            <div className="space-y-2">
              {interactivePains[lang].map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className={`${bgCardHover} border ${borderSubtle} rounded-xl overflow-hidden transition-all duration-300`}>
                    <button onClick={() => setActiveFaq(isOpen ? null : index)} className={`w-full flex justify-between items-center p-4 text-left ${isDark ? 'hover:text-bronze-500' : 'hover:text-bronze-600'} transition-colors`}>
                      <span className={`font-display font-bold uppercase text-[10px] sm:text-xs tracking-wide ${textPrimary} leading-snug`}>{item.question}</span>
                      <ChevronDownIcon className={isOpen ? 'rotate-180 text-bronze-500' : textMuted} />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? `max-h-40 border-t ${borderSubtle}` : 'max-h-0'}`} style={{ overflow: 'hidden' }}>
                      <div className={`p-4 ${textSecondary} text-[11px] leading-relaxed ${isDark ? 'bg-charcoal-900/50' : 'bg-charcoal-50/50'}`}>{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Lead Form */}
          <section id="appointment-form" className={`py-14 px-4 ${bg} transition-colors duration-300`}>
            <div className={`border border-bronze-500/20 rounded-2xl p-6 ${bgDeep80} shadow-xl relative overflow-hidden`}>
              <div className="flex justify-center mb-3">
                <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">BOOK APPOINTMENT</span>
              </div>
              <h2 className={`font-display text-2xl font-black text-center ${textPrimary} mb-3 uppercase tracking-tight`}>{t.formTitle}</h2>
              <div className="bg-bronze-500/10 border border-bronze-500/20 p-3 rounded-lg text-bronze-300 text-[10px] mb-5 leading-relaxed flex items-start gap-2.5">
                <span className="text-sm mt-0.5">❄️</span><p>{t.formComfort}</p>
              </div>

              {/* Receipt Preview */}
              <div className={`${isDark ? 'bg-bronze-500/5' : 'bg-bronze-50'} border border-bronze-500/20 rounded-xl p-3.5 mb-5 text-[11px] ${isDark ? 'text-neutral-300' : 'text-charcoal-600'}`}>
                <span className="text-bronze-400 font-bold block mb-1.5 uppercase tracking-wider text-[9px]">{t.servicesSelectedPreview}:</span>
                <div className={`flex justify-between items-center font-bold ${textPrimary} mb-0.5`}>
                  <span>{t[baseServiceObj.nameKey]}</span><span className="text-bronze-500">{baseServiceObj.price} ₸</span>
                </div>
                {selectedOptions.map(id => {
                  const o = extraOptions.find(x => x.id === id); if (!o) return null;
                  return <div key={id} className={`flex justify-between items-center text-[10px] ${textMuted} pl-3`}><span>+ {t[o.nameKey]}</span><span>+{o.price} ₸</span></div>;
                })}
                <div className={`border-t ${border} mt-2.5 pt-2 flex justify-between items-center font-black ${textPrimary} uppercase text-[10px] tracking-wider`}>
                  <span>{lang === 'ru' ? 'Итого' : 'Жиыны'}:</span>
                  <span className="text-bronze-400 text-xs sm:text-sm">{totalPrice} ₸ ({formatTime(totalTime)})</span>
                </div>
              </div>

              <p className={`${textSecondary} text-[11px] text-center mb-6 leading-normal`}>{t.formHelp}</p>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} required
                  className={`${isDark ? 'bg-charcoal-900 border-white/10 text-white placeholder-neutral-500' : 'bg-white border-charcoal-200 text-charcoal-800 placeholder-charcoal-400'} border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-bronze-500 transition-all w-full`} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} required
                  className={`${isDark ? 'bg-charcoal-900 border-white/10 text-white placeholder-neutral-500' : 'bg-white border-charcoal-200 text-charcoal-800 placeholder-charcoal-400'} border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-bronze-500 transition-all w-full`} />
                <button type="submit" disabled={isSubmitting} id="form-submit-btn"
                  className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 disabled:from-neutral-700 disabled:to-neutral-800 disabled:text-neutral-400 text-charcoal-950 font-bold py-3.5 rounded-xl text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md flex justify-center items-center gap-2">
                  {isSubmitting ? <span className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></span> : <span>{t.formCta}</span>}
                </button>
              </form>
            </div>
          </section>
        </main>

        {/* ───── FOOTER ───── */}
        <footer className={`border-t ${border} py-8 px-4 ${bgDeep} text-center transition-colors duration-300`}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center leading-none">
              <span className={`font-sans font-bold text-2xl tracking-widest ${textPrimary}`}>SVTL</span>
              <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
            </div>
            <p className={`${textMuted} text-[10px] max-w-xs`}>{t.footerText}</p>
            
            {/* Social Icons Footer */}
            <div className="flex gap-3 items-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className={`p-2 rounded-full ${bgSubtle} border ${border} ${isDark ? 'text-neutral-400 hover:text-bronze-400 hover:border-bronze-500/30' : 'text-charcoal-400 hover:text-bronze-600 hover:border-bronze-400'} transition-all`}>
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                 className={`p-2 rounded-full ${bgSubtle} border ${border} ${isDark ? 'text-neutral-400 hover:text-bronze-400 hover:border-bronze-500/30' : 'text-charcoal-400 hover:text-bronze-600 hover:border-bronze-400'} transition-all`}>
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a href="tel:+77016698086"
                 className={`p-2 rounded-full ${bgSubtle} border ${border} ${isDark ? 'text-neutral-400 hover:text-bronze-400 hover:border-bronze-500/30' : 'text-charcoal-400 hover:text-bronze-600 hover:border-bronze-400'} transition-all`}>
                <PhoneIcon className="w-4 h-4" />
              </a>
            </div>
            <p className={`${textFaint} text-[9px] mt-2`}>© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
          </div>
        </footer>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm popup-backdrop">
            <div className={`${isDark ? 'bg-charcoal-800' : 'bg-white'} border border-bronze-500/30 rounded-2xl p-6 max-w-[280px] w-full text-center relative shadow-2xl`}>
              <div className="w-12 h-12 bg-bronze-500/10 text-bronze-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h3 className={`font-display text-lg font-black uppercase tracking-tight ${textPrimary} mb-2`}>{t.modalSuccessTitle}</h3>
              <p className={`${textSecondary} text-xs leading-relaxed mb-5`}>{t.modalSuccessDesc}</p>
              <button onClick={handleModalClose} className="w-full bg-bronze-500 hover:bg-bronze-600 text-charcoal-950 font-bold py-2.5 rounded-xl text-xs tracking-wide transition-all">{t.modalClose}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
