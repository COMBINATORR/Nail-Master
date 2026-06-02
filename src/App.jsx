import React, { useState } from 'react';

// SVG Icons for elegant look
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929a10 10 0 00-14.142 0M12 3v2M12 19v2M3 12h2M19 12h2" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-bronze-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform ${className}`}>
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
      trust3Desc: "Бір уақытта жасалатын маникюр мен педикюр процедурасы белгіленген уақытты ғана алады. Егер шеберлер бұл уақытқа үлгермесе, сіз салонда жарты күніңізді өткізбейсіз, керісінше күткеніңіз үшін автоматты жеңілдік аласыз.",

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

      guaranteesTitle: "Біздің қатаң стандарттарымыз бен кепілдіктеріміз",
      guaranteesSubtitle: "Не болса да, сіз заңды түрде және беделдік жағынан қорғалғансыз",
      g1Title: "Шеберді ауыстырудан қорғау",
      g1Desc: "Сіз жүйе арқылы жазылған маманға нақты баратыныңызға кепілдік береміз. Біз кестеде жасырын ауыстырулар жасамаймыз және броньды біржақты тәртіппен жоймаймыз.",
      g2Title: "Ұзындық пен пішінді бекіту",
      g2Desc: "Шебер базалық қабатты жаққанға дейін, аралау кезеңінде сізбен тырнақтың пішіні мен ұзындығын кезең-кезеңімен келіседі. Сіз «тек жаңалауды» сұрап, ал сізге айлап өсірген ұзындықты кесіп тастайтын жағдай мүлдем мүмкін емес.",
      g3Title: "Ұқыптылық және уақытты өтеу",
      g3Desc: "Біз сіздің жоспарларыңызды бағалаймыз. Салон әрқашан уақытында ашылады, ал шеберлер жұмысты белгіленген минутта бастауға дайын. Егер келу біздің кінәмізден кешіктірілсе, сіз қызметке тікелей жеңілдік аласыз.",
      g4Title: "Ашық баға белгілеу",
      g4Desc: "Шебер сізбен алдын ала құнын талқыламай, ешқандай қосымша ақылы манипуляцияларды орындамайды. Сіз есептесу кезінде кез келген қаржылық тосынсыйлардан қорғалғансыз.",

      fearTitle: "Сіздің басты күмәндарыңызға жауап береміз",
      fearSubtitle: "Атыраудағы клиенттердің жиі қойылатын сұрақтары мен қорқыныштарын талдаймыз",

      formTitle: "Келу құнын бекіту",
      formComfort: "Атырауда қатты ыстық болады деп болжануда, бірақ біздің студиямызда әрқашан жайлы микроклимат (кондиционер), мінсіз тазалық сақталады және қонақтар үшін салқын сусындар бар.",
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
    <div className="min-h-screen bg-charcoal-900 text-neutral-100 font-sans selection:bg-bronze-500 selection:text-charcoal-950">
      
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-charcoal-900/80 border-b border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col items-start leading-none">
            <span className="font-sans font-bold text-3xl tracking-widest text-white">SVTL</span>
            <span className="font-serif text-[9px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-1">Nails &amp; Aesthetic</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
              <button 
                onClick={() => setLang('ru')} 
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${lang === 'ru' ? 'bg-bronze-500 text-charcoal-950' : 'text-neutral-300 hover:text-white'}`}
                id="lang-ru-btn"
              >
                RU
              </button>
              <button 
                onClick={() => setLang('kk')} 
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${lang === 'kk' ? 'bg-bronze-500 text-charcoal-950' : 'text-neutral-300 hover:text-white'}`}
                id="lang-kk-btn"
              >
                KZ
              </button>
            </div>

            <a 
              href="https://wa.me/77010000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 border border-bronze-500/30 hover:border-bronze-500 hover:bg-bronze-500/10 text-neutral-200 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-8 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-900 border-b border-white/5">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bronze-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-bronze-500 font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-6 block font-sans">
            {t.heroSuperTitle}
          </span>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.85] uppercase">
            {t.heroTitle} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-500 via-bronze-200 to-bronze-500 font-sans font-light text-xl sm:text-3xl tracking-widest block mt-4">
              {t.heroSubtitle}
            </span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:shadow-[0_4px_30px_rgba(197,168,128,0.4)] transform hover:-translate-y-0.5"
              id="hero-cta-btn"
            >
              {t.heroCta}
            </button>
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4">{t.trustTitle}</h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">{t.trustSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 hover:border-bronze-500/40 p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bronze-500/5 rounded-bl-full group-hover:bg-bronze-500/10 transition-all pointer-events-none"></div>
            <div className="bg-bronze-500/10 p-3 rounded-xl w-fit mb-6">
              <ShieldCheckIcon />
            </div>
            <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white mb-3 group-hover:text-bronze-500 transition-all">{t.trust1Title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{t.trust1Desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-bronze-500/40 p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bronze-500/5 rounded-bl-full group-hover:bg-bronze-500/10 transition-all pointer-events-none"></div>
            <div className="bg-bronze-500/10 p-3 rounded-xl w-fit mb-6">
              <WalletIcon />
            </div>
            <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white mb-3 group-hover:text-bronze-500 transition-all">{t.trust2Title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{t.trust2Desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-bronze-500/40 p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bronze-500/5 rounded-bl-full group-hover:bg-bronze-500/10 transition-all pointer-events-none"></div>
            <div className="bg-bronze-500/10 p-3 rounded-xl w-fit mb-6">
              <ClockIcon />
            </div>
            <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white mb-3 group-hover:text-bronze-500 transition-all">{t.trust3Title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{t.trust3Desc}</p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-4 sm:px-8 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4">{t.servicesTitle}</h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">{t.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-charcoal-900 border border-white/5 hover:border-bronze-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-4">{t.service1Name}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{t.service1Desc}</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-6 border-t border-white/5 pt-6">
                  <span className="text-neutral-400 text-xs tracking-wider uppercase font-semibold">Фикс цена</span>
                  <span className="text-bronze-500 font-display text-2xl font-black tracking-tight">{t.service1Price}</span>
                </div>
                <button 
                  onClick={scrollToForm} 
                  className="w-full bg-white/5 hover:bg-bronze-500 hover:text-charcoal-950 text-neutral-300 font-bold py-3 rounded-full text-xs tracking-wider uppercase border border-white/10 hover:border-bronze-500 transition-all duration-300"
                >
                  {t.serviceCta}
                </button>
              </div>
            </div>

            {/* Service 2 - Featured */}
            <div className="bg-gradient-to-b from-bronze-950/40 to-charcoal-900 border border-bronze-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_4px_30px_rgba(197,168,128,0.05)] transition-all duration-300 scale-100 lg:scale-[1.03]">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-bronze-500 text-charcoal-950 text-[10px] font-extrabold uppercase px-4 py-1 rounded-full tracking-widest shadow-md">
                Popular & Fast
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-4 mt-2">{t.service2Name}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">{t.service2Desc}</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-6 border-t border-bronze-500/20 pt-6">
                  <span className="text-bronze-300 text-xs tracking-wider uppercase font-semibold">Фикс цена</span>
                  <span className="text-bronze-400 font-display text-3xl font-black tracking-tight">{t.service2Price}</span>
                </div>
                <button 
                  onClick={scrollToForm} 
                  className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-charcoal-950 font-bold py-4 rounded-full text-xs tracking-wider uppercase transition-all duration-300 shadow-md"
                >
                  {t.serviceCta}
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-charcoal-900 border border-white/5 hover:border-bronze-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-4">{t.service3Name}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{t.service3Desc}</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-6 border-t border-white/5 pt-6">
                  <span className="text-neutral-400 text-xs tracking-wider uppercase font-semibold">Фикс цена</span>
                  <span className="text-bronze-500 font-display text-2xl font-black tracking-tight">{t.service3Price}</span>
                </div>
                <button 
                  onClick={scrollToForm} 
                  className="w-full bg-white/5 hover:bg-bronze-500 hover:text-charcoal-950 text-neutral-300 font-bold py-3 rounded-full text-xs tracking-wider uppercase border border-white/10 hover:border-bronze-500 transition-all duration-300"
                >
                  {t.serviceCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4">{t.guaranteesTitle}</h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">{t.guaranteesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="bg-bronze-500/10 p-2 rounded-lg mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-2">{t.g1Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.g1Desc}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="bg-bronze-500/10 p-2 rounded-lg mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-2">{t.g2Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.g2Desc}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="bg-bronze-500/10 p-2 rounded-lg mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-2">{t.g3Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.g3Desc}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="bg-bronze-500/10 p-2 rounded-lg mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-2">{t.g4Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.g4Desc}</p>
              </div>
            </div>
        </div>
      </section>

      {/* Interactive Objections Accordion */}
      <section className="py-20 px-4 sm:px-8 bg-charcoal-950/60 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4">{t.fearTitle}</h2>
            <p className="text-neutral-400 text-sm sm:text-base">{t.fearSubtitle}</p>
          </div>

          <div className="space-y-4">
            {interactivePains[lang].map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-charcoal-900 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:text-bronze-500 transition-colors"
                  >
                    <span className="font-display font-bold uppercase text-xs sm:text-sm tracking-wide text-white leading-snug">{item.question}</span>
                    <ChevronDownIcon className={isOpen ? 'rotate-180 text-bronze-500' : 'text-neutral-400'} />
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 border-t border-white/5' : 'max-h-0'}`}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="p-6 text-neutral-400 text-sm leading-relaxed bg-charcoal-900/50">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="appointment-form" className="py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-tr from-charcoal-900 via-charcoal-800 to-charcoal-900 border border-bronze-500/20 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-bronze-500/5 rounded-full blur-[80px]"></div>
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4">{t.formTitle}</h2>
            
            <div className="bg-bronze-500/10 border border-bronze-500/20 p-4 rounded-xl text-bronze-300 text-xs sm:text-sm mb-6 leading-relaxed flex items-center gap-3 text-left">
              <span className="text-xl">❄️</span>
              <p>{t.formComfort}</p>
            </div>

            <p className="text-neutral-300 text-sm mb-8 leading-relaxed">
              {t.formHelp}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  required
                  className="bg-charcoal-950 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-bronze-500 transition-all w-full"
                />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  required
                  className="bg-charcoal-950 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-bronze-500 transition-all w-full"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 disabled:from-neutral-700 disabled:to-neutral-800 disabled:text-neutral-400 text-charcoal-950 font-bold py-4 rounded-full text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-[0_4px_25px_rgba(197,168,128,0.3)] flex justify-center items-center gap-2"
                id="form-submit-btn"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>{t.formCta}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-8 bg-charcoal-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex flex-col items-center md:items-start leading-none mb-2">
              <span className="font-sans font-bold text-2xl tracking-widest text-white">SVTL</span>
              <span className="font-serif text-[9px] tracking-[0.2em] text-bronze-500 font-light uppercase mt-1">Nails &amp; Aesthetic</span>
            </div>
            <p className="text-neutral-500 text-xs text-center md:text-left max-w-sm">{t.footerText}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-neutral-500">
            <div className="flex gap-4 mb-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze-500 transition-colors">Instagram</a>
              <a href="https://wa.me/77010000000" target="_blank" rel="noopener noreferrer" className="hover:text-bronze-500 transition-colors">WhatsApp</a>
              <a href="tel:+77010000000" className="hover:text-bronze-500 transition-colors">+7 (701) 000-00-00</a>
            </div>
            <p>© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-charcoal-800 border border-bronze-500/30 rounded-3xl p-8 max-w-md w-full text-center relative shadow-2xl">
            <div className="w-16 h-16 bg-bronze-500/10 text-bronze-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              ✓
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-3">{t.modalSuccessTitle}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {t.modalSuccessDesc}
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-bronze-500 hover:bg-bronze-600 text-charcoal-950 font-bold py-3.5 rounded-full text-sm tracking-wide transition-all"
            >
              {t.modalClose}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
