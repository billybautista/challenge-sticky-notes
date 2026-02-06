import { notesReducer } from "@/lib/reducer";
import type { NoteColor, NoteSize } from "@/lib/types";
import { createNote } from "@/lib/utils";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

export function useStickyNotes() {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const notesRef = useRef(notes);

  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    notesRef.current = notes;
    if (hasLoaded) {
      localStorage.setItem("sticky-notes-data", JSON.stringify(notes));
    }
  }, [notes, hasLoaded]);

  useEffect(() => {
    const saved = localStorage.getItem("sticky-notes-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: "SET_NOTES", payload: parsed });
        }
      } catch (e) {
        console.error("Failed to load notes", e);
      }
    }
    setTimeout(() => {
      setHasLoaded(true);
    }, 0);
  }, []);

  const getMaxZIndex = useCallback(() => {
    const current = notesRef.current;
    return current.length > 0 ? Math.max(...current.map((n) => n.zIndex)) : 0;
  }, []);

  const addNote = useCallback(
    (x: number, y: number, color: NoteColor, size: NoteSize) => {
      dispatch({
        type: "ADD_NOTE",
        payload: createNote(x, y, color, size, getMaxZIndex()),
      });
    },
    [getMaxZIndex]
  );

  const updateNoteContent = useCallback((id: string, content: string) => {
    dispatch({ type: "UPDATE_NOTE", payload: { id, content } });
  }, []);

  return {
    notes,
    notesRef,
    dispatch,
    addNote,
    updateNoteContent,
    getMaxZIndex,
  };
}
