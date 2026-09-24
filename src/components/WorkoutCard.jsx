'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Flame, Star, ImageOff } from 'lucide-react'

export default function WorkoutCard({ workout }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="workout-card">
      <Link href={`/workouts/${workout.id}`} className="workout-card-link">
        <div className="workout-image">
          {imageFailed ? (
            <div className="image-fallback"><ImageOff size={28} aria-hidden="true" /><span>Image unavailable</span></div>
          ) : (
            <Image src={workout.image} alt="" fill unoptimized sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" onError={() => setImageFailed(true)} />
          )}
        </div>
        <div className="workout-card-body">
          <ul className="workout-tags" aria-label="Muscle groups">
            {workout.muscleGroups.map((group) => <li key={group}>{group}</li>)}
          </ul>
          <h3>{workout.name}</h3>
          <p className="workout-equipment">{workout.equipment}</p>
          <ul className="workout-stats" aria-label="Workout statistics">
            <li><Clock size={14} aria-hidden="true" />{workout.duration} min</li>
            <li><Flame size={14} aria-hidden="true" />{workout.caloriesBurned} kcal</li>
            <li aria-label={`Rating ${workout.rating} out of 5`}><Star size={14} aria-hidden="true" />{workout.rating.toFixed(1)}</li>
          </ul>
        </div>
      </Link>
    </article>
  )
}
