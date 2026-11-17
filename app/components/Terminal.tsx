"use client";
import { useEffect, useRef, useState } from "react";
import type { FileItem } from "@/lib/getFiles";

type Line = {
  type: "input" | "output";
  text: string;
};

const PROMPT_USER = "adamdayniold";
const PROMPT_HOST = "portfolio";

function findFile(items: FileItem[], name: string): FileItem | undefined {
  for (const item of items) {
    if (item.type === "file" && item.name === name) return item;
    if (item.children) {
      const found = findFile(item.children, name);
      if (found) return found;
    }
  }
  return undefined;
}

function readText(files: FileItem[], name: string): string | null {
  return findFile(files, name)?.content?.trim() ?? null;
}

function readJson<T>(files: FileItem[], name: string): T | null {
  const text = readText(files, name);
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

type Experience = {
  role: string;
  company: string;
  period: string;
};

type Project = {
  name: string;
  description: string;
  tech: string[];
  repo: string;
};

type Education = {
  qualification: string;
  institution: string;
};

export default function Terminal({ files }: { files: FileItem[] }) {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to my portfolio terminal." },
    { type: "output", text: "Type 'help' to get started." },
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!containerRef.current) return;

    requestAnimationFrame(() => {
      containerRef.current!.scrollTop =
        containerRef.current!.scrollHeight;
    });
  };

function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (isTypingOutput) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return; // leave Ctrl+P etc. alone

  if (e.key === "Backspace") {
    e.preventDefault();
    setCurrentInput((prev) => prev.slice(0, -1));
  } else if (e.key === "Enter") {
    e.preventDefault();
    runCommand(currentInput);
    setCurrentInput("");
  } else if (e.key.length === 1) {
    e.preventDefault(); // stops Space from scrolling the page
    setCurrentInput((prev) => prev + e.key);
  }
}

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // Auto scroll
  useEffect(() => {
    scrollToBottom();
  }, [lines, currentInput]);


  async function typeOutput(text: string) {
    setIsTypingOutput(true);

    let typed = "";
    for (let i = 0; i < text.length; i++) {
      typed += text[i];

      setLines((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];

        if (last?.type === "output") {
          updated[updated.length - 1] = {
            type: "output",
            text: typed,
          };
        } else {
          updated.push({ type: "output", text: typed });
        }

        return updated;
      });

      await new Promise((res) => setTimeout(res, 15));
      scrollToBottom();
    }

    setIsTypingOutput(false);
  }

  function runCommand(command: string) {
    const cmd = command.trim().toLowerCase();

    setLines((prev) => [...prev, { type: "input", text: command }]);

    let output = "";

    switch (cmd) {
      case "help":
        output =
          "help:       Show commands\nabout:      About me\nskills:     Tech stack\nexperience: Work history\neducation:  Education\nprojects:   View projects\ncontact:    Contact info\nclear:      Clear terminal";
        break;
      case "about":
        output =
          readText(files, "about_me.md")?.replace(/^#.*\n+/, "") ??
          "about_me.md not found.";
        break;
      case "skills": {
        const skills = readJson<Record<string, string[]>>(files, "skills.json");
        output = skills
          ? Object.entries(skills)
              .map(([group, items]) => `${group}: ${items.join(", ")}`)
              .join("\n")
          : "skills.json not found.";
        break;
      }
      case "experience": {
        const jobs = readJson<Experience[]>(files, "experience.json");
        output = jobs
          ? jobs.map((j) => `${j.role} @ ${j.company} (${j.period})`).join("\n")
          : "experience.json not found.";
        break;
      }
      case "projects": {
        const projects = readJson<Project[]>(files, "projects.json");
        output = projects
          ? projects
              .map((p) => `${p.name}\n  ${p.description}\n  ${p.tech.join(", ")}\n  ${p.repo}`)
              .join("\n\n")
          : "projects.json not found.";
        break;
      }
      case "education": {
        const items = readJson<Education[]>(files, "education.json");
        output = items
          ? items.map((e) => `${e.qualification}\n  ${e.institution}`).join("\n\n")
          : "education.json not found.";
        break;
      }
      case "contact":
        output = readText(files, "contact.md") ?? "contact.md not found.";
        break;
      case "clear":
        setLines([]);
        return;
      case "":
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for commands.`;
    }

    typeOutput(output);
  }

  return (
    <div ref={containerRef} className="terminal" tabIndex={0} onKeyDown={handleKeyDown}>
      {lines.map((line, index) => (
        <div key={index}>
          {line.type === "input" ? (
            <div>
              <span className="prompt-user">{PROMPT_USER}</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">{PROMPT_HOST}</span>
              <span className="prompt-path">:~</span>
              <span className="prompt-symbol">$ </span>
              <span className="command">{line.text}</span>
            </div>
          ) : (
            <div className="output">
              {line.text.split("\n").map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          )}
        </div>
      ))}

      {!isTypingOutput && (
        <div>
          <span className="prompt-user">{PROMPT_USER}</span>
          <span className="prompt-at">@</span>
          <span className="prompt-host">{PROMPT_HOST}</span>
          <span className="prompt-path">:~</span>
          <span className="prompt-symbol">$ </span>
          <span className="command">{currentInput}</span>
          <span className="caret" />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
