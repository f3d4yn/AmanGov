import Link from 'next/link'
import { Shield, Search, CheckCircle, Mail, AlertTriangle } from 'lucide-react'

const modules = [
  { title: 'Scanner', desc: 'Détection de vulnérabilités', href: '/scanner', icon: Search, color: 'text-blue-400' },
  { title: 'Conformité', desc: 'Score DGSSI', href: '/conformite', icon: CheckCircle, color: 'text-green-400' },
  { title: 'Phishing', desc: 'Simulation Darija', href: '/phishing', icon: Mail, color: 'text-yellow-400' },
  { title: 'Incidents', desc: 'Gestion des crises', href: '/incidents', icon: AlertTriangle, color: 'text-red-400' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-6">
      <Shield className="w-16 h-16 text-blue-400 mb-6" />
      <h1 className="text-5xl font-bold mb-3 text-center">AMANGOV</h1>
      <p className="text-slate-400 text-xl mb-12 text-center">Bouclier Numérique des Administrations Marocaines</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {modules.map(m => (
          <Link key={m.title} href={m.href}
            className="bg-slate-800 rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-slate-700 transition">
            <m.icon className={`w-10 h-10 ${m.color}`} />
            <span className="font-semibold">{m.title}</span>
            <span className="text-slate-400 text-sm text-center">{m.desc}</span>
          </Link>
        ))}
      </div>
      <Link href="/scanner" className="mt-10 bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-semibold transition">
        Découvrir →
      </Link>
    </main>
  )
}