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
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white">Create an Account</h1>
              <p className="text-white/70 text-sm mt-1">Step 1 of 3</p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-2">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
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
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.password ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
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
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-md bg-white/10 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-acm-pink focus:border-transparent`}
                required
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center bg-gradient-to-r from-acm-pink to-acm-orange text-white px-5 py-2.5 rounded-lg font-semibold hover:brightness-110 transition-all"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-acm-pink hover:text-acm-pink/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
