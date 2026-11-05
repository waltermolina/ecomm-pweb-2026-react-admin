import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(location.state?.from?.pathname ?? '/home', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="login-card">
      <div className="login-brand"><span className="brand-mark">C</span><span>Commerce Admin</span></div>
      <p className="eyebrow">BIENVENIDO DE NUEVO</p>
      <h1>Iniciar sesión</h1>
      <p className="muted">Ingresa tus credenciales para acceder al panel.</p>
      <form className="resource-form" onSubmit={handleSubmit}>
        <label className="form-field" htmlFor="login-email">
          <span>Correo electrónico</span>
          <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="form-field" htmlFor="login-password">
          <span>Contraseña</span>
          <input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary button-wide" disabled={submitting}>
          {submitting ? 'Validando…' : 'Iniciar sesión'}
        </button>
      </form>
    </section>
  );
}
