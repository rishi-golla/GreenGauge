import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { assetRecords, type AssetRecord } from './workspace-data';
import {
  connectBrokerAssets,
  createPortfolioConnectionSnapshot,
  portfolioConnectionStorageKey,
} from './portfolio-connection-state.js';

type BrokerName = AssetRecord['broker'];

type PortfolioConnectionContextValue = {
  connectedAssets: AssetRecord[];
  connectedBrokers: BrokerName[];
  connectBroker: (broker: BrokerName) => void;
  isBrokerConnected: (broker: BrokerName) => boolean;
};

const portfolioConnectionFallback: PortfolioConnectionContextValue = {
  connectedAssets: [],
  connectedBrokers: [],
  connectBroker: () => {},
  isBrokerConnected: () => false,
};

const PortfolioConnectionContext = createContext<PortfolioConnectionContextValue>(
  portfolioConnectionFallback,
);

export function PortfolioConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connectedBrokers, setConnectedBrokers] = useState<BrokerName[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedValue = window.localStorage.getItem(portfolioConnectionStorageKey);
    if (!storedValue) {
      return;
    }

    try {
      const parsedValue = JSON.parse(storedValue);
      if (Array.isArray(parsedValue)) {
        setConnectedBrokers(parsedValue as BrokerName[]);
      }
    } catch {
      window.localStorage.removeItem(portfolioConnectionStorageKey);
    }
  }, []);

  const { connectedAssets } = useMemo(
    () => createPortfolioConnectionSnapshot(assetRecords, connectedBrokers),
    [connectedBrokers],
  );

  const value = useMemo<PortfolioConnectionContextValue>(
    () => ({
      connectedAssets,
      connectedBrokers,
      connectBroker: (broker) => {
        setConnectedBrokers((current) => {
          const nextSnapshot = connectBrokerAssets(assetRecords, current, broker);

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(
              portfolioConnectionStorageKey,
              JSON.stringify(nextSnapshot.connectedBrokers),
            );
          }

          return nextSnapshot.connectedBrokers as BrokerName[];
        });
      },
      isBrokerConnected: (broker) => connectedBrokers.includes(broker),
    }),
    [connectedAssets, connectedBrokers],
  );

  return (
    <PortfolioConnectionContext.Provider value={value}>
      {children}
    </PortfolioConnectionContext.Provider>
  );
}

export function usePortfolioConnection() {
  return useContext(PortfolioConnectionContext);
}
