import StickyNote from "./StickyNote";
import Toolbar from "./Toolbar";
import TrashZone from "./TrashZone";

function Board() {
  return (
    <div className="board-canvas relative h-screen w-screen overflow-hidden select-none ">
      <Toolbar />
      <StickyNote />
      <TrashZone />
    </div>
  );
}

export default Board;
