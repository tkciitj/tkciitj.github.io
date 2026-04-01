import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Custom hook to get real-time window size.
 *
 * Automatically updates on resize and ensures consistent values on mount (CSR).
 */
const useWindow = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Call once on mount to initialize state
    handleResize();

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindow;
