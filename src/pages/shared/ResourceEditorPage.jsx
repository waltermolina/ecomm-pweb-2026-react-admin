import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getRecord } from '../../utils/format.js';
import useApi from '../../hooks/useApi.js';
import ResourceForm from '../../components/molecules/ResourceForm.jsx';
import { ErrorState, LoadingState } from '../../components/common/RequestState.jsx';

export default function ResourceEditorPage({ resource }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const isEditing = Boolean(id);
  const request = useCallback(
    () => isEditing ? resource.get(id) : Promise.resolve(null),
    [id, isEditing, resource],
  );
  const { data, error, loading, reload } = useApi(request);
  const record = useMemo(() => getRecord(data) ?? {}, [data]);

  useEffect(() => {
    if (!isEditing) reload();
  }, [isEditing, reload]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setActionError('');
    try {
      if (isEditing) {
        await resource.update(id, payload);
      } else {
        await resource.create(payload);
      }
      navigate(`/${resource.path}`, { state: { message: `${resource.singular} guardado correctamente.` } });
    } catch (saveError) {
      setActionError(saveError.message);
      throw saveError;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`¿Eliminar este ${resource.singular}? Esta acción no se puede deshacer.`)) return;
    try {
      await resource.remove(id);
      navigate(`/${resource.path}`);
    } catch (deleteError) {
      setActionError(deleteError.message);
    }
  }

  return (
    <div className="page-stack">
      <div className="page-heading">
        <p className="eyebrow"><Link className="text-link" to={`/${resource.path}`}>{resource.label}</Link> / {isEditing ? 'Editar' : 'Nuevo'}</p>
        <h1>{isEditing ? `Editar ${resource.singular}` : `Nuevo ${resource.singular}`}</h1>
      </div>
      <section className="panel editor-panel">
        {loading && isEditing ? <LoadingState label={`Cargando ${resource.singular}…`} /> : error ? <ErrorState message={error} onRetry={reload} /> : (
          <>
            {actionError && <p className="form-error" role="alert">{actionError}</p>}
            <ResourceForm resource={resource} initialValues={record} onSubmit={handleSubmit} submitting={submitting} />
            <div className="secondary-actions">
              <Link className="button button-secondary" to={`/${resource.path}`}>Cancelar</Link>
              {isEditing && <button className="button button-danger" onClick={handleDelete}>Eliminar</button>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
