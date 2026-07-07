'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginRequest, registerRequest } from './api';
import { useAuth } from './AuthProvider';
import type { LoginPayload, RegisterPayload } from './types';

export function useLogin() {
  const { setToken } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { accessToken } = await loginRequest(payload);
      await setToken(accessToken);
    },
    onSuccess: () => {
      router.replace('/dashboard');
    },
  });
}

export function useRegister() {
  const { setToken } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      // Register returns a token directly — auto-login the user.
      const { accessToken } = await registerRequest(payload);
      await setToken(accessToken);
    },
    onSuccess: () => {
      router.replace('/dashboard');
    },
  });
}
