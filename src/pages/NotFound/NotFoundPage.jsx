import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="not-found">
      <p className="eyebrow">ERROR 404</p>
      <h1>Esta página no existe</h1>
      <p className="muted">La dirección puede haber cambiado o no estar disponible.</p>
      <Link className="button button-primary" to={isAuthenticated ? '/home' : '/login'}>Volver al inicio</Link>
    </main>
  );
}
