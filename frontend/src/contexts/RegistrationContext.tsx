'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PaymentCard {
  id: string;
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

  // Step 2
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // Address fields (optional)
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;

  // Step 3 - Payment Methods (Optional, up to 3 cards)
  paymentCards: PaymentCard[];
  defaultCardId?: string;

  // Step 3 - Preferences
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
  // Address fields
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  // Payment fields - Start with one empty card
  paymentCards: [
    {
      id: 'card_initial',
      cardType: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      isDefault: true,
    }
  ],
  defaultCardId: 'card_initial',
  // Preferences
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

        // Step 3 is optional - payment method can be empty
        return true;
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
