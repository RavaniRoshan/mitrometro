import React from 'react';
import { WifiOff, AlertTriangle, Train, FileText } from 'lucide-react';

export const TinesNewReality: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] text-[#200E4A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kicker */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-[#5423E7] font-extrabold font-mono">
            THE NEW REALITY FOR METRO OPERATIONS
          </p>
        </div>

        {/* H2 Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#200E4A] leading-[1.12]">
            Commuters switch dialects
            <br />
            mid-sentence.
            <br />
            <span className="text-[#5423E7]">And underground stations have zero network.</span>
          </h2>
        </div>

        {/* Whimsical Retro CRT Concourse Monitors and Cable Knot Illustration Area */}
        <div className="relative max-w-4xl mx-auto my-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Illustrated Station Monitor */}
          <div className="hidden sm:flex flex-col items-center gap-4 relative">
            <div className="w-36 h-28 rounded-2xl border-2 border-[#5423E7] bg-[#E8DEFF] p-2 shadow-md relative">
              <div className="w-full h-full rounded-xl border border-[#5423E7]/40 bg-[#D4C3FA] flex items-center justify-center p-2">
                <div className="w-full space-y-1.5">
                  <div className="h-1.5 w-3/4 bg-[#5423E7] rounded-full" />
                  <div className="h-1.5 w-1/2 bg-[#5423E7]/60 rounded-full" />
                  <div className="h-1.5 w-full bg-[#5423E7]/40 rounded-full" />
                </div>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#5423E7]" />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#5423E7]" />
            </div>

            <div className="w-28 h-20 rounded-2xl border-2 border-[#5423E7] bg-[#FFE0EB] p-2 shadow-sm -mt-2">
              <div className="w-full h-full rounded-xl bg-[#FCD0DE] flex items-center justify-center text-center p-1">
                <span className="text-[10px] font-mono text-[#E11D48] font-bold">Gujlish Chat / SMS</span>
              </div>
            </div>
          </div>

          {/* Center: The Whimsical Transit Knot / Rail Mascot */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="w-24 h-24 rounded-full border-4 border-[#5423E7] bg-[#EDE5FC] flex items-center justify-center relative shadow-lg">
              <div className="w-16 h-16 rounded-full border-4 border-dashed border-[#10B981] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#5423E7] flex items-center justify-center text-white font-bold text-xs">
                  ⚡
                </div>
              </div>
              <div className="absolute -bottom-4 w-12 h-6 border-b-4 border-l-4 border-[#5423E7] rounded-bl-xl" />
              <div className="absolute -top-4 w-12 h-6 border-t-4 border-r-4 border-[#5423E7] rounded-tr-xl" />
            </div>
            <span className="mt-4 text-[11px] font-mono text-[#5423E7] font-bold uppercase tracking-wider">
              100% On-Device NLP
            </span>
          </div>

          {/* Right Illustrated Offline Station PC */}
          <div className="hidden sm:flex flex-col items-center gap-4 relative">
            <div className="w-36 h-28 rounded-2xl border-2 border-[#5423E7] bg-[#DCFCE7] p-2 shadow-md relative">
              <div className="w-full h-full rounded-xl border border-[#059669]/40 bg-[#BBF7D0] flex items-center justify-center p-2">
                <div className="w-full space-y-1.5">
                  <div className="h-1.5 w-1/2 bg-[#059669] rounded-full" />
                  <div className="h-1.5 w-full bg-[#059669]/60 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-[#059669]/40 rounded-full" />
                </div>
              </div>
              <div className="absolute -top-7 right-2 w-6 h-6 border-2 border-[#5423E7] rounded-full bg-white flex items-center justify-center text-[10px]">
                🚇
              </div>
            </div>

            <div className="w-28 h-20 rounded-2xl border-2 border-[#5423E7] bg-[#FEF3C7] p-2 shadow-sm -mt-2">
              <div className="w-full h-full rounded-xl bg-[#FDE68A] flex items-center justify-center text-center p-1">
                <span className="text-[10px] font-mono text-[#D97706] font-bold">Offline Cache Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Prose */}
        <div className="max-w-2xl mx-auto text-center space-y-6 text-[#59497A] text-base sm:text-lg leading-relaxed">
          <p>
            In underground terminal concourses and peak rush hours, cloud-only ticketing portals fail when internet drops. Commuters submit urgent SOS alerts in Gujarati, Hindi, English, and Romanized Gujlish.
          </p>
          <p className="font-semibold text-[#200E4A]">
            None of these emergencies can wait for a server reconnect. When a passenger is trapped in an elevator or an AFC gate is jammed, station controllers need instant, explainable, on-device intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};
