'use client';

import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  username?: string;
  reputationScore?: number;
  variant?: 'default' | 'withReputation';
  className?: string;
}

export function UserAvatar({ 
  username = 'Anonymous', 
  reputationScore, 
  variant = 'default',
  className 
}: UserAvatarProps) {
  const initials = username
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
        {initials || <User className="w-5 h-5" />}
      </div>
      <div>
        <div className="text-white font-medium">{username}</div>
        {variant === 'withReputation' && reputationScore && (
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-400">{reputationScore.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
