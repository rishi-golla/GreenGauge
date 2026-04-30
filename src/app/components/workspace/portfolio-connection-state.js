export const portfolioConnectionStorageKey = 'greengauge-connected-brokers-v1';

const uniq = (values) => Array.from(new Set(values));

export function createPortfolioConnectionSnapshot(assetRecords, connectedBrokers) {
  const allowedBrokers = new Set(connectedBrokers);
  const connectedAssets = assetRecords.filter((asset) => allowedBrokers.has(asset.broker));

  return {
    connectedBrokers: uniq(connectedBrokers),
    connectedAssets,
  };
}

export function connectBrokerAssets(assetRecords, currentConnectedBrokers, broker) {
  return createPortfolioConnectionSnapshot(assetRecords, [...currentConnectedBrokers, broker]);
}

export function getScopedDashboardCompanies(companies, connectedAssets) {
  const connectedTickers = new Set(connectedAssets.map((asset) => asset.ticker));

  if (connectedTickers.size === 0) {
    return companies;
  }

  const scopedCompanies = companies.filter((company) => connectedTickers.has(company.ticker));
  return scopedCompanies.length > 0 ? scopedCompanies : companies;
}

