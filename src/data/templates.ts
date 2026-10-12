import { StoryTemplate } from '../types/tines';

export const TEMPLATES: StoryTemplate[] = [
  {
    id: 'phishing-triage',
    title: 'Phishing Email Investigation & Auto-Quarantine',
    category: 'Incident Response',
    description: 'Ingest suspicious employee reported emails, extract IoCs, perform threat intelligence hash reputation lookups, and auto-quarantine with Slack verification.',
    estimatedTimeSave: '45 mins / alert',
    samplePayload: {
      alert_id: "SEC-2026-8841",
      reporter: "sarah.connor@cybercorp.internal",
      subject: "URGENT: Quarterly Wire Verification Needed",
      sender_email: "billing-update@secure-payroll-gateway.xyz",
      received_at: "2026-10-11T17:42:10Z",
      source_ip: "185.220.101.44",
      attachment_name: "Remittance_Invoice_Q3.pdf.exe",
      attachment_sha256: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
      target_department: "Executive Finance"
    },
    nodes: [
      {
        id: 'node-1',
        type: 'webhook_trigger',
        name: 'Email Report Webhook',
        service: 'Webhook',
        description: 'Receives user-reported suspicious email submissions from Outlook add-in.',
        iconName: 'Webhook',
        x: 60,
        y: 180,
        status: 'idle',
        config: {
          endpoint: 'https://hooks.tines.com/webhook/v1/user-report-inbox',
          method: 'POST',
          auth: 'Bearer Token'
        }
      },
      {
        id: 'node-2',
        type: 'security_lookup',
        name: 'VirusTotal Threat Intel',
        service: 'VirusTotal',
        description: 'Queries hash reputation, AV detections, and malicious community votes.',
        iconName: 'ShieldAlert',
        x: 360,
        y: 100,
        status: 'idle',
        config: {
          lookupField: 'attachment_sha256',
          threshold: '5 detections',
          api: '/api/v3/files/{hash}'
        }
      },
      {
        id: 'node-3',
        type: 'llm_agent',
        name: 'AI Agent Triage Analyst',
        service: 'Tines AI Agent',
        description: 'Analyzes email headers, body sentiment, spear-phishing indicators, and generates risk summary.',
        iconName: 'Sparkles',
        x: 360,
        y: 280,
        status: 'idle',
        config: {
          model: 'gemini-1.5-pro',
          systemPrompt: 'Evaluate likelihood of credential harvesting and executive impersonation.'
        }
      },
      {
        id: 'node-4',
        type: 'decision_rule',
        name: 'Evaluate Risk Threshold',
        service: 'Tines Rules',
        description: 'Checks if VirusTotal malicious score >= 10 OR AI risk assessment is HIGH.',
        iconName: 'GitBranch',
        x: 680,
        y: 180,
        status: 'idle',
        config: {
          condition: 'vt.malicious > 5 || ai.confidence == "critical"'
        }
      },
      {
        id: 'node-5',
        type: 'create_case',
        name: 'Create Tines Incident Case',
        service: 'Tines Cases',
        description: 'Opens a high-severity case in Tines Cases with evidence timeline and assigned responder.',
        iconName: 'FolderKanban',
        x: 980,
        y: 90,
        status: 'idle',
        config: {
          severity: 'Critical',
          queue: 'Tier 2 SecOps Incident Command',
          tags: ['Phishing', 'Malware', 'CredentialHarvester']
        }
      },
      {
        id: 'node-6',
        type: 'slack_notify',
        name: 'SecOps Slack Alert & Prompt',
        service: 'Slack',
        description: 'Broadcasts interactive alert to #secops-critical with 1-click quarantine override.',
        iconName: 'MessageSquare',
        x: 980,
        y: 280,
        status: 'idle',
        config: {
          channel: '#soc-critical-alerts',
          interactiveButtons: ['Quarantine Mailbox', 'Dismiss as Safe']
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-1', target: 'node-2', label: 'Extract SHA256' },
      { id: 'e2', source: 'node-1', target: 'node-3', label: 'Extract Body & Header' },
      { id: 'e3', source: 'node-2', target: 'node-4', label: 'Reputation Data' },
      { id: 'e4', source: 'node-3', target: 'node-4', label: 'Risk Analysis' },
      { id: 'e5', source: 'node-4', target: 'node-5', label: 'If Critical' },
      { id: 'e6', source: 'node-4', target: 'node-6', label: 'Notify Channel' }
    ]
  },
  {
    id: 'guardduty-response',
    title: 'AWS GuardDuty High Severity Incident Response',
    category: 'Cloud Security',
    description: 'Catch anomalous IAM privilege escalations, isolate EC2 instances, and revoke STS credentials automatically.',
    estimatedTimeSave: '30 mins / incident',
    samplePayload: {
      account_id: "891230491823",
      region: "us-east-1",
      finding_type: "PrivilegeEscalation:IAMUser/AnomalousBehavior",
      severity: 8.4,
      iam_user: "service-deployer-ci",
      compromised_ip: "194.26.29.112",
      compromised_arn: "arn:aws:iam::891230491823:user/service-deployer-ci"
    },
    nodes: [
      {
        id: 'gd-1',
        type: 'webhook_trigger',
        name: 'AWS EventBridge Listener',
        service: 'AWS EventBridge',
        description: 'Triggered when GuardDuty finding severity exceeds 7.0.',
        iconName: 'CloudRain',
        x: 80,
        y: 190,
        status: 'idle',
        config: { eventType: 'aws.guardduty' }
      },
      {
        id: 'gd-2',
        type: 'http_request',
        name: 'Query CloudTrail Logs',
        service: 'AWS CloudTrail',
        description: 'Fetch last 50 API calls made by the compromised IAM identity.',
        iconName: 'Search',
        x: 380,
        y: 110,
        status: 'idle',
        config: { service: 'cloudtrail:LookupEvents' }
      },
      {
        id: 'gd-3',
        type: 'security_lookup',
        name: 'CrowdStrike IP Intelligence',
        service: 'CrowdStrike',
        description: 'Verify if external IP belongs to known TOR exit node or adversary infrastructure.',
        iconName: 'ShieldAlert',
        x: 380,
        y: 290,
        status: 'idle',
        config: { query: 'threat-graph/indicators' }
      },
      {
        id: 'gd-4',
        type: 'python_script',
        name: 'Revoke AWS Active Sessions',
        service: 'Python Engine',
        description: 'Executes boto3 script attaching inline deny-all policy to revoke session tokens.',
        iconName: 'Terminal',
        x: 700,
        y: 190,
        status: 'idle',
        config: { runtime: 'Python 3.11', timeoutSec: 10 }
      },
      {
        id: 'gd-5',
        type: 'create_case',
        name: 'Escalate AWS Incident Case',
        service: 'Tines Cases',
        description: 'Tags Cloud Architecture Lead and generates containment audit trail.',
        iconName: 'FolderKanban',
        x: 1000,
        y: 190,
        status: 'idle',
        config: { severity: 'Critical', autoAssign: 'Cloud SecOps' }
      }
    ],
    edges: [
      { id: 'gde-1', source: 'gd-1', target: 'gd-2' },
      { id: 'gde-2', source: 'gd-1', target: 'gd-3' },
      { id: 'gde-3', source: 'gd-2', target: 'gd-4' },
      { id: 'gde-4', source: 'gd-3', target: 'gd-4' },
      { id: 'gde-5', source: 'gd-4', target: 'gd-5' }
    ]
  },
  {
    id: 'okta-impossible-travel',
    title: 'Okta Impossible Travel & Session Revocation',
    category: 'Identity & Access',
    description: 'Detect geographically impossible user logins, prompt user via Push Notification for verification, and suspend compromised account on non-response.',
    estimatedTimeSave: '20 mins / alert',
    samplePayload: {
      event_type: "user.authentication.verify",
      user_email: "david.miller@enterprise.io",
      current_location: "Kyiv, Ukraine",
      previous_location: "Austin, Texas, US",
      time_delta_minutes: 18,
      distance_miles: 5800,
      client_device: "MacBookPro18,1"
    },
    nodes: [
      {
        id: 'ok-1',
        type: 'webhook_trigger',
        name: 'Okta System Log Webhook',
        service: 'Okta Event Hooks',
        description: 'Triggers on security.anomaly.impossible_travel event.',
        iconName: 'Fingerprint',
        x: 80,
        y: 190,
        status: 'idle',
        config: { filter: 'security.anomaly' }
      },
      {
        id: 'ok-2',
        type: 'page_action',
        name: 'Tines Verification Page',
        service: 'Tines Pages',
        description: 'Renders biometric or 2FA verification challenge portal to the employee.',
        iconName: 'Layout',
        x: 390,
        y: 190,
        status: 'idle',
        config: { pageTemplate: 'employee-travel-verify' }
      },
      {
        id: 'ok-3',
        type: 'decision_rule',
        name: 'Verified by Employee?',
        service: 'Tines Rules',
        description: 'Validates if user confirmed travel within 5 minutes.',
        iconName: 'GitBranch',
        x: 710,
        y: 190,
        status: 'idle',
        config: { timeout: '300s' }
      },
      {
        id: 'ok-4',
        type: 'http_request',
        name: 'Suspend Okta Account & Reset',
        service: 'Okta API',
        description: 'Issues POST /api/v1/users/{id}/lifecycle/suspend to freeze access.',
        iconName: 'Lock',
        x: 1020,
        y: 120,
        status: 'idle',
        config: { action: 'suspend' }
      },
      {
        id: 'ok-5',
        type: 'slack_notify',
        name: 'Notify Helpdesk & Manager',
        service: 'Slack',
        description: 'Posts automated ticket link into #it-support-escalations.',
        iconName: 'MessageSquare',
        x: 1020,
        y: 260,
        status: 'idle',
        config: { channel: '#it-helpdesk' }
      }
    ],
    edges: [
      { id: 'oke-1', source: 'ok-1', target: 'ok-2' },
      { id: 'oke-2', source: 'ok-2', target: 'ok-3' },
      { id: 'oke-3', source: 'ok-3', target: 'ok-4', label: 'Unverified / Fraud' },
      { id: 'oke-4', source: 'ok-3', target: 'ok-5', label: 'Ticket Logged' }
    ]
  }
];
