/**
 * API base URL. In development Vite proxies /api to the backend; in production set VITE_API_BASE_URL.
 */
export const API_BASE_URL =
  typeof import.meta.env.VITE_API_BASE_URL === 'string' && import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')
    : '/api';
