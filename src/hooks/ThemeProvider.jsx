import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ThemeContext = createContext(null);

const dayThemes = ['light', 'nudefashion', 'sage'];
const nightThemes = ['dark', 'emerald', 'cyber'];

function useThemeState() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('svtl-theme') || 'dark';
  });

  const systemPrefersDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : true;

  const isDark = nightThemes.includes(theme) || (theme === 'system' && systemPrefersDark);
  const isDayTheme = dayThemes.includes(theme) || (theme === 'system' && !systemPrefersDark);
  const isNightTheme = nightThemes.includes(theme) || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    const themeClasses = [
      'theme-dark', 'theme-light', 'theme-emerald',
      'theme-nudefashion', 'theme-sage', 'theme-cyber',
    ];
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
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') setTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return useMemo(
    () => ({ theme, setTheme, isDayTheme, isNightTheme, isDark }),
    [theme, isDayTheme, isNightTheme, isDark]
  );
}

export function ThemeProvider({ children }) {
  const value = useThemeState();
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Shared theme state — must be used under ThemeProvider. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
