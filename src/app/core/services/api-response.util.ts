import { HttpErrorResponse } from '@angular/common/http';

export function getApiMessage(response: unknown, fallback: string): string {
  if (response && typeof response === 'object') {
    const value = response as Record<string, unknown>;
    return String(value['message'] ?? value['Message'] ?? value['error'] ?? fallback);
  }
  return fallback;
}

export function getHttpErrorMessage(error: unknown, fallback = 'خطا در ارتباط با سرور'): string {
  if (error instanceof HttpErrorResponse) {
    return getApiMessage(error.error, error.message || fallback);
  }
  return getApiMessage(error, fallback);
}
