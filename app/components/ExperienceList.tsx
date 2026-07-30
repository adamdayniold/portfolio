"use client";

import { useState } from "react";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  responsibilities: string[];
  techStack?: string[];
};

interface Props {
  data: ExperienceItem[];
}

export default function ExperienceList({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="experience-container">
      {data.map((exp, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="experience-block">
            {/* Header (clickable like folder) */}
            <div
              className="experience-header"
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
            >
              <span className="arrow">
                {isOpen ? "▾" : "▸"}
              </span>

              <span className="role">{exp.role}</span>

              <span className="company">
                {" "} @ {exp.company}
              </span>
            </div>

            {/* Content */}
            <div
              className={`experience-content ${
                isOpen ? "open" : ""
              }`}
            >
              <div className="meta">
                {exp.period}
                {exp.location && ` • ${exp.location}`}
              </div>

              <ul className="responsibilities">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>
                    <span className="comment">//</span> {item}
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
