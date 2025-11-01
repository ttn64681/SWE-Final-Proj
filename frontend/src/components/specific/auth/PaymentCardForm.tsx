'use client';

import React from 'react';
import { PaymentCard } from '@/contexts/RegistrationContext';

interface PaymentCardFormProps {
  card: PaymentCard;
  index: number;
  updateCard: (index: number, updates: Partial<PaymentCard>) => void;
  onRemove: () => void;
  canRemove: boolean;
  isLoading?: boolean;
}

export default function PaymentCardForm({
  card,
  index,
  updateCard,
  onRemove,
  canRemove,
  isLoading = false,
}: PaymentCardFormProps) {
  // Format card number with spaces (e.g., "1234 5678 9012 3456")
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Validate card number format
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  };

  // Format expiration date (MM/YY)
  const formatExpirationDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="border border-white/20 rounded-lg p-6 space-y-4 bg-black/20">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Payment Card {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            disabled={isLoading}
            className="text-red-400 hover:text-red-300 px-3 py-1 rounded-md hover:bg-red-900/20 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {/* Card Type */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Card Type</label>
        <select
          value={card.cardType}
          onChange={(e) => updateCard(index, { cardType: e.target.value })}
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-acm-pink"
          disabled={isLoading}
          aria-label="Card Type"
        >
          <option value="">Select card type</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
          <option value="discover">Discover</option>
        </select>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Card Number</label>
        <input
          type="text"
          value={card.cardNumber}
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            updateCard(index, { cardNumber: formatted });
          }}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
          disabled={isLoading}
        />
        {card.cardNumber && !validateCardNumber(card.cardNumber) && (
          <p className="text-red-400 text-sm mt-1">Please enter a valid card number (13-19 digits)</p>
        )}
      </div>

      {/* Expiration and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Expiration Date</label>
          <input
            type="text"
            value={card.expirationDate}
            onChange={(e) => {
              const formatted = formatExpirationDate(e.target.value);
              updateCard(index, { expirationDate: formatted });
            }}
            placeholder="MM/YY"
            maxLength={5}
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
            disabled={isLoading}
          />
          {card.expirationDate && card.expirationDate.length !== 5 && (
            <p className="text-red-400 text-sm mt-1">Format: MM/YY</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">CVV</label>
          <input
            type="text"
            value={card.cvv}
            onChange={(e) => {
              // Only allow digits and limit to 4 characters
              const cleaned = e.target.value.replace(/\D/g, '').slice(0, 4);
              updateCard(index, { cvv: cleaned });
            }}
            placeholder="123"
            maxLength={4}
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
            disabled={isLoading}
          />
          {card.cvv && card.cvv.length < 3 && <p className="text-red-400 text-sm mt-1">CVV must be 3-4 digits</p>}
        </div>
      </div>

      {/* Billing Address */}
      <div className="border-t border-white/20 pt-4 mt-4">
        <h4 className="text-sm font-medium text-white mb-3">Billing Address</h4>
        <div className="space-y-4">
          <input
            type="text"
            value={card.billingStreet}
            onChange={(e) => updateCard(index, { billingStreet: e.target.value })}
            placeholder="Street Address"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
            disabled={isLoading}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={card.billingCity}
              onChange={(e) => updateCard(index, { billingCity: e.target.value })}
              placeholder="City"
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
              disabled={isLoading}
            />
            <input
              type="text"
              value={card.billingState}
              onChange={(e) => updateCard(index, { billingState: e.target.value })}
              placeholder="State"
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
              disabled={isLoading}
            />
          </div>
          <input
            type="text"
            value={card.billingZip}
            onChange={(e) => updateCard(index, { billingZip: e.target.value })}
            placeholder="ZIP Code"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Default Card Toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`default_${index}`}
          checked={card.isDefault}
          onChange={(e) => updateCard(index, { isDefault: e.target.checked })}
          className="w-4 h-4 rounded border-white/20 bg-white/10 text-acm-pink focus:ring-2 focus:ring-acm-pink"
          disabled={isLoading}
        />
        <label htmlFor={`default_${index}`} className="text-sm text-white">
          Set as default payment method
        </label>
      </div>
    </div>
  );
}
