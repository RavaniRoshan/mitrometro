import { WorkflowNode, WorkflowEdge, ExecutionLog } from '../types/tines';

export interface RunStepResult {
  nodeId: string;
  status: 'running' | 'success' | 'error';
  durationMs: number;
  output: Record<string, any>;
  log: ExecutionLog;
}

export function generateNodeOutput(node: WorkflowNode, inputData: Record<string, any>): Record<string, any> {
  const timestamp = new Date().toISOString();

  switch (node.type) {
    case 'webhook_trigger':
      return {
        event_status: 'received',
        ingested_at: timestamp,
        source_protocol: 'HTTPS/TLSv1.3',
        signature_verified: true,
        payload_bytes: JSON.stringify(inputData).length,
        normalized_data: inputData
      };

    case 'security_lookup':
      return {
        lookup_type: 'Threat Intelligence IOC',
        provider: node.service,
        queried_ioc: inputData.attachment_sha256 || inputData.source_ip || inputData.compromised_ip || 'b94d27b9934d3e08a52e52',
        reputation: 'MALICIOUS',
        threat_score: 94,
        positives: 52,
        total_scanners: 70,
        threat_classification: 'Trojan.Dropper.GenericThreat',
        asn: 'AS209403 Cloud Host Proxy',
        country_code: 'UA',
        first_seen: '2026-10-09T08:12:00Z',
        last_analysis_date: timestamp
      };

    case 'llm_agent':
      return {
        model: 'tines-ai-agent-v2',
        reasoning_duration_ms: 412,
        risk_level: 'CRITICAL',
        executive_summary: 'High-confidence targeted spear-phishing attack attempting invoice spoofing and credential theft.',
        detected_anomalies: [
          'Display name spoofing against Executive Finance',
          'Executable extension hidden behind fake invoice filename',
          'Originating IP flagged in known proxy/bulletproof hosting range'
        ],
        recommended_actions: [
          'Quarantine recipient email from Exchange mailbox',
          'Revoke active session tokens for target identity',
          'Escalate to Tier 2 incident investigation'
        ],
        confidence_score: 0.98
      };

    case 'decision_rule':
      return {
        evaluated_rule: node.config.condition || 'vt.threat_score >= 80 && ai.risk_level == "CRITICAL"',
        evaluation_result: true,
        route_selected: 'Branch A: Immediate Containment',
        evaluated_at: timestamp
      };

    case 'create_case':
      return {
        case_id: 'CASE-' + Math.floor(1000 + Math.random() * 9000),
        status: 'Open',
        severity: 'Critical',
        queue: 'Global SecOps Command',
        lead_investigator: 'Automated Response System',
        incident_summary: inputData.subject || inputData.finding_type || 'Automated Threat Containment Alert',
        created_at: timestamp,
        case_url: 'https://app.tines.com/cases/' + Math.floor(1000 + Math.random() * 9000)
      };

    case 'slack_notify':
      return {
        dispatch_status: 'delivered',
        channel: node.config.channel || '#secops-critical-alerts',
        broadcast_time: timestamp,
        actionable_components: [
          { type: 'button', text: 'Quarantine Host', action_id: 'quarantine_01' },
          { type: 'button', text: 'False Positive', action_id: 'dismiss_02' }
        ],
        message_id: 'msg_' + Math.random().toString(36).substring(2, 9)
      };

    case 'python_script':
      return {
        interpreter: 'Python 3.11-tines-sandbox',
        exit_code: 0,
        execution_time_ms: 182,
        stdout: [
          '[+] Connected to AWS STS Client',
          `[+] Target ARN: ${inputData.compromised_arn || 'arn:aws:iam::891230491823:user/target'}`,
          '[+] Attaching inline deny policy AWSRevokeOlderSessions',
          '[+] Successfully terminated 2 active session tokens'
        ],
        stderr: null
      };

    case 'http_request':
      return {
        http_status: 200,
        status_text: 'OK',
        response_time_ms: 98,
        endpoint: '/api/v1/containment/quarantine',
        response_body: {
          success: true,
          action_taken: 'ACCOUNT_SUSPENDED',
          revoked_tokens: 3,
          affected_principal: inputData.user_email || inputData.iam_user || 'system.user'
        }
      };

    case 'page_action':
      return {
        page_id: 'PAGE-TRAVEL-VERIFY',
        rendered_url: 'https://tines.internal/pages/verify-identity-challenge',
        form_state: 'awaiting_human_decision',
        challenge_token: 'chk_' + Math.random().toString(36).substring(2, 10),
        ttl_seconds: 300
      };

    default:
      return {
        status: 'completed',
        executed_at: timestamp,
        metadata: { node: node.name }
      };
  }
}

export function computeExecutionOrder(nodes: WorkflowNode[], edges: WorkflowEdge[]): string[] {
  // Topological sort based on edges
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};

  nodes.forEach(n => {
    inDegree[n.id] = 0;
    adj[n.id] = [];
  });

  edges.forEach(e => {
    if (inDegree[e.target] !== undefined) {
      inDegree[e.target] = (inDegree[e.target] || 0) + 1;
    }
    if (adj[e.source]) {
      adj[e.source].push(e.target);
    }
  });

  const queue: string[] = [];
  nodes.forEach(n => {
    if (inDegree[n.id] === 0) {
      queue.push(n.id);
    }
  });

  const order: string[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);

    for (const v of adj[u] || []) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  // Include any stray nodes not in order
  nodes.forEach(n => {
    if (!order.includes(n.id)) {
      order.push(n.id);
    }
  });

  return order;
}
