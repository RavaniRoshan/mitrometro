import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { Action, Plate, SectionHead } from './ui';
import { openConsole } from '../hooks/useHashRoute';

const BLOB = 'https://github.com/RavaniRoshan/mitrometro/blob/main/';

interface Step {
  n: string;
  title: string;
  desc: string;
  file: string;
}

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Capture',
    desc:
      'Type or paste the message, pick the channel and station. No connection required — the intake form is local.',
    file: 'src/console/TriageConsole.tsx',
  },
  {
    n: '02',
    title: 'Detect & route',
    desc:
      'Script and lexicon heuristics identify Gujarati, Hindi, English, Gujlish or Hinglish, then keyword weights place the case in Safety, Cleanliness, Fare, Lifts or Staff Behaviour.',
    file: 'src/lib/metroNlp.ts',
  },
  {
    n: '03',
    title: 'Score with reasons',
    desc:
      'Nine transparent rules add points — fire, trapped, accessibility, explicit urgency and more. Every fired rule is listed with its weight.',
    file: 'URGENCY_RULES',
  },
  {
    n: '04',
    title: 'Draft the reply',
    desc:
      'An acknowledgement template in the complainant’s language, marked DRAFT, editable before anything is sent.',
    file: 'generateReplyDraft()',
  },
  {
    n: '05',
    title: 'Save on-device',
    desc:
      'Cases and edited drafts are written to this browser and can be exported as JSON. Nothing syncs anywhere — no backend exists yet.',
    file: 'src/lib/store.ts',
  },
];

function Station({ step, index, total }: { step: Step; index: number; total: number }) {
  const reduce = useReducedMotion();
  const fileHref = step.file.startsWith('src/')
    ? `${BLOB}${step.file}`
    : `${BLOB}src/lib/metroNlp.ts`;

  return (
    <motion.li
      className="relative"
      /* Explicit resting state: reduced-motion users always see content,
         never a hidden element waiting on an intersection callback. */
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.5,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* vertical connector (mobile only) */}
      {index < total - 1 && (
        <span
          className="absolute left-[6px] top-4 -bottom-8 w-px bg-line-ink md:hidden"
          aria-hidden="true"
        />
      )}

      <div className="flex gap-4 md:block md:h-full">
        {/* dot */}
        <span
          className="relative z-10 mt-1 block h-3.5 w-3.5 shrink-0 rounded-full bg-signal md:mx-auto md:mt-0"
          style={{ boxShadow: '0 0 0 4px #542f9c' }}
          aria-hidden="true"
        />

        <div className="md:mt-4 md:flex md:h-full md:flex-col md:text-center">
          <Plate className="text-on-ink/70 md:block">{step.n}</Plate>
          <h3 className="mt-1 text-[1.05rem] font-bold text-on-ink md:mt-2">
            {step.title}
          </h3>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-on-ink/85 md:mx-auto md:max-w-[240px]">
            {step.desc}
          </p>
          <a
            href={fileHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-teal-lit underline-offset-2 hover:underline md:mt-auto md:pt-4"
          >
            {step.file}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.li>
  );
}

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-brand-card">
      <div className="jali-ink pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1520px] px-6 py-16 sm:py-24 lg:px-10">
        <SectionHead
          invert
          index="02"
          kicker="Workflow"
          title="Five stations from message to next step."
          lede="Every stage runs in the browser as deterministic code. Read the source beside each step — nothing here is hidden behind a model call."
        />

        {/* Mobile: vertical line */}
        <ol className="mt-12 flex flex-col gap-8 md:hidden">
          {STEPS.map((s, i) => (
            <Station key={s.n} step={s} index={i} total={STEPS.length} />
          ))}
        </ol>

        {/* Desktop: horizontal line */}
        <div className="relative mt-14 hidden md:block">
          <svg
            className="pointer-events-none absolute left-[9.1%] top-[5px] h-1 w-[81.8%]"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="2" x2="1000" y2="2" stroke="#3b3473" strokeWidth="2" />
            <line
              className="anim-route"
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="#a382ea"
              strokeWidth="2"
            />
          </svg>

          <ol className="grid grid-cols-5 gap-6">
            {STEPS.map((s, i) => (
              <Station key={s.n} step={s} index={i} total={STEPS.length} />
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col items-start gap-5 border-t border-line-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[0.88rem] text-on-ink/85">
            <Terminal className="h-4 w-4 shrink-0 text-teal-lit" aria-hidden="true" />
            Steps 1–4 are pure functions; step 5 is a localStorage write. Verify
            them yourself in DevTools.
          </p>
          <Action variant="signal" onClick={openConsole} className="shrink-0">
            Run the pipeline
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Action>
        </div>
      </div>
    </section>
  );
}
