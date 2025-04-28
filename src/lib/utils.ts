import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function truncateWallet(address: string, length = 4): string {
  if (!address) return '';
  if (address.length <= length * 2) return address;
  
  const start = address.substring(0, length);
  const end = address.substring(address.length - length);
  
  return `${start}...${end}`;
}

export async function fetchSolanaPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const data = await response.json();
    return data.solana?.usd || 140; // Fallback to $140 if API fails
  } catch (error) {
    console.error('Error fetching Solana price:', error);
    return 140; // Fallback to $140 if API fails
  }
}

export function formatDateFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
}
