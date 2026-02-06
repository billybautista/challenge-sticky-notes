import { CURSOR_MAP, MIN_NOTE_HEIGHT, MIN_NOTE_WIDTH } from "@/lib/constants";
import type {
  NotesAction,
  ResizeHandle,
  ResizeState,
  StickyNote,
} from "@/lib/types";
import { useCallback, useRef, useState } from "react";

function computeResize(rs: ResizeState, clientX: number, clientY: number) {
  const dx = clientX - rs.startPointerX;
  const dy = clientY - rs.startPointerY;
  const handle = rs.handle;

  let newX = rs.startNoteX;
  let newY = rs.startNoteY;
  let newW = rs.startNoteWidth;
  let newH = rs.startNoteHeight;

  // For left/top handles, resizing also shifts the note position.
  // We clamp so the note never shrinks below minimums.
  if (handle.includes("right")) {
    newW = Math.max(MIN_NOTE_WIDTH, rs.startNoteWidth + dx);
  } else if (handle.includes("left")) {
    const proposedW = rs.startNoteWidth - dx;
    if (proposedW >= MIN_NOTE_WIDTH) {
      newW = proposedW;
      newX = rs.startNoteX + dx;
    } else {
      newW = MIN_NOTE_WIDTH;
      newX = rs.startNoteX + (rs.startNoteWidth - MIN_NOTE_WIDTH);
    }
  }

  if (handle.includes("bottom")) {
    newH = Math.max(MIN_NOTE_HEIGHT, rs.startNoteHeight + dy);
  } else if (handle.includes("top")) {
    const proposedH = rs.startNoteHeight - dy;
    if (proposedH >= MIN_NOTE_HEIGHT) {
      newH = proposedH;
      newY = rs.startNoteY + dy;
    } else {
      newH = MIN_NOTE_HEIGHT;
      newY = rs.startNoteY + (rs.startNoteHeight - MIN_NOTE_HEIGHT);
    }
  }

  return { x: newX, y: newY, width: newW, height: newH };
}

export function useStickyNoteResize(
  dispatch: React.Dispatch<NotesAction>,
  notesRef: React.MutableRefObject<StickyNote[]>,
  boardRef: React.RefObject<HTMLDivElement | null>
) {
  const [resizeCursor, setResizeCursor] = useState<string | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);

  const handleResizeStart = useCallback(
    (
      noteId: string,
      handle: ResizeHandle,
      pointerId: number,
      pointerX: number,
      pointerY: number
    ) => {
      const note = notesRef.current.find((n) => n.id === noteId);
      if (!note) return;

      dispatch({ type: "BRING_TO_FRONT", payload: { id: noteId } });
      setResizeCursor(CURSOR_MAP[handle]);

      resizeStateRef.current = {
        noteId,
        handle,
        startPointerX: pointerX,
        startPointerY: pointerY,
        startNoteX: note.x,
        startNoteY: note.y,
        startNoteWidth: note.width,
        startNoteHeight: note.height,
      };

      boardRef.current?.setPointerCapture(pointerId);
    },
    [dispatch, notesRef, boardRef]
  );

  const handleResizeMove = useCallback(
    (e: React.PointerEvent) => {
      const rs = resizeStateRef.current;
      if (rs) {
        const result = computeResize(rs, e.clientX, e.clientY);
        dispatch({
          type: "RESIZE_NOTE",
          payload: { id: rs.noteId, ...result },
        });
        return true; // handled
      }
      return false; // not handled
    },
    [dispatch]
  );

  const handleResizeEnd = useCallback(() => {
    if (resizeStateRef.current) {
      resizeStateRef.current = null;
      setResizeCursor(null);
      return true;
    }
    return false;
  }, []);

  const cancelResize = useCallback(() => {
    if (resizeStateRef.current) {
      resizeStateRef.current = null;
      setResizeCursor(null);
    }
  }, []);

  return {
    resizeCursor,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
    cancelResize,
  };
}
