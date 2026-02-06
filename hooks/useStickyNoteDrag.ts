import type { NotesAction, StickyNote } from "@/lib/types";
import { useCallback, useRef, useState } from "react";

export function useStickyNoteDrag(
  dispatch: React.Dispatch<NotesAction>,
  notesRef: React.MutableRefObject<StickyNote[]>,
  boardRef: React.RefObject<HTMLDivElement | null>,
  trashZoneRef: React.RefObject<HTMLDivElement | null>
) {
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [trashHighlighted, _setTrashHighlighted] = useState(false);
  const trashHighlightedRef = useRef(false);
  const setTrashOver = useCallback((v: boolean) => {
    trashHighlightedRef.current = v;
    _setTrashHighlighted(v);
  }, []);

  const dragRef = useRef<{
    status: "pending" | "dragging";
    noteId: string;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    pointerId: number;
  } | null>(null);

  const handleNoteDragStart = useCallback(
    (
      noteId: string,
      pointerX: number,
      pointerY: number,
      offsetX: number,
      offsetY: number,
      pointerId: number
    ) => {
      dispatch({ type: "BRING_TO_FRONT", payload: { id: noteId } });

      dragRef.current = {
        status: "pending",
        noteId,
        offsetX,
        offsetY,
        startX: pointerX,
        startY: pointerY,
        pointerId,
      };
    },
    [dispatch]
  );

  const handleDragMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return false;

      // Wait until the pointer moves at least 5px to commit the drag,
      // so simple clicks don't trigger unwanted movement.
      if (drag.status === "pending") {
        const dist = Math.hypot(
          e.clientX - drag.startX,
          e.clientY - drag.startY
        );
        if (dist > 5) {
          drag.status = "dragging";
          setDraggingNoteId(drag.noteId);
          if (boardRef.current) {
            boardRef.current.setPointerCapture(drag.pointerId);
          }
        }
      }

      if (drag.status === "dragging") {
        const newX = e.clientX - drag.offsetX;
        const newY = e.clientY - drag.offsetY;

        dispatch({
          type: "MOVE_NOTE",
          payload: { id: drag.noteId, x: newX, y: newY },
        });

        const trashEl = trashZoneRef.current;
        if (trashEl) {
          // Use the note's center point for trash detection,
          // feels more natural than checking edges.
          const trashRect = trashEl.getBoundingClientRect();
          const note = notesRef.current.find((n) => n.id === drag.noteId);
          if (note) {
            const cx = newX + note.width / 2;
            const cy = newY + note.height / 2;
            const isOver =
              cx >= trashRect.left &&
              cx <= trashRect.right &&
              cy >= trashRect.top &&
              cy <= trashRect.bottom;

            if (isOver !== trashHighlightedRef.current) {
              setTrashOver(isOver);
            }
          }
        }
      }
      return true;
    },
    [dispatch, notesRef, boardRef, trashZoneRef]
  );

  const handleDragEnd = useCallback(() => {
    const drag = dragRef.current;
    if (drag) {
      if (drag.status === "dragging") {
        if (trashHighlightedRef.current) {
          dispatch({ type: "DELETE_NOTE", payload: { id: drag.noteId } });
        }
        setDraggingNoteId(null);
      }

      dragRef.current = null;
      setTrashOver(false);
      return true;
    }
    return false;
  }, [dispatch, setTrashOver]);

  const cancelDrag = useCallback(() => {
    if (dragRef.current) {
      setDraggingNoteId(null);
      dragRef.current = null;
      setTrashOver(false);
    }
  }, []);

  return {
    draggingNoteId,
    trashHighlighted,
    handleNoteDragStart,
    handleDragMove,
    handleDragEnd,
    cancelDrag,
  };
}
