const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

/** El login es público; las demás llamadas pasan por apiRequest. */
export async function loginRequest(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? result.error ?? 'No se pudo iniciar sesión.');
  }
  return result;
}
