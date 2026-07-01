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
import { useLogin } from "./hooks";
import { loginSchema, type LoginFormValues } from "./schemas";
import { getApiErrorMessage } from "@/lib/error";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 440 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome back
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Sign in to your expense tracker.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            {loginMutation.isError && (
              <Alert severity="error">
                {getApiErrorMessage(loginMutation.error, "Login failed")}
              </Alert>
            )}

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
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in…" : "Sign in"}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Don&apos;t have an account?{" "}
              <MuiLink component={Link} href="/register">
                Create one
              </MuiLink>
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
