import { NavLink } from 'react-router-dom';
import { getUserName } from '../../utils/format.js';

const navigationItems = [
  { to: '/home', label: 'Inicio', icon: '⌂' },
  { to: '/products', label: 'Productos', icon: '▦' },
  { to: '/categories', label: 'Categorías', icon: '◇' },
  { to: '/users', label: 'Usuarios', icon: '♙' },
  { to: '/profile', label: 'Perfil', icon: '◎' },
];

export default function Sidebar({ open, user, onNavigate, onLogout }) {
  const name = getUserName(user);

  return (
    <aside className={`sidebar${open ? ' sidebar-open' : ''}`}>
      <NavLink className="brand" to="/home" onClick={onNavigate}>
        <span className="brand-mark">C</span>
        <span>Commerce<span className="brand-light">Admin</span></span>
      </NavLink>
      <p className="nav-caption">MENÚ PRINCIPAL</p>
      <nav className="side-nav" aria-label="Navegación principal">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-profile">
          <span className="avatar">{name.charAt(0).toUpperCase()}</span>
          <span className="sidebar-user-copy">
            <strong>{name}</strong>
            <small>{user?.role ?? 'Cuenta'}</small>
          </span>
        </div>
        <button className="logout-button" onClick={onLogout}>↪ <span>Cerrar sesión</span></button>
      </div>
    </aside>
  );
}
