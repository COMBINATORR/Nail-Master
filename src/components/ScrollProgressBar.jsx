import { useState, useEffect } from 'react';

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
          setProgress(currentProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Initial setup

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-bronze-700 via-bronze-400 to-bronze-200 z-[100] pointer-events-none"
      style={{ width: `${progress}%` }}
    ></div>
  );
};
