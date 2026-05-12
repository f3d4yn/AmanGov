import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: '#1a5c2a' }}
      className="px-6 py-4 flex gap-6 items-center">
      <Link href="/"
        style={{ color: '#d4af37' }}
        className="font-bold text-lg">
        AMANGOV
      </Link>
      <Link href="/scanner" style={{ color: '#fff' }} className="hover:opacity-75 transition">Scanner</Link>
      <Link href="/conformite" style={{ color: '#fff' }} className="hover:opacity-75 transition">Conformité</Link>
      <Link href="/phishing" style={{ color: '#fff' }} className="hover:opacity-75 transition">Phishing</Link>
      <Link href="/incidents" style={{ color: '#fff' }} className="hover:opacity-75 transition">Incidents</Link>
    </nav>
  )
}