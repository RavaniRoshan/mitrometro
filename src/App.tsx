import { useEffect } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import { Landing } from './site/Landing';
import { TriageConsole } from './console/TriageConsole';

const LANDING_TITLE = 'MetroResolve — every complaint deserves a clear next step';
const CONSOLE_TITLE = 'Triage console — MetroResolve';

export default function App() {
  const route = useHashRoute();

  /* Route-level scroll + title handling. */
  useEffect(() => {
    if (route === 'console') {
      document.title = CONSOLE_TITLE;
      window.scrollTo(0, 0);
      return;
    }

    document.title = LANDING_TITLE;

    const hash = window.location.hash;
    if (hash && !hash.startsWith('#/')) {
      // Deep link such as #workflow — wait a frame for the section to exist.
      const id = hash.slice(1);
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [route]);

  return route === 'console' ? <TriageConsole /> : <Landing />;
}
