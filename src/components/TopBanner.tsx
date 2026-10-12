import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TopBannerProps {
  onLearnMore?: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onLearnMore }) => {
  return (
    <div className="w-full bg-[#121624] border-b border-white/[0.08] text-xs text-slate-300 py-2.5 px-4 text-center relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20">
          New
        </span>
        <span className="text-white font-medium">
          Introducing Tines 3B:
        </span>
        <span className="text-slate-300 hidden sm:inline">
          The single, secure environment for every team’s AI agents, apps, and automation.
        </span>
        <button 
          onClick={onLearnMore}
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 decoration-emerald-500/40 ml-1"
        >
          <span>Explore the announcement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
