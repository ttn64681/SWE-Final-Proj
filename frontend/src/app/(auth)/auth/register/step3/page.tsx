'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/common/navBar/NavBar';

export default function RegisterStep3Page() {
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle step 3 completion logic here
    console.log('Step 3 data:', { address, state, country });
    // For now, redirect to login after registration
    router.push('/auth/login');
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-white text-sm mb-2">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-white text-sm mb-2">State*</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-white text-sm mb-2">Country*</label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                required
              />
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


