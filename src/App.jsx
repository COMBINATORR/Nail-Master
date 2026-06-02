import React, { useState } from 'react';

// SVG Icons for elegant look
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

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

export default function App() {
  const [lang, setLang] = useState('ru'); // 'ru' or 'kk'
  const [activeFaq, setActiveFaq] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations object containing Russian and Kazakh versions
  const translations = {
    ru: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "БЕЗОПАСНЫЙ МАНИКЮР В АТЫРАУ",
      heroTitle: "МАНИКЮР, КОТОРЫЙ ВЫГЛЯДИТ ДОРОГО 4 НЕДЕЛИ",
      heroSubtitle: "БЕЗ ПОРЕЗОВ • ГАРАНТИЯ 14 ДНЕЙ",
      heroDesc: "Если покрытие сколется или отслоится в течение двух недель, мы бесплатно переделаем работу в день обращения — без споров, долгих разборов и игнорирования в мессенджерах. Вы получите предсказуемый результат на руках, полностью соответствующий ожиданиям, а не красивую картинку из соцсетей, под которой скрывается неаккуратная работа.",
      heroCta: "Рассчитать точную стоимость и время визита",
      
      trustTitle: "ПОЧЕМУ ДОВЕРЯЮТ",
      trustSubtitle: "Мы решаем главные страхи клиентов на деле, а не на словах",
      trust1Title: "100% одноразовые расходники",
      trust1Desc: "Пилочки, бафы и апельсиновые палочки используются строго индивидуально и утилизируются после процедуры. Герметичный крафт-пакет, прошедший полный цикл стерилизации в медицинском сухожаре, мастер вскрывает исключительно в вашем присутствии.",
      trust2Title: "0 тенге скрытых доплат на кассе",
      trust2Desc: "Окончательная стоимость услуги фиксируется до того, как мастер возьмет в руки аппарат. Никаких внезапных наценок постфактум за снятие старого материала, укрепление или финишный уход.",
      trust3Title: "Строго до 2 часов на комплекс в 4 руки",
      trust3Desc: "Процедура одновременного маникюра и педикюра занимает ровно заявленное время. Если мастера не уложатся в тайминг, вы получаете автоматическую скидку за ожидание, а не проводите в салоне половину дня.",
 
      servicesTitle: "МОИ УСЛУГИ",
      servicesSubtitle: "Все опции уже включены в стоимость. Никаких доплат за снятие или выравнивание.",
      service1Name: "Аппаратный и комбинированный маникюр",
      service1Desc: "Безопасная и безболезненная обработка кутикулы без ран, глубоких порезов и прожигов ногтевой пластины. В стоимость фиксированного прайса по умолчанию входят безопасное снятие предыдущего покрытия, гигиенический уход и выравнивание под кутикулу.",
      service1Price: "от 7 000 ₸",
      service2Name: "Комплекс в 4 руки (Маникюр + Педикюр)",
      service2Desc: "Параллельная работа двух квалифицированных мастеров, которая экономит до двух часов вашего личного времени. Процедура проходит в оборудованной зоне на глубоких анатомических креслах-реклайнерах. Качество, аккуратность и стойкость покрытия остаются безупречными.",
      service2Price: "от 15 000 ₸",
      service3Name: "Наращивание ногтей и кастомный дизайн",
      service3Desc: "Моделирование правильной архитектуры ногтя, длины и чистой формы (квадрат, овал, миндаль) в точном соответствии с вашим референсом. В вашем распоряжении палитра из 200+ актуальных оттенков, плотных камуфлирующих баз и светоотражающих покрытий.",
      service3Price: "от 12 000 ₸",
      serviceCta: "Записаться на услугу",
 
      guaranteesTitle: "ГАРАНТИИ",
      guaranteesSubtitle: "Что бы ни случилось, вы защищены юридически и репутационно",
      g1Title: "Защита от подмены мастера",
      g1Desc: "Вы гарантированно попадаете именно к тому специалисту, к которому записались через систему. Мы не производим скрытых замен в расписании и не отменяем бронь в одностороннем порядке.",
      g2Title: "Фиксация длины и формы",
      g2Desc: "Мастер пошагово согласует с вами форму и длину ногтей на этапе опила, до нанесения базового слоя. Ситуация, когда вы просили «только освежить», а вам срезали длину, которую вы отращивали месяцами, полностью исключена.",
      g3Title: "Пунктуальность и компенсация времени",
      g3Desc: "Мы ценим ваши планы. Салон всегда открыт вовремя, а мастера готовы к началу работы строго в назначенную минуту. Если визит задерживается по нашей вине, вы получаете прямую скидку на услугу.",
      g4Title: "Прозрачное ценообразование",
      g4Desc: "Мастер не выполняет никаких дополнительных платных манипуляций без предварительного обсуждения стоимости с вами. Вы защищены от любых финансовых сюрпризов при расчете.",
 
      fearTitle: "ОТЗЫВЫ • СТРАХИ",
      fearSubtitle: "Разбираем частые вопросы и страхи клиентов из Атырау",
 
      formTitle: "ЗАПИСЬ • BOOK NOW",
      formComfort: "В Атырау прогнозируется сильная жара, но в нашей студии всегда поддерживается комфортный микроклимат (кондиционер), идеальная чистота и есть прохладные напитки для гостей.",
      formHelp: "Оставьте свой номер телефона (WhatsApp) и имя. Администратор зафиксирует за вами персональную цену со всеми включенными опциями, свяжется в течение 5 минут и подберет оптимальное время.",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "Номер телефона (WhatsApp)",
      formCta: "Зафиксировать цену и записаться",
      
      modalSuccessTitle: "Заявка успешно принята!",
      modalSuccessDesc: "Администратор свяжется с вами в течение 5 минут в WhatsApp для подтверждения времени и фиксации цены. До встречи в нашей прохладной студии!",
      modalClose: "Отлично",
 
      footerText: "Студия безопасного маникюра в Атырау. Работаем для вашей уверенности в каждом пальчике.",
      rights: "Все права защищены."
    },
    kk: {
      brand: "SVTL Nails & Aesthetic",
      heroSuperTitle: "АТЫРАУДАҒЫ ҚАУІПСІЗ МАНИКЮР",
      heroTitle: "4 АПТА БОЙЫ ҚЫМБАТ КӨРІНЕТІН МАНИКЮР",
      heroSubtitle: "КЕСІКСІЗ • 14 КҮН КЕПІЛДІК",
      heroDesc: "Егер екі апта ішінде жабын сылынса немесе түсіп қалса, біз өтініш білдірген күні жұмысты тегін қайта жасап береміз — дау-дамайсыз, ұзақ талқылаусыз және мессенджерлерде елеусіз қалдырусыз. Сіз әлеуметтік желідегі әдемі, бірақ астында ұқыпсыз жұмыс жасырылған суретке емес, күткеніңізге толық сәйкес келетін қолдарыңыздағы болжамды нәтижеге қол жеткізесіз.",
      heroCta: "Нақты құны мен келу уақытын есептеу",
      
      trustTitle: "СЕНІМ • TRUST",
      trustSubtitle: "Біз клиенттердің басты қорқыныштарын сөзбен емес, іспен шешеміз",
      trust1Title: "100% бір реттік шығын материалдары",
      trust1Desc: "Егеулер, бафтар мен апельсин таяқшалары қатаң түрде жеке қолданылады және процедурадан кейін кәдеге жаратылады. Медициналық құрғақ ыстық шкафта стерилизацияның толық циклінен өткен герметикалық крафт-пакетті шебер тек сіздің көзіңізше ашады.",
      trust2Title: "Кассада 0 теңге жасырын қосымша төлемдер",
      trust2Desc: "Қызметтің түпкілікті құны шебер аппаратты қолға алғанға дейін белгіленеді. Ескі материалды алып тастау, нығайту немесе фиништік күтім үшін кейіннен кенеттен қосылатын үстемелер жоқ.",
      trust3Title: "4 қолмен жасалатын кешенге қатаң түрде 2 сағатқа дейін",
      trust3Desc: "Бір уақытта жасалатын маникюр мен педикюр процедурасы белгіленген уақытты ғана алады. Егер шеберлер бұл уақытқа үлгермесе, сіз салонда жарты күнді өткізбейсіз, керісінше күткеніңіз үшін автоматты жеңілдік аласыз.",
 
      servicesTitle: "ҚЫЗМЕТТЕРІМ",
      servicesSubtitle: "Барлық опциялар құнына енгізілген. Алып тастау немесе тегістеу үшін қосымша төлемдер жоқ.",
      service1Name: "Аппараттық және аралас маникюр",
      service1Desc: "Тырнақ пластинасын күйдірмей, жарақатсыз и терең кесіксіз кутикуланы қауіпсіз және ауырсынусыз өңдеу. Бекітілген прайс құнына әдепкі бойынша алдыңғы жабынды қауіпсіз алып тастау, гигиеналық күтім және кутикула астын тегістеу кіреді.",
      service1Price: "7 000 ₸ бастап",
      service2Name: "4 қолмен жасалатын кешен (Маникюр + Педикюр)",
      service2Desc: "Жеке уақытыңыздың екі сағатына дейін үнемдейтін екі білікті шебердің қатар жүретін жұмысы. Процедура терең анатомиялық реклайнер-креслоларымен жабдықталған аймақта өтеді. Жабынның сапасы, ұқыптылығы мен беріктігі мінсіз болып қалады.",
      service2Price: "15 000 ₸ бастап",
      service3Name: "Тырнақ өсіру және кастомды дизайн",
      service3Desc: "Тырнақтың дұрыс архитектурасын, ұзындығын және таза пішінін (шаршы, сопақ, бадам) сіздің референсіңізге сәйкес модельдеу. Сіздің қолыңызда 200+ өзекті реңктер палитрасы, тығыз камуфляжды базалар мен жарық шағылыстыратын жабындар бар.",
      service3Price: "12 000 ₸ бастап",
      serviceCta: "Қызметке жазылу",
 
      guaranteesTitle: "КЕПІЛДІКТЕР",
      guaranteesSubtitle: "Не болса да, сіз заңды түрде және беделдік жағынан қорғалғансыз",
      g1Title: "Шеберді ауыстырудан қорғау",
      g1Desc: "Сіз жүйе арқылы жазылған маманға нақты баратыныңызға кепілдік береміз. Біз кестеде жасырын ауыстырулар жасамаймыз және броньды біржақты тәртіппен жоймаймыз.",
      g2Title: "Ұзындық пен пішінді бекіту",
      g2Desc: "Шебер базалық қабатты жаққанға дейін, аралау кезеңінде сізбен тырнақтың пішіні мен ұзындығын кезең-кезеңімен келіседі. Сіз «тек жаңалауды» сұрап, ал сізге айлап өсірген ұзындықты кесіп тастайтын жағдай мүлдем мүмкін емес.",
      g3Title: "Ұқыптылық және уақытты өтеу",
      g3Desc: "Біз сіздің жоспарларыңызды бағалаймыз. Салон әрқашан уақытында ашылады, ал шеберлер жұмысты белгіленген минутта бастауға дайын. Егер келу біздің кінәмізден кешіктірілсе, сіз қызметке тікелей жеңілдік аласыз.",
      g4Title: "Ашық баға белгілеу",
      g4Desc: "Шебер сізбен алдын ала құнын талқыламай, ешқандай қосымша ақылы манипуляцияларды орындамайды. Сіз есептесу кезінде кез келген қаржылық тосынсыйлардан қорғалғансыз.",
 
      fearTitle: "КЕПІЛДІКТЕР",
      fearSubtitle: "Атыраудағы клиенттердің жиі қойылатын сұрақтары мен қорқыныштарын талдаймыз",
 
      formTitle: "ЖАЗЫЛУ • BOOK NOW",
      formComfort: "Атырауда қатты ыстық болады деп болжануда, бірақ біздің студиямызда әрқашан жайлы микроклимат (кондиционер), мінсіз тазалық сақталады және бос слоттар бар.",
      formHelp: "Телефон нөміріңізді (WhatsApp) және есіміңізді қалдырыңыз. Администратор сіз үшін барлық қосылған опциялары бар дербес бағаны бекітеді, 5 минут ішінде хабарласып, оңтайлы уақытты таңдайды.",
      namePlaceholder: "Сіздің есіміңіз",
      phonePlaceholder: "Телефон нөмірі (WhatsApp)",
      formCta: "Бағаны бекіту және жазылу",
      
      modalSuccessTitle: "Өтінім сәтті қабылданды!",
      modalSuccessDesc: "Администратор сізбен уақытты растау және бағаны бекіту үшін 5 минут ішінде WhatsApp арқылы хабарласады. Салқын студиямызда кездескенше!",
      modalClose: "Тамаша",
 
      footerText: "Атыраудағы қауіпсіз маникюр студиясы. Әрбір саусағыңыздың сенімділігі үшін жұмыс істейміз.",
      rights: "Барлық құқықтар қорғалған."
    }
  };

  // Top 10 client pains from the provided top 20 list (grouped/shortened for premium interactive layout)
  const interactivePains = {
    ru: [
      {
        question: "Боитесь, что покрытие быстро слезет или сколется?",
        answer: "Мы даем безусловную гарантию носки 14 дней. Если появится малейший скол — переделаем бесплатно в день обращения без споров."
      },
      {
        question: "Опасаетесь боли от аппарата и повреждения кутикулы?",
        answer: "Наши мастера работают по микротехнологии мягкой обработки. Никаких прожигов ногтевой пластины и порезов кутикулы."
      },
      {
        question: "Беспокоитесь о стерильности инструментов?",
        answer: "Все инструменты проходят 3-этапную медицинскую стерилизацию. Полностью закрытый крафт-пакет распечатывается при вас. Пилки и бафы 100% одноразовые."
      },
      {
        question: "Боитесь скрытых наценок на кассе?",
        answer: "Стоимость фиксируется строго до начала работы. Снятие предыдущего покрытия и выравнивание уже входят в прайс."
      },
      {
        question: "Переживаете, что мастер сделает форму не как на фото?",
        answer: "Форма и длина пошагово согласовываются с вами на этапе опила до покрытия базой. Вы получите именно то, что просили."
      }
    ],
    kk: [
      {
        question: "Жабын тез түсіп немесе сылынып қалады деп қорқасыз ба?",
        answer: "Біз 14 күндік сөзсіз носка кепілдігін береміз. Егер кішкене сызат пайда болса — өтініш білдірген күні ешқандай даусыз тегін қайта жасап береміз."
      },
      {
        question: "Аппараттан ауырсыну немесе кутикуланың зақымдалуынан қорқасыз ба?",
        answer: "Біздің шеберлер жұмсақ өңдеудің микротехнологиясы бойынша жұмыс істейді. Тырнақ пластинасының күюі мен кутикуланың кесілуі мүлдем болмайды."
      },
      {
        question: "Құралдардың стерильділігіне алаңдайсыз ба?",
        answer: "Барлық құралдар 3 кезеңді медициналық стерилизациядан өтеді. Толық жабылған крафт-пакет сіздің көзіңізше ашылады. Егеулер мен бафтар 100% бір реттік."
      },
      {
        question: "Кассадағы жасырын үстемелерден қорқасыз ба?",
        answer: "Құны жұмыс басталғанға дейін қатаң түрде белгіленеді. Алдыңғы жабынды алып тастау және тегістеу прайске кіріп қойған."
      },
      {
        question: "Шебер пішінді фотодағыдай жасай алмайды деп уайымдайсыз ба?",
        answer: "Пішіні мен ұзындығы базаны жаққанға дейін аралау кезеңінде сізбен кезең-кезеңімен келісіледі. Сіз дәл сұраған нәрсеңізді аласыз."
      }
    ]
  };

  const t = translations[lang];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
      setName('');
      setPhone('');
    }, 1200);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-neutral-100 font-sans selection:bg-bronze-500 selection:text-charcoal-950 flex flex-col items-center">
      
      {/* Container simulating a premium mobile-focused layout */}
      <div className="w-full max-w-md min-h-screen bg-charcoal-900 border-x border-white/10 flex flex-col justify-between shadow-2xl relative">
        
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-bronze-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-charcoal-900/95 border-b border-white/10 py-3 px-4 flex justify-between items-center">
          <div className="flex flex-col items-start leading-none">
            <span className="font-sans font-bold text-2xl tracking-widest text-white">SVTL</span>
            <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
              <button 
                onClick={() => setLang('ru')} 
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all ${lang === 'ru' ? 'bg-bronze-500 text-charcoal-950' : 'text-neutral-400 hover:text-white'}`}
                id="lang-ru-btn"
              >
                RU
              </button>
              <button 
                onClick={() => setLang('kk')} 
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all ${lang === 'kk' ? 'bg-bronze-500 text-charcoal-950' : 'text-neutral-400 hover:text-white'}`}
                id="lang-kk-btn"
              >
                KZ
              </button>
            </div>

            <a 
              href="https://wa.me/77010000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-bronze-500/10 border border-bronze-500/30 text-bronze-300 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase hover:bg-bronze-500/20 transition-all"
            >
              WA
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">

          {/* Hero Section */}
          <section className="relative overflow-hidden pt-10 pb-12 px-4 border-b border-white/10 text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1 border border-bronze-500/30 bg-bronze-500/5 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-500 animate-pulse"></span>
              <span className="text-bronze-300 font-bold tracking-widest text-[9px] uppercase font-sans">
                {t.heroSuperTitle}
              </span>
            </div>
            
            <h1 className="font-display text-4xl font-black tracking-tighter text-white mb-4 leading-[0.9] uppercase">
              {t.heroTitle}
            </h1>

            <div className="border border-bronze-500/20 bg-bronze-950/20 rounded-xl p-3 mb-6 inline-block">
              <span className="text-bronze-400 font-sans font-bold text-xs tracking-wider uppercase block">
                ✦ {t.heroSubtitle} ✦
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto mb-8">
              {t.heroDesc}
            </p>

            <button 
              onClick={scrollToForm}
              className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 py-3.5 rounded-xl font-bold tracking-wider uppercase text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.2)]"
              id="hero-cta-btn"
            >
              {t.heroCta}
            </button>
          </section>

          {/* Trust Block (Modular Numbered Cards like Ref 4) */}
          <section className="py-12 px-4 border-b border-white/10">
            {/* Section Tag */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ INFO ✦</span>
            </div>
            
            <h2 className="font-display text-3xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              {t.trustTitle}
            </h2>

            <div className="space-y-3">
              {/* Card 1 */}
              <div className="border border-white/10 rounded-xl p-4 flex items-start gap-3.5 bg-charcoal-950/40 relative group hover:border-bronze-500/25 transition-all">
                <span className="font-display font-black text-2xl text-bronze-500 leading-none">01</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xs tracking-wider uppercase text-white mb-1">{t.trust1Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.trust1Desc}</p>
                </div>
                <span className="text-bronze-500/40 font-bold self-start mt-0.5 text-xs">*</span>
              </div>

              {/* Card 2 */}
              <div className="border border-white/10 rounded-xl p-4 flex items-start gap-3.5 bg-charcoal-950/40 relative group hover:border-bronze-500/25 transition-all">
                <span className="font-display font-black text-2xl text-bronze-500 leading-none">02</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xs tracking-wider uppercase text-white mb-1">{t.trust2Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.trust2Desc}</p>
                </div>
                <span className="text-bronze-500/40 font-bold self-start mt-0.5 text-xs">*</span>
              </div>

              {/* Card 3 */}
              <div className="border border-white/10 rounded-xl p-4 flex items-start gap-3.5 bg-charcoal-950/40 relative group hover:border-bronze-500/25 transition-all">
                <span className="font-display font-black text-2xl text-bronze-500 leading-none">03</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xs tracking-wider uppercase text-white mb-1">{t.trust3Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.trust3Desc}</p>
                </div>
                <span className="text-bronze-500/40 font-bold self-start mt-0.5 text-xs">*</span>
              </div>
            </div>
          </section>

          {/* Service Block (Structured Price List like Ref 4) */}
          <section className="py-12 px-4 bg-charcoal-950/40 border-b border-white/10">
            {/* Section Tag */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ SERVICES ✦</span>
            </div>

            <h2 className="font-display text-3xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              {t.servicesTitle}
            </h2>

            <div className="border border-white/10 rounded-xl overflow-hidden bg-charcoal-900 shadow-lg">
              
              {/* Service item 1 */}
              <div className="border-b border-white/10 p-5 hover:bg-white/5 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-bronze-500 font-bold text-xs">*</span>
                    <h3 className="font-display font-bold uppercase tracking-wide text-white text-xs sm:text-sm">{t.service1Name}</h3>
                  </div>
                  <span className="font-display font-black text-bronze-500 text-xs sm:text-sm">{t.service1Price}</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed pl-3">{t.service1Desc}</p>
                <div className="mt-4 pl-3">
                  <button 
                    onClick={scrollToForm} 
                    className="bg-white/5 hover:bg-bronze-500 hover:text-charcoal-950 text-neutral-300 font-bold px-4 py-1.5 rounded-full text-[9px] tracking-wider uppercase border border-white/10 hover:border-bronze-500 transition-all"
                  >
                    {t.serviceCta}
                  </button>
                </div>
              </div>

              {/* Service item 2 (Featured) */}
              <div className="border-b border-white/10 p-5 bg-bronze-950/10 hover:bg-bronze-950/20 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-bronze-400 font-bold text-xs">✦</span>
                    <h3 className="font-display font-bold uppercase tracking-wide text-white text-xs sm:text-sm">{t.service2Name}</h3>
                  </div>
                  <span className="font-display font-black text-bronze-400 text-xs sm:text-sm">{t.service2Price}</span>
                </div>
                <p className="text-neutral-300 text-[11px] leading-relaxed pl-3">{t.service2Desc}</p>
                <div className="mt-4 pl-3">
                  <button 
                    onClick={scrollToForm} 
                    className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 font-bold px-5 py-1.8 rounded-full text-[9px] tracking-wider uppercase transition-all shadow-sm"
                  >
                    {t.serviceCta}
                  </button>
                </div>
              </div>

              {/* Service item 3 */}
              <div className="p-5 hover:bg-white/5 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-bronze-500 font-bold text-xs">*</span>
                    <h3 className="font-display font-bold uppercase tracking-wide text-white text-xs sm:text-sm">{t.service3Name}</h3>
                  </div>
                  <span className="font-display font-black text-bronze-500 text-xs sm:text-sm">{t.service3Price}</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed pl-3">{t.service3Desc}</p>
                <div className="mt-4 pl-3">
                  <button 
                    onClick={scrollToForm} 
                    className="bg-white/5 hover:bg-bronze-500 hover:text-charcoal-950 text-neutral-300 font-bold px-4 py-1.5 rounded-full text-[9px] tracking-wider uppercase border border-white/10 hover:border-bronze-500 transition-all"
                  >
                    {t.serviceCta}
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* Guarantees Section (Grid/Modular list) */}
          <section className="py-12 px-4 border-b border-white/10">
            {/* Section Tag */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ RULES ✦</span>
            </div>

            <h2 className="font-display text-3xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              {t.guaranteesTitle}
            </h2>

            <div className="space-y-3">
              <div className="flex gap-3 items-start p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="bg-bronze-500/10 p-1.5 rounded-lg mt-0.5">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-1">{t.g1Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.g1Desc}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="bg-bronze-500/10 p-1.5 rounded-lg mt-0.5">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-1">{t.g2Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.g2Desc}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="bg-bronze-500/10 p-1.5 rounded-lg mt-0.5">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-1">{t.g3Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.g3Desc}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="bg-bronze-500/10 p-1.5 rounded-lg mt-0.5">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-1">{t.g4Title}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{t.g4Desc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Objections FAQ (Modular Accordions) */}
          <section className="py-12 px-4 bg-charcoal-950/60 border-b border-white/10">
            {/* Section Tag */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-display text-[9px] tracking-wider text-bronze-500 font-bold uppercase">✦ FAQ ✦</span>
            </div>

            <h2 className="font-display text-3xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              {t.fearTitle}
            </h2>

            <div className="space-y-2">
              {interactivePains[lang].map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-charcoal-900 border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex justify-between items-center p-4 text-left hover:text-bronze-500 transition-colors"
                    >
                      <span className="font-display font-bold uppercase text-[10px] sm:text-xs tracking-wide text-white leading-snug">{item.question}</span>
                      <ChevronDownIcon className={isOpen ? 'rotate-180 text-bronze-500' : 'text-neutral-400'} />
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 border-t border-white/5' : 'max-h-0'}`}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="p-4 text-neutral-400 text-[11px] leading-relaxed bg-charcoal-900/50">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Lead Form Section */}
          <section id="appointment-form" className="py-14 px-4 bg-charcoal-900">
            <div className="border border-bronze-500/20 rounded-2xl p-6 bg-charcoal-950/80 shadow-xl relative overflow-hidden">
              
              {/* Form header tag */}
              <div className="flex justify-center mb-3">
                <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">
                  BOOK APPOINTMENT
                </span>
              </div>

              <h2 className="font-display text-2xl font-black text-center text-white mb-3 uppercase tracking-tight">{t.formTitle}</h2>
              
              <div className="bg-bronze-500/10 border border-bronze-500/20 p-3 rounded-lg text-bronze-300 text-[10px] mb-5 leading-relaxed flex items-start gap-2.5">
                <span className="text-sm mt-0.5">❄️</span>
                <p>{t.formComfort}</p>
              </div>

              <p className="text-neutral-400 text-[11px] text-center mb-6 leading-normal">
                {t.formHelp}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  required
                  className="bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-bronze-500 transition-all w-full"
                />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  required
                  className="bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-bronze-500 transition-all w-full"
                />

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 disabled:from-neutral-700 disabled:to-neutral-800 disabled:text-neutral-400 text-charcoal-950 font-bold py-3.5 rounded-xl text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md flex justify-center items-center gap-2"
                  id="form-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>{t.formCta}</span>
                  )}
                </button>
              </form>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4 bg-charcoal-950 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center leading-none">
              <span className="font-sans font-bold text-2xl tracking-widest text-white">SVTL</span>
              <span className="font-serif text-[8px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-0.5">Nails &amp; Aesthetic</span>
            </div>
            
            <p className="text-neutral-500 text-[10px] max-w-xs">{t.footerText}</p>
            
            <div className="flex gap-4 text-[10px] text-neutral-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze-500 transition-colors">Instagram</a>
              <a href="https://wa.me/77010000000" target="_blank" rel="noopener noreferrer" className="hover:text-bronze-500 transition-colors">WhatsApp</a>
              <a href="tel:+77010000000" className="hover:text-bronze-500 transition-colors">+7 (701) 000-00-00</a>
            </div>

            <p className="text-neutral-600 text-[9px] mt-2">© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
          </div>
        </footer>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-charcoal-800 border border-bronze-500/30 rounded-2xl p-6 max-w-[280px] w-full text-center relative shadow-2xl">
              <div className="w-12 h-12 bg-bronze-500/10 text-bronze-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-white mb-2">{t.modalSuccessTitle}</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-5">
                {t.modalSuccessDesc}
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-bronze-500 hover:bg-bronze-600 text-charcoal-950 font-bold py-2.5 rounded-xl text-xs tracking-wide transition-all"
              >
                {t.modalClose}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
