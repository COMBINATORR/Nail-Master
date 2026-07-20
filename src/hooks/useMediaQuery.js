import { useState, useEffect } from 'react';

/**
 * Subscribe to a CSS media query. SSR-safe: starts false, then hydrates.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Tailwind `md` breakpoint and below (stack UX) */
export function useIsMobileStack() {
  return useMediaQuery('(max-width: 767px)');
}
