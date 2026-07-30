"use client";
import { useEffect, useRef, useState } from "react";

type Line = {
  type: "input" | "output";
  text: string;
};

const PROMPT_USER = "adamdayniold";
const PROMPT_HOST = "portfolio";

export default function Terminal() {
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


  // Keyboard handling
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingOutput) return;

      if (e.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        runCommand(currentInput);
        setCurrentInput("");
      } else if (e.key.length === 1) {
        setCurrentInput((prev) => prev + e.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, isTypingOutput]);

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
          "help:     Show commands\nabout:    About me\nskills:   Tech stack\nprojects: View projects\ncontact:  Contact info\nclear:    Clear terminal";
        break;
      case "about":
        output =
          "Software engineer focused on immersive UI and scalable systems.";
        break;
      case "skills":
        output =
          "TypeScript  React  Next.js  Node.js  PostgreSQL  UI/UX";
        break;
      case "projects":
        output =
          "• VS Code Portfolio\n• AI Automation Tools\n• Fullstack SaaS Platform";
        break;
      case "contact":
        output =
          "Email: you@email.com\nGitHub: github.com/yourname";
        break;
      case "clear":
        setLines([]);
        return;
      case "":
        return;
      default:
        output = `Command not found: ${cmd}`;
    }

    typeOutput(output);
  }

  return (
    <div ref={containerRef} className="terminal">
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
