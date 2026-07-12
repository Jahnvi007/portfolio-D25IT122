import { useState, useEffect } from "react";
import "./NavBar.css";

const SECTIONS = ["about", "skills", "projects", "footer"];
const LABELS = { about: "about", skills: "skills", projects: "projects", footer: "contact" };

function NavBar() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      let current = activeSection;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-prompt">
          janvi<span className="navbar-at">@</span>portfolio
          <span className="navbar-cursor">_</span>
        </span>
        <ul>
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
              >
                /{LABELS[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
