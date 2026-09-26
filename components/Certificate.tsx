import PeakMark from "./PeakMark";
import Reveal from "./Reveal";

export default function Certificate() {
  return (
    <section id="certificate">
      <div className="wrap cert-wrap">
        <div className="cert-copy">
          <h2 className="section-title">A certificate that means the project happened</h2>
          <p>
            No internship is worth much without proof, so the certificate names the actual
            work, not just attendance.
          </p>
          <ul className="cert-list">
            <li>Your name, track, and duration</li>
            <li>The project title and a one-line description</li>
            <li>Your mentor&apos;s name and signature</li>
            <li>A unique certificate ID a recruiter can verify</li>
          </ul>
        </div>
        <Reveal className="cert-card">
          <div className="cert-mark">
            <PeakMark size={18} />
            <span className="label">ZENITHBE · CERTIFICATE OF COMPLETION</span>
          </div>
          <p className="cert-title">Data Internship, Build Track</p>
          <div className="cert-line">
            <span className="k">AWARDED TO</span>
            <span className="v">Student Name</span>
          </div>
          <div className="cert-line">
            <span className="k">PROJECT</span>
            <span className="v">Customer churn dashboard</span>
          </div>
          <div className="cert-line">
            <span className="k">DURATION</span>
            <span className="v">6 months · Mar–Aug 2027</span>
          </div>
          <div className="cert-foot">
            <span className="cert-id">ID ZB-2027-04821</span>
            <div className="cert-seal">
              <PeakMark size={20} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
