'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/common/navBar/NavBar';
import OrderDetails from '@/components/specific/booking/order/OrderDetails';
import CheckoutSections from '@/components/specific/booking/order/CheckoutSections';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else {
        setIsChecking(false);
      }
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="w-screen h-screen flex flex-row p-4">
        <div className="w-2/3">
          <CheckoutSections />
        </div>
        <div className="w-1/3">
          <OrderDetails />
        </div>
      </div>
    </div>
  );
}
