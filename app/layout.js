import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'AmanGov',
  description: 'Bouclier Numérique des Administrations Marocaines',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={geist.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}