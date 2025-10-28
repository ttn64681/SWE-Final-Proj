'use client';

import RouteProtection from '@/components/common/auth/RouteProtection';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <RouteProtection requiredRole="user">{children}</RouteProtection>;
}
