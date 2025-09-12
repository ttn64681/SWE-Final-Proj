'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RegistrationData {
  // Step 1
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2
  firstName: string;
  lastName: string;
  phoneNumber: string;
  
  // Step 3
  address: string;
  state: string;
  country: string;
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
  address: '',
  state: '',
  country: '',
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
    setData(prev => ({ ...prev, ...stepData }));
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
        return !!(
          data.firstName &&
          data.lastName &&
          data.phoneNumber
        );
      case 3:
        return !!(
          data.state &&
          data.country
        );
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
