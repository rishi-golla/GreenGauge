import {
  type DashboardCompany,
  type ReputationBand,
  type ControversyLevel,
  type NewsSentiment,
  type ScoreBand,
  type TransitionBand,
  dashboardBlueChipUniverse,
} from './dashboard-universe';

type SectionKey = 'total' | 'environmental' | 'social' | 'governance';

const sectorEnvironmentalBase: Record<string, number> = {
  Technology: 87,
  Financials: 74,
  'Communication Services': 72,
  Consumer: 66,
  'Consumer Staples': 76,
  Industrials: 62,
  Healthcare: 78,
  Utilities: 68,
  Energy: 28,
  Materials: 38,
};

const sectorGovernanceBase: Record<string, number> = {
  Technology: 80,
  Financials: 76,
  'Communication Services': 70,
  Consumer: 72,
  'Consumer Staples': 76,
  Industrials: 74,
  Healthcare: 78,
  Utilities: 76,
  Energy: 68,
  Materials: 66,
};

const scoreBandValues: Record<ScoreBand, number> = { low: 92, moderate: 72, high: 48, severe: 24 };
const transitionBandValues: Record<TransitionBand, number> = { leader: 94, advancing: 82, mixed: 64, lagging: 40 };
const reputationBandValues: Record<ReputationBand, number> = { strong: 90, stable: 78, mixed: 62, weak: 42 };
const controversyPenalty: Record<ControversyLevel, number> = { none: 0, minor: 4, moderate: 10, major: 18 };
const newsDrift: Record<NewsSentiment, number> = { positive: 0.95, steady: 0.18, negative: -0.92 };

const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const seedFromId = (id: string) =>
  id.split('').reduce((total, character, index) => total + character.charCodeAt(0) * (index + 3), 0);

const environmentalScore = (company: DashboardCompany) =>
  clampScore(
    sectorEnvironmentalBase[company.sector] * 0.35 +
      scoreBandValues[company.carbonIntensityBand] * 0.4 +
      transitionBandValues[company.renewableTransitionBand] * 0.25 -
      controversyPenalty[company.controversy] * 0.35,
  );

const socialScore = (company: DashboardCompany) =>
  clampScore(
    reputationBandValues[company.laborBand] * 0.45 +
      reputationBandValues[company.privacyBand] * 0.35 +
      (100 - controversyPenalty[company.controversy] * 4) * 0.2,
  );

const governanceScore = (company: DashboardCompany) =>
  clampScore(
    reputationBandValues[company.governanceBand] * 0.7 +
      sectorGovernanceBase[company.sector] * 0.3 -
      controversyPenalty[company.controversy] * 0.4,
  );

const totalEsgScore = (environmental: number, social: number, governance: number) =>
  clampScore(environmental * 0.4 + social * 0.3 + governance * 0.3);

const buildTrendSeries = (company: DashboardCompany, totalScore: number) => {
  const seed = seedFromId(company.id);
  const drift = newsDrift[company.newsSentiment] - controversyPenalty[company.controversy] * 0.015;
  const wobble = ((seed % 7) - 3) * 0.14;
  const start = totalScore - drift * 5 - wobble * 4;
  const values = Array.from({ length: 12 }, (_, index) => {
    const pulse = (((seed + index * 11) % 9) - 4) * 0.28;
    return clampScore(start + drift * index + wobble * index * 0.2 + pulse);
  });

  return {
    values,
    delta: clampScore(values[values.length - 1]) - clampScore(values[0]),
  };
};

export type DashboardScoredCompany = DashboardCompany & {
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
  trend: number[];
  trendDelta: number;
};

export const dashboardScoredCompanies: DashboardScoredCompany[] = dashboardBlueChipUniverse.map((company) => {
  const environmental = environmentalScore(company);
  const social = socialScore(company);
  const governance = governanceScore(company);
  const totalScore = totalEsgScore(environmental, social, governance);
  const trend = buildTrendSeries(company, totalScore);

  return {
    ...company,
    environmentalScore: environmental,
    socialScore: social,
    governanceScore: governance,
    totalScore,
    trend: trend.values,
    trendDelta: trend.delta,
  };
});

export const sortCompanies = (
  companies: DashboardScoredCompany[],
  getScore: (company: DashboardScoredCompany) => number,
) =>
  [...companies].sort((left, right) => {
    const scoreDelta = getScore(right) - getScore(left);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return left.name.localeCompare(right.name);
  });

export const dashboardSectionDefinitions: Array<{
  key: SectionKey;
  eyebrow: string;
  title: string;
  scoreLabel: string;
  getScore: (company: DashboardScoredCompany) => number;
}> = [
  { key: 'total', eyebrow: 'TOTAL ESG', title: 'Total ESG', scoreLabel: 'ESG', getScore: (company) => company.totalScore },
  { key: 'environmental', eyebrow: 'ENVIRONMENTAL', title: 'Environmental', scoreLabel: 'E', getScore: (company) => company.environmentalScore },
  { key: 'social', eyebrow: 'SOCIAL', title: 'Social', scoreLabel: 'S', getScore: (company) => company.socialScore },
  { key: 'governance', eyebrow: 'GOVERNANCE', title: 'Governance', scoreLabel: 'G', getScore: (company) => company.governanceScore },
];

export const dashboardTopEsgLeaders = sortCompanies(
  dashboardScoredCompanies,
  (company) => company.totalScore,
).slice(0, 6);
