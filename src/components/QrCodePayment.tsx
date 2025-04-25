
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QrCodePaymentProps {
  amount: string;
  walletAddress: string;
  onVerifyPayment: () => void;
  loading: boolean;
}

export function QrCodePayment({ 
  amount, 
  walletAddress, 
  onVerifyPayment,
  loading 
}: QrCodePaymentProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast({
      title: "Wallet address copied",
      description: "The SOL wallet address has been copied to clipboard",
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="p-6 glass-card max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Send Payment</h3>
        <p className="text-muted-foreground text-sm">
          Send exactly <span className="text-crypto-purple font-bold">{amount} SOL</span> to the following address:
        </p>
      </div>

      <div className="bg-crypto-darker p-4 rounded-lg mb-6">
        <div className="relative">
          <Input 
            value={walletAddress}
            readOnly
            className="pr-10 font-mono text-xs sm:text-sm bg-transparent border-0 text-crypto-light"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0" 
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4 text-crypto-green" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-6 space-y-4">
        <div className="p-2 bg-white rounded-lg">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?data=solana:${walletAddress}?amount=${amount}&size=200x200`}
            alt="Payment QR Code"
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs text-muted-foreground">Scan with a Solana wallet app</p>
      </div>

      <Button 
        onClick={onVerifyPayment} 
        className="w-full bg-gradient-to-r from-crypto-purple to-crypto-blue hover:opacity-90"
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
            Verifying Payment...
          </>
        ) : (
          "I've Sent the SOL"
        )}
      </Button>

      <p className="text-xs text-center mt-4 text-muted-foreground">
        After sending, it may take a few moments for the transaction to be confirmed.
      </p>
    </Card>
  );
}
