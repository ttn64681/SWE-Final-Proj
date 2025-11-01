'use client';

import React from 'react';
import { RegistrationData } from '@/contexts/RegistrationContext';

interface PersonalInfoSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  errors: { [key: string]: string };
  isLoading?: boolean;
}

export default function PersonalInfoSection({ data, updateData, errors, isLoading = false }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="flex flex-row block text-white text-md mb-2">
            First Name <p className={`ml-1 text-lg text-red-400`}> * </p>
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
            required
            disabled={isLoading}
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="flex flex-row block text-white text-md mb-2">
            Last Name <p className={`ml-1 text-lg text-red-400`}> * </p>
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
            required
            disabled={isLoading}
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="flex flex-row block text-white text-md mb-2">
            Phone Number <p className={`ml-1 text-lg text-red-400`}> * </p>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => updateData({ phoneNumber: e.target.value })}
          placeholder="(555) 123-4567"
          className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.phoneNumber ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
          required
          disabled={isLoading}
        />
        {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>
    </div>
  );
}
