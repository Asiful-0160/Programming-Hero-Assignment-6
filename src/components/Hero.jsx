import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="page-container hero-content">
        <div className="hero-copy">
          <p className="hero-eyebrow">WORKOUT LIBRARY</p>
          <h1 id="hero-title">TRAIN WITH INTENT. LOG EVERY SET.</h1>
          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="primary-button">
            <ArrowDown size={18} aria-hidden="true" />
            BROWSE WORKOUTS
          </a>
        </div>
        <Image
          src="/images/banner.png"
          alt="Anatomical illustration of an athlete performing a preacher curl"
          width={343}
          height={361}
          className="hero-image"
          preload
        />
      </div>
    </section>
  )
}
