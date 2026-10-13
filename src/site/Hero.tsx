import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, WifiOff, Unplug, Database } from 'lucide-react';
import { Action, Plate } from './ui';
import { HeroVisual } from './HeroVisual';
import { goSection, openConsole } from '../hooks/useHashRoute';

const HONESTY = [
  { icon: WifiOff, text: 'Works without a network' },
  { icon: Unplug, text: 'No account, no API calls' },
  { icon: Database, text: 'Sample data is synthetic' },
];

export function Hero() {
  const reduce = useReducedMotion();

  /* One orchestrated load sequence rather than per-section fade-ups. */
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden">
      {/* Quiet purple lattice in the corner, like Tines' decorative field */}
      <div
        className="jali pointer-events-none absolute -right-20 -top-24 hidden h-[540px] w-[540px] opacity-60 lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-signal/[0.08] blur-3xl lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1520px] px-6 pb-14 pt-12 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              {...enter(0)}
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal-soft px-3 py-1">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-signal anim-pulse-soft"
                  aria-hidden="true"
                />
                <Plate className="text-signal-deep">PS-07, every complaint heard</Plate>
              </span>
              <Plate className="text-faint">DevFest Gandhinagar, 2026</Plate>
            </motion.div>

            {/* Tines-style display headline: oversized, light weight, purple.
                No underlined phrase — the weight and colour carry the emphasis. */}
            <motion.h1
              {...enter(0.07)}
              className="display text-balance mt-7 text-signal"
            >
              Every complaint deserves a clear next step.
            </motion.h1>

            <motion.p
              {...enter(0.14)}
              className="mt-6 max-w-xl text-[1.1rem] leading-[1.65] text-muted sm:text-[1.17rem]"
            >
              MetroResolve sorts metro complaints in Gujarati, Hindi, English and
              Gujlish into five queues, shows why each one is urgent, and drafts an
              editable reply — even offline.
            </motion.p>

            <motion.p
              {...enter(0.19)}
              lang="gu"
              className="mt-4 border-l-2 border-signal/40 pl-3 text-[1rem] leading-relaxed text-muted"
            >
              <span className="mb-1 block text-[0.7rem] font-bold uppercase tracking-wider text-faint">ગુજરાતી</span>
              દરેક ફરિયાદને એક સ્પષ્ટ આગળનું પગલું મળવું જોઈએ.
            </motion.p>

            {/* Tines puts a purple pill + a soft lavender pill side by side */}
            <motion.div
              {...enter(0.26)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Action variant="primary" onClick={openConsole}>
                Open the console
              </Action>
              <button
                onClick={() => goSection('workflow')}
                className="inline-flex items-center gap-1.5 font-semibold text-muted transition-colors hover:text-signal"
              >
                Explore the workflow
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Honesty strip — where Tines shows its customer logo row */}
            <motion.ul
              {...enter(0.33)}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5"
            >
              {HONESTY.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-1.5 text-[0.86rem] font-medium text-ink/80"
                >
                  <Icon className="h-4 w-4 text-teal" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Product visual — the real engine, rendered live */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 22 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                })}
            className="lg:pt-2"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
