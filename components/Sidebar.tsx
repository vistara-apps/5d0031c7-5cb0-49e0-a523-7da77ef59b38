'use client';

import { 
  Package, 
  Plus, 
  List, 
  User, 
  Settings2, 
  TrendingUp,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { id: 'bounties', label: 'Find Bounties', icon: List },
  { id: 'create', label: 'Create Bounty', icon: Plus },
  { id: 'my-bounties', label: 'My Bounties', icon: Package },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-black bg-opacity-20 backdrop-blur-lg border-r border-white border-opacity-10 p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">ShipItOnBase</h1>
        </div>
        <p className="text-sm text-gray-400">Decentralized Deliveries</p>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'sidebar-item w-full text-left',
                activeSection === item.id && 'active'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
