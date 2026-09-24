import { LoaderCircle } from 'lucide-react'

export default function LoadingWorkout() {
  return (
    <main id="main-content" className="page-container page-content library-message" role="status">
      <LoaderCircle className="loading-icon" size={24} aria-hidden="true" />
      Loading workout...
    </main>
  )
}
