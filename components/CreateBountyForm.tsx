'use client';

import { useState } from 'react';
import { MapPin, Package, DollarSign, Clock } from 'lucide-react';
import { calculateBountyPrice } from '@/lib/utils';

interface CreateBountyFormProps {
  onSubmit: (bountyData: any) => void;
}

export function CreateBountyForm({ onSubmit }: CreateBountyFormProps) {
  const [formData, setFormData] = useState({
    itemDescription: '',
    itemType: '',
    pickupLocation: '',
    dropoffLocation: '',
    urgency: 'medium',
    distance: 0,
    customAmount: '',
  });

  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const suggestedPrice = calculateBountyPrice(formData.distance, formData.urgency, formData.itemType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bountyData = {
      ...formData,
      offeredAmountUSD: useCustomAmount ? parseFloat(formData.customAmount) : suggestedPrice,
    };
    onSubmit(bountyData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Bounty</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Package className="w-4 h-4 inline mr-2" />
              Item Description
            </label>
            <input
              type="text"
              value={formData.itemDescription}
              onChange={(e) => handleInputChange('itemDescription', e.target.value)}
              placeholder="e.g., Small package - electronics"
              className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Item Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Item Type</label>
            <select
              value={formData.itemType}
              onChange={(e) => handleInputChange('itemType', e.target.value)}
              className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select item type</option>
              <option value="electronics">Electronics</option>
              <option value="documents">Documents</option>
              <option value="fragile">Fragile Items</option>
              <option value="perishable">Perishable</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Pickup Location
              </label>
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                placeholder="e.g., Downtown Coffee Shop"
                className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Drop-off Location
              </label>
              <input
                type="text"
                value={formData.dropoffLocation}
                onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                placeholder="e.g., University Campus"
                className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Distance and Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.distance}
                onChange={(e) => handleInputChange('distance', parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Urgency
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Bounty Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Bounty Amount (USDC)
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="suggested"
                  name="amountType"
                  checked={!useCustomAmount}
                  onChange={() => setUseCustomAmount(false)}
                  className="text-purple-500"
                />
                <label htmlFor="suggested" className="text-white">
                  Use suggested amount: <span className="font-bold text-purple-400">${suggestedPrice.toFixed(2)}</span>
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="custom"
                  name="amountType"
                  checked={useCustomAmount}
                  onChange={() => setUseCustomAmount(true)}
                  className="text-purple-500"
                />
                <label htmlFor="custom" className="text-white">Custom amount:</label>
                {useCustomAmount && (
                  <input
                    type="number"
                    step="0.01"
                    value={formData.customAmount}
                    onChange={(e) => handleInputChange('customAmount', e.target.value)}
                    placeholder="0.00"
                    className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-24"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-4 text-lg font-semibold"
          >
            Create Bounty
          </button>
        </form>
      </div>
    </div>
  );
}
