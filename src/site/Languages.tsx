import React, { useMemo } from 'react';
import { Languages as LanguagesIcon, ArrowUpRight } from 'lucide-react';
import { SYNTHETIC_COMPLAINTS, processComplaint } from '../lib/metroNlp';
import { Chip, Plate, SectionHead } from './ui';
import { REPO_URL } from './Nav';

const SHOWCASE = ['SAMPLE-02', 'SAMPLE-10', 'SAMPLE-01', 'SAMPLE-07', 'SAMPLE-04'];

function scriptLang(text: string): string {
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return 'en';
}

export function Languages() {
  const rows = useMemo(
    () =>
      SHOWCASE.map((id) => {
        const seed = SYNTHETIC_COMPLAINTS.find((c) => c.id === id)!;
        return { seed, record: processComplaint(seed.id, seed.sourceText, seed.channel, seed.station, seed.timestamp) };
      }),
    []
  );

  return (
    <section id="languages" className="border-t border-line">
      <div className="mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          index="05"
          kicker="Languages"
          title="Gujarati, Hindi, English — and the Gujlish in between."
          lede="Passengers do not switch language for the convenience of a classifier. The console labels what it detected, routes the case anyway, and prepares the reply in the language it can write."
        />

        {/* Departure-board style rows */}
        <div className="mt-12 overflow-hidden rounded-xl border border-ink/20 bg-ink">
          <div className="hidden grid-cols-[1fr_180px_140px_120px] gap-4 border-b border-line-ink px-5 py-3 md:grid">
            <Plate className="text-on-ink-muted">Message as received</Plate>
            <Plate className="text-on-ink-muted">Detected</Plate>
            <Plate className="text-on-ink-muted">Queue</Plate>
            <Plate className="text-on-ink-muted">Reply in</Plate>
          </div>

          <ul className="divide-y divide-line-ink">
            {rows.map(({ seed, record }) => (
              <li
                key={seed.id}
                className="grid gap-3 px-5 py-4 transition-colors hover:bg-ink-2 md:grid-cols-[1fr_180px_140px_120px] md:items-center md:gap-4"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[0.75rem] font-bold text-signal-lit">
                      {seed.id}
                    </span>
                    <span className="font-mono text-[0.75rem] text-on-ink-muted">
                      {seed.station}
                    </span>
                  </div>
                  <p
                    lang={scriptLang(seed.sourceText)}
                    className="text-[0.92rem] leading-snug text-on-ink"
                  >
                    {seed.sourceText}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 md:block">
                  <span className="block text-[0.8rem] font-semibold text-on-ink">
                    {record.detectedLanguage?.label}
                  </span>
                  <span className="block font-mono text-[0.78rem] text-on-ink-muted">
                    {record.detectedLanguage?.confidence}% heuristic
                  </span>
                </div>

                <div>
                  <Chip tone="queue">{record.classification?.department}</Chip>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Chip tone="tealLit">{record.draft?.languageUsed}</Chip>
                  <span className="font-mono text-[0.75rem] text-on-ink-muted">
                    {record.draft?.languageUsed === 'gu'
                      ? 'ગુજરાતી'
                      : record.draft?.languageUsed === 'hi'
                      ? 'हिन्दी'
                      : 'English'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-line bg-card p-5">
            <Plate className="text-faint">How detection works</Plate>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              Unicode ranges identify Gujarati and Devanagari script first. When
              a message stays in Latin script, small local lexicons for
              Romanized Gujarati and Hinglish break the tie — all
              deterministic, all in one file you can read.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-5">
            <Plate className="text-faint">What the reply does</Plate>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              Gujarati and Hindi complaints get an acknowledgement template in
              that script. Romanized input falls back to English. Every draft is
              editable and stamped “DRAFT — not sent”.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-line-2 bg-paper p-5">
            <Plate className="text-signal-deep">Limits, plainly</Plate>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              This is script and lexicon heuristics, not a translation model.
              Confidence values are ratios, not accuracy guarantees, and
              misclassification is possible. The prototype assists review — it
              does not replace it.
            </p>
            <a
              href={`${REPO_URL}/blob/main/src/lib/metroNlp.ts`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-[0.75rem] text-signal-deep underline-offset-2 hover:underline"
            >
              src/lib/metroNlp.ts
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-6 flex items-center gap-2 text-[0.82rem] text-faint">
          <LanguagesIcon className="h-4 w-4" aria-hidden="true" />
          All five messages are synthetic demonstration data bundled with the
          repository — no real passenger records are used anywhere on this site.
        </p>
      </div>
    </section>
  );
}
