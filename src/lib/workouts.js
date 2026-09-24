const API_URL = 'https://api.abcz.workers.dev/api/fitlog'

export async function getWorkouts({ signal } = {}) {
  const response = await fetch(API_URL, { signal })

  if (!response.ok) {
    throw new Error('Unable to load workouts. Please try again.')
  }

  const workouts = await response.json()

  if (!Array.isArray(workouts)) {
    throw new Error('The workout library returned an unexpected response.')
  }

  return workouts
}

export async function getWorkout(id, { signal } = {}) {
  if (!/^[1-9]\d*$/.test(String(id))) return null

  const response = await fetch(`${API_URL}/${id}`, { signal })

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error('Unable to load this workout. Please try again.')
  }

  return response.json()
}
