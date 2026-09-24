'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Dumbbell, LoaderCircle, Search } from 'lucide-react'
import { getWorkouts } from '@/lib/workouts'
import { useWorkoutPlan } from '@/context/WorkoutPlanContext'
import PlanWorkoutCard from './PlanWorkoutCard'

export default function MyPlan() {
  const { plan, saved, ready } = useWorkoutPlan()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestCount, setRequestCount] = useState(0)
  const [activeTab, setActiveTab] = useState('plan')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('duration')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        const data = await getWorkouts({ signal: controller.signal })
        if (!controller.signal.aborted) setWorkouts(data)
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [requestCount])

  function retry() {
    setLoading(true)
    setError('')
    setRequestCount((count) => count + 1)
  }

  function changeTab(tab) {
    setActiveTab(tab)
    setQuery('')
  }

  function handleTabKey(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const tab = event.key === 'Home' ? 'plan' : event.key === 'End' ? 'saved' : activeTab === 'plan' ? 'saved' : 'plan'
    changeTab(tab)
    document.getElementById(`${tab}-tab`).focus()
  }

  const plannedWorkouts = workouts.filter((workout) => plan.includes(workout.id))
  const selectedIds = activeTab === 'plan' ? plan : saved
  const selectedWorkouts = workouts.filter((workout) => selectedIds.includes(workout.id))
  const searchText = query.trim().toLowerCase()
  const visibleWorkouts = selectedWorkouts
    .filter((workout) => [workout.name, ...workout.muscleGroups].some((value) => value.toLowerCase().includes(searchText)))
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a[sortBy] - b[sortBy])
  const metrics = [
    ['Exercises', plannedWorkouts.length],
    ['Minutes', plannedWorkouts.reduce((total, workout) => total + workout.duration, 0)],
    ['Calories', plannedWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0)],
  ]

  return (
    <>
      <dl className="plan-metrics" aria-label="Today's plan totals" aria-live="polite">
        {metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <div className="plan-toolbar">
        <div className="plan-tabs" role="tablist" aria-label="Workout lists">
          {[['plan', "Today's Plan"], ['saved', 'Saved']].map(([tab, label]) => (
            <button key={tab} id={`${tab}-tab`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="workout-panel" tabIndex={activeTab === tab ? 0 : -1} onClick={() => changeTab(tab)} onKeyDown={handleTabKey}>
              {label}
            </button>
          ))}
        </div>
        <div className="library-controls">
          <div className="search-field">
            <Search size={16} aria-hidden="true" />
            <input type="search" aria-label="Search your workouts by name or tag" placeholder="Search your workouts" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <label className="sort-field">
            <span>Sort By</span>
            <span className="sort-select">
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="duration">Duration</option>
                <option value="caloriesBurned">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </span>
          </label>
        </div>
      </div>
      <section id="workout-panel" role="tabpanel" aria-labelledby={`${activeTab}-tab`} tabIndex={0}>
        {loading || !ready ? (
          <div className="library-message" role="status"><LoaderCircle className="loading-icon" size={24} aria-hidden="true" />Loading workouts...</div>
        ) : error ? (
          <div className="library-message"><p role="alert">{error}</p><button type="button" className="primary-button" onClick={retry}>Try again</button></div>
        ) : selectedWorkouts.length === 0 ? (
          <div className="plan-empty">
            <Dumbbell size={36} aria-hidden="true" />
            <h2>NOTHING HERE YET</h2>
            <p>Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="primary-button">Go to workouts</Link>
          </div>
        ) : visibleWorkouts.length === 0 ? (
          <div className="library-message" role="status"><p>No workouts match your search.</p><button type="button" className="primary-button" onClick={() => setQuery('')}>Clear search</button></div>
        ) : (
          <div className="plan-workout-list">
            {visibleWorkouts.map((workout) => <PlanWorkoutCard key={`${activeTab}-${workout.id}`} workout={workout} list={activeTab} />)}
          </div>
        )}
      </section>
    </>
  )
}
