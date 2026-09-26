"use client";

/**
 * Talks to the Zenithbe server (see /server) for real accounts, password
 * hashing, and sessions. The session token is kept in localStorage and
 * sent as a Bearer token on every authenticated request.
 *
 * Note on the token: keeping a JWT in localStorage is simple and works
 * well for a small app like this, but it is readable by any script on
 * the page (XSS risk). If you later want to harden this, move to an
 * httpOnly cookie issued by the server instead — everything here talks
 * to auth only through `useAuth()`, so that change stays contained to
 * this file and the server's auth routes.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type Role = "student" | "admin";
export type User = { id: number; name: string; email: string; role: Role };

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  ready: boolean;
  signup: (name: string, email: string, password: string) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "zenithbe_token";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function parseJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setReady(true);
      return;
    }
    setToken(stored);
    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${stored}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("invalid session");
        const data = await parseJson(res);
        setUser(data?.user || null);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await parseJson(res);
        if (!res.ok) return { ok: false, error: data?.error || "Something went wrong." };
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
        return { ok: true };
      } catch {
        return {
          ok: false,
          error: "Couldn't reach the server. Is it running at " + API_URL + "?",
        };
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await parseJson(res);
        if (!res.ok) return { ok: false, error: data?.error || "Something went wrong." };
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
        return { ok: true };
      } catch {
        return {
          ok: false,
          error: "Couldn't reach the server. Is it running at " + API_URL + "?",
        };
      }
    },
    []
  );

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, ready, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
