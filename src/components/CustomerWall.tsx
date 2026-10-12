import React from 'react';
import { Shield, CheckCircle2, TrendingUp, Clock, Lock } from 'lucide-react';

export const CustomerWall: React.FC = () => {
  const logos = [
    { name: 'Canva', sector: 'Design Platform' },
    { name: 'Coinbase', sector: 'Financial Infrastructure' },
    { name: 'GitLab', sector: 'DevSecOps Platform' },
    { name: 'Mars', sector: 'Global Enterprise' },
    { name: 'McKesson', sector: 'Healthcare & Pharma' },
    { name: 'Sophos', sector: 'Cybersecurity' },
    { name: 'Kayak', sector: 'Travel Tech' },
    { name: 'Datadog', sector: 'Observability' },
  ];

  const caseStudies = [
    {
      company: 'Canva',
      quote: 'Tines gave our security operations team the power to automate 90% of tier 1 alert triages without waiting on software engineering sprints.',
      speaker: 'Head of Detection & Response',
      impact: '90% faster incident triage',
      metric: '18,000+ hours saved annually'
    },
    {
      company: 'GitLab',
      quote: 'We orchestrated our entire incident escalation pipeline. When suspicious activity hits our repositories, containment happens in milliseconds.',
      speaker: 'Director of Security Operations',
      impact: '1,500+ monthly alerts handled',
      metric: '99.4% automated containment'
    },
    {
      company: 'Mars',
      quote: 'With over 130,000 associates worldwide, Tines allows us to safely automate repetitive cybersecurity tasks across complex hybrid clouds.',
      speaker: 'VP of Global Information Security',
      impact: 'Cross-functional automation',
      metric: 'Deployed across 40+ SecOps workflows'
    }
  ];

  return (
    <section id="customers" className="py-20 border-y border-white/[0.08] bg-[#070A0F]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subhead / Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            ENTERPRISE SCALE & RELIABILITY
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Trusted by the world’s most demanding security leaders
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            From hyper-growth tech unicorns to Fortune 50 enterprises, security engineers run their critical processes on Tines.
          </p>
        </div>

        {/* Minimalist Logo Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-center mb-16">
          {logos.map((logo, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all text-center group"
            >
              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight">
                {logo.name}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5 truncate">
                {logo.sector}
              </span>
            </div>
          ))}
        </div>

        {/* Quantified Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-[#0C111C]/80 p-6 flex flex-col justify-between hover:border-white/[0.14] transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <span className="text-base font-bold text-white tracking-tight">
                    {study.company}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    Verified Customer
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{study.quote}"
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  — {study.speaker}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{study.impact}</span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  {study.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
