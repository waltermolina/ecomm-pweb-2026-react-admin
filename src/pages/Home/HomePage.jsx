import { useCallback } from 'react';
import { getDashboardStats } from '../../api/dashboardApi.js';
import { getRecord } from '../../utils/format.js';
import useApi from '../../hooks/useApi.js';
import useAuth from '../../hooks/useAuth.js';
import StatCard from '../../components/organisms/StatCard.jsx';
import { ErrorState, LoadingState } from '../../components/common/RequestState.jsx';

export default function HomePage() {
  const request = useCallback(getDashboardStats, []);
  const { data, error, loading, reload } = useApi(request);
  const { user } = useAuth();
  const stats = getRecord(data) ?? {};
  const cards = [
    { label: 'Productos', value: stats.totalProducts ?? stats.productsCount ?? stats.products ?? stats.productCount, icon: '▦', tone: 'tone-blue' },
    { label: 'Categorías', value: stats.totalCategories ?? stats.categoriesCount ?? stats.categories ?? stats.categoryCount, icon: '◇', tone: 'tone-violet' },
    { label: 'Usuarios', value: stats.totalUsers ?? stats.usersCount ?? stats.users ?? stats.userCount, icon: '♙', tone: 'tone-green' },
  ];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><p className="eyebrow">RESUMEN</p><h1>¡Hola {user?.name ?? user?.fullName ?? user?.email ?? 'Usuario'}!</h1><p className="muted">Aquí tienes el estado actual de tu tienda.</p></div>
      </div>
      {loading ? <LoadingState label="Cargando estadísticas…" /> : error ? <ErrorState message={error} onRetry={reload} /> : (
        <section className="stats-grid" aria-label="Estadísticas de la tienda">
          {cards.map((card) => <StatCard key={card.label} {...card} />)}
        </section>
      )}
    </div>
  );
}
