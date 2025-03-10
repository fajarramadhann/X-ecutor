import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { Wallet, Twitter, ChevronDown } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-150",
  {
    variants: {
      variant: {
        default:
          "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700/50",
        connected: "bg-accent text-accent-foreground hover:bg-accent/90",
        twitter: "bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const truncateAddress = (address: string | undefined) => {
  if (!address) return "";
  const prefix = address.slice(0, 4);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
};

const ConnectButtons = () => {
  const {
    connect,
    connected,
    disconnect,
    account,
    wallets,
    wallet,
    changeNetwork,
  } = useWallet();
  const [showWalletList, setShowWalletList] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const walletListRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        walletListRef.current &&
        !walletListRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowWalletList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConnectWallet = async (wallet) => {
    try {
      await connect(wallet.name);
      setShowWalletList(false);
      toast.success("Wallet connected successfully");
    } catch (error) {
      console.error("Failed to connect wallet", error);
      toast.error("Failed to connect wallet");
    }
  };

  const handleWalletButtonClick = () => {
    if (!connected) {
      setShowWalletList(!showWalletList); // Toggle the list
    } else {
      handleDisconnectWallet();
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  const handleConnectTwitter = () => {
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
      <DropdownMenu.Root
        // Remove the !connected condition
        open={showWalletList}
        onOpenChange={setShowWalletList}
      >
        <DropdownMenu.Trigger asChild>
          <button
            className={buttonVariants({
              variant: connected ? "connected" : "default",
            })}
          >
            <Wallet className="w-4 h-4" />
            {connected ? (
              <span className="flex items-center gap-2">
                {truncateAddress(account?.address?.toString())}
                <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Connected
                </span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </span>
            ) : (
              <>
                Connect Wallet
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 min-w-[280px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900 animate-in fade-in-80"
            align="end"
            sideOffset={5}
          >
            {connected ? (
              // Show wallet info and disconnect option when connected
              <>
                <DropdownMenu.Label className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Wallet Details
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-800" />
                <DropdownMenu.Item
                  className="relative flex cursor-pointer select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                  onSelect={handleDisconnectWallet}
                >
                  Disconnect Wallet
                </DropdownMenu.Item>
              </>
            ) : (
              // Show wallet list when not connected
              <>
                <DropdownMenu.Label className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Wallet
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-800" />
                {wallets.map((wallet) => (
                  <DropdownMenu.Item
                    key={wallet.name}
                    className="relative flex cursor-pointer select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800"
                    onSelect={() => handleConnectWallet(wallet)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <img
                        src={wallet.icon}
                        alt={`${wallet.name} icon`}
                        className="h-5 w-5"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${wallet.name}`;
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{wallet.name}</span>
                    </div>
                  </DropdownMenu.Item>
                ))}
              </>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <button
        onClick={handleConnectTwitter}
        className={buttonVariants({
          variant: isTwitterConnected ? "twitter" : "default",
        })}
      >
        <Twitter className="w-4 h-4" />
        {isTwitterConnected ? (
          <span className="flex items-center gap-2">
            @username
            <span className="px-1.5 py-0.5 text-xs bg-white/20 text-white rounded-full">
              Connected
            </span>
          </span>
        ) : (
          <span>Connect Twitter</span>
        )}
      </button>
    </div>
  );
};

export default ConnectButtons;
