'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Clock, Flame, ImageOff, Plus, Star, X } from 'lucide-react'
import { useWorkoutPlan } from '@/context/WorkoutPlanContext'

export default function PlanWorkoutCard({ workout, list }) {
  const [imageFailed, setImageFailed] = useState(false)
  const { plan, completed, pendingCount, addToPlan, completeWorkout, removeWorkout } = useWorkoutPlan()
  const isDone = completed.includes(workout.id)
  const inPlan = plan.includes(workout.id)

  return (
    <article className={`plan-workout${list === 'plan' && isDone ? ' plan-workout-done' : ''}`}>
      <div className="plan-workout-info">
        <div className="plan-thumbnail">
          {imageFailed ? <ImageOff size={24} aria-label="Image unavailable" /> : (
            <Image src={workout.image} alt="" fill unoptimized sizes="144px" onError={() => setImageFailed(true)} />
          )}
        </div>
        <div className="plan-workout-copy">
          <h3>{workout.name}</h3>
          <p>{workout.equipment}</p>
          <ul className="plan-workout-stats" aria-label="Workout statistics">
            <li><Clock size={14} aria-hidden="true" />{workout.duration} min</li>
            <li><Flame size={14} aria-hidden="true" />{workout.caloriesBurned} kcal</li>
            <li aria-label={`Rating ${workout.rating} out of 5`}><Star size={14} aria-hidden="true" />{workout.rating.toFixed(1)}</li>
          </ul>
        </div>
      </div>
      <div className="plan-workout-actions">
        <Link className="secondary-button" href={`/workouts/${workout.id}`}>View Details</Link>
        {list === 'plan' ? (
          <button className="primary-button" type="button" disabled={isDone} onClick={() => completeWorkout(workout)}>
            <Check size={16} aria-hidden="true" />{isDone ? 'Done' : 'Mark as Done'}
          </button>
        ) : (
          <button className="primary-button" type="button" disabled={inPlan || pendingCount >= 5} onClick={() => addToPlan(workout)}>
            <Plus size={16} aria-hidden="true" />{inPlan ? 'In plan' : pendingCount >= 5 ? 'Plan full' : 'Add to plan'}
          </button>
        )}
        <button className="remove-workout" type="button" aria-label={`Remove ${workout.name} from ${list === 'plan' ? "today's plan" : 'saved'}`} title="Remove workout" onClick={() => removeWorkout(workout, list)}>
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
