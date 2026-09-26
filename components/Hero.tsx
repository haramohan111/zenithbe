"use client";

import { useEffect, useRef } from "react";

type Line = { text: string; cls: "prompt" | "dim" | "ok" | "" };

const LINES: Line[] = [
  { text: "$ zenithbe course --list", cls: "prompt" },
  { text: "web-dev  backend  mobile  data  ai/ml  +4 more", cls: "dim" },
  { text: "", cls: "" },
  { text: "$ zenithbe apply --course=data --duration=6mo", cls: "prompt" },
  { text: "> matching mentor...", cls: "dim" },
  { text: "> project scoped: customer churn dashboard", cls: "dim" },
  { text: "> status: accepted \u2713", cls: "ok" },
];

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.innerHTML = LINES.map(
        (l) => `<div class="${l.cls}">${l.text || "&nbsp;"}</div>`
      ).join("");
      return;
    }

    el.innerHTML = "";
    let lineIdx = 0;
    let charIdx = 0;
    let current = document.createElement("div");
    el.appendChild(current);
    let timeoutId: ReturnType<typeof setTimeout>;

    function step() {
      if (lineIdx >= LINES.length) {
        current.innerHTML += '<span class="terminal-caret"></span>';
        return;
      }
      const line = LINES[lineIdx];
      current.className = line.cls;
      if (charIdx <= line.text.length) {
        current.textContent = line.text.slice(0, charIdx);
        charIdx++;
        timeoutId = setTimeout(step, line.text.length ? 16 : 0);
      } else {
        lineIdx++;
        charIdx = 0;
        current = document.createElement("div");
        el.appendChild(current);
        timeoutId = setTimeout(step, line.text ? 220 : 60);
      }
    }
    timeoutId = setTimeout(step, 350);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <span className="hero-badge">🏔 9 software courses · 3 durations</span>
          <h1 className="headline">
            Ship real software. Leave with <em>proof</em> you built it.
          </h1>
          <p className="lede">
            Zenithbe runs 3, 6, and 9-month internship tracks across web development, data,
            mobile, backend, cloud, security, design, and AI. You get a scoped project, a
            mentor, and a certificate you actually earned — not one you sat through.
          </p>
          <div className="hero-ctas">
            <a href="#apply" className="btn btn-primary">
              Apply for a track
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#programs" className="btn btn-ghost">
              Compare tracks
            </a>
          </div>
          <div className="hero-features">
            <span className="hero-feature">
              <CheckIcon />
              Mentor-led, not self-paced
            </span>
            <span className="hero-feature">
              <CheckIcon />
              Real project, not a course video
            </span>
            <span className="hero-feature">
              <CheckIcon />
              Verifiable certificate ID
            </span>
          </div>
        </div>
        <div className="terminal" aria-hidden="true">
          <div className="terminal-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="terminal-body" ref={termRef} />
        </div>
      </div>
      <svg
        className="hero-divider"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 80 L0 55 L120 30 L260 58 L400 20 L560 50 L700 15 L860 48 L1000 25 L1120 52 L1200 35 L1200 80 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
