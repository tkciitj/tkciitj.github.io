import {useEffect, useRef} from 'react';

/**
 * Custom hook to run a function at specified intervals.
 *
 * @param callback - The function to execute repeatedly.
 * @param delay - Interval delay in milliseconds. If null, the interval is paused.
 */
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Store the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
