export default function SkillsList({
  data,
}: {
  data: Record<string, string[]>;
}) {
  return (
    <div className="skills-list">
      <h1 className="page-title">Skills</h1>
      {Object.entries(data).map(([group, items]) => (
        <section key={group} className="skills-group">
          <h2 className="skills-heading">{group}</h2>
          <div className="tech-stack">
            {items.map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
