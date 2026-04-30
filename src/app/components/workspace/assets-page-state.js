export function filterConnectedAssets(assets, activeFilter, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return assets.filter((asset) => {
    const matchesQuery =
      !normalizedQuery ||
      asset.name.toLowerCase().includes(normalizedQuery) ||
      asset.ticker.toLowerCase().includes(normalizedQuery) ||
      asset.sector.toLowerCase().includes(normalizedQuery) ||
      asset.region.toLowerCase().includes(normalizedQuery) ||
      asset.broker.toLowerCase().includes(normalizedQuery);

    const matchesFilter =
      activeFilter === 'All' ||
      asset.status === activeFilter ||
      asset.region === activeFilter ||
      asset.sector === activeFilter ||
      asset.broker === activeFilter;

    return matchesQuery && matchesFilter;
  });
}

export function buildBrokerSummary(assets) {
  const connectedAssets = assets.filter((asset) => asset.connectionState === 'Connected');
  const uniqueBrokers = new Set(connectedAssets.map((asset) => asset.broker));
  const robinhoodPositions = connectedAssets.filter((asset) => asset.broker === 'Robinhood').length;
  const totalMarketValueUsd = assets.reduce((total, asset) => total + asset.marketValueUsd, 0);

  return {
    connectedBrokers: uniqueBrokers.size,
    totalPositions: assets.length,
    totalMarketValueUsd,
    robinhoodPositions,
  };
}
