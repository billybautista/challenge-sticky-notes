import type { NotesAction, StickyNote } from "./types";

export function notesReducer(
  state: StickyNote[],
  action: NotesAction
): StickyNote[] {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.payload];

    case "DELETE_NOTE":
      return state.filter((n) => n.id !== action.payload.id);

    case "UPDATE_NOTE": {
      const { id, ...updates } = action.payload;
      return state.map((n) => (n.id === id ? { ...n, ...updates } : n));
    }

    case "BRING_TO_FRONT": {
      const maxZ = Math.max(...state.map((n) => n.zIndex), 0);
      return state.map((n) =>
        n.id === action.payload.id ? { ...n, zIndex: maxZ + 1 } : n
      );
    }

    case "MOVE_NOTE":
      return state.map((n) =>
        n.id === action.payload.id
          ? { ...n, x: action.payload.x, y: action.payload.y }
          : n
      );

    case "SET_NOTES":
      return action.payload;

    default:
      return state;
  }
}
