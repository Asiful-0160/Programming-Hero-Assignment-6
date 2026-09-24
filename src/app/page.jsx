import { Dumbbell } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-5 px-6">
      <Dumbbell className="text-[#ccff00]" size={40} aria-hidden="true" />
      <h1 className="text-5xl font-bold">FITLOG</h1>
      <p className="text-lg text-neutral-300">Train with intent. Log every set.</p>
    </main>
  )
}
