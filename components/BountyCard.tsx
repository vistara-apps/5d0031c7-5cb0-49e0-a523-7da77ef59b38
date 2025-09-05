'use client';

import { Bounty } from '@/lib/types';
import { formatCurrency, formatDistance, getStatusColor, getUrgencyColor } from '@/lib/utils';
import { MapPin, Clock, Package, User } from 'lucide-react';

interface BountyCardProps {
  bounty: Bounty;
  variant?: 'list' | 'detail';
  onAccept?: (bountyId: string) => void;
  onView?: (bountyId: string) => void;
}

export function BountyCard({ bounty, variant = 'list', onAccept, onView }: BountyCardProps) {
  const statusColor = getStatusColor(bounty.status);
  const urgencyColor = getUrgencyColor(bounty.urgency);

  return (
    <div className="glass-card p-6 animate-slide-up hover:bg-opacity-15 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white">{bounty.itemDescription}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColor}`}>
              {bounty.urgency}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{formatDistance(bounty.distance || 0)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(bounty.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span className={statusColor}>{bounty.status}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white mb-1">
            {formatCurrency(bounty.offeredAmountUSD)}
          </div>
          <div className="text-sm text-gray-400">USDC</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">From:</span>
          <span className="text-white">{bounty.pickupLocation}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">To:</span>
          <span className="text-white">{bounty.dropoffLocation}</span>
        </div>
      </div>

      <div className="flex space-x-3">
        {bounty.status === 'open' && onAccept && (
          <button
            onClick={() => onAccept(bounty.bountyId)}
            className="btn-primary flex-1"
          >
            Accept Bounty
          </button>
        )}
        {onView && (
          <button
            onClick={() => onView(bounty.bountyId)}
            className="btn-secondary flex-1"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
