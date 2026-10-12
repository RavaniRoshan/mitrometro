import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Webhook, 
  FolderKanban, 
  CheckCircle2, 
  RefreshCw,
  ChevronRight,
  Cpu,
  Lock,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';

interface MarketingHeroProps {
  onOpenStudio: (templateId?: string) => void;
  onBookDemo?: () => void;
}

export const MarketingHero: React.FC<MarketingHeroProps> = ({ onOpenStudio, onBookDemo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const runSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 650);
    setTimeout(() => setActiveStep(3), 1350);
    setTimeout(() => setActiveStep(4), 2100);
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-[#070A0F]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-emerald-500/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-teal-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300 text-xs font-semibold mb-8 hover:bg-emerald-500/[0.12] transition-colors cursor-pointer group">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>New: Introducing Tines 3B</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Exact Live Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.07] text-balance">
            You told everyone to use AI.
            <br />
            <span className="text-slate-100">Now give them a secure place to do it.</span>
          </h1>

          {/* Exact Live Subheadline */}
          <p className="mt-7 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tines lets every team build. IT and Security maintain complete visibility, governance, and control.
          </p>

          {/* Exact CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenStudio('phishing-triage')}
              className="px-6 py-3.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-sm hover:bg-emerald-300 transition-all emerald-glow flex items-center gap-2 group shadow-lg"
            >
              <span>Sign up free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onBookDemo || (() => onOpenStudio('phishing-triage'))}
              className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white font-medium text-sm hover:bg-white/[0.08] transition-all backdrop-blur-md"
            >
              Book a demo
            </button>

            <button
              onClick={runSimulation}
              disabled={isPlaying}
              className="px-5 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] text-emerald-300 font-medium text-sm hover:bg-emerald-500/10 transition-all flex items-center gap-2"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isPlaying ? 'animate-pulse' : ''}`} />
              <span>{isPlaying ? 'Running Pipeline...' : 'Test AI Automation'}</span>
            </button>
          </div>
        </div>

        {/* Live Workspace UI Frame: "Your workspace" */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-white/[0.12] bg-[#0A0E18] p-4 sm:p-7 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Top Bar of Workspace Frame */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/70"></div>
              </div>
              <span className="text-xs font-semibold text-slate-200 ml-2">
                Your workspace
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                0:00 / 1:29
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isPlaying}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>Simulate Event</span>
              </button>

              <button
                onClick={() => onOpenStudio('phishing-triage')}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-all flex items-center gap-1"
              >
                <span>Full Studio Canvas</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="canvas-grid rounded-xl p-6 sm:p-10 border border-white/[0.06] relative min-h-[310px] bg-[#070A0F]/90">
            {/* SVG Connecting curves */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 190 90 C 270 90, 280 90, 350 90"
                fill="none"
                stroke={activeStep >= 2 ? '#10B981' : 'rgba(255,255,255,0.12)'}
                strokeWidth={activeStep >= 2 ? '2.5' : '1.5'}
                className="transition-all duration-300"
              />
              <path
                d="M 530 90 C 580 90, 600 90, 650 90"
                fill="none"
                stroke={activeStep >= 3 ? '#10B981' : 'rgba(255,255,255,0.12)'}
                strokeWidth={activeStep >= 3 ? '2.5' : '1.5'}
                className="transition-all duration-300"
              />
              <path
                d="M 830 90 C 880 90, 890 90, 940 90"
                fill="none"
                stroke={activeStep >= 4 ? '#10B981' : 'rgba(255,255,255,0.12)'}
                strokeWidth={activeStep >= 4 ? '2.5' : '1.5'}
                className="transition-all duration-300"
              />
            </svg>

            {/* 4 Connected Nodes */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              {/* Node 1 */}
              <div className={`p-4 rounded-xl border bg-[#0C1220] transition-all duration-300 ${
                activeStep >= 1 ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/40' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Webhook className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">INGESTION</span>
                    <h4 className="text-xs font-bold text-white">AI Gateway Trigger</h4>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                  <span>Claude Code / Agent Hook</span>
                  <div className="text-emerald-400 mt-0.5">{activeStep >= 1 ? 'Auth Verified' : 'Listening'}</div>
                </div>
              </div>

              {/* Node 2 */}
              <div className={`p-4 rounded-xl border bg-[#0C1220] transition-all duration-300 ${
                activeStep >= 2 ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/40' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">TINES AGENT</span>
                    <h4 className="text-xs font-bold text-white">Security Guardrail</h4>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                  <span>Sensitive Data Scan</span>
                  <div className="text-teal-300 mt-0.5">{activeStep >= 2 ? '0 API Keys Leaked' : 'Standby'}</div>
                </div>
              </div>

              {/* Node 3 */}
              <div className={`p-4 rounded-xl border bg-[#0C1220] transition-all duration-300 ${
                activeStep >= 3 ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/40' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">GOVERNANCE</span>
                    <h4 className="text-xs font-bold text-white">Policy Audit Check</h4>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                  <span>RBAC & SOC 2 Bounds</span>
                  <div className="text-indigo-300 mt-0.5">{activeStep >= 3 ? 'Policy Compliant' : 'Awaiting Data'}</div>
                </div>
              </div>

              {/* Node 4 */}
              <div className={`p-4 rounded-xl border bg-[#0C1220] transition-all duration-300 ${
                activeStep >= 4 ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/40' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">EXECUTION</span>
                    <h4 className="text-xs font-bold text-white">Production Deploy</h4>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                  <span>Live across enterprise</span>
                  <div className="text-emerald-400 mt-0.5">{activeStep >= 4 ? 'Deployed Safely' : 'Queued'}</div>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>GOVERNED AI WORKLOAD STATUS:</span>
                <span className="text-emerald-300 font-bold">100% VISIBLE & MONITORED</span>
              </div>
              <div className="text-slate-400">
                <span>LATENCY: <span className="text-white">18ms</span></span>
                <span className="mx-2">·</span>
                <span>ZERO DRIFT DETECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
