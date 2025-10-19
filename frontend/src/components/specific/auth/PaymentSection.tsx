'use client';

import React from 'react';
import { RegistrationData } from '@/contexts/RegistrationContext';

interface PaymentSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  isLoading?: boolean;
}

export default function PaymentSection({ data, updateData, isLoading = false }: PaymentSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
        Payment Information <span className="text-white/60 text-sm font-normal">(Optional)</span>
      </h3>

      <div>
        <label htmlFor="cardType" className="block text-white text-sm mb-2">
          Card Type
        </label>
        <select
          id="cardType"
          value={data.cardType || ''}
          onChange={(e) => updateData({ cardType: e.target.value })}
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent cursor-pointer"
          disabled={isLoading}
        >
          <option value="">Select card type</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
          <option value="discover">Discover</option>
        </select>
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-white text-sm mb-2">
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          value={data.cardNumber || ''}
          onChange={(e) => updateData({ cardNumber: e.target.value })}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expirationDate" className="block text-white text-sm mb-2">
            Expiration Date
          </label>
          <input
            id="expirationDate"
            type="text"
            value={data.expirationDate || ''}
            onChange={(e) => updateData({ expirationDate: e.target.value })}
            placeholder="MM/YY"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block text-white text-sm mb-2">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            value={data.cvv || ''}
            onChange={(e) => updateData({ cvv: e.target.value })}
            placeholder="123"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

