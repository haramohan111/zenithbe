"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth, API_URL } from "@/components/AuthContext";

type Application = {
  id: number;
  userId: number;
  name: string;
  email: string;
  course: string;
  duration: string;
  portfolio: string;
  message: string;
  status: "submitted" | "accepted" | "rejected" | "certified";
  certificateId: string | null;
  createdAt: string;
  updatedAt: string;
};

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin";
  createdAt: string;
};

const STATUS_LABEL: Record<Application["status"], string> = {
  submitted: "Submitted",
  accepted: "Accepted",
  rejected: "Rejected",
  certified: "Certified",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AdminPage() {
  const { user, token, ready } = useAuth();
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  const authorized = ready && user?.role === "admin";

  const load = useCallback(async () => {
    if (!token) return;
    setError("");
    try {
      const [appsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      if (!appsRes.ok || !usersRes.ok) {
        throw new Error("Request failed");
      }
      const appsData = await appsRes.json();
      const usersData = await usersRes.json();
      setApplications(appsData.applications);
      setUsers(usersData.users);
    } catch {
      setError(`Couldn't reach the server. Is it running at ${API_URL}?`);
    }
  }, [token]);

  useEffect(() => {
    if (authorized) load();
  }, [authorized, load]);

  async function updateStatus(id: number, status: Application["status"]) {
    if (!token) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/applications/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setApplications((prev) =>
        prev ? prev.map((a) => (a.id === id ? data.application : a)) : prev
      );
    } catch {
      setError("Couldn't update that application. Try again.");
    } finally {
      setBusyId(null);
    }
  }

  if (!ready) {
    return (
      <>
        <Nav />
        <main>
          <div className="admin-shell wrap" />
        </main>
        <Footer />
      </>
    );
  }

  if (!authorized) {
    return (
      <>
        <Nav />
        <main>
          <div className="admin-shell wrap">
            <div className="auth-gate">
              <h3>Admin access required</h3>
              <p>
                {user
                  ? "Your account doesn't have admin access."
                  : "Log in with an admin account to view this page."}
              </p>
              {!user && (
                <div className="auth-gate-ctas">
                  <Link href="/login" className="btn btn-primary">
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <div className="admin-shell wrap">
          <div className="admin-header">
            <h1 className="section-title">Admin</h1>
            <p>Review applications and mark students certified.</p>
          </div>

          {error ? <div className="auth-error">{error}</div> : null}

          <h2 className="admin-subhead">Applications</h2>
          {!applications ? (
            <p className="admin-loading">Loading…</p>
          ) : applications.length === 0 ? (
            <p className="admin-empty">No applications yet.</p>
          ) : (
            <div className="admin-table-wrap scrollx">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Course</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((a) => (
                      <tr key={a.id}>
                        <td>
                          <div className="admin-cell-main">{a.name}</div>
                          <div className="admin-cell-sub">{a.email}</div>
                        </td>
                        <td>{a.course}</td>
                        <td>{a.duration}</td>
                        <td>
                          <span className={`status-badge status-${a.status}`}>
                            {STATUS_LABEL[a.status]}
                          </span>
                          {a.certificateId ? (
                            <div className="admin-cell-sub">{a.certificateId}</div>
                          ) : null}
                        </td>
                        <td>{formatDate(a.createdAt)}</td>
                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="admin-action-btn"
                              disabled={busyId === a.id || a.status === "accepted"}
                              onClick={() => updateStatus(a.id, "accepted")}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn"
                              disabled={busyId === a.id || a.status === "rejected"}
                              onClick={() => updateStatus(a.id, "rejected")}
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn admin-action-btn-accent"
                              disabled={busyId === a.id || a.status === "certified"}
                              onClick={() => updateStatus(a.id, "certified")}
                            >
                              Certify
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          <h2 className="admin-subhead">Accounts</h2>
          {!users ? (
            <p className="admin-loading">Loading…</p>
          ) : (
            <div className="admin-table-wrap scrollx">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`status-badge status-${u.role === "admin" ? "certified" : "submitted"}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>{formatDate(u.createdAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
