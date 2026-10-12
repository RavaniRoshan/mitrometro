import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HardDriveDownload, CloudUpload, FileText } from 'lucide-react';
import { SYNTHETIC_COMPLAINTS, processComplaint } from '../lib/metroNlp';
import { Chip, Plate, cx } from './ui';

/**
 * The hero visual is not a screenshot: it runs the real triage engine
 * (src/lib/metroNlp.ts) over a bundled demonstration complaint and renders
 * exactly what the console shows an operator.
 */

const PIPELINE = [
  { n: '01', label: 'Received' },
  { n: '02', label: 'Routed' },
  { n: '03', label: 'Scored' },
  { n: '04', label: 'Drafted' },
  { n: '05', label: 'Saved' },
];

function Pipeline() {
  return (
    <div className="relative px-5 pb-5 pt-4 sm:px-6">
      {/* route line */}
      <svg
        className="pointer-events-none absolute inset-x-6 top-[27px] hidden h-2 w-[calc(100%-3rem)] sm:block"
        viewBox="0 0 600 4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="2"
          x2="600"
          y2="2"
          stroke="#d2c6ae"
          strokeWidth="2"
        />
        <line
          className="anim-route"
          x1="0"
          y1="2"
          x2="600"
          y2="2"
          stroke="#714bd0"
          strokeWidth="2"
        />
      </svg>

      <ol className="relative grid grid-cols-5 gap-1">
        {PIPELINE.map((step, i) => (
          <li key={step.n} className="flex flex-col items-center gap-2 text-center">
            <span
              className="h-3.5 w-3.5 rounded-full border-[3px] border-signal bg-card"
              style={{ animationDelay: `${i * 140}ms` }}
              aria-hidden="true"
            />
            <span className="plate text-[0.75rem] text-faint">{step.n}</span>
            <span className="text-[0.75rem] font-semibold text-muted">
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const seed = SYNTHETIC_COMPLAINTS.find((c) => c.id === 'SAMPLE-03')!;
  const record = React.useMemo(
    () => processComplaint(seed.id, seed.sourceText, seed.channel, seed.station, seed.timestamp),
    [seed]
  );

  const score = record.urgency?.score ?? 0;
  const isUrgent = (record.urgency?.band ?? 'low') === 'urgent';

  return (
    <figure
      className="relative w-full"
      aria-label="Example triage result for demonstration complaint SAMPLE-03"
    >
      {/* Wayfinding tabs above the card, like platform markers */}
      <div className="flex items-end gap-2 pl-1">
        <span className="rounded-t-md bg-ink px-3 py-1.5">
          <Plate className="text-[0.75rem] text-on-ink">Incoming queue</Plate>
        </span>
        <span className="rounded-t-md border border-b-0 border-line-2 bg-card px-3 py-1.5">
          <Plate className="text-[0.75rem] text-muted">Urgency ledger</Plate>
        </span>
        <span className="hidden rounded-t-md border border-b-0 border-line-2 bg-card px-3 py-1.5 sm:block">
          <Plate className="text-[0.75rem] text-muted">Draft reply</Plate>
        </span>
      </div>

      <div className="overflow-hidden rounded-t-lg rounded-b-xl border border-line-2 bg-card shadow-[0_24px_60px_-32px_rgba(21,18,58,0.5)]">
        {/* Case header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white/70 px-5 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-mono text-[0.8rem] font-bold tracking-tight text-ink">
              {record.id}
            </span>
            <span className="text-[0.76rem] text-muted">
              {record.station} · {record.channel} · {record.timestamp}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip tone="teal" title="Written to this browser's localStorage">
              <HardDriveDownload className="h-3 w-3" aria-hidden="true" />
              Saved on this device
            </Chip>
            <Chip tone="ochre" title="No sync backend is configured in this repository">
              <CloudUpload className="h-3 w-3" aria-hidden="true" />
              Pending sync
            </Chip>
          </div>
        </div>

        {/* Complaint + routing */}
        <div className="space-y-4 px-5 py-5 sm:px-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Plate className="text-faint">Passenger message</Plate>
              <Chip tone="neutral" title="Detected on-device by script and lexicon heuristics">
                {record.detectedLanguage?.label}
              </Chip>
            </div>
            <p
              lang="gu"
              className="text-[1.06rem] font-medium leading-relaxed text-ink"
            >
              {record.sourceText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="ink">{record.classification?.department} queue</Chip>
            <span className="text-[0.78rem] text-muted">
              matched{' '}
              <span className="font-semibold text-ink">
                {record.classification?.matchedSignals[0]?.term}
              </span>{' '}
              → routed without a human reading the whole message first
            </span>
          </div>

          {/* Urgency ledger */}
          <div className="rounded-lg border border-line bg-white/70 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <Plate className="text-faint">Why this score</Plate>
              <div className="flex items-baseline gap-2">
                <span
                  className={cx(
                    'font-mono text-[1.7rem] font-extrabold leading-none tabular-nums',
                    isUrgent ? 'text-signal-deep' : 'text-ink'
                  )}
                >
                  {score}
                </span>
                <span className="font-mono text-[0.8rem] font-semibold text-faint">
                  /100
                </span>
                <Chip tone={isUrgent ? 'signal' : 'neutral'}>
                  {record.urgency?.band}
                </Chip>
              </div>
            </div>

            <ul className="mt-3 space-y-1.5">
              {record.urgency?.reasons.map((r) => (
                <li
                  key={r.ruleId}
                  className="flex items-center justify-between gap-3 rounded border border-line/70 bg-paper px-2.5 py-1.5"
                >
                  <span className="text-[0.78rem] leading-snug text-muted">
                    {r.description}
                  </span>
                  <span className="font-mono text-[0.78rem] font-bold text-signal-deep">
                    +{r.points}
                  </span>
                </li>
              ))}
            </ul>

            {/* score bar — fills on mount, so the score reads as measured */}
            <div
              className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line"
              role="img"
              aria-label={`Urgency ${score} out of 100`}
            >
              <motion.div
                className={cx(
                  'h-full rounded-full',
                  isUrgent ? 'bg-signal' : 'bg-ink/60'
                )}
                initial={reduce ? { width: `${score}%` } : { width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Draft */}
          <div className="rounded-lg border border-ink/15 bg-ink p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <Plate className="text-on-ink-muted flex items-center gap-1.5">
                <FileText className="h-3 w-3" aria-hidden="true" />
                Draft reply · editable
              </Plate>
              <span className="rounded border border-signal-lit/50 px-1.5 py-[2px] font-mono text-[0.75rem] font-bold uppercase tracking-[0.1em] text-signal-lit">
                Draft, not sent
              </span>
            </div>
            <p
              lang="gu"
              className="text-[0.86rem] leading-relaxed text-on-ink"
            >
              {record.draft?.text}
            </p>
            <p className="mt-2 font-mono text-[0.75rem] text-on-ink-muted">
              {record.draft?.note}
            </p>
          </div>
        </div>

        <div className="border-t border-line bg-white/60">
          <Pipeline />
        </div>
      </div>

      <figcaption className="mt-3 px-1 text-[0.75rem] leading-relaxed text-faint">
        Demonstration data — synthetic complaint SAMPLE-03 from{' '}
        <span className="font-mono">src/lib/metroNlp.ts</span>, processed live in
        your browser. No network request is made.
      </figcaption>
    </figure>
  );
}
