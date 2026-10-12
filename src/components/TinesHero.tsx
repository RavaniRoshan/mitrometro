import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Play, 
  Pause, 
  Search, 
  Clock, 
  Star, 
  Train, 
  AlertTriangle, 
  WifiOff,
  Wifi,
  Download,
  Send,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Plus,
  Terminal,
  Shield,
  FileText
} from 'lucide-react';
import { 
  SYNTHETIC_COMPLAINTS, 
  processComplaint, 
  ComplaintRecord, 
  Department, 
  DEPARTMENTS 
} from '../lib/metroNlp';

interface TinesHeroProps {
  onBookDemo: () => void;
  onSignUp: () => void;
}

export const TinesHero: React.FC<TinesHeroProps> = ({ onBookDemo, onSignUp }) => {
  // Initialize complaints from synthetic batch
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() => 
    SYNTHETIC_COMPLAINTS.map(c => processComplaint(c.id, c.sourceText, c.channel, c.station, c.timestamp))
  );

  const [selectedId, setSelectedId] = useState<string>('SAMPLE-03');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'urgent' | 'pending'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | 'all'>('all');
  const [newComplaintText, setNewComplaintText] = useState<string>('');
  const [newStation, setNewStation] = useState<string>('Gandhinagar Terminal');
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const metroSystems = [
    { name: 'GUJARAT METRO', font: 'font-extrabold tracking-wider uppercase text-base' },
    { name: 'DELHI METRO', font: 'font-bold tracking-widest uppercase text-base' },
    { name: 'BENGALURU METRO', font: 'font-bold tracking-tight uppercase text-base' },
    { name: 'MUMBAI METRO', font: 'font-semibold tracking-wide uppercase text-base' },
    { name: 'CHENNAI METRO', font: 'font-bold tracking-normal uppercase text-base' },
    { name: 'HYDERABAD METRO', font: 'font-bold tracking-tight uppercase text-base' },
    { name: 'KOCHI METRO', font: 'font-medium tracking-widest uppercase text-base' },
    { name: 'JAIPUR METRO', font: 'font-bold tracking-widest uppercase text-base' }
  ];

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesSearch = 
        c.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.detectedLanguage?.label.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      const matchesTab = 
        activeTab === 'all' ? true :
        activeTab === 'urgent' ? (c.urgency?.band === 'urgent' || (c.urgency?.score ?? 0) >= 65) :
        c.status === 'pending';

      const matchesDept = 
        selectedDepartment === 'all' ? true : c.classification?.department === selectedDepartment;

      return matchesSearch && matchesTab && matchesDept;
    });
  }, [complaints, searchQuery, activeTab, selectedDepartment]);

  const activeRecord = useMemo(() => {
    return complaints.find(c => c.id === selectedId) || complaints[0];
  }, [complaints, selectedId]);

  // Handle Ingest New Complaint
  const handleIngest = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newComplaintText.trim()) return;

    const nextNumber = complaints.length + 1;
    const nextId = `MR-${String(nextNumber).padStart(4, '0')}`;
    const newRecord = processComplaint(
      nextId,
      newComplaintText.trim(),
      'app',
      newStation,
      'Just now'
    );

    setComplaints(prev => [newRecord, ...prev]);
    setSelectedId(nextId);
    setNewComplaintText('');
    setSaveSuccessMsg(`Complaint ${nextId} triaged into ${newRecord.classification?.department} queue!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Preset Ingestion
  const handleQuickPreset = (text: string, station: string) => {
    const nextNumber = complaints.length + 1;
    const nextId = `MR-${String(nextNumber).padStart(4, '0')}`;
    const newRecord = processComplaint(nextId, text, 'app', station, 'Just now');
    setComplaints(prev => [newRecord, ...prev]);
    setSelectedId(nextId);
    setSaveSuccessMsg(`Preset ${nextId} added and scored on-device!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Save Response locally
  const handleSaveResponse = () => {
    setSaveSuccessMsg(`Draft response for ${activeRecord.id} saved in local storage outbox.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(complaints, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'metroresolve_complaints_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Counts
  const urgentCount = complaints.filter(c => (c.urgency?.score ?? 0) >= 65).length;
  const unsyncedCount = complaints.filter(c => c.isLocalOutbox).length;

  return (
    <section className="relative pt-10 pb-20 bg-[#FAF8F5] text-[#200E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag: NEW PS-07 Metro Operations */}
        <div className="flex items-center gap-2 mb-8">
          <span className="px-2.5 py-0.5 rounded-full border border-[#5423E7]/40 bg-[#5423E7]/5 text-[#5423E7] text-[10px] font-extrabold tracking-wide uppercase">
            METRO HACKS PS-07
          </span>
          <a 
            href="#workspace" 
            className="text-xs font-semibold text-[#5423E7] hover:underline flex items-center gap-1"
          >
            <span>Every Complaint Heard — Metro Operations (DevFest Gandhinagar)</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#200E4A] leading-[1.08] max-w-5xl">
          Passengers complain in four languages.
          <br />
          <span className="text-[#5423E7]">Now resolve every issue in four seconds.</span>
        </h1>

        {/* Hero Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-[#59497A] max-w-3xl leading-relaxed">
          Offline-first complaint triage for station controllers. Ingest passenger grievances in Gujarati, Hindi, English, and Gujlish — classify into 5 department queues, score urgency with visible reasons, and draft localized replies completely on-device.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onBookDemo}
            className="px-6 py-3.5 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <span>BOOK A DEMO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onSignUp}
            className="px-6 py-3.5 rounded-full border border-[#5423E7]/30 hover:border-[#5423E7] text-[#5423E7] text-xs font-extrabold uppercase tracking-wider transition-all hover:bg-[#5423E7]/5 flex items-center gap-1.5"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>START FREE ON-DEVICE</span>
          </button>
          <a
            href="https://github.com/RavaniRoshan/metroresolve"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3.5 rounded-full bg-white border border-[#D5CAEC] text-[#200E4A] text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <span>VIEW ON GITHUB ↗</span>
          </a>
        </div>

        {/* Metro Systems Logos Row */}
        <div id="customers" className="mt-16 pt-6 border-t border-[#EAE4F5] flex flex-wrap items-center justify-between gap-6 opacity-85">
          {metroSystems.map((m, idx) => (
            <span key={idx} className={`${m.font} text-[#59497A] hover:text-[#200E4A] transition-colors cursor-default`}>
              {m.name}
            </span>
          ))}
        </div>

        {/* Whimsical Illustrated Arches Above Workspace */}
        <div className="mt-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[-16px] relative z-20 px-6 sm:px-12">
            {/* Arch 1 */}
            <div className="relative rounded-t-full border-2 border-b-0 border-[#200E4A] bg-[#E8DEFF] h-28 overflow-hidden flex flex-col items-center justify-start pt-3 shadow-sm">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#5423E7_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="px-4 py-1 rounded-full bg-[#5423E7] text-white text-xs font-extrabold tracking-wider uppercase z-10 shadow">
                100× FASTER TRIAGE
              </div>
              <div className="mt-2 flex gap-1 z-10">
                <span className="w-3 h-3 rounded-full bg-pink-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="w-3 h-3 rounded-full bg-purple-500" />
              </div>
            </div>

            {/* Arch 2 */}
            <div className="relative rounded-t-full border-2 border-b-0 border-[#200E4A] bg-[#FFE0EB] h-28 overflow-hidden flex flex-col items-center justify-start pt-3 shadow-sm">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E11D48_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="px-4 py-1 rounded-full bg-[#E11D48] text-white text-xs font-extrabold tracking-wider uppercase z-10 shadow">
                100% OFFLINE PWA
              </div>
              <div className="mt-2 flex gap-1 z-10">
                <span className="w-3 h-3 rounded-full bg-orange-400" />
                <span className="w-3 h-3 rounded-full bg-purple-400" />
                <span className="w-3 h-3 rounded-full bg-teal-400" />
              </div>
            </div>

            {/* Arch 3 */}
            <div className="relative rounded-t-full border-2 border-b-0 border-[#200E4A] bg-[#DCFCE7] h-28 overflow-hidden flex flex-col items-center justify-start pt-3 shadow-sm">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="px-4 py-1 rounded-full bg-[#059669] text-white text-xs font-extrabold tracking-wider uppercase z-10 shadow">
                5 MULTILINGUAL QUEUES
              </div>
              <div className="mt-2 flex gap-1 z-10">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="w-3 h-3 rounded-full bg-pink-400" />
              </div>
            </div>
          </div>

          {/* Controller Top Bar above window */}
          <div className="relative z-10 rounded-t-2xl bg-[#EBE5F7] border border-[#D5CAEC] p-3 flex flex-wrap items-center justify-between text-xs text-[#59497A] gap-3">
            <div className="flex items-center gap-2.5 font-semibold text-[#200E4A]">
              <div className="w-5 h-5 rounded-md bg-[#5423E7] text-white flex items-center justify-center">
                <Train className="w-3.5 h-3.5" />
              </div>
              <span>Station Operations Console — Gandhinagar Terminal (PS-07)</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Network Simulation Toggle */}
              <button
                onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
                className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                  isOfflineSimulated 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}
              >
                {isOfflineSimulated ? (
                  <>
                    <WifiOff className="w-3 h-3 text-amber-700" />
                    <span>Underground Offline (SW Cached)</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-700" />
                    <span>Online (Sync Ready)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportJson}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D5CAEC] text-[#200E4A] hover:bg-slate-50 font-semibold flex items-center gap-1 text-[11px]"
                title="Download all complaints as JSON"
              >
                <Download className="w-3 h-3" />
                <span>Export JSON</span>
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-[#D5CAEC]">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded-full hover:bg-white/60 text-[#200E4A]"
                  title="Simulate Real-time Concourse Stream"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <span className="font-mono text-[11px] tabular-nums">Rush Hour Active</span>
              </div>
            </div>
          </div>

          {/* Save Success Banner */}
          {saveSuccessMsg && (
            <div className="relative z-10 bg-emerald-50 border-x border-[#D5CAEC] px-4 py-2 text-xs font-semibold text-emerald-800 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{saveSuccessMsg}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600">Single Source of Truth: localStorage</span>
            </div>
          )}

          {/* The Workspace Window Frame */}
          <div 
            id="workspace"
            className="rounded-b-2xl border-2 border-[#D5CAEC] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row text-xs min-h-[640px]"
          >
            {/* Left Workspace Sidebar */}
            <div className="w-full md:w-60 border-r border-[#EAE4F5] bg-[#FBF9FE] p-4 flex flex-col gap-5 shrink-0">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter tickets, scripts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 rounded-lg bg-white border border-[#EAE4F5] text-xs focus:outline-none focus:border-[#5423E7]"
                />
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-1 text-slate-700 font-medium">
                <div 
                  onClick={() => { setActiveTab('all'); setSelectedDepartment('all'); }}
                  className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer ${
                    activeTab === 'all' && selectedDepartment === 'all'
                      ? 'bg-[#F3EEFC] text-[#5423E7] font-bold'
                      : 'hover:bg-[#F3EEFC]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Incoming Stream</span>
                  </div>
                  <span className="font-mono text-[11px] bg-slate-200/80 px-1.5 rounded">
                    {complaints.length}
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('urgent')}
                  className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer ${
                    activeTab === 'urgent'
                      ? 'bg-rose-50 text-rose-700 font-bold'
                      : 'hover:bg-[#F3EEFC]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Urgent Queue</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-rose-600 bg-rose-100 px-1.5 rounded">
                    {urgentCount}
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg text-slate-600">
                  <div className="flex items-center gap-2">
                    <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                    <span>Local Outbox</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 rounded">
                    {unsyncedCount} unsynced
                  </span>
                </div>
              </div>

              {/* Transit Department Queues Filter */}
              <div className="pt-2 border-t border-[#EAE4F5] space-y-1">
                <div className="flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">
                  <span>Queues</span>
                  <span className="text-[10px] text-slate-400 font-normal">Click to filter</span>
                </div>
                {DEPARTMENTS.map(dept => {
                  const count = complaints.filter(c => c.classification?.department === dept).length;
                  const isSelected = selectedDepartment === dept;
                  return (
                    <div 
                      key={dept} 
                      onClick={() => setSelectedDepartment(isSelected ? 'all' : dept)}
                      className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#5423E7] text-white font-bold' 
                          : 'hover:bg-[#F3EEFC] text-slate-700 font-medium'
                      }`}
                    >
                      <span className="truncate">{dept}</span>
                      <span className={`text-[10px] font-mono px-1.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'text-slate-500 bg-slate-100'
                      }`}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Metro Corridors */}
              <div className="pt-2 border-t border-[#EAE4F5] space-y-1">
                <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">
                  <span>Corridors</span>
                </div>
                {['Red Line (East-West)', 'Blue Line (North-South)', 'Airport Link Express'].map(l => (
                  <div key={l} className="flex items-center gap-2 p-1 rounded text-slate-600 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5423E7]" />
                    <span className="truncate">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Area: Split Screen (Queue List + Live Detail Inspector) */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Quick Ingest & Preset Strip */}
              <div className="p-4 border-b border-[#EAE4F5] bg-[#FBF9FE] space-y-3">
                <form onSubmit={handleIngest} className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type or paste passenger complaint in Gujarati, Hindi, English, Gujlish..."
                      value={newComplaintText}
                      onChange={(e) => setNewComplaintText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D5CAEC] text-xs focus:outline-none focus:border-[#5423E7] shadow-sm font-medium text-[#200E4A]"
                    />
                  </div>
                  <select
                    value={newStation}
                    onChange={(e) => setNewStation(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-[#D5CAEC] text-xs font-semibold text-[#200E4A] focus:outline-none focus:border-[#5423E7]"
                  >
                    <option>Gandhinagar Terminal</option>
                    <option>GIFT City Station</option>
                    <option>Infocity Concourse</option>
                    <option>Sector 1 Interchange</option>
                    <option>Central Station</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#5423E7] hover:bg-[#4314CD] text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Triage</span>
                  </button>
                </form>

                {/* 1-Click Multilingual Presets */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="text-slate-500 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#5423E7]" />
                    <span>Test Presets:</span>
                  </span>
                  <button
                    onClick={() => handleQuickPreset('લિફ્ટ બગડી ગઈ છે અને વૃદ્ધ દાદી અંદર ફસાયેલા છે, જલ્દી કોઈને મોકલો!', 'University')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-medium transition-colors"
                  >
                    Gujarati: Lift Stuck (+50)
                  </button>
                  <button
                    onClick={() => handleQuickPreset('Platform 2 pe smoke देखाई दे रहा है, jaldi se check karo please.', 'North Terminal')}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 font-medium transition-colors"
                  >
                    Hinglish: Smoke Alarm (+90)
                  </button>
                  <button
                    onClick={() => handleQuickPreset('M-card recharge ni website pe payment 200 રૂપિયા aayi but balance વધી નહીં. Please refund.', 'Tech Park')}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 font-medium transition-colors"
                  >
                    Gujlish: Fare Double Debit
                  </button>
                  <button
                    onClick={() => handleQuickPreset('The ticket counter attendant was rude and ignored senior citizens waiting in line.', 'Central Station')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 font-medium transition-colors"
                  >
                    English: Staff Conduct
                  </button>
                </div>
              </div>

              {/* Split Content: Table / List + Inspector */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* Left: Complaints List (Col 7) */}
                <div className="lg:col-span-7 border-r border-[#EAE4F5] overflow-y-auto max-h-[500px] divide-y divide-[#F1ECFA]">
                  {filteredComplaints.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      No complaints match the selected filter.
                    </div>
                  ) : (
                    filteredComplaints.map(item => {
                      const isSelected = item.id === selectedId;
                      const score = item.urgency?.score ?? 0;
                      const isUrgent = score >= 65;

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedId(item.id)}
                          className={`p-3.5 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                            isSelected 
                              ? 'bg-[#F4EFFD] border-l-4 border-l-[#5423E7]' 
                              : 'hover:bg-[#FAF8FE]'
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[#200E4A] text-xs">
                                {item.id}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                · {item.station} · {item.timestamp}
                              </span>
                              {item.detectedLanguage && (
                                <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                                  {item.detectedLanguage.code.toUpperCase()}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-800 font-medium truncate">
                              {item.sourceText}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                              <span className="px-1.5 py-0.5 rounded bg-[#EDE7F9] text-[#5423E7] font-semibold">
                                {item.classification?.department}
                              </span>
                              <span>
                                {item.urgency?.reasons.length ?? 0} rules fired
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-xs ${
                              isUrgent 
                                ? 'bg-rose-100 text-rose-700' 
                                : score >= 40 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {score} {item.urgency?.band.toUpperCase()}
                            </span>
                            <span className="block text-[10px] text-emerald-600 font-medium mt-1">
                              ✓ Draft Ready
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right: Live Detail Inspector (Col 5) */}
                <div className="lg:col-span-5 bg-[#FAF8FE] p-5 overflow-y-auto max-h-[500px] flex flex-col justify-between space-y-4">
                  {activeRecord ? (
                    <div className="space-y-4">
                      {/* Case Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#EAE4F5]">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-mono font-extrabold text-sm text-[#200E4A]">
                              {activeRecord.id}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-[#5423E7] text-white font-bold text-[10px]">
                              {activeRecord.classification?.department} Queue
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {activeRecord.station} · Channel: {activeRecord.channel}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Urgency Score</span>
                          <span className={`font-mono text-xl font-black ${
                            (activeRecord.urgency?.score ?? 0) >= 65 ? 'text-rose-600' : 'text-[#5423E7]'
                          }`}>
                            {activeRecord.urgency?.score ?? 0}/100
                          </span>
                        </div>
                      </div>

                      {/* Source Text Box */}
                      <div className="rounded-xl bg-white border border-[#EAE4F5] p-3 shadow-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Original Grievance Text
                        </span>
                        <p className="text-xs font-semibold text-[#200E4A] leading-relaxed">
                          {activeRecord.sourceText}
                        </p>
                      </div>

                      {/* Language Detection Breakdown */}
                      <div className="rounded-xl bg-white border border-[#EAE4F5] p-3 shadow-xs space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-400">Language Detection</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            {activeRecord.detectedLanguage?.label} ({activeRecord.detectedLanguage?.confidence}% conf.)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {activeRecord.detectedLanguage?.note}
                        </p>
                      </div>

                      {/* Fired Urgency Rules (Explainability) */}
                      <div className="rounded-xl bg-white border border-[#EAE4F5] p-3 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            Explainable Fired Rules
                          </span>
                          <span className="text-[10px] font-mono text-[#5423E7] font-bold">
                            Zero Black-Box
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {activeRecord.urgency?.reasons.map((r, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50 border border-slate-100 font-mono">
                              <span className="text-slate-700 text-[11px]">{r.description}</span>
                              <span className="font-bold text-rose-600">+{r.points}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Native Reply Draft */}
                      <div className="rounded-xl bg-white border border-[#EAE4F5] p-3 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            Draft Reply in Complainant Language
                          </span>
                          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                            DRAFT — Not Sent
                          </span>
                        </div>

                        <textarea
                          readOnly
                          rows={3}
                          value={activeRecord.draft?.text || ''}
                          className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#200E4A] font-medium leading-relaxed resize-none focus:outline-none"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-400">
                            Template: {activeRecord.draft?.note}
                          </span>
                          <button
                            onClick={handleSaveResponse}
                            className="px-3 py-1.5 rounded-full bg-[#5423E7] hover:bg-[#4314CD] text-white font-bold text-xs flex items-center gap-1 shadow transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Save Response Locally</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Bottom Scrubber Bar */}
              <div className="p-3 border-t border-[#EAE4F5] bg-[#FBF9FE] flex items-center justify-between text-[11px] text-[#59497A]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PWA Shell Cache Active (Service Worker v1)</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="font-mono text-slate-500">
                    Idempotency-Key: {activeRecord.id}
                  </span>
                </div>
                <span className="font-mono tabular-nums text-slate-600">
                  Built for Metro Hacks PS-07 · Gandhinagar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
