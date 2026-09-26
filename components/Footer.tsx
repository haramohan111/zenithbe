import PeakMark from "./PeakMark";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <a href="#top" className="brand">
            <PeakMark size={20} />
            Zenithbe
          </a>
          <div className="footer-links">
            <a href="mailto:apply@zenithbe.com">apply@zenithbe.com</a>
            <a href="#programs">Programs</a>
            <a href="#courses">Courses</a>
            <a href="#apply">Apply</a>
          </div>
        </div>
        <p className="footer-copy">
          © 2026 Zenithbe. Internship tracks across web development, data, mobile, backend,
          cloud, security, design, and AI.
        </p>
        <p className="footer-credit">
          Designed &amp; developed by{" "}
          <a href="https://netvly.com" target="_blank" rel="noopener noreferrer">
            Netvly
          </a>
        </p>
      </div>
    </footer>
  );
}
