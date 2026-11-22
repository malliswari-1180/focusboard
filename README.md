# FocusBoard

A responsive, single-user task dashboard built with **React 18 + Vite** (JavaScript, plain CSS). It is frontend only: no backend, login or external API.

- 
- **GitHub:** https://github.com/malliswari-1180/focusboard

## Screenshots
| Desktop (1440px) | Mobile (390px) |
|---|---|
| ![Desktop](src\screenshots\desktop.png) | ![Mobile](src\screenshots\mobile.png) |

## Setup
Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Features
- Create, edit and delete tasks; delete asks for confirmation
- Form validation: the title is required and shows an error message
- Status updates (To do, In progress, Completed) apply immediately
- Case-insensitive title search, status tabs and priority filter, all working together
- Statistics (total, in progress, completed, completion %) calculated from task data
- Focus Notes carousel with previous/next buttons and active-slide indicators
- Tasks saved in `localStorage` and restored after refresh
- Responsive at 390px, 768px and 1440px (slide-in menu on small screens)
- Accessibility: semantic HTML, labelled form fields, visible focus styles, keyboard-accessible dialogs (Esc closes)

## Project structure
```
src/
  App.jsx              page layout, filters, derived stats
  useTasks.js          task state + localStorage (custom hook)
  data.js              sample tasks, constants, carousel slides
  components/          Sidebar, Stats, Carousel, TaskList, TaskForm, ConfirmDialog
  index.css            all styles
```

## State management choice
I used React hooks with a custom `useTasks` hook (`useState` + `useEffect`) instead of Redux or Zustand, because the app has one list of tasks on one screen and a library would add complexity without benefit.

- **Single source of truth:** the `tasks` array in `useTasks`.
- **Predictable mutations:** `addTask`, `updateTask` and `deleteTask` use `map`, `filter` and spread to create new arrays/objects; state is never mutated directly.
- **Derived values:** stats and the filtered list are computed with `useMemo` from `tasks`, so they always match the current data.
- **Carousel state:** the active slide index is stored in `Carousel.jsx`; the visible slide and dot indicators both use it.
- **Persistence:** tasks are read from and written to `localStorage` (key `focusboard.tasks.v1`) inside try/catch. Sample data loads only when nothing has ever been saved, so saved work is never overwritten.

## Limitations
- Sidebar links other than "Dashboard" are visual placeholders (no extra pages), as allowed by the assignment.
- No backend, so data exists only in the current browser.


## AI usage
See [AI_USAGE.md](AI_USAGE.md).