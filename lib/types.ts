export interface User {
  userId: string; // ethAddress
  username: string;
  reputationScore: number;
  isShipper: boolean;
  isCourier: boolean;
  createdAt: Date;
}

export interface Bounty {
  bountyId: string;
  shipperId: string;
  courierId?: string;
  itemDescription: string;
  pickupLocation: string;
  dropoffLocation: string;
  offeredAmountUSD: number;
  status: 'open' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  deliveryConfirmedAt?: Date;
  urgency: 'low' | 'medium' | 'high';
  itemType: string;
  distance?: number;
}

export interface Rating {
  ratingId: string;
  ratedByUserId: string;
  aboutUserId: string;
  bountyId: string;
  ratingValue: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface DashboardMetrics {
  totalBounties: number;
  activeBounties: number;
  completedBounties: number;
  totalEarnings: number;
  successRate: number;
}
