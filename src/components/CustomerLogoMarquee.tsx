import React from 'react';

export const CustomerLogoMarquee: React.FC = () => {
  const logos = [
    'Databricks',
    'Reddit',
    'Snowflake',
    'Dropbox',
    'Pinterest',
    'MongoDB',
    'Sophos',
    'Canva',
    'McKesson',
    'Coinbase'
  ];

  return (
    <div className="py-12 border-y border-white/[0.08] bg-[#070A0F]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-mono">
          BUILT FOR YOUR MOST IMPORTANT WORKFLOWS. TRUSTED BY WORLD-CLASS TEAMS.
        </p>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Repeating logo row */}
        <div className="flex items-center gap-10 sm:gap-16 whitespace-nowrap animate-marquee px-4">
          {[...logos, ...logos, ...logos].map((name, index) => (
            <div
              key={index}
              className="text-base sm:text-lg font-bold tracking-tight text-slate-400 hover:text-white transition-colors cursor-default select-none flex items-center gap-2"
            >
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
