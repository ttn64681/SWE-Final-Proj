'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { authAPI } from '@/services/auth';
import AuthFormContainer from '@/components/common/auth/AuthFormContainer';
import AuthButtonGroup from '@/components/common/auth/AuthButtonGroup';
import PaymentSection from '@/components/specific/auth/PaymentSection';
import BillingAddressSection from '@/components/specific/auth/BillingAddressSection';
import PreferencesSection from '@/components/specific/auth/PreferencesSection';

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
      // Prepare registration data for backend
      const registrationData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address || '',
        state: data.state || '',
        country: data.country || 'US',
        // Note: Payment info and promotions preference are not sent to backend yet
        // as the backend doesn't currently support these fields
      };

      // Call registration API
      const response = await authAPI.register(registrationData);

      if (response.success) {
        // Clear registration data
        clearData();

        // Redirect to email verification page with registration flag
        router.push('/auth/verify-email?from=registration');
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

  const handleSkip = () => {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent;
    handleSubmit(fakeEvent);
  };

  return (
    <AuthFormContainer
      stepNumber={3}
      stepTitle="Payment & Preferences"
      stepDescription="Step 3 of 3 - Complete your profile"
      maxWidth="2xl"
    >
      {submitError && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
          <p className="text-red-200 text-sm">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentSection data={data} updateData={updateData} isLoading={isLoading} />

        <BillingAddressSection data={data} updateData={updateData} isLoading={isLoading} />

        <PreferencesSection data={data} updateData={updateData} isLoading={isLoading} />

        <AuthButtonGroup
          primaryText={isLoading ? 'Creating Account...' : 'Create Account'}
          primaryType="submit"
          primaryLoading={isLoading}
          primaryDisabled={isLoading}
          secondaryText="Go Back"
          secondaryOnClick={handleGoBack}
          secondaryDisabled={isLoading}
          skipText="Skip payment info and create account"
          skipOnClick={handleSkip}
          skipDisabled={isLoading}
          className="pt-8"
        />
      </form>
    </AuthFormContainer>
  );
}
