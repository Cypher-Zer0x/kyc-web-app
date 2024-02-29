import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  polygonMumbai as mumbai,
  sepolia,
  lineaTestnet,
  auroraTestnet,
  xdcTestnet,
  oasisTestnet,
  hederaTestnet,
  moonbaseAlpha,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

//Custom Chain
const zircuit={
  id: 48899,
  name: 'Zircuit Testnet',
  iconUrl: 'https://imgs.search.brave.com/LATDcVcVDT-xuQmeKIkbZ3zzSylrPfTkqChVzyA5kgc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9leHBs/b3Jlci56aXJjdWl0/LmNvbS9hc3NldHMv/emlyY3VpdF9sb2dv/X2Zvb3Rlci5zdmc.svg',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://zircuit1.p2pify.com/'] },
  }
}

const injective = {
  id: 2525,
  name: 'Injective Testnet',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://inevm.calderachain.xyz/http'] },
  }
}

const inco = {
  id: 9090,
  name: 'Inco Gentry Testnet',
  iconBackground: '#fff',
  nativeCurrency: { name: 'INCO', symbol: 'INCO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.inco.org'] },
  }
}


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mumbai, sepolia, lineaTestnet, auroraTestnet, xdcTestnet, oasisTestnet, hederaTestnet, moonbaseAlpha, zircuit, injective, inco],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

