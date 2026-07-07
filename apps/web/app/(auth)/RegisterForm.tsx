'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { NoFillTextField } from '@/components/ui/NoFillTextField';
import { useRegister } from '@/features/auth/hooks';
import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas';
import { getApiErrorMessage } from '@/lib/error';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const registerMutation = useRegister();

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 440 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create your account
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Start tracking your family&apos;s expenses.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Stack spacing={2.5}>
            {registerMutation.isError && (
              <Alert severity="error">
                {getApiErrorMessage(registerMutation.error, 'Registration failed')}
              </Alert>
            )}

            <NoFillTextField
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
            />
            <NoFillTextField
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <NoFillTextField
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />
            <NoFillTextField
              label="Confirm Password"
              type="password"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Creating account…' : 'Create account'}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{' '}
              <MuiLink component={Link} href="/login">
                Sign in
              </MuiLink>
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
