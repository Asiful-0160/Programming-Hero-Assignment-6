'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Brand from './Brand'

export default function Navbar({ planCount = 0, savedCount = 0 }) {
  const pathname = usePathname()
  const isWorkoutPage = pathname === '/' || pathname.startsWith('/workouts/')

  return (
    <header className="site-header">
      <nav className="page-container site-nav" aria-label="Main navigation">
        <Brand />
        <div className="page-links">
          <Link href="/" aria-current={isWorkoutPage ? 'page' : undefined}>
            Workout
          </Link>
          <Link href="/my-plan" aria-current={pathname === '/my-plan' ? 'page' : undefined}>
            My Plan
          </Link>
        </div>
        <div className="nav-counters">
          <Link href="/my-plan" className="counter-link" aria-label={`Plan: ${planCount} workouts`}>
            <span className="counter-badge plan-badge">Plan <span>{planCount}</span></span>
          </Link>
          <Link href="/my-plan" className="counter-link" aria-label={`Saved: ${savedCount} workouts`}>
            <span className="counter-badge saved-badge">Saved <span>{savedCount}</span></span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
