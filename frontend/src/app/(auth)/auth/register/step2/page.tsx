'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/common/navBar/NavBar';
import { useRegistration } from '@/contexts/RegistrationContext';
import { validatePhoneNumber } from '@/services/auth';

export default function RegisterStep2Page() {
  const { data, updateData, isStepValid } = useRegistration();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate first name
    if (!data.firstName.trim()) {
      setErrors(prev => ({ ...prev, firstName: 'First name is required' }));
    }

    // Validate last name
    if (!data.lastName.trim()) {
      setErrors(prev => ({ ...prev, lastName: 'Last name is required' }));
    }

    // Validate phone number
    if (!data.phoneNumber.trim()) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Phone number is required' }));
    } else if (!validatePhoneNumber(data.phoneNumber)) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Please enter a valid phone number' }));
    }

    // If no errors, proceed to next step
    if (Object.keys(errors).length === 0 && isStepValid(2)) {
      router.push('/auth/register/step3');
    }
  };

  const handleGoBack = () => {
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
            <p className="text-gray-400">Step 2 of 3</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-white text-sm mb-2">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                value={data.firstName}
                onChange={(e) => updateData({ firstName: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.firstName ? 'border-2 border-red-500' : ''}`}
                required
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-white text-sm mb-2">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                value={data.lastName}
                onChange={(e) => updateData({ lastName: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.lastName ? 'border-2 border-red-500' : ''}`}
                required
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-white text-sm mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={data.phoneNumber}
                onChange={(e) => updateData({ phoneNumber: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.phoneNumber ? 'border-2 border-red-500' : ''}`}
                required
              />
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 bg-transparent border border-gray-600 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


