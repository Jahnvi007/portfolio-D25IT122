import "./ErrorMessage.css";

function ErrorMessage({ message, onRetry, title = "Couldn't load repositories" }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-title">{title}</p>
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
