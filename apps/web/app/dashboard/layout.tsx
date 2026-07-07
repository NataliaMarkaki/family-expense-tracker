import { ProtectedRoute } from '@/features/auth/RouteGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
