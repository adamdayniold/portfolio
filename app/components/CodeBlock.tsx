"use client";

import { useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import monokai from "@/lib/themes/Monokai.json";

interface Props {
  code: string;
  lang: string;
  isBooting?: boolean;
  onCursorChange?: (lineNumber: number, column: number) => void;
}

export default function CodeBlock({
  code,
  lang,
  isBooting = false,
  onCursorChange
}: Props) {
  const handleMount: OnMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor, monaco) => {
      // Define Monokai theme
      monaco.editor.defineTheme("monokai-dark", monokai);

      // Apply theme
      monaco.editor.setTheme("monokai-dark");

      // Optional: focus editor on mount
      editorInstance.focus();
      
      // Cursor tracking
      editorInstance.onDidChangeCursorPosition((e) => {
        onCursorChange?.(e.position.lineNumber, e.position.column);
      });
    },
    [onCursorChange]
  );

  return (
    <div
      className={`editor ${isBooting ? "booting" : "ready"}`}
      style={{
        height: "100%",
        width: "100%",
        opacity: isBooting ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      <Editor
        height="100%"
        width="100%"
        language={lang}
        value={code}
        onMount={handleMount}
        theme="monokai-dark"
        options={{
          // Typography
          fontSize: 14,
          fontFamily: "JetBrains Mono, monospace",
          lineHeight: 22,
          tabSize: 2,

          // Editor behavior
          readOnly: true,
          domReadOnly: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",

          // UI controls
          minimap: { enabled: false },
          renderLineHighlight: "all",
          renderWhitespace: "none",
          wordWrap: "off",

          // VS Code feel
          padding: { top: 0, bottom: 0 },
          cursorStyle: "line",
          cursorWidth: 2,
          cursorSurroundingLines: 0,
          cursorSurroundingLinesStyle: "default",
          contextmenu: false,
          glyphMargin: false,
          folding: true,
          bracketPairColorization: { enabled: true },
          guides: {
            indentation: true,
            bracketPairs: true,
          }
        }}
      />
    </div>
  );
}
