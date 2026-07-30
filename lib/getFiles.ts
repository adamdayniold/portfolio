import fs from "fs";
import path from "path";

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  content?: string;
  language?: string;
  children?: FileItem[];
}

// Keep employer project details private until there is a personal project to show.
const HIDDEN_PORTFOLIO_FILES = new Set(["Portfolio/project.ts"]);

function detectLanguage(fileName: string): string {
  const ext = fileName.split(".").pop() || "";

  if (ext === "md") return "markdown";
  if (ext === "json") return "json";
  if (ext === "ts" || ext === "tsx") return "typescript";
  if (ext === "yaml" || ext === "yml") return "yaml";

  return "plaintext";
}

function readDirectory(dirPath: string, basePath = ""): FileItem[] {
  const entries = fs.readdirSync(dirPath);

  return entries
    .filter((entry) => {
      const relativePath = path.join(basePath, entry);
      return !HIDDEN_PORTFOLIO_FILES.has(relativePath);
    })
    .map((entry) => {
    const fullPath = path.join(dirPath, entry);
    const relativePath = path.join(basePath, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      return {
        name: entry,
        type: "folder",
        path: relativePath,
        children: readDirectory(fullPath, relativePath),
      };
    }

    return {
      name: entry,
      type: "file",
      path: relativePath,
      content: fs.readFileSync(fullPath, "utf-8"),
      language: detectLanguage(entry),
    };
  });
}

export function getFiles(): FileItem[] {
  const contentDir = path.join(process.cwd(), "content");

  if (!fs.existsSync(contentDir)) return [];

  return readDirectory(contentDir);
}
