import { TrashIcon } from "lucide-react";
import { Ref } from "react";

interface TrashZoneProps {
  isHighlighted: boolean;
  isVisible: boolean;
  ref?: Ref<HTMLDivElement>;
}

const TrashZone = ({ isHighlighted, isVisible, ref }: TrashZoneProps) => {
  return (
    <div
      ref={ref}
      className={`
        absolute bottom-0 left-0 right-0 flex items-center justify-center
        pointer-events-none transition-all duration-200
        ${
          isVisible
            ? "h-20 opacity-100 translate-y-0"
            : "h-20 opacity-0 translate-y-full"
        }
        ${
          isHighlighted
            ? "trash-highlighted border-t-2 border-red-500"
            : "bg-stone-200/60 border-t-2 border-stone-300"
        }
      `}
    >
      <TrashIcon
        className={`w-8 h-8 transition-colors ${
          isHighlighted ? "text-red-600" : "text-stone-400"
        }`}
        fill={isHighlighted ? "currentColor" : "none"}
      />
      <span
        className={`ml-2 text-sm font-medium ${
          isHighlighted ? "text-red-600" : "text-stone-400"
        }`}
      >
        Drop here to delete
      </span>
    </div>
  );
};

export default TrashZone;
