# FitLog

Workout library and daily training planner built with Next.js.
The project currently contains the starter page and development setup.

## Stack

Next.js App Router, React, JavaScript/JSX, Tailwind CSS, DaisyUI,
React-Toastify, and Lucide React. ESLint checks the code.

## Local development

Use Node.js 24 and npm. A local installation is available in `.tools/nodejs`.
Open this project folder directly in VS Code and create a new terminal; the
workspace settings add that installation to the terminal PATH. In an existing
PowerShell terminal, run `$env:Path = "C:\PROJECTS\Assignment 6\.tools\nodejs;$env:Path"` first.

Run these commands from the project folder:

```powershell
npm install
npm run dev
```

Open http://localhost:3000. To check or build the project:

```powershell
npm run lint
npm run build
npm start
```

No environment variables or API keys are required for the initial setup.
On another machine, install Node.js with npm. Use `npm ci` for a locked install.

## Project structure

- `src/app`: pages, shared layout, styles, and notifications.
- `src/lib/workouts.js`: library and individual workout API requests.
- `public/images`: supplied logo and banner images.
- `next.config.mjs`: Next.js configuration.

## Workout data

Workout data comes from `https://api.abcz.workers.dev/api/fitlog`.
Individual workouts use the same endpoint followed by their numeric ID.
The API provides muscle groups, equipment, difficulty, duration, calories,
sets, reps, rating, description, instructions, and an image URL.
