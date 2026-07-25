import "./ErrorMessage.css";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-title">Couldn't load repositories</p>
      <p className="error-detail">{message}</p>
      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
