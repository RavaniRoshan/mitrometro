import type { ComplaintRecord } from './metroNlp';

/**
 * Local-first persistence for MetroResolve.
 *
 * Every case an operator creates or edits is written to this browser's
 * localStorage. There is intentionally NO network sync in this repository:
 * `syncState` records how far a case has travelled, and 'synced' is only ever
 * set by a future backend acknowledgement (see README — "Current limitations").
 *
 * Storage layout:
 *   metroresolve.cases.v1  → StoredCase[]   (the queue, drafts included)
 *   metroresolve.meta.v1   → { seeded }     (whether demo data was seeded)
 */

const CASES_KEY = 'metroresolve.cases.v1';
const META_KEY = 'metroresolve.meta.v1';

export type SyncState = 'local' | 'pending' | 'synced';

export interface StoredCase extends ComplaintRecord {
  /** How far this record has travelled. 'synced' requires a real server ack. */
  syncState: SyncState;
  /** ISO timestamp of the last local write. */
  updatedAt: string;
  /** True for the bundled synthetic demonstration batch. */
  isDemo?: boolean;
}

interface StoreMeta {
  seeded: boolean;
}

/** Probe: can this browser accept writes? (Private mode, disabled storage…) */
export function storageAvailable(): boolean {
  try {
    const probe = '__metroresolve_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function loadCases(): StoredCase[] | null {
  try {
    const raw = localStorage.getItem(CASES_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCase[]) : null;
  } catch {
    return null;
  }
}

/** Returns true when the write actually landed on this device. */
export function saveCases(cases: StoredCase[]): boolean {
  try {
    localStorage.setItem(CASES_KEY, JSON.stringify(cases));
    return true;
  } catch {
    // Quota exceeded or storage disabled — the caller surfaces this honestly.
    return false;
  }
}

export function loadMeta(): StoreMeta | null {
  try {
    const raw = localStorage.getItem(META_KEY);
    return raw ? (JSON.parse(raw) as StoreMeta) : null;
  } catch {
    return null;
  }
}

export function saveMeta(meta: StoreMeta): void {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    /* non-fatal */
  }
}

export function clearAll(): void {
  try {
    localStorage.removeItem(CASES_KEY);
    localStorage.removeItem(META_KEY);
  } catch {
    /* non-fatal */
  }
}

/** Build a JSON export the operator can carry to another machine. */
export function exportCases(cases: StoredCase[]): void {
  const payload = {
    project: 'MetroResolve',
    note: 'Synthetic demonstration data exported from the local console. Not real passenger records.',
    exportedAt: new Date().toISOString(),
    cases,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'metroresolve_cases_export.json';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
