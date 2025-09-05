'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
}

export function MetricCard({ title, value, change, icon: Icon, color = 'text-purple-400' }: MetricCardProps) {
  return (
    <div className="metric-card animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg bg-opacity-20 ${color.replace('text-', 'bg-')}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        {change && (
          <span className="text-sm text-green-400">+{change}</span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
}
