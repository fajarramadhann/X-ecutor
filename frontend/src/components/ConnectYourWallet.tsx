import { ReactNode } from "react";
import { Wallet } from "lucide-react";
import { cva } from "class-variance-authority";

interface ConnectYourWalletProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  onConnect?: () => void;
  isLoading?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-all duration-150",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700/50",
        primary: "bg-primary text-white hover:bg-primary/90 shadow-primary/25",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const ConnectYourWallet = ({
  title = "Connect Your Wallet",
  description = "Connect your wallet to access the AI Twitter Assistant and start creating engaging content.",
  icon = <Wallet className="w-10 h-10 text-primary" />,
  className = "",
}: ConnectYourWalletProps) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[80vh] p-6 ${className}`}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-6">
          {/* Icon Container */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto ring-8 ring-primary/5">
              {icon}
            </div>
            <div className="absolute -bottom-1 right-1/2 transform translate-x-1/2">
              <span className="flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};