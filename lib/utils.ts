import { NOTE_SIZES } from "./constants";
import type { NoteColor, NoteSize, StickyNote } from "./types";

export function generateId(): string {
  return crypto.randomUUID();
}

export function createNote(
  x: number,
  y: number,
  color: NoteColor = "yellow",
  size: NoteSize = "medium",
  maxZIndex: number = 0
): StickyNote {
  const { width, height } = NOTE_SIZES[size];
  return {
    id: generateId(),
    x,
    y,
    width,
    height,
    content: "",
    color,
    zIndex: maxZIndex + 1,
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Derive a subtle rotation (-1.6 to +1.6 degrees) from the note ID for a natural look. */
export function getRotation(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return ((hash % 5) - 2) * 0.8;
}
