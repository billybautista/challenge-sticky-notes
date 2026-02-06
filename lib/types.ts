export interface StickyNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: NoteColor;
  zIndex: number;
}

export type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

export type NoteSize = "small" | "medium" | "large";

export type NotesAction =
  | { type: "ADD_NOTE"; payload: StickyNote }
  | { type: "DELETE_NOTE"; payload: { id: string } }
  | { type: "UPDATE_NOTE"; payload: { id: string } & Partial<StickyNote> }
  | { type: "BRING_TO_FRONT"; payload: { id: string } }
  | { type: "MOVE_NOTE"; payload: { id: string; x: number; y: number } }
  | { type: "SET_NOTES"; payload: StickyNote[] };
