
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";

interface PriceCounterProps {
  price: number;
  solPrice: number;
}

export function PriceCounter({ price, solPrice }: PriceCounterProps) {
  const [solAmount, setSolAmount] = useState<string>("0.00");
  
  useEffect(() => {
    if (solPrice > 0) {
      const amount = price / solPrice;
      setSolAmount(amount.toFixed(2));
    }
  }, [price, solPrice]);

  return (
    <div className="flex items-center space-x-2 font-mono">
      <span className="text-lg font-bold">${price}</span>
      <span className="text-slate-400">=</span>
      <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
        <img src="/solana-logo.svg" alt="SOL" className="w-4 h-4 mr-1" />
        <span className="text-crypto-purple font-bold">{solAmount} SOL</span>
      </div>
    </div>
  );
}
