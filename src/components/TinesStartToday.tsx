import React from 'react';

interface TinesStartTodayProps {
  onSignUp: () => void;
  onBookDemo: () => void;
}

export const TinesStartToday: React.FC<TinesStartTodayProps> = ({ onSignUp, onBookDemo }) => {
  return (
    <section className="py-28 bg-[#FAF8F5] text-center text-[#200E4A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Giant Whimsical "Start today" Lettering with whimsical flying helpers */}
        <div className="relative inline-block mx-auto mb-8">
          <div className="absolute -top-10 -left-6 sm:-left-12 text-2xl sm:text-4xl animate-bounce">
            🚇
          </div>
          <div className="absolute -top-10 -right-6 sm:-right-12 text-2xl sm:text-4xl animate-pulse">
            🪐
          </div>

          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-[#200E4A] select-none leading-none">
            <span className="bg-gradient-to-r from-[#5423E7] via-[#9333EA] to-[#E11D48] bg-clip-text text-transparent">
              Start today
            </span>
          </h2>

          <div className="absolute -bottom-4 left-1/4 text-xl">
            ✨
          </div>
          <div className="absolute -bottom-4 right-1/4 text-xl">
            ✦
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#59497A] max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Equip your station controllers with on-device
          <br />
          complaint triage or schedule a live transit walkthrough.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onSignUp}
            className="px-8 py-3.5 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg"
          >
            START FREE ON-DEVICE
          </button>
          <button
            onClick={onBookDemo}
            className="px-8 py-3.5 rounded-full border border-[#5423E7] hover:bg-[#5423E7]/5 text-[#5423E7] text-xs font-extrabold uppercase tracking-wider transition-all"
          >
            BOOK TRANSIT DEMO
          </button>
        </div>
      </div>
    </section>
  );
};
