'use client';

import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'open' | 'accepted' | 'completed' | 'cancelled';
  className?: string;
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open':
        return {
          color: 'bg-green-500',
          text: 'Open',
          textColor: 'text-green-400',
        };
      case 'accepted':
        return {
          color: 'bg-blue-500',
          text: 'Accepted',
          textColor: 'text-blue-400',
        };
      case 'completed':
        return {
          color: 'bg-purple-500',
          text: 'Completed',
          textColor: 'text-purple-400',
        };
      case 'cancelled':
        return {
          color: 'bg-red-500',
          text: 'Cancelled',
          textColor: 'text-red-400',
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Unknown',
          textColor: 'text-gray-400',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className={cn('w-2 h-2 rounded-full', config.color)} />
      <span className={cn('text-sm font-medium', config.textColor)}>
        {config.text}
      </span>
    </div>
  );
}
