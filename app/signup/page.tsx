"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string || "").trim();
    const email = (data.get("email") as string || "").trim();
    const password = (data.get("password") as string) || "";
    const confirm = (data.get("confirm") as string) || "";

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    const result = await signup(name, email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/#apply");
  }

  return (
    <>
      <Nav />
      <main>
        <div className="auth-shell">
          <div className="auth-card">
            <span className="demo-banner">
              Accounts are real now — stored on the Zenithbe server, not this browser.
            </span>
            <h1>Create your account</h1>
            <p className="auth-sub">Sign up to apply for a Zenithbe track.</p>

            {error ? <div className="auth-error">{error}</div> : null}

            <form onSubmit={handleSubmit} className="apply-form">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="field">
                  <label htmlFor="confirm">Confirm password</label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p className="auth-footer-link">
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
