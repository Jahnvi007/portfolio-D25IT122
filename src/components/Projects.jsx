import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import "./Projects.css";

const projectList = [
  {
    id: 1,
    title: "AcademiQ",
    tags: ["RAG", "FastAPI", "ChromaDB"],
    description:
      "A locally hosted AI-powered academic assistant for universities, using a RAG architecture with subject + unit isolation enforced at the retrieval level.",
  },
  {
    id: 2,
    title: "OCR Text Extraction",
    tags: ["Python", "CustomTkinter", "Tesseract"],
    description:
      "A desktop OCR application that extracts text from images, PDFs, and Word documents, with built-in accuracy scoring against ground truth using Levenshtein distance.",
  },
  {
    id: 3,
    title: "Student Portfolio",
    tags: ["React", "Vite"],
    description:
      "This site — a component-driven portfolio built with reusable, prop-driven React components and a console-inspired UI.",
  },
];

// TODO: replace with your own GitHub username before submitting
const GITHUB_USERNAME = "Jahnvi007";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  // Bumping retryCount re-runs the effect below, which re-triggers the fetch
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retryCount]);

  const handleRetry = () => setRetryCount((count) => count + 1);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section id="projects" className="section-wrap projects">
        <p className="section-label">Featured Projects</p>
        <div className="project-cards">
          {projectList.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="github-repos" className="section-wrap projects">
        <p className="section-label">GitHub Repositories</p>

        {!loading && !error && (
          <input
            type="text"
            className="repo-search"
            placeholder="Filter repositories by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {loading && <Spinner label="Fetching repositories…" />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && (
          <div className="repo-list">
            {filteredRepos.length === 0 && (
              <p className="repo-empty">No repositories match "{search}".</p>
            )}
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card"
              >
                <div className="repo-card-top">
                  <h3 className="repo-name">{repo.name}</h3>
                  <span className="repo-stars">★ {repo.stargazers_count}</span>
                </div>
                {repo.description && (
                  <p className="repo-desc">{repo.description}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Projects;
