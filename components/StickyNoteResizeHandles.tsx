import { RESIZE_HANDLES } from "@/lib/constants";
import type { ResizeHandle } from "@/lib/types";
import { useCallback } from "react";

interface StickyNoteResizeHandlesProps {
  onResizeStart: (
    handle: ResizeHandle,
    pointerId: number,
    clientX: number,
    clientY: number
  ) => void;
}

export default function StickyNoteResizeHandles({
  onResizeStart,
}: StickyNoteResizeHandlesProps) {
  const handlePointerDown = useCallback(
    (handle: ResizeHandle) => (e: React.PointerEvent) => {
      e.stopPropagation();
      onResizeStart(handle, e.pointerId, e.clientX, e.clientY);
    },
    [onResizeStart]
  );

  return (
    <>
      {RESIZE_HANDLES.map((handle) => (
        <div
          key={handle.position}
          className={`absolute opacity-0 group-hover:opacity-100 transition-opacity resize-handle ${handle.cursorClass}`}
          style={handle.style}
          onPointerDown={handlePointerDown(handle.position)}
        />
      ))}
    </>
  );
}
