'use client'

export default function WorkoutError({ reset }) {
  return (
    <main id="main-content" className="page-container page-content library-message">
      <h1 className="text-2xl font-bold">Unable to load this workout</h1>
      <p role="alert">Please try again in a moment.</p>
      <button type="button" className="primary-button" onClick={reset}>Try again</button>
    </main>
  )
}
