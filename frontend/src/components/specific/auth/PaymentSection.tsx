'use client';

import React, { useState } from 'react';
import { RegistrationData, PaymentCard } from '@/contexts/RegistrationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  isLoading?: boolean;
}

export default function PaymentSection({ data, updateData, isLoading = false }: PaymentSectionProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Add new payment card (max 3 cards allowed)
  const addPaymentCard = () => {
    if (data.paymentCards.length >= 3) return;

    const newCard: PaymentCard = {
      id: `card_${Date.now()}`,
      cardType: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      isDefault: data.paymentCards.length === 0, // First card is automatically default
    };

    const updatedCards = [...data.paymentCards, newCard];
    updateData({
      paymentCards: updatedCards,
      defaultCardId: data.paymentCards.length === 0 ? newCard.id : data.defaultCardId,
    });
  };

  // Remove payment card and handle default card reassignment
  const removePaymentCard = (cardId: string) => {
    // Don't allow removing the initial first card
    if (data.paymentCards.length <= 1) return;
    
    const updatedCards = data.paymentCards.filter((card) => card.id !== cardId);
    const wasDefault = data.paymentCards.find((card) => card.id === cardId)?.isDefault;

    let newDefaultId = data.defaultCardId;
    if (wasDefault && updatedCards.length > 0) {
      // Set first remaining card as default
      updatedCards[0].isDefault = true;
      newDefaultId = updatedCards[0].id;
    } else if (updatedCards.length === 0) {
      newDefaultId = undefined;
    }

    updateData({
      paymentCards: updatedCards,
      defaultCardId: newDefaultId,
    });
  };

  // Update individual card field
  const updatePaymentCard = (cardId: string, field: keyof PaymentCard, value: string | boolean) => {
    const updatedCards = data.paymentCards.map((card) => (card.id === cardId ? { ...card, [field]: value } : card));
    updateData({ paymentCards: updatedCards });
  };

  // Set a card as the default (only one can be default at a time)
  const setDefaultCard = (cardId: string) => {
    const updatedCards = data.paymentCards.map((card) => ({
      ...card,
      isDefault: card.id === cardId,
    }));
    updateData({
      paymentCards: updatedCards,
      defaultCardId: cardId,
    });
  };

  const validateCard = (card: PaymentCard): { [key: string]: string } => {
    const cardErrors: { [key: string]: string } = {};

    if (!card.cardType) cardErrors.cardType = 'Card type is required';
    if (!card.cardNumber) cardErrors.cardNumber = 'Card number is required';
    if (!card.expirationDate) cardErrors.expirationDate = 'Expiration date is required';
    if (!card.cvv) cardErrors.cvv = 'CVV is required';
    if (!card.billingStreet) cardErrors.billingStreet = 'Billing street is required';
    if (!card.billingCity) cardErrors.billingCity = 'Billing city is required';
    if (!card.billingState) cardErrors.billingState = 'Billing state is required';
    if (!card.billingZip) cardErrors.billingZip = 'Billing zip is required';

    return cardErrors;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
          Payment Information <span className="text-white/60 text-sm font-normal">(Optional)</span>
        </h3>
        {data.paymentCards.length < 3 && (
          <motion.button
            type="button"
            onClick={addPaymentCard}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-acm-pink/20 hover:bg-acm-pink/30 border border-acm-pink/50 rounded-lg text-acm-pink text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Card
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {data.paymentCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-white/20 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Payment Card {index + 1}</h4>
              <div className="flex items-center gap-3">
                {data.paymentCards.length > 1 && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultCard"
                      checked={card.isDefault}
                      onChange={() => setDefaultCard(card.id)}
                      className="w-4 h-4 text-acm-pink bg-white/10 border-white/30 focus:ring-acm-pink focus:ring-2"
                      disabled={isLoading}
                    />
                    <span className="text-white/70 text-sm">Default</span>
                  </label>
                )}
                {data.paymentCards.length > 1 && (
                  <motion.button
                    type="button"
                    onClick={() => removePaymentCard(card.id)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-2">Card Type</label>
                <select
                  value={card.cardType}
                  onChange={(e) => updatePaymentCard(card.id, 'cardType', e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent cursor-pointer"
                  disabled={isLoading}
                  title="Select card type"
                >
                  <option value="">Select card type</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Card Number</label>
                <input
                  type="text"
                  value={card.cardNumber}
                  onChange={(e) => updatePaymentCard(card.id, 'cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Expiration Date</label>
                <input
                  type="text"
                  value={card.expirationDate}
                  onChange={(e) => updatePaymentCard(card.id, 'expirationDate', e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">CVV</label>
                <input
                  type="text"
                  value={card.cvv}
                  onChange={(e) => updatePaymentCard(card.id, 'cvv', e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-white/80 font-medium">Billing Address</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-white text-sm mb-2">Street Address</label>
                  <input
                    type="text"
                    value={card.billingStreet}
                    onChange={(e) => updatePaymentCard(card.id, 'billingStreet', e.target.value)}
                    placeholder="123 Main St"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">City</label>
                  <input
                    type="text"
                    value={card.billingCity}
                    onChange={(e) => updatePaymentCard(card.id, 'billingCity', e.target.value)}
                    placeholder="New York"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">State</label>
                  <input
                    type="text"
                    value={card.billingState}
                    onChange={(e) => updatePaymentCard(card.id, 'billingState', e.target.value)}
                    placeholder="NY"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={card.billingZip}
                    onChange={(e) => updatePaymentCard(card.id, 'billingZip', e.target.value)}
                    placeholder="10001"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
}
