import React from 'react';
import { ExternalLink, ShieldCheck, Lock, Sparkles } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070B] text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Col 1: Platform & 3B */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Tines 3B</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white transition-colors">Tines 3B Overview</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Examples gallery</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Product updates</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Stories & Storyboard</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Cases</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Workbench</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Agents</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Monitoring</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Template Library</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">University</a></li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#departments" className="hover:text-white transition-colors">Security Operations</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">AI SOC</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">SOAR & Automation</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">GRC & Compliance</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Threat intelligence</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Vulnerability management</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">IT as a business enabler</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Infrastructure management</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Financial services</a></li>
            </ul>
          </div>

          {/* Col 3: Discover */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Discover</h4>
            <ul className="space-y-2">
              <li><a href="#customers" className="hover:text-white transition-colors">Customers</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Guides & Tutorials</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Podcast</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Events & Webinars</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Bootcamps</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Newsroom</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Brand assets</a></li>
            </ul>
          </div>

          {/* Col 5: Trust, Security & Ask AI */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Trust & Security</h4>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-white transition-colors">Trust center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security best practices</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Notice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DPA & Subprocessors</a></li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/[0.06] space-y-2">
              <span className="text-white font-medium block text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Ask AI about Tines
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
                <a 
                  href="https://www.google.com/search?q=What+is+Tines+automation+and+AI+agents" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Gemini
                </a>
                <a 
                  href="https://www.perplexity.ai/search?q=What+is+Tines+automation" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Perplexity
                </a>
                <a 
                  href="https://chatgpt.com/?q=What+is+Tines+smart+workflow+platform" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  ChatGPT
                </a>
                <a 
                  href="https://grok.com/?q=What+is+Tines" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Grok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Exact Tines SVG Icon & Copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex items-center gap-3">
            {/* Exact Tines SVG */}
            <svg 
              className="w-6 h-6 text-emerald-400" 
              viewBox="0 0 48 48" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M17.6641 0C11.9485 0 6.89478 3.68623 5.18424 9.10302L0.47998 24L5.18424 38.897C6.89479 44.3138 11.9485 48 17.6641 48H30.3358C36.0515 48 41.1052 44.3138 42.8157 38.897L47.52 24L42.8157 9.10302C41.1052 3.68623 36.0515 0 30.3358 0H17.6641ZM30.336 3.74451C34.4042 3.74451 38.0012 6.36822 39.2187 10.2237L40.372 13.8759C38.0518 11.9723 35.1137 10.9008 32.0429 10.9006L15.9228 10.9002C12.8726 10.9004 9.9534 11.9575 7.64056 13.8372L8.78167 10.2237C9.99917 6.36822 13.5962 3.74451 17.6643 3.74451H30.336ZM8.51076 18.2979L5.58159 22.1278L42.3838 22.1278L39.4549 18.2983C37.6948 15.9969 34.9524 14.6453 32.0426 14.6451H15.835C12.958 14.6723 10.2531 16.0197 8.51076 18.2979ZM42.3778 25.8723L39.4547 29.6983C37.6944 32.0023 34.9501 33.3555 32.0381 33.3553L15.9271 33.3548C13.0152 33.3551 10.2708 32.0019 8.51056 29.6979L5.58776 25.8723L42.3778 25.8723ZM8.78145 37.7763C9.99894 41.6318 13.5959 44.2555 17.6641 44.2555H30.3358C34.404 44.2555 38.001 41.6318 39.2185 37.7763L40.3726 34.1214C38.0514 36.0273 35.111 37.1 32.0378 37.0998L15.9274 37.0994C12.8747 37.0996 9.9531 36.0412 7.63915 34.159L8.78145 37.7763Z" 
              />
            </svg>
            <span className="text-slate-300 font-semibold text-sm">© Tines</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="text-slate-400">10 Westland Square, Dublin & 99 High Street, Boston</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">Status: All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
