"use client";

import { useStickyBoardEvents } from "@/hooks/useStickyBoardEvents";
import { useStickyNoteDrag } from "@/hooks/useStickyNoteDrag";
import { useStickyNoteResize } from "@/hooks/useStickyNoteResize";
import { useStickyNotes } from "@/hooks/useStickyNotes";
import { NOTE_SIZES } from "@/lib/constants";
import type { NoteColor, NoteSize } from "@/lib/types";
import { useCallback, useRef, useState } from "react";
import StickyNote from "./StickyNote";
import Toolbar from "./Toolbar";
import TrashZone from "./TrashZone";

const Board = () => {
  const { notes, notesRef, dispatch, addNote, updateNoteContent } =
    useStickyNotes();

  const [selectedColor, setSelectedColor] = useState<NoteColor>("yellow");
  const [selectedSize, setSelectedSize] = useState<NoteSize>("medium");

  const boardRef = useRef<HTMLDivElement>(null);
  const trashZoneRef = useRef<HTMLDivElement>(null);

  const {
    resizeCursor,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
    cancelResize,
  } = useStickyNoteResize(dispatch, notesRef, boardRef);

  const {
    draggingNoteId,
    trashHighlighted,
    handleNoteDragStart,
    handleDragMove,
    handleDragEnd,
    cancelDrag,
  } = useStickyNoteDrag(dispatch, notesRef, boardRef, trashZoneRef);

  const { handlePointerMove, handlePointerUp, handleLostPointerCapture } =
    useStickyBoardEvents({
      handleResizeMove,
      handleDragMove,
      handleResizeEnd,
      handleDragEnd,
      cancelResize,
      cancelDrag,
    });

  const handleBoardDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;

      const boardRect = boardRef.current?.getBoundingClientRect();
      if (!boardRect) return;

      const { width, height } = NOTE_SIZES[selectedSize];
      const x = e.clientX - boardRect.left - width / 2;
      const y = e.clientY - boardRect.top - height / 2;

      addNote(x, y, selectedColor, selectedSize);
    },
    [addNote, selectedColor, selectedSize]
  );

  const handleAddNote = useCallback(() => {
    const boardEl = boardRef.current;
    if (!boardEl) return;

    const rect = boardEl.getBoundingClientRect();
    const { width, height } = NOTE_SIZES[selectedSize];

    addNote(
      rect.width / 2 - width / 2,
      rect.height / 2 - height / 2,
      selectedColor,
      selectedSize
    );
  }, [addNote, selectedColor, selectedSize]);

  return (
    <div className="board-canvas relative h-screen w-screen overflow-hidden select-none">
      <div
        ref={boardRef}
        className="absolute inset-0 overflow-hidden touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onLostPointerCapture={handleLostPointerCapture}
        onDoubleClick={handleBoardDoubleClick}
        style={{
          cursor: draggingNoteId ? "grabbing" : resizeCursor || "default",
        }}
      >
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onDragStart={handleNoteDragStart}
            onResizeStart={handleResizeStart}
            onContentChange={updateNoteContent}
          />
        ))}
        <TrashZone
          ref={trashZoneRef}
          isHighlighted={trashHighlighted}
          isVisible={draggingNoteId !== null}
        />
      </div>
      <Toolbar
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorChange={setSelectedColor}
        onSizeChange={setSelectedSize}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default Board;
