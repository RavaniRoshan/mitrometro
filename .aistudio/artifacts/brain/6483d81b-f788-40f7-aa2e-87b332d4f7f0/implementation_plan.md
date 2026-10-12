# Tines 1:1 Replica — Smart Workflow Platform & Interactive Studio

1:1 replica of the official Tines platform (tines.com), pairing the high-converting modern dark marketing presentation with a deep interactive workflow builder playground featuring live node graphs, custom webhook simulation, and API mock execution.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following directions were confirmed during Phase 1 clarification:
> - **Primary Experience**: Full marketing showcase paired with an interactive workflow builder playground that users can switch into or test inline.
> - **Interactivity Level**: Deep sandbox with live node graph, custom webhook event payload generator, real-time node execution animations, and inspectable API input/output logs.
> - **Visual Identity**: Official Tines modern obsidian & emerald aesthetic (`#070A0F`, `#0B0F17`, emerald accents `#10B981`, hairline borders `border-white/10`, and glassmorphic panels).

- **Confirmed Decision 1**: Marketing Homepage featuring the authentic 3-zone header, hero section with live mini-canvas, customer logo marquee (Coinbase, Canva, GitLab, Mars, McKesson), the 3 core pillars (Workflows, Cases, Pages), interactive feature tour, ROI calculator, and security template gallery.
- **Confirmed Decision 2**: Dedicated Interactive Sandbox ("Studio" mode) offering a full-screen or expanded Tines canvas: drag-and-drop / select action nodes (Webhook Trigger, AI Agent, HTTP Request, Python Code, Send Slack, Create Case), live test webhook trigger panel with customizable JSON payload, and real-time execution trace viewer.
- **Confirmed Decision 3**: Pre-built security incident response story ("Phishing Investigation & Triage") ready to run out of the box with realistic outputs.

---

### 1. Overview & Core Concept

- **What It Does**: Recreates the complete Tines brand experience — demonstrating how modern security and IT teams build mission-critical automations without code. Visitors can explore the marketing story or immediately jump into the interactive canvas to trigger a webhook, watch nodes light up with pulse signals, inspect payload transformations, and test mock API actions.
- **Target Audience / Persona**: Security Operations (SecOps) engineers, Incident Responders, IT automation leaders, and platform architects.
- **Key Value**: Delivers the tactile feel of Tines' frictionless workflow creation while showcasing the enterprise credibility and design polish of `tines.com`.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Hero & Landing Tour**:
   - Visitors land on the dark obsidian hero with the iconic tagline: *"The smart workflow platform. Build workflows, manage cases, and launch interactive pages."*
   - An interactive canvas preview in the hero lets users click "Trigger Simulation" to see data stream across interconnected nodes.
2. **Customer Proof & Feature Deep Dive**:
   - Subtle animated logo wall of Fortune 500 & tech leaders (Coinbase, GitLab, Canva, Mars, McKesson).
   - Core pillar breakdown tabs: **Workflows** (deterministic & AI agents), **Cases** (centralized incident command), and **Pages** (no-code interactive forms).
   - Interactive Template Library (Suspicious Login Alert, Phishing Triage, Employee Offboarding, Vulnerability Scan Enricher) with "Load into Builder" action.
3. **Deep Sandbox Builder ("Open Studio" / Interactive Playground)**:
   - Full drag-and-canvas viewport with grid dots, panning, and zoom controls.
   - Node pallet: Webhook Receiver, LLM Prompt Analyzer, HTTP Enricher (VirusTotal / Okta), Decision Branch, Case Creator, and Slack Notification.
   - **Webhook Trigger & Mock Tester**: Interactive test payload modal where users can modify JSON (e.g., sender email, suspicious IP, risk score) and click *"Send Test Event"*.
   - **Step-by-step Visual Execution**: Real-time glow animations propagating along SVG bezier connection lines, node status indicators (Queued -> Running -> Succeeded), and expandable execution drawer detailing JSON inputs and outputs.
   - **Cases & Pages Previews**: Interactive preview drawer showing how a created Case or Page renders within Tines.

#### Visual Identity & Theme
- **Aesthetic Direction**: Ultra-clean, high-contrast dark enterprise developer aesthetic. Glassmorphic frosted panels, subtle radial glow lights, and hairline dividers.
- **Color Palette**:
  - Background Canvas: `#070A0F` and `#0B0F17`
  - Structural Cards & Surfaces: `#111827` and `rgba(255, 255, 255, 0.04)`
  - Border Lines: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`
  - Accent Green / Emerald: `#10B981` (primary), `#34D399` (light glow), `#059669` (border hover)
  - Text Hierarchy: `#F9FAFB` (headings), `#9CA3AF` (body), `#6B7280` (metadata)
- **Typography**:
  - Display / Hero: `Plus Jakarta Sans`, tight tracking (`tracking-tight`)
  - Body: `Plus Jakarta Sans` / `DM Sans`
  - Code & Payload Inspector: `JetBrains Mono` with `tabular-nums`
- **Layout Rhythm**: Strict 1-row 3-zone top bar contract, asymmetric bento cards, responsive mobile drawer, and zero-pill typographic discipline.

---

### 3. Key Product Decisions & Trade-Offs

- **Integrated Homepage + Fullscreen Studio Toggle**:
  - *Chosen Approach*: Users can explore the landing page with embedded interactive widgets, or click "Open Studio" in the navigation bar to enter the distraction-free full-screen workflow builder.
  - *Why*: Balances 1:1 website replication with the user's explicit request for a deep sandbox.
- **Client-Side Reactive Execution Engine**:
  - *Chosen Approach*: Built-in deterministic workflow runner with async simulated delays, JSON payload transforms, and step-by-step state logging.
  - *Why*: Instant, zero-latency feedback without external backend dependencies; supports infinite retries and custom test inputs.
- **Interactive Preset Templates**:
  - *Chosen Approach*: Supply 3 battle-tested enterprise security workflow presets that users can swap with 1 click.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                          Tines Applet                           │
│                                                                 │
│  ┌───────────────────────┐           ┌──────────────────────┐   │
│  │ Navigation Header     │           │ View Mode State      │   │
│  │ (3-Zone Tines Nav)    │           │ (Marketing vs Studio)│   │
│  └───────────┬───────────┘           └──────────┬───────────┘   │
│              │                                  │               │
│              ▼                                  ▼               │
│  ┌─────────────────────────┐        ┌─────────────────────────┐ │
│  │ Marketing Presentation  │        │ Workflow Studio Sandbox │ │
│  │ • Hero + Live Diagram   │        │ • Canvas Grid & Nodes   │ │
│  │ • Customer Proof Wall   │        │ • Webhook Event Tester  │ │
│  │ • 3 Pillars (W, C, P)   │        │ • Real-time Execution   │ │
│  │ • Interactive Templates │        │ • Payload Inspector     │ │
│  │ • ROI Value Calculator  │        │ • Case / Page Previews  │ │
│  └─────────────────────────┘        └─────────────────────────┘ │
│                                                  ▲              │
│                                                  │              │
│                        ┌─────────────────────────┴──────────┐   │
│                        │ In-Memory Workflow Simulation Core │   │
│                        │ • Node graph schema                │   │
│                        │ • Event queue & step execution     │   │
│                        │ • JSON schema evaluation & logs    │   │
│                        └────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### State & Data Models
- **Workflow Node**: `{ id, type, label, description, icon, position: {x,y}, config, status: 'idle'|'running'|'success'|'error', lastOutput }`
- **Node Connection (Edge)**: `{ id, sourceId, targetId, condition? }`
- **Execution Event / Log**: `{ timestamp, nodeId, status, durationMs, inputPayload, outputPayload }`
- **Test Webhook Payload**: Editable JSON string (validated with live error checking).

#### Interactive Capabilities Provided
- [x] Zoom & Pan canvas with mouse or touch
- [x] Select node to inspect parameters, raw input, and output
- [x] Add new action nodes to the story graph
- [x] Run single node or trigger full pipeline end-to-end
- [x] Live simulated data flow with glowing signal particles on connecting curves
- [x] Webhook tester modal: inject mock security incidents (Phishing email, AWS GuardDuty alert, Okta Suspicious Login)
- [x] Switch effortlessly between marketing showcase and full studio sandbox
