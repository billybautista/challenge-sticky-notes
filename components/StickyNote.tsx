import { NOTE_COLORS } from "@/lib/constants";
import type { ResizeHandle, StickyNote as StickyNoteType } from "@/lib/types";
import { useCallback, useRef, useState } from "react";
import StickyNoteResizeHandles from "./StickyNoteResizeHandles";

interface StickyNoteProps {
  note: StickyNoteType;
  onDragStart: (
    noteId: string,
    pointerX: number,
    pointerY: number,
    offsetX: number,
    offsetY: number,
    pointerId: number
  ) => void;
  onResizeStart: (
    noteId: string,
    handle: ResizeHandle,
    pointerId: number,
    pointerX: number,
    pointerY: number
  ) => void;
  onContentChange: (noteId: string, content: string) => void;
}

const StickyNote = ({
  note,
  onDragStart,
  onResizeStart,
  onContentChange,
}: StickyNoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Don't start a drag when clicking on resize handles or the text area
      if (
        (e.target as HTMLElement).classList.contains("resize-handle") ||
        (e.target as HTMLElement).tagName.toLowerCase() === "textarea"
      ) {
        return;
      }

      e.stopPropagation();

      // Store the offset between the pointer and the note's top-left corner
      // so the note follows from where the user grabbed it, not from (0,0).
      if (nodeRef.current) {
        const rect = nodeRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        onDragStart(
          note.id,
          e.clientX,
          e.clientY,
          offsetX,
          offsetY,
          e.pointerId
        );
      }
    },
    [note.id, onDragStart]
  );

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onContentChange(note.id, e.target.value);
    },
    [note.id, onContentChange]
  );

  const colors = NOTE_COLORS[note.color];

  return (
    <div
      ref={nodeRef}
      className="absolute group touch-none"
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
      }}
      onPointerDown={handlePointerDown}
    >
      <div
        className="note-body w-full h-full rounded-sm flex flex-col sticky-shadow cursor-grab active:cursor-grabbing"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className="h-6 w-full rounded-t-sm shrink-0"
          style={{ backgroundColor: colors.header }}
        />

        <div className="flex-1 p-2 overflow-hidden min-h-0">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              className="w-full h-full resize-none bg-transparent outline-none text-sm leading-snug cursor-text"
              style={{ color: colors.text }}
              value={note.content}
              onChange={handleTextChange}
              onBlur={handleBlur}
              onPointerDown={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="text-sm leading-snug whitespace-pre-wrap wrap-break-word select-none">
              {note.content || "Double-click to edit..."}
            </p>
          )}
        </div>
      </div>

      <StickyNoteResizeHandles
        onResizeStart={(handle, pointerId, x, y) =>
          onResizeStart(note.id, handle, pointerId, x, y)
        }
      />
    </div>
  );
};

export default StickyNote;
