import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  GraduationCap,
  Mail,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import profilePhoto from "./assets/images/moise-profile.png";
import "./App.css";

const projects = [
  {
    title: "OpenPath",
    category: "Education",
    description:
      "An educational platform focused on helping learners develop their English language skills and progress from beginner to advanced levels.",
  },
  {
    title: "Katembatic Shopping Hub",
    category: "E-Commerce",
    description:
      "A shopping platform designed to connect customers with products and simplify online commerce.",
  },
  {
    title: "Katembatic Solidarity Funds",
    category: "Finance",
    description:
      "A community-focused financial initiative built around saving, solidarity and responsible access to financial support.",
  },
  {
    title: "Katembatic Track",
    category: "Technology",
    description:
      "A student progress management platform designed to track learning, assignments, performance and development.",
  },
];

const skills = [
  "Teaching & Education",
  "English Language Training",
  "Business Management",
  "Entrepreneurship",
  "Web Development",
  "Data Entry & Administration",
  "Project Management",
  "Leadership",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-mark">MK</span>
          <span>MOISE KATEMBA</span>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <p className="eyebrow">TEACHER • ENTREPRENEUR • BUILDER</p>

            <h1>
              Building ideas
              <span> that create impact.</span>
            </h1>

            <p className="hero-description">
              I’m Moise Diangelo Katemba — an educator, entrepreneur and
              technology enthusiast passionate about creating practical
              solutions in education, business and community development.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="button primary">
                Explore My Work
                <ArrowRight size={18} />
              </a>

              <a href="#contact" className="button secondary">
                Contact Me
              </a>
            </div>

            <a href="#about" className="scroll-link">
              <ArrowDown size={17} />
              Discover more
            </a>
          </div>

          <div className="hero-card">
            <div className="hero-card-glow" />

            <img
              src={profilePhoto}
              alt="Moise Diangelo Katemba"
              className="profile-photo"
            />

            <p>Moise Diangelo</p>
            <span>Kinshasa, D.R. Congo</span>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <p className="eyebrow">ABOUT ME</p>
            <h2>More than a profession.</h2>
          </div>

          <div className="about-grid">
            <div className="about-intro">
              <h3>
                I believe education, technology and entrepreneurship can
                change lives.
              </h3>
            </div>

            <div className="about-text">
              <p>
                My journey has taken me through education, missionary work,
                business, administration and technology. Each experience has
                taught me how to work with people, solve problems and keep
                moving forward when resources are limited.
              </p>

              <p>
                Today, I combine those experiences to build projects that are
                useful to real people — especially in education, finance,
                commerce and community development.
              </p>

              <div className="about-stats">
                <div>
                  <strong>5+</strong>
                  <span>Areas of experience</span>
                </div>
                <div>
                  <strong>4+</strong>
                  <span>Active projects</span>
                </div>
                <div>
                  <strong>2</strong>
                  <span>Languages</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section dark-section">
          <div className="section-heading">
            <p className="eyebrow">WHAT I DO</p>
            <h2>Skills & capabilities</h2>
            <p>
              A combination of human skills, business knowledge and technical
              abilities.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                <CheckCircle2 size={20} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading project-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>Projects I'm building.</h2>
            </div>

            <p>
              Projects born from real problems and designed to create
              practical solutions.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-number">0{index + 1}</div>

                <span className="project-category">{project.category}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <a href="#contact">
                  Learn about the project
                  <ArrowRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="section-heading">
            <p className="eyebrow">MY JOURNEY</p>
            <h2>Experience & education</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <span className="timeline-label">PROFESSIONAL</span>
                <h3>Teacher & Educator</h3>
                <p>
                  Teaching English and supporting learners in developing their
                  communication skills and academic confidence.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon">
                <Code2 size={20} />
              </div>

              <div>
                <span className="timeline-label">TECHNOLOGY</span>
                <h3>Technology & Web Development</h3>
                <p>
                  Building web applications and digital solutions using modern
                  development technologies.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon">
                <GraduationCap size={20} />
              </div>

              <div>
                <span className="timeline-label">EDUCATION</span>
                <h3>Applied Business Management</h3>
                <p>
                  Developing knowledge in business management, entrepreneurship
                  and organizational leadership.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow">LET'S CONNECT</p>
            <h2>Have an idea or opportunity?</h2>
            <p>
              Whether you want to collaborate, discuss a project or simply
              connect, I'd be glad to hear from you.
            </p>
          </div>

          <a
            className="button primary"
            href="mailto:moisekatemba@katembaticfff.com"
          >
            <Mail size={18} />
            Get in touch
          </a>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>MOISE KATEMBA</strong>
          <span>Building with purpose.</span>
        </div>

        <p>© {new Date().getFullYear()} Moise Diangelo Katemba.</p>

        <a href="#home">
          Back to top
          <UserRound size={16} />
        </a>
      </footer>
    </div>
  );
}

export default App;
