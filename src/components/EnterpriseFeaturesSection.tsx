import React from 'react';
import { ShieldCheck, Globe, Cpu, Zap, ArrowRight, Check } from 'lucide-react';

export const EnterpriseFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Born in security, built for the enterprise.',
      body: 'Governance, guardrails, and monitoring across every surface. Audit logs, SSO, RBAC, customer-managed keys, and private cloud VPC deployment options.',
      badge: 'SOC 2 Type II & ISO 27001'
    },
    {
      icon: Globe,
      title: 'Built for your most important workflows.',
      body: 'Trusted by the world’s most ambitious organizations. From Fortune 50 healthcare giants to high-growth tech innovators handling millions of daily actions.',
      badge: '99.99% Guaranteed SLA'
    },
    {
      icon: Cpu,
      title: 'Vendor-agnostic.',
      body: 'Work across your entire tech stack and within your infrastructure. Zero proprietary vendor lock-in. Connect to any REST API, webhook, or custom Python script.',
      badge: '100% REST Coverage'
    },
    {
      icon: Zap,
      title: 'Unmatched time to value.',
      body: 'Teams love Tines for speed, power, and ease of use. Build your first production workflow in less than 30 minutes, not 6-month consulting cycles.',
      badge: 'Fastest Deployment'
    }
  ];

  return (
    <section className="py-24 border-b border-white/[0.08] bg-[#070A0F]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 font-mono">
            PROVEN ENTERPRISE FOUNDATION
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Powerful workflows, proven success.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Tines is uniquely positioned — and proven — to be the single, secure environment for every team’s AI-native agents, apps, and automations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-[#0B0F19] p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feat.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Enterprise production grade</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
