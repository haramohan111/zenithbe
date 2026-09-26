"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth, API_URL } from "./AuthContext";

const COURSE_OPTIONS = [
  "Web Development",
  "Backend Engineering",
  "Mobile App Development",
  "Data Science",
  "AI & Machine Learning",
  "DevOps & Cloud",
  "Cybersecurity",
  "UI/UX Design",
  "QA & Test Automation",
  "Not sure yet",
];

const DURATIONS = [
  { value: "3 months", label: "3 mo", sub: "Sprint" },
  { value: "6 months", label: "6 mo", sub: "Build" },
  { value: "9 months", label: "9 mo", sub: "Depth" },
];

export default function Apply() {
  const { user, token, ready, logout } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setShowConfirm(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    const course = (data.get("fcourse") as string) || "";
    const duration = (data.get("fduration") as string) || "";
    const portfolio = (data.get("fportfolio") as string || "").trim();
    const message = (data.get("fmessage") as string || "").trim();

    if (!course || !duration) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ course, duration, portfolio, message }),
      });
      const responseData = await res.json().catch(() => null);

      if (!res.ok) {
        setError(responseData?.error || "Something went wrong submitting your application.");
        return;
      }

      setConfirmText(
        `Your application for the ${duration} ${course} track has been received. We'll email ${user?.email} within five business days.`
      );
      setShowConfirm(true);
      form.reset();
    } catch {
      setError(`Couldn't reach the server. Is it running at ${API_URL}?`);
    } finally {
      setSubmitting(false);
    }
  }

  // Avoid a flash of the gated state before we've checked for a stored session.
  if (!ready) {
    return (
      <section id="apply">
        <div className="wrap apply-wrap">
          <div className="apply-copy">
            <h2 className="section-title">Apply for a track</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply">
      <div className="wrap apply-wrap">
        <div className="apply-copy">
          <h2 className="section-title">Apply for a track</h2>
          <p>
            {user
              ? "Submit your application and it's saved to your account right away — no email required."
              : "Create a free account first — it's how you'll track your application and, later, find your certificate."}
          </p>
          <div className="apply-facts">
            <div className="apply-fact">
              <span className="k">COURSES OPEN</span>
              <span className="v">9 software courses — see all above</span>
            </div>
            <div className="apply-fact">
              <span className="k">NEXT COHORT</span>
              <span className="v">Rolling admissions, starts monthly</span>
            </div>
            <div className="apply-fact">
              <span className="k">COST TO APPLY</span>
              <span className="v">Free</span>
            </div>
          </div>
        </div>

        {!user ? (
          <div className="auth-gate">
            <h3>Create an account to apply</h3>
            <p>
              Applications are tied to your account so you can come back and check status,
              and so your certificate has somewhere to land once you finish. Takes under a
              minute.
            </p>
            <div className="auth-gate-ctas">
              <Link href="/signup" className="btn btn-primary">
                Create account
              </Link>
              <Link href="/login" className="btn btn-ghost">
                Log in
              </Link>
            </div>
          </div>
        ) : (
          <form className="apply-form" onSubmit={handleSubmit}>
            <div className="apply-session-note">
              Applying as {user.email}
              <button type="button" className="nav-link-btn" onClick={logout}>
                Log out
              </button>
            </div>

            {error ? <div className="auth-error">{error}</div> : null}

            <div className="field">
              <label htmlFor="fcourse">Course</label>
              <select id="fcourse" name="fcourse" required defaultValue="">
                <option value="" disabled>
                  Select a course
                </option>
                {COURSE_OPTIONS.map((opt) => (
                  <option value={opt} key={opt}>
                    {opt === "Not sure yet" ? "Not sure yet — help me choose" : opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Duration</label>
              <div className="duration-picker">
                {DURATIONS.map((d, i) => (
                  <label className="duration-opt" key={d.value}>
                    <input type="radio" name="fduration" value={d.value} required={i === 0} />
                    <strong>{d.label}</strong>
                    <span>{d.sub}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="fportfolio">GitHub or portfolio link (optional)</label>
              <input
                id="fportfolio"
                name="fportfolio"
                type="url"
                placeholder="https://github.com/yourname"
              />
            </div>

            <div className="field">
              <label htmlFor="fmessage">What do you want to build?</label>
              <textarea
                id="fmessage"
                name="fmessage"
                placeholder="A couple of sentences is plenty."
              />
            </div>

            <div className="submit-row">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Sending…" : "Send application"}
              </button>
              <p className="form-note">Saved to your account the moment you submit.</p>
            </div>

            <div className={`confirm-card${showConfirm ? " show" : ""}`}>
              <h3>Your application is in</h3>
              <p>{confirmText}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
