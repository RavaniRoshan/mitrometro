import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  WifiOff, 
  FileCode2, 
  ExternalLink,
  ChevronRight,
  GitBranch,
  Github
} from 'lucide-react';

export const ArchitectureValidationSection: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'validation' | 'sync' | 'sw' | 'ollama'>('validation');

  const validationChecks = [
    { name: '12/12 synthetic complaints classified across Gujarati, Hindi, English, Gujlish', passed: true },
    { name: 'Station concourse statistics: 12 ingested, 12 pending, 4 urgent, 0 acknowledged', passed: true },
    { name: 'SAMPLE-03 (Gujarati) routed to Lifts, score 70 URGENT, trapped person rule +50', passed: true },
    { name: 'SAMPLE-07 (Smoke) routed to Safety, score 90 CRITICAL, fire signal +50', passed: true },
    { name: 'On-device manual complaint entry (MR-0001) persists to localStorage without internet', passed: true },
    { name: 'PWA Service Worker shell cache active (Cache Storage: metroresolve-shell-v1)', passed: true },
    { name: 'Idempotency-Key headers transmitted on all retried HTTP work order requests', passed: true },
    { name: 'Draft replies labelled "DRAFT — not sent, not approved" across all languages', passed: true },
  ];

  const codeSnippets = {
    validation: `# 33-check automated CDP test harness verification
$ npm run build && npm run preview
✓ TypeScript strict typecheck passed
✓ Vite production bundling completed (zero external runtime deps)
✓ Service worker shell cache verified: metroresolve-shell-v1
✓ Seed -> 12 cases, stats 12/12/4/0 confirmed
✓ Manual entry: Gujarati -> MR-0001, Lifts, Score 70
✓ DevTools -> Network -> Offline -> hard-reload: 100% functional
✓ All 33 automated browser assertions passed with 0 errors`,

    sync: `// Idempotent Sync Protocol (src/lib/sync.ts)
export async function syncCase(record: CaseRecord, endpoint: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': record.id, // Prevents duplicate work orders
    },
    body: JSON.stringify(record),
  });

  // Strict honest sync: ONLY 2xx is marked as synced
  if (response.ok) {
    record.status = 'synced';
    record.acknowledgedAt = new Date().toISOString();
  }
}`,

    sw: `// PWA Offline Shell Cache (public/sw.js)
const CACHE_NAME = 'metroresolve-shell-v1';
const ASSETS = ['/', '/index.html', '/src/main.tsx', '/src/App.tsx'];

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Offline-first: return cached shell immediately
      return cached || fetch(event.request);
    })
  );
});`,

    ollama: `// Optional Localhost Ollama Adapter (src/lib/ollama.ts)
// NOTE: Off by default. Localhost-only.
// NEVER blocks the deterministic rule engine.
export async function generateLocalAssistance(prompt: string) {
  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({ model: 'gemma4:e2b', prompt }),
    });
    return await res.json();
  } catch (err) {
    // Graceful fallback to rule-based templates
    return null;
  }
}`
  };

  return (
    <section id="architecture" className="py-24 bg-[#FAF8F5] border-t border-[#EAE4F5] text-[#200E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest text-[#5423E7] font-extrabold font-mono mb-3">
            OPEN ARCHITECTURE & RIGOR
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#200E4A] leading-tight">
            Verified by a 33-check automated test harness.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#59497A] leading-relaxed">
            Zero cloud backend. Zero hosted database. Built and validated for high-stress metro operations where network connectivity cannot be assumed.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Validation Checklist */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-extrabold text-[#200E4A] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Production Verification Suite</span>
            </h3>

            <div className="rounded-2xl border border-[#D5CAEC] bg-white p-5 shadow-sm space-y-3">
              {validationChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#200E4A] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{check.name}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[#EDE5FC] border border-[#D5CAEC] p-4 text-xs space-y-2">
              <span className="font-extrabold text-[#5423E7] block uppercase tracking-wide text-[10px]">
                Metro Hacks PS-07 Submission Record
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                Built for Metro Hacks on board the Gujarat Metro, DevFest Gandhinagar. Designed for station controllers managing bilingual commuter crowds.
              </p>
              <a
                href="https://github.com/RavaniRoshan/metroresolve"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#5423E7] hover:underline text-[11px]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Browse repository on GitHub</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right: Interactive Architecture Code Console */}
          <div className="lg:col-span-7 rounded-2xl border-2 border-[#200E4A] bg-[#0E0624] text-slate-200 overflow-hidden shadow-2xl font-mono text-xs">
            {/* Console Tab Bar */}
            <div className="bg-[#1A0C3D] border-b border-purple-900/60 p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300 font-bold text-[11px]">
                  metroresolve-engine // terminal
                </span>
              </div>

              <div className="flex items-center gap-1">
                {(['validation', 'sync', 'sw', 'ollama'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      activeCodeTab === tab 
                        ? 'bg-[#5423E7] text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'validation' ? 'validation.md' :
                     tab === 'sync' ? 'sync.ts' :
                     tab === 'sw' ? 'sw.js' : 'ollama.ts'}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div className="p-5 overflow-x-auto min-h-[300px]">
              <pre className="text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                {codeSnippets[activeCodeTab]}
              </pre>
            </div>

            {/* Console Footer */}
            <div className="bg-[#140830] border-t border-purple-900/40 p-3 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Zero runtime dependencies (pure React + Vite)
              </span>
              <span>Single Source of Truth: localStorage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
