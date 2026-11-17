export type EducationItem = {
  qualification: string;
  institution: string;
  highlights?: string[];
};

export default function EducationList({ data }: { data: EducationItem[] }) {
  return (
    <div className="education-list">
      <h1 className="page-title">Education</h1>

      {data.map((item) => (
        <section key={item.qualification} className="education-card">
          <h2 className="education-title">{item.qualification}</h2>
          <div className="education-institution">{item.institution}</div>

          {item.highlights && (
            <ul className="education-points">
              {item.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
