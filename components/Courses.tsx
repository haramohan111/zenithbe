import Reveal from "./Reveal";

const COURSES = [
  {
    cat: "01 · SOFTWARE",
    title: "Web Development",
    desc: "Frontend, backend, and full-stack builds — from a single page to a complete product.",
    icon: (
      <path
        d="M8 6L2 12L8 18M16 6L22 12L16 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    cat: "02 · SOFTWARE",
    title: "Backend Engineering",
    desc: "APIs, databases, authentication, and system architecture that holds up under real use.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="17" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    cat: "03 · SOFTWARE",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps for iOS and Android, built and shipped to a store-ready state.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 18H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    cat: "04 · DATA",
    title: "Data Science",
    desc: "Analysis, modeling, and dashboards that turn raw data into a decision someone can act on.",
    icon: (
      <path
        d="M4 20V10M11 20V4M18 20V13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    cat: "05 · DATA",
    title: "AI & Machine Learning",
    desc: "Applied ML projects — training, evaluating, and deploying a model that does something useful.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2V5M12 19V22M22 12H19M5 12H2M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07M19.07 19.07L16.95 16.95M7.05 7.05L4.93 4.93"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    cat: "06 · INFRASTRUCTURE",
    title: "DevOps & Cloud",
    desc: "CI/CD pipelines, containers, and cloud deployment for software that ships reliably.",
    icon: (
      <path
        d="M7 18H17.5C19.4 18 21 16.4 21 14.5C21 12.6 19.4 11 17.5 11H17C17 8.2 14.8 6 12 6C9.5 6 7.4 7.8 7 10.2C4.8 10.5 3 12.4 3 14.6C3 16.5 4.6 18 7 18Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    cat: "07 · SECURITY",
    title: "Cybersecurity",
    desc: "Threat modeling, secure coding practice, and hands-on work finding and fixing vulnerabilities.",
    icon: (
      <path
        d="M12 2L4 5V11C4 16 7.4 20.4 12 22C16.6 20.4 20 16 20 11V5L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    cat: "08 · DESIGN",
    title: "UI/UX Design",
    desc: "Research, prototyping, and interface design for a product people can actually use.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3C14 6 14 18 12 21M3 12H21" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
  },
  {
    cat: "09 · QUALITY",
    title: "QA & Test Automation",
    desc: "Manual testing discipline plus automated test suites built for a real codebase.",
    icon: (
      <>
        <path
          d="M9 12L11 14L15 9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
  },
];

export default function Courses() {
  return (
    <section id="courses">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">Every course runs on all three tracks</h2>
          <p>
            Choose a course by what you want to build, then choose 3, 6, or 9 months by how
            far you want to take it.
          </p>
        </Reveal>
        <Reveal className="courses-grid">
          {COURSES.map((course) => (
            <div className="course-item" key={course.title}>
              <div className="course-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {course.icon}
                </svg>
              </div>
              <span className="course-cat">{course.cat}</span>
              <h3>{course.title}</h3>
              <p>{course.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
