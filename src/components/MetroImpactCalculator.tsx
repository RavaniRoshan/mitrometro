import React, { useState } from 'react';
import { Calculator, Clock, ShieldCheck, ArrowRight, Zap, Train, WifiOff, Users } from 'lucide-react';

interface MetroImpactCalculatorProps {
  onBookDemo: () => void;
  onSignUp: () => void;
}

export const MetroImpactCalculator: React.FC<MetroImpactCalculatorProps> = ({ onBookDemo, onSignUp }) => {
  const [dailyRidership, setDailyRidership] = useState<number>(350000);
  const [dailyComplaints, setDailyComplaints] = useState<number>(120);
  const [avgHandlingMins, setAvgHandlingMins] = useState<number>(25);

  // Calculations
  const monthlyComplaints = dailyComplaints * 30;
  const hoursSpentManual = Math.round((monthlyComplaints * avgHandlingMins) / 60);
  const mttrSecondsWithMetroResolve = 4; // 4 seconds automated triage
  const hoursSavedMonthly = Math.round(hoursSpentManual * 0.94);
  const criticalIncidentsEscalatedUnder60s = Math.round(monthlyComplaints * 0.28);

  return (
    <section id="impact-calculator" className="py-24 bg-[#FAF8F5] border-t border-[#EAE4F5] text-[#200E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Inputs & Sliders */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#5423E7] font-extrabold font-mono mb-3">
                TRANSIT OPERATIONS IMPACT CALCULATOR
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#200E4A] tracking-tight leading-tight">
                Quantify your station’s triage speedup.
              </h2>
              <p className="mt-4 text-base text-[#59497A] leading-relaxed">
                Estimate how many hours your station controllers save each month when passenger grievances across Gujarati, Hindi, English, and Gujlish are automatically categorized, scored, and drafted on-device.
              </p>
            </div>

            <div className="space-y-6 rounded-2xl border border-[#D5CAEC] bg-white p-7 shadow-lg">
              {/* Slider 1: Daily Ridership */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#200E4A] font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#5423E7]" />
                    <span>Daily Metro Network Commuters</span>
                  </span>
                  <span className="font-mono text-[#5423E7] font-bold tabular-nums text-sm">
                    {dailyRidership.toLocaleString()} riders/day
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="50000"
                  value={dailyRidership}
                  onChange={(e) => setDailyRidership(Number(e.target.value))}
                  className="w-full accent-[#5423E7] cursor-pointer"
                />
              </div>

              {/* Slider 2: Daily complaints */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#200E4A] font-bold flex items-center gap-1.5">
                    <Train className="w-4 h-4 text-[#5423E7]" />
                    <span>Average Daily Passenger Inquiries & Grievances</span>
                  </span>
                  <span className="font-mono text-[#5423E7] font-bold tabular-nums text-sm">
                    {dailyComplaints} tickets/day
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={dailyComplaints}
                  onChange={(e) => setDailyComplaints(Number(e.target.value))}
                  className="w-full accent-[#5423E7] cursor-pointer"
                />
              </div>

              {/* Slider 3: Minutes per alert */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#200E4A] font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#5423E7]" />
                    <span>Manual Translation & Depot Routing Time</span>
                  </span>
                  <span className="font-mono text-[#5423E7] font-bold tabular-nums text-sm">
                    {avgHandlingMins} minutes/complaint
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={avgHandlingMins}
                  onChange={(e) => setAvgHandlingMins(Number(e.target.value))}
                  className="w-full accent-[#5423E7] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right: Big Impact Output Bento Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Metric 1 */}
              <div className="rounded-2xl border border-[#D5CAEC] bg-white p-6 shadow-md space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Mean Time to Triage</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#5423E7] tracking-tight font-mono">
                    {mttrSecondsWithMetroResolve}s
                  </span>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    99.7% reduction
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  From {avgHandlingMins} minutes manual triage down to 4 seconds instant on-device classification.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="rounded-2xl border border-[#D5CAEC] bg-white p-6 shadow-md space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Controller Hours Reclaimed</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#200E4A] tracking-tight font-mono">
                    {hoursSavedMonthly}h
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/ month</span>
                </div>
                <p className="text-xs text-slate-500">
                  Freeing station managers from manual translation into proactive passenger assistance.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="rounded-2xl border border-[#D5CAEC] bg-white p-6 shadow-md space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Critical Incidents Escalated</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-rose-600 tracking-tight font-mono">
                    {criticalIncidentsEscalatedUnder60s}
                  </span>
                  <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                    Score ≥ 65
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Elevator entrapment, fire alerts, and platform hazards routed with itemized reasons.
                </p>
              </div>

              {/* Metric 4 */}
              <div className="rounded-2xl border border-[#D5CAEC] bg-white p-6 shadow-md space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Zero Cloud Network Downtime</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight font-mono">
                    100%
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Offline PWA
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Service worker cached shell continues operating seamlessly during underground outages.
                </p>
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div className="rounded-2xl bg-[#5423E7] p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-base">Deploy MetroResolve in your concourse</h4>
                <p className="text-xs text-purple-100">
                  No hosted backend, no cloud database. Verified on Gandhinagar Terminal hardware.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={onBookDemo}
                  className="px-5 py-2.5 rounded-full bg-white text-[#5423E7] hover:bg-slate-100 text-xs font-extrabold uppercase tracking-wider transition-colors shadow"
                >
                  Book Demo
                </button>
                <button
                  onClick={onSignUp}
                  className="px-5 py-2.5 rounded-full border border-white/40 text-white hover:bg-white/10 text-xs font-extrabold uppercase tracking-wider transition-colors"
                >
                  Get PWA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
