'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Payment card with billing address
export interface PaymentCard {
  id: string; // temporary ID for frontend
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  isDefault: boolean;
}

export interface RegistrationData {
  // Step 1
  email: string;
  password: string;
  confirmPassword: string;

  // Step 2 - Optional home address
  firstName: string;
  lastName: string;
  phoneNumber: string;
  homeAddress?: string; // Optional home address
  homeCity?: string;
  homeState?: string;
  homeZip?: string;
  homeCountry?: string;

  // Step 3 - Payment cards (up to 3)
  paymentCards: PaymentCard[];
  defaultCardId?: string;
  
  // Preferences
  enrollForPromotions?: boolean;
}

interface RegistrationContextType {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  clearData: () => void;
  isStepValid: (step: number) => boolean;
}

const initialData: RegistrationData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  paymentCards: [
    {
      id: 'card_1',
      cardType: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      isDefault: true,
    },
  ],
  defaultCardId: 'card_1',
  enrollForPromotions: false,
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [data, setData] = useState<RegistrationData>(initialData);

  const updateData = (stepData: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...stepData }));
  };

  const clearData = () => {
    setData(initialData);
  };

  // Helper: Check if a payment card is fully filled
  const isPaymentCardComplete = (card: PaymentCard): boolean => {
    return !!(
      card.cardType &&
      card.cardNumber &&
      card.expirationDate &&
      card.cvv &&
      card.billingStreet &&
      card.billingCity &&
      card.billingState &&
      card.billingZip
    );
  };

  // Helper: Check if a payment card is completely empty
  const isPaymentCardEmpty = (card: PaymentCard): boolean => {
    return !(
      card.cardType ||
      card.cardNumber ||
      card.expirationDate ||
      card.cvv ||
      card.billingStreet ||
      card.billingCity ||
      card.billingState ||
      card.billingZip
    );
  };

  // Helper: Check if any card is partially filled (invalid state)
  const hasPartialPaymentCard = (): boolean => {
    return data.paymentCards.some(
      (card) => !isPaymentCardComplete(card) && !isPaymentCardEmpty(card)
    );
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          data.email &&
          data.password &&
          data.confirmPassword &&
          data.password === data.confirmPassword &&
          data.password.length >= 8
        );
      case 2:
        return !!(data.firstName && data.lastName && data.phoneNumber);
      case 3:
        // All payment cards must be either fully complete or completely empty
        // Cannot have any partially filled cards
        return !hasPartialPaymentCard();
      default:
        return false;
    }
  };

  return (
    <RegistrationContext.Provider value={{ data, updateData, clearData, isStepValid }}>
      {children}
    </RegistrationContext.Provider>
  );
};
