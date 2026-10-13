import React from 'react';
import {
  HardDriveDownload,
  ListChecks,
  CloudOff,
  Check,
  X,
  Terminal,
} from 'lucide-react';
import { Plate, SectionHead, cx } from './ui';

const STATES = [
  {
    key: 'local',
    icon: HardDriveDownload,
    title: 'Saved on this device',
    status: 'Implemented',
    tone: 'teal' as const,
    body: 'Every case and edited draft is written to localStorage the moment you save it. Refresh the page, close the tab, come back later — the queue is still there.',
    impl: true,
  },
  {
    key: 'outbox',
    icon: ListChecks,
    title: 'Held in the outbox',
    status: 'Implemented as state',
    tone: 'ochre' as const,
    body: 'Each record carries a sync state, and the console counts what is still unsynced. Nothing is discarded while it waits.',
    impl: true,
  },
  {
    key: 'server',
    icon: CloudOff,
    title: 'Confirmed by a server',
    status: 'Not implemented',
    tone: 'neutral' as const,
    body: 'There is no API, no authentication and no conflict handling in this repository. Records stay in the browser until an operator exports them as JSON.',
    impl: false,
  },
];

const VERIFY = [
  'Open the console and triage a complaint — it shows “Saved on this device”.',
  'DevTools → Application → Local Storage → metroresolve.cases.v1',
  'Reload the page: the case and its draft are still in the queue.',
  'DevTools → Network → Offline: triage keeps working, nothing calls out.',
  'Export JSON to carry the queue off the machine.',
];

export function Offline() {
  return (
    <section id="offline" className="border-t border-line">
      <div className="mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          index="04"
          kicker="Offline-first"
          title="Built for the parts of the line with no signal."
          lede="Underground sections, crowded concourses and peak-hour networks are exactly where connectivity is least reliable — and where complaints keep arriving. The prototype assumes the network may not come back during the shift."
        />

        {/* Three states of a record */}
        <div className="relative mt-12">
          <div
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-line-2 md:block"
            aria-hidden="true"
          />
          <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
            {STATES.map(({ icon: Icon, title, status, tone, body, impl }, i) => (
              <li
                key={title}
                className={cx(
                  'relative rounded-xl border p-5',
                  impl ? 'border-line bg-card' : 'border-dashed border-line-2 bg-paper'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cx(
                      'flex h-11 w-11 items-center justify-center rounded-lg border',
                      tone === 'teal'
                        ? 'border-teal/30 bg-teal-soft text-teal'
                        : tone === 'ochre'
                        ? 'border-ochre/30 bg-ochre-soft text-ochre'
                        : 'border-line-2 bg-paper text-faint'
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <Plate
                      className={cx(
                        tone === 'teal'
                          ? 'text-teal'
                          : tone === 'ochre'
                          ? 'text-ochre'
                          : 'text-faint'
                      )}
                    >
                      Step {i + 1}
                    </Plate>
                    <h3 className="text-[1.02rem] font-bold leading-tight text-ink">
                      {title}
                    </h3>
                  </div>
                  <span className="ml-auto">
                    {impl ? (
                      <span className="flex items-center gap-1 rounded-md border border-teal/30 bg-teal-soft px-2 py-1 font-mono text-[0.75rem] font-bold tracking-[0.08em] text-teal">
                        <Check className="h-3 w-3" aria-hidden="true" />
                        {status}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-md border border-line-2 bg-paper px-2 py-1 font-mono text-[0.75rem] font-bold tracking-[0.08em] text-faint">
                        <X className="h-3 w-3" aria-hidden="true" />
                        {status}
                      </span>
                    )}
                  </span>
                </div>
                <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Verification terminal */}
          <div className="overflow-hidden rounded-xl border border-ink/20 bg-ink">
            <div className="flex items-center gap-2 border-b border-line-ink px-4 py-2.5">
              <Terminal className="h-3.5 w-3.5 text-teal-lit" aria-hidden="true" />
              <Plate className="text-on-ink-muted">Verify it yourself</Plate>
            </div>
            <ol className="space-y-2.5 px-5 py-5">
              {VERIFY.map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span className="font-mono text-[0.75rem] font-bold text-signal-lit">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[0.78rem] leading-relaxed text-on-ink">
                    {line}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Honesty note */}
          <div className="rounded-xl border border-line bg-card p-5">
            <Plate className="text-signal-deep">What offline means here</Plate>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
              All processing and storage are local, so triage continues with no
              network. But this repository ships{' '}
              <span className="font-semibold text-ink">no service worker</span>,
              so the app itself needs one connection to load in the first place.
            </p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
              Caching the shell with a service worker, then syncing the outbox
              to a real endpoint, are the documented next steps — not features
              this prototype claims today.
            </p>
            <p className="mt-4 border-t border-line pt-3 font-mono text-[0.75rem] leading-relaxed text-faint">
              localStorage · key: metroresolve.cases.v1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
