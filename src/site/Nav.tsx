import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Github, ArrowUpRight } from 'lucide-react';
import { Action, RouteMark, Wordmark, cx } from './ui';
import { goSection, openConsole } from '../hooks/useHashRoute';

export const REPO_URL = 'https://github.com/RavaniRoshan/mitrometro';

const LINKS: { id: string; label: string }[] = [
  { id: 'workflow', label: 'Workflow' },
  { id: 'demo', label: 'Product' },
  { id: 'offline', label: 'Offline-first' },
  { id: 'languages', label: 'Languages' },
  { id: 'architecture', label: 'Architecture' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const jump = (id: string) => {
    setOpen(false);
    goSection(id);
  };

  return (
    <header
      className={cx(
        'sticky top-0 z-40 w-full transition-colors duration-200',
        scrolled
          ? 'border-b border-line bg-paper/92 backdrop-blur-md'
          : 'border-b border-transparent bg-paper'
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1520px] items-center justify-between gap-4 px-6 lg:px-10">
        {/* Identity */}
        <a
          href="#/"
          className="flex items-center gap-2.5"
          aria-label="MetroResolve home"
        >
          <RouteMark size={30} />
          <Wordmark />
        </a>

        {/* Desktop links — Tines uses fully-rounded pill nav items */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => jump(l.id)}
              className="rounded-full px-3 py-2 text-[0.86rem] font-semibold text-ink/80 transition-colors hover:bg-ink/[0.05] hover:text-ink"
            >
              {l.label}
            </button>
          ))}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.86rem] font-semibold text-ink/80 transition-colors hover:bg-ink/[0.05] hover:text-ink"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>Source</span>
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </nav>

        {/* Actions — one honest CTA, Tines-style purple pill */}
        <div className="flex items-center gap-1">
          <Action
            variant="primary"
            onClick={openConsole}
            className="hidden sm:inline-flex"
          >
            Open the console
          </Action>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:bg-ink/[0.05] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — slides open rather than popping in */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <div className="px-6 pb-6 pt-3">
              <nav className="flex flex-col gap-1" aria-label="Primary mobile">
                {LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => jump(l.id)}
                    className="rounded-xl px-3 py-3 text-left text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink/[0.05]"
                  >
                    {l.label}
                  </button>
                ))}
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink/[0.05]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View source on GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <div className="mt-3 flex flex-col gap-2">
                  <Action
                    variant="primary"
                    onClick={() => {
                      setOpen(false);
                      openConsole();
                    }}
                    className="w-full"
                  >
                    Open the console
                  </Action>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
