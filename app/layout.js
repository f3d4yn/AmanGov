import { Geist } from 'next/font/google'
import './globals.css'
const geist = Geist({ subsets: ['latin'] })
export const metadata = {
  title: 'AmanGov',
  description: 'Bouclier Numérique des Administrations Marocaines',
}
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  )
}
