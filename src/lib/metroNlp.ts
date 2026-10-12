export type LanguageCode = 'en' | 'hi' | 'gu' | 'gujlish' | 'hinglish';
export type Department = 'Safety' | 'Cleanliness' | 'Fare' | 'Lifts' | 'Staff Behaviour';
export type DepartmentOrUnclassified = Department | 'Unclassified';
export type UrgencyBand = 'low' | 'normal' | 'high' | 'urgent';

export interface UrgencyReason {
  ruleId: string;
  description: string;
  points: number;
}

export interface UrgencyResult {
  score: number;
  band: UrgencyBand;
  reasons: UrgencyReason[];
}

export interface LanguageDetectionResult {
  code: LanguageCode;
  label: string;
  confidence: number;
  note: string;
}

export interface ClassificationResult {
  department: DepartmentOrUnclassified;
  scores: Record<Department, number>;
  matchedSignals: { department: Department; term: string; weight: number }[];
}

export interface DraftResult {
  text: string;
  languageUsed: 'en' | 'hi' | 'gu';
  note: string;
}

export interface ComplaintRecord {
  id: string;
  sourceText: string;
  channel: string;
  station: string;
  timestamp: string;
  detectedLanguage?: LanguageDetectionResult;
  classification?: ClassificationResult;
  urgency?: UrgencyResult;
  draft?: DraftResult;
  status: 'pending' | 'triaged' | 'resolved';
  isLocalOutbox?: boolean;
}

// ---------------------------------------------------------------------------
// Language detection
// ---------------------------------------------------------------------------
export function detectLanguage(text: string): LanguageDetectionResult {
  const gujaratiScript = /[\u0A80-\u0AFF]/g;
  const devanagariScript = /[\u0900-\u097F]/g;

  const gujaratiChars = (text.match(gujaratiScript) || []).length;
  const devanagariChars = (text.match(devanagariScript) || []).length;
  const totalChars = text.replace(/\s+/g, '').length || 1;

  if (gujaratiChars / totalChars > 0.15) {
    return {
      code: 'gu',
      label: 'Gujarati (ગુજરાતી)',
      confidence: Math.min(99, Math.round((gujaratiChars / totalChars) * 100) + 15),
      note: 'Native Gujarati script detected on-device.',
    };
  }

  if (devanagariChars / totalChars > 0.15) {
    return {
      code: 'hi',
      label: 'Hindi (हिन्दी)',
      confidence: Math.min(99, Math.round((devanagariChars / totalChars) * 100) + 15),
      note: 'Devanagari script detected on-device.',
    };
  }

  const lower = text.toLowerCase();
  const gujlishTokens = ['che', 'nathi', 'aavi', 'hatau', 'maate', 'karjo', 'bandh', 'vadhare', 'paisa'];
  const hinglishTokens = ['hai', 'nahi', 'karo', 'hua', 'gaya', 'bahut', 'jaldi', 'dekhai', 'kripya'];

  let gujlishMatches = 0;
  for (const t of gujlishTokens) {
    if (new RegExp(`\\b${t}\\b`, 'i').test(lower)) gujlishMatches++;
  }

  let hinglishMatches = 0;
  for (const t of hinglishTokens) {
    if (new RegExp(`\\b${t}\\b`, 'i').test(lower)) hinglishMatches++;
  }

  if (gujlishMatches >= 1 && gujlishMatches >= hinglishMatches) {
    return {
      code: 'gujlish',
      label: 'Gujlish (Romanized Gujarati)',
      confidence: 82,
      note: 'Romanized Gujarati lexicon detected. Handled with English base template + local context.',
    };
  }

  if (hinglishMatches >= 1) {
    return {
      code: 'hinglish',
      label: 'Hinglish (Romanized Hindi)',
      confidence: 84,
      note: 'Romanized Hindi lexicon detected. Categorized with dual-script heuristics.',
    };
  }

  return {
    code: 'en',
    label: 'English',
    confidence: 96,
    note: 'Latin script English text detected.',
  };
}

// ---------------------------------------------------------------------------
// Department Classification Keywords & Rules
// ---------------------------------------------------------------------------
export const DEPARTMENTS: Department[] = [
  'Safety',
  'Cleanliness',
  'Fare',
  'Lifts',
  'Staff Behaviour',
];

export const DEPARTMENT_KEYWORDS: Record<Department, { term: string; weight: number }[]> = {
  Safety: [
    { term: 'fire', weight: 5 },
    { term: 'smoke', weight: 5 },
    { term: 'accident', weight: 5 },
    { term: 'injur', weight: 5 },
    { term: 'hurt', weight: 4 },
    { term: 'flame', weight: 5 },
    { term: 'alarm', weight: 3 },
    { term: 'emergency exit', weight: 4 },
    { term: 'આગ', weight: 5 },
    { term: 'ધુમાડો', weight: 5 },
    { term: 'ધુમ્મસ', weight: 4 },
    { term: 'અકસ્માત', weight: 5 },
    { term: 'જોખમ', weight: 4 },
    { term: 'सुरक्षा', weight: 4 },
    { term: 'आग', weight: 5 },
    { term: 'धुआं', weight: 5 },
    { term: 'दुर्घटना', weight: 5 },
    { term: 'खतरा', weight: 4 },
  ],
  Cleanliness: [
    { term: 'dirty', weight: 4 },
    { term: 'clean', weight: 3 },
    { term: 'toilet', weight: 5 },
    { term: 'washroom', weight: 5 },
    { term: 'garbage', weight: 4 },
    { term: 'trash', weight: 4 },
    { term: 'spill', weight: 4 },
    { term: 'leak', weight: 4 },
    { term: 'smell', weight: 3 },
    { term: 'slippery', weight: 4 },
    { term: 'કચરો', weight: 4 },
    { term: 'ગંદકી', weight: 4 },
    { term: 'ટોયલેટ', weight: 5 },
    { term: 'સ્લિપ', weight: 4 },
    { term: 'પાણી ટપકી', weight: 4 },
    { term: 'कचरा', weight: 4 },
    { term: 'गंदा', weight: 4 },
    { term: 'सफाई', weight: 4 },
    { term: 'टॉयलेट', weight: 5 },
    { term: 'बदबू', weight: 3 },
  ],
  Fare: [
    { term: 'fare', weight: 5 },
    { term: 'recharge', weight: 5 },
    { term: 'token', weight: 5 },
    { term: 'card', weight: 3 },
    { term: 'm-card', weight: 5 },
    { term: 'ncmc', weight: 5 },
    { term: 'refund', weight: 4 },
    { term: 'charged', weight: 4 },
    { term: 'deduct', weight: 4 },
    { term: 'gate', weight: 3 },
    { term: 'flap gate', weight: 4 },
    { term: 'રિચાર્જ', weight: 5 },
    { term: 'ટોકન', weight: 5 },
    { term: 'કાર્ડ', weight: 3 },
    { term: 'રૂપિયા', weight: 3 },
    { term: 'રીફંડ', weight: 4 },
    { term: 'किराया', weight: 5 },
    { term: 'रिचार्ज', weight: 5 },
    { term: 'टोकन', weight: 5 },
    { term: 'पैसे', weight: 4 },
    { term: 'रिफंड', weight: 4 },
    { term: 'बैलेंस', weight: 4 },
  ],
  Lifts: [
    { term: 'lift', weight: 5 },
    { term: 'elevator', weight: 5 },
    { term: 'escalator', weight: 5 },
    { term: 'stuck', weight: 4 },
    { term: 'trapped', weight: 5 },
    { term: 'wheelchair', weight: 4 },
    { term: 'disabled', weight: 3 },
    { term: 'stairs', weight: 2 },
    { term: 'લિફ્ટ', weight: 5 },
    { term: 'એસ્કેલેટર', weight: 5 },
    { term: 'ફંસી', weight: 5 },
    { term: 'ફસાયેલા', weight: 5 },
    { term: 'વ્હીલચેર', weight: 4 },
    { term: 'બગડી ગઈ', weight: 4 },
    { term: 'लिफ्ट', weight: 5 },
    { term: 'एस्केलेटर', weight: 5 },
    { term: 'फंसा', weight: 5 },
    { term: 'व्हीलचेयर', weight: 4 },
    { term: 'काम नहीं कर रही', weight: 4 },
  ],
  'Staff Behaviour': [
    { term: 'staff', weight: 4 },
    { term: 'rude', weight: 5 },
    { term: 'attendant', weight: 4 },
    { term: 'guard', weight: 4 },
    { term: 'security guard', weight: 4 },
    { term: 'behaviour', weight: 5 },
    { term: 'shouted', weight: 4 },
    { term: 'ignored', weight: 4 },
    { term: 'harass', weight: 5 },
    { term: 'સુરક્ષા કર્મચારી', weight: 5 },
    { term: 'વર્તન', weight: 4 },
    { term: 'અસભ્ય', weight: 5 },
    { term: 'સાંભળી નહીં', weight: 4 },
    { term: 'कर्मचारी', weight: 4 },
    { term: 'व्यवहार', weight: 5 },
    { term: 'बदतमीजी', weight: 5 },
    { term: 'अनदेखा', weight: 4 },
  ],
};

export function classifyDepartment(text: string): ClassificationResult {
  const scores: Record<Department, number> = {
    Safety: 0,
    Cleanliness: 0,
    Fare: 0,
    Lifts: 0,
    'Staff Behaviour': 0,
  };
  const matchedSignals: { department: Department; term: string; weight: number }[] = [];

  const lower = text.toLowerCase();

  for (const dept of DEPARTMENTS) {
    for (const kw of DEPARTMENT_KEYWORDS[dept]) {
      if (lower.includes(kw.term.toLowerCase()) || text.includes(kw.term)) {
        scores[dept] += kw.weight;
        matchedSignals.push({ department: dept, term: kw.term, weight: kw.weight });
      }
    }
  }

  let bestDept: DepartmentOrUnclassified = 'Unclassified';
  let highestScore = 0;

  for (const dept of DEPARTMENTS) {
    if (scores[dept] > highestScore) {
      highestScore = scores[dept];
      bestDept = dept;
    }
  }

  return {
    department: highestScore > 0 ? bestDept : 'Safety', // Default sensible fallback
    scores,
    matchedSignals: matchedSignals.sort((a, b) => b.weight - a.weight),
  };
}

// ---------------------------------------------------------------------------
// 9 Transparent Urgency Scoring Rules (Single source of truth)
// ---------------------------------------------------------------------------
export const URGENCY_RULES = [
  {
    id: 'fire-signal',
    description: 'Fire / smoke signal in complaint text',
    points: 50,
    pattern: /\b(fire|smoke|smoking|flame|flames)\b|आग|धुआं|धुंध|આગ|ધુમાડો/i,
  },
  {
    id: 'trapped-signal',
    description: 'Person trapped / stuck / blocked egress signal',
    points: 50,
    pattern: /\b(trapped|stuck|locked)\b|फंस|जाम|ફંસ|જામ|બંધ|ફસાયેલા/i,
  },
  {
    id: 'harm-signal',
    description: 'Personal injury / violence / crime risk',
    points: 40,
    pattern: /\b(accident|injur|hurt|assault|harass|theft|fight|collapse)\b|दुर्घटना|चोट|हमला|દુર્ઘટના|અપઘાત/i,
  },
  {
    id: 'hazard-signal',
    description: 'Slip / trip / liquid spillage hazard',
    points: 20,
    pattern: /\b(spill|spilled|slippery|slip|leak|leakage|wet floor)\b|गीला|રિસાવા|સ્લિપ|ટપકી/i,
  },
  {
    id: 'safety-category',
    description: 'Classified into Safety department',
    points: 15,
    pattern: /./,
    appliesTo: (dept: DepartmentOrUnclassified) => dept === 'Safety',
  },
  {
    id: 'urgent-language',
    description: 'Explicit urgency phrasing ("urgent", "jaldi", "help")',
    points: 20,
    pattern: /\b(urgent|urgently|emergency|asap|help|jaldi|turant|madad)\b|जल्दी|तुरंत|मदद|જલ્દી|તુરંત|મદદ/i,
  },
  {
    id: 'in-person-channel',
    description: 'Reported in person at station controller booth',
    points: 10,
    pattern: /./,
    appliesTo: (_: DepartmentOrUnclassified, ch?: string) => ch === 'in-person',
  },
  {
    id: 'accessibility-impact',
    description: 'Accessibility impact (wheelchair, senior citizen, disabled)',
    points: 30,
    pattern: /\b(wheelchair|disabled|accessibility|senior|elderly)\b|व्हीलचेयर|दिव्यांग|વ્હીલચેર|દિવ્યાંગ|વૃદ્ધ/i,
  },
  {
    id: 'service-outage',
    description: 'Service hardware outage ("not working", "broken")',
    points: 10,
    pattern: /\b(not working|broken|jammed|out of order)\b|काम नहीं|ટૂટી|બગડી/i,
  },
];

export function assessUrgency(
  text: string,
  department: DepartmentOrUnclassified,
  channel: string = 'app'
): UrgencyResult {
  const reasons: UrgencyReason[] = [];
  let score = 0;

  for (const rule of URGENCY_RULES) {
    let matched = false;
    if (rule.appliesTo) {
      matched = rule.appliesTo(department, channel);
    } else if (rule.pattern) {
      matched = rule.pattern.test(text);
    }

    if (matched) {
      score += rule.points;
      reasons.push({
        ruleId: rule.id,
        description: rule.description,
        points: rule.points,
      });
    }
  }

  score = Math.min(100, score);
  const band: UrgencyBand =
    score >= 65 ? 'urgent' : score >= 40 ? 'high' : score >= 20 ? 'normal' : 'low';

  return { score, band, reasons };
}

// ---------------------------------------------------------------------------
// Response Drafting in Complainant's Language
// ---------------------------------------------------------------------------
export function generateReplyDraft(
  lang: LanguageCode,
  dept: DepartmentOrUnclassified,
  station: string,
  caseId: string
): DraftResult {
  const deptLabels = {
    Safety: { en: 'Safety', hi: 'सुरक्षा', gu: 'સુરક્ષા' },
    Cleanliness: { en: 'Cleanliness & Sanitation', hi: 'स्वच्छता', gu: 'સ્વચ્છતા' },
    Fare: { en: 'Fare & Smart Cards', hi: 'किराया एवं कार्ड', gu: 'કિંમત અને સ્માર્ટ કાર્ડ' },
    Lifts: { en: 'Lifts & Escalators', hi: 'लिफ्ट एवं एस्केलेटर', gu: 'લિફ્ટ અને એસ્કેલેટર' },
    'Staff Behaviour': { en: 'Staff Conduct', hi: 'कर्मचारी व्यवहार', gu: 'કર્મચારી વર્તન' },
    Unclassified: { en: 'General Operations', hi: 'सामान्य सेवा', gu: 'સામાન્ય સેવા' },
  };

  const currentLabel = deptLabels[dept] || deptLabels.Unclassified;

  switch (lang) {
    case 'gu':
      return {
        languageUsed: 'gu',
        note: 'Gujarati template draft generated on-device.',
        text: `${station} સ્ટેશન પર ${currentLabel.gu} સંબંધિત તમારી ફરિયાદ (કેસ ${caseId}) નોંધી લેવામાં આવી છે. સ્ટેશન કંટ્રોલર ટીમ અને સંબંધિત ટેકનિશિયનને તાત્કાલિક જાણ કરવામાં આવી છે. કૃપા કરીને થોડીવાર રાહ જુઓ. [DRAFT — not sent, not approved]`,
      };
    case 'hi':
      return {
        languageUsed: 'hi',
        note: 'Hindi template draft generated on-device.',
        text: `${station} स्टेशन पर ${currentLabel.hi} संबंधी शिकायत (केस ${caseId}) दर्ज कर ली गई है। हमारी स्टेशन कंट्रोलर टीम को सूचित किया गया है और वे इसकी तत्काल समीक्षा कर रहे हैं। [DRAFT — not sent, not approved]`,
      };
    case 'gujlish':
      return {
        languageUsed: 'en',
        note: 'Gujlish complaint detected. On-device English polite draft generated.',
        text: `Thank you for reporting the ${currentLabel.en} issue at ${station} (Case ${caseId}). The Gandhinagar station controller team has been notified. This is an editable draft acknowledgement — it has not been sent or approved.`,
      };
    case 'hinglish':
      return {
        languageUsed: 'en',
        note: 'Hinglish complaint detected. On-device English polite draft generated.',
        text: `Thank you for contacting MetroResolve regarding the ${currentLabel.en} issue at ${station} (Case ${caseId}). Our station response unit has received the alert. This is an editable draft acknowledgement — it has not been sent or approved.`,
      };
    default:
      return {
        languageUsed: 'en',
        note: 'English template draft generated on-device.',
        text: `Thank you for contacting MetroResolve about ${currentLabel.en} at ${station} (Case ${caseId}). The station operations controller has been alerted. This is an editable draft acknowledgement — it has not been sent or approved.`,
      };
  }
}

// ---------------------------------------------------------------------------
// 12 Synthetic Complaints from RavaniRoshan/metroresolve
// ---------------------------------------------------------------------------
export const SYNTHETIC_COMPLAINTS: Omit<ComplaintRecord, 'detectedLanguage' | 'classification' | 'urgency' | 'draft' | 'status'>[] = [
  {
    id: 'SAMPLE-01',
    sourceText: 'There was smoke coming from the escalator at Central Station. Feels like an electrical fire. Urgent!',
    channel: 'in-person',
    station: 'Central Station',
    timestamp: '10:41 AM',
  },
  {
    id: 'SAMPLE-02',
    sourceText: 'પ્લેટફોર્મ પર કચરો બિખરેલો છે અને ટોયલેટ બહુ ગંદુ છે. સફાઈ કરાવો.',
    channel: 'app',
    station: 'Old Market',
    timestamp: '10:42 AM',
  },
  {
    id: 'SAMPLE-03',
    sourceText: 'લિફ્ટ માં એક વ્યક્તિ ફંસી ગઈ છે, કૃપા કરીને મદદ કરો!',
    channel: 'phone',
    station: 'University',
    timestamp: '10:44 AM',
  },
  {
    id: 'SAMPLE-04',
    sourceText: 'M-card recharge ni website pe payment 200 રૂપિયા aayi but balance વધી નહીં. Please refund.',
    channel: 'app',
    station: 'Tech Park',
    timestamp: '10:45 AM',
  },
  {
    id: 'SAMPLE-05',
    sourceText: 'The ticket counter attendant was rude and ignored senior citizens waiting in line.',
    channel: 'in-person',
    station: 'Central Station',
    timestamp: '10:48 AM',
  },
  {
    id: 'SAMPLE-06',
    sourceText: 'સ્ટેશન પર પાણી ટપકી રહી છે અને ફરશ ગંદી છે, સ્લિપ થઈ શકે છે.',
    channel: 'social',
    station: 'Stadium',
    timestamp: '10:50 AM',
  },
  {
    id: 'SAMPLE-07',
    sourceText: 'Platform 2 pe smoke देखाई दे रहा है, jaldi se check karo please.',
    channel: 'social',
    station: 'North Terminal',
    timestamp: '10:52 AM',
  },
  {
    id: 'SAMPLE-08',
    sourceText: 'I was charged double at the token machine and no refund was given.',
    channel: 'email',
    station: 'Museum',
    timestamp: '10:55 AM',
  },
  {
    id: 'SAMPLE-09',
    sourceText: 'સુરક્ષા કર્મચારીએ મારી ફરિયાદ સાંભળી નહીં અને અસભ્ય વર્તન કર્યું.',
    channel: 'phone',
    station: 'Riverside',
    timestamp: '10:58 AM',
  },
  {
    id: 'SAMPLE-10',
    sourceText: 'लिफ्ट 3 घंटे से काम नहीं कर रही है, व्हीलचेयर यात्री परेशान हैं।',
    channel: 'app',
    station: 'North Terminal',
    timestamp: '11:02 AM',
  },
  {
    id: 'SAMPLE-11',
    sourceText: 'Spilled drink on the stairs, no warning sign placed.',
    channel: 'in-person',
    station: 'Museum',
    timestamp: '11:05 AM',
  },
  {
    id: 'SAMPLE-12',
    sourceText: 'Emergency exit બંધ rahi che રાત્રે, tamne check karjo safety માટે.',
    channel: 'email',
    station: 'Tech Park',
    timestamp: '11:09 AM',
  },
];

// Helper to fully process a raw complaint
export function processComplaint(
  id: string,
  sourceText: string,
  channel: string = 'app',
  station: string = 'Central Station',
  timestamp: string = 'Just now'
): ComplaintRecord {
  const detectedLanguage = detectLanguage(sourceText);
  const classification = classifyDepartment(sourceText);
  const urgency = assessUrgency(sourceText, classification.department, channel);
  const draft = generateReplyDraft(detectedLanguage.code, classification.department, station, id);

  return {
    id,
    sourceText,
    channel,
    station,
    timestamp,
    detectedLanguage,
    classification,
    urgency,
    draft,
    status: 'pending',
    isLocalOutbox: true,
  };
}
