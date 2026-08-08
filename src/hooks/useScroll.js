import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { canUseSmoothScroll } from '../lib/perf';

export function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledCapsule, setIsScrolledCapsule] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const backToTop = y > 300;
        setShowBackToTop((prev) => (prev !== backToTop ? backToTop : prev));

        const scrolled = y > 10;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

        const scrolledCapsule = y > 50;
        setIsScrolledCapsule((prev) => (prev !== scrolledCapsule ? scrolledCapsule : prev));

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lenis only on desktop — perpetual rAF heats phones hard
  useEffect(() => {
    if (!canUseSmoothScroll()) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    let alive = true;

    function raf(time) {
      if (!alive) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.05,
      },
    );

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return { isScrolled, isScrolledCapsule, showBackToTop };
}
