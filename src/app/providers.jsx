'use client'

import { ToastContainer } from 'react-toastify'
import { WorkoutPlanProvider } from '@/context/WorkoutPlanContext'

export default function Providers({ children }) {
  return (
    <WorkoutPlanProvider>
      {children}
      <ToastContainer theme="dark" position="bottom-right" />
    </WorkoutPlanProvider>
  )
}
