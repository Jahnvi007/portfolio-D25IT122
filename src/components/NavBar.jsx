import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logout } from "../api/auth";
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
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Re-check the stored token whenever the route changes (e.g. right
  // after Login.jsx navigates to /tasks) so the nav reflects it immediately.
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/login");
  };

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
            {loggedIn ? (
              <button type="button" className="theme-toggle" onClick={handleLogout}>
                logout
              </button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                /login
              </NavLink>
            )}
          </li>
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
