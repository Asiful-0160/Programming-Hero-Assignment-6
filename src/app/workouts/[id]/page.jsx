import { notFound } from 'next/navigation'
import { getWorkout } from '@/lib/workouts'
import WorkoutActions from '@/components/WorkoutActions'
import WorkoutImage from '@/components/WorkoutImage'

export default async function WorkoutPage({ params }) {
  const { id } = await params
  const workout = await getWorkout(id)
  if (!workout) notFound()

  const specs = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', workout.rating.toFixed(1)],
  ]

  return (
    <main id="main-content" className="page-container page-content workout-detail" tabIndex={-1}>
      <WorkoutImage workout={workout} />
      <div className="detail-content">
        <h1>{workout.name}</h1>
        <p className="detail-description">{workout.description}</p>
        <ul className="workout-tags" aria-label="Muscle groups">
          {workout.muscleGroups.map((group) => <li key={group}>{group}</li>)}
        </ul>
        <dl className="workout-specs">
          {specs.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <h2>INSTRUCTIONS</h2>
        <ol className="workout-instructions">
          {workout.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
        </ol>
        <WorkoutActions workout={workout} />
      </div>
    </main>
  )
}
