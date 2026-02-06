import { useCallback } from "react";

interface StickyBoardEventsProps {
  handleDragMove: (e: React.PointerEvent) => boolean;
  handleDragEnd: () => boolean;
  cancelDrag: () => void;
}

export function useStickyBoardEvents({
  handleDragMove,
  handleDragEnd,
  cancelDrag,
}: StickyBoardEventsProps) {
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      handleDragMove(e);
    },
    [handleDragMove]
  );

  const handlePointerUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleLostPointerCapture = useCallback(() => {
    cancelDrag();
  }, [cancelDrag]);

  return {
    handlePointerMove,
    handlePointerUp,
    handleLostPointerCapture,
  };
}
