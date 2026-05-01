import type { LucideIcon } from 'lucide-react';
import {
  BellRing,
  ChartColumnBig,
  Globe2,
  LayoutGrid,
  Leaf,
  MessageSquareText,
  Settings,
  ShieldAlert,
  WalletCards,
} from 'lucide-react';

export type WorkspaceNavItem = {
  icon: LucideIcon;
  label: string;
  description: string;
  to: string;
};

export const workspaceNavigation: WorkspaceNavItem[] = [
  {
    icon: LayoutGrid,
    label: 'Dashboard',
    description: 'Executive climate overview',
    to: '/workspace/dashboard',
  },
  {
    icon: WalletCards,
    label: 'Assets',
    description: 'Holdings browser',
    to: '/workspace/assets',
  },
  {
    icon: MessageSquareText,
    label: 'AI Chat',
    description: 'Analyst workspace',
    to: '/workspace/chat',
  },
  {
    icon: Settings,
    label: 'Settings',
    description: 'Workspace controls',
    to: '/workspace/settings',
  },
];

export const workspacePageMeta: Record<
  string,
  { eyebrow: string; title: string; description: string }
> = {
  '/workspace/dashboard': {
    eyebrow: '',
    title: '',
    description: '',
  },
  '/workspace/assets': {
    eyebrow: '',
    title: '',
    description: '',
  },
  '/workspace/chat': {
    eyebrow: '',
    title: '',
    description: '',
  },
  '/workspace/settings': {
    eyebrow: 'Workspace Controls',
    title: 'Settings',
    description: 'Tune alerting, briefing style, scenario defaults, and display behavior.',
  },
};

export const analystProfile = {
  initials: 'AR',
  name: 'Analyst Profile',
  role: 'Climate Specialist',
  status: 'Live',
};

export const dashboardMetrics = [
  { label: 'Financed emissions', value: '1.84M tCO2e', detail: '-3.1% vs prior quarter', accent: 'mint' as const },
  { label: 'Transition resilience', value: '91.4', detail: 'Portfolio index', accent: 'neutral' as const },
  { label: 'Carbon-heavy exposure', value: '$42.8M', detail: '+4.2% concentration', accent: 'warm' as const },
  { label: 'Watchlist holdings', value: '7', detail: '2 require immediate review', accent: 'neutral' as const },
];

export const dashboardPeriods = ['1M', '1Q', 'YTD', '12M'] as const;

export const dashboardTrendSeries: Record<
  (typeof dashboardPeriods)[number],
  Array<{ month: string; resilience: number; emissions: number }>
> = {
  '1M': [
    { month: 'W1', resilience: 86, emissions: 1.95 },
    { month: 'W2', resilience: 88, emissions: 1.92 },
    { month: 'W3', resilience: 90, emissions: 1.88 },
    { month: 'W4', resilience: 91.4, emissions: 1.84 },
  ],
  '1Q': [
    { month: 'Jan', resilience: 84, emissions: 2.08 },
    { month: 'Feb', resilience: 87, emissions: 1.98 },
    { month: 'Mar', resilience: 91.4, emissions: 1.84 },
  ],
  YTD: [
    { month: 'Jan', resilience: 84, emissions: 2.08 },
    { month: 'Feb', resilience: 87, emissions: 1.98 },
    { month: 'Mar', resilience: 91.4, emissions: 1.84 },
  ],
  '12M': [
    { month: 'Q2', resilience: 76, emissions: 2.52 },
    { month: 'Q3', resilience: 79, emissions: 2.29 },
    { month: 'Q4', resilience: 85, emissions: 2.11 },
    { month: 'Q1', resilience: 91.4, emissions: 1.84 },
  ],
};

export const watchlistHoldings = [
  {
    name: 'North Sea Logistics',
    sector: 'Transport',
    note: 'Scope 3 drag still rising through supplier routing changes.',
    risk: 'High',
    move: '+12%',
  },
  {
    name: 'Helios Thermal Partners',
    sector: 'Utilities',
    note: 'Carbon pricing sensitivity remains concentrated in two generation sites.',
    risk: 'Elevated',
    move: '+8%',
  },
  {
    name: 'Aurora Grid Metals',
    sector: 'Materials',
    note: 'Transition upside improving as intensity declines ahead of schedule.',
    risk: 'Monitoring',
    move: '-5%',
  },
];

export const attentionMoments = [
  'The portfolio is getting cleaner overall, but the highest-risk cluster is becoming more concentrated.',
  'Transport-linked holdings are responsible for the largest recent deterioration in financed emissions.',
  'Resilience improves materially once North Sea exposure is reduced below 7% of total weight.',
];

export type AssetRecord = {
  id: string;
  name: string;
  ticker: string;
  broker: 'Robinhood' | 'Fidelity' | 'Manual';
  connectionState: 'Connected' | 'Review';
  quantity: string;
  marketValue: string;
  marketValueUsd: number;
  sector: string;
  region: string;
  weight: string;
  carbonIntensity: string;
  status: 'Watch' | 'Stable' | 'Improving';
  narrative: string;
  exposure: string;
  icon: LucideIcon;
};

export const assetRecords: AssetRecord[] = [
  {
    id: 'nvda-robinhood',
    name: 'NVIDIA',
    ticker: 'NVDA',
    broker: 'Robinhood',
    connectionState: 'Connected',
    quantity: '0.16 shares',
    marketValue: '$145',
    marketValueUsd: 145,
    sector: 'Semiconductors',
    region: 'North America',
    weight: '48.3%',
    carbonIntensity: '28 tCO2e / $M',
    status: 'Stable',
    narrative: 'High-conviction growth position sourced from Robinhood. AI upside remains strong, while supply-chain energy load still matters for climate scoring.',
    exposure: '$145',
    icon: ChartColumnBig,
  },
  {
    id: 'msft-robinhood',
    name: 'Microsoft',
    ticker: 'MSFT',
    broker: 'Fidelity',
    connectionState: 'Connected',
    quantity: '0.38 shares',
    marketValue: '$162',
    marketValueUsd: 162,
    sector: 'Software',
    region: 'North America',
    weight: '51.7%',
    carbonIntensity: '19 tCO2e / $M',
    status: 'Stable',
    narrative: 'Core software holding with lower direct climate drag than the energy sleeve and a stronger governance profile.',
    exposure: '$162',
    icon: LayoutGrid,
  },
  {
    id: 'f-robinhood',
    name: 'Ford',
    ticker: 'F',
    broker: 'Robinhood',
    connectionState: 'Connected',
    quantity: '8 shares',
    marketValue: '$96',
    marketValueUsd: 96,
    sector: 'Automotive',
    region: 'North America',
    weight: '24.2%',
    carbonIntensity: '88 tCO2e / $M',
    status: 'Watch',
    narrative: 'Smaller Robinhood position that is currently under pressure. EV transition progress helps, but margin compression and legacy manufacturing exposure keep the outlook softer.',
    exposure: '$96',
    icon: ShieldAlert,
  },
];

export const assetFilters = ['All', 'Robinhood', 'Fidelity'] as const;

export const riskScenarios = [
  {
    id: 'carbon-120',
    label: '$120 / ton carbon',
    headline: 'The portfolio demonstrates significant resilience once thermal exposure is cut below 6%.',
    exposure: '$42.8M',
    resilience: '91.4',
    riskDrivers: [
      'North Sea Logistics remains the largest stranded-asset contributor.',
      'Utilities concentration drives most downside under abrupt carbon acceleration.',
      'Materials holdings offset part of the risk through improving intensity.',
    ],
  },
  {
    id: 'shipping-shock',
    label: 'Shipping disruption',
    headline: 'Transport and industrial names see the sharpest deterioration when routing friction persists.',
    exposure: '$47.2M',
    resilience: '88.1',
    riskDrivers: [
      'Transport-linked Scope 3 pressure rises through rerouted logistics chains.',
      'Industrial storage names hold up better than expected under sourcing strain.',
      'Regional diversification becomes more valuable than carbon intensity alone.',
    ],
  },
  {
    id: 'policy-snap',
    label: 'Policy snap',
    headline: 'Regulatory acceleration rewards lower-intensity materials and penalizes thermal utilities quickly.',
    exposure: '$39.9M',
    resilience: '93.2',
    riskDrivers: [
      'Utilities face the fastest repricing under accelerated disclosure and pricing rules.',
      'Transition-aligned materials holdings gain relative resilience.',
      'Portfolio drag becomes more concentrated but easier to isolate.',
    ],
  },
];

export const riskBreakdowns = [
  { label: 'Transport', value: '31%', detail: 'Largest scenario-sensitive cluster' },
  { label: 'Utilities', value: '27%', detail: 'Carbon-price exposure remains elevated' },
  { label: 'Materials', value: '14%', detail: 'Improving transition profile' },
];

export const chatThreads = [
  {
    id: 'north-sea',
    promptLabel: 'North Sea comparison',
    intelligenceHighlights: ['Scope 3 emissions', 'North Sea assets', '12% increase', 'carbon intensity'],
    intelligenceCopy:
      'I have analyzed the ESG footprint of your energy portfolio. The Scope 3 emissions for the North Sea assets show a 12% increase year-over-year, largely due to supply chain logistical shifts. Would you like to see the risk breakdown by carbon intensity?',
    analystPrompt:
      'Show me the comparison between current North Sea assets and the projected transition portfolio for Q4 2025. Highlight the stranded asset risk if carbon pricing hits $120/ton.',
    analysisHighlights: ['Stranded Asset Quotient', '$120/ton scenario', '3.8%'],
    analysisCopy:
      'Under a $120/ton scenario, the transition portfolio demonstrates significant resilience. The Stranded Asset Quotient drops from 14.2% to 3.8%.',
    metrics: [
      { label: 'Current risk exposure', value: '$42.8M', detail: '+4.2%', accent: 'warm' as const },
      { label: 'Projected Q4 resilience', value: '91.4', detail: 'Index', accent: 'mint' as const },
    ],
  },
  {
    id: 'utility-trim',
    promptLabel: 'Utility trim',
    intelligenceHighlights: ['thermal utilities', 'regulatory drag', 'resilience score'],
    intelligenceCopy:
      'The utility sleeve is carrying the heaviest regulatory drag in the current mix. A measured trim across thermal utilities could lift the resilience score without materially reducing defensive income.',
    analystPrompt:
      'If we trimmed thermal utilities by 15% and reallocated into lower-intensity grid materials, how much would the resilience profile improve over the next two quarters?',
    analysisHighlights: ['Resilience score', '15% trim', '96.1'],
    analysisCopy:
      'A 15% trim in thermal utilities raises the modeled Resilience score to 96.1, with most of the benefit coming from reduced policy sensitivity rather than absolute emissions decline.',
    metrics: [
      { label: 'Utility-linked drag', value: '$18.6M', detail: '-15% target', accent: 'warm' as const },
      { label: 'Modeled resilience', value: '96.1', detail: 'Scenario', accent: 'mint' as const },
    ],
  },
  {
    id: 'supplier-shift',
    promptLabel: 'Supplier shift',
    intelligenceHighlights: ['supplier concentration', 'routing friction', 'transition posture'],
    intelligenceCopy:
      'Supplier concentration has become a more meaningful source of climate drag than direct operations for several industrial names. Routing friction is now shaping transition posture as much as facility emissions.',
    analystPrompt:
      'Map the supplier concentration issue across industrial holdings and identify which names create the most transition friction if routing delays persist into the next reporting cycle.',
    analysisHighlights: ['transition friction', 'industrial holdings', '6.7%'],
    analysisCopy:
      'If routing delays persist, transition friction across industrial holdings rises by 6.7%, with Verdant Storage Systems and North Sea Logistics contributing most of the increase.',
    metrics: [
      { label: 'Supplier-linked pressure', value: '6.7%', detail: 'Modeled increase', accent: 'warm' as const },
      { label: 'Most exposed names', value: '2', detail: 'Priority review', accent: 'mint' as const },
    ],
  },
];

export const settingsGroups = [
  {
    title: 'Alert Thresholds',
    description: 'Control when concentration, carbon, and stranded-asset warnings escalate visually.',
    options: ['Conservative', 'Balanced', 'Aggressive'],
  },
  {
    title: 'Default Scenario',
    description: 'Choose which stress test loads first on the Risk page.',
    options: ['$120 / ton carbon', 'Shipping disruption', 'Policy snap'],
  },
  {
    title: 'Interface Mood',
    description: 'Adjust the workspace density and emphasis without leaving the Verdant Noir style.',
    options: ['Quiet', 'Balanced', 'High contrast'],
  },
];
