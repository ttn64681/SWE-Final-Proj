'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/common/navBar/NavBar';
import { useRegistration } from '@/contexts/RegistrationContext';
import { authAPI } from '@/services/auth';

export default function RegisterStep3Page() {
  const { data, updateData, clearData } = useRegistration();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!data.state.trim()) {
        setErrors(prev => ({ ...prev, state: 'State is required' }));
      }
      if (!data.country.trim()) {
        setErrors(prev => ({ ...prev, country: 'Country is required' }));
      }

      if (Object.keys(errors).length > 0) {
        setIsLoading(false);
        return;
      }

      // Prepare registration data
      const registrationData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        state: data.state,
        country: data.country,
      };

      // Call registration API
      const response = await authAPI.register(registrationData);

      if (response.success) {
        // Store token and user data
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        // Clear registration data
        clearData();

        // Redirect to home page
        router.push('/');
      } else {
        setSubmitError(response.message);
      }
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/auth/register/step2');
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
            <p className="text-gray-400">Step 3 of 3</p>
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md">
              <p className="text-red-200 text-sm">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-white text-sm mb-2">Address</label>
              <input
                id="address"
                type="text"
                value={data.address}
                onChange={(e) => updateData({ address: e.target.value })}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-white text-sm mb-2">State*</label>
              <input
                id="state"
                type="text"
                value={data.state}
                onChange={(e) => updateData({ state: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.state ? 'border-2 border-red-500' : ''}`}
                required
                disabled={isLoading}
              />
              {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-white text-sm mb-2">Country*</label>
              <input
                id="country"
                type="text"
                value={data.country}
                onChange={(e) => updateData({ country: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.country ? 'border-2 border-red-500' : ''}`}
                required
                disabled={isLoading}
              />
              {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleGoBack}
                disabled={isLoading}
                className="flex-1 bg-transparent border border-gray-600 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Go Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


