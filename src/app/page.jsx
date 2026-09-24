import Hero from '@/components/Hero'
import WorkoutLibrary from '@/components/WorkoutLibrary'

export default function HomePage() {
  return (
    <main id="main-content" className="home-content" tabIndex={-1}>
      <Hero />
      <WorkoutLibrary />
    </main>
  )
}
