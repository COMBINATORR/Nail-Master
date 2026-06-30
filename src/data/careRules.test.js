import { describe, it, expect } from 'vitest';
import { careTipsData } from './careRules.js';

describe('careTipsData schema validation', () => {
  it('should be an object', () => {
    expect(typeof careTipsData).toBe('object');
    expect(careTipsData).not.toBeNull();
    expect(Array.isArray(careTipsData)).toBe(false);
  });

  it('should have language objects', () => {
    const languages = Object.keys(careTipsData);
    expect(languages.length).toBeGreaterThan(0);
    languages.forEach((langKey) => {
      const langObj = careTipsData[langKey];
      expect(typeof langObj).toBe('object');
      expect(langObj).not.toBeNull();
    });
  });

  it('should have categories as arrays of tip objects in each language', () => {
    Object.values(careTipsData).forEach((langObj) => {
      const categories = Object.keys(langObj);
      expect(categories.length).toBeGreaterThan(0);
      categories.forEach((categoryKey) => {
        const categoryArray = langObj[categoryKey];
        expect(Array.isArray(categoryArray)).toBe(true);
        expect(categoryArray.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have valid tip objects in each category array', () => {
    Object.values(careTipsData).forEach((langObj) => {
      Object.values(langObj).forEach((categoryArray) => {
        categoryArray.forEach((tip) => {
          expect(typeof tip).toBe('object');
          expect(tip).not.toBeNull();

          expect(tip).toHaveProperty('title');
          expect(typeof tip.title).toBe('string');

          expect(tip).toHaveProperty('desc');
          expect(typeof tip.desc).toBe('string');

          expect(tip).toHaveProperty('badge');
          expect(typeof tip.badge).toBe('string');

          expect(tip).toHaveProperty('icon');
          expect(typeof tip.icon).toBe('string');
        });
      });
    });
  });
});
