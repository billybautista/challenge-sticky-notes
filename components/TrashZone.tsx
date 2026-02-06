import { TrashIcon } from "lucide-react";

const TrashZone = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-center pointer-events-none bg-stone-200/60 border-t-2 border-stone-300">
      <TrashIcon className="w-8 h-8 text-stone-400" />
      <span className="ml-2 text-sm font-medium text-stone-400">
        Drop here to delete
      </span>
    </div>
  );
};

export default TrashZone;
