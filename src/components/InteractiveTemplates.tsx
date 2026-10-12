import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { Search, ArrowRight, Shield, Zap, Sparkles, Clock, ExternalLink } from 'lucide-react';

interface InteractiveTemplatesProps {
  onLoadTemplate: (templateId: string) => void;
}

export const InteractiveTemplates: React.FC<InteractiveTemplatesProps> = ({ onLoadTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Incident Response', 'Cloud Security', 'Identity & Access'];

  // Extended catalog for marketing depth
  const allTemplates = [
    ...TEMPLATES,
    {
      id: 'k8s-pod-quarantine',
      title: 'Kubernetes Pod Security Violation Isolation',
      category: 'Cloud Security' as const,
      description: 'Detect container runtime escape indicators, cordon node, isolate infected pod network namespace, and dump memory forensics.',
      estimatedTimeSave: '50 mins / breach',
      nodes: TEMPLATES[1].nodes,
      edges: TEMPLATES[1].edges,
      samplePayload: { cluster: 'prod-us-west-2', namespace: 'checkout-service', alert: 'CVE-2026-RemoteExecution' }
    },
    {
      id: 'darkweb-credential-leak',
      title: 'Dark Web Corporate Credential Dump Ingestion',
      category: 'Threat Detection' as const,
      description: 'Ingest daily threat intelligence breach feeds, match against employee hashes, trigger mandatory password resets via Okta.',
      estimatedTimeSave: '35 mins / feed',
      nodes: TEMPLATES[0].nodes,
      edges: TEMPLATES[0].edges,
      samplePayload: { leak_source: 'Underground Telegram Forum', compromised_domains: ['enterprise.io'] }
    }
  ];

  const filteredTemplates = allTemplates.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="templates" className="py-24 border-t border-white/[0.08] bg-[#070A0F]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
              PRE-BUILT AUTOMATION LIBRARY
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Start with battle-tested security stories
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-xl">
              Import industry standard incident response playbooks created by top security researchers. Run them out of the box or customize them to your stack.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 400+ stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-2xl border border-white/[0.08] bg-[#0C111D] p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-[#0E1524] transition-all group relative"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
                  <span className="font-mono text-emerald-400 text-[11px]">{template.category}</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>Saves {template.estimatedTimeSave}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                  {template.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {template.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <span>{template.nodes.length} Actions</span>
                  <span aria-hidden="true">·</span>
                  <span>100% Automated</span>
                </div>

                <button
                  onClick={() => onLoadTemplate(template.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-semibold text-xs border border-emerald-500/30 transition-all flex items-center gap-1.5"
                >
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
