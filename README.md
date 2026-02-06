## Getting Started

```bash
yarn install
yarn dev
```

## Features

- **Create notes** — double-click on the board or use the toolbar button
- **Edit text** — double-click on a note to type, click outside to save
- **Drag & drop** — grab a note and move it anywhere on the board
- **Resize** — hover over a note's edges or corners and drag to resize
- **Delete** — drag a note to the trash zone at the bottom
- **Color & size** — pick a color and size from the toolbar before creating
- **Persistence** — notes are saved to localStorage automatically

<img width="1502" height="818" alt="Captura de pantalla 2026-02-06 a la(s) 5 52 35 p  m" src="https://github.com/user-attachments/assets/43cf5ef7-97cc-49a3-bf28-b8af2f05aab9" />


## Architecture

The app uses **unidirectional data flow** with React's `useReducer`. All notes live in a single array managed by `useStickyNotes`, which wraps a reducer and syncs with localStorage. The `Board` component orchestrates everything: it holds the state and passes it down to `StickyNote`, `Toolbar`, and `TrashZone` through props.

Drag and resize interactions are split into separate hooks (`useStickyNoteDrag`, `useStickyNoteResize`), each handling their own lifecycle with pointer capture. `useStickyBoardEvents` coordinates them at the board level, prioritizing resize over drag. This keeps each interaction isolated and easy to modify.

Types and constants (`lib/types.ts`, `lib/constants.ts`) form a shared config layer. Colors, sizes, and resize handles are data-driven, so extending them doesn't require component changes. Styling uses Tailwind plus a few custom CSS rules in `globals.css` for the dot-grid background, shadows, and animations.
