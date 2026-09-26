"use client";

import Link from "next/link";
import PeakMark from "./PeakMark";
import { useAuth } from "./AuthContext";

export default function Nav() {
  const { user, ready, logout } = useAuth();

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand">
          <PeakMark />
          Zenithbe
        </a>
        <nav className="nav-links">
          <a href="#programs">Programs</a>
          <a href="#courses">Courses</a>
          <a href="#process">How it works</a>
          <a href="#certificate">Certificate</a>
          {ready && user ? (
            <>
              {user.role === "admin" ? <Link href="/admin">Admin</Link> : null}
              <span className="nav-user">Hi, {user.name.split(" ")[0] || user.name}</span>
              <button type="button" className="nav-link-btn" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <Link href="/login">Log in</Link>
          )}
          <a href="#apply" className="nav-cta">
            Apply
          </a>
        </nav>
      </div>
    </header>
  );
}
