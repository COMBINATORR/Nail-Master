import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { prefersReducedMotion, isMobileLike, canUseSmoothScroll, canUseHeavyFx } from './perf';

describe('perf utilities', () => {
  let originalWindow;
  let originalNavigator;

  beforeEach(() => {
    originalWindow = global.window;
    originalNavigator = global.navigator;
  });

  afterEach(() => {
    global.window = originalWindow;
    global.navigator = originalNavigator;
    vi.restoreAllMocks();
  });

  // Helper to quickly setup matchMedia responses based on query
  const mockMatchMedia = (queryResults) => {
    window.matchMedia = vi.fn().mockImplementation(query => {
      return {
        matches: queryResults[query] || false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });
  };

  describe('prefersReducedMotion', () => {
    it('returns false when window is undefined', () => {
      delete global.window;
      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns false when window.matchMedia is missing', () => {
      delete window.matchMedia;
      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns true when (prefers-reduced-motion: reduce) matches', () => {
      mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
      expect(prefersReducedMotion()).toBe(true);
    });

    it('returns false when (prefers-reduced-motion: reduce) does not match', () => {
      mockMatchMedia({ '(prefers-reduced-motion: reduce)': false });
      expect(prefersReducedMotion()).toBe(false);
    });
  });

  describe('isMobileLike', () => {
    it('returns false when window is undefined', () => {
      delete global.window;
      expect(isMobileLike()).toBe(false);
    });

    it('returns true when pointer is coarse', () => {
      mockMatchMedia({ '(pointer: coarse)': true });
      expect(isMobileLike()).toBe(true);
    });

    it('returns true when width is narrow (max-width: 768px)', () => {
      mockMatchMedia({ '(max-width: 768px)': true });
      expect(isMobileLike()).toBe(true);
    });

    it('returns true when hover is none', () => {
      mockMatchMedia({ '(hover: none)': true });
      expect(isMobileLike()).toBe(true);
    });

    it('returns false when none of the conditions match', () => {
      mockMatchMedia({});
      expect(isMobileLike()).toBe(false);
    });
  });

  describe('canUseSmoothScroll', () => {
    it('returns false when window is undefined', () => {
      delete global.window;
      expect(canUseSmoothScroll()).toBe(false);
    });

    it('returns false when prefers reduced motion is true', () => {
      mockMatchMedia({
        '(prefers-reduced-motion: reduce)': true,
        '(pointer: fine)': true
      });
      expect(canUseSmoothScroll()).toBe(false);
    });

    it('returns false when device is mobile-like', () => {
      mockMatchMedia({
        '(pointer: coarse)': true,
        '(pointer: fine)': true // fine pointer, but coarse also matches (e.g., stylus)
      });
      expect(canUseSmoothScroll()).toBe(false);
    });

    it('returns true when motion is allowed, device is not mobile-like, and pointer is fine', () => {
      mockMatchMedia({
        '(pointer: fine)': true
      });
      expect(canUseSmoothScroll()).toBe(true);
    });

    it('returns false when pointer is not fine', () => {
      mockMatchMedia({});
      expect(canUseSmoothScroll()).toBe(false);
    });
  });

  describe('canUseHeavyFx', () => {
    it('returns false when window is undefined', () => {
      delete global.window;
      expect(canUseHeavyFx()).toBe(false);
    });

    it('returns false when prefers reduced motion is true', () => {
      mockMatchMedia({
        '(prefers-reduced-motion: reduce)': true
      });
      expect(canUseHeavyFx()).toBe(false);
    });

    it('returns false when device is mobile-like', () => {
      mockMatchMedia({
        '(max-width: 768px)': true
      });
      expect(canUseHeavyFx()).toBe(false);
    });

    it('returns false when saveData is enabled', () => {
      mockMatchMedia({});
      global.navigator = { connection: { saveData: true } };
      expect(canUseHeavyFx()).toBe(false);
    });

    it('returns false when effective connection type is 2g', () => {
      mockMatchMedia({});
      global.navigator = { connection: { effectiveType: '2g' } };
      expect(canUseHeavyFx()).toBe(false);
    });

    it('returns false when effective connection type is slow-2g', () => {
      mockMatchMedia({});
      global.navigator = { connection: { effectiveType: 'slow-2g' } };
      expect(canUseHeavyFx()).toBe(false);
    });

    it('returns true on standard desktop connection', () => {
      mockMatchMedia({});
      global.navigator = { connection: { effectiveType: '4g', saveData: false } };
      expect(canUseHeavyFx()).toBe(true);
    });

    it('returns true when navigator.connection is undefined', () => {
      mockMatchMedia({});
      global.navigator = { }; // no connection object
      expect(canUseHeavyFx()).toBe(true);
    });
  });
});
