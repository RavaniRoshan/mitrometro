import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface BottomCTASectionProps {
  onOpenStudio: () => void;
  onBookDemo?: () => void;
}

export const BottomCTASection: React.FC<BottomCTASectionProps> = ({ onOpenStudio, onBookDemo }) => {
  return (
    <section className="py-24 border-b border-white/[0.08] bg-gradient-to-b from-[#070A0F] to-[#0A0F1A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Sign up today to get started or schedule time with our team to learn more.
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Build your first AI workflow in minutes. Join thousands of world-class security and IT teams automating with Tines.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenStudio}
              className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition-all emerald-glow flex items-center gap-2"
            >
              <span>Sign up free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookDemo || onOpenStudio}
              className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-sm transition-all"
            >
              Book a demo
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>Free community tier forever</span>
            <span aria-hidden="true">·</span>
            <span>No credit card required</span>
            <span aria-hidden="true">·</span>
            <span>Ready-to-use security templates</span>
          </div>
        </div>
      </div>
    </section>
  );
};
