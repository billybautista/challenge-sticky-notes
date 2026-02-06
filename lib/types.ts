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

export type ResizeHandle =
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

export interface ResizeState {
  noteId: string;
  handle: ResizeHandle;
  startPointerX: number;
  startPointerY: number;
  startNoteX: number;
  startNoteY: number;
  startNoteWidth: number;
  startNoteHeight: number;
}

export type NotesAction =
  | { type: "ADD_NOTE"; payload: StickyNote }
  | { type: "DELETE_NOTE"; payload: { id: string } }
  | { type: "UPDATE_NOTE"; payload: { id: string } & Partial<StickyNote> }
  | { type: "BRING_TO_FRONT"; payload: { id: string } }
  | { type: "MOVE_NOTE"; payload: { id: string; x: number; y: number } }
  | {
      type: "RESIZE_NOTE";
      payload: {
        id: string;
        x: number;
        y: number;
        width: number;
        height: number;
      };
    }
  | { type: "SET_NOTES"; payload: StickyNote[] };
