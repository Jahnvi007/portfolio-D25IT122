import "./Spinner.css";

function Spinner({ label = "Loading…" }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <span className="spinner" />
      <p className="spinner-label">{label}</p>
    </div>
  );
}

export default Spinner;
