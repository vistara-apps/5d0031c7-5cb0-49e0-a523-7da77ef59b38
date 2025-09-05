'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-black bg-opacity-20 backdrop-blur-lg border-b border-white border-opacity-10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bounties..."
              className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <Wallet>
            <ConnectWallet className="btn-primary">
              <Avatar className="w-6 h-6" />
              <Name className="ml-2" />
            </ConnectWallet>
          </Wallet>
        </div>
      </div>
    </header>
  );
}
