import React, { useState } from 'react';
import { TinesNavbar } from './components/TinesNavbar';
import { TinesHero } from './components/TinesHero';
import { TinesNewReality } from './components/TinesNewReality';
import { TinesFreedomSolution } from './components/TinesFreedomSolution';
import { TinesTeamsUsing } from './components/TinesTeamsUsing';
import { MetroImpactCalculator } from './components/MetroImpactCalculator';
import { TinesWhyTines } from './components/TinesWhyTines';
import { ArchitectureValidationSection } from './components/ArchitectureValidationSection';
import { TinesStartToday } from './components/TinesStartToday';
import { TinesFooter } from './components/TinesFooter';
import { X, CheckCircle2, Send, Calendar, Train, Github, WifiOff, Copy } from 'lucide-react';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleBookDemo = () => {
    setDemoSubmitted(false);
    setDemoModalOpen(true);
  };

  const handleSignUp = () => {
    setSignUpModalOpen(true);
  };

  const copyCloneCmd = () => {
    navigator.clipboard.writeText('git clone https://github.com/RavaniRoshan/metroresolve.git && cd metroresolve && npm install && npm run dev');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#200E4A] flex flex-col font-sans selection:bg-[#5423E7]/20 selection:text-[#5423E7]">
      {/* 1. Official Header */}
      <TinesNavbar
        onBookDemo={handleBookDemo}
        onSignUp={handleSignUp}
      />

      <main className="flex-1">
        {/* 2. Hero: Headline, Subheadline, Buttons, Logos, Arches, and Live Interactive Console */}
        <TinesHero
          onBookDemo={handleBookDemo}
          onSignUp={handleSignUp}
        />

        {/* 3. The New Reality: Commuters switch dialects mid-sentence. And underground stations have zero network. */}
        <TinesNewReality />

        {/* 4. The Giant Purple Bento Box: Zero network lag. Explainable urgency. Localized empathy. */}
        <TinesFreedomSolution
          onExploreProduct={handleSignUp}
        />

        {/* 5. Teams Using MetroResolve: 5 Specialized Transit Queues + Interactive Showcase */}
        <TinesTeamsUsing />

        {/* 6. Transit Operations Impact & MTTR Calculator */}
        <MetroImpactCalculator
          onBookDemo={handleBookDemo}
          onSignUp={handleSignUp}
        />

        {/* 7. Why MetroResolve: Engineered for the terminal floor, trusted at rush hour + 4 Purple Cards */}
        <TinesWhyTines />

        {/* 8. Architecture & 33-Check Automated Verification Suite */}
        <ArchitectureValidationSection />

        {/* 9. Giant Typography: Start today + START FREE ON-DEVICE & BOOK TRANSIT DEMO */}
        <TinesStartToday
          onSignUp={handleSignUp}
          onBookDemo={handleBookDemo}
        />

        {/* 10. Exact Footer with Developer Links, Honesty Labels, and Ask AI */}
        <TinesFooter />
      </main>

      {/* Book a Transit Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-[#EAE4F5] p-6 shadow-2xl">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#200E4A]"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#200E4A]">Transit Walkthrough Scheduled!</h3>
                <p className="text-xs text-slate-500">
                  Our transit operations team will contact <strong>{demoEmail || 'your email'}</strong> with offline PWA deployment scripts and station controller benchmarks.
                </p>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-[#5423E7] text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-[#5423E7]">
                  <Train className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-[#200E4A]">Book a Metro Operations Demo</h3>
                </div>
                <p className="text-xs text-[#59497A]">
                  Experience offline-first complaint triage on station hardware across Gujarati, Hindi, and English.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#200E4A] mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="controller@metro-operations.in"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAEC] text-xs focus:outline-none focus:border-[#5423E7] text-[#200E4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#200E4A] mb-1">Transit Organization</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAEC] text-xs focus:outline-none focus:border-[#5423E7] text-[#200E4A]">
                    <option>Gujarat Metro Rail Corporation (GMRC)</option>
                    <option>Delhi Metro Rail Corporation (DMRC)</option>
                    <option>Maha Metro / Mumbai Metro</option>
                    <option>Bengaluru Namma Metro</option>
                    <option>Other Urban Rail / Transit Agency</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Station Demo</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Start Free On-Device Modal */}
      {signUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#EAE4F5] p-6 shadow-2xl text-left space-y-4">
            <button
              onClick={() => setSignUpModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#200E4A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#EDE5FC] text-[#5423E7] flex items-center justify-center text-xl font-bold">
              <WifiOff className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#200E4A]">Deploy MetroResolve On-Device</h3>
            <p className="text-xs text-[#59497A] leading-relaxed">
              Zero hosted backend, zero cloud database, zero runtime dependencies. The entire workflow runs offline in the browser after the first load.
            </p>

            <div className="rounded-xl bg-[#0E0624] p-3 text-slate-200 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Quickstart Terminal Command:</span>
                <button
                  onClick={copyCloneCmd}
                  className="flex items-center gap-1 text-[#5423E7] hover:text-white font-semibold"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedCmd ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2 rounded bg-black/40 text-emerald-400 overflow-x-auto select-all">
                git clone https://github.com/RavaniRoshan/metroresolve.git && cd metroresolve && npm install && npm run dev
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://github.com/RavaniRoshan/metroresolve"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Open GitHub Repository (RavaniRoshan/metroresolve)</span>
              </a>
              <button
                onClick={() => setSignUpModalOpen(false)}
                className="w-full py-2.5 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
