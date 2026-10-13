import React, { useMemo, useState } from 'react';
import { Sparkles, ArrowUpRight, Languages, Gauge, PenLine } from 'lucide-react';
import {
  SYNTHETIC_COMPLAINTS,
  processComplaint,
  type ComplaintRecord,
} from '../lib/metroNlp';
import { Chip, Plate, SectionHead, cx } from './ui';
import { openConsole } from '../hooks/useHashRoute';

const SAMPLE_IDS = ['SAMPLE-01', 'SAMPLE-02', 'SAMPLE-07', 'SAMPLE-10', 'SAMPLE-04'];

const LANG_TAG: Record<string, { label: string; lang: string }> = {
  'SAMPLE-01': { label: 'English', lang: 'en' },
  'SAMPLE-02': { label: 'ગુજરાતી · Gujarati script', lang: 'gu' },
  'SAMPLE-07': { label: 'Hinglish · mixed script', lang: 'hi' },
  'SAMPLE-10': { label: 'हिन्दी · Hindi script', lang: 'hi' },
  'SAMPLE-04': { label: 'Gujlish · Latin + Gujarati', lang: 'gu' },
};

function bandTone(band: string): 'signal' | 'neutral' {
  return band === 'urgent' ? 'signal' : 'neutral';
}

export function Demo() {
  const [sampleId, setSampleId] = useState('SAMPLE-07');
  const [customText, setCustomText] = useState('');

  const record = useMemo<ComplaintRecord>(() => {
    if (customText.trim()) {
      return processComplaint('TRY-01', customText.trim(), 'app', 'Your station', 'Just now');
    }
    const seed = SYNTHETIC_COMPLAINTS.find((c) => c.id === sampleId)!;
    return processComplaint(seed.id, seed.sourceText, seed.channel, seed.station, seed.timestamp);
  }, [sampleId, customText]);

  const score = record.urgency?.score ?? 0;
  const isUrgent = record.urgency?.band === 'urgent';

  return (
    <section id="demo" className="border-t border-line">
      <div className="mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          index="03"
          kicker="Product"
          title="Pick a message. Watch it become a case."
          lede="This is the real triage engine from src/lib/metroNlp.ts running in your page: language detection, department routing, the urgency ledger and a draft reply — with nothing sent over the network."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          {/* Inputs */}
          <div>
            <div className="rounded-xl border border-line bg-card p-5">
              <Plate className="text-faint">Demonstration messages</Plate>

              <div className="mt-4 flex flex-col gap-2">
                {SAMPLE_IDS.map((id) => {
                  const seed = SYNTHETIC_COMPLAINTS.find((c) => c.id === id)!;
                  const active = !customText.trim() && sampleId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setCustomText('');
                        setSampleId(id);
                      }}
                      aria-pressed={active}
                      className={cx(
                        'rounded-lg border p-3 text-left transition-colors',
                        active
                          ? 'border-ink bg-white shadow-[0_10px_26px_-20px_rgba(21,18,58,0.8)]'
                          : 'border-line bg-paper hover:border-ink/40'
                      )}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <Chip tone={active ? 'ink' : 'neutral'}>
                          {LANG_TAG[id].label}
                        </Chip>
                        <span className="font-mono text-[0.78rem] text-faint">
                          {id}
                        </span>
                      </span>
                      <span
                        lang={LANG_TAG[id].lang}
                        className="mt-2 block line-clamp-2 text-[0.88rem] leading-snug text-ink"
                      >
                        {seed.sourceText}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <p className="mb-3 text-[0.78rem] leading-relaxed text-faint">
                  Labels describe how the message was written. The panel shows
                  what the engine actually detected — misses included.
                </p>
                <label htmlFor="own-text" className="flex items-center gap-1.5">
                  <PenLine className="h-3.5 w-3.5 text-signal-deep" aria-hidden="true" />
                  <Plate className="text-faint">Or type your own</Plate>
                </label>
                <textarea
                  id="own-text"
                  rows={3}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Lift at platform 1 is stuck with someone inside — જલ્દી મદદ કરો!"
                  className="mt-2 w-full resize-y rounded-lg border border-line-2 bg-white px-3 py-2.5 text-[0.9rem] leading-relaxed text-ink placeholder:text-faint focus:border-ink focus:outline-none"
                />
                <p className="mt-2 text-[0.78rem] text-faint">
                  Your text stays in this tab. No API key, no request.
                </p>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="overflow-hidden rounded-xl border border-line-2 bg-card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white/70 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.8rem] font-bold text-ink">
                  {record.id}
                </span>
                <span className="text-[0.76rem] text-muted">
                  {record.station} · {record.channel}
                </span>
              </div>
              <Chip tone="ink">{record.classification?.department}</Chip>
            </div>

            <div className="space-y-4 px-5 py-5">
              {/* Language */}
              <div className="rounded-lg border border-line bg-white/60 p-4">
                <div className="flex items-center gap-1.5">
                  <Languages className="h-3.5 w-3.5 text-signal-deep" aria-hidden="true" />
                  <Plate className="text-faint">Language</Plate>
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-[1rem] font-bold text-ink">
                    {record.detectedLanguage?.label}
                  </span>
                  <span className="font-mono text-[0.78rem] text-muted">
                    {record.detectedLanguage?.confidence}% heuristic confidence
                  </span>
                </div>
                <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
                  {record.detectedLanguage?.note}
                </p>
              </div>

              {/* Routing signals */}
              <div className="rounded-lg border border-line bg-white/60 p-4">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-signal-deep" aria-hidden="true" />
                  <Plate className="text-faint">Routing signals</Plate>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {record.classification?.matchedSignals.slice(0, 6).map((s, i) => (
                    <span
                      key={`${s.term}-${i}`}
                      className="rounded border border-line-2 bg-paper px-2 py-1 font-mono text-[0.75rem] text-muted"
                    >
                      “{s.term}”{' '}
                      <span className="font-bold text-signal-deep">+{s.weight}</span>{' '}
                      → {s.department}
                    </span>
                  ))}
                  {record.classification?.matchedSignals.length === 0 && (
                    <span className="text-[0.8rem] text-faint">
                      No keyword matched — routed to Safety as the conservative default.
                    </span>
                  )}
                </div>
              </div>

              {/* Urgency ledger */}
              <div className="rounded-lg border border-line bg-white/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-signal-deep" aria-hidden="true" />
                    <Plate className="text-faint">Urgency ledger</Plate>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cx(
                        'font-mono text-[1.6rem] font-extrabold leading-none tabular-nums',
                        isUrgent ? 'text-signal-deep' : 'text-ink'
                      )}
                    >
                      {score}
                    </span>
                    <span className="font-mono text-[0.76rem] text-faint">/100</span>
                    <Chip tone={bandTone(record.urgency?.band ?? 'low')}>
                      {record.urgency?.band}
                    </Chip>
                  </div>
                </div>

                <ul className="mt-3 space-y-1.5">
                  {record.urgency?.reasons.map((r) => (
                    <li
                      key={r.ruleId}
                      className="flex items-center justify-between gap-3 rounded border border-line/80 bg-paper px-2.5 py-1.5"
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

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className={cx('h-full rounded-full', isUrgent ? 'bg-signal' : 'bg-ink/60')}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              {/* Draft */}
              <div className="rounded-lg border border-ink/15 bg-ink p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Plate className="text-on-ink-muted">Draft reply</Plate>
                  <span className="rounded border border-signal-lit/50 px-1.5 py-[2px] font-mono text-[0.75rem] font-bold tracking-[0.1em] text-signal-lit">
                    Draft, not sent
                  </span>
                </div>
                <p
                  lang={record.draft?.languageUsed === 'gu' ? 'gu' : record.draft?.languageUsed === 'hi' ? 'hi' : 'en'}
                  className="text-[0.88rem] leading-relaxed text-on-ink"
                >
                  {record.draft?.text}
                </p>
                <p className="mt-2 font-mono text-[0.75rem] text-on-ink-muted">
                  {record.draft?.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.9rem] leading-relaxed text-muted">
            The full console adds queue filters, saved drafts, offline status and
            JSON export on top of this engine.
          </p>
          <button
            type="button"
            onClick={openConsole}
            className="inline-flex items-center gap-2 rounded-lg border border-ink bg-ink px-5 py-3 text-[0.82rem] font-bold tracking-[0.08em] text-on-ink transition-colors hover:bg-ink-2"
          >
            Open the console
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
