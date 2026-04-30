import test from 'node:test';
import assert from 'node:assert/strict';

import {
  connectBrokerAssets,
  createPortfolioConnectionSnapshot,
  getScopedDashboardCompanies,
} from './portfolio-connection-state.js';

const assetRecords = [
  { id: '1', ticker: 'NVDA', broker: 'Robinhood' },
  { id: '2', ticker: 'MSFT', broker: 'Robinhood' },
  { id: '3', ticker: 'NEE', broker: 'Fidelity' },
];

const companies = [
  { id: 'nvidia', ticker: 'NVDA' },
  { id: 'microsoft', ticker: 'MSFT' },
  { id: 'nextera', ticker: 'NEE' },
  { id: 'apple', ticker: 'AAPL' },
];

test('createPortfolioConnectionSnapshot returns only connected broker assets', () => {
  const snapshot = createPortfolioConnectionSnapshot(assetRecords, ['Robinhood']);

  assert.deepEqual(snapshot.connectedBrokers, ['Robinhood']);
  assert.deepEqual(
    snapshot.connectedAssets.map((asset) => asset.ticker),
    ['NVDA', 'MSFT'],
  );
});

test('connectBrokerAssets deduplicates brokers while expanding assets', () => {
  const snapshot = connectBrokerAssets(assetRecords, ['Robinhood'], 'Robinhood');

  assert.deepEqual(snapshot.connectedBrokers, ['Robinhood']);
  assert.equal(snapshot.connectedAssets.length, 2);
});

test('getScopedDashboardCompanies limits dashboard cards to connected holdings when available', () => {
  const scopedCompanies = getScopedDashboardCompanies(companies, [
    { ticker: 'MSFT' },
    { ticker: 'NEE' },
  ]);

  assert.deepEqual(
    scopedCompanies.map((company) => company.ticker),
    ['MSFT', 'NEE'],
  );
});

test('getScopedDashboardCompanies falls back to full universe when no matches exist', () => {
  const scopedCompanies = getScopedDashboardCompanies(companies, [{ ticker: 'ICLN' }]);

  assert.equal(scopedCompanies.length, companies.length);
});

