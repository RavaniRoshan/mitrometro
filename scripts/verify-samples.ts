/**
 * Prints the real engine output for every bundled synthetic complaint.
 * Run: npm run verify:samples
 *
 * Used to check that claims on the landing page and README match the code.
 */
import {
  SYNTHETIC_COMPLAINTS,
  URGENCY_RULES,
  processComplaint,
} from '../src/lib/metroNlp';

const rows = SYNTHETIC_COMPLAINTS.map((c) =>
  processComplaint(c.id, c.sourceText, c.channel, c.station, c.timestamp)
);

console.log(`Rules: ${URGENCY_RULES.length}\n`);
console.log(
  ['ID', 'LANG', 'CONF', 'DEPT', 'SCORE', 'BAND', 'REASONS'].join('\t')
);

for (const r of rows) {
  console.log(
    [
      r.id,
      r.detectedLanguage?.code,
      `${r.detectedLanguage?.confidence}%`,
      r.classification?.department,
      r.urgency?.score,
      r.urgency?.band,
      r.urgency?.reasons.map((x) => x.ruleId).join(','),
    ].join('\t')
  );
}

/* Invariants asserted by the landing page copy. */
const checks: { id: string; score: number; band: string; dept: string }[] = [
  { id: 'SAMPLE-03', score: 70, band: 'urgent', dept: 'Lifts' },
  { id: 'SAMPLE-07', score: 85, band: 'urgent', dept: 'Safety' },
  { id: 'SAMPLE-02', score: 0, band: 'low', dept: 'Cleanliness' },
  { id: 'SAMPLE-10', score: 40, band: 'high', dept: 'Lifts' },
];

let failed = 0;
console.log('\nInvariant checks:');
for (const check of checks) {
  const r = rows.find((x) => x.id === check.id)!;
  const ok =
    r.urgency?.score === check.score &&
    r.urgency?.band === check.band &&
    r.classification?.department === check.dept;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}\t${check.id}\texpected ${check.score}/${check.band}/${check.dept}` +
      `\tgot ${r.urgency?.score}/${r.urgency?.band}/${r.classification?.department}`
  );
}

console.log(
  `\nLanguage mix: ${[...new Set(rows.map((r) => r.detectedLanguage?.code))].join(', ')}`
);

if (failed > 0) {
  console.error(`\n${failed} invariant check(s) failed.`);
  process.exit(1);
}
console.log('\nAll invariant checks passed.');
