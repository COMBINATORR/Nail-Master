import { describe, it, expect } from 'vitest';
import { categories } from './categories';

describe('categories data', () => {
  it('should be an object', () => {
    expect(typeof categories).toBe('object');
    expect(categories).not.toBeNull();
  });

  it('should have valid category entries', () => {
    Object.values(categories).forEach(category => {
      expect(category).toHaveProperty('id');
      expect(typeof category.id).toBe('string');
      expect(category).toHaveProperty('nameKey');
      expect(typeof category.nameKey).toBe('string');

      expect(category).toHaveProperty('services');
      expect(Array.isArray(category.services)).toBe(true);

      // Verify each service
      category.services.forEach(service => {
        expect(service).toHaveProperty('id');
        expect(typeof service.id).toBe('string');

        expect(service).toHaveProperty('nameKey');
        expect(typeof service.nameKey).toBe('string');

        expect(service).toHaveProperty('descKey');
        expect(typeof service.descKey).toBe('string');

        expect(service).toHaveProperty('price');
        expect(typeof service.price).toBe('number');

        expect(service).toHaveProperty('time');
        expect(typeof service.time).toBe('number');
      });

      if (category.options) {
        expect(Array.isArray(category.options)).toBe(true);
        // Verify each option
        category.options.forEach(option => {
          expect(option).toHaveProperty('id');
          expect(typeof option.id).toBe('string');

          expect(option).toHaveProperty('nameKey');
          expect(typeof option.nameKey).toBe('string');

          expect(option).toHaveProperty('price');
          expect(typeof option.price).toBe('number');

          expect(option).toHaveProperty('time');
          expect(typeof option.time).toBe('number');
        });
      }
    });
  });
});
