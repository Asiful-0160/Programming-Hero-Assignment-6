import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="page-container page-content library-message">
      <h1 className="text-3xl font-bold">PAGE NOT FOUND</h1>
      <p>This page or workout does not exist.</p>
      <Link href="/" className="primary-button">Go to workouts</Link>
    </main>
  )
}
