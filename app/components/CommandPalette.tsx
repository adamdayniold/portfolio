"use client";

import React, { useEffect, useState } from "react";

type Command = {
  label: string;
  action: () => void;
  icon?: () => React.ReactNode; // updated to return JSX
  shortcut?: string;
};

type Props = {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
};

export default function CommandPalette({
  commands,
  isOpen,
  onClose
}: Props) {
  const [visible, setVisible] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  // Control mount visibility
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
    } else if (visible) {
      setClosing(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 140);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, visible]);

  // Keyboard handler
  useEffect(() => {
    if (!visible) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowDown") {
        setSelected((prev) =>
          commands.length === 0
            ? 0
            : (prev + 1) % commands.length
        );
      }

      if (e.key === "ArrowUp") {
        setSelected((prev) =>
          prev === 0 ? commands.length - 1 : prev - 1
        );
      }

      if (e.key === "Enter") {
        commands[selected]?.action();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [visible, commands, selected, onClose]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {visible && (
        <div
          className={`palette-overlay ${
            closing ? "overlay-closing" : ""
          }`}
          onClick={onClose}
        >
          <div
            className={`palette ${
              closing ? "palette-closing" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              className="palette-input"
              placeholder="> Type a command"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
            />
            <div className="palette-list">
              {filtered.map((cmd, index) => (
                <div
                  key={cmd.label}
                  className={`palette-item ${index === selected ? "active" : ""}`}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                >
                  <div className="palette-left">
                    {cmd.icon && cmd.icon()} {/* render icon function */}
                    <span>{cmd.label}</span>
                  </div>

                  {cmd.shortcut && (
                    <div className="palette-shortcut">{cmd.shortcut}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
