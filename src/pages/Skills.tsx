const skills = [
  {
    number: "01",
    title: "Teaching & Education",
    description:
      "English teaching, tutoring, curriculum support and learner development.",
  },
  {
    number: "02",
    title: "Business & Entrepreneurship",
    description:
      "Business development, project planning, budgeting and entrepreneurial thinking.",
  },
  {
    number: "03",
    title: "Leadership",
    description:
      "Team coordination, communication, organization and responsibility.",
  },
  {
    number: "04",
    title: "Web Development",
    description:
      "Building modern interfaces and web applications using technologies such as React, TypeScript and JavaScript.",
  },
  {
    number: "05",
    title: "Technology",
    description:
      "Experience with Microsoft tools, Firebase, GitHub, databases and digital platforms.",
  },
  {
    number: "06",
    title: "Automation",
    description:
      "Exploring Python automation and practical technology solutions.",
  },
  {
    number: "07",
    title: "Communication",
    description:
      "Professional communication in English and French with a strong focus on teaching and collaboration.",
  },
  {
    number: "08",
    title: "Project Development",
    description:
      "Turning ideas into structured projects, products and practical systems.",
  },
];

export default function Skills() {
  return (
    <main className="page">

      <section className="page-hero">

        <p className="eyebrow">SKILLS & EXPERTISE</p>

        <h1>
          What I can
          <span> bring to the table.</span>
        </h1>

        <p className="page-lead">
          A combination of education, business, technology,
          communication and leadership skills developed through
          study and practical experience.
        </p>

      </section>

      <section className="section">

        <div className="section-heading">

          <p className="section-label">
            01 — EXPERTISE
          </p>

          <h2>
            Skills built through
            <span> real experience.</span>
          </h2>

        </div>

        <div className="skills-grid">

          {skills.map((skill) => (
            <article className="skill-card" key={skill.number}>

              <span className="project-number">
                {skill.number}
              </span>

              <div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}
