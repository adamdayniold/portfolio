function toHref(key: string, value: string) {
  if (key === "email") return `mailto:${value}`;
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

export default function ContactView({ content }: { content: string }) {
  const rows = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.includes(":"))
    .map((line) => {
      const i = line.indexOf(":");
      return {
        key: line.slice(0, i).trim().toLowerCase(),
        value: line.slice(i + 1).trim(),
      };
    })
    .filter((row) => row.key && row.value);

  return (
    <div className="contact-view">
      <h1>Get in touch</h1>
      <ul className="contact-links">
        {rows.map((row) => (
          <li key={row.key}>
            <span className="contact-label">{row.key}</span>
            <a
              href={toHref(row.key, row.value)}
              {...(row.key !== "email"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {row.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
