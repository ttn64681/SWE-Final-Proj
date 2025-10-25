'use client';

import React, { useState } from 'react';
import { RegistrationData } from '@/contexts/RegistrationContext';

interface PaymentSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  isLoading?: boolean;
}

export default function PaymentSection({ data, updateData, isLoading = false }: PaymentSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCard = (cardNumber: string) => {
    // Simple validation - remove spaces and check if it's numeric
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    updateData({ cardNumber: formatted });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Payment Information</h2>
        <p className="text-white/70">Add your payment method (optional)</p>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-white mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={data.cardNumber || ''}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Expiration Date */}
        <div>
          <label htmlFor="expirationDate" className="block text-sm font-medium text-white mb-2">
            Expiration Date
          </label>
          <input
            type="text"
            id="expirationDate"
            value={data.expirationDate || ''}
            onChange={(e) => updateData({ expirationDate: e.target.value })}
            placeholder="MM/YY"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* CVV */}
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-white mb-2">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            value={data.cvv || ''}
            onChange={(e) => updateData({ cvv: e.target.value })}
            placeholder="123"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Billing Address */}
        <div>
          <label htmlFor="billingStreet" className="block text-sm font-medium text-white mb-2">
            Billing Street Address
          </label>
          <input
            type="text"
            id="billingStreet"
            value={data.billingStreet || ''}
            onChange={(e) => updateData({ billingStreet: e.target.value })}
            placeholder="123 Main St"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Billing City and State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="billingCity" className="block text-sm font-medium text-white mb-2">
              City
            </label>
            <input
              type="text"
              id="billingCity"
              value={data.billingCity || ''}
              onChange={(e) => updateData({ billingCity: e.target.value })}
              placeholder="New York"
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="billingState" className="block text-sm font-medium text-white mb-2">
              State
            </label>
            <input
              type="text"
              id="billingState"
              value={data.billingState || ''}
              onChange={(e) => updateData({ billingState: e.target.value })}
              placeholder="NY"
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Billing ZIP */}
        <div>
          <label htmlFor="billingZip" className="block text-sm font-medium text-white mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="billingZip"
            value={data.billingZip || ''}
            onChange={(e) => updateData({ billingZip: e.target.value })}
            placeholder="10001"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="text-center text-white/60 text-sm">
        <p>Payment information is optional and can be added later</p>
      </div>
    </div>
  );
}