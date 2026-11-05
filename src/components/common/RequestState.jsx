export function LoadingState({ label = 'Cargando…' }) {
  return <p className="state-message" role="status">{label}</p>;
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-message state-error" role="alert">
      <p>{message}</p>
      {onRetry && <button className="button button-secondary" onClick={onRetry}>Reintentar</button>}
    </div>
  );
}

export function EmptyState({ children }) {
  return <p className="state-message">{children}</p>;
}
