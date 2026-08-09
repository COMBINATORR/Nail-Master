import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TactileProvider, useTactileFeedback } from './useTactileFeedback';

describe('useTactileFeedback', () => {
  let originalAudioContext;

  beforeEach(() => {
    originalAudioContext = window.AudioContext;
    localStorage.clear();
  });

  afterEach(() => {
    window.AudioContext = originalAudioContext;
    vi.restoreAllMocks();
  });

  it('initializes with soundEnabled true by default', () => {
    const wrapper = ({ children }) => <TactileProvider>{children}</TactileProvider>;
    const { result } = renderHook(() => useTactileFeedback(), { wrapper });

    expect(result.current.soundEnabled).toBe(true);
  });

  it('toggles soundEnabled state and persists in localStorage', () => {
    const wrapper = ({ children }) => <TactileProvider>{children}</TactileProvider>;
    const { result } = renderHook(() => useTactileFeedback(), { wrapper });

    act(() => {
      result.current.toggleSound();
    });

    expect(result.current.soundEnabled).toBe(false);
    expect(localStorage.getItem('svtl_sound_enabled')).toBe('false');
  });

  it('triggers click audio sound gracefully', () => {
    const mockOscillator = {
      type: '',
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };
    const mockGain = {
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
    };
    const mockAudioContext = vi.fn().mockImplementation(function () {
      this.currentTime = 0;
      this.createOscillator = () => mockOscillator;
      this.createGain = () => mockGain;
      this.destination = {};
    });

    window.AudioContext = mockAudioContext;
    window.webkitAudioContext = mockAudioContext;

    const wrapper = ({ children }) => <TactileProvider>{children}</TactileProvider>;
    const { result } = renderHook(() => useTactileFeedback(), { wrapper });

    act(() => {
      result.current.triggerClick();
    });

    expect(mockAudioContext).toHaveBeenCalled();
    expect(mockOscillator.start).toHaveBeenCalled();
  });

  it('handles AudioContext errors gracefully without crashing', () => {
    window.AudioContext = vi.fn().mockImplementation(() => {
      throw new Error('AudioContext blocked');
    });

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = ({ children }) => <TactileProvider>{children}</TactileProvider>;
    const { result } = renderHook(() => useTactileFeedback(), { wrapper });

    act(() => {
      result.current.triggerClick();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Tactile sound playback warning:',
      expect.any(Error)
    );
  });
});
