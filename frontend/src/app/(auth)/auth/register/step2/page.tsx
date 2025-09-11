'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/common/navBar/NavBar';

export default function RegisterStep2Page() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle step 2 logic here
    console.log('Step 2 data:', { firstName, lastName, phoneNumber });
    // Navigate to step 3
    router.push('/auth/register/step3');
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
            <p className="text-gray-400">Step 2 of 4</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-white text-sm mb-2">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-white text-sm mb-2">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-white text-sm mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Input text"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 bg-transparent border border-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-all"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-md font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
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


