import { File, Plus } from "lucide-react";

const COLOR_HEADERS = ["#fde047", "#86efac", "#93c5fd", "#f9a8d4"];
const SIZE_ICONS = [
  { w: 12, h: 14 },
  { w: 16, h: 18 },
  { w: 20, h: 22 },
];

export default function Toolbar() {
  return (
    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-14 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl flex flex-col items-center py-3 gap-1 z-50 shadow-lg">
      <div
        className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center mb-2"
        title="Sticky Notes"
      >
        <File className="w-5 h-5 text-stone-600" />
      </div>

      <div className="w-7 h-px bg-stone-200" />

      <span className="text-[9px] text-stone-400 mt-2 mb-0.5 uppercase tracking-wider">
        Color
      </span>
      {COLOR_HEADERS.map((bg, i) => (
        <button
          key={i}
          className={`w-7 h-7 rounded-full border-2 transition-all ${
            i === 0
              ? "border-stone-600 scale-110"
              : "border-transparent hover:scale-110"
          }`}
          style={{ backgroundColor: bg }}
        />
      ))}

      <div className="flex-1" />

      <button
        className="w-10 h-10 rounded-xl bg-stone-700 text-white flex items-center justify-center hover:bg-stone-800 active:bg-stone-900 transition-colors shadow-md"
        title="Add Note"
      >
        <Plus className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
