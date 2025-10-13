'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/config/api';

/**
 * Email Verification Page
 * 
 * This page handles email verification when users click the link in their verification email.
 * It extracts the token from the URL and calls the backend verification endpoint.
 */
export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'registration-success'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      // Get token from URL query parameter
      const token = searchParams.get('token');


      if (!token) {
        // Check if this is a redirect from registration (no token but coming from registration flow)
        const fromRegistration = searchParams.get('from') === 'registration';
        
        if (fromRegistration) {
          setStatus('registration-success');
          setMessage('Registration successful! A verification email has been sent to your inbox. Please check your email and click the verification link to activate your account.');
        } else {
          setStatus('error');
          setMessage('No verification token found. If you clicked a verification link, please try again. Otherwise, use the form below to request a new verification email.');
        }
        return;
      }

      try {
        // Call verification endpoint
        const response = await api.post(`/api/auth/verify-email?token=${token}`);
        
        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message || 'Email verified successfully!');

          // Store JWT tokens
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
          if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
          }
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }

          // Redirect to home page after 2 seconds
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Verification failed.');
        }
      } catch (error) {
        setStatus('error');
        const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Verification failed. The token may be invalid or expired.';
        
        // Add more helpful context
        if (errorMessage.includes('expired')) {
          setMessage('This verification link has expired (valid for 24 hours). Please request a new verification email below.');
        } else if (errorMessage.includes('Invalid')) {
          setMessage('This verification link is invalid or has already been used. If you already verified your account, you can try logging in. Otherwise, request a new verification email below.');
        } else {
          setMessage(`Verification failed: ${errorMessage}. Please request a new verification email below.`);
        }
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resendEmail.trim()) {
      setResendStatus('error');
      setResendMessage('Please enter your email address.');
      return;
    }

    setResendStatus('loading');
    setResendMessage('Sending verification email...');
    
    try {
      console.log('Sending resend verification request for:', resendEmail.trim());
      const response = await api.post(`/api/auth/resend-verification?email=${encodeURIComponent(resendEmail.trim())}`);
      
      console.log('Resend verification response:', response.data);
      
      if (response.data.success) {
        setResendStatus('success');
        setResendMessage('Verification email has been sent! Please check your inbox and spam folder.');
        setResendEmail(''); // Clear the form
      } else {
        setResendStatus('error');
        setResendMessage(response.data.message || 'Failed to send verification email.');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setResendStatus('error');
      const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to send verification email. Please try again.';
      setResendMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Email Verification
            </h1>
          </div>

          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {status === 'verifying' && (
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            )}
            {status === 'success' && (
              <div className="rounded-full h-16 w-16 bg-green-100 flex items-center justify-center">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {status === 'registration-success' && (
              <div className="rounded-full h-16 w-16 bg-blue-100 flex items-center justify-center">
                <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-full h-16 w-16 bg-red-100 flex items-center justify-center">
                <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          {/* Message */}
          <div className={`text-center mb-6 p-4 rounded-lg ${
            status === 'verifying' ? 'bg-blue-50 text-blue-800' :
            status === 'success' ? 'bg-green-50 text-green-800' :
            status === 'registration-success' ? 'bg-blue-50 text-blue-800' :
            'bg-red-50 text-red-800'
          }`}>
            <p className="text-lg font-medium">{message}</p>
            {status === 'success' && (
              <p className="text-sm mt-2">Redirecting to home page...</p>
            )}
            {status === 'registration-success' && (
              <p className="text-sm mt-2">Check your email inbox and spam folder for the verification link.</p>
            )}
          </div>

          {/* Actions */}
          {status === 'error' && (
            <div className="space-y-4">
              {/* Resend Email Form */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">
                  Request New Verification Email
                </h3>
                
                {/* Resend Status Message */}
                {resendMessage && (
                  <div className={`mb-4 p-3 rounded-lg text-sm ${
                    resendStatus === 'success' ? 'bg-green-50 text-green-800' :
                    resendStatus === 'error' ? 'bg-red-50 text-red-800' :
                    'bg-blue-50 text-blue-800'
                  }`}>
                    {resendMessage}
                  </div>
                )}

                <form onSubmit={handleResendEmail} className="space-y-3">
                  <div>
                    <label htmlFor="resendEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="resendEmail"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email address"
                      required
                      disabled={resendStatus === 'loading'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={resendStatus === 'loading'}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {resendStatus === 'loading' ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Verification Email'
                    )}
                  </button>
                </form>
              </div>

              {/* Alternative Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => router.push('/auth/resend-verification')}
                  className="w-full text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  Use dedicated resend page
                </button>
              </div>
            </div>
          )}

          {status === 'success' && (
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue to Home
            </button>
          )}

          {status === 'registration-success' && (
            <div className="space-y-3">
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Login
              </button>
              <button
                onClick={() => router.push('/auth/resend-verification')}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Resend Verification Email
              </button>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Need help?{' '}
            <a href="/support" className="text-blue-400 hover:text-blue-300 underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

