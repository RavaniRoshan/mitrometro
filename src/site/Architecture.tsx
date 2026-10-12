import React from 'react';
import { ArrowRight, Github, ArrowUpRight, CloudOff, Boxes } from 'lucide-react';
import { Chip, Plate, SectionHead } from './ui';
import { REPO_URL } from './Nav';

const BLOB = `${REPO_URL}/blob/main/`;

const FLOW = [
  {
    title: 'This page + console',
    sub: 'React UI — no analytics, no remote fonts, no API calls',
    file: 'src/App.tsx',
  },
  {
    title: 'Triage engine',
    sub: 'detect → classify → score → draft. Pure functions.',
    file: 'src/lib/metroNlp.ts',
  },
  {
    title: 'Local store',
    sub: 'cases and drafts written to localStorage',
    file: 'src/lib/store.ts',
  },
  {
    title: 'JSON export',
    sub: 'operator-initiated, opens a download',
    file: 'exportCases()',
  },
];

const STACK = [
  { name: 'React 19', role: 'UI' },
  { name: 'Vite 8', role: 'dev server + build' },
  { name: 'TypeScript', role: 'types' },
  { name: 'Tailwind CSS 4', role: 'styling' },
  { name: 'lucide-react', role: 'icons' },
  { name: 'localStorage', role: 'persistence' },
];

const LIMITS = [
  'Classification is keyword- and lexicon-weighted — no trained model.',
  'Replies are templates, not machine translation.',
  'The outbox never becomes “synced”: there is no endpoint to confirm it.',
  'No service worker yet — the first load needs a connection.',
  'Bundled messages are synthetic demonstration data.',
];

export function Architecture() {
  return (
    <section id="architecture" className="border-t border-line">
      <div className="mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          index="07"
          kicker="Architecture"
          title="Small, local, inspectable."
          lede="One static bundle, one engine file, one storage key. The whole system fits in your head — which is the point of an operations tool you may have to trust on a bad network day."
        />

        {/* Flow */}
        <div className="mt-12">
          <div className="hidden items-stretch gap-3 md:flex">
            {FLOW.map((node, i) => (
              <React.Fragment key={node.title}>
                <div className="flex-1 rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
                    <Plate className="text-faint">{`0${i + 1}`}</Plate>
                  </div>
                  <h3 className="mt-2 text-[0.98rem] font-bold text-ink">
                    {node.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">
                    {node.sub}
                  </p>
                  <a
                    href={`${BLOB}${node.file.includes('/') ? node.file : 'src/lib/store.ts'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[0.75rem] text-signal-deep underline-offset-2 hover:underline"
                  >
                    {node.file}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="flex items-center" aria-hidden="true">
                    <ArrowRight className="h-4 w-4 text-line-2" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="flex flex-col gap-3 md:hidden">
            {FLOW.map((node, i) => (
              <React.Fragment key={node.title}>
                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
                    <Plate className="text-faint">{`0${i + 1}`}</Plate>
                  </div>
                  <h3 className="mt-2 text-[0.98rem] font-bold text-ink">
                    {node.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">
                    {node.sub}
                  </p>
                  <a
                    href={`${BLOB}${node.file.includes('/') ? node.file : 'src/lib/store.ts'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[0.75rem] text-signal-deep underline-offset-2 hover:underline"
                  >
                    {node.file}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="flex justify-center" aria-hidden="true">
                    <ArrowRight className="h-4 w-4 rotate-90 text-line-2" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* The missing box, stated honestly */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-dashed border-line-2 bg-paper p-4">
            <CloudOff className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
            <div>
              <span className="text-[0.88rem] font-semibold text-muted">
                Sync backend — not implemented
              </span>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-faint">
                No server, no database, no authentication. Future work would add
                an idempotent endpoint behind the outbox state the console
                already tracks.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Stack */}
          <div className="rounded-xl border border-line bg-card p-5">
            <div className="flex items-center gap-2">
              <Boxes className="h-4 w-4 text-signal-deep" aria-hidden="true" />
              <Plate className="text-faint">What it is built with</Plate>
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {STACK.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between gap-2 rounded border border-line bg-paper px-3 py-2"
                >
                  <dt className="text-[0.85rem] font-semibold text-ink">
                    {s.name}
                  </dt>
                  <dd className="font-mono text-[0.78rem] text-faint">{s.role}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-muted">
              Builds to a static bundle with{' '}
              <span className="font-mono text-[0.78rem]">npm run build</span> —
              any static host will serve it. No deployment is configured in this
              repository yet.
            </p>
          </div>

          {/* Limits */}
          <div className="rounded-xl border border-line bg-card p-5">
            <Plate className="text-signal-deep">Current limitations</Plate>
            <ul className="mt-4 space-y-2.5">
              {LIMITS.map((l) => (
                <li key={l} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-muted">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal/70" aria-hidden="true" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            <a
              href={`${REPO_URL}#readme`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.78rem] text-signal-deep underline-offset-2 hover:underline"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              README — install, run, verify
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Origin */}
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-ink/15 bg-ink px-5 py-4">
          <Chip tone="signalLit">PS-07, every complaint heard</Chip>
          <span className="text-[0.86rem] text-on-ink">
            Built for Metro Hacks at DevFest Gandhinagar ’26.
          </span>
          <span className="text-[0.86rem] text-on-ink-muted">
            An independent prototype — no affiliation with, or endorsement by,
            any transit operator.
          </span>
        </div>
      </div>
    </section>
  );
}
