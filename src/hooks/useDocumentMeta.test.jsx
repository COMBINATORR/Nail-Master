import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useDocumentMeta } from './useDocumentMeta';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => ({
      metaTitle: 'Test Title SEO',
      metaDescription: 'Test description for SEO sharing.',
      metaOgTitle: 'Test OG Title',
      metaImageAlt: 'Test image alt',
      brand: 'SVTL Nails & Aesthetic',
    }[key] || key),
    i18n: { language: 'en' },
  }),
}));

function Probe() {
  useDocumentMeta();
  return null;
}

describe('useDocumentMeta', () => {
  beforeEach(() => {
    document.title = '';
    document.documentElement.lang = 'ru';
    document.head
      .querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]')
      .forEach((el) => el.remove());
  });

  afterEach(() => {
    document.title = '';
  });

  it('sets document title, html lang and primary meta tags', () => {
    render(<Probe />);
    expect(document.title).toBe('Test Title SEO');
    expect(document.documentElement.lang).toBe('en');
    expect(document.head.querySelector('meta[name="description"]')?.content).toBe('Test description for SEO sharing.');
    expect(document.head.querySelector('meta[property="og:title"]')?.content).toBe('Test OG Title');
    expect(document.head.querySelector('meta[property="og:image"]')?.content).toContain('/og-image.jpg');
    expect(document.head.querySelector('meta[name="twitter:title"]')?.content).toBe('Test OG Title');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain('svtl.vercel.app');
  });
});
