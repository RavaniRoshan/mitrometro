import React from 'react';
import { ArrowRight, WifiOff, FileCheck, Layers, Sparkles } from 'lucide-react';

interface TinesFreedomSolutionProps {
  onExploreProduct?: () => void;
}

export const TinesFreedomSolution: React.FC<TinesFreedomSolutionProps> = ({ onExploreProduct }) => {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The Big Royal Purple Container */}
        <div className="rounded-3xl bg-[#5423E7] p-8 sm:p-14 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading + Whimsical Flowers Illustration */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-purple-200 font-extrabold font-mono mb-4">
                  OUR 100× TRANSIT SOLUTION
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                  Zero network lag.
                  <br />
                  Explainable urgency.
                  <br />
                  Localized empathy.
                </h2>
              </div>

              {/* Whimsical Illustrated Flower Garden */}
              <div className="relative pt-6">
                <div className="flex items-end gap-3 opacity-95">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-xs">
                      🌸
                    </div>
                    <div className="w-1 h-12 bg-emerald-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-300 border-2 border-white flex items-center justify-center text-xs">
                      🌼
                    </div>
                    <div className="w-1 h-16 bg-emerald-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-teal-300 border-2 border-white flex items-center justify-center text-xs">
                      🌻
                    </div>
                    <div className="w-1 h-10 bg-emerald-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-rose-400 border-2 border-white flex items-center justify-center text-xs">
                      🚇
                    </div>
                    <div className="w-1 h-20 bg-emerald-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-white flex items-center justify-center text-xs">
                      🌱
                    </div>
                    <div className="w-1 h-8 bg-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Capabilities Grid + Bottom Card */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* 1 */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Multilingual Script & Lexicon Triage
                  </h3>
                  <p className="text-sm text-purple-100 leading-relaxed opacity-90">
                    Accurate Gujarati, Hindi, English, and Romanized Gujlish classification with transparent script confidence notes.
                  </p>
                </div>

                {/* 2 */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Five Deterministic Queues
                  </h3>
                  <p className="text-sm text-purple-100 leading-relaxed opacity-90">
                    Instant routing into Safety, Cleanliness, Fare, Lifts, and Staff Behaviour with visible matched keywords shown per case.
                  </p>
                </div>

                {/* 3 */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Explainable 0–100 Urgency Scoring
                  </h3>
                  <p className="text-sm text-purple-100 leading-relaxed opacity-90">
                    Nine auditable rules (trapped person +50, fire +50, injury +40) with every single fired rule listed as a visible reason.
                  </p>
                </div>

                {/* 4 */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Auto-Drafted Native Language Replies
                  </h3>
                  <p className="text-sm text-purple-100 leading-relaxed opacity-90">
                    Pre-drafted, empathetic responses in Gujarati, Hindi, or English ready for station controller review. Always labelled *DRAFT*.
                  </p>
                </div>
              </div>

              {/* Bottom Card inside Purple Bento */}
              <div className="pt-8 border-t border-purple-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#200E4A] flex items-center justify-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p className="text-xs text-purple-100 font-medium max-w-sm">
                    MetroResolve powers subway concourses and terminal master consoles with honest idempotent sync.
                  </p>
                </div>

                <button
                  onClick={onExploreProduct}
                  className="px-5 py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-[#5423E7] font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
                >
                  EXPLORE OFFLINE PWA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
