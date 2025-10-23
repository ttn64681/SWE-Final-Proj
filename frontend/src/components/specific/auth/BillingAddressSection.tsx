'use client';

import React from 'react';
import { RegistrationData } from '@/contexts/RegistrationContext';

interface BillingAddressSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  isLoading?: boolean;
}

export default function BillingAddressSection({ data, updateData, isLoading = false }: BillingAddressSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
        Billing Address <span className="text-white/60 text-sm font-normal">(Optional)</span>
      </h3>

      <div>
        <label htmlFor="billingStreet" className="block text-white text-sm mb-2">
          Street Address
        </label>
        <input
          id="billingStreet"
          type="text"
          value={data.billingStreet || ''}
          onChange={(e) => updateData({ billingStreet: e.target.value })}
          placeholder="123 Main St"
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="billingCity" className="block text-white text-sm mb-2">
            City
          </label>
          <input
            id="billingCity"
            type="text"
            value={data.billingCity || ''}
            onChange={(e) => updateData({ billingCity: e.target.value })}
            placeholder="New York"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="billingState" className="block text-white text-sm mb-2">
            State
          </label>
          <input
            id="billingState"
            type="text"
            value={data.billingState || ''}
            onChange={(e) => updateData({ billingState: e.target.value })}
            placeholder="NY"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="billingZip" className="block text-white text-sm mb-2">
            ZIP Code
          </label>
          <input
            id="billingZip"
            type="text"
            value={data.billingZip || ''}
            onChange={(e) => updateData({ billingZip: e.target.value })}
            placeholder="10001"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
