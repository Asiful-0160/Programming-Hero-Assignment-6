'use client'

import { ToastContainer } from 'react-toastify'

export default function Providers({ children }) {
  return (
    <>
      {children}
      <ToastContainer theme="dark" position="bottom-right" />
    </>
  )
}
