import type { KeyboardEvent } from "react";

// Run `fn` when Enter or Space is pressed, like a native button.
export function onActivate(e: KeyboardEvent, fn: () => void) {
  if (e.target !== e.currentTarget) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
}
