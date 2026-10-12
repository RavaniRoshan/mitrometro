export type NodeType = 
  | 'webhook_trigger'
  | 'llm_agent'
  | 'http_request'
  | 'security_lookup'
  | 'decision_rule'
  | 'create_case'
  | 'slack_notify'
  | 'python_script'
  | 'page_action';

export type NodeStatus = 'idle' | 'running' | 'success' | 'error';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  name: string;
  service: string;
  description: string;
  iconName: string;
  x: number;
  y: number;
  status: NodeStatus;
  config: Record<string, any>;
  lastExecutionTime?: string;
  durationMs?: number;
  lastInput?: Record<string, any>;
  lastOutput?: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeName: string;
  status: 'success' | 'error';
  durationMs: number;
  input: Record<string, any>;
  output: Record<string, any>;
}

export interface SecurityCase {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Investigating' | 'Resolved';
  assignee: string;
  createdAt: string;
  indicator: string;
  summary: string;
  tags: string[];
}

export interface StoryTemplate {
  id: string;
  title: string;
  category: 'Threat Detection' | 'Incident Response' | 'Identity & Access' | 'Cloud Security';
  description: string;
  estimatedTimeSave: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  samplePayload: Record<string, any>;
}
