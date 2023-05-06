import { useLayoutEffect, useState } from 'react';

/**
 * Get sizes
 */
const get = () =>
  typeof window === 'undefined'
    ? {
        width: null,
        height: null
      }
    : {
        width: window?.innerWidth,
        height: window?.innerHeight
      };

/**
 * Use window sizes
 */
const useWindowSize = (period = 1000, deps: any[] = []) => {
  const [{ width, height }, set] = useState(get());
  const listener = () => {
    set(get());
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    window?.addEventListener('resize', listener);

    return () => {
      window?.removeEventListener('resize', listener);
    };
  }, []);

  return {
    width,
    height,
    refresh: listener
  };
};

export { useWindowSize };
