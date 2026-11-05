import { createContext, useCallback, useMemo, useState } from 'react';
import { loginRequest } from '../api/authApi.js';
import { TOKEN_STORAGE_KEY } from '../api/apiClient.js';

const USER_STORAGE_KEY = 'ecomm-admin-user';
export const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) ?? 'null');
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

/**
 * Context comparte una sola sesión entre componentes sin una librería global.
 * El JWT se guarda para sobrevivir recargas; el servidor sigue validándolo.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));

  const login = useCallback(async (credentials) => {
    const result = await loginRequest(credentials);
    if (!result.token) throw new Error('La respuesta de autenticación no contiene un token.');

    const authenticatedUser = result.user ?? {};
    localStorage.setItem(TOKEN_STORAGE_KEY, result.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    setToken(result.token);
    setUser(authenticatedUser);
    return authenticatedUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), login, logout }),
    [user, token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
