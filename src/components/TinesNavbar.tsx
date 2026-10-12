import React, { useState } from 'react';
import { ChevronDown, Search, Train, Github, ExternalLink } from 'lucide-react';

interface TinesNavbarProps {
  onBookDemo: () => void;
  onSignUp: () => void;
  onOpenSandbox?: () => void;
}

export const TinesNavbar: React.FC<TinesNavbarProps> = ({
  onBookDemo,
  onSignUp,
  onOpenSandbox
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE4F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Metro Transit Logo Icon in Royal Purple */}
            <div className="w-8 h-8 rounded-lg bg-[#5423E7] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Train className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#200E4A] flex items-center">
              metroresolve
              <span className="text-[#5423E7] text-xl font-mono ml-0.5">.</span>
            </span>
          </a>

          {/* Navigation Links with Chevron dropdowns */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#200E4A]">
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('platform')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#5423E7] transition-colors py-2">
                <span>Platform</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              {activeDropdown === 'platform' && (
                <div className="absolute top-full left-0 w-72 rounded-xl bg-white border border-[#EAE4F5] shadow-xl p-3 space-y-1 text-xs">
                  <a href="#workspace" className="block p-2 rounded-lg hover:bg-[#F5F2FC] font-semibold text-[#200E4A]">
                    Offline-First PWA Shell
                    <span className="block text-[11px] text-slate-500 font-normal">Runs completely on-device without internet</span>
                  </a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">
                    Multilingual NLP Classifier
                    <span className="block text-[11px] text-slate-500 font-normal">Gujarati, Hindi, English & Gujlish detection</span>
                  </a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">
                    Explainable Urgency Scoring
                    <span className="block text-[11px] text-slate-500 font-normal">0–100 scale with itemized rule reasons</span>
                  </a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">
                    Native Reply Drafter
                    <span className="block text-[11px] text-slate-500 font-normal">Editable localized response templates</span>
                  </a>
                </div>
              )}
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('queues')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#5423E7] transition-colors py-2">
                <span>Queues</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              {activeDropdown === 'queues' && (
                <div className="absolute top-full left-0 w-64 rounded-xl bg-white border border-[#EAE4F5] shadow-xl p-3 space-y-1 text-xs">
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] font-semibold text-[#200E4A]">Safety & Platform</a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">Lifts & Escalators</a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">Fare & Smart Cards</a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">Cleanliness & HVAC</a>
                  <a href="#teams-using" className="block p-2 rounded-lg hover:bg-[#F5F2FC] text-slate-700">Staff Behaviour</a>
                </div>
              )}
            </div>

            <a href="#impact-calculator" className="hover:text-[#5423E7] transition-colors">
              Impact
            </a>

            <a href="#architecture" className="hover:text-[#5423E7] transition-colors">
              Architecture
            </a>

            <a href="#customers" className="hover:text-[#5423E7] transition-colors">
              Transit Systems
            </a>

            <a 
              href="https://github.com/RavaniRoshan/metroresolve" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#5423E7] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a href="#footer" className="hover:text-[#5423E7] transition-colors">
              Docs & PS-07
            </a>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <a 
            href="https://github.com/RavaniRoshan/metroresolve"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-xs font-semibold text-[#200E4A] hover:text-[#5423E7] transition-colors"
          >
            Star on GitHub ★
          </a>

          <button 
            onClick={onSignUp}
            className="text-xs font-semibold text-[#200E4A] hover:text-[#5423E7] transition-colors"
          >
            Live App
          </button>

          {/* Exact solid purple capsule button: BOOK A DEMO */}
          <button
            onClick={onBookDemo}
            className="px-5 py-2.5 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
          >
            BOOK A DEMO
          </button>

          {/* Search Icon */}
          <button 
            title="Search"
            className="p-1.5 rounded-full text-[#200E4A] hover:bg-[#EAE4F5] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
