import type { NotesAction } from "@/lib/types";
import { useCallback, useRef, useState } from "react";

export function useStickyNoteDrag(
  dispatch: React.Dispatch<NotesAction>,
  boardRef: React.RefObject<HTMLDivElement | null>
) {
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);

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
      }
      return true;
    },
    [dispatch, boardRef]
  );

  const handleDragEnd = useCallback(() => {
    const drag = dragRef.current;
    if (drag) {
      if (drag.status === "dragging") {
        setDraggingNoteId(null);
      }

      dragRef.current = null;
      return true;
    }
    return false;
  }, []);

  const cancelDrag = useCallback(() => {
    if (dragRef.current) {
      setDraggingNoteId(null);
      dragRef.current = null;
    }
  }, []);

  return {
    draggingNoteId,
    handleNoteDragStart,
    handleDragMove,
    handleDragEnd,
    cancelDrag,
  };
}
