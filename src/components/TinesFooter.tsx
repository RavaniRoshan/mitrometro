import React from 'react';
import { ExternalLink, Train, Github } from 'lucide-react';

export const TinesFooter: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#FAF8F5] border-t border-[#EAE4F5] text-[#59497A] text-xs py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20 text-[11px] leading-relaxed">
          {/* Col 1: PLATFORM */}
          <div className="space-y-4">
            <h4 className="font-extrabold uppercase tracking-wider text-[#200E4A]">PLATFORM</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#5423E7] transition-colors font-semibold text-[#200E4A]">Offline-First PWA</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Multilingual NLP Engine</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Urgency Scoring (0–100)</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Native Reply Drafter</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Local Outbox & Sync</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Local Ollama Adapter</a></li>
            </ul>
          </div>

          {/* Col 2: TRANSIT QUEUES */}
          <div className="space-y-4">
            <h4 className="font-extrabold uppercase tracking-wider text-[#200E4A]">TRANSIT QUEUES</h4>
            <ul className="space-y-2">
              <li><a href="#teams-using" className="hover:text-[#5423E7] transition-colors font-semibold text-[#200E4A]">Safety & Platform Hazards</a></li>
              <li><a href="#teams-using" className="hover:text-[#5423E7] transition-colors">Lifts & Escalators</a></li>
              <li><a href="#teams-using" className="hover:text-[#5423E7] transition-colors">Fare & Automatic Flap Gates</a></li>
              <li><a href="#teams-using" className="hover:text-[#5423E7] transition-colors">Cleanliness & Coach HVAC</a></li>
              <li><a href="#teams-using" className="hover:text-[#5423E7] transition-colors">Staff Behaviour & Assistance</a></li>
            </ul>
          </div>

          {/* Col 3: DEVELOPERS */}
          <div className="space-y-4">
            <h4 className="font-extrabold uppercase tracking-wider text-[#200E4A]">DEVELOPERS</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/RavaniRoshan/metroresolve" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#5423E7] transition-colors font-semibold text-[#200E4A] flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub Repository ↗</span>
                </a>
              </li>
              <li><a href="https://github.com/RavaniRoshan/metroresolve/blob/main/docs/requirements.md" target="_blank" rel="noreferrer" className="hover:text-[#5423E7] transition-colors">Requirements Spec</a></li>
              <li><a href="https://github.com/RavaniRoshan/metroresolve/blob/main/docs/design.md" target="_blank" rel="noreferrer" className="hover:text-[#5423E7] transition-colors">Architecture & Design</a></li>
              <li><a href="https://github.com/RavaniRoshan/metroresolve/blob/main/docs/validation.md" target="_blank" rel="noreferrer" className="hover:text-[#5423E7] transition-colors">33-Check Validation Suite</a></li>
              <li><a href="https://github.com/RavaniRoshan/metroresolve/blob/main/docs/submission.md" target="_blank" rel="noreferrer" className="hover:text-[#5423E7] transition-colors">Metro Hacks PS-07 Submission</a></li>
            </ul>
          </div>

          {/* Col 4: COMMUNITY & TRANSIT */}
          <div className="space-y-4">
            <h4 className="font-extrabold uppercase tracking-wider text-[#200E4A]">TRANSIT PARTNERS</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Gujarat Metro Rail Corp</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Urban Metro Systems</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">DevFest Gandhinagar</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Open Transit Intelligence</a></li>
              <li><a href="#" className="hover:text-[#5423E7] transition-colors">Station Controller Forum</a></li>
            </ul>
          </div>

          {/* Col 5: HONESTY & ETHICS */}
          <div className="space-y-4">
            <h4 className="font-extrabold uppercase tracking-wider text-[#200E4A]">HONESTY LABELS</h4>
            <ul className="space-y-2">
              <li className="text-[10px] text-slate-500">All demo data is synthetic passenger complaints.</li>
              <li className="text-[10px] text-slate-500">Urgency scores are on-device decision support.</li>
              <li className="text-[10px] text-slate-500">Draft replies are templates, never sent automatically.</li>
              <li className="text-[10px] text-slate-500">Zero telemetry, zero user tracking, 100% on-device.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#EAE4F5] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#59497A]">
          <div className="flex items-center gap-2 font-medium">
            <Train className="w-4 h-4 text-[#5423E7]" />
            <span className="font-bold text-[#200E4A]">© MetroResolve</span>
            <span className="text-slate-400">· Every Complaint Heard — Metro Operations (PS-07)</span>
          </div>

          {/* ASK AI ABOUT METRORESOLVE */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold uppercase tracking-wider text-[#200E4A] text-[10px]">
              ASK AI ABOUT METRORESOLVE
            </span>
            <div className="flex items-center gap-2 text-base">
              <a href="https://www.google.com/search?q=What+is+MetroResolve+offline-first+complaint+triage" target="_blank" rel="noreferrer" title="Gemini" className="hover:scale-110 transition-transform">
                ✨
              </a>
              <a href="https://www.perplexity.ai/search?q=What+is+MetroResolve+offline-first" target="_blank" rel="noreferrer" title="Perplexity" className="hover:scale-110 transition-transform">
                ✳️
              </a>
              <a href="https://chatgpt.com/?q=What+is+MetroResolve+transit+triage" target="_blank" rel="noreferrer" title="ChatGPT" className="hover:scale-110 transition-transform">
                🌐
              </a>
              <a href="https://grok.com/?q=What+is+MetroResolve" target="_blank" rel="noreferrer" title="Grok" className="hover:scale-110 transition-transform">
                ⚡
              </a>
            </div>
          </div>

          <div>
            <button className="hover:text-[#5423E7] transition-colors">
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
