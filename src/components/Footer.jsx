import "./Footer.css";

const emailAddress = "d25it122@charusat.edu.in";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
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

