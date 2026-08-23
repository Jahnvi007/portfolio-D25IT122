import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
  { path: "/tasks", label: "tasks" },
  { path: "/contact", label: "contact" },
];

function NavBar() {
  // useState #1: toggles UI visibility/appearance — dark vs light theme
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-prompt">
          janvi<span className="navbar-at">@</span>portfolio
          <span className="navbar-cursor">_</span>
        </span>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                end={route.path === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                /{route.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle dark and light mode"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
