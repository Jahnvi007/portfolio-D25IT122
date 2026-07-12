import { useState } from "react";
import "./Footer.css";

function Footer() {
  const emailAddress = "d25it122@charusat.edu.in";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <h2 className="footer-title"></h2>
        <p className="footer-subtitle"> Contact </p>
       

        <div className="email-copy-widget" onClick={handleCopy}>
          <span className="email-text">{emailAddress}</span>
          <button className={`copy-button ${copied ? "copied" : ""}`}>
            {copied ? "✓ Copied!" : " Copy Address"}
          </button>
        </div>

        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>
          <a href={`mailto:${emailAddress}`} className="social-link">
            Direct Email
          </a>
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Janvi. Built with React &amp; Vite.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

