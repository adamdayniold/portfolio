export type ProjectItem = {
  name: string;
  description: string;
  highlights?: string[];
  tech?: string[];
  repo?: string;
};

export default function ProjectList({ data }: { data: ProjectItem[] }) {
  return (
    <div className="project-list">
      <h1 className="page-title">Projects</h1>
      {data.map((project) => (
        <article key={project.name} className="project-card">
          <h2 className="project-name">{project.name}</h2>
          <p className="project-description">{project.description}</p>

          {project.highlights && (
            <ul className="project-highlights">
              {project.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {project.tech && (
            <div className="tech-stack">
              {project.tech.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.repo && (
            <a
              className="project-link"
              href={`https://${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View repo ↗
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
