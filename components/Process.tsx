import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Apply",
    body: "Tell us your track, your duration, and what you already know. No transcripts or cover letters required.",
  },
  {
    title: "Kickoff",
    body: "Meet your mentor in week one. Together you scope a project sized to your track's duration and your skill level.",
  },
  {
    title: "Build",
    body: "Weekly check-ins, real code review, and real deadlines. You write the code — your mentor unblocks you, not the other way around.",
  },
  {
    title: "Submit",
    body: "Hand in your finished project with a short writeup: what you built, what you'd change, what you'd do next.",
  },
  {
    title: "Certify",
    body: "Receive your Zenithbe certificate — signed, dated, and tied to a certificate ID that verifies what you actually built.",
    final: true,
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">How it works</h2>
          <p>Five steps, the same for every track — only the depth of the project changes.</p>
        </Reveal>
        <div className="process-list">
          {STEPS.map((step, i) => (
            <div className="process-item" key={step.title}>
              <div className={`process-num${step.final ? " final" : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="process-title">{step.title}</p>
                <p className="process-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
