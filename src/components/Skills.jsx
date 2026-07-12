import "./Skills.css";

function Skills({ skillList }) {
  return (
    <section id="skills" className="section-wrap alt">
      <div className="inner">
        <p className="section-label">Skills & Expertise</p>

        <div className="skills-container">
          <div className="skills-header-info">
            <h3 className="skills-title">Technical Proficiency</h3>
            <p className="skills-subtitle">
              Core technologies and academic foundations I work with:
            </p>
          </div>

          <div className="skills-grid">
            {skillList.map((skill) => (
              <div key={skill} className="skill-card">
                <span className="skill-dot"></span>
                <span className="skill-name">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;


