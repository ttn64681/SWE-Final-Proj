'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { validateEmail, validatePassword } from '@/services/auth';
import AuthInput from '@/components/common/auth/AuthInput';
import AuthButton from '@/components/common/auth/AuthButton';
import AuthFormContainer from '@/components/common/auth/AuthFormContainer';

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
    <AuthFormContainer
      stepNumber={1}
      stepTitle="Create an Account"
      stepDescription="Step 1 of 3 - Get started with your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          id="email"
          label="Email Address*"
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          placeholder="you@example.com"
          error={errors.email}
          required
        />

        <AuthInput
          id="password"
          label="Password*"
          type="password"
          value={data.password}
          onChange={(e) => updateData({ password: e.target.value })}
          placeholder="••••••••"
          error={errors.password}
          required
        />

        <AuthInput
          id="confirmPassword"
          label="Confirm Password*"
          type="password"
          value={data.confirmPassword}
          onChange={(e) => updateData({ confirmPassword: e.target.value })}
          placeholder="••••••••"
          error={errors.confirmPassword}
          required
        />

        <AuthButton type="submit" variant="primary">
          Continue
        </AuthButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-acm-pink hover:text-acm-orange transition-colors cursor-pointer">
            &nbsp;Sign in
          </Link>
        </p>
      </div>
    </AuthFormContainer>
  );
}
