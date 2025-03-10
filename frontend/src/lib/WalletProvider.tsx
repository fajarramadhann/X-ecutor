import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";

const wallets = [
    new OKXWallet(),
]

export const WalletProvider = ({ children }) => {

    return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
            {children}
        </AptosWalletAdapterProvider>
    );
};