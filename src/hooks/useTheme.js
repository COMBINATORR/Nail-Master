import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('svtl-theme') || 'dark');

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

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') setTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return { theme, setTheme, isDayTheme, isNightTheme, isDark };
}
