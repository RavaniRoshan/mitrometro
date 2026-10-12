import React, { useState } from 'react';
import { ChevronDown, Play, Sparkles, ArrowRight, Layers, Shield, Database, Cpu, Activity, ExternalLink, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'marketing' | 'studio';
  onViewChange: (view: 'marketing' | 'studio') => void;
  onBookDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onBookDemo
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070A0F]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with Official Tines Icon */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={() => onViewChange('marketing')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none"
          >
            {/* Exact Tines Geometric Icon */}
            <svg 
              className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors"
              viewBox="0 0 48 48" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M17.6641 0C11.9485 0 6.89478 3.68623 5.18424 9.10302L0.47998 24L5.18424 38.897C6.89479 44.3138 11.9485 48 17.6641 48H30.3358C36.0515 48 41.1052 44.3138 42.8157 38.897L47.52 24L42.8157 9.10302C41.1052 3.68623 36.0515 0 30.3358 0H17.6641ZM30.336 3.74451C34.4042 3.74451 38.0012 6.36822 39.2187 10.2237L40.372 13.8759C38.0518 11.9723 35.1137 10.9008 32.0429 10.9006L15.9228 10.9002C12.8726 10.9004 9.9534 11.9575 7.64056 13.8372L8.78167 10.2237C9.99917 6.36822 13.5962 3.74451 17.6643 3.74451H30.336ZM8.51076 18.2979L5.58159 22.1278L42.3838 22.1278L39.4549 18.2983C37.6948 15.9969 34.9524 14.6453 32.0426 14.6451H15.835C12.958 14.6723 10.2531 16.0197 8.51076 18.2979ZM42.3778 25.8723L39.4547 29.6983C37.6944 32.0023 34.9501 33.3555 32.0381 33.3553L15.9271 33.3548C13.0152 33.3551 10.2708 32.0019 8.51056 29.6979L5.58776 25.8723L42.3778 25.8723ZM8.78145 37.7763C9.99894 41.6318 13.5959 44.2555 17.6641 44.2555H30.3358C34.404 44.2555 38.001 41.6318 39.2185 37.7763L40.3726 34.1214C38.0514 36.0273 35.111 37.1 32.0378 37.0998L15.9274 37.0994C12.8747 37.0996 9.9531 36.0412 7.63915 34.159L8.78145 37.7763Z" 
              />
            </svg>
            <span className="text-2xl font-bold tracking-tight text-white flex items-baseline">
              tines
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links Matching Live Site */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {/* Product Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('product')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
              <span>Product</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'product' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'product' && (
              <div className="absolute top-full left-0 w-80 rounded-2xl border border-white/[0.1] bg-[#0A0F1A] p-4 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150 space-y-2">
                <a href="#hero" onClick={() => onViewChange('marketing')} className="p-2.5 rounded-xl hover:bg-white/[0.04] flex items-start gap-3 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-emerald-300">Tines 3B</span>
                    <span className="text-[11px] text-slate-400">AI agents, apps and automation in one secure environment</span>
                  </div>
                </a>

                <a href="#workflows-section" onClick={() => onViewChange('marketing')} className="p-2.5 rounded-xl hover:bg-white/[0.04] flex items-start gap-3 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-teal-300">Stories & Canvas</span>
                    <span className="text-[11px] text-slate-400">Visual drag-and-drop orchestration</span>
                  </div>
                </a>

                <a href="#cases-pages" onClick={() => onViewChange('marketing')} className="p-2.5 rounded-xl hover:bg-white/[0.04] flex items-start gap-3 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-indigo-300">Cases & Pages</span>
                    <span className="text-[11px] text-slate-400">Collaborative records and self-service UI forms</span>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('solutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
              <span>Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'solutions' && (
              <div className="absolute top-full left-0 w-80 rounded-2xl border border-white/[0.1] bg-[#0A0F1A] p-4 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150 space-y-2">
                <a href="#departments" onClick={() => onViewChange('marketing')} className="p-2.5 rounded-xl hover:bg-white/[0.04] flex items-start gap-3 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-rose-300">Security Operations (SOC)</span>
                    <span className="text-[11px] text-slate-400">Phishing triage, threat intel, SOAR & incident escalation</span>
                  </div>
                </a>

                <a href="#departments" onClick={() => onViewChange('marketing')} className="p-2.5 rounded-xl hover:bg-white/[0.04] flex items-start gap-3 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-cyan-300">IT Infrastructure</span>
                    <span className="text-[11px] text-slate-400">MCP gateway, automated offboarding, API lifecycle</span>
                  </div>
                </a>
              </div>
            )}
          </div>

          <a href="#customers" onClick={() => onViewChange('marketing')} className="hover:text-white transition-colors">
            Customers
          </a>

          <a href="#discover" onClick={() => onViewChange('marketing')} className="hover:text-white transition-colors">
            Discover
          </a>

          <a href="#pricing" onClick={() => onViewChange('marketing')} className="hover:text-white transition-colors">
            Pricing
          </a>
        </nav>

        {/* Zone 3: Exact Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Studio Toggle (Special sandbox feature requested) */}
          <button
            onClick={() => onViewChange(currentView === 'marketing' ? 'studio' : 'marketing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              currentView === 'studio'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                : 'bg-white/[0.04] border-white/[0.08] text-emerald-400 hover:bg-white/[0.08]'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden sm:inline">
              {currentView === 'studio' ? 'Exit Studio' : 'Interactive Sandbox'}
            </span>
          </button>

          <a 
            href="https://login.tines.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-xs font-medium text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            Log in
          </a>

          <button
            onClick={() => {
              if (onBookDemo) onBookDemo();
              else onViewChange('studio');
            }}
            className="hidden md:inline-flex px-3.5 py-2 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-all"
          >
            Book a demo
          </button>

          <button
            onClick={() => onViewChange('studio')}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all emerald-glow-sm flex items-center gap-1.5"
          >
            <span>Sign up free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 border-t border-white/[0.08] bg-[#070A0F] space-y-3">
          <a href="#hero" onClick={() => { onViewChange('marketing'); setMobileMenuOpen(false); }} className="block py-2 text-sm text-slate-200">Product</a>
          <a href="#departments" onClick={() => { onViewChange('marketing'); setMobileMenuOpen(false); }} className="block py-2 text-sm text-slate-200">Solutions</a>
          <a href="#customers" onClick={() => { onViewChange('marketing'); setMobileMenuOpen(false); }} className="block py-2 text-sm text-slate-200">Customers</a>
          <a href="#pricing" onClick={() => { onViewChange('marketing'); setMobileMenuOpen(false); }} className="block py-2 text-sm text-slate-200">Pricing</a>
          <div className="pt-2 border-t border-white/[0.08] flex gap-2">
            <button onClick={() => { onViewChange('studio'); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs">
              Launch Studio Sandbox
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
