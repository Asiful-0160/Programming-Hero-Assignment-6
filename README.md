# FitLog

**Train with intent. Log every set.**

FitLog is a responsive workout library and daily training planner. Explore
12 exercises, review their instructions, build a plan, and track completed lifts.

- **Live site:** Pending deployment.
- **Repository:** [Programming-Hero-Assignment-6](https://github.com/Asiful-0160/Programming-Hero-Assignment-6)

## Features

1. **Workout library:** API-powered cards with images, muscle groups, equipment,
   duration, calories, and ratings.
2. **Workout details:** Individual pages with seven specifications, descriptions,
   numbered instructions, and Plan/Save actions.
3. **Daily planning:** Add workouts, mark them done, remove them, and see live
   exercise, minute, and calorie totals.
4. **Saved workouts:** Keep a separate list for later and add saved lifts to the plan.
5. **Search and sorting:** Search either page by name or muscle-group tag. Sort
   by duration, calories, or rating.
6. **Persistent progress:** Plan, saved items, and completion status survive
   reloads using browser localStorage.
7. **Plan limit:** Up to five unfinished lifts at once, with duplicate prevention.
8. **Responsive and accessible:** Mobile, tablet, and desktop layouts, keyboard
   tab navigation, visible focus states, and reduced-motion support.
9. **Feedback and recovery:** Action toasts, loading indicators, retry buttons,
   image fallbacks, and a custom not-found page.

## Technologies

| Technology | Purpose |
| --- | --- |
| Next.js App Router and React | Pages, navigation, rendering, and state |
| JavaScript and JSX | Application logic and components |
| Tailwind CSS, DaisyUI, and custom CSS | Styling and responsive layouts |
| React-Toastify | Action notifications |
| Lucide React | Interface icons |
| Fontsource Inter and Oswald | Locally bundled fonts |
| ESLint | Code checks |

## Run Locally

Install Node.js 24.15 or newer within the Node.js 24 release line, with npm.
Clone the repository, then run these commands from its root:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No API keys or environment variables
are required.

For a production build:

```sh
npm run lint
npm run build
npm start
```

The `.tools` directory, if present on your machine, contains local development
tools and is excluded from Git. The VS Code terminal configuration adds its
Node.js directory to PATH; a normal Node.js installation also works.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, search, sorting, and workout library |
| `/workouts/[id]` | Workout details and Plan/Save actions |
| `/my-plan` | Today's Plan, Saved, totals, and workout management |
| Unknown routes or workout IDs | Custom not-found page |

## Planning Rules

- Plan and Saved are independent. Removing an item from one leaves the other intact.
- Completing a lift keeps it visible and frees a slot for another unfinished lift.
- Totals and the Plan badge include completed lifts until they are removed.
- Duration and calories sort from low to high; ratings sort from high to low.
- Data is stored in this browser, with no account or cross-device synchronization.
- Plans remain until changed or browser data is cleared; they do not reset at midnight.

## Data and Assets

- Library endpoint: `https://api.abcz.workers.dev/api/fitlog`
- Detail endpoint: `https://api.abcz.workers.dev/api/fitlog/:id`
- Workout images come from the API's image URLs.
- Logo and hero artwork come from the supplied assignment assets.

The API and external workout images require an internet connection. Failed
requests show a retry option; unavailable images show a fallback.

## Project Structure

```text
public/images/       Logo and hero banner
src/app/             Routes, shared layout, styles, and error/loading pages
src/components/      Navbar, hero, workout cards, library, and plan interface
src/context/         Shared plan state and localStorage persistence
src/lib/             Workout API helpers
```

## Deployment

Deploy using a hosting service that supports the Next.js server runtime.
Workout detail pages fetch data on the server, so this is not a static HTML export.
Use Node.js 24, install with `npm ci`, and build with `npm run build`.

After deployment, replace the pending live link above and verify direct visits
and reloads on `/`, `/my-plan`, and `/workouts/1`, plus an unknown route.
