'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/features/auth/AuthProvider';

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    queryClient.clear();
    router.replace('/login');
  };

  return (
    <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
      Sign Out
    </Button>
  );
}
