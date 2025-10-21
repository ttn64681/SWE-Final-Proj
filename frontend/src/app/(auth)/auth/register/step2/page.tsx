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
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pt-16">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Create an Account</h1>
              <p className="text-white/70 text-sm mt-1">Step 2 of 3</p>
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
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
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
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
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
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.phoneNumber ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
                required
              />
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div className="flex flex-col space-y-3 pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-acm-pink to-acm-orange text-white py-3 px-6 rounded-lg font-semibold hover:brightness-110 transition-all duration-200 shadow-lg hover:shadow-acm-pink/25"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleGoBack}
                className="w-full bg-transparent border border-white/20 text-white/80 py-3 px-6 rounded-lg font-medium hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                Go Back
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}


