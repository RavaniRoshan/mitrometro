import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Layers, 
  Code, 
  Send, 
  Settings2, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert, 
  Sparkles, 
  Webhook, 
  FolderKanban, 
  MessageSquare, 
  Terminal, 
  GitBranch, 
  Lock, 
  ChevronRight, 
  Sliders, 
  FileText, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { WorkflowNode, WorkflowEdge, ExecutionLog, StoryTemplate, NodeType } from '../types/tines';
import { TEMPLATES } from '../data/templates';
import { computeExecutionOrder, generateNodeOutput } from '../utils/engine';

interface StudioCanvasProps {
  initialTemplateId?: string;
  onExit: () => void;
}

export const StudioCanvas: React.FC<StudioCanvasProps> = ({
  initialTemplateId = 'phishing-triage',
  onExit
}) => {
  // Current active template
  const [currentTemplateId, setCurrentTemplateId] = useState<string>(initialTemplateId);
  const activeTemplate = TEMPLATES.find(t => t.id === currentTemplateId) || TEMPLATES[0];

  // Graph state
  const [nodes, setNodes] = useState<WorkflowNode[]>(activeTemplate.nodes);
  const [edges, setEdges] = useState<WorkflowEdge[]>(activeTemplate.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Canvas pan & zoom state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Execution & Logs state
  const [isRunning, setIsRunning] = useState(false);
  const [activeRunningNodeId, setActiveRunningNodeId] = useState<string | null>(null);
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

  // Modals & Drawers
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [showLogsDrawer, setShowLogsDrawer] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);

  // Webhook Tester Payload
  const [webhookJson, setWebhookJson] = useState<string>(
    JSON.stringify(activeTemplate.samplePayload, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Node Dragging State
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [nodeInitialPos, setNodeInitialPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Copy Feedback
  const [copied, setCopied] = useState(false);

  // Synchronize when template changes
  useEffect(() => {
    const tmpl = TEMPLATES.find(t => t.id === currentTemplateId) || TEMPLATES[0];
    setNodes(tmpl.nodes);
    setEdges(tmpl.edges);
    setWebhookJson(JSON.stringify(tmpl.samplePayload, null, 2));
    setExecutionLogs([]);
    setSelectedNodeId(null);
  }, [currentTemplateId]);

  // Selected node reference
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  // Handle JSON input validation
  const handleJsonChange = (val: string) => {
    setWebhookJson(val);
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  // Node dragging handlers
  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    setDraggedNodeId(id);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setNodeInitialPos({ x: node.x, y: node.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNodeId) {
      const dx = (e.clientX - dragStartPos.x) / zoom;
      const dy = (e.clientY - dragStartPos.y) / zoom;
      setNodes(prev => prev.map(n => {
        if (n.id === draggedNodeId) {
          return {
            ...n,
            x: Math.max(20, Math.round(nodeInitialPos.x + dx)),
            y: Math.max(20, Math.round(nodeInitialPos.y + dy))
          };
        }
        return n;
      }));
    } else if (isPanning) {
      setPan({
        x: e.clientX - startPanPos.x,
        y: e.clientY - startPanPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
    setIsPanning(false);
  };

  // Canvas pan handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking canvas directly
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setStartPanPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  // Full Pipeline Execution Engine
  const executePipeline = async (customPayload?: Record<string, any>) => {
    if (isRunning) return;
    setIsRunning(true);

    let parsedPayload = activeTemplate.samplePayload;
    if (customPayload) {
      parsedPayload = customPayload;
    } else {
      try {
        parsedPayload = JSON.parse(webhookJson);
      } catch (e) {
        // Fallback
      }
    }

    // Reset all nodes to idle
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));
    setExecutionLogs([]);

    const executionOrder = computeExecutionOrder(nodes, edges);
    let cumulativeData: Record<string, any> = { ...parsedPayload };

    for (let i = 0; i < executionOrder.length; i++) {
      const nodeId = executionOrder[i];
      const node = nodes.find(n => n.id === nodeId);
      if (!node) continue;

      // Find incoming edges to animate connecting wire
      const incomingEdge = edges.find(e => e.target === nodeId);
      if (incomingEdge) {
        setActiveEdgeId(incomingEdge.id);
      }

      // Set node to running
      setActiveRunningNodeId(nodeId);
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'running' } : n));

      // Realistic latency simulation (300ms - 700ms)
      const stepDuration = Math.floor(250 + Math.random() * 400);
      await new Promise(res => setTimeout(res, stepDuration));

      // Generate realistic mock output
      const stepOutput = generateNodeOutput(node, cumulativeData);
      cumulativeData = { ...cumulativeData, ...stepOutput };

      const logEntry: ExecutionLog = {
        id: 'log-' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        nodeId: node.id,
        nodeName: node.name,
        status: 'success',
        durationMs: stepDuration,
        input: { ...cumulativeData },
        output: stepOutput
      };

      setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
          return {
            ...n,
            status: 'success',
            durationMs: stepDuration,
            lastExecutionTime: logEntry.timestamp,
            lastInput: cumulativeData,
            lastOutput: stepOutput
          };
        }
        return n;
      }));

      setExecutionLogs(prev => [logEntry, ...prev]);
    }

    setActiveRunningNodeId(null);
    setActiveEdgeId(null);
    setIsRunning(false);
  };

  // Run single node in isolation
  const executeSingleNode = async (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || isRunning) return;

    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'running' } : n));
    const stepDuration = Math.floor(200 + Math.random() * 300);
    await new Promise(res => setTimeout(res, stepDuration));

    const stepOutput = generateNodeOutput(node, activeTemplate.samplePayload);
    const logEntry: ExecutionLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      nodeId: node.id,
      nodeName: node.name,
      status: 'success',
      durationMs: stepDuration,
      input: activeTemplate.samplePayload,
      output: stepOutput
    };

    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          status: 'success',
          durationMs: stepDuration,
          lastExecutionTime: logEntry.timestamp,
          lastOutput: stepOutput
        };
      }
      return n;
    }));

    setExecutionLogs(prev => [logEntry, ...prev]);
  };

  // Reset graph to initial
  const resetGraph = () => {
    setNodes(prev => prev.map(n => ({
      ...n,
      status: 'idle',
      lastOutput: undefined,
      durationMs: undefined
    })));
    setExecutionLogs([]);
    setActiveRunningNodeId(null);
    setActiveEdgeId(null);
  };

  // Add new node to canvas
  const handleAddNode = (type: NodeType, name: string, service: string, iconName: string) => {
    const newNodeId = 'node-' + (nodes.length + 1);
    const newNode: WorkflowNode = {
      id: newNodeId,
      type,
      name,
      service,
      description: `Custom ${service} step added to automation story.`,
      iconName,
      x: 400 + Math.floor(Math.random() * 150),
      y: 120 + Math.floor(Math.random() * 150),
      status: 'idle',
      config: { active: true }
    };

    setNodes(prev => [...prev, newNode]);
    // Connect from last node if available
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      setEdges(prev => [...prev, {
        id: `e-${lastNode.id}-${newNodeId}`,
        source: lastNode.id,
        target: newNodeId
      }]);
    }
    setSelectedNodeId(newNodeId);
    setShowAddNodeModal(false);
  };

  // Get icon component by name
  const renderNodeIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Webhook': return <Webhook className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'GitBranch': return <GitBranch className={className} />;
      case 'FolderKanban': return <FolderKanban className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'Terminal': return <Terminal className={className} />;
      case 'Lock': return <Lock className={className} />;
      default: return <Code className={className} />;
    }
  };

  // Calculate SVG curve between two nodes
  const calculateCurvePath = (sourceNode: WorkflowNode, targetNode: WorkflowNode) => {
    const nodeWidth = 240;
    const nodeHeight = 88;

    const startX = sourceNode.x + nodeWidth;
    const startY = sourceNode.y + (nodeHeight / 2);

    const endX = targetNode.x;
    const endY = targetNode.y + (nodeHeight / 2);

    const deltaX = Math.abs(endX - startX) * 0.5;

    return `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`;
  };

  return (
    <div 
      className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-[#070A0F] select-none flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Studio Top Control Bar */}
      <div className="h-14 border-b border-white/[0.08] bg-[#0A0E18]/95 px-4 flex items-center justify-between gap-4 z-30 shrink-0 backdrop-blur-md">
        {/* Left: Story Selector & Metadata */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
              STORY:
            </span>
            <select
              value={currentTemplateId}
              onChange={(e) => setCurrentTemplateId(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.1] text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id} className="bg-[#0B0F17] text-white">
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{nodes.length} Nodes</span>
            <span aria-hidden="true">·</span>
            <span>{edges.length} Connections</span>
          </div>
        </div>

        {/* Center: Action Trigger Controls */}
        <div className="flex items-center gap-2">
          {/* Send Webhook Button */}
          <button
            onClick={() => setShowWebhookModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 emerald-glow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate Webhook Trigger</span>
          </button>

          {/* Run Full Pipeline Button */}
          <button
            onClick={() => executePipeline()}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isRunning 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                : 'bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Story'}</span>
          </button>

          {/* Reset Graph */}
          <button
            onClick={resetGraph}
            title="Reset All Node States"
            className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Modals & Zoom Controls */}
        <div className="flex items-center gap-2">
          {/* Add Node */}
          <button
            onClick={() => setShowAddNodeModal(true)}
            className="px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Action</span>
          </button>

          {/* Execution Logs Drawer Toggle */}
          <button
            onClick={() => setShowLogsDrawer(!showLogsDrawer)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              showLogsDrawer
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logs</span>
            {executionLogs.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold">
                {executionLogs.length}
              </span>
            )}
          </button>

          {/* Cases & Pages Previews */}
          <button
            onClick={() => setShowCaseModal(true)}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white text-xs font-medium"
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Cases View</span>
          </button>

          <button
            onClick={() => setShowPageModal(true)}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white text-xs font-medium"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Pages View</span>
          </button>

          {/* Exit Back to Marketing */}
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white transition-all ml-1"
            title="Exit to Overview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div 
        className="relative flex-1 canvas-grid overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleCanvasMouseDown}
      >
        {/* Transformable Canvas Layer */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: '2800px',
            height: '2000px',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {/* SVG Connector Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>

            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const pathData = calculateCurvePath(sourceNode, targetNode);
              const isEdgeActive = activeEdgeId === edge.id || (sourceNode.status === 'success' && targetNode.status === 'running');

              return (
                <g key={edge.id}>
                  {/* Background shadow path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#070A0F"
                    strokeWidth="4"
                  />
                  {/* Foreground line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isEdgeActive ? 'url(#activeLineGrad)' : 'rgba(255, 255, 255, 0.16)'}
                    strokeWidth={isEdgeActive ? '3' : '1.5'}
                    strokeDasharray={isEdgeActive ? '5 5' : 'none'}
                    className={isEdgeActive ? 'animate-pulse' : ''}
                  />

                  {/* Edge Condition label if specified */}
                  {edge.label && (
                    <text
                      x={(sourceNode.x + targetNode.x + 240) / 2}
                      y={(sourceNode.y + targetNode.y + 88) / 2 - 8}
                      fill="#9CA3AF"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                      className="bg-black/80 px-1 py-0.5 rounded"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Node Cards on Canvas */}
          {nodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            const isNodeRunning = activeRunningNodeId === node.id || node.status === 'running';

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: '240px',
                  zIndex: isSelected ? 20 : 10
                }}
                className={`rounded-xl border transition-all cursor-move select-none ${
                  isSelected 
                    ? 'border-emerald-500 bg-[#0F1626] shadow-[0_0_25px_-5px_rgba(16,185,129,0.35)] ring-1 ring-emerald-500'
                    : 'border-white/[0.12] bg-[#0C111E] hover:border-white/[0.25]'
                } ${isNodeRunning ? 'border-amber-400 ring-2 ring-amber-400/50' : ''}`}
              >
                {/* Node Card Header */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        node.status === 'success' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isNodeRunning 
                          ? 'bg-amber-500/20 text-amber-300 animate-pulse border border-amber-500/30'
                          : 'bg-white/[0.05] text-slate-300 border border-white/[0.08]'
                      }`}>
                        {renderNodeIcon(node.iconName, "w-3.5 h-3.5")}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {node.service}
                      </span>
                    </div>

                    {/* Node status indicator */}
                    <div className="flex items-center gap-1.5">
                      {node.status === 'success' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Success" />
                      )}
                      {isNodeRunning && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Running" />
                      )}
                      {node.status === 'idle' && (
                        <span className="w-2 h-2 rounded-full bg-slate-600" title="Idle" />
                      )}
                    </div>
                  </div>

                  {/* Node Name */}
                  <h4 className="text-xs font-bold text-white truncate mb-1">
                    {node.name}
                  </h4>

                  {/* Node Brief */}
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Node Card Footer */}
                <div className="px-3 py-2 border-t border-white/[0.06] bg-black/20 rounded-b-xl flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    {node.durationMs ? (
                      <span className="text-emerald-400 tabular-nums">
                        {node.durationMs}ms
                      </span>
                    ) : (
                      <span>Ready</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      executeSingleNode(node.id);
                    }}
                    title="Run single action"
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <Play className="w-3 h-3" />
                  </button>
                </div>

                {/* Left and right connection port anchors */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#070A0F] border border-white/30" />
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#070A0F] border border-white/30" />
              </div>
            );
          })}
        </div>

        {/* Floating Zoom & Canvas Controls */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1 p-1 rounded-xl bg-[#0B101C]/90 border border-white/[0.1] backdrop-blur-md shadow-xl text-xs">
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 1.8))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px] text-slate-400 px-2 tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.4))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="px-2 py-1 text-[11px] text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* RIGHT DRAWER: Node Inspector (Opens when a node is clicked) */}
      {selectedNode && (
        <div className="absolute right-0 top-14 bottom-0 w-96 border-l border-white/[0.08] bg-[#0A0E18]/95 backdrop-blur-xl z-40 flex flex-col shadow-2xl">
          {/* Inspector Header */}
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                {renderNodeIcon(selectedNode.iconName, "w-4 h-4")}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white truncate max-w-[200px]">
                  {selectedNode.name}
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedNode.service} · {selectedNode.type}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Inspector Body Tabs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
            {/* Action Details */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Description
              </label>
              <p className="text-slate-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06] text-xs leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Config Parameters */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Configuration Attributes
              </label>
              <div className="bg-[#05080E] p-3 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-300 space-y-1.5">
                {Object.entries(selectedNode.config).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center gap-2">
                    <span className="text-slate-500 truncate">{key}:</span>
                    <span className="text-emerald-400 truncate max-w-[180px] font-semibold">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Execution Output */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Emitted Event Payload
                </label>
                {selectedNode.lastOutput && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(selectedNode.lastOutput, null, 2));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                )}
              </div>

              {selectedNode.lastOutput ? (
                <pre className="bg-[#05080E] p-3 rounded-lg border border-emerald-500/20 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-64 leading-tight">
                  {JSON.stringify(selectedNode.lastOutput, null, 2)}
                </pre>
              ) : (
                <div className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02] text-center text-slate-500 text-xs">
                  Action has not been executed yet. Click below to test run this single node.
                </div>
              )}
            </div>
          </div>

          {/* Inspector Footer Actions */}
          <div className="p-4 border-t border-white/[0.08] bg-[#070B14] flex gap-2">
            <button
              onClick={() => executeSingleNode(selectedNode.id)}
              disabled={isRunning}
              className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Execute This Node</span>
            </button>
          </div>
        </div>
      )}

      {/* RIGHT DRAWER: Execution History & Trace Logs */}
      {showLogsDrawer && (
        <div className="absolute right-0 top-14 bottom-0 w-96 border-l border-white/[0.08] bg-[#0A0E18]/95 backdrop-blur-xl z-40 flex flex-col shadow-2xl">
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Execution Trace Logs
              </h3>
            </div>
            <button
              onClick={() => setShowLogsDrawer(false)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {executionLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No logs recorded yet. Trigger a webhook or run the story to generate step traces.
              </div>
            ) : (
              executionLogs.map(log => (
                <div 
                  key={log.id}
                  className="p-3 rounded-lg border border-white/[0.08] bg-[#060911] space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold truncate max-w-[180px]">
                      {log.nodeName}
                    </span>
                    <span className="text-slate-400 tabular-nums">
                      {log.durationMs}ms · {log.timestamp}
                    </span>
                  </div>
                  <pre className="bg-black/50 p-2 rounded border border-white/[0.04] text-[10px] font-mono text-slate-300 overflow-x-auto max-h-32">
                    {JSON.stringify(log.output, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL: Webhook Event Simulator */}
      {showWebhookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-emerald-500/30 bg-[#0A0F1A] shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#070B14]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Webhook className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Simulate Webhook Ingestion</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    POST https://hooks.tines.com/webhook/v1/trigger
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWebhookModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Presets Bar */}
            <div className="px-4 py-2.5 bg-black/40 border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Presets:</span>
              <button
                onClick={() => handleJsonChange(JSON.stringify(TEMPLATES[0].samplePayload, null, 2))}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 font-medium whitespace-nowrap"
              >
                Phishing Attachment
              </button>
              <button
                onClick={() => handleJsonChange(JSON.stringify(TEMPLATES[1].samplePayload, null, 2))}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 font-medium whitespace-nowrap"
              >
                AWS GuardDuty Escalation
              </button>
              <button
                onClick={() => handleJsonChange(JSON.stringify(TEMPLATES[2].samplePayload, null, 2))}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 font-medium whitespace-nowrap"
              >
                Okta Impossible Travel
              </button>
            </div>

            {/* JSON Code Area */}
            <div className="p-4 flex-1">
              <label className="text-xs font-mono text-slate-400 block mb-2">
                Incoming JSON Request Body:
              </label>
              <textarea
                value={webhookJson}
                onChange={(e) => handleJsonChange(e.target.value)}
                rows={12}
                className="w-full p-3 rounded-xl bg-[#05080F] border border-white/[0.1] text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-500 selection:bg-emerald-500/30"
              />
              {jsonError && (
                <div className="mt-2 text-rose-400 text-xs font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid JSON Syntax: {jsonError}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/[0.08] bg-[#070B14] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Payload will be delivered to node: <code className="text-emerald-400 font-mono">node-1 (Webhook)</code>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowWebhookModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300"
                >
                  Cancel
                </button>
                <button
                  disabled={!!jsonError}
                  onClick={() => {
                    setShowWebhookModal(false);
                    try {
                      const parsed = JSON.parse(webhookJson);
                      executePipeline(parsed);
                    } catch (e) {}
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Webhook Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Action Node */}
      {showAddNodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0A0F1A] shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <h3 className="text-sm font-bold text-white">Add Action Node to Story</h3>
              <button onClick={() => setShowAddNodeModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => handleAddNode('llm_agent', 'Tines AI Agent', 'AI Agent', 'Sparkles')}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E1424] hover:border-emerald-500 text-left transition-all"
              >
                <Sparkles className="w-5 h-5 text-teal-400 mb-2" />
                <span className="font-bold text-white block">AI Agent</span>
                <span className="text-[11px] text-slate-400">Autonomous reasoning and triage</span>
              </button>

              <button
                onClick={() => handleAddNode('security_lookup', 'CrowdStrike Intel', 'CrowdStrike', 'ShieldAlert')}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E1424] hover:border-emerald-500 text-left transition-all"
              >
                <ShieldAlert className="w-5 h-5 text-rose-400 mb-2" />
                <span className="font-bold text-white block">Threat Intel Query</span>
                <span className="text-[11px] text-slate-400">VirusTotal / Falcon hash check</span>
              </button>

              <button
                onClick={() => handleAddNode('python_script', 'Run Python Script', 'Python Engine', 'Terminal')}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E1424] hover:border-emerald-500 text-left transition-all"
              >
                <Terminal className="w-5 h-5 text-amber-400 mb-2" />
                <span className="font-bold text-white block">Python Script</span>
                <span className="text-[11px] text-slate-400">In-line sandbox execution</span>
              </button>

              <button
                onClick={() => handleAddNode('create_case', 'Create Incident Case', 'Tines Cases', 'FolderKanban')}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E1424] hover:border-emerald-500 text-left transition-all"
              >
                <FolderKanban className="w-5 h-5 text-indigo-400 mb-2" />
                <span className="font-bold text-white block">Incident Case</span>
                <span className="text-[11px] text-slate-400">Log investigation record</span>
              </button>

              <button
                onClick={() => handleAddNode('slack_notify', 'Notify Slack Channel', 'Slack', 'MessageSquare')}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E1424] hover:border-emerald-500 text-left transition-all"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400 mb-2" />
                <span className="font-bold text-white block">Slack Alert</span>
                <span className="text-[11px] text-slate-400">Interactive SOC message</span>
              </button>

              <button
                onClick={() => handleAddNode('http_request', 'HTTP REST Request', 'REST API', 'Code')}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E1424] hover:border-emerald-500 text-left transition-all"
              >
                <Code className="w-5 h-5 text-cyan-400 mb-2" />
                <span className="font-bold text-white block">HTTP Request</span>
                <span className="text-[11px] text-slate-400">Call any external service</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Tines Cases Interactive View */}
      {showCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-2xl border border-white/[0.1] bg-[#0A0F1A] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#070B14]">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Tines Cases — Live Incident Record</h3>
                  <span className="text-[11px] font-mono text-slate-400">CASE-8841 · Severity: Critical</span>
                </div>
              </div>
              <button onClick={() => setShowCaseModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs">
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-slate-400 block mb-1">Status</span>
                  <span className="text-emerald-400 font-bold font-mono">Investigating (P1)</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Lead Responder</span>
                  <span className="text-white font-medium">SecOps Automation Agent</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Time Elapsed</span>
                  <span className="text-white font-mono tabular-nums">4m 18s since trigger</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Automated Incident Summary</h4>
                <p className="text-slate-300 leading-relaxed bg-[#05080E] p-3 rounded-lg border border-white/[0.06]">
                  A malicious spear-phishing payload impersonating Executive Finance was intercepted. Automated VirusTotal lookup returned 54/72 detections. The recipient mailbox was automatically placed into quarantine.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Logged IOC Evidence</h4>
                <div className="font-mono text-[11px] bg-[#05080E] p-3 rounded-lg border border-white/[0.06] space-y-1 text-slate-300">
                  <div>SHA256: b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9</div>
                  <div>Source IP: 185.220.101.44 (Tor Exit Relay)</div>
                  <div>Target: sarah.connor@cybercorp.internal</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.08] bg-[#070B14] flex justify-end">
              <button
                onClick={() => setShowCaseModal(false)}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Close Case Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Tines Pages Interactive View */}
      {showPageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0A0F1A] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#070B14]">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Tines Pages — Interactive Self-Service</h3>
              </div>
              <button onClick={() => setShowPageModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-300">
                This page is rendered to non-technical users and analysts when human approval or input is required by a workflow story.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <span className="font-bold text-white block">Quarantine Action Approval Gate</span>
                <p className="text-slate-400 text-[11px]">
                  Confirm isolation for endpoint workstation <code className="text-emerald-400">WKS-FIN-9902</code>?
                </p>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => {
                      alert("Simulated Action: Host isolated via CrowdStrike API.");
                      setShowPageModal(false);
                    }}
                    className="flex-1 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold hover:bg-rose-500/30"
                  >
                    Confirm Quarantine
                  </button>
                  <button 
                    onClick={() => setShowPageModal(false)}
                    className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  >
                    Dismiss / Ignore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
