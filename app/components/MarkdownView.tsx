// Minimal renderer: "# Heading" lines and paragraphs separated by blank lines.
export default function MarkdownView({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className="markdown">
      {blocks.map((block, i) =>
        block.startsWith("# ") ? (
          <h1 key={i}>{block.slice(2)}</h1>
        ) : (
          <p key={i}>{block.replace(/\n/g, " ")}</p>
        )
      )}
    </div>
  );
}
