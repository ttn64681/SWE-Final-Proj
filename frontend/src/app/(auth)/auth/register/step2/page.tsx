'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { validatePhoneNumber } from '@/services/auth';
import AuthFormContainer from '@/components/common/auth/AuthFormContainer';
import AuthButtonGroup from '@/components/common/auth/AuthButtonGroup';
import PersonalInfoSection from '@/components/specific/auth/PersonalInfoSection';
import AddressSection from '@/components/specific/auth/AddressSection';

export default function RegisterStep2Page() {
  const { data, updateData, isStepValid } = useRegistration();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // ==== VALIDATE REQUIRED FIELDS ====
    // Validate first name
    if (!data.firstName.trim()) {
      setErrors((prev) => ({ ...prev, firstName: 'First name is required' }));
    }

    if (!data.lastName.trim()) {
      setErrors((prev) => ({ ...prev, lastName: 'Last name is required' }));
    }

    if (!data.phoneNumber.trim()) {
      setErrors((prev) => ({ ...prev, phoneNumber: 'Phone number is required' }));
    } else if (!validatePhoneNumber(data.phoneNumber)) {
      setErrors((prev) => ({ ...prev, phoneNumber: 'Please enter a valid phone number' }));
    }

    // If no errors, proceed to next step
    if (Object.keys(errors).length === 0 && isStepValid(2)) {
      router.push('/auth/register/step3');
    }
  };

  const handleGoBack = () => {
    router.push('/auth/register');
  };

  return (
    <AuthFormContainer
      stepNumber={2}
      stepTitle="Personal Information"
      stepDescription="Step 2 of 3 - Tell us about yourself"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoSection data={data} updateData={updateData} errors={errors} />

        <AddressSection data={data} updateData={updateData} />

        <AuthButtonGroup
          primaryText="Continue"
          primaryType="submit"
          secondaryText="Go Back"
          secondaryOnClick={handleGoBack}
          className="pt-8"
        />
      </form>
    </AuthFormContainer>
  );
}
