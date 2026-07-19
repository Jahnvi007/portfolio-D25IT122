import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="page-offset not-found">
      <div className="not-found-terminal">
        <p className="not-found-code">404</p>
        <p className="not-found-line">
          <span className="accent">$</span> cd {window.location.pathname}
        </p>
        <p className="not-found-line">bash: route not found</p>
        <Link to="/" className="btn-primary">
          cd ~/home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
