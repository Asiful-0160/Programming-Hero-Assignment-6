import { Dumbbell } from 'lucide-react'

export default function HomePage() {
  return (
    <main id="main-content" className="page-container page-content flex flex-col justify-center gap-5" tabIndex={-1}>
      <Dumbbell className="text-[#ccff00]" size={40} aria-hidden="true" />
      <h1 className="text-5xl font-bold">FITLOG</h1>
      <p className="text-lg text-neutral-300">Train with intent. Log every set.</p>
    </main>
  )
}
