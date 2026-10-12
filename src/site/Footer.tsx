import React from 'react';
import { Github, ArrowUpRight, BookOpen, CircleAlert } from 'lucide-react';
import { Plate, RouteMark, Wordmark } from './ui';
import { REPO_URL } from './Nav';
import { goSection, openConsole } from '../hooks/useHashRoute';

const PAGE_LINKS = [
  { id: 'problem', label: 'The desk' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'demo', label: 'Live triage demo' },
  { id: 'offline', label: 'Offline-first' },
  { id: 'languages', label: 'Languages' },
  { id: 'prioritization', label: 'Prioritisation' },
  { id: 'architecture', label: 'Architecture' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1520px] px-6 pb-12 pt-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <RouteMark size={28} />
              <Wordmark />
            </div>
            <p className="mt-4 max-w-xs text-[0.88rem] leading-relaxed text-muted">
              Offline-first complaint triage for metro station teams —
              classify, explain the score, draft the reply, save it locally.
            </p>
            <p
              lang="gu"
              className="mt-3 text-[0.86rem] leading-relaxed text-faint"
            >
              દરેક ફરિયાદને એક સ્પષ્ટ આગળનું પગલું.
            </p>
          </div>

          {/* Page */}
          <nav aria-label="Page sections">
            <Plate className="text-faint">On this page</Plate>
            <ul className="mt-4 space-y-2.5">
              {PAGE_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => goSection(l.id)}
                    className="text-[0.88rem] font-medium text-muted transition-colors hover:text-signal"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Project */}
          <nav aria-label="Project links">
            <Plate className="text-faint">Project</Plate>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  onClick={openConsole}
                  className="text-[0.88rem] font-medium text-muted transition-colors hover:text-signal"
                >
                  Open the console
                </button>
              </li>
              <li>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-muted transition-colors hover:text-signal"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  Source repository
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}#readme`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-muted transition-colors hover:text-signal"
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  README
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/issues`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-muted transition-colors hover:text-signal"
                >
                  <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  Issues & contributions
                </a>
              </li>
            </ul>
          </nav>

          {/* Context */}
          <div>
            <Plate className="text-faint">Context</Plate>
            <p className="mt-4 text-[0.86rem] leading-relaxed text-muted">
              An independent prototype built for problem statement{' '}
              <span className="font-semibold text-ink">PS-07 — “Every
              Complaint Heard”</span> at Metro Hacks, DevFest Gandhinagar ’26.
            </p>
            <p className="mt-3 flex gap-2 text-[0.82rem] leading-relaxed text-faint">
              <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                Not affiliated with, endorsed by, or connected to the Gujarat
                Metro Rail Corporation or any transit operator. All messages
                shown are synthetic demonstration data.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Plate className="text-faint">
            MetroResolve, open source, runs in your browser
          </Plate>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[0.76rem] text-muted transition-colors hover:text-signal"
          >
            github.com/RavaniRoshan/mitrometro
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
