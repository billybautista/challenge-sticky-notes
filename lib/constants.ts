import type { NoteColor, NoteSize, ResizeHandle } from "./types";

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

export const MIN_NOTE_WIDTH = 140;
export const MIN_NOTE_HEIGHT = 120;

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

export const HANDLE_SIZE = 12;

const CURSOR_BY_DIRECTION: Record<ResizeHandle, string> = {
  "top-left": "nwse-resize",
  top: "ns-resize",
  "top-right": "nesw-resize",
  right: "ew-resize",
  "bottom-right": "nwse-resize",
  bottom: "ns-resize",
  "bottom-left": "nesw-resize",
  left: "ew-resize",
};

function buildHandleStyle(position: ResizeHandle): React.CSSProperties {
  const half = -HANDLE_SIZE / 2;
  const base = { width: HANDLE_SIZE, height: HANDLE_SIZE };

  const isTop = position.includes("top");
  const isBottom = position.includes("bottom");
  const isLeft = position === "left" || position.endsWith("-left");
  const isRight = position === "right" || position.endsWith("-right");
  const isEdgeV = position === "top" || position === "bottom";
  const isEdgeH = position === "left" || position === "right";

  return {
    ...base,
    ...(isTop && { top: half }),
    ...(isBottom && { bottom: half }),
    ...(isLeft && { left: half }),
    ...(isRight && { right: half }),
    ...(isEdgeV && { left: "50%", marginLeft: half }),
    ...(isEdgeH && { top: "50%", marginTop: half }),
  };
}

const ALL_HANDLES: ResizeHandle[] = [
  "top-left",
  "top",
  "top-right",
  "right",
  "bottom-right",
  "bottom",
  "bottom-left",
  "left",
];

export const RESIZE_HANDLES = ALL_HANDLES.map((position) => ({
  position,
  cursorClass: `cursor-${CURSOR_BY_DIRECTION[position].replace(
    "-resize",
    ""
  )}-resize`,
  style: buildHandleStyle(position),
}));

export const CURSOR_MAP: Record<string, string> = CURSOR_BY_DIRECTION;
