import { api } from "@/lib/axios";
import type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "./types";

export async function registerRequest(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function loginRequest(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function meRequest(): Promise<AuthUser> {
  const { data } = await api.get<AuthUser>("/auth/me");
  return data;
}
