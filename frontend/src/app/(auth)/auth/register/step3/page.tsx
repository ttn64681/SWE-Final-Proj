'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/common/navBar/NavBar';
import { useRegistration } from '@/contexts/RegistrationContext';
import { authAPI } from '@/services/auth';

export default function RegisterStep3Page() {
  const { data, updateData, clearData } = useRegistration();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsLoading(true);

    try {
      // Step 3 validation is now optional - payment method can be empty
      // No required fields validation needed

      // Prepare registration data
      const registrationData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: '', // Leave empty for now
        state: '', // Leave empty for now
        country: 'US', // Default to US
        // Payment info removed - will be handled separately later
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
        router.push('/auth/login');
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
      <div className="flex items-start justify-center min-h-[calc(100vh-80px)] px-4 pt-20 pb-8">
        <div className="w-full max-w-lg">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white">Create an Account</h1>
              <p className="text-white/70 text-sm mt-1">Step 3 of 3 - Payment Method (Optional)</p>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md">
                <p className="text-red-200 text-sm">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Payment Information Section */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white/90 border-b border-white/10 pb-1">
                  Payment Information
                </h3>

                <div>
                  <label htmlFor="cardType" className="block text-white text-sm mb-1">
                    Card Type
                  </label>
                  <select
                    id="cardType"
                    value={data.cardType || ''}
                    onChange={(e) => updateData({ cardType: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
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
                  <label htmlFor="cardNumber" className="block text-white text-sm mb-1">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={data.cardNumber || ''}
                    onChange={(e) => updateData({ cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expirationDate" className="block text-white text-sm mb-1">
                      Expiration Date
                    </label>
                    <input
                      id="expirationDate"
                      type="text"
                      value={data.expirationDate || ''}
                      onChange={(e) => updateData({ expirationDate: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-white text-sm mb-1">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      value={data.cvv || ''}
                      onChange={(e) => updateData({ cvv: e.target.value })}
                      placeholder="123"
                      className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address Section */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white/90 border-b border-white/10 pb-1">Billing Address</h3>

                <div>
                  <label htmlFor="billingStreet" className="block text-white text-sm mb-1">
                    Street Address
                  </label>
                  <input
                    id="billingStreet"
                    type="text"
                    value={data.billingStreet || ''}
                    onChange={(e) => updateData({ billingStreet: e.target.value })}
                    placeholder="123 Main St"
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="billingCity" className="block text-white text-sm mb-1">
                      City
                    </label>
                    <input
                      id="billingCity"
                      type="text"
                      value={data.billingCity || ''}
                      onChange={(e) => updateData({ billingCity: e.target.value })}
                      placeholder="New York"
                      className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingState" className="block text-white text-sm mb-1">
                      State
                    </label>
                    <input
                      id="billingState"
                      type="text"
                      value={data.billingState || ''}
                      onChange={(e) => updateData({ billingState: e.target.value })}
                      placeholder="NY"
                      className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingZip" className="block text-white text-sm mb-1">
                      ZIP Code
                    </label>
                    <input
                      id="billingZip"
                      type="text"
                      value={data.billingZip || ''}
                      onChange={(e) => updateData({ billingZip: e.target.value })}
                      placeholder="10001"
                      className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-acm-pink to-acm-orange text-white py-2.5 px-6 rounded-lg font-semibold hover:brightness-110 transition-all duration-200 shadow-lg hover:shadow-acm-pink/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-transparent border border-acm-pink/50 text-acm-pink py-2.5 px-6 rounded-lg font-medium hover:bg-acm-pink/10 hover:border-acm-pink transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Skip & Create Account
                </button>
                <button
                  type="button"
                  onClick={handleGoBack}
                  disabled={isLoading}
                  className="w-full bg-transparent border border-white/20 text-white/80 py-2.5 px-6 rounded-lg font-medium hover:bg-white/5 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
