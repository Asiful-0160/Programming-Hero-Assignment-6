import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <main id="main-content" className="home-content" tabIndex={-1}>
      <Hero />
      <section id="library" className="page-container library-section" aria-labelledby="library-title" tabIndex={-1}>
        <h2 id="library-title">THE LIBRARY</h2>
        <p>Twelve lifts covering every major muscle group.</p>
      </section>
    </main>
  )
}
