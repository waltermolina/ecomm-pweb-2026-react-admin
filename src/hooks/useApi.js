import { useCallback, useEffect, useState } from 'react';

/** Coordina loading, error y datos para solicitudes de lectura. */
export default function useApi(request) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    request()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [request, requestNumber]);

  const reload = useCallback(() => setRequestNumber((number) => number + 1), []);
  return { data, error, loading, reload };
}
