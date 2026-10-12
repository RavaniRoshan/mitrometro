import React from 'react';

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

/**
 * The MetroResolve mark: one incoming route, an interchange node, two outgoing
 * branches — a complaint being routed to where it belongs. Drawn, not imported.
 */
export function RouteMark({
  size = 30,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[7px] bg-signal-deep',
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size * 0.74} height={size * 0.74} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3.5V9.6"
          stroke="#FCF9F5"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12.1" r="2.9" stroke="#FCF9F5" strokeWidth="2.2" />
        <path
          d="M10 14.6L5.6 19.4M14 14.6l4.4 4.8"
          stroke="#FCF9F5"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="4.6" cy="20.5" r="1.7" fill="#FCF9F5" />
        <circle cx="19.4" cy="20.5" r="1.7" fill="#FCF9F5" />
      </svg>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        'text-[1.06rem] font-medium tracking-[-0.02em] text-ink',
        className
      )}
    >
      Metro<span className="text-signal">Resolve</span>
    </span>
  );
}

/** Uppercase mono eyebrow, like tines.com section labels. */
export function Plate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cx('plate', className)}>{children}</span>;
}

/**
 * Section header in the tines.com manner: a mono kicker, then a large,
 * light-weight (400) tightly-tracked statement. No section numbering — these
 * headings describe a place in an argument, not steps in a sequence.
 */
export function SectionHead({
  kicker,
  title,
  lede,
  invert = false,
  id,
}: {
  /** Accepted for callers; not rendered — numbering a non-sequence is noise. */
  index?: string;
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  invert?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Plate
        className={
          invert ? 'text-signal-soft' : 'text-signal'
        }
      >
        {kicker}
      </Plate>
      <h2
        id={id}
        className={cx(
          'display text-balance mt-5',
          invert ? 'text-on-ink' : 'text-signal'
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cx(
            'mt-5 max-w-2xl text-[1.02rem] leading-relaxed sm:text-[1.08rem]',
            /* cream/85 on #6741bf = 5.2:1; full cream reads as a heading */
            invert ? 'text-on-ink/85' : 'text-muted'
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

type Variant = 'primary' | 'secondary' | 'signal' | 'quiet' | 'onInk';

const VARIANTS: Record<Variant, string> = {
  /* Tines primary: deep purple pill, cream uppercase mono label */
  primary:
    'bg-signal-deep text-on-ink hover:bg-signal border border-signal-deep hover:border-signal',
  /* Tines secondary: soft lavender pill */
  secondary:
    'bg-signal-soft text-signal-deep hover:bg-signal/15 border border-transparent',
  signal:
    'bg-signal text-on-ink hover:bg-signal-deep border border-signal hover:border-signal-deep',
  quiet:
    'bg-transparent text-ink border border-line-2 hover:border-ink/40 hover:bg-ink/[0.04]',
  onInk:
    'bg-transparent text-on-ink border border-on-ink/35 hover:border-on-ink hover:bg-white/5',
};

/**
 * One button primitive for every call to action — fully rounded pill, uppercase
 * mono label, matching tines.com's "Book a demo" treatment.
 */
export function Action({
  variant = 'primary',
  href,
  onClick,
  children,
  className,
  external,
  ...rest
}: {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>) {
  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5',
    'font-mono text-[0.78rem] font-bold uppercase tracking-[0.04em]',
    'transition-colors duration-150 active:translate-y-px',
    VARIANTS[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}

/** Small status chip. Colour is never the only signal — always paired with text. */
export function Chip({
  tone = 'neutral',
  children,
  className,
  title,
}: {
  tone?: 'neutral' | 'signal' | 'teal' | 'ochre' | 'ink' | 'signalLit' | 'tealLit' | 'queue' | 'green';
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-paper text-muted border-line-2',
    signal: 'bg-signal-soft text-signal-deep border-signal/30',
    teal: 'bg-teal-soft text-teal border-teal/25',
    ochre: 'bg-ochre-soft text-ochre border-ochre/25',
    green: 'bg-green-soft text-green border-green/25',
    ink: 'bg-signal-deep text-on-ink border-signal-deep',
    /* Variants that sit on the dark surface */
    signalLit: 'bg-signal/20 text-signal-lit border-signal/50',
    tealLit: 'bg-teal/20 text-teal-lit border-teal/45',
    queue: 'bg-white/10 text-on-ink border-on-ink/25',
  };
  return (
    <span
      title={title}
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px]',
        'font-mono text-[0.75rem] font-bold tracking-[0.06em] uppercase',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
