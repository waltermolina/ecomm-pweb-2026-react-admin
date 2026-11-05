import { useCallback, useState } from 'react';
import { getUser, updateUser } from '../../api/usersApi.js';
import { getRecord } from '../../utils/format.js';
import useApi from '../../hooks/useApi.js';
import useAuth from '../../hooks/useAuth.js';
import ResourceForm from '../../components/molecules/ResourceForm.jsx';
import { ErrorState, LoadingState } from '../../components/common/RequestState.jsx';

const profileResource = {
  label: 'Perfil',
  fields: [
    { name: 'name', label: 'Nombre', required: true },
    { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
  ],
};

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?._id;
  const request = useCallback(() => userId ? getUser(userId) : Promise.resolve(user), [user, userId]);
  const { data, error, loading, reload } = useApi(request);
  const [message, setMessage] = useState('');
  const [saveError, setSaveError] = useState('');
  const record = getRecord(data) ?? user ?? {};

  async function handleSubmit(values) {
    if (!userId) throw new Error('No se encontró el identificador de usuario.');
    try {
      await updateUser(userId, values);
      setMessage('Perfil actualizado correctamente.');
      setSaveError('');
      reload();
    } catch (requestError) {
      setSaveError(requestError.message);
      throw requestError;
    }
  }

  return (
    <div className="page-stack">
      <div className="page-heading"><p className="eyebrow">CUENTA</p><h1>Mi perfil</h1><p className="muted">Consulta y actualiza tus datos personales.</p></div>
      <section className="panel editor-panel">
        {loading ? <LoadingState label="Cargando perfil…" /> : error ? <ErrorState message={error} onRetry={reload} /> : (
          <>
            {message && <p className="form-success" role="status">{message}</p>}
            {saveError && <p className="form-error" role="alert">{saveError}</p>}
            <ResourceForm resource={profileResource} initialValues={record} onSubmit={handleSubmit} />
          </>
        )}
      </section>
    </div>
  );
}
