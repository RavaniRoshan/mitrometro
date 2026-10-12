import { useEffect, useState } from 'react';

/**
 * Hash-based routing (no router dependency).
 *   #/        → landing page
 *   #/app     → the triage console (the working application)
 *   #section  → landing page, scrolled to a section
 */
export type Route = 'home' | 'console';

export const CONSOLE_HASH = '#/app';

export function routeFromHash(hash: string): Route {
  return hash.startsWith('#/app') ? 'console' : 'home';
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    routeFromHash(window.location.hash)
  );

  useEffect(() => {
    const onChange = () => setRoute(routeFromHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Scroll to a section on the landing page, navigating home first if needed. */
export function goSection(id: string): void {
  const scroll = () => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
  };

  if (routeFromHash(window.location.hash) === 'console') {
    window.location.hash = '#/';
    window.setTimeout(scroll, 90);
  } else {
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`);
    }
    scroll();
  }
}

/** Open the console application route. */
export function openConsole(): void {
  window.location.hash = CONSOLE_HASH;
}
