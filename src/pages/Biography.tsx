export default function Biography() {
  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">MY STORY</p>
        <h1>
          The journey behind
          <span> the work.</span>
        </h1>
        <p className="page-lead">
          This is the story of my journey, the experiences that shaped me,
          the challenges I faced, and the lessons that continue to guide me.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="section-label"> MY JOURNEY</p>
          <h2>
            From learning
            <span> to building.</span>
          </h2>
        </div>

        <div className="story-content">
          <p>
            My journey has been shaped by education, service, teaching,
            entrepreneurship and technology.
          </p>

          <p>
            Every stage has contributed something different to the person
            and professional I am becoming.
          </p>

          <p>
            This space will become the complete story of my journey,
            including the experiences, challenges, people and moments
            that shaped my direction.
          </p>
        </div>
      </section>

      <section className="section dark-section">
        <div className="section-heading">
          <p className="section-label"> MILESTONES</p>
          <h2>
            Moments that
            <span> shaped me.</span>
          </h2>
        </div>

        <div className="timeline">
          <article className="timeline-item">
            <span className="timeline-label">EARLY YEARS</span>
            <h3>Learning to create with what I had</h3>
            <p>
              My early experiences taught me resilience, curiosity and
              the importance of learning independently.
            </p>
          </article>

          <article className="timeline-item">
            <span className="timeline-label">SERVICE</span>
            <h3>A chapter of service and leadership</h3>
            <p>
              Service became an important part of my development,
              teaching me responsibility, discipline and leadership.
            </p>
          </article>

          <article className="timeline-item">
            <span className="timeline-label">TODAY</span>
            <h3>Building, teaching and learning</h3>
            <p>
              Today I combine education, entrepreneurship and technology
              to build practical projects and help people develop.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
