'use client';

import { RegistrationProvider } from '@/contexts/RegistrationContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegistrationProvider>
      {children}
    </RegistrationProvider>
  );
}
