import { dashboardBlueChipUniverse, type DashboardCompany } from './dashboard-universe';
import { chatThreads } from './workspace-data';

type HistoryMessage = { role: string; content: string };

// ─── Band descriptors ────────────────────────────────────────────────────────

const carbonDesc: Record<string, string> = {
  low: 'low carbon intensity — genuinely below the sector average',
  moderate: 'moderate carbon intensity, roughly in line with peers',
  high: 'above-average carbon intensity — worth keeping an eye on',
  severe: 'severe carbon intensity, which is a real liability here',
};
const renewableDesc: Record<string, string> = {
  leader: "one of the clearest leaders in the renewable transition — they've put real work into it",
  advancing: 'actively moving in the right direction on renewables',
  mixed: 'showing mixed signals on the energy transition — some progress, some drag',
  lagging: 'lagging peers on the transition, which is increasingly a risk factor',
};
const laborDesc: Record<string, string> = {
  strong: 'strong labor practices across the board',
  stable: 'stable labor relations — nothing that stands out as a red flag',
  mixed: 'mixed labor outcomes — there are some supply chain friction points',
  weak: 'weak labor standards, flagged by multiple data providers',
};
const privacyDesc: Record<string, string> = {
  strong: 'a solid data privacy posture',
  stable: 'broadly compliant privacy practices',
  mixed: 'some privacy issues that have drawn regulatory attention',
  weak: 'notable privacy weaknesses — an ongoing governance liability',
};
const govDesc: Record<string, string> = {
  strong: 'strong, independent governance with good transparency',
  stable: 'reasonably stable governance structures',
  mixed: "governance that's improving but still has inconsistencies",
  weak: 'governance weaknesses that are a genuine shareholder risk',
};
const controversyDesc: Record<string, string> = {
  none: "no active controversies on record, which is actually a positive signal",
  minor: 'minor controversies — well-managed, nothing material',
  moderate: 'moderate controversies worth monitoring',
  major: 'some major controversies on the books — reputational and regulatory risk is real here',
};
const sentimentDesc: Record<string, string> = {
  positive: 'the recent news flow has been positive',
  steady: 'news sentiment has been pretty steady',
  negative: 'near-term headline risk is elevated — the news flow has been negative',
};

// ─── Openers + follow-ups ────────────────────────────────────────────────────

const openers = [
  'So, ',
  "Here's the thing — ",
  'Right, ',
  'Yeah, so ',
  "Here's what the data shows — ",
  '',
  'Good question. ',
  'Let me dig into that. ',
];

const followUps = [
  'Want me to compare that against the sector average?',
  'Should I run a carbon pricing scenario on this?',
  'Anything specific you want to drill into further?',
  'Want to see how this stacks up against the rest of the portfolio?',
  'I can break down the governance side too if that would help.',
  'Want me to pull up the full ESG breakdown?',
];

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hash(s: string): number {
  return s.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

function opener(query: string): string {
  return pick(openers, hash(query));
}

function followUp(query: string): string {
  return pick(followUps, hash(query) + 3);
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Company response ────────────────────────────────────────────────────────

function companyResponse(company: DashboardCompany, query: string, prevTopic: string): string {
  const { name, ticker, sector, industry } = company;
  const ref = prevTopic && prevTopic !== name ? ` (shifting from ${prevTopic})` : '';

  const isEnv = /carbon|emission|climate|environment|renewable|energy|green|scope|transition/i.test(query);
  const isSocial = /labor|labour|worker|employee|social|privacy|data|human/i.test(query);
  const isGov = /governance|board|exec|compensation|transparent|shareholder/i.test(query);

  if (isEnv) {
    const risk =
      company.carbonIntensityBand === 'severe' || company.carbonIntensityBand === 'high'
        ? "That's worth watching closely — under a $100/ton carbon price, the earnings drag becomes material."
        : 'That actually puts them in a decent spot relative to peers as regulation tightens.';
    return `${opener(query)}${name}${ref} carries ${carbonDesc[company.carbonIntensityBand]}, and they're ${renewableDesc[company.renewableTransitionBand]}. ${risk}\n\n${followUp(query)}`;
  }

  if (isSocial) {
    const note =
      company.laborBand === 'weak' || company.privacyBand === 'weak'
        ? "Honestly, those weaknesses do show up as a risk premium — it's something to weigh against the return profile."
        : "Overall that's a net positive for long-term license-to-operate stability.";
    return `${opener(query)}On the social side, ${name} has ${laborDesc[company.laborBand]}, and ${privacyDesc[company.privacyBand]}. ${note}\n\n${followUp(query)}`;
  }

  if (isGov) {
    const note =
      company.governanceBand === 'weak'
        ? "That kind of governance gap often shows up before earnings volatility — shareholder alignment risk is real."
        : "That's a decent structural protection against management capture.";
    return `${opener(query)}${name} has ${govDesc[company.governanceBand]}, and there are currently ${controversyDesc[company.controversy]}. ${note}\n\n${followUp(query)}`;
  }

  // Full summary — conversational
  const verdict =
    company.carbonIntensityBand === 'low' && company.renewableTransitionBand === 'leader'
      ? `Honestly, ${name} is one of the stronger ESG stories in the universe.`
      : company.carbonIntensityBand === 'severe' || company.controversy === 'major'
        ? `${name} carries above-average ESG risk — worth active monitoring.`
        : `${name} is a pretty balanced picture with some specific things to watch.`;

  return (
    `${opener(query)}${name} (${ticker}) — ${industry}, ${sector}${ref}.\n\n` +
    `On the environmental side, they carry ${carbonDesc[company.carbonIntensityBand]} and are ${renewableDesc[company.renewableTransitionBand]}.\n\n` +
    `Socially, ${laborDesc[company.laborBand]}, with ${privacyDesc[company.privacyBand]}.\n\n` +
    `Governance: ${govDesc[company.governanceBand]}, and there are ${controversyDesc[company.controversy]}. Also, ${sentimentDesc[company.newsSentiment]}.\n\n` +
    `${verdict} ${followUp(query)}`
  );
}

// ─── Comparison ──────────────────────────────────────────────────────────────

function compareCompanies(a: DashboardCompany, b: DashboardCompany): string {
  const carbonWinner =
    a.carbonIntensityBand === b.carbonIntensityBand
      ? null
      : ['low', 'moderate', 'high', 'severe'].indexOf(a.carbonIntensityBand) <
          ['low', 'moderate', 'high', 'severe'].indexOf(b.carbonIntensityBand)
        ? a
        : b;
  const transitionOrder = ['leader', 'advancing', 'mixed', 'lagging'];
  const transitionWinner =
    a.renewableTransitionBand === b.renewableTransitionBand
      ? null
      : transitionOrder.indexOf(a.renewableTransitionBand) < transitionOrder.indexOf(b.renewableTransitionBand)
        ? a
        : b;

  const carbonNote = carbonWinner
    ? `${carbonWinner.name} comes out ahead on carbon intensity.`
    : "They're roughly matched on carbon intensity.";
  const transitionNote = transitionWinner
    ? `${transitionWinner.name} is further along on the renewable transition.`
    : 'The renewable transition posture is similar for both.';

  return (
    `Comparing ${a.name} and ${b.name}:\n\n` +
    `${carbonNote} ${transitionNote}\n\n` +
    `${a.name} has ${govDesc[a.governanceBand]}, while ${b.name} has ${govDesc[b.governanceBand]}.\n\n` +
    `Controversy-wise, ${a.name} has ${controversyDesc[a.controversy]}, and ${b.name} has ${controversyDesc[b.controversy]}.\n\n` +
    `Overall, ${
      carbonWinner === a || transitionWinner === a
        ? `${a.name} has the stronger ESG profile of the two`
        : `${b.name} has the edge on the ESG side`
    } — though both have specific risk factors worth watching. Want me to go deeper on either one?`
  );
}

// ─── Sector response ─────────────────────────────────────────────────────────

function sectorResponse(sector: string): string {
  const companies = dashboardBlueChipUniverse.filter(
    (c) => c.sector.toLowerCase() === sector.toLowerCase(),
  );
  if (!companies.length) return fallback('');

  const leaders = companies.filter(
    (c) => c.renewableTransitionBand === 'leader' || c.carbonIntensityBand === 'low',
  );
  const laggards = companies.filter(
    (c) => c.renewableTransitionBand === 'lagging' || c.carbonIntensityBand === 'severe',
  );
  const highRisk = companies.filter(
    (c) => c.carbonIntensityBand === 'severe' || c.carbonIntensityBand === 'high',
  );

  const outlook = laggards.length > leaders.length ? 'under pressure honestly' : 'broadly in decent shape';

  return (
    `So the ${sector} sector — ${companies.length} companies in the universe — is ${outlook} from an ESG perspective. ` +
    (leaders.length
      ? `The standout names on the transition side are ${leaders
          .slice(0, 2)
          .map((c) => c.name)
          .join(' and ')}. `
      : '') +
    (laggards.length
      ? `The ones with the most ESG drag right now are ${laggards
          .slice(0, 2)
          .map((c) => c.name)
          .join(' and ')}. `
      : '') +
    `There are ${highRisk.length} compan${highRisk.length === 1 ? 'y' : 'ies'} with elevated carbon intensity — increasingly a live issue as carbon pricing regulation tightens.\n\nWant to zoom in on any specific name in the sector?`
  );
}

// ─── Fallback ────────────────────────────────────────────────────────────────

const fallbacks = [
  "The portfolio has meaningful ESG dispersion — you've got high-scoring transition leaders sitting right next to legacy emitters. The blended score can hide that, which is worth surfacing before any rebalancing decision.",
  "Carbon pricing risk is probably the biggest near-term ESG headwind right now. Under a $100/ton scenario, the holdings with severe carbon intensity are looking at an 8–14% earnings drag — disproportionately in energy and industrials.",
  "Governance quality across the universe is honestly quite mixed. The interesting thing is that weak governance tends to correlate with worse environmental and social scores too — it's not an isolated factor.",
  "The transition leaders in the portfolio have historically shown lower volatility around climate policy announcements. Tilting further toward them improves both the ESG score and the downside resilience of the book.",
  "Supply chain opacity is probably the biggest unquantified liability right now. A handful of holdings have limited Scope 3 reporting — that's a hidden concentration risk in carbon-intensive upstream sectors.",
];

function fallback(query: string): string {
  return pick(fallbacks, hash(query));
}

// ─── Small talk ───────────────────────────────────────────────────────────────

function smallTalkResponse(query: string): string | null {
  const q = query.toLowerCase().trim();

  if (/^(hi|hello|hey|morning|afternoon|evening|howdy|sup|yo)\b/.test(q)) {
    return "Hey! I'm GreenGauge Intelligence — think of me as your ESG co-pilot. Ask me about any company in the universe, a sector, or a portfolio-level risk scenario. What are you looking at today?";
  }
  if (/thank|thanks|thx|cheers|great|perfect|awesome|nice|cool/.test(q)) {
    return "Happy to help! What else do you want to dig into?";
  }
  if (/who are you|what are you|what can you do|how do you work|help/.test(q)) {
    return "I'm GreenGauge Intelligence — I can analyze any of the 50 blue-chip companies in the universe across environmental, social, and governance dimensions. Ask me about a specific company, compare two, explore a sector, or probe a portfolio-level risk. Just talk to me naturally and I'll pick up the context.";
  }
  if (/^(ok|okay|sure|alright|got it|makes sense|i see|understood)\b/.test(q)) {
    return "Great — anything else you want to explore?";
  }
  return null;
}

// ─── Follow-up detection ──────────────────────────────────────────────────────

function extractPreviousTopic(history: HistoryMessage[]): { company?: DashboardCompany; sector?: string } {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role !== 'assistant') continue;
    const content = msg.content.toLowerCase();
    const company = dashboardBlueChipUniverse.find(
      (c) => content.includes(c.name.toLowerCase()) || content.includes(`(${c.ticker.toLowerCase()})`),
    );
    if (company) return { company };
    const sectors = [...new Set(dashboardBlueChipUniverse.map((c) => c.sector))];
    const sector = sectors.find((s) => content.includes(s.toLowerCase()));
    if (sector) return { sector };
  }
  return {};
}

function isFollowUp(query: string): boolean {
  return /^(tell me more|more detail|elaborate|expand|why|how come|why is that|go on|and\?|so\?|really\?|interesting|what else|and then|continue|keep going)/i.test(
    query.trim(),
  );
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export function generateMockResponse(query: string, history: HistoryMessage[] = []): string {
  const q = query.toLowerCase().trim();

  // Small talk
  const smallTalk = smallTalkResponse(query);
  if (smallTalk) return smallTalk;

  // Preset thread exact match
  const preset = chatThreads.find((t) => t.analystPrompt.toLowerCase() === q);
  if (preset) return preset.analysisCopy;

  // Follow-up — expand on previous topic
  if (isFollowUp(query)) {
    const { company, sector } = extractPreviousTopic(history);
    if (company) return companyResponse(company, '', '');
    if (sector) return sectorResponse(sector);
    return "Happy to go deeper — could you let me know which company or theme you'd like me to expand on?";
  }

  // Comparison: "X vs Y" / "compare X and Y"
  if (/\bvs\b|versus|compare|against/i.test(query)) {
    const found = dashboardBlueChipUniverse.filter(
      (c) => q.includes(c.name.toLowerCase()) || q.includes(c.ticker.toLowerCase()),
    );
    if (found.length >= 2) return compareCompanies(found[0], found[1]);
  }

  // Specific company
  const { company: prevCompany } = extractPreviousTopic(history);
  const mentionedCompany = dashboardBlueChipUniverse.find(
    (c) => q.includes(c.name.toLowerCase()) || q.includes(c.ticker.toLowerCase()),
  );
  if (mentionedCompany) {
    return companyResponse(mentionedCompany, query, prevCompany?.name ?? '');
  }

  // Sector
  const sectors = [...new Set(dashboardBlueChipUniverse.map((c) => c.sector))];
  const mentionedSector = sectors.find((s) => q.includes(s.toLowerCase()));
  if (mentionedSector) return sectorResponse(mentionedSector);

  // Contextual follow-through — user asked vague question but we have prior context
  if (prevCompany && q.length < 60) {
    return companyResponse(prevCompany, query, '');
  }

  return fallback(query);
}

// ─── Streaming utility ────────────────────────────────────────────────────────

export function streamResponse(
  text: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
): () => void {
  const words = text.split(' ');
  let index = 0;
  let cancelled = false;

  const tick = () => {
    if (cancelled) return;
    if (index < words.length) {
      onChunk(words[index] + (index < words.length - 1 ? ' ' : ''));
      index++;
      setTimeout(tick, 24 + Math.random() * 30);
    } else {
      onDone();
    }
  };

  setTimeout(tick, 160);
  return () => {
    cancelled = true;
  };
}
