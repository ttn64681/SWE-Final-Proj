'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { validateEmail } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import AuthFormContainer from '@/components/common/auth/AuthFormContainer';
import AuthInput from '@/components/common/auth/AuthInput';
import AuthButton from '@/components/common/auth/AuthButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated - use useEffect to avoid setState in render
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Show loading or nothing while redirecting
  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate email format
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // // Call login API
      // const response = await authAPI.login({ email, password, rememberMe });

      // Call login through context
      const response = await login(email, password, rememberMe);

      if (response.success) {
        // Redirect to home page
        router.push('/');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Login" subtitle="Welcome back to ACM">
      {error && (
        <div className="mb-4 p-3 bg-red-900/40 border border-red-500/60 rounded-md">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={isLoading}
          required
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          disabled={isLoading}
          required
        />

        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-white/40 bg-white/10"
            disabled={isLoading}
          />
          <label htmlFor="rememberMe" className="text-sm text-white/80 select-none">Remember Me</label>
        </div>

        <AuthButton
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          variant="primary"
        >
          Login
        </AuthButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-acm-pink hover:text-acm-orange transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </AuthFormContainer>
  );
}
