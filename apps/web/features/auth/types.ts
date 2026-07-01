export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
