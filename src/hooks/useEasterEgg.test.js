import { renderHook, act } from '@testing-library/react';
import { useEasterEgg } from './useEasterEgg';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useEasterEgg Audio Error Paths', () => {
  let originalAudioContext;
  let originalWebkitAudioContext;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 0));

    originalAudioContext = window.AudioContext;
    originalWebkitAudioContext = window.webkitAudioContext;
  });

  afterEach(() => {
    window.AudioContext = originalAudioContext;
    window.webkitAudioContext = originalWebkitAudioContext;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('catches and logs error when playPowerDown fails', () => {
    window.AudioContext = vi.fn().mockImplementation(function() {
      throw new Error('AudioContext mock error');
    });
    window.webkitAudioContext = undefined;

    const { result } = renderHook(() => useEasterEgg());

    act(() => {
      // 5 clicks within 500ms
      for (let i = 0; i < 5; i++) {
        result.current.handleLogoClick();
        vi.advanceTimersByTime(50);
      }
    });

    expect(console.warn).toHaveBeenCalledWith(
      'Audio playback failed:',
      expect.any(Error)
    );
    expect(console.warn.mock.calls[0][1].message).toBe('AudioContext mock error');
  });

  it('catches and logs error when playPowerUp fails', () => {
    window.AudioContext = vi.fn().mockImplementation(function() {
      throw new Error('AudioContext mock error');
    });
    window.webkitAudioContext = undefined;

    const { result } = renderHook(() => useEasterEgg());

    // Trigger gravity explosion first
    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.handleLogoClick();
        vi.advanceTimersByTime(50);
      }
    });

    console.warn.mockClear();

    act(() => {
      result.current.handleRestoreGravity();
    });

    expect(console.warn).toHaveBeenCalledWith(
      'Audio playback failed:',
      expect.any(Error)
    );
    expect(console.warn.mock.calls[0][1].message).toBe('AudioContext mock error');
  });
});
