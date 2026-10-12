import React from 'react';
import { Smartphone, Phone, MessageSquare, Mail, Megaphone, ArrowLeft } from 'lucide-react';
import { Chip, Plate, SectionHead, cx } from './ui';

const CHANNELS = [
  { icon: Smartphone, label: 'App complaint form', lang: 'English / ગુજરાતી' },
  { icon: Phone, label: 'Helpdesk phone log', lang: 'हिन्दी' },
  { icon: MessageSquare, label: 'Counter walk-up note', lang: 'Gujlish' },
  { icon: Mail, label: 'Email inbox', lang: 'English' },
  { icon: Megaphone, label: 'Social mentions', lang: 'Hinglish' },
];

interface Slip {
  id: string;
  text: string;
  meta: string;
  tone: 'routine' | 'watch' | 'urgent';
  rotate: string;
  buried?: boolean;
}

const PILE: Slip[] = [
  {
    id: 'SAMPLE-11',
    text: 'Spilled drink on the stairs, no warning sign placed.',
    meta: '11:05 · Museum',
    tone: 'routine',
    rotate: '-1.4deg',
  },
  {
    id: 'SAMPLE-06',
    text: 'સ્ટેશન પર પાણી ટપકી રહી છે અને ફરશ ગંદી છે, સ્લિપ થઈ શકે છે.',
    meta: '10:50 · Stadium',
    tone: 'watch',
    rotate: '1.1deg',
  },
  {
    id: 'SAMPLE-03',
    text: 'લિફ્ટ માં એક વ્યક્તિ ફંસી ગઈ છે, કૃપા કરીને મદદ કરો!',
    meta: '10:44 · University · urgent, scored 70',
    tone: 'urgent',
    rotate: '-0.6deg',
    buried: true,
  },
];

export function Problem() {
  return (
    <section id="problem" className="border-t border-line">
      <div className="mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          index="01"
          kicker="The desk"
          title="Four languages arrive at once. The urgent one is rarely on top."
          lede="A station controller does not receive complaints in a neat list. They arrive through five channels, in three scripts and one very common code-switched in-between — and someone has to decide what needs attention now."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:gap-10">
          {/* Channels */}
          <div className="rounded-xl border border-line bg-card p-5">
            <Plate className="text-faint">What arrives</Plate>
            <ul className="mt-4 space-y-3">
              {CHANNELS.map(({ icon: Icon, label, lang }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line-2 bg-paper text-ink">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.86rem] font-semibold leading-tight text-ink">
                      {label}
                    </span>
                    <span className="block text-[0.78rem] text-faint">{lang}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-[0.8rem] leading-relaxed text-muted">
              Same day, same hour — all of them.
            </p>
          </div>

          {/* The pile */}
          <div className="relative rounded-xl border border-line bg-paper p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <Plate className="text-faint">Triage queue · demonstration data</Plate>
              <Plate className="text-signal-deep">Arrival order</Plate>
            </div>

            <ul className="mt-5 space-y-3">
              {PILE.map((slip, i) => (
                <li
                  key={slip.id}
                  className={cx(
                    'relative rounded-lg border bg-card p-4 shadow-[0_10px_24px_-18px_rgba(21,18,58,0.6)] transition-transform',
                    slip.tone === 'urgent'
                      ? 'border-signal/50'
                      : 'border-line-2'
                  )}
                  style={{ transform: `rotate(${slip.rotate})` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.75rem] font-bold text-ink">
                      {slip.id}
                    </span>
                    <span className="font-mono text-[0.78rem] text-faint">
                      {slip.meta}
                    </span>
                  </div>
                  <p
                    lang={
                      /[\u0A80-\u0AFF]/.test(slip.text)
                        ? 'gu'
                        : /[\u0900-\u097F]/.test(slip.text)
                        ? 'hi'
                        : 'en'
                    }
                    className="mt-1.5 text-[0.92rem] leading-relaxed text-ink"
                  >
                    {slip.text}
                  </p>

                  {slip.buried && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                      <Chip tone="signal">Urgent · 70/100</Chip>
                      <span className="text-[0.78rem] text-muted">
                        third in the pile — read last
                      </span>
                    </div>
                  )}

                  {/* arrival arrows between slips */}
                  {i < PILE.length - 1 && (
                    <span
                      className="absolute -bottom-[15px] left-6 z-10 flex items-center gap-1 text-faint"
                      aria-hidden="true"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 rotate-90" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-between rounded-xl border border-ink/15 bg-ink p-5 text-on-ink sm:p-6">
            <div>
              <Plate className="text-on-ink-muted">What it costs</Plate>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-on-ink">
                Read top to bottom, the spill notices get handled first and the
                passenger trapped in the lift waits behind them — in a language
                the person on duty may not read comfortably.
              </p>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-on-ink-muted">
                Nothing in the pile is wrong. What is missing is a sorting step
                that understands all four languages, and can show{' '}
                <span className="font-semibold text-on-ink">
                  why
                </span>{' '}
                a case should move to the top.
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-line-ink bg-ink-2 p-4">
              <Plate className="text-signal-lit">The prototype’s answer</Plate>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-on-ink">
                Classify → score with visible reasons → draft a reply → save
                locally. Five steps, explained in full below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
