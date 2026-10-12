import React from 'react';
import { Eye, Shield, Wrench, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const FourPillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Visibility across AI-created work',
      description: 'Know what exists, who built it, and what it touches. Focus on empowering teams without leaving a mess to untangle.',
      highlight: 'Full catalog & dependency mapping'
    },
    {
      icon: Shield,
      title: 'Control without bottlenecks',
      description: 'Determine where and how access happens so teams can self-serve and freely build. Make the governed path the easy one.',
      highlight: 'Granular policy & credential proxy'
    },
    {
      icon: Wrench,
      title: 'Autonomous fixes, controlled by you',
      description: 'Tines identifies and suggests fixes for anomalies and potential breaks. Your workflows get better the longer they run. You control what goes live.',
      highlight: 'Self-healing & automated remediation'
    },
    {
      icon: Sparkles,
      title: 'AI on your terms, always',
      description: 'Start where you’re already working. Choose where, when, and how your LLMs are used, with freedom to switch as your AI strategy evolves.',
      highlight: 'Multi-model LLM abstraction'
    }
  ];

  return (
    <section className="py-24 border-b border-white/[0.08] bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 font-mono">
            CORE PRINCIPLES
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Freedom to build. Complete security. No compromises.
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Tines 3B powers faster delivery, safer operations, and AI execution that scales with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-[#0B0F19] p-7 flex flex-col justify-between hover:border-emerald-500/30 hover:bg-[#0D1424] transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
