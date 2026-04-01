import {useEffect} from 'react';

import {headerID} from '../components/Sections/Header';
import {SectionId} from '../data/data';

/**
 * Custom hook to observe visible section in viewport and trigger a handler when active.
 *
 * @param selectors - CSS selector string to target all sections (e.g., '[data-section]')
 * @param handler - Function to receive current visible section ID
 */
export const useNavObserver = (selectors: string, handler: (section: SectionId | null) => void): void => {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(selectors);
    const headerWrapper = document.getElementById(headerID);
    const sectionArray = Array.from(sections);

    if (!sections.length || !headerWrapper) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const sectionId = entry.target.getAttribute('id');
          const currentY = entry.boundingClientRect.y;

          if (!sectionId) return;

          const isAboveHeader = currentY < headerWrapper.getBoundingClientRect().y;
          const currentIndex = sectionArray.findIndex(sec => sec.getAttribute('id') === sectionId);

          const decision = {
            sectionId,
            currentIndex,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            aboveHeader: isAboveHeader,
          };

          if (decision.isIntersecting) {
            handler(sectionId as SectionId);
          } else if (
            !decision.isIntersecting &&
            decision.intersectionRatio > 0 &&
            decision.intersectionRatio < 1 &&
            !decision.aboveHeader
          ) {
            const fallbackId = sectionArray[decision.currentIndex - 1]?.getAttribute('id');
            handler(fallbackId as SectionId);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -70% 0px', // Adjust to accommodate fixed header height
      },
    );

    // Observe all matching sections
    sections.forEach(section => observer.observe(section));

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, [selectors, handler]);
};
