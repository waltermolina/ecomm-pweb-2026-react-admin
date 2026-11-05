import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCollection } from '../../api/apiClient.js';
import { getRecordId } from '../../utils/format.js';
import useApi from '../../hooks/useApi.js';
import ResourceTable from '../../components/organisms/ResourceTable.jsx';
import { EmptyState, ErrorState, LoadingState } from '../../components/common/RequestState.jsx';

export default function ResourceListPage({ resource }) {
  const request = useCallback(() => resource.list(), [resource]);
  const { data, error, loading, reload } = useApi(request);
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState(location.state?.message ?? '');
  const [actionError, setActionError] = useState('');
  const items = getCollection(data);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value ?? '').toLocaleLowerCase().includes(normalizedQuery),
      ),
    );
  }, [items, query]);

  useEffect(() => {
    if (location.state?.message) setMessage(location.state.message);
  }, [location.state]);

  async function handleDelete(item) {
    if (!window.confirm(`¿Eliminar este ${resource.singular}? Esta acción no se puede deshacer.`)) return;
    try {
      await resource.remove(getRecordId(item));
      setMessage(`${resource.singular[0].toUpperCase()}${resource.singular.slice(1)} eliminado correctamente.`);
      setActionError('');
      reload();
    } catch (deleteError) {
      setActionError(deleteError.message);
    }
  }

  return (
    <div className="page-stack">
      <div className="page-heading page-heading-row">
        <div><p className="eyebrow">GESTIÓN</p><h1>{resource.label}</h1><p className="muted">Administra los {resource.label.toLocaleLowerCase()} de tu tienda.</p></div>
        <Link className="button button-primary" to={`/${resource.path}/new`}>＋ Nuevo {resource.singular}</Link>
      </div>
      <section className="panel">
        <div className="list-toolbar">
          <label className="search-field"><span className="sr-only">Buscar {resource.label.toLowerCase()}</span><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Buscar ${resource.label.toLowerCase()}…`} /></label>
          <span className="muted">{filteredItems.length} resultados</span>
        </div>
        {message && <p className="form-success" role="status">{message}</p>}
        {actionError && <p className="form-error" role="alert">{actionError}</p>}
        {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : filteredItems.length ? (
          <ResourceTable resource={resource} items={filteredItems} onDelete={handleDelete} />
        ) : <EmptyState>No se encontraron {resource.label.toLocaleLowerCase()}.</EmptyState>}
      </section>
    </div>
  );
}
