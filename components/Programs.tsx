"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const TRACKS = [
  {
    months: 3,
    width: "27%",
    name: "Sprint track",
    desc: "One focused feature or a small standalone app — a booking widget, a data-cleaning script, a REST API for a single resource. Built for a term break or a first internship where you want a fast, complete result.",
    tag: "Best for a first internship",
  },
  {
    months: 6,
    width: "55%",
    name: "Build track",
    desc: "A full product slice, end to end — frontend, backend, and a real data layer, or a complete analytics pipeline from raw data to dashboard. Our most common track, and enough time to fix your own mistakes.",
    tag: "Most popular",
  },
  {
    months: 9,
    width: "82%",
    name: "Depth track",
    desc: "A production-scale build with a second iteration cycle: ship a first version, get real feedback, then rebuild the weak parts. For final-year students who want a portfolio centerpiece, not a class project.",
    tag: "Best for a portfolio centerpiece",
  },
];

export default function Programs() {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setFilled(true), 120);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="programs">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">Three tracks, three depths of project</h2>
          <p>
            Pick a duration by how much project you want to finish, not just how much time
            you have free. Every track ends the same way: a working project, submitted and
            reviewed.
          </p>
        </Reveal>
        <div className="tracks scrollx">
          {TRACKS.map((track) => (
            <div className="track-row" key={track.months}>
              <div className="track-dur">
                {track.months}
                <small>MONTHS</small>
              </div>
              <div className="track-main">
                <div className="track-bar-track">
                  <div
                    className="track-bar-fill"
                    style={{ width: filled ? track.width : "0%" }}
                  />
                </div>
                <p className="track-name">{track.name}</p>
                <p className="track-desc">{track.desc}</p>
                <span className="track-tag">{track.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
