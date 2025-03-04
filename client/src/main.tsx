import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: "e142648a-a371-4360-bb1f-314c75aed595",
        walletConnectors: [
          BitcoinWalletConnectors,
          EthereumWalletConnectors,
          SolanaWalletConnectors,
        ],
      }}
    >
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);
