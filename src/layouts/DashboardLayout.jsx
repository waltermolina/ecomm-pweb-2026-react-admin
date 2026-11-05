import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar.jsx';
import useAuth from '../hooks/useAuth.js';

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const displayName = user?.name ?? user?.fullName ?? user?.email ?? 'Usuario';

  return (
    <div className="app-shell">
      {menuOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Cerrar menú de navegación"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <Sidebar
        open={menuOpen}
        user={user}
        onNavigate={() => setMenuOpen(false)}
        onLogout={logout}
      />
      <div className="workspace">
        <header className="topbar">
          <button
            className="menu-toggle"
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <span className="topbar-title">Panel administrativo</span>
          <div className="topbar-user">
            <span className="avatar">{displayName.charAt(0).toUpperCase()}</span>
            <span>{displayName}</span>
          </div>
        </header>
        <main className="main-content"><Outlet /></main>
      </div>
    </div>
  );
}
