'use client'

import { Bookmark, Check, Plus } from 'lucide-react'
import { useWorkoutPlan } from '@/context/WorkoutPlanContext'

export default function WorkoutActions({ workout }) {
  const { plan, saved, ready, addToPlan, saveWorkout } = useWorkoutPlan()
  const inPlan = plan.includes(workout.id)
  const isSaved = saved.includes(workout.id)
  const planFull = plan.length >= 5

  return (
    <div className="workout-actions">
      <button className="primary-button" type="button" disabled={!ready || inPlan || planFull} onClick={() => addToPlan(workout)}>
        {inPlan ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
        {inPlan ? "In today's plan" : planFull ? 'Plan full (5/5)' : "Add to today's plan"}
      </button>
      <button className="secondary-button" type="button" disabled={!ready || isSaved} onClick={() => saveWorkout(workout)}>
        {isSaved ? <Check size={18} aria-hidden="true" /> : <Bookmark size={18} aria-hidden="true" />}
        {isSaved ? 'Saved for later' : 'Save for later'}
      </button>
    </div>
  )
}
