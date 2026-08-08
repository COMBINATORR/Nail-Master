import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './useTheme.js';

describe('useTheme hook', () => {
  let originalMatchMedia;

  beforeEach(() => {
    // Clear localStorage and body classes
    localStorage.clear();
    document.body.className = '';

    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  const mockMatchMedia = (matches) => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)' ? matches : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  it('throws an error if used outside of ThemeProvider', () => {
    // Suppress console.error for expected React error boundary output
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within ThemeProvider');

    consoleError.mockRestore();
  });

  it('initializes with default dark theme if no localStorage value', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(result.current.isNightTheme).toBe(true);
    expect(result.current.isDayTheme).toBe(false);
    expect(document.body.classList.contains('theme-dark')).toBe(true);
    expect(document.body.classList.contains('light')).toBe(false);
  });

  it('initializes with theme from localStorage', () => {
    mockMatchMedia(true);
    localStorage.setItem('svtl-theme', 'sage');

    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.theme).toBe('sage');
    expect(result.current.isDark).toBe(false);
    expect(result.current.isNightTheme).toBe(false);
    expect(result.current.isDayTheme).toBe(true);
    expect(document.body.classList.contains('theme-sage')).toBe(true);
    expect(document.body.classList.contains('light')).toBe(true);
  });

  it('updates theme correctly when setTheme is called', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.setTheme('nudefashion');
    });

    expect(result.current.theme).toBe('nudefashion');
    expect(document.body.classList.contains('theme-nudefashion')).toBe(true);
    expect(document.body.classList.contains('theme-dark')).toBe(false);
    expect(document.body.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('svtl-theme')).toBe('nudefashion');
  });

  describe('system theme preference', () => {
    it('applies dark theme when system prefers dark', () => {
      mockMatchMedia(true); // prefers dark

      const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

      act(() => {
        result.current.setTheme('system');
      });

      expect(result.current.theme).toBe('system');
      expect(result.current.isDark).toBe(true);
      expect(document.body.classList.contains('theme-dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
    });

    it('applies light theme when system prefers light', () => {
      mockMatchMedia(false); // prefers light

      const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

      act(() => {
        result.current.setTheme('system');
      });

      expect(result.current.theme).toBe('system');
      expect(result.current.isDark).toBe(false);
      expect(document.body.classList.contains('theme-light')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(true);
    });
  });
});
