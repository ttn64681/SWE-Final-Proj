'use client';

import React from 'react';
import { RegistrationData } from '@/contexts/RegistrationContext';

interface AddressSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  isLoading?: boolean;
}

export default function AddressSection({ data, updateData, isLoading = false }: AddressSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
        Address Information <span className="text-white/60 text-sm font-normal">(Optional)</span>
      </h3>

      <div>
        <label htmlFor="address" className="block text-white text-md mb-2">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          value={data.homeAddress || ''}
          onChange={(e) => updateData({ homeAddress: e.target.value })}
          placeholder="123 Main Street"
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-white text-md mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            value={data.homeCity || ''}
            onChange={(e) => updateData({ homeCity: e.target.value })}
            placeholder="New York"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-white text-md mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            value={data.homeState || ''}
            onChange={(e) => updateData({ homeState: e.target.value })}
            placeholder="NY"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-white text-md mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={data.homeZip || ''}
            onChange={(e) => updateData({ homeZip: e.target.value })}
            placeholder="10001"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-white text-md mb-2">
          Country
        </label>
        <select
          id="country"
          value={data.homeCountry || 'US'}
          onChange={(e) => updateData({ homeCountry: e.target.value })}
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent cursor-pointer"
          disabled={isLoading}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="MX">Mexico</option>
          <option value="UK">United Kingdom</option>
          <option value="AU">Australia</option>
        </select>
      </div>
    </div>
  );
}
