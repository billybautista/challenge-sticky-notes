interface StickyNoteProps {
  note?: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    color?: string;
    content?: string;
  };
}

const defaultNote = {
  id: "1",
  x: 100,
  y: 100,
  width: 200,
  height: 180,
  zIndex: 1,
  content: "Content here",
};

const COLORS: Record<string, { bg: string; text: string; header: string }> = {
  yellow: { bg: "#fef08a", text: "#1c1917", header: "#fde047" },
  green: { bg: "#bbf7d0", text: "#14532d", header: "#86efac" },
  blue: { bg: "#bfdbfe", text: "#1e3a8a", header: "#93c5fd" },
  pink: { bg: "#fbcfe8", text: "#831843", header: "#f9a8d4" },
  default: { bg: "#fef08a", text: "#1c1917", header: "#fde047" },
};

export default function StickyNote({ note: noteProp }: StickyNoteProps) {
  const note = noteProp ?? defaultNote;
  const colors = COLORS.default;

  return (
    <div
      className="absolute group touch-none"
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
      }}
    >
      <div
        className="note-body w-full h-full rounded-sm flex flex-col sticky-shadow cursor-grab active:cursor-grabbing"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
        }}
      >
        <div
          className="h-6 w-full rounded-t-sm shrink-0"
          style={{ backgroundColor: colors.header }}
        />

        <div className="flex-1 p-2 overflow-hidden min-h-0">
          <p className="text-sm leading-snug whitespace-pre-wrap wrap-break-word select-none">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
}
