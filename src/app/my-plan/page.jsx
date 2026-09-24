export const metadata = {
  title: 'My Plan | FitLog',
}

export default function MyPlanPage() {
  return (
    <main id="main-content" className="page-container page-content" tabIndex={-1}>
      <h1 className="plan-heading">MY PLAN</h1>
      <p className="mt-3 text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>
      <MyPlan />
    </main>
  )
}
import MyPlan from '@/components/MyPlan'
