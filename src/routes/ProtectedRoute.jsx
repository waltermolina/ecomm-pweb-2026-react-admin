import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

/** Protected Routes keep private screens out of reach without a stored JWT. */
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
