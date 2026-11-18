"use client";

import { useCallback, useState } from "react";
import Editor, { OnMount, BeforeMount, loader } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import monokai from "@/lib/themes/Monokai.json";

if (typeof window !== "undefined") {
  loader.init();
}

const handleBeforeMount: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("monokai-dark", monokai);
};

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
  const [ready, setReady] = useState(false);

  const handleMount: OnMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorInstance.onDidChangeCursorPosition((e) => {
        onCursorChange?.(e.position.lineNumber, e.position.column);
      });
      setTimeout(() => {
        editorInstance.setScrollTop(0, 1);
        setReady(true);
      }, 100);
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
        beforeMount={handleBeforeMount}
        loading={<div style={{ background: "#272822", width: "100%", height: "100%" }} />}
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
          wordWrap: "on",
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },

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
