"use client";
import { useEffect, useState } from "react";
import {
  Terminal as Term,
  Menu,
  X,
} from "lucide-react";

import Terminal from "@/app/components/Terminal";
import CodeBlock from "@/app/components/CodeBlock";
import CommandPalette from "@/app/components/CommandPalette";
import Sidebar from "@/app/components/Sidebar";
import { FileIcon } from "@/app/components/FileIcon";
import { getLanguage, getLanguageLabel } from "@/lib/fileLanguages";
import type { FileItem } from "@/lib/getFiles";

const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/files`
);
export default function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [time, setTime] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [active, setActive] = useState<FileItem | null>(null);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ lineNumber: 1, column: 1 });

  function closeTab(path: string) {
    setOpenTabs((prev) => {
      const newTabs = prev.filter((tab) => tab.path !== path);

      if (active?.path === path) {
        setActive(newTabs[newTabs.length - 1] || null);
      }

      return newTabs;
    });
  }

  function findFirstFile(items: FileItem[]): FileItem | null {
    for (const item of items) {
      if (item.type === "file") return item;
      if (item.children) {
        const found = findFirstFile(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  function openFile(file: FileItem) {
    if (file.type !== "file") return;

    setOpenTabs((prev) => {
      const exists = prev.find((f) => f.path === file.path);
      if (exists) return prev;
      return [...prev, file];
    });

    setActive(file);
  }

  useEffect(() => {
    async function loadFiles() {
      const res = await fetch("/api/files");
      const data = await res.json();
      setFiles(data);
      const firstFile = findFirstFile(data);
      if (firstFile) {
        setOpenTabs([firstFile]);
        setActive(firstFile);
      }
    }

    loadFiles();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 50); // small delay to allow initial paint

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (!isBooting) {
      const timer = setTimeout(() => setShowTerminal(true), 1000); // 1s after startup
      return () => clearTimeout(timer);
    }
  }, [isBooting]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        setShowPalette(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function flattenFiles(items: FileItem[]): FileItem[] {
    let result: FileItem[] = [];

    for (const item of items) {
      if (item.type === "file") {
        result.push(item);
      }
      if (item.children) {
        result = result.concat(flattenFiles(item.children));
      }
    }

    return result;
  }

  const allFiles = flattenFiles(files);

  const fileCommands = allFiles.map((file) => ({
    label: file.name,
    action: () => openFile(file),
    icon: () => <FileIcon filename={file.name} />,
  }));

  const commands = [
    ...fileCommands,
    {
      label: "Toggle Terminal",
      action: () => setShowTerminal((v) => !v),
      icon: () => <Term size={16} className="terminal-icon" />, // or use Terminal icon
      shortcut: "⌘J"
    }
  ];

  return (
    <div className="app">
      <header className={`titlebar ${isBooting ? "preload" : "animate"}`}>
        <div className="top-bar">
            <button
              className="mobile-menu-btn"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu size={18} />
            </button>
          <div className={`ide-header ${isBooting ? "preload" : "animate"}`}>
            <span className="ide-title">Adam Dayniold</span>
            <span className="ide-subtitle">Portfolio</span>
          </div>
          <button
            className="toggle-terminal-btn"
            onClick={() => setShowTerminal((v) => !v)}
            >
            <Term size={16} style={{ marginRight: 6, verticalAlign: "middle", color: "#f92672" }} />
            Terminal
          </button>
          <CommandPalette isOpen={showPalette} commands={commands} onClose={() => setShowPalette(false)} />
        </div>
      </header>

      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div className="workspace">
        <div className="content-area">
          <Sidebar
            files={files}
            active={active}
            onSelect={openFile}
            isOpen={showSidebar}
            isBooting={isBooting}
          />

          <main className={`editor ${isBooting ? "preload" : "animate"}`}>
            <div className="tabs">
              {openTabs.map((file) => (
                <div
                  key={file.path}
                  className={`tab ${active?.path === file.path ? "active" : ""}`}
                  onClick={() => setActive(file)}
                >
                  <span>{file.name}</span>

                  <button
                    className="close-btn"
                    aria-label={`Close ${file.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(file.path);
                    }}
                  >
                    <X size={14} strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
            { active?.type == "file" && 
              <CodeBlock
                code={active.content ?? ""}
                lang={getLanguage(active.language ?? "plaintext")}
                isBooting={isBooting}
                onCursorChange={(line, column) => setCursorPosition({ lineNumber: line, column })}
              />
            }
          </main>
        </div>

        {!isBooting && showTerminal && <Terminal key="terminal" />}
      </div>

      <footer className="statusbar">
        <div className="status-left">
          <div className="status-item">🌿 portfolio/main</div>
          <div className="status-item">✔ 0 Problems</div>
        </div>

        <div className="status-right">
          <div className="status-item">{time}</div>
          <div className="status-item">Ln {cursorPosition.lineNumber}, Col {cursorPosition.column}</div>
          {active?.type == "file" &&
            <div className="status-item">{getLanguageLabel(active.language ?? "plaintext")}</div>
          }
          <div className="status-item">UTF-8</div>
          <div className="status-item">LF</div>
          <div className="status-item">Monokai</div>
          <div className="status-item">Next.js</div>
        </div>
      </footer>
    </div>
  );
}
