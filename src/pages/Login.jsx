import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../api/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "register") {
        await auth.register(email, password);
        await auth.login(email, password);
      } else {
        await auth.login(email, password);
      }
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-wrap login">
      <p className="section-label">{mode === "login" ? "Log in" : "Create account"}</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={submitting}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={submitting}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Please wait…" : mode === "login" ? "Log in" : "Register"}
        </button>
      </form>

      <button
        type="button"
        className="btn-ghost btn-sm login-switch"
        onClick={() => {
          setMode((m) => (m === "login" ? "register" : "login"));
          setError("");
        }}
        disabled={submitting}
      >
        {mode === "login" ? "Need an account? Register" : "Already have an account? Log in"}
      </button>
    </section>
  );
}

export default Login;
