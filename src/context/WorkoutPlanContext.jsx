'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'

const WorkoutPlanContext = createContext(null)
const STORAGE_KEY = 'fitlog-plan'
const initialState = { plan: [], saved: [], ready: false }

function validIds(value) {
  return Array.isArray(value)
    ? [...new Set(value.filter((id) => Number.isSafeInteger(id) && id > 0))]
    : []
}

function planReducer(state, action) {
  switch (action.type) {
    case 'restore':
      return {
        plan: validIds(action.value?.plan).slice(0, 5),
        saved: validIds(action.value?.saved),
        ready: true,
      }
    case 'add-plan':
      if (state.plan.includes(action.id) || state.plan.length >= 5) return state
      return { ...state, plan: [...state.plan, action.id] }
    case 'save':
      if (state.saved.includes(action.id)) return state
      return { ...state, saved: [...state.saved, action.id] }
    default:
      return state
  }
}

export function WorkoutPlanProvider({ children }) {
  const [state, dispatch] = useReducer(planReducer, initialState)

  useEffect(() => {
    try {
      dispatch({ type: 'restore', value: JSON.parse(localStorage.getItem(STORAGE_KEY)) })
    } catch {
      dispatch({ type: 'restore', value: null })
      toast.warn('Saved workouts could not be restored on this browser.')
    }
  }, [])

  useEffect(() => {
    if (!state.ready) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan: state.plan, saved: state.saved }))
    } catch {
      toast.warn('Your changes work for this visit, but could not be saved on this browser.', { toastId: 'storage-error' })
    }
  }, [state])

  function addToPlan(workout) {
    if (!state.ready || state.plan.includes(workout.id)) return
    if (state.plan.length >= 5) {
      toast.info('Your plan already contains five workouts.')
      return
    }
    dispatch({ type: 'add-plan', id: workout.id })
    toast.success(`${workout.name} added to today's plan.`)
  }

  function saveWorkout(workout) {
    if (!state.ready || state.saved.includes(workout.id)) return
    dispatch({ type: 'save', id: workout.id })
    toast.success(`${workout.name} saved for later.`)
  }

  return (
    <WorkoutPlanContext.Provider value={{ ...state, addToPlan, saveWorkout }}>
      {children}
    </WorkoutPlanContext.Provider>
  )
}

export function useWorkoutPlan() {
  const context = useContext(WorkoutPlanContext)
  if (!context) throw new Error('useWorkoutPlan must be used inside WorkoutPlanProvider.')
  return context
}
