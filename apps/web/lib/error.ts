import { AxiosError } from 'axios';

/**
 * Extracts a human-readable message from an API error. The NestJS exception
 * filter returns `{ message: string | string[] | { message } }`.
 */
export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | { message?: string | string[] | { message?: string | string[] } }
      | undefined;
    const raw = data?.message;
    const message = typeof raw === 'object' && raw !== null && 'message' in raw ? raw.message : raw;

    if (Array.isArray(message)) return message[0];
    if (typeof message === 'string') return message;
  }
  return fallback;
}
