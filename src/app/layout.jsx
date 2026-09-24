import './globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '@fontsource/oswald/700.css'
import 'react-toastify/dist/ReactToastify.css'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'FitLog | Workout Library',
  description: 'Train with intent. Log every set.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
