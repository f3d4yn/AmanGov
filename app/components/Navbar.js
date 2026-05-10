import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex gap-6 border-b border-slate-700">
      <Link href="/" className="font-bold text-blue-400">AMANGOV</Link>
      <Link href="/scanner" className="hover:text-blue-400 transition">Scanner</Link>
      <Link href="/conformite" className="hover:text-blue-400 transition">Conformité</Link>
      <Link href="/phishing" className="hover:text-blue-400 transition">Phishing</Link>
      <Link href="/incidents" className="hover:text-blue-400 transition">Incidents</Link>
    </nav>
  )
}