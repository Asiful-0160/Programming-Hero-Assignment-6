'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, LoaderCircle, Search } from 'lucide-react'
import { getWorkouts } from '@/lib/workouts'
import WorkoutCard from './WorkoutCard'

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestCount, setRequestCount] = useState(0)
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

  const searchText = query.trim().toLowerCase()
  const visibleWorkouts = workouts
    .filter((workout) => [workout.name, ...workout.muscleGroups].some((value) => value.toLowerCase().includes(searchText)))
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a[sortBy] - b[sortBy])

  return (
    <section id="library" className="page-container library-section" aria-labelledby="library-title" tabIndex={-1}>
      <div className="library-header">
        <div>
          <h2 id="library-title">THE LIBRARY</h2>
          <p className="library-description">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="library-controls">
          <div className="search-field">
            <Search size={16} aria-hidden="true" />
            <input type="search" aria-label="Search workouts by name or tag" placeholder="Search workouts" value={query} onChange={(event) => setQuery(event.target.value)} />
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
      {loading ? (
        <div className="library-message" role="status"><LoaderCircle className="loading-icon" size={24} aria-hidden="true" />Loading workouts...</div>
      ) : error ? (
        <div className="library-message"><p role="alert">{error}</p><button type="button" className="primary-button" onClick={retry}>Try again</button></div>
      ) : visibleWorkouts.length === 0 ? (
        <div className="library-message" role="status">
          <p>{workouts.length === 0 ? 'No workouts are available yet.' : 'No workouts match your search.'}</p>
          {query && <button type="button" className="primary-button" onClick={() => setQuery('')}>Clear search</button>}
        </div>
      ) : (
        <div className="workout-grid">
          {visibleWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
        </div>
      )}
    </section>
  )
}
