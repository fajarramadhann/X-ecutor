
import { useState } from "react";
import { Wallet, Twitter } from "lucide-react";
import { toast } from "sonner";

const ConnectButtons = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);

  const handleConnectWallet = () => {
    // Simulate wallet connection
    // In a real implementation, this would connect to MetaMask or another provider
    if (isWalletConnected) {
      setIsWalletConnected(false);
      toast.success("Wallet disconnected");
      return;
    }

    toast.success("Wallet connected successfully", {
      description: "0x1a2...3b4c",
    });
    setIsWalletConnected(true);
  };

  const handleConnectTwitter = () => {
    // Simulate Twitter connection
    // In a real implementation, this would redirect to Twitter OAuth
    if (isTwitterConnected) {
      setIsTwitterConnected(false);
      toast.success("Twitter disconnected");
      return;
    }

    toast.success("Twitter connected successfully", {
      description: "@username",
    });
    setIsTwitterConnected(true);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <button
        onClick={handleConnectWallet}
        className={`${
          isWalletConnected ? "bg-accent text-accent-foreground" : "button-outline"
        } py-1.5 px-3 text-sm`}
      >
        <Wallet className="w-4 h-4" />
        <span>{isWalletConnected ? "Wallet Connected" : "Connect Wallet"}</span>
      </button>
      
      <button
        onClick={handleConnectTwitter}
        className={`${
          isTwitterConnected ? "bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/30" : "button-outline"
        } py-1.5 px-3 text-sm`}
      >
        <Twitter className="w-4 h-4" />
        <span>{isTwitterConnected ? "Twitter Connected" : "Connect Twitter"}</span>
      </button>
    </div>
  );
};

export default ConnectButtons;
