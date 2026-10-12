import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldAlert, 
  DollarSign, 
  Users, 
  Layers, 
  Check, 
  ArrowRight,
  Database,
  Lock,
  GitBranch,
  FileCheck
} from 'lucide-react';

export const DepartmentsSection: React.FC = () => {
  const [activeDept, setActiveDept] = useState<'it' | 'security' | 'finance' | 'people' | 'ops'>('security');

  const depts = [
    {
      id: 'it' as const,
      name: 'IT',
      icon: Cpu,
      title: 'MCP and AI client management with an AI gateway to govern deployments.',
      details: [
        'Centralize AI model tokens and credential secrets in governed vaults',
        'Model Context Protocol (MCP) server integration for secure tool calling',
        'Automatic rate-limiting and budget guardrails per team and department'
      ],
      flowLabel: 'IT AI Gateway Architecture',
      steps: [
        { label: 'Client Tool Request', desc: 'Claude Code / Cursor / CLI sends MCP tool call' },
        { label: 'Tines Policy Enforcement', desc: 'Checks user permission & redacts sensitive secrets' },
        { label: 'API Gateway Routing', desc: 'Executes approved change in Okta / Jamf / AWS' }
      ]
    },
    {
      id: 'security' as const,
      name: 'Security',
      icon: ShieldAlert,
      title: 'AI SOC: alert intake, triage, and remediation, routing to an analyst when needed.',
      details: [
        'Autonomous enrichment against VirusTotal, CrowdStrike, and Shodan',
        'Automated mailbox quarantine and network host isolation in milliseconds',
        'Human-in-the-loop review for critical destructive containment actions'
      ],
      flowLabel: 'Autonomous AI SOC Lifecycle',
      steps: [
        { label: 'EDR / SIEM Detection', desc: 'CrowdStrike / Sentinel webhook alert ingested' },
        { label: 'AI Agent Triage', desc: 'Synthesizes MITRE techniques and queries threat intel' },
        { label: 'Containment Action', desc: 'Isolates endpoint and opens P1 investigation case' }
      ]
    },
    {
      id: 'finance' as const,
      name: 'Finance',
      icon: DollarSign,
      title: 'Finance requests dashboard with insights from email and tooling.',
      details: [
        'Extract invoice metadata from PDF remittances via OCR & multimodal AI',
        'Cross-reference bank payment coordinates against NetSuite and Stripe records',
        'Flag wire spoofing anomalies and executive impersonation attempts'
      ],
      flowLabel: 'Automated Financial Intake',
      steps: [
        { label: 'Invoice Email Ingestion', desc: 'Webhook receives vendor payment request' },
        { label: 'ERP & Bank Cross-Check', desc: 'Matches purchase order in NetSuite' },
        { label: 'Approval Dispatch', desc: 'Routes verified invoice to CFO Slack channel' }
      ]
    },
    {
      id: 'people' as const,
      name: 'People',
      icon: Users,
      title: 'End-to-end job request manager, from finance approvals through to offer.',
      details: [
        'Headcount requisition approval workflows synced with Greenhouse and Workday',
        'Zero-touch employee onboarding: Slack, Google Workspace, and laptop provisioning',
        'Instant automated offboarding on separation notice with audit trails'
      ],
      flowLabel: 'Unified People Operations',
      steps: [
        { label: 'Offer Acceptance Event', desc: 'Greenhouse webhook triggers hiring story' },
        { label: 'Role-Based Provisioning', desc: 'Generates SSO identity, assigns 1Password vault' },
        { label: 'Welcome Portal Page', desc: 'Tines Pages renders equipment selection form' }
      ]
    },
    {
      id: 'ops' as const,
      name: 'Operations',
      icon: Layers,
      title: 'Ops Lead dashboard: tracking, managing, and closing open lifecycle loops.',
      details: [
        'Real-time SLA tracking across cross-departmental tickets',
        'Automated multi-system reconciliation between Salesforce, Jira, and Slack',
        'Proactive deadlock resolution and anomaly alerting for business ops'
      ],
      flowLabel: 'Lifecycle Governance Loop',
      steps: [
        { label: 'SaaS Sync Webhook', desc: 'Customer lifecycle milestone updated in CRM' },
        { label: 'Audit Verification', desc: 'Validates compliance checks and license limits' },
        { label: 'Execution & Archive', desc: 'Syncs data warehouse & notifies account team' }
      ]
    }
  ];

  const current = depts.find(d => d.id === activeDept) || depts[1];

  return (
    <section id="departments" className="py-24 border-b border-white/[0.08] bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 font-mono">
            CROSS-FUNCTIONAL WORKFLOWS
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Keep important workflows moving for the teams dependent on them.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Tines gives these teams the tools to safely leverage AI across the most sensitive systems, data, and processes at the highest level of security.
          </p>
        </div>

        {/* Department Tab Buttons */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            {depts.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDept(d.id)}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeDept === d.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{d.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Department Showcase Panel */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#0B0F1A] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Copy & Value */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                <span>DEPARTMENT FOCUS: {current.name.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {current.title}
              </h3>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                {current.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Workflow Step Architecture Card */}
            <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0E1424] p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08] text-xs font-mono text-slate-400">
                <span>{current.flowLabel}</span>
                <span className="text-emerald-400">100% Governed</span>
              </div>

              <div className="space-y-3.5">
                {current.steps.map((step, sIdx) => (
                  <div 
                    key={sIdx}
                    className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        0{sIdx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white block">
                          {step.label}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 shrink-0">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
