import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Shield, Wrench, CreditCard, Sparkles, UserCheck } from 'lucide-react';

export const TinesTeamsUsing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safety' | 'lifts' | 'fare' | 'clean' | 'staff'>('lifts');
  const [viewMode, setViewMode] = useState<'queue' | 'detail'>('queue');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const sampleCases = [
    {
      id: 'SAMPLE-03',
      text: 'લિફ્ટ બગડી ગઈ છે અને વૃદ્ધ દાદી અંદર ફસાયેલા છે, જલ્દી કોઈને મોકલો!',
      lang: 'Gujarati (98% confidence)',
      category: 'Lifts',
      score: 70,
      severity: 'URGENT',
      reasons: ['person trapped (+50)', 'urgent exclamation (+20)'],
      keywords: ['લિફ્ટ (lift)', 'ફસાયેલા (trapped)', 'જલ્દી (urgent)'],
      draft: 'નમસ્તે, લિફ્ટમાં ફસાયેલ મુસાફર અંગેની તમારી ફરિયાદ મળી છે. સ્ટેશન કંટ્રોલર ટીમ અને ટેકનિશિયનને તાત્કાલિક સ્થળ પર મોકલવામાં આવ્યા છે. કૃપા કરીને ધીરજ રાખો. [DRAFT — not sent, not approved]'
    },
    {
      id: 'SAMPLE-07',
      text: 'Heavy smoke smell near Platform 2 electrical junction box, passengers alarmed.',
      lang: 'English (100% confidence)',
      category: 'Safety',
      score: 90,
      severity: 'CRITICAL',
      reasons: ['fire/smoke risk (+50)', 'electrical hazard (+40)'],
      keywords: ['smoke', 'electrical box', 'alarmed'],
      draft: 'Hello, your safety report regarding Platform 2 electrical smoke has been escalated directly to Station Emergency Command. Power supply is being isolated. [DRAFT — not sent, not approved]'
    },
    {
      id: 'SAMPLE-04',
      text: 'Automatic flap gate pe QR token tap kiya, gate khula nahi aur balance kat gaya.',
      lang: 'Hinglish / Hindi (89% confidence)',
      category: 'Fare',
      score: 30,
      severity: 'NORMAL',
      reasons: ['fare debit dispute (+30)'],
      keywords: ['flap gate', 'balance kat gaya', 'tap'],
      draft: 'नमस्ते, टोकन गेट पर बैलेंस कटने की शिकायत दर्ज कर ली गई है। कृपया कस्टमर केयर काउंटर 2 पर टिकट दिखाकर रिफंड प्राप्त करें। [DRAFT — not sent, not approved]'
    }
  ];

  const currentCase = sampleCases[selectedCaseIdx];

  const deptCards = [
    {
      id: 'safety' as const,
      name: 'Safety & Security',
      bg: 'bg-[#034D35]',
      desc: 'Fire hazards, track obstructions, crowd stampede alerts, platform screen door faults.'
    },
    {
      id: 'lifts' as const,
      name: 'Lifts & Escalators',
      bg: 'bg-[#0B2545]',
      desc: 'Elevator power failures, trapped passengers, escalator sudden stop injuries.'
    },
    {
      id: 'fare' as const,
      name: 'Fare & Smart Cards',
      bg: 'bg-[#008060]',
      desc: 'NCMC card double deductions, QR token gate failures, ticket counter recharge disputes.'
    },
    {
      id: 'clean' as const,
      name: 'Cleanliness & HVAC',
      bg: 'bg-[#C04810]',
      desc: 'Platform liquid spillages, coach air-conditioning suffocating heat, washroom sanitation.'
    },
    {
      id: 'staff' as const,
      name: 'Staff Behaviour',
      bg: 'bg-[#1E293B]',
      desc: 'Security guard misconduct, ticket examiner harassment, lost luggage assistance.'
    }
  ];

  return (
    <section id="teams-using" className="py-24 bg-[#FAF8F5] text-[#200E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kicker */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-[#5423E7] font-extrabold font-mono">
            FIVE SPECIALIZED TRANSIT QUEUES
          </p>
        </div>

        {/* Heading */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#200E4A] leading-tight">
            Route passenger grievances to the
            <br />
            exact depot team in real-time.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#59497A] leading-relaxed">
            Every passenger grievance is mapped to a verified operational queue with transparent matched keywords, explainable score calculations, and draft replies in the native script.
          </p>
        </div>

        {/* 5 Colored Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {deptCards.map(c => (
            <div
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`${c.bg} p-4 rounded-xl text-white cursor-pointer transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between ${
                activeTab === c.id ? 'ring-4 ring-[#5423E7]/40 ring-offset-2' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <h3 className="font-extrabold text-base mb-2">{c.name}</h3>
              <p className="text-xs text-white/90 leading-relaxed font-normal">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* The Forest Green Container with Split-Screen Triage Showcase */}
        <div className="rounded-2xl bg-[#006E52] border-2 border-[#00523C] p-4 sm:p-6 shadow-2xl">
          {/* Segmented Mode Switcher */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('queue')}
                className={`px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                  viewMode === 'queue'
                    ? 'bg-white text-[#006E52] shadow'
                    : 'bg-black/20 text-white/80 hover:text-white'
                }`}
              >
                LIVE QUEUE
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                  viewMode === 'detail'
                    ? 'bg-white text-[#006E52] shadow'
                    : 'bg-black/20 text-white/80 hover:text-white'
                }`}
              >
                EXPLAINABLE TRIAGE DETAIL
              </button>
            </div>

            <div className="flex gap-2">
              {sampleCases.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedCaseIdx(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                    selectedCaseIdx === idx
                      ? 'bg-emerald-300 text-slate-950 ring-2 ring-white'
                      : 'bg-black/30 text-emerald-100 hover:bg-black/40'
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          {/* Split Screen Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Console: Explainable NLP & Urgency Calculation */}
            <div className="lg:col-span-5 rounded-xl bg-[#004B37] border border-white/10 p-5 text-emerald-100 font-mono text-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[11px] text-emerald-300">
                  <span className="font-bold">TRIAGE REASONING ENGINE</span>
                  <span className="text-emerald-400 font-bold">{currentCase.id}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Original Passenger Text</span>
                    <p className="text-white text-xs font-semibold mt-1 bg-black/20 p-2 rounded">
                      "{currentCase.text}"
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Language Detection</span>
                    <span className="text-emerald-300 font-bold">{currentCase.lang}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Matched Keywords</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentCase.keywords.map((k, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-200 text-[10px]">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Fired Urgency Rules</span>
                    <ul className="mt-1 space-y-1 text-[11px] text-amber-300">
                      {currentCase.reasons.map((r, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span>+</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/30 border border-white/10 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>Calculated on-device: 0.12ms</span>
                <span className="font-bold text-white">Rule-Based Deterministic</span>
              </div>
            </div>

            {/* Right: Station Controller Decision Ticket & Reply Draft */}
            <div className="lg:col-span-7 rounded-xl bg-white p-5 text-[#200E4A] shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#200E4A]">{currentCase.id}</span>
                    <span className="px-2 py-0.5 rounded bg-[#EDE7F9] text-[#5423E7] font-bold text-xs">
                      Queue: {currentCase.category}
                    </span>
                  </div>
                  <div className={`px-2.5 py-1 rounded font-mono font-extrabold text-xs ${
                    currentCase.score >= 80 ? 'bg-rose-100 text-rose-800' :
                    currentCase.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Score: {currentCase.score} / 100 ({currentCase.severity})
                  </div>
                </div>

                {/* Draft Reply Area */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Auto-Drafted Native Language Reply (Editable)
                    </label>
                    <textarea
                      readOnly
                      rows={4}
                      value={currentCase.draft}
                      className="w-full p-3 rounded-xl bg-[#FAF8FE] border border-[#D5CAEC] text-xs font-medium text-[#200E4A] focus:outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
                    <span>Status: Outbox (saved locally, awaiting server acknowledgment)</span>
                    <span className="font-mono font-bold text-emerald-700">Idempotency Key: {currentCase.id}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Ready for station controller dispatch
                </span>
                <button className="px-4 py-2 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white font-bold text-xs shadow">
                  Save Local Response
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
