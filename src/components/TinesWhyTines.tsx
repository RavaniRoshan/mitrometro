import React from 'react';

export const TinesWhyTines: React.FC = () => {
  const cards = [
    {
      title: '100% Offline-First Architecture.',
      body: 'Service-worker shell cache stores the entire app. After one load, the triage workflow runs permanently with zero internet connection.',
      icon: (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-purple-900/60 flex items-center justify-center text-xl shadow-inner">
            📶
          </div>
          <div className="w-8 h-2 bg-purple-950/40 rounded-full mt-2" />
        </div>
      )
    },
    {
      title: 'Explainable Urgency Scoring.',
      body: '0–100 score calculated by transparent deterministic rules (fire hazard +50, trapped passenger +50). Zero black-box hallucinations.',
      icon: (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl border-2 border-white/40 bg-purple-900/60 flex items-center justify-center text-xl shadow-inner">
            ⚖️
          </div>
          <div className="w-8 h-2 bg-purple-950/40 rounded-full mt-2" />
        </div>
      )
    },
    {
      title: 'Honest Idempotent Sync.',
      body: 'Tickets reside in a local outbox. Sync transmits Idempotency-Key headers with backoff retries — preventing duplicated work orders.',
      icon: (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl border-2 border-white/40 bg-purple-900/60 flex items-center justify-center text-xl shadow-inner">
            🔄
          </div>
          <div className="w-8 h-2 bg-purple-950/40 rounded-full mt-2" />
        </div>
      )
    },
    {
      title: 'Zero Runtime Dependencies.',
      body: 'Runs seamlessly on any station PC, kiosk tablet, or Raspberry Pi. Zero external cloud APIs, zero database licensing, zero latency.',
      icon: (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-purple-900/60 flex items-center justify-center text-xl shadow-inner">
            ⚡
          </div>
          <div className="w-8 h-2 bg-purple-950/40 rounded-full mt-2" />
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] text-[#200E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header with Satellite Dish Illustration on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#5423E7] font-extrabold font-mono">
              WHY METRORESOLVE?
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#200E4A] leading-[1.08]">
              Engineered for the terminal,
              <br />
              trusted at rush hour.
            </h2>
            <p className="text-base sm:text-lg text-[#59497A] max-w-2xl leading-relaxed">
              MetroResolve is purpose-built for high-throughput transit hubs — functioning reliably on station hardware even when all network connectivity is lost.
            </p>
          </div>

          {/* Right: Whimsical Satellite / Transit Antenna Illustration */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-[#5423E7] bg-[#E8DEFF] relative flex items-center justify-center shadow-lg rotate-12">
                <div className="w-12 h-12 rounded-full border-2 border-[#5423E7] bg-[#5423E7] flex items-center justify-center text-white text-base">
                  🚇
                </div>
                <div className="absolute -top-3 -right-3 text-sm text-[#5423E7]">✦</div>
                <div className="absolute -top-6 right-4 text-xs text-[#5423E7]">✨</div>
                <div className="absolute top-2 -right-8 text-xs text-[#5423E7]">✦</div>
              </div>
              <div className="absolute bottom-0 right-10 w-2 h-14 bg-[#5423E7]" />
            </div>
          </div>
        </div>

        {/* 4 Vibrant Royal Purple Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#5423E7] p-7 text-white flex flex-col justify-between shadow-xl min-h-[320px] hover:translate-y-[-4px] transition-transform"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-purple-100/90 leading-relaxed">
                  {c.body}
                </p>
              </div>

              <div className="pt-8 flex justify-center">
                {c.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
