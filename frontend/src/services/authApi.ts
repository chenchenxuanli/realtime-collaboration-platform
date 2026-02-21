import { API_BASE_URL } from '../config/api';

export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function register(
  request: RegisterRequest
): Promise<ApiResponse<UserResponse>> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: request.email.trim(),
      password: request.password,
      ...(request.displayName?.trim() && { displayName: request.displayName.trim() }),
    }),
  });

  const body = (await res.json().catch(() => ({}))) as ApiResponse<UserResponse>;

  if (!res.ok) {
    const message =
      body.message || body.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}
