import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'open':
      return 'text-green-400';
    case 'accepted':
      return 'text-blue-400';
    case 'in_progress':
      return 'text-yellow-400';
    case 'completed':
      return 'text-purple-400';
    case 'cancelled':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case 'high':
      return 'text-red-400 bg-red-400 bg-opacity-20';
    case 'medium':
      return 'text-yellow-400 bg-yellow-400 bg-opacity-20';
    case 'low':
      return 'text-green-400 bg-green-400 bg-opacity-20';
    default:
      return 'text-gray-400 bg-gray-400 bg-opacity-20';
  }
}

export function calculateBountyPrice(distance: number, urgency: string, itemType: string): number {
  let basePrice = 5; // Base price in USDC
  
  // Distance factor
  basePrice += distance * 2;
  
  // Urgency multiplier
  switch (urgency) {
    case 'high':
      basePrice *= 1.5;
      break;
    case 'medium':
      basePrice *= 1.2;
      break;
    case 'low':
      basePrice *= 1.0;
      break;
  }
  
  // Item type factor
  if (itemType.toLowerCase().includes('fragile')) {
    basePrice *= 1.3;
  }
  
  return Math.round(basePrice * 100) / 100; // Round to 2 decimal places
}
