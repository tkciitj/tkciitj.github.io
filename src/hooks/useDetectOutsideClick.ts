import {RefObject, useEffect} from 'react';

/**
 * Custom hook that triggers a callback when a click or touch occurs outside the referenced element.
 *
 * Useful for closing dropdowns, modals, popovers, etc.
 *
 * @param ref - The React ref pointing to a DOM element
 * @param handler - The function to execute when clicking outside
 */
const useDetectOutsideClick = <T extends HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as Node | null;

      // Skip if ref is not defined or click is inside the element
      if (!ref.current || (target && ref.current.contains(target))) return;

      handler(event);
    };

    // Register listeners for mouse and touch
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useDetectOutsideClick;
