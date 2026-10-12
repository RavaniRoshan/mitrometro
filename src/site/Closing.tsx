import React from 'react';
import { ArrowUpRight, Github, BookOpen } from 'lucide-react';
import { Action, Plate } from './ui';
import { REPO_URL } from './Nav';
import { openConsole } from '../hooks/useHashRoute';

/**
 * Closing band — mirrors tines.com's oversized "Start today" display headline
 * sitting on the cream canvas, followed by two pill CTAs.
 */
export function Closing() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="jali pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-signal/[0.09] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1520px] px-6 py-20 text-center sm:py-28 lg:px-10">
        <Plate className="text-signal">End of line, next step</Plate>

        {/* Oversized display, purple on cream — the Tines closer */}
        <h2 className="mx-auto mt-6 max-w-4xl text-balance display text-signal">
          Every complaint deserves a clear next step.
        </h2>

        <div className="mx-auto mt-7 flex max-w-2xl flex-col items-center gap-1.5">
          <p lang="gu" className="text-[1.02rem] leading-relaxed text-muted">
            દરેક ફરિયાદને એક સ્પષ્ટ આગળનું પગલું મળવું જોઈએ.
          </p>
          <p lang="hi" className="text-[1.02rem] leading-relaxed text-muted">
            हर शिकायत को एक स्पष्ट अगला कदम मिलना चाहिए।
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Action variant="primary" onClick={openConsole}>
            Open the console
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Action>
          <Action variant="secondary" href={REPO_URL} external>
            <Github className="h-4 w-4" aria-hidden="true" />
            View on GitHub
          </Action>
          <Action variant="quiet" href={`${REPO_URL}#readme`} external>
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Read the README
          </Action>
        </div>

        <p className="mt-9 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-faint">
          Runs in your browser. Nothing to sign up for. Source on GitHub.
        </p>
      </div>
    </section>
  );
}
