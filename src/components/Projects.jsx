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

function Projects() {
  return (
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
  );
}

export default Projects;

