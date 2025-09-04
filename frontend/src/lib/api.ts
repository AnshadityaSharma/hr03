export const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

export async function api<T = any>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE_URL) throw new Error('VITE_BACKEND_URL is not set');
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...(init?.headers || {})
    }
  });
  const text = await res.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) throw new Error(data?.error || `Request failed: ${res.status}`);
  return data as T;
}

