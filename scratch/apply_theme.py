import os

filepath = r"c:\Users\ASUS\Desktop\Мастер Маникюра\src\App.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

replacements = [
    # 1. State declarations
    (
        """  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [nailShape, setNailShape] = useState('oval');
  const [visitMode, setVisitMode] = useState('relax');
  const langPopupRef = useRef(null);
  const logoRef = useRef(null);""",
        """  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [nailShape, setNailShape] = useState('oval');
  const [visitMode, setVisitMode] = useState('relax');
  const langPopupRef = useRef(null);
  const themePopupRef = useRef(null);
  const logoRef = useRef(null);"""
    ),
    # 2. isDark & useEffect
    (
        """  const systemPrefersDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches : true;
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    document.body.classList.toggle('light', !isDark);
    localStorage.setItem('svtl-theme', theme);
  }, [theme, isDark]);""",
        """  const systemPrefersDark = typeof window !== 'undefined'
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
  }, [theme, isDark, systemPrefersDark]);"""
    ),
    # 3. Handler for outside clicks
    (
        """  useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) setShowLangPopup(false);
      if (logoRef.current && !logoRef.current.contains(e.target)) {
        logoRef.current.classList.remove('active');
      }
    };""",
        """  useEffect(() => {
    const handler = (e) => {
      if (langPopupRef.current && !langPopupRef.current.contains(e.target)) setShowLangPopup(false);
      if (themePopupRef.current && !themePopupRef.current.contains(e.target)) setShowThemeMenu(false);
      if (logoRef.current && !logoRef.current.contains(e.target)) {
        logoRef.current.classList.remove('active');
      }
    };"""
    ),
    # 4. Helpers
    (
        """  /* ─── Theme-aware class helpers ─── */
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
  const logoColorClass = isDark
    ? 'text-neutral-500 group-hover:text-white group-[.active]:text-white'
    : 'text-charcoal-400 group-hover:text-charcoal-900 group-[.active]:text-charcoal-900';
  const textFaint     = isDark ? 'text-neutral-600' : 'text-charcoal-300';

  const border       = isDark ? 'border-white/10'  : 'border-charcoal-200';
  const borderSubtle = isDark ? 'border-white/5'   : 'border-charcoal-100';""",
        """  /* ─── Theme-aware class helpers ─── */
  const bg       = 'bg-transparent';
  const bgDeep   = 'bg-[var(--bg-deep)]';
  const bgCard   = 'bg-[var(--bg-card)]';
  const bgSubtle = 'bg-[var(--bg-subtle)]';
  const bgHeader = 'bg-[var(--bg-header)]';
  const bgAlt    = 'bg-[var(--bg-alt)]';
  const bgDeep80 = 'bg-[var(--bg-deep)]';

  const textPrimary   = 'text-[var(--text-primary)]';
  const textSecondary = 'text-[var(--text-secondary)]';
  const textMuted     = 'text-[var(--text-muted)]';
  const logoColorClass = 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-[.active]:text-[var(--text-primary)]';
  const textFaint     = 'text-[var(--text-muted)]/60';

  const border       = 'border-[var(--border-color)]';
  const borderSubtle = 'border-[var(--border-subtle)]';"""
    ),
    # 5. Return page wrapper
    (
        """  return (
    <div className={`relative min-h-screen ${bg} bg-grain ${isDark ? 'text-neutral-100' : 'text-charcoal-800'} font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950`}>""",
        """  return (
    <div className={`relative min-h-screen ${bg} bg-grain text-[var(--text-primary)] font-sans transition-colors duration-300 selection:bg-bronze-500 selection:text-charcoal-950`}>"""
    ),
    # 6. Header Theme button/popup dropdown and Lang popup dropdown
    (
        """            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
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
              {theme === 'dark' ? <MoonIcon /> : theme === 'light' ? <SunIcon /> : <SystemIcon />}
            </button>
            <div className="relative" ref={langPopupRef}>
              <button onClick={() => setShowLangPopup(!showLangPopup)}
                className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors flex items-center gap-1`}>
                <GlobeIcon />
                <span className="text-[9px] font-bold uppercase">{lang === 'ru' ? 'RU' : lang === 'kk' ? 'KZ' : 'EN'}</span>
              </button>
              {showLangPopup && (
                <div className={`absolute right-0 top-full mt-2 ${isDark ? 'bg-charcoal-800 border-white/10' : 'bg-white border-charcoal-200'} border rounded-xl shadow-xl overflow-hidden z-50 popup-backdrop min-w-[130px] animate-fadeIn`}>
                  <button onClick={() => { setLang('ru'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'ru' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}>
                    <span>🇷🇺</span> Русский
                  </button>
                  <button onClick={() => { setLang('kk'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'kk' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}>
                    <span>🇰🇿</span> Қазақша
                  </button>
                  <button onClick={() => { setLang('en'); setShowLangPopup(false); }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors ${lang === 'en' ? 'text-bronze-500 bg-bronze-500/10' : `${textSecondary} ${isDark ? 'hover:bg-white/5' : 'hover:bg-charcoal-50'}`}`}>
                    <span>🇬🇧</span> English
                  </button>
                </div>
              )}
            </div>
            <div className={`h-5 w-px ${isDark ? 'bg-white/10' : 'bg-charcoal-200'} mx-0.5 lg:hidden`}></div>
            <button onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-bronze-400' : 'text-charcoal-400 hover:text-bronze-600'} transition-colors`}""",
        """            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className={`hidden sm:inline-flex p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[#E1306C] transition-colors`}>
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
               className={`hidden sm:inline-flex p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[#25D366] transition-colors`}>
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <div className={`hidden sm:block h-5 w-px bg-[var(--border-color)] mx-0.5`} />
            
            {/* Appearance switch popover dropdown */}
            <div className="relative" ref={themePopupRef}>
              <button onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-bronze-500 transition-colors flex items-center gap-1`}
                title={lang === 'ru' ? 'Внешний вид' : lang === 'kk' ? 'Сыртқы түрі' : 'Appearance'}>
                {isDayTheme ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                <ChevronDownIcon className={`w-3 h-3 ${showThemeMenu ? 'rotate-180' : ''}`} />
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 top-full mt-2 bg-charcoal-950/95 border border-white/10 rounded-2xl shadow-2xl p-4 min-w-[220px] z-50 popup-backdrop animate-fadeIn text-white">
                  <div className="flex bg-charcoal-900/60 p-1 rounded-xl border border-white/5 mb-4">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'bg-amber-500 text-charcoal-950 glow-sun scale-[1.02]' : isDayTheme ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                    >
                      <SunIcon className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'День' : lang === 'kk' ? 'Күн' : 'Day'}</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'bg-orange-600 text-white glow-moon scale-[1.02]' : isNightTheme ? 'bg-orange-600/20 text-orange-300 border border-orange-600/30' : 'text-neutral-400 hover:text-white border border-transparent'}`}
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
                className={`p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-bronze-500 transition-colors flex items-center gap-1`}>
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
            <div className={`h-5 w-px bg-[var(--border-color)] mx-0.5 lg:hidden`} />
            <button onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-bronze-500 transition-colors`}"""
    ),
    # 7. Category selector tabs
    (
        """          {/* Category Tabs */}
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
          </div>""",
        """          {/* Category Tabs */}
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
                      : `${border} bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]`
                    }`}
                >
                  {t[cat.nameKey]}
                </button>
              );
            })}
          </div>"""
    ),
    # 8. Base services list items
    (
        """                      className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden
                        ${isDark ? 'bg-charcoal-900/50' : 'bg-white/80'}
                        ${isActive
                          ? `border-bronze-500 shadow-[0_0_20px_rgba(197,168,128,0.12)] ${isDark ? 'bg-charcoal-900' : 'bg-white'}`
                          : `${borderSubtle} opacity-70 hover:opacity-100`}`}>""",
        """                      className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden bg-[var(--bg-card)]
                        ${isActive
                          ? `border-bronze-500 shadow-[0_0_20px_rgba(197,168,128,0.12)]`
                          : `${borderSubtle} opacity-70 hover:opacity-100`}`}>"""
    ),
    # 9. Nails shape selector
    (
        """                          className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center
                            ${isDark ? 'bg-charcoal-900/30' : 'bg-white/60'}
                            ${isActive 
                              ? `${isDark ? 'border-bronze-500 text-bronze-400 bg-bronze-500/5 shadow-[0_0_15px_rgba(197,168,128,0.15)]' : 'border-bronze-500 text-bronze-700 bg-bronze-500/5 shadow-[0_0_15px_rgba(197,168,128,0.08)]'}`
                              : `${borderSubtle} opacity-80 hover:opacity-100`
                            }`}
                        >
                          {/* SVG Nail shape */}
                          <svg width="40" height="40" viewBox="0 0 32 32" className="mb-2">
                            {/* Finger contour */}
                            <path 
                              d="M8,30 C8,20 8,16 9,14 C10,12 11,11 16,11 C21,11 22,12 23,14 C24,16 24,20 24,30" 
                              fill="none" 
                              stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}""",
        """                          className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center bg-[var(--bg-card)]
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
                              stroke="var(--border-color)""""
    ),
    # 10. Options checklist
    (
        """                      <div key={opt.id} onClick={() => toggleOption(opt.id)}
                        className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-300 flex items-center justify-between
                          ${isDark ? 'bg-charcoal-900/30' : 'bg-white/60'}
                          ${isChecked ? 'border-bronze-500/50' : `${borderSubtle} opacity-80 hover:opacity-100`}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                            ${isChecked ? 'bg-bronze-500 border-bronze-500 text-charcoal-950' : isDark ? 'border-white/20' : 'border-charcoal-300'}`}>""",
        """                      <div key={opt.id} onClick={() => toggleOption(opt.id)}
                        className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-300 flex items-center justify-between
                          bg-[var(--bg-card)]
                          ${isChecked ? 'border-bronze-500/50' : `${borderSubtle} opacity-80 hover:opacity-100`}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                            ${isChecked ? 'bg-bronze-500 border-bronze-500 text-charcoal-950' : 'border-[var(--border-color)]'}`}>"""
    ),
    # 11. Sticky total receipt container background
    (
        """            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className={`border border-bronze-500/30 rounded-2xl p-6 ${isDark ? 'bg-charcoal-950/90' : 'bg-white'} shadow-2xl relative overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-5">{t.servicesTotal}</h4>

                {/* Receipt */}
                <div className={`${isDark ? 'bg-white/3' : 'bg-charcoal-50'} rounded-xl p-4 mb-5 space-y-1.5`}>""",
        """            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className={`border border-bronze-500/30 rounded-2xl p-6 ${bgDeep} shadow-2xl relative overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-bronze-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h4 className="font-display font-black text-[10px] uppercase tracking-wider text-bronze-400 mb-5">{t.servicesTotal}</h4>

                {/* Receipt */}
                <div className={`${bgSubtle} rounded-xl p-4 mb-5 space-y-1.5`}>"""
    ),
    # 12. Works comparative tabs
    (
        """                  <button
                    key={w.id}
                    onClick={() => setActiveWork(index)}
                    className={`flex-shrink-0 snap-start px-5 py-2.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider border transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 border-bronze-500 shadow-lg shadow-bronze-500/10' 
                        : `${border} ${isDark ? 'bg-charcoal-900/50 hover:bg-charcoal-900 text-neutral-400 hover:text-white' : 'bg-white hover:bg-charcoal-50 text-charcoal-600 hover:text-charcoal-900'}`
                      }`}
                  >""",
        """                  <button
                    key={w.id}
                    onClick={() => setActiveWork(index)}
                    className={`flex-shrink-0 snap-start px-5 py-2.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider border transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 border-bronze-500 shadow-lg shadow-bronze-500/10' 
                        : `${border} bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]`
                      }`}
                  >"""
    ),
    # 13. Slider drag handle backdrop blur
    (
        """                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full ${isDark ? 'bg-charcoal-950/40' : 'bg-white/40'} backdrop-blur-md border border-bronze-500/60 shadow-xl flex items-center justify-center cursor-ew-resize transition-transform duration-150 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
                >""",
        """                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-deep)]/40 backdrop-blur-md border border-bronze-500/60 shadow-xl flex items-center justify-center cursor-ew-resize transition-transform duration-150 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
                >"""
    ),
    # 14. Work details separator line
    (
        """                <div className={`h-8 w-px ${isDark ? 'bg-white/10' : 'bg-charcoal-200'} hidden md:block`}></div>""",
        """                <div className={`h-8 w-px bg-[var(--border-color)] hidden md:block`} />"""
    ),
    # 15. Care after visit guide tabs
    (
        """                <button
                  key={tab}
                  onClick={() => setActiveCareTab(tab)}
                  className={`flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider border rounded-xl transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 border-bronze-500 shadow-lg shadow-bronze-500/10' 
                      : `${border} ${isDark ? 'bg-charcoal-900/50 hover:bg-charcoal-900 text-neutral-400 hover:text-white' : 'bg-white hover:bg-charcoal-50 text-charcoal-600 hover:text-charcoal-900'}`
                    }`}
                >""",
        """                <button
                  key={tab}
                  onClick={() => setActiveCareTab(tab)}
                  className={`flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider border rounded-xl transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 border-bronze-500 shadow-lg shadow-bronze-500/10' 
                      : `${border} bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]`
                    }`}
                >"""
    ),
    # 16. FAQ accordion item
    (
        """                <div key={i} className={`${isDark ? 'bg-charcoal-900' : 'bg-white'} border ${borderSubtle} rounded-2xl overflow-hidden transition-all duration-300`}>
                  <button onClick={() => setActiveFaq(isOpen ? null : i)}
                    className={`w-full flex justify-between items-center p-5 text-left ${isDark ? 'hover:text-bronze-500' : 'hover:text-bronze-600'} transition-colors`}>
                    <span className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>{item.q}</span>
                    <ChevronDownIcon className={`flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-bronze-500' : textMuted}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? `max-h-40 border-t ${borderSubtle}` : 'max-h-0'}`} style={{ overflow: 'hidden' }}>
                    <div className={`p-5 ${textSecondary} text-sm leading-relaxed ${isDark ? 'bg-charcoal-900/50' : 'bg-charcoal-50/50'}`}>{item.a}</div>
                  </div>""",
        """                <div key={i} className={`${bgCard} border ${borderSubtle} rounded-2xl overflow-hidden transition-all duration-300`}>
                  <button onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full flex justify-between items-center p-5 text-left hover:text-bronze-500 transition-colors">
                    <span className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>{item.q}</span>
                    <ChevronDownIcon className={`flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-bronze-500' : textMuted}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? `max-h-40 border-t ${borderSubtle}` : 'max-h-0'}`} style={{ overflow: 'hidden' }}>
                    <div className={`p-5 ${textSecondary} text-sm leading-relaxed ${bgSubtle}`}>{item.a}</div>
                  </div>"""
    ),
    # 17. Booking form card
    (
        """            {/* Right: form card */}
            <div className={`border border-bronze-500/20 rounded-2xl p-6 lg:p-8 ${isDark ? 'bg-charcoal-950/80' : 'bg-white'} shadow-2xl`}>
              <div className="flex justify-center mb-4">
                <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">BOOK APPOINTMENT</span>
              </div>

              {/* Receipt */}
              <div className={`${isDark ? 'bg-bronze-500/5' : 'bg-bronze-50'} border border-bronze-500/20 rounded-xl p-4 mb-5 text-sm`}>""",
        """            {/* Right: form card */}
            <div className={`border border-bronze-500/20 rounded-2xl p-6 lg:p-8 ${bgCard} shadow-2xl`}>
              <div className="flex justify-center mb-4">
                <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">BOOK APPOINTMENT</span>
              </div>

              {/* Receipt */}
              <div className="bg-bronze-500/5 border border-bronze-500/20 rounded-xl p-4 mb-5 text-sm">"""
    ),
    # 18. Booking inputs, text fields, visit mode buttons
    (
        """              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} required
                  className={`${isDark ? 'bg-charcoal-900 border-white/10 text-white placeholder-neutral-500' : 'bg-charcoal-50 border-charcoal-200 text-charcoal-800 placeholder-charcoal-400'} border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full`} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} required
                  className={`${isDark ? 'bg-charcoal-900 border-white/10 text-white placeholder-neutral-500' : 'bg-charcoal-50 border-charcoal-200 text-charcoal-800 placeholder-charcoal-400'} border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full`} />
                
                {/* Visit Mode Segmented Control */}
                <div className="space-y-2 py-1">
                  <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted} mb-1.5`}>
                    {lang === 'en' ? 'Visit mode:' : lang === 'ru' ? 'Режим визита:' : 'Визит форматы:'}
                  </span>
                  <div className={`grid grid-cols-2 p-1 gap-1 rounded-xl ${isDark ? 'bg-charcoal-900/50 border border-white/5' : 'bg-charcoal-50 border border-charcoal-150'}`}>
                    <button
                      type="button"
                      onClick={() => setVisitMode('relax')}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer
                        ${visitMode === 'relax'
                          ? `${isDark ? 'bg-white text-charcoal-950 shadow-md' : 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 shadow-md'}`
                          : `${isDark ? 'text-neutral-400 hover:text-white' : 'text-charcoal-900 hover:text-charcoal-950'} bg-transparent opacity-70 hover:opacity-100`
                        }`}
                    >
                      {/* Moon Icon */}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>{lang === 'en' ? 'Relax in silence' : lang === 'ru' ? 'Relax в тишине' : 'Тыныштықтағы Relax'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitMode('talk')}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer
                        ${visitMode === 'talk'
                          ? `${isDark ? 'bg-white text-charcoal-950 shadow-md' : 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 shadow-md'}`
                          : `${isDark ? 'text-neutral-400 hover:text-white' : 'text-charcoal-900 hover:text-charcoal-950'} bg-transparent opacity-70 hover:opacity-100`
                        }`}
                    >""",
        """              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} required
                  className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} required
                  className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
                
                {/* Visit Mode Segmented Control */}
                <div className="space-y-2 py-1">
                  <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted} mb-1.5`}>
                    {lang === 'en' ? 'Visit mode:' : lang === 'ru' ? 'Режим визита:' : 'Визит форматы:'}
                  </span>
                  <div className={`grid grid-cols-2 p-1 gap-1 rounded-xl bg-[var(--bg-subtle)] border ${borderSubtle}`}>
                    <button
                      type="button"
                      onClick={() => setVisitMode('relax')}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer
                        ${visitMode === 'relax'
                          ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 shadow-md'
                          : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                        }`}
                    >
                      {/* Moon Icon */}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>{lang === 'en' ? 'Relax in silence' : lang === 'ru' ? 'Relax в тишине' : 'Тыныштықтағы Relax'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitMode('talk')}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer
                        ${visitMode === 'talk'
                          ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-charcoal-950 shadow-md'
                          : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                        }`}
                    >"""
    ),
    # 19. Footer social links
    (
        """            <div className="flex gap-5 items-center">
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
            </div>""",
        """            <div className="flex gap-5 items-center">
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
            </div>"""
    ),
    # 20. Success modal card background
    (
        """      {/* ═══════════ SUCCESS MODAL ═══════════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm popup-backdrop">
          <div className={`${isDark ? 'bg-charcoal-800' : 'bg-white'} border border-bronze-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl`}>""",
        """      {/* ═══════════ SUCCESS MODAL ═══════════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm popup-backdrop">
          <div className={`bg-[var(--bg-card)] border border-bronze-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl`}>"""
    ),
    # 21. Mobile drawer menu container
    (
        """          <div className={`absolute top-0 right-0 h-full w-4/5 max-w-[320px] ${isDark ? 'bg-charcoal-900/95 border-l border-white/10' : 'bg-[#fcfbf9]/95 border-l border-charcoal-200'} shadow-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 transform`}>
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
                  className={`p-1.5 rounded-full ${bgSubtle} ${isDark ? 'text-neutral-400 hover:text-white' : 'text-charcoal-500 hover:text-charcoal-900'} transition-colors`}""",
        """          <div className={`absolute top-0 right-0 h-full w-4/5 max-w-[320px] bg-[var(--bg-header)] border-l ${border} shadow-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 transform`}>
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
                  className={`p-1.5 rounded-full ${bgSubtle} text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors`}"""
    ),
    # 22. Mobile drawer footer & language/theme selection
    (
        """            <div className="flex flex-col gap-5 border-t border-white/5 pt-6">
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
                <span className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>Language / Язык / Тіл:</span>
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
                  <button 
                    onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'en' ? 'bg-bronze-500/20 text-bronze-500' : `${textMuted} ${bgSubtle}`}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>""",
        """            <div className="flex flex-col gap-5 border-t border-white/5 pt-6">
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
                  <button 
                    onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'en' ? 'bg-bronze-500/20 text-bronze-500' : `${textMuted} ${bgSubtle}`}`}
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
                <div className="flex bg-charcoal-900/60 p-1 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isDayTheme && theme === 'light' ? 'bg-amber-500 text-charcoal-950 glow-sun scale-[1.02]' : isDayTheme ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                  >
                    <SunIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'День' : lang === 'kk' ? 'Күн' : 'Day'}</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isNightTheme && theme === 'dark' ? 'bg-orange-600 text-white glow-moon scale-[1.02]' : isNightTheme ? 'bg-orange-600/20 text-orange-300 border border-orange-600/30' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                  >
                    <MoonIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'Ночь' : lang === 'kk' ? 'Түн' : 'Night'}</span>
                  </button>
                </div>

                {/* 4 Premium Presets */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button 
                    onClick={() => setTheme('emerald')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'emerald' ? 'bg-white/10 text-white border-white/20' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#061F17' }}></span>
                    <span>Emerald</span>
                  </button>
                  <button 
                    onClick={() => setTheme('nudefashion')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'nudefashion' ? 'bg-white/10 text-white border-white/20' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#F4EFEA' }}></span>
                    <span>Nude</span>
                  </button>
                  <button 
                    onClick={() => setTheme('sage')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'sage' ? 'bg-white/10 text-white border-white/20' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#F0F2EE' }}></span>
                    <span>Sage</span>
                  </button>
                  <button 
                    onClick={() => setTheme('cyber')}
                    className={`flex items-center gap-1.5 justify-center py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${theme === 'cyber' ? 'bg-white/10 text-white border-white/20' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}
                  >
                    <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: '#0D0B14' }}></span>
                    <span>Cyber</span>
                  </button>
                </div>
              </div>
            </div>"""
    ),
    # 23. Back to top button styling
    (
        """      {/* ═══════════ ELEGANT BACK TO TOP BUTTON ═══════════ */}
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
      >""",
        """      {/* ═══════════ ELEGANT BACK TO TOP BUTTON ═══════════ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border shadow-xl transition-all duration-500 flex items-center justify-center
          ${showBackToTop 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
          }
          bg-[var(--bg-card)] border-[var(--border-color)] text-bronze-500 hover:text-bronze-400 hover:border-bronze-500/50 hover:shadow-bronze-500/10
          backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95`}
        aria-label="Scroll to top"
      >"""
    )
]

for idx, (target, replacement) in enumerate(replacements):
    if target not in content:
        print(f"ERROR: Replacement {idx+1} target NOT found in file!")
        # Let's show a snippet to help debug
        print("Target snippet requested was:\n", target[:150], "...")
        exit(1)
    
    count = content.count(target)
    if count > 1:
        print(f"ERROR: Replacement {idx+1} target is NOT unique! Found {count} times.")
        exit(1)
        
    content = content.replace(target, replacement)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: All replacements applied successfully!")
