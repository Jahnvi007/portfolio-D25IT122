import "./About.css";

function About() {
  return (
    <section id="about" className="section-wrap about">
      <p className="section-label">About Me</p>
      <div className="about-content">
        <div className="about-card">
          <p className="about-bio">
            Motivated and detail-oriented B.Tech Information Technology student at Charotar University of Science and 
            Technology (CHARUSAT), currently in my 3rd year. I have hands-on experience in Python, Java, Data 
            Structures, and Database Management, complemented by two industry internships in Python programming and 
            Machine Learning.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-grid-card">
            
            <h4>Education</h4>
            <p>B.Tech in Information Technology (3rd Year)</p>
          </div>
          <div className="about-grid-card">
            
            <h4>Experience</h4>
            <p>2 Industry Internships in Python & Machine Learning</p>
          </div>
          <div className="about-grid-card">
            <div className="about-grid-icon"></div>
            <h4>Location</h4>
            <p>CHARUSAT, Gujarat, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

