"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRegister } from "./hooks";
import { registerSchema, type RegisterFormValues } from "./schemas";
import { getApiErrorMessage } from "@/lib/error";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
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
    <Card sx={{ width: "100%", maxWidth: 440 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create your account
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Start tracking your family&apos;s expenses.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            {registerMutation.isError && (
              <Alert severity="error">
                {getApiErrorMessage(registerMutation.error, "Registration failed")}
              </Alert>
            )}

            <TextField
              label="Name"
              fullWidth
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              autoComplete="new-password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account…" : "Create account"}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{" "}
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
