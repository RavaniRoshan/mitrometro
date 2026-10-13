import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Search,
  Clock,
  AlertTriangle,
  HardDriveDownload,
  CloudUpload,
  Wifi,
  WifiOff,
  Download,
  RotateCcw,
  Plus,
  CheckCircle2,
  Languages,
  Gauge,
  PenLine,
  Github,
  Save,
} from 'lucide-react';
import {
  SYNTHETIC_COMPLAINTS,
  processComplaint,
  DEPARTMENTS,
  type ComplaintRecord,
  type Department,
} from '../lib/metroNlp';
import {
  clearAll,
  exportCases,
  loadCases,
  loadMeta,
  saveCases,
  saveMeta,
  storageAvailable,
  type StoredCase,
} from '../lib/store';
import { Chip, Plate, RouteMark, Wordmark, cx } from '../site/ui';
import { REPO_URL } from '../site/Nav';

const PRESETS: { text: string; station: string; label: string }[] = [
  {
    label: 'Gujarati · lift trapped',
    text: 'લિફ્ટ બગડી ગઈ છે અને વૃદ્ધ દાદી અંદર ફસાયેલા છે, જલ્દી કોઈને મોકલો!',
    station: 'University',
  },
  {
    label: 'Hinglish · smoke',
    text: 'Platform 2 pe smoke देखाई दे रहा है, jaldi se check karo please.',
    station: 'North Terminal',
  },
  {
    label: 'Gujlish · fare',
    text: 'M-card recharge ni website pe payment 200 રૂપિયા aayi but balance વધી નહીં. Please refund.',
    station: 'Tech Park',
  },
  {
    label: 'English · conduct',
    text: 'The ticket counter attendant was rude and ignored senior citizens waiting in line.',
    station: 'Central Station',
  },
];

const STATIONS = [
  'Gandhinagar Terminal',
  'GIFT City Station',
  'Infocity Concourse',
  'Sector 1 Interchange',
  'Central Station',
];

function seedCases(): StoredCase[] {
  return SYNTHETIC_COMPLAINTS.map((c) => ({
    ...processComplaint(c.id, c.sourceText, c.channel, c.station, c.timestamp),
    syncState: 'pending' as const,
    updatedAt: new Date().toISOString(),
    isDemo: true,
  }));
}

function nextCaseId(cases: StoredCase[]): string {
  const numbers = cases
    .filter((c) => c.id.startsWith('MR-'))
    .map((c) => Number.parseInt(c.id.replace(/\D/g, ''), 10))
    .filter((n) => Number.isFinite(n));
  const next = numbers.length ? Math.max(...numbers) + 1 : 1;
  return `MR-${String(next).padStart(4, '0')}`;
}

export function TriageConsole() {
  const [cases, setCases] = useState<StoredCase[]>(() => {
    const stored = loadCases();
    if (stored && stored.length > 0) return stored;
    if (!loadMeta()?.seeded && storageAvailable()) {
      const seeded = seedCases();
      saveCases(seeded);
      saveMeta({ seeded: true });
      return seeded;
    }
    return [];
  });

  const [selectedId, setSelectedId] = useState<string | null>(
    () => cases[0]?.id ?? null
  );
  const [query, setQuery] = useState('');
  const [queue, setQueue] = useState<'all' | 'urgent' | 'drafts'>('all');
  const [dept, setDept] = useState<Department | 'all'>('all');
  const [intake, setIntake] = useState('');
  const [station, setStation] = useState(STATIONS[0]);
  const [notice, setNotice] = useState<string | null>(null);
  const [draftEdit, setDraftEdit] = useState('');
  const [persisted, setPersisted] = useState(true);
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  const noticeTimer = useRef<number | undefined>(undefined);

  const canStore = useMemo(() => storageAvailable(), []);

  /* ---- persistence ---- */
  useEffect(() => {
    if (!canStore) return;
    setPersisted(saveCases(cases));
  }, [cases, canStore]);

  /* ---- real connectivity ---- */
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  const flash = (msg: string) => {
    setNotice(msg);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 4200);
  };

  /* ---- selection ---- */
  const active = useMemo(
    () => cases.find((c) => c.id === selectedId) ?? cases[0] ?? null,
    [cases, selectedId]
  );

  useEffect(() => {
    setDraftEdit(active?.draft?.text ?? '');
  }, [active?.id, active?.draft?.text]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const matchesQuery =
        !q ||
        c.sourceText.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.detectedLanguage?.label.toLowerCase().includes(q) ?? false);
      const matchesQueue =
        queue === 'all'
          ? true
          : queue === 'urgent'
          ? c.urgency?.band === 'urgent'
          : c.status === 'pending';
      const matchesDept = dept === 'all' || c.classification?.department === dept;
      return matchesQuery && matchesQueue && matchesDept;
    });
  }, [cases, query, queue, dept]);

  const urgentCount = cases.filter((c) => c.urgency?.band === 'urgent').length;

  /* ---- actions ---- */
  const ingest = (text: string, chosenStation: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = nextCaseId(cases);
    const record = processComplaint(id, trimmed, 'app', chosenStation, 'Just now');
    const stored: StoredCase = {
      ...record,
      syncState: 'pending',
      updatedAt: new Date().toISOString(),
    };
    setCases((prev) => [stored, ...prev]);
    setSelectedId(id);
    setIntake('');
    setDept('all');
    setQueue('all');
    flash(canStore ? `${id} triaged and saved on this device.` : `${id} triaged — local storage is unavailable.`);
  };

  const saveDraft = () => {
    if (!active) return;
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              draft: {
                text: draftEdit,
                languageUsed: c.draft?.languageUsed ?? 'en',
                note: 'Edited on-device by the operator.',
              },
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );
    flash(`Draft for ${active.id} saved on this device.`);
  };

  const resetDemo = () => {
    clearAll();
    const seeded = seedCases();
    saveCases(seeded);
    saveMeta({ seeded: true });
    setCases(seeded);
    setSelectedId(seeded[0]?.id ?? null);
    flash('Local store reset to the synthetic demonstration batch.');
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#console-main" className="skip-link">
        Skip to content
      </a>
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <a href="#/" className="flex items-center gap-2.5">
            <RouteMark size={28} />
            <Wordmark className="hidden sm:inline" />
          </a>

          <span className="hidden h-5 w-px bg-line-2 sm:block" aria-hidden="true" />
          <Plate className="text-faint">Triage console</Plate>

          <div
            className="ml-auto flex flex-wrap items-center gap-2"
            role="status"
            aria-live="polite"
            aria-label="Connection and storage status"
          >
            {/* Connectivity — the real browser state */}
            <Chip tone={online ? 'teal' : 'ochre'} title="Actual network status reported by the browser">
              {online ? (
                <>
                  <Wifi className="h-3 w-3" aria-hidden="true" />
                  Online (nothing is sent)
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" aria-hidden="true" />
                  Offline — triage continues
                </>
              )}
            </Chip>

            <Chip
              tone={persisted && canStore ? 'teal' : 'signal'}
              title="Cases are written to localStorage"
            >
              <HardDriveDownload className="h-3 w-3" aria-hidden="true" />
              {canStore
                ? persisted
                  ? 'Saved on this device'
                  : 'Storage write failed'
                : 'Storage unavailable'}
            </Chip>

            <Chip tone="ochre" title="No sync backend exists in this repository">
              <CloudUpload className="h-3 w-3" aria-hidden="true" />
              {cases.length} pending sync
            </Chip>

            <button
              onClick={() => exportCases(cases)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line-2 bg-card px-3 py-2 text-[0.75rem] font-bold tracking-[0.06em] text-ink transition-colors hover:border-ink/50"
              title="Download all cases as JSON"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Export
            </button>

            <button
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line-2 bg-card px-3 py-2 text-[0.75rem] font-bold tracking-[0.06em] text-ink transition-colors hover:border-ink/50"
              title="Clear local storage and restore the synthetic batch"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset demo
            </button>

            <a
              href="#/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink bg-ink px-3 py-2 text-[0.75rem] font-bold tracking-[0.06em] text-on-ink transition-colors hover:bg-ink-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Overview
            </a>
          </div>
        </div>

        {/* Offline band */}
        {!online && (
          <div className="border-t border-ochre/40 bg-ochre-soft px-4 py-2 sm:px-6">
            <p className="mx-auto max-w-[1400px] text-[0.78rem] font-medium text-ochre">
              Network offline. Detection, scoring, drafts and local saving all
              keep working — nothing on this page requires a connection.
            </p>
          </div>
        )}

        {/* Notice */}
        {notice && (
          <div className="border-t border-teal/30 bg-teal-soft px-4 py-2 sm:px-6">
            <p className="mx-auto flex max-w-[1400px] items-center gap-2 text-[0.78rem] font-medium text-teal">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {notice}
            </p>
          </div>
        )}
      </header>

      <main id="console-main" className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6">
        {/* Intake */}
        <section aria-label="Complaint intake" className="rounded-xl border border-line bg-card p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ingest(intake, station);
            }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="intake" className="sr-only">
              Passenger complaint text
            </label>
            <input
              id="intake"
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
              placeholder="Paste a complaint in Gujarati, Hindi, English or Gujlish…"
              className="min-w-0 flex-1 rounded-lg border border-line-2 bg-white px-3.5 py-2.5 text-[0.92rem] text-ink placeholder:text-faint focus:border-signal"
            />
            <label htmlFor="station" className="sr-only">
              Station
            </label>
            <select
              id="station"
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="rounded-lg border border-line-2 bg-white px-3 py-2.5 text-[0.86rem] font-medium text-ink focus:border-signal"
            >
              {STATIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-signal-deep bg-signal-deep px-4 py-2.5 text-[0.78rem] font-bold tracking-[0.08em] text-white transition-colors hover:bg-signal"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Triage
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Plate className="text-faint">Presets</Plate>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => ingest(p.text, p.station)}
                className="rounded-md border border-line-2 bg-paper px-2.5 py-1.5 text-[0.75rem] font-medium text-muted transition-colors hover:border-ink/50 hover:text-ink"
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Workspace */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* Left rail */}
          <aside className="rounded-xl border border-line bg-card p-4" aria-label="Queues">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter cases…"
                aria-label="Filter cases"
                className="w-full rounded-lg border border-line-2 bg-white py-2 pl-8 pr-2 text-[0.84rem] focus:border-signal"
              />
            </div>

            <div className="mt-4 space-y-1">
              {(
                [
                  { key: 'all', label: 'All cases', icon: Clock, count: cases.length },
                  { key: 'urgent', label: 'Urgent', icon: AlertTriangle, count: urgentCount },
                ] as const
              ).map(({ key, label, icon: Icon, count }) => (
                <button
                  key={key}
                  onClick={() => setQueue(key)}
                  aria-pressed={queue === key}
                  className={cx(
                    'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[0.84rem] font-semibold transition-colors',
                    queue === key
                      ? 'bg-ink text-on-ink'
                      : 'text-muted hover:bg-paper hover:text-ink'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </span>
                  <span
                    className={cx(
                      'rounded px-1.5 font-mono text-[0.75rem]',
                      queue === key ? 'bg-white/15' : 'bg-paper text-faint'
                    )}
                  >
                    {count}
                  </span>
                </button>
              ))}

              <button
                onClick={() => setQueue(queue === 'drafts' ? 'all' : 'drafts')}
                aria-pressed={queue === 'drafts'}
                className={cx(
                  'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[0.84rem] font-semibold transition-colors',
                  queue === 'drafts'
                    ? 'bg-ink text-on-ink'
                    : 'text-muted hover:bg-paper hover:text-ink'
                )}
              >
                <span className="flex items-center gap-2">
                  <CloudUpload className="h-3.5 w-3.5" aria-hidden="true" />
                  Outbox (unsynced)
                </span>
                <span
                  className={cx(
                    'rounded px-1.5 font-mono text-[0.75rem]',
                    queue === 'drafts' ? 'bg-white/15' : 'bg-paper text-faint'
                  )}
                >
                  {cases.length}
                </span>
              </button>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <Plate className="text-faint">Departments</Plate>
              <div className="mt-2 space-y-1">
                {DEPARTMENTS.map((d) => {
                  const count = cases.filter(
                    (c) => c.classification?.department === d
                  ).length;
                  const on = dept === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setDept(on ? 'all' : d)}
                      aria-pressed={on}
                      className={cx(
                        'flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-[0.8rem] font-medium transition-colors',
                        on
                          ? 'bg-signal-deep text-white'
                          : 'text-muted hover:bg-paper hover:text-ink'
                      )}
                    >
                      <span className="truncate">{d}</span>
                      <span
                        className={cx(
                          'ml-2 rounded px-1.5 font-mono text-[0.75rem]',
                          on ? 'bg-white/20' : 'bg-paper text-faint'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Case list */}
          <section
            className="overflow-hidden rounded-xl border border-line bg-card"
            aria-label="Case list"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <Plate className="text-faint">Queue</Plate>
              <span className="font-mono text-[0.75rem] text-faint">
                {filtered.length} / {cases.length}
              </span>
            </div>

            {filtered.length === 0 ? (
              <p className="px-4 py-10 text-center text-[0.86rem] text-faint">
                {cases.length === 0
                  ? 'No cases yet. Add one above — it will be processed and saved here.'
                  : 'No cases match this filter.'}
              </p>
            ) : (
              <ul className="max-h-[560px] divide-y divide-line overflow-y-auto">
                {filtered.map((c) => {
                  const on = c.id === active?.id;
                  const score = c.urgency?.score ?? 0;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setSelectedId(c.id)}
                        aria-current={on}
                        className={cx(
                          'flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition-colors',
                          on ? 'bg-white' : 'hover:bg-white/60'
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-mono text-[0.76rem] font-bold text-ink">
                              {c.id}
                            </span>
                            <span className="text-[0.75rem] text-faint">
                              {c.station} · {c.timestamp}
                            </span>
                            <span className="rounded bg-paper px-1.5 py-[1px] font-mono text-[0.75rem] text-muted">
                              {c.detectedLanguage?.code}
                            </span>
                          </span>
                          <span
                            lang={c.detectedLanguage?.code === 'gu' ? 'gu' : c.detectedLanguage?.code === 'hi' ? 'hi' : 'en'}
                            className="mt-1 block truncate text-[0.86rem] leading-snug text-ink"
                          >
                            {c.sourceText}
                          </span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-2">
                            <span className="rounded bg-ink px-1.5 py-[2px] font-mono text-[0.75rem] text-on-ink">
                              {c.classification?.department}
                            </span>
                            <span className="font-mono text-[0.75rem] text-faint">
                              {c.urgency?.reasons.length ?? 0} rules fired
                            </span>
                            {c.isDemo && (
                              <span className="font-mono text-[0.75rem] tracking-wider text-faint">
                                demo
                              </span>
                            )}
                          </span>
                        </span>

                        <span className="shrink-0 text-right">
                          <span
                            className={cx(
                              'block rounded px-2 py-0.5 font-mono text-[0.75rem] font-bold',
                              score >= 65
                                ? 'bg-signal-soft text-signal-deep'
                                : score >= 40
                                ? 'bg-ochre-soft text-ochre'
                                : 'bg-paper text-muted'
                            )}
                          >
                            {score} {c.urgency?.band}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Inspector */}
          <section
            className="rounded-xl border border-line bg-card"
            aria-label="Case inspector"
          >
            {!active ? (
              <p className="px-4 py-10 text-center text-[0.86rem] text-faint">
                Select a case to inspect it.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.82rem] font-bold text-ink">
                      {active.id}
                    </span>
                    <Chip tone="ink">{active.classification?.department}</Chip>
                    {active.isDemo && <Chip tone="neutral">Demonstration</Chip>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Chip tone="teal" title="Written to localStorage on this device">
                      <HardDriveDownload className="h-3 w-3" aria-hidden="true" />
                      On this device
                    </Chip>
                    <Chip tone="ochre" title="No backend configured to confirm receipt">
                      <CloudUpload className="h-3 w-3" aria-hidden="true" />
                      Pending sync
                    </Chip>
                  </div>
                </div>

                <div className="space-y-4 px-4 py-4">
                  {/* Source */}
                  <div className="rounded-lg border border-line bg-white/70 p-3.5">
                    <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                      <Plate className="text-faint">Message</Plate>
                      <span className="font-mono text-[0.75rem] text-faint">
                        {active.station} · {active.channel} · {active.timestamp}
                      </span>
                    </div>
                    <p
                      lang={active.detectedLanguage?.code === 'gu' ? 'gu' : active.detectedLanguage?.code === 'hi' ? 'hi' : 'en'}
                      className="text-[0.96rem] leading-relaxed text-ink"
                    >
                      {active.sourceText}
                    </p>
                  </div>

                  {/* Language */}
                  <div className="rounded-lg border border-line bg-white/70 p-3.5">
                    <div className="flex items-center gap-1.5">
                      <Languages className="h-3.5 w-3.5 text-signal-deep" aria-hidden="true" />
                      <Plate className="text-faint">Detected language</Plate>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                      <span className="text-[0.94rem] font-bold text-ink">
                        {active.detectedLanguage?.label}
                      </span>
                      <span className="font-mono text-[0.75rem] text-muted">
                        {active.detectedLanguage?.confidence}% heuristic
                      </span>
                    </div>
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
                      {active.detectedLanguage?.note}
                    </p>
                  </div>

                  {/* Routing signals */}
                  <div className="rounded-lg border border-line bg-white/70 p-3.5">
                    <Plate className="text-faint">Routing signals</Plate>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {active.classification?.matchedSignals.map((s, i) => (
                        <span
                          key={`${s.term}-${i}`}
                          className="rounded border border-line-2 bg-paper px-2 py-1 font-mono text-[0.75rem] text-muted"
                        >
                          “{s.term}” <span className="font-bold text-signal-deep">+{s.weight}</span>
                        </span>
                      ))}
                      {active.classification?.matchedSignals.length === 0 && (
                        <span className="text-[0.78rem] text-faint">
                          No keyword matched — conservative default applied.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="rounded-lg border border-line bg-white/70 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="h-3.5 w-3.5 text-signal-deep" aria-hidden="true" />
                        <Plate className="text-faint">Why this score</Plate>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cx(
                            'font-mono text-[1.5rem] font-extrabold leading-none tabular-nums',
                            active.urgency?.band === 'urgent'
                              ? 'text-signal-deep'
                              : 'text-ink'
                          )}
                        >
                          {active.urgency?.score}
                        </span>
                        <span className="font-mono text-[0.75rem] text-faint">/100</span>
                        <Chip
                          tone={
                            active.urgency?.band === 'urgent' ? 'signal' : 'neutral'
                          }
                        >
                          {active.urgency?.band}
                        </Chip>
                      </div>
                    </div>

                    <ul className="mt-2.5 space-y-1.5">
                      {active.urgency?.reasons.map((r) => (
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

                    <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-line">
                      <div
                        className={cx(
                          'h-full rounded-full',
                          (active.urgency?.score ?? 0) >= 65 ? 'bg-signal' : 'bg-ink/60'
                        )}
                        style={{ width: `${active.urgency?.score ?? 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Draft */}
                  <div className="rounded-lg border border-ink/15 bg-ink p-3.5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <PenLine className="h-3.5 w-3.5 text-signal-lit" aria-hidden="true" />
                        <Plate className="text-on-ink-muted">Draft reply</Plate>
                      </div>
                      <span className="rounded border border-signal-lit/50 px-1.5 py-[2px] font-mono text-[0.75rem] font-bold tracking-[0.1em] text-signal-lit">
                        Draft, not sent
                      </span>
                    </div>

                    <label htmlFor="draft" className="sr-only">
                      Edit draft reply for {active.id}
                    </label>
                    <textarea
                      id="draft"
                      rows={4}
                      value={draftEdit}
                      onChange={(e) => setDraftEdit(e.target.value)}
                      lang={active.draft?.languageUsed}
                      className="w-full resize-y rounded-lg border border-line-ink bg-ink-2 px-3 py-2.5 text-[0.86rem] leading-relaxed text-on-ink focus:border-signal-lit"
                    />

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[0.75rem] text-on-ink-muted">
                        {active.draft?.note}
                      </span>
                      <button
                        onClick={saveDraft}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-signal-deep px-3 py-1.5 text-[0.75rem] font-bold tracking-[0.08em] text-white transition-colors hover:bg-signal"
                      >
                        <Save className="h-3.5 w-3.5" aria-hidden="true" />
                        Save on this device
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-line bg-card">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-4 text-[0.75rem] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="flex items-center gap-2">
            <ComplaintRecordBadge />
            Synthetic demonstration data. No real passenger records.
          </span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono">key: metroresolve.cases.v1</span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Source
            </a>
            <a href="#/" className="hover:text-ink">
              Back to overview
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

/** Tiny legend marker used in the console footer. */
function ComplaintRecordBadge() {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full bg-teal"
      aria-hidden="true"
    />
  );
}
