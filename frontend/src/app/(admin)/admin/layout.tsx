'use client';

import RouteProtection from '@/components/common/auth/RouteProtection';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <RouteProtection requiredRole="admin">{children}</RouteProtection>;
}
