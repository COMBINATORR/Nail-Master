import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://svtl.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const OG_LOCALES = {
  ru: 'ru_RU',
  kk: 'kk_KZ',
  en: 'en_US',
  zh: 'zh_CN',
  ko: 'ko_KR',
};

const HTML_LANGS = {
  ru: 'ru',
  kk: 'kk',
  en: 'en',
  zh: 'zh-CN',
  ko: 'ko',
};

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Sync document title, description, Open Graph and html[lang] with i18n. */
export function useDocumentMeta() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'ru').split('-')[0];

  useEffect(() => {
    const title = t('metaTitle');
    const description = t('metaDescription');
    const ogTitle = t('metaOgTitle');
    const imageAlt = t('metaImageAlt');

    document.title = title;
    document.documentElement.lang = HTML_LANGS[lang] || lang;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', ogTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${SITE_URL}/`);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:locale', OG_LOCALES[lang] || 'ru_RU');
    upsertMeta('property', 'og:site_name', t('brand'));
    upsertMeta('name', 'twitter:title', ogTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertLink('canonical', `${SITE_URL}/`);
  }, [lang, t]);
}
