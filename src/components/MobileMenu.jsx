import { useTranslation } from 'react-i18next';
import {
  CloseIcon,
  InstagramIcon,
  WhatsAppIcon,
  SunIcon,
  MoonIcon
} from './Icons';

const bgSubtle = 'bg-[var(--bg-subtle)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';
const borderSubtle = 'border-[var(--border-subtle)]';

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  theme,
  setTheme,
  isDayTheme,
  isNightTheme
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (!isMobileMenuOpen) return null;

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsMobileMenuOpen(false);
  };

  return (
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
                en: ['About me','Services','Works','Aftercare','Guarantees','FAQ','Address','Booking'],
                zh: ['关于我', '服务项目', '作品展示', '护理指南', '服务保证', '常见问题', '联系地址', '立即预约'],
                ko: ['자기소개', '시술 메뉴', '포트폴리오', '애프터케어', '신뢰 보장', '자주 묻는 질문', '오시는 길', '예약 신청']
              };
              return (
                <a 
                  key={href} 
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider ${textSecondary} hover:text-bronze-500 transition-colors border-b ${borderSubtle} pb-3`}
                >
                  {labels[lang] ? labels[lang][i] : labels['ru'][i]}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer inside Mobile Menu */}
        <div className={`flex flex-col gap-5 border-t ${borderSubtle} pt-6`}>
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
          <div className="flex flex-col gap-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>Language / Язык / Тіл / 语言 / 언어:</span>
            <div className={`flex p-0.5 border ${borderSubtle} rounded-lg tactile-container w-full`}>
              <button 
                onClick={() => changeLanguage('ru')}
                className={`flex-1 py-1.5 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'ru' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} hover:${textPrimary}`}`}
              >
                RU
              </button>
              <button 
                onClick={() => changeLanguage('kk')}
                className={`flex-1 py-1.5 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'kk' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} hover:${textPrimary}`}`}
              >
                KZ
              </button>
              <button 
                onClick={() => changeLanguage('en')}
                className={`flex-1 py-1.5 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'en' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} hover:${textPrimary}`}`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('zh')}
                className={`flex-1 py-1.5 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'zh' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} hover:${textPrimary}`}`}
              >
                ZH
              </button>
              <button 
                onClick={() => changeLanguage('ko')}
                className={`flex-1 py-1.5 text-center rounded-md text-[10px] font-bold transition-all ${lang === 'ko' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} hover:${textPrimary}`}`}
              >
                KO
              </button>
            </div>
          </div>

          {/* Appearance selection in drawer */}
          <div className={`flex flex-col gap-3 mt-4 pt-4 border-t ${borderSubtle}`}>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>
              {lang === 'ru' ? 'Внешний вид / Тема:' : lang === 'kk' ? 'Сыртқы түрі / Тема:' : 'Appearance / Theme:'}
            </span>
            
            {/* Day / Night tactile buttons */}
            <div className={`flex p-1 border ${borderSubtle} tactile-container`}>
              <button 
                type="button"
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'btn-switch-active-day' : `${textSecondary} hover:${textPrimary} border border-transparent`}`}
              >
                <SunIcon className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'День' : lang === 'kk' ? 'Күн' : 'Day'}</span>
              </button>
              <button 
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'btn-switch-active-night' : `${textSecondary} hover:${textPrimary} border border-transparent`}`}
              >
                <MoonIcon className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Ночь' : lang === 'kk' ? 'Түн' : 'Night'}</span>
              </button>
            </div>

            {/* 4 Premium Presets */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button 
                type="button"
                onClick={() => setTheme('emerald')}
                className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'emerald' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} border-transparent hover:${bgSubtle} hover:${textPrimary}`}`}
              >
                <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#061F17' }}></span>
                <span>Emerald</span>
              </button>
              <button 
                type="button"
                onClick={() => setTheme('nudefashion')}
                className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'nudefashion' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} border-transparent hover:${bgSubtle} hover:${textPrimary}`}`}
              >
                <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#F4EFEA' }}></span>
                <span>Nude</span>
              </button>
              <button 
                type="button"
                onClick={() => setTheme('sage')}
                className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'sage' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} border-transparent hover:${bgSubtle} hover:${textPrimary}`}`}
              >
                <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#F0F2EE' }}></span>
                <span>Sage</span>
              </button>
              <button 
                type="button"
                onClick={() => setTheme('cyber')}
                className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'cyber' ? 'active-tactile-pill scale-[1.02]' : `${textSecondary} border-transparent hover:${bgSubtle} hover:${textPrimary}`}`}
              >
                <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#0D0B14' }}></span>
                <span>Cyber</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
