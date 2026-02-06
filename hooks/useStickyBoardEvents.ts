import { useCallback } from "react";

interface StickyBoardEventsProps {
  handleResizeMove: (e: React.PointerEvent) => boolean;
  handleDragMove: (e: React.PointerEvent) => boolean;
  handleResizeEnd: () => boolean;
  handleDragEnd: () => boolean;
  cancelResize: () => void;
  cancelDrag: () => void;
}

export function useStickyBoardEvents({
  handleResizeMove,
  handleDragMove,
  handleResizeEnd,
  handleDragEnd,
  cancelResize,
  cancelDrag,
}: StickyBoardEventsProps) {
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Prioritize resize, then drag
      if (handleResizeMove(e)) return;
      handleDragMove(e);
    },
    [handleResizeMove, handleDragMove]
  );

  const handlePointerUp = useCallback(() => {
    handleResizeEnd();
    handleDragEnd();
  }, [handleResizeEnd, handleDragEnd]);

  const handleLostPointerCapture = useCallback(() => {
    cancelResize();
    cancelDrag();
  }, [cancelResize, cancelDrag]);

  return {
    handlePointerMove,
    handlePointerUp,
    handleLostPointerCapture,
  };
}
