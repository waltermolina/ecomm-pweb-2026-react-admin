import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return <main className="auth-page"><Outlet /></main>;
}
