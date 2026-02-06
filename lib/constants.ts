import type { NoteColor, NoteSize } from "./types";

export const NOTE_COLORS: Record<
  NoteColor,
  { bg: string; header: string; text: string }
> = {
  yellow: { bg: "#fef9c3", header: "#fde047", text: "#713f12" },
  pink: { bg: "#fce7f3", header: "#f9a8d4", text: "#831843" },
  blue: { bg: "#dbeafe", header: "#93c5fd", text: "#1e3a5f" },
  green: { bg: "#dcfce7", header: "#86efac", text: "#14532d" },
  purple: { bg: "#f3e8ff", header: "#c4b5fd", text: "#3b0764" },
};

export const NOTE_SIZES: Record<NoteSize, { width: number; height: number }> = {
  small: { width: 180, height: 180 },
  medium: { width: 240, height: 240 },
  large: { width: 320, height: 320 },
};

export const AVAILABLE_COLORS: NoteColor[] = [
  "yellow",
  "pink",
  "blue",
  "green",
  "purple",
];
export const AVAILABLE_SIZES: NoteSize[] = ["small", "medium", "large"];

export const SIZE_ICONS: Record<NoteSize, { w: number; h: number }> = {
  small: { w: 10, h: 10 },
  medium: { w: 14, h: 14 },
  large: { w: 18, h: 18 },
};
