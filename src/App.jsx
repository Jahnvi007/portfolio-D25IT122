import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";
import Home from "./pages/Home"; // kept eager: it's the landing page, no point deferring it
import "./App.css";

// Route-based code splitting — each of these now ships as its own chunk,
// only downloaded when the user actually visits that route.
const Projects = lazy(() => import("./pages/Projects"));
const Login = lazy(() => import("./pages/Login"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<Spinner label="Loading page…" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
