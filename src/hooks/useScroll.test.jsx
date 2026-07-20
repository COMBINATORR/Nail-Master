import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScroll } from './useScroll';
import Lenis from 'lenis';

vi.mock('lenis', () => {
  return {
    default: vi.fn().mockImplementation(function() {
      this.raf = vi.fn();
      this.destroy = vi.fn();
    })
  }
});

describe('useScroll scroll event', () => {
  let rAFCallbacks = [];

  beforeEach(() => {
    rAFCallbacks = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      if (cb.name !== 'raf') {
        rAFCallbacks.push(cb);
      }
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current.isScrolled).toBe(false);
    expect(result.current.isScrolledCapsule).toBe(false);
    expect(result.current.showBackToTop).toBe(false);
  });

  it('updates state based on scroll position', () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current.isScrolled).toBe(false);

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });
    act(() => {
      while(rAFCallbacks.length > 0) {
        const cb = rAFCallbacks.shift();
        cb(performance.now());
      }
    });

    expect(result.current.isScrolled).toBe(true);
    expect(result.current.isScrolledCapsule).toBe(false);
    expect(result.current.showBackToTop).toBe(false);

    act(() => {
      window.scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
    });
    act(() => {
      while(rAFCallbacks.length > 0) {
        const cb = rAFCallbacks.shift();
        cb(performance.now());
      }
    });

    expect(result.current.isScrolled).toBe(true);
    expect(result.current.isScrolledCapsule).toBe(true);
    expect(result.current.showBackToTop).toBe(false);

    act(() => {
      window.scrollY = 350;
      window.dispatchEvent(new Event('scroll'));
    });
    act(() => {
      while(rAFCallbacks.length > 0) {
        const cb = rAFCallbacks.shift();
        cb(performance.now());
      }
    });

    expect(result.current.showBackToTop).toBe(true);
  });

  it('removes scroll event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScroll());

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('useScroll Lenis', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes Lenis and cleans up on unmount', () => {
    const { unmount } = renderHook(() => useScroll());

    expect(Lenis).toHaveBeenCalledTimes(1);

    unmount();

    const lenisInstance = vi.mocked(Lenis).mock.results[0].value;
    expect(lenisInstance.destroy).toHaveBeenCalledTimes(1);
  });
});

describe('useScroll IntersectionObserver', () => {
  let observeSpy;
  let unobserveSpy;
  let mockObserverCallback;

  beforeEach(() => {
    observeSpy = vi.fn();
    unobserveSpy = vi.fn();

    const MockObserver = vi.fn().mockImplementation(function(callback) {
      mockObserverCallback = callback;
      this.observe = observeSpy;
      this.unobserve = unobserveSpy;
      this.disconnect = vi.fn();
    });
    vi.stubGlobal('IntersectionObserver', MockObserver);

    document.body.innerHTML = `
      <div class="reveal-item" id="item1"></div>
      <div class="reveal-item" id="item2"></div>
    `;

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('observes .reveal-item elements and adds revealed class when intersecting', () => {
    const { unmount } = renderHook(() => useScroll());

    const elements = document.querySelectorAll('.reveal-item');
    expect(observeSpy).toHaveBeenCalledTimes(2);
    expect(observeSpy).toHaveBeenCalledWith(elements[0]);
    expect(observeSpy).toHaveBeenCalledWith(elements[1]);

    act(() => {
      mockObserverCallback([{
        target: elements[0],
        isIntersecting: true
      }]);
    });

    expect(elements[0].classList.contains('revealed')).toBe(true);
    expect(unobserveSpy).toHaveBeenCalledWith(elements[0]);

    expect(elements[1].classList.contains('revealed')).toBe(false);

    unmount();
    expect(unobserveSpy).toHaveBeenCalledWith(elements[1]);
  });
});
