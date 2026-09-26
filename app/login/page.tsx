"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const email = (data.get("email") as string || "").trim();
    const password = (data.get("password") as string) || "";

    const result = await login(email, password);
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
            <h1>Log in</h1>
            <p className="auth-sub">Welcome back — log in to continue your application.</p>

            {error ? <div className="auth-error">{error}</div> : null}

            <form onSubmit={handleSubmit} className="apply-form">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
                {submitting ? "Logging in…" : "Log in"}
              </button>
            </form>

            <p className="auth-footer-link">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
