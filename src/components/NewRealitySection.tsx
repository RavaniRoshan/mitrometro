import React from 'react';
import { AlertTriangle, ShieldCheck, Terminal, GitCommit, Key, ArrowRight } from 'lucide-react';

export const NewRealitySection: React.FC = () => {
  return (
    <section className="py-24 border-b border-white/[0.08] bg-[#070A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-4 font-mono">
            THE NEW REALITY FOR IT AND SECURITY
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            AI made everyone a builder.
            <br />
            <span className="text-slate-400">But security and IT got 100× harder.</span>
          </h2>
        </div>

        {/* 2-Column Real Context */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0B0F19] p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 w-fit">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SHADOW AI & ACCELERATING SPREAD</span>
            </div>

            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              Now, finance is building dashboards in Claude Code. Marketing shipped an app on a personal Vercel account. Someone committed an API key to GitHub last week.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                <Key className="w-4 h-4 text-amber-400 shrink-0" />
                <span>prod_openai_key leaked in internal script</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                <Terminal className="w-4 h-4 text-teal-400 shrink-0" />
                <span>38 rogue automated bots querying internal databases</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0C1520] to-[#080E16] p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE TINES GOVERNED ENVIRONMENT</span>
            </div>

            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              None of it is malicious. They’re doing exactly what you asked. But without visibility and control, innovation creates new risk. It’s time to give every team a secure place to build.
            </p>

            <div className="pt-4 border-t border-white/[0.08] text-sm text-emerald-300 font-semibold flex items-center gap-2">
              <span>Empower builders while keeping total auditability</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
