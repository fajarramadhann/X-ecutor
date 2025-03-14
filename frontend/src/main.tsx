import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { WalletProvider } from './lib/WalletProvider.tsx';
import { Wallet } from 'lucide-react';

createRoot(document.getElementById("root")!).render(
    <WalletProvider>
        <App />
    </WalletProvider>
);
