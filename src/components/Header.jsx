import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo3D } from './Logo3D';
import {
  InstagramIcon,
  WhatsAppIcon,
  SunIcon,
  MoonIcon,
  VolumeOnIcon,
  VolumeMuteIcon,
} from './Icons';
import { AnimatedMenuIcon } from '@/components/ui/skiper-ui/skiper99';
import { useTactileFeedback } from '../hooks/useTactileFeedback';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const borderSubtle = 'border-[var(--border-subtle)]';
const bgSubtle = 'bg-[var(--bg-subtle)]';

export const Header = ({
  theme,
  setTheme,
  isDayTheme,
  isNightTheme,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
  isScrolled,
  isScrolledCapsule,
  handleLogoClick
}) => {
  const { t, i18n } = useTranslation();
  const { soundEnabled, toggleSound, triggerClick } = useTactileFeedback();
  const lang = i18n.language;

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);

  const themePopupRef = useRef(null);
  const langPopupRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) setShowLangPopup(false);
      if (themePopupRef.current && !themePopupRef.current.contains(e.target)) setShowThemeMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLangPopup(false);
    triggerClick();
  };

  return (
    <header className={`sticky top-0 z-40 liquid-glass-header transition-all duration-300 ${isScrolledCapsule ? 'scrolled-capsule' : ''}`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 py-3 flex justify-between items-center relative">
        {/* Sandwich menu — Skiper99 animated hamburger */}
        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            triggerClick();
          }}
          className="liquid-glass-icon-btn text-[var(--text-secondary)] hover:text-bronze-500 z-10 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <AnimatedMenuIcon
            open={isMobileMenuOpen}
            sizeClassName="size-5 lg:size-6"
            className="w-5 h-5 lg:w-6 lg:h-6"
          />
        </button>

        {/* Logo with hover SVG neon animation (Absolute-centered on all screens) */}
        <div 
          className={`logo-container group !absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isScrolled ? 'active' : ''}`}
          onClick={handleLogoClick}
        >
          <Logo3D />
          
          {/* Floating text underlay */}
          <div className="logo-details">
            <div className="logo-line"></div>
            <span className="logo-subtext">
              Nails &amp; Aesthetic
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 z-10">
          <div className="hidden sm:inline-flex liquid-glass-social-pill">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="liquid-glass-icon-btn !w-8 !h-8 text-[var(--text-secondary)] instagram-glow-hover">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="liquid-glass-icon-btn !w-8 !h-8 text-[var(--text-secondary)] whatsapp-glow-hover">
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
          
          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              toggleSound();
              triggerClick();
            }}
            className="liquid-glass-icon-btn text-[var(--text-secondary)] hover:text-bronze-500"
            title={soundEnabled ? t('soundEnabled') : t('soundMuted')}
            aria-label={t('soundToggle')}
          >
            {soundEnabled ? <VolumeOnIcon className="w-4 h-4 text-bronze-400" /> : <VolumeMuteIcon className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Appearance switch popover dropdown */}
          <div className="relative" ref={themePopupRef}>
            <button onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="liquid-glass-icon-btn text-[var(--text-secondary)] hover:text-bronze-500"
              title={t('appearance')}>
              {isDayTheme ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
            {showThemeMenu && (
              <div className={`absolute right-0 top-full mt-2 liquid-glass-strong rounded-2xl shadow-2xl p-4 min-w-[220px] z-50 popup-backdrop animate-fadeIn ${textPrimary}`}>
                <div className="flex p-1 mb-4 tactile-container">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'btn-switch-active-day' : `${textMuted} hover:${textPrimary} border border-transparent`}`}
                  >
                    <SunIcon className="w-4 h-4" />
                    <span>{t('day')}</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'btn-switch-active-night' : `${textMuted} hover:${textPrimary} border border-transparent`}`}
                  >
                    <MoonIcon className="w-4 h-4" />
                    <span>{t('night')}</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <div className={`text-[10px] uppercase font-bold tracking-wider ${textMuted} mb-2`}>
                    {t('premiumPalettes')}
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
                    {theme === 'emerald' && <span className="text-success">✓</span>}
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
                    {theme === 'sage' && <span className="text-success">✓</span>}
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
          {/* Language selector */}
          <div className="relative" ref={langPopupRef}>
            <button onClick={() => setShowLangPopup(!showLangPopup)}
              className="liquid-glass-icon-btn !w-auto !px-2.5 text-[var(--text-secondary)] hover:text-bronze-500 flex items-center">
              <span className="text-xs font-bold uppercase tracking-widest">{lang === 'kk' ? 'KZ' : lang.toUpperCase()}</span>
            </button>
            {showLangPopup && (
              <div className={`absolute right-0 top-full mt-2 liquid-glass-strong rounded-2xl shadow-2xl p-4 min-w-[180px] z-50 popup-backdrop animate-fadeIn ${textPrimary} space-y-2`}>
                <div className={`text-[10px] uppercase font-bold tracking-wider ${textMuted} mb-2`}>
                  {t('Select Language', 'Выбор языка')}
                </div>

                <button onClick={() => changeLanguage('ru')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'ru' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                  <div className="flex items-center gap-2">
                    <span>🇷🇺</span>
                    <span>Русский</span>
                  </div>
                  {lang === 'ru' && <span className="text-bronze-400">✓</span>}
                </button>

                <button onClick={() => changeLanguage('kk')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'kk' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                  <div className="flex items-center gap-2">
                    <span>🇰🇿</span>
                    <span>Қазақша</span>
                  </div>
                  {lang === 'kk' && <span className="text-bronze-400">✓</span>}
                </button>

                <button onClick={() => changeLanguage('en')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'en' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                  <div className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    <span>English</span>
                  </div>
                  {lang === 'en' && <span className="text-bronze-400">✓</span>}
                </button>

                <button onClick={() => changeLanguage('zh')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'zh' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                  <div className="flex items-center gap-2">
                    <span>🇨🇳</span>
                    <span>中文</span>
                  </div>
                  {lang === 'zh' && <span className="text-bronze-400">✓</span>}
                </button>

                <button onClick={() => changeLanguage('ko')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${lang === 'ko' ? `${bgSubtle} ${textPrimary} border ${borderSubtle}` : `${textSecondary} hover:${bgSubtle} border border-transparent`}`}>
                  <div className="flex items-center gap-2">
                    <span>🇰🇷</span>
                    <span>한국어</span>
                  </div>
                  {lang === 'ko' && <span className="text-bronze-400">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
