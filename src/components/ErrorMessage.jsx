export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger alert-custom d-flex align-items-center justify-content-between" role="alert">
      <div>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <strong>Error:</strong> {message}
      </div>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn btn-sm btn-outline-danger"
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Retry
        </button>
      )}
    </div>
  );
}