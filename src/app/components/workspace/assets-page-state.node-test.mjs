import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildBrokerSummary,
  filterConnectedAssets,
} from './assets-page-state.js';

const sampleAssets = [
  {
    id: 'nvda-robinhood',
    name: 'NVIDIA',
    ticker: 'NVDA',
    sector: 'Semiconductors',
    region: 'North America',
    broker: 'Robinhood',
    connectionState: 'Connected',
    status: 'Stable',
    marketValueUsd: 18240,
  },
  {
    id: 'icln-fidelity',
    name: 'iShares Global Clean Energy ETF',
    ticker: 'ICLN',
    sector: 'ETF',
    region: 'Global',
    broker: 'Fidelity',
    connectionState: 'Connected',
    status: 'Improving',
    marketValueUsd: 6240,
  },
  {
    id: 'cash-manual',
    name: 'Cash Reserve',
    ticker: 'USD',
    sector: 'Cash',
    region: 'United States',
    broker: 'Manual',
    connectionState: 'Review',
    status: 'Stable',
    marketValueUsd: 3100,
  },
];

test('filters connected assets by brokerage and query', () => {
  const result = filterConnectedAssets(sampleAssets, 'Robinhood', 'nvi');
  assert.equal(result.length, 1);
  assert.equal(result[0].ticker, 'NVDA');
});

test('allows all assets when the filter is All', () => {
  const result = filterConnectedAssets(sampleAssets, 'All', '');
  assert.equal(result.length, 3);
});

test('builds broker summary from connected asset data', () => {
  assert.deepEqual(buildBrokerSummary(sampleAssets), {
    connectedBrokers: 2,
    totalPositions: 3,
    totalMarketValueUsd: 27580,
    robinhoodPositions: 1,
  });
});
