import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationRU from './locales/ru.json';
import translationKK from './locales/kk.json';
import translationEN from './locales/en.json';
import translationZH from './locales/zh.json';
import translationKO from './locales/ko.json';

const resources = {
  ru: { translation: translationRU },
  kk: { translation: translationKK },
  en: { translation: translationEN },
  zh: { translation: translationZH },
  ko: { translation: translationKO }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('svtl-lang') || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
