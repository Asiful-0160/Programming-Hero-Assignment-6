'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

export default function WorkoutImage({ workout }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="detail-image">
      {failed ? (
        <div className="image-fallback">
          <ImageOff size={36} aria-hidden="true" />
          <span>Image unavailable</span>
        </div>
      ) : (
        <Image src={workout.image} alt={workout.name} fill unoptimized preload sizes="(max-width: 767px) 100vw, 50vw" onError={() => setFailed(true)} />
      )}
    </div>
  )
}
