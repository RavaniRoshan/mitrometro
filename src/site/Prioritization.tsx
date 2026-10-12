import React, { useMemo } from 'react';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';
import {
  SYNTHETIC_COMPLAINTS,
  URGENCY_RULES,
  processComplaint,
} from '../lib/metroNlp';
import { Chip, Plate, SectionHead, cx } from './ui';
import { REPO_URL } from './Nav';

const BANDS = [
  { label: 'urgent', min: 65 },
  { label: 'high', min: 40 },
  { label: 'normal', min: 20 },
  { label: 'low', min: 0 },
];

export function Prioritization() {
  const example = useMemo(() => {
    const seed = SYNTHETIC_COMPLAINTS.find((c) => c.id === 'SAMPLE-07')!;
    return processComplaint(seed.id, seed.sourceText, seed.channel, seed.station, seed.timestamp);
  }, []);

  const score = example.urgency?.score ?? 0;

  return (
    <section id="prioritization" className="border-t border-line">
      <div className="mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          index="06"
          kicker="Prioritisation"
          title="An urgency score you can argue with."
          lede="A number with no explanation trains people to ignore it. MetroResolve shows the complete ledger: which rules fired, what each one was worth, and how the total lands in a band."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* The rulebook */}
          <div className="overflow-hidden rounded-xl border border-line bg-card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white/70 px-5 py-3">
              <Plate className="text-faint">The whole rulebook</Plate>
              <span className="font-mono text-[0.75rem] text-muted">
                URGENCY_RULES · {URGENCY_RULES.length} rules · one file
              </span>
            </div>

            <ul className="divide-y divide-line">
              {URGENCY_RULES.map((rule) => (
                <li
                  key={rule.id}
                  className="flex items-start justify-between gap-4 px-5 py-3"
                >
                  <div className="min-w-0">
                    <span className="block text-[0.88rem] font-medium leading-snug text-ink">
                      {rule.description}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.78rem] text-faint">
                      {rule.id}
                    </span>
                  </div>
                  <span
                    className={cx(
                      'shrink-0 rounded border px-2 py-1 font-mono text-[0.76rem] font-bold',
                      rule.points >= 40
                        ? 'border-signal/35 bg-signal-soft text-signal-deep'
                        : 'border-line-2 bg-paper text-muted'
                    )}
                  >
                    +{rule.points}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-5 py-3">
              <p className="text-[0.78rem] leading-relaxed text-faint">
                Scores are capped at 100. Bands:{' '}
                {BANDS.map((b, i) => (
                  <span key={b.label}>
                    {i > 0 && ' · '}
                    <span className="font-semibold text-muted">
                      {b.label} ≥ {b.min}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Worked example */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-ink/20 bg-ink">
              <div className="border-b border-line-ink px-5 py-3">
                <Plate className="text-on-ink-muted">Worked example · SAMPLE-07</Plate>
              </div>

              <div className="px-5 py-5">
                <p
                  lang="hi"
                  className="text-[0.95rem] leading-relaxed text-on-ink"
                >
                  {example.sourceText}
                </p>

                <ul className="mt-4 space-y-2">
                  {example.urgency?.reasons.map((r) => (
                    <li
                      key={r.ruleId}
                      className="flex items-center justify-between gap-3 rounded border border-line-ink bg-ink-2 px-3 py-2"
                    >
                      <span className="text-[0.8rem] leading-snug text-on-ink-muted">
                        {r.description}
                      </span>
                      <span className="font-mono text-[0.8rem] font-bold text-signal-lit">
                        +{r.points}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-line-ink pt-4">
                  <Plate className="text-on-ink-muted">Total</Plate>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[2rem] font-extrabold leading-none tabular-nums text-signal-lit">
                      {score}
                    </span>
                    <span className="font-mono text-[0.8rem] text-on-ink-muted">
                      /100
                    </span>
                    <Chip tone="signalLit">{example.urgency?.band}</Chip>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative h-2.5 w-full rounded-full bg-line-ink">
                    <div
                      className="h-full rounded-full bg-signal"
                      style={{ width: `${score}%` }}
                    />
                    {[20, 40, 65].map((mark) => (
                      <span
                        key={mark}
                        className="absolute -top-1 h-4.5 w-px bg-on-ink-muted/70"
                        style={{ left: `${mark}%` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="relative mt-1.5 h-4 font-mono text-[0.75rem] text-on-ink-muted">
                    <span className="absolute left-0 top-0">0</span>
                    <span className="absolute top-0 -translate-x-1/2" style={{ left: '20%' }}>
                      20 · normal
                    </span>
                    <span className="absolute top-0 -translate-x-1/2" style={{ left: '40%' }}>
                      40 · high
                    </span>
                    <span className="absolute top-0 -translate-x-1/2" style={{ left: '65%' }}>
                      65 · urgent
                    </span>
                    <span className="absolute right-0 top-0">100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-signal/40 bg-signal-soft p-5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-signal-deep" aria-hidden="true" />
                <Plate className="text-signal-deep">Assistive, not authoritative</Plate>
              </div>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-ink/85">
                This prototype assists human review. It does not replace official
                emergency procedures, control-room protocols or operational
                judgement — and no score here should delay an emergency response.
              </p>
              <a
                href={`${REPO_URL}/blob/main/src/lib/metroNlp.ts`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 font-mono text-[0.75rem] text-signal-deep underline-offset-2 hover:underline"
              >
                Read the rules in source
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
