
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PriceCounter } from "./PriceCounter";

interface PricingCardProps {
  title: string;
  price: number;
  solPrice: number;
  description: string;
  features: string[];
  onSelect: () => void;
  popular?: boolean;
}

export function PricingCard({
  title,
  price,
  solPrice,
  description,
  features,
  onSelect,
  popular = false,
}: PricingCardProps) {
  return (
    <div 
      className={`relative glass-card rounded-xl p-6 ${
        popular ? 'border-crypto-purple border-2' : 'border-border'
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-crypto-purple text-white text-xs font-bold px-3 py-1 rounded-full">
          RECOMMENDED
        </div>
      )}
      
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="mt-4 mb-3">
        <PriceCounter price={price} solPrice={solPrice} />
      </div>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-crypto-green mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={onSelect} 
        className={`w-full ${
          popular 
            ? 'bg-gradient-to-r from-crypto-purple to-crypto-blue hover:opacity-90' 
            : 'bg-secondary hover:bg-secondary/80'
        }`}
      >
        Select Plan
      </Button>
    </div>
  );
}
