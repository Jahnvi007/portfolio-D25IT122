import { Link } from "react-router-dom";
import "./Header.css";

function Header({ name }) {
  return (
    <header className="hero">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-inner animate-float">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-close"></span>
            <span className="dot dot-minimize"></span>
            <span className="dot dot-maximize"></span>
          </div>
          <div className="terminal-title">janvi_profile.sh</div>
        </div>
        <div className="hero-window-content">
          <p className="hero-pretitle">Hello, World! I am</p>
          <h1 className="hero-name">
            {name}
          </h1>
          <p className="hero-tagline">B.Tech Student in Information Technology</p>
          <div className="hero-actions">
            <Link to="/projects" className="btn-primary">View Projects</Link>
            <Link to="/contact" className="btn-secondary">Let's Connect</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

