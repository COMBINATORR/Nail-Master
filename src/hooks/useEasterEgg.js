import { useState, useRef } from 'react';

export function useEasterEgg() {
  const [showGravityRestore, setShowGravityRestore] = useState(false);

  const clickTracker = useRef({ count: 0, lastClickTime: 0 });
  const affectedElements = useRef([]);

  const playPowerDown = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.4);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    } catch (err) {
      console.warn('Audio playback failed:', err);
    }
  };

  const playPowerUp = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(30, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.9);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch (err) {
      console.warn('Audio playback failed:', err);
    }
  };

  const triggerGravityExplosion = () => {
    playPowerDown();
    setShowGravityRestore(true);

    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'button', 'input', 'textarea', 'select',
      '.trust-card', '.service-category-card', '.portfolio-card', '.faq-item', '.contact-form',
      'footer p', 'footer .static-logo', 'header nav a', 'header .logo-container', 'header button'
    ];

    const els = document.querySelectorAll(selectors.join(', '));
    const list = [];

    const elementsToUpdate = [];

    els.forEach((el) => {
      if (el.closest('.fixed') || el.classList.contains('fixed') || el.id === 'gravity-restore-btn') return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const deltaY = window.innerHeight - rect.bottom - (Math.random() * 30);
      const deltaX = (Math.random() - 0.5) * 50;
      const rotation = (Math.random() - 0.5) * 16;

      const origStyle = {
        transition: el.style.transition,
        transform: el.style.transform,
        pointerEvents: el.style.pointerEvents
      };

      elementsToUpdate.push({ el, deltaX, deltaY, rotation });
      list.push({ el, origStyle });
    });

    requestAnimationFrame(() => {
      elementsToUpdate.forEach(({ el, deltaX, deltaY, rotation }) => {
        el.style.transition = 'transform 1100ms cubic-bezier(0.5, 0.05, 0.9, 0.45)';
        el.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
        el.style.pointerEvents = 'none';
      });
    });

    affectedElements.current = list;
  };

  const handleRestoreGravity = () => {
    playPowerUp();
    clickTracker.current.count = 0;

    affectedElements.current.forEach(({ el }) => {
      el.style.transition = 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.transform = 'translate(0, 0) rotate(0deg)';
      el.style.pointerEvents = 'auto';
    });

    setTimeout(() => {
      affectedElements.current.forEach(({ el, origStyle }) => {
        el.style.transition = origStyle.transition;
        el.style.transform = origStyle.transform;
        el.style.pointerEvents = origStyle.pointerEvents;
      });
      affectedElements.current = [];
      setShowGravityRestore(false);
    }, 600);
  };

  const handleLogoClick = () => {
    const now = Date.now();
    const tracker = clickTracker.current;
    if (now - tracker.lastClickTime < 500) {
      tracker.count += 1;
    } else {
      tracker.count = 1;
    }
    tracker.lastClickTime = now;

    if (tracker.count === 5) {
      triggerGravityExplosion();
      tracker.count = 0;
    }
  };

  return { showGravityRestore, handleRestoreGravity, handleLogoClick };
}
