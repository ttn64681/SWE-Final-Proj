'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/common/navBar/NavBar';
import { useRegistration } from '@/contexts/RegistrationContext';
import { validateEmail, validatePassword } from '@/services/auth';

export default function RegisterPage() {
  const { data, updateData, isStepValid } = useRegistration();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate email
    if (!data.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!validateEmail(data.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }

    // Validate password
    if (!data.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else {
      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.isValid) {
        setErrors(prev => ({ ...prev, password: passwordValidation.message || 'Invalid password' }));
      }
    }

    // Validate confirm password
    if (!data.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
    } else if (data.password !== data.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }

    // If no errors, proceed to next step
    if (Object.keys(errors).length === 0 && isStepValid(1)) {
      router.push('/auth/register/step2');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
            <p className="text-gray-400">Step 1 of 3</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-2">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.email ? 'border-2 border-red-500' : ''}`}
                required
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-sm mb-2">
                Password*
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => updateData({ password: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.password ? 'border-2 border-red-500' : ''}`}
                required
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm mb-2">
                Confirm Password*
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={(e) => updateData({ confirmPassword: e.target.value })}
                placeholder="Input text"
                className={`w-full px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 ${errors.confirmPassword ? 'border-2 border-red-500' : ''}`}
                required
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-red-500 hover:text-red-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
