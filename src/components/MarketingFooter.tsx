import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070B] text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Security */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 w-3.5 h-3.5">
                  <span className="w-1 h-1 rounded-sm bg-emerald-400"></span>
                  <span className="w-1 h-1 rounded-sm bg-emerald-300"></span>
                  <span className="w-1 h-1 rounded-sm bg-emerald-500"></span>
                  <span className="w-1 h-1 rounded-sm bg-emerald-400"></span>
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center">
                tines<span className="text-emerald-400">.</span>
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              The smart workflow platform. Automate complex cybersecurity operations, build interactive pages, and investigate incidents faster.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                SOC 2 Type II Certified
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                ISO 27001 Certified
              </span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#workflows-section" className="hover:text-white transition-colors">Workflows</a></li>
              <li><a href="#cases-pages" className="hover:text-white transition-colors">Cases</a></li>
              <li><a href="#cases-pages" className="hover:text-white transition-colors">Pages</a></li>
              <li><a href="#workflows-section" className="hover:text-white transition-colors">AI Agents</a></li>
              <li><a href="#workflows-section" className="hover:text-white transition-colors">Python Sandbox</a></li>
              <li><a href="#workflows-section" className="hover:text-white transition-colors">Credential Vault</a></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#templates" className="hover:text-white transition-colors">Phishing Triage</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Incident Escalation</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Vulnerability Management</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Cloud SecOps</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">IT Provisioning</a></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#templates" className="hover:text-white transition-colors">Story Library</a></li>
              <li><a href="#roi-calculator" className="hover:text-white transition-colors">Value Calculator</a></li>
              <li><a href="#customers" className="hover:text-white transition-colors">Customer Stories</a></li>
              <li><a href="#customers" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#customers" className="hover:text-white transition-colors">Security Center</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Tines Security Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security & Trust</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
