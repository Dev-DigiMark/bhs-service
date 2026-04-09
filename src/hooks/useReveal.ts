import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to every `.reveal` element on the page.
 * When an element enters the viewport it receives the `.visible` class,
 * triggering the CSS fade-up transition defined in index.css.
 */
export function useReveal(): void {
  useEffect(() => {
    const elements = document.querySelectorAll<Element>('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after revealing so it doesn't toggle back
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
