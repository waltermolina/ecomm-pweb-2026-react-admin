const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';
const TOKEN_STORAGE_KEY = 'ecomm-admin-token';

/**
 * Centralizar fetch permite aplicar el JWT y los errores de forma consistente.
 * Así cada servicio describe el recurso, sin repetir detalles de transporte.
 */
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', 'Bearer ' + token);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const responseText = await response.text();
  let responseBody;

  try {
    responseBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseBody = responseText;
  }

  if (!response.ok) {
    const message =
      typeof responseBody === 'object' && responseBody
        ? responseBody.message ?? responseBody.error
        : responseBody;
    throw new Error(message || `La solicitud falló (${response.status}).`);
  }

  return responseBody;
}

export function getCollection(response) {
  if (Array.isArray(response)) return response;
  return response?.data ?? response?.items ?? [];
}

export { TOKEN_STORAGE_KEY };
