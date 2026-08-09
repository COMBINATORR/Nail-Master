import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TactileContext = createContext({
  soundEnabled: true,
  toggleSound: () => {},
  triggerClick: () => {},
  triggerSuccess: () => {},
});

const STORAGE_KEY = 'svtl_sound_enabled';

export const TactileProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(soundEnabled));
    } catch {
      // Ignore quota/private storage issues
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const triggerClick = useCallback(() => {
    // Mobile haptic vibration
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch {
        // Ignore haptic errors
      }
    }

    if (!soundEnabled) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (err) {
      console.warn('Tactile sound playback warning:', err);
    }
  }, [soundEnabled]);

  const triggerSuccess = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([15, 30, 15]);
      } catch {
        // Ignore haptic errors
      }
    }

    if (!soundEnabled) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playNote = (freq, delay, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      };

      playNote(659.25, 0, 0.2); // E5
      playNote(987.77, 0.08, 0.25); // B5
    } catch (err) {
      console.warn('Tactile sound playback warning:', err);
    }
  }, [soundEnabled]);

  return (
    <TactileContext.Provider value={{ soundEnabled, toggleSound, triggerClick, triggerSuccess }}>
      {children}
    </TactileContext.Provider>
  );
};

export const useTactileFeedback = () => useContext(TactileContext);
