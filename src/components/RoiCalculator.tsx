import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenStudio: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenStudio }) => {
  const [weeklyAlerts, setWeeklyAlerts] = useState<number>(180);
  const [minutesPerAlert, setMinutesPerAlert] = useState<number>(35);
  const [hourlyRate, setHourlyRate] = useState<number>(85);

  // Calculations
  const annualAlerts = weeklyAlerts * 52;
  const annualHoursSpent = Math.round((annualAlerts * minutesPerAlert) / 60);
  const automationRate = 0.88; // 88% average automation in Tines
  const hoursSavedAnnual = Math.round(annualHoursSpent * automationRate);
  const dollarsSavedAnnual = Math.round(hoursSavedAnnual * hourlyRate);

  return (
    <section id="roi-calculator" className="py-24 border-t border-white/[0.08] bg-[#0A0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Inputs & Sliders */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
                BUSINESS IMPACT & ROI ESTIMATOR
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Quantify the value of automated SecOps
              </h2>
              <p className="mt-3 text-slate-300 text-sm">
                Estimate how many engineer hours and operational dollars your security team will reclaim each year by automating tier 1 & 2 alert triages with Tines.
              </p>
            </div>

            <div className="space-y-6 rounded-2xl border border-white/[0.08] bg-[#070A0F]/80 p-6">
              {/* Slider 1: Weekly alerts */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Weekly Security Incidents & Alerts</span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums text-sm">{weeklyAlerts} alerts/wk</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={weeklyAlerts}
                  onChange={(e) => setWeeklyAlerts(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Minutes per alert */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Average Manual Triage Duration</span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums text-sm">{minutesPerAlert} minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={minutesPerAlert}
                  onChange={(e) => setMinutesPerAlert(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Slider 3: Hourly Rate */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Average Security Engineer Hourly Cost</span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums text-sm">${hourlyRate}/hour</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right: Calculated Impact Card */}
          <div className="lg:col-span-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0F1E24] to-[#0A131C] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-emerald-500/20">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  PROJECTED ANNUAL VALUE
                </span>
                <span className="text-xs text-slate-400">
                  Based on 88% Automation Rate
                </span>
              </div>

              {/* Big Metric 1 */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">ANNUAL FINANCIAL SAVINGS</span>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums tracking-tight text-emerald-300">
                  ${dollarsSavedAnnual.toLocaleString()}
                </div>
              </div>

              {/* Big Metric 2 */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-500/20">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">ENGINEER HOURS RECLAIMED</span>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {hoursSavedAnnual.toLocaleString()} hrs
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-1">MTTR REDUCTION</span>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    -85.4%
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenStudio}
                  className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 emerald-glow-sm"
                >
                  <span>Build This Workflow in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
