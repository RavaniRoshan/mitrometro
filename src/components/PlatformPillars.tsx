import React, { useState } from 'react';
import { 
  GitBranch, 
  FolderKanban, 
  Layout, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  Clock, 
  User, 
  Tag, 
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';

export const PlatformPillars: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'cases' | 'pages'>('workflows');

  // Interactive state for Pages demo
  const [pageSubmitted, setPageSubmitted] = useState(false);
  const [pageForm, setPageForm] = useState({
    userEmail: 'analyst@enterprise.io',
    resource: 'AWS Production S3 Bucket - Billing Archive',
    duration: '2 hours',
    reason: 'Investigating anomalous data exfiltration alert #SEC-891'
  });

  // Interactive state for Cases demo
  const [selectedCase, setSelectedCase] = useState(0);
  const mockCases = [
    {
      id: 'CASE-4910',
      title: 'Compromised IAM Credential Spike in us-east-1',
      severity: 'Critical',
      status: 'In Progress',
      assignee: 'Alex Chen (Tier 2 SOC)',
      time: '12m ago',
      tags: ['AWS', 'CredentialTheft', 'AutomatedContainment']
    },
    {
      id: 'CASE-4909',
      title: 'Executive Phishing Attempt: Wire Redirection',
      severity: 'High',
      status: 'Under Review',
      assignee: 'Maya Patel (Threat Intel)',
      time: '45m ago',
      tags: ['Phishing', 'VirusTotal', 'Exchange']
    },
    {
      id: 'CASE-4908',
      title: 'Unusual Geographical Login from Tor Exit Node',
      severity: 'Medium',
      status: 'Resolved',
      assignee: 'Auto-Remediated by Tines',
      time: '2h ago',
      tags: ['Okta', 'ImpossibleTravel', 'Revoked']
    }
  ];

  return (
    <section id="workflows-section" className="py-24 bg-[#070A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            THE TRIAD OF MODERN AUTOMATION
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Workflows. Cases. Pages.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Everything your security and engineering teams need to orchestrate complex operations from end to end.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('workflows')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'workflows'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Workflows</span>
            </button>

            <button
              onClick={() => setActiveTab('cases')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'cases'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Cases</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pages'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Pages</span>
            </button>
          </div>
        </div>

        {/* Dynamic Pillar Content Panels */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#0A0E18] p-6 sm:p-10 backdrop-blur-xl">
          {/* 1. WORKFLOWS TAB */}
          {activeTab === 'workflows' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>DETERMINISTIC & AGENTIC ORCHESTRATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Connect any tool with universal API coverage.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tines doesn't trap you in brittle proprietary connectors. Any system with a REST API, webhook, or SDK can be wired into your stories in minutes.
                </p>

                <div className="space-y-3 pt-2 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Visual drag-and-drop builder with full JSON manipulation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Autonomous AI Agents for ambiguous incident triage</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>In-line Python execution sandbox for custom algorithms</span>
                  </div>
                </div>
              </div>

              {/* Workflows Visual Mockup */}
              <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0E1322] p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] text-xs font-mono text-slate-400">
                  <span>LIVE STORY ENGINE</span>
                  <span className="text-emerald-400">Status: Running at Enterprise SLA</span>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">
                        01
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Webhook Trigger</span>
                        <span className="text-[11px] text-slate-400">Ingests CrowdStrike detection event</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">200 OK · 12ms</span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-mono">
                        02
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">AI Agent Enrichment</span>
                        <span className="text-[11px] text-slate-400">Synthesizes telemetry against MITRE ATT&CK</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-teal-300">Confidence: 99.1%</span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono">
                        03
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Automated Quarantine</span>
                        <span className="text-[11px] text-slate-400">Issues Network Containment via EDR API</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-indigo-300">Target Isolated</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CASES TAB */}
          {activeTab === 'cases' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>INCIDENT RESPONSE RECORD COMMAND</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Triage, track, and collaborate without context switching.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tines Cases provides unified record keeping directly linked to automation. Automated actions update tickets automatically, assign responders, and log audit trails.
                </p>

                <div className="space-y-3 pt-2 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Two-way sync with Jira, ServiceNow, and PagerDuty</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Real-time collaborative timeline with analyst notes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Dynamic severity escalation based on live intelligence</span>
                  </div>
                </div>
              </div>

              {/* Cases Interactive Preview */}
              <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0E1322] p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">TINES CASES COMMAND CONSOLE</span>
                  <span className="text-xs text-emerald-400 font-medium">3 Active Incidents</span>
                </div>

                <div className="space-y-3">
                  {mockCases.map((c, i) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCase(i)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedCase === i
                          ? 'border-emerald-500/50 bg-emerald-500/[0.06]'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-emerald-400">{c.id}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                            c.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300' :
                            c.severity === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {c.severity}
                          </span>
                          <span className="text-[11px] text-slate-400">{c.time}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-white mb-2">{c.title}</h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {c.assignee}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[11px] text-slate-400">
                          {c.tags.join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. PAGES TAB */}
          {activeTab === 'pages' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                  <Layout className="w-3.5 h-3.5" />
                  <span>INTERACTIVE HUMAN-IN-THE-LOOP FORMS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Build web portals for human interaction in seconds.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Pages lets anyone build beautiful, secure frontends linked directly to automation. Request temporary access, approve quarantine actions, or intake employee requests.
                </p>

                <div className="space-y-3 pt-2 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>No frontend code, frameworks, or deployment pipelines</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Single sign-on protected with granular role-based access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>Direct submission pipeline triggering downstream stories</span>
                  </div>
                </div>
              </div>

              {/* Pages Interactive Demo Form */}
              <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0E1322] p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">TINES PAGES PREVIEW</span>
                  <span className="text-xs text-emerald-400 font-mono">LIVE INTERACTIVE FORM</span>
                </div>

                {pageSubmitted ? (
                  <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">Access Request Dispatched!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Workflow story #W-9912 was triggered. SecOps lead notified via Slack with 1-click credential grant.
                    </p>
                    <button
                      onClick={() => setPageSubmitted(false)}
                      className="px-4 py-2 text-xs font-medium bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors"
                    >
                      Reset Form Preview
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPageSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Requestor Identity</label>
                      <input
                        type="text"
                        value={pageForm.userEmail}
                        onChange={(e) => setPageForm({ ...pageForm, userEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Target Cloud Resource</label>
                      <input
                        type="text"
                        value={pageForm.resource}
                        onChange={(e) => setPageForm({ ...pageForm, resource: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">Requested Duration</label>
                        <select 
                          value={pageForm.duration}
                          onChange={(e) => setPageForm({ ...pageForm, duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option>4 hours</option>
                          <option>8 hours</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-medium mb-1">Access Tier</label>
                        <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-400 font-mono">
                          Read-Only Audit
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Business Justification</label>
                      <textarea
                        rows={2}
                        value={pageForm.reason}
                        onChange={(e) => setPageForm({ ...pageForm, reason: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request via Tines Pages</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
