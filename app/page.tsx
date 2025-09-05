'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MetricCard } from '@/components/MetricCard';
import { BountyCard } from '@/components/BountyCard';
import { CreateBountyForm } from '@/components/CreateBountyForm';
import { UserAvatar } from '@/components/UserAvatar';
import { StatusIndicator } from '@/components/StatusIndicator';
import { mockBounties, mockMetrics, mockUser } from '@/lib/mock-data';
import { Bounty } from '@/lib/types';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  Activity,
  MapPin,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [bounties, setBounties] = useState<Bounty[]>(mockBounties);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleAcceptBounty = (bountyId: string) => {
    setBounties(prev => 
      prev.map(bounty => 
        bounty.bountyId === bountyId 
          ? { ...bounty, status: 'accepted' as const, courierId: mockUser.userId }
          : bounty
      )
    );
  };

  const handleCreateBounty = (bountyData: any) => {
    const newBounty: Bounty = {
      bountyId: Date.now().toString(),
      shipperId: mockUser.userId,
      itemDescription: bountyData.itemDescription,
      pickupLocation: bountyData.pickupLocation,
      dropoffLocation: bountyData.dropoffLocation,
      offeredAmountUSD: bountyData.offeredAmountUSD,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      urgency: bountyData.urgency,
      itemType: bountyData.itemType,
      distance: bountyData.distance,
    };
    
    setBounties(prev => [newBounty, ...prev]);
    setActiveSection('bounties');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {mockUser.username}!</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Bounties"
          value={mockMetrics.totalBounties}
          change="12%"
          icon={Package}
          color="text-purple-400"
        />
        <MetricCard
          title="Active Bounties"
          value={mockMetrics.activeBounties}
          change="8%"
          icon={Activity}
          color="text-blue-400"
        />
        <MetricCard
          title="Total Earnings"
          value={`$${mockMetrics.totalEarnings}`}
          change="15%"
          icon={DollarSign}
          color="text-green-400"
        />
        <MetricCard
          title="Success Rate"
          value={`${mockMetrics.successRate}%`}
          change="2%"
          icon={CheckCircle}
          color="text-yellow-400"
        />
      </div>

      {/* World Map Placeholder */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Delivery Requests</h2>
          <div className="text-sm text-gray-400">17.60% increase</div>
        </div>
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-white font-medium">Global Delivery Network</p>
            <p className="text-gray-400 text-sm">Interactive map coming soon</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {bounties.slice(0, 3).map((bounty) => (
            <div key={bounty.bountyId} className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium">{bounty.itemDescription}</p>
                  <p className="text-sm text-gray-400">{bounty.pickupLocation} → {bounty.dropoffLocation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <StatusIndicator status={bounty.status} />
                <span className="text-white font-bold">${bounty.offeredAmountUSD}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBounties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Available Bounties</h1>
          <p className="text-gray-400">Find delivery opportunities near you</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{bounties.filter(b => b.status === 'open').length} open bounties</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bounties
          .filter(bounty => bounty.status === 'open')
          .map((bounty) => (
            <BountyCard
              key={bounty.bountyId}
              bounty={bounty}
              onAccept={handleAcceptBounty}
            />
          ))}
      </div>
    </div>
  );

  const renderMyBounties = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Bounties</h1>
        <p className="text-gray-400">Track your delivery requests and earnings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bounties
          .filter(bounty => bounty.shipperId === mockUser.userId || bounty.courierId === mockUser.userId)
          .map((bounty) => (
            <BountyCard
              key={bounty.bountyId}
              bounty={bounty}
            />
          ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account and reputation</p>
      </div>

      <div className="glass-card p-8">
        <div className="flex items-center space-x-6 mb-6">
          <UserAvatar 
            username={mockUser.username}
            reputationScore={mockUser.reputationScore}
            variant="withReputation"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{mockUser.username}</h2>
            <p className="text-gray-400">Member since {mockUser.createdAt.toLocaleDateString()}</p>
            <div className="flex items-center space-x-4 mt-2">
              {mockUser.isShipper && (
                <span className="px-3 py-1 bg-purple-500 bg-opacity-20 text-purple-400 rounded-full text-sm">
                  Shipper
                </span>
              )}
              {mockUser.isCourier && (
                <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-sm">
                  Courier
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{mockMetrics.completedBounties}</div>
            <div className="text-sm text-gray-400">Completed Deliveries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">${mockMetrics.totalEarnings}</div>
            <div className="text-sm text-gray-400">Total Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{mockMetrics.successRate}%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'bounties':
        return renderBounties();
      case 'create':
        return <CreateBountyForm onSubmit={handleCreateBounty} />;
      case 'my-bounties':
        return renderMyBounties();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="flex-1">
          <Header />
          <main className="p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
