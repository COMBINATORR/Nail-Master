import { useState, useEffect } from 'react';
import Lenis from 'lenis';

export function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledCapsule, setIsScrolledCapsule] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const backToTop = window.scrollY > 300;
          setShowBackToTop((prev) => (prev !== backToTop ? backToTop : prev));

          const scrolled = window.scrollY > 10;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          const scrolledCapsule = window.scrollY > 50;
          setIsScrolledCapsule((prev) => (prev !== scrolledCapsule ? scrolledCapsule : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.05
    });

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return { isScrolled, isScrolledCapsule, showBackToTop };
}
