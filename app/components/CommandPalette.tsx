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
  const [closing, setClosing] = useState(false);
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const visible = isOpen || closing;

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Start or cancel the closing animation when isOpen changes
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    setClosing(!isOpen);
  }

  // Finish closing after the animation, then reset the search
  useEffect(() => {
    if (!closing) return;
    const timeout = setTimeout(() => {
      setClosing(false);
      setQuery("");
      setSelected(0);
    }, 140);
    return () => clearTimeout(timeout);
  }, [closing]);

  // Keyboard handler
  useEffect(() => {
    if (!visible) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) =>
          filtered.length === 0 ? 0 : (prev + 1) % filtered.length
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => filtered.length === 0 ? 0 : (prev - 1 + filtered.length) % filtered.length
        );
      }

      if (e.key === "Enter") {
        const cmd = filtered[selected];
        if (!cmd) return;
        cmd.action();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, filtered, selected, onClose]);

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
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className={`palette ${closing ? "palette-closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              role="combobox"
              aria-label="Search commands"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={
                filtered.length ? `palette-option-${selected}` : undefined
              }
              className="palette-input"
              placeholder="> Type a command"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
            />
            <div className="palette-list" role="listbox" id="palette-list">
              {filtered.map((cmd, index) => (
                <div
                  key={cmd.label}
                  id={`palette-option-${index}`}
                  role="option"
                  aria-selected={index === selected}
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
