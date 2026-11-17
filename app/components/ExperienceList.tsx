"use client";

import { useState } from "react";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  responsibilities: string[];
  techStack?: string[];
  summary?: string;
};

interface Props {
  data: ExperienceItem[];
}

export default function ExperienceList({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="experience-container">
      <h1 className="page-title">Experience</h1>

      {data.map((exp, index) => {
        const isOpen = openIndex === index;
        const isCurrent = exp.period.includes("Present");

        return (
          <div
            key={index}
            className={`experience-block ${isCurrent ? "current" : ""}`}
          >
            <button
              type="button"
              className="experience-header"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="meta">
                {exp.period}
                {exp.location && ` • ${exp.location}`}
              </span>
              <span className="headline">
                <span className="role">{exp.role}</span>
                <span className="company"> · {exp.company}</span>
              </span>
              <span className="arrow" aria-hidden="true">
                {isOpen ? "▾" : "▸"}
              </span>
            </button>

            <div className={`experience-content ${isOpen ? "open" : ""}`}>
              {exp.summary && <p className="summary">{exp.summary}</p>}

              <ul className="responsibilities">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>
                    <span className="comment">{"//"}</span> {item}
                  </li>
                ))}
              </ul>

              {exp.techStack && (
                <div className="tech-stack">
                  {exp.techStack.map((tech, i) => (
                    <span key={i} className="badge">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
