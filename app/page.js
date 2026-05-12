import Link from 'next/link'
import { Shield, Search, CheckCircle, Mail, AlertTriangle } from 'lucide-react'

const modules = [
  { title: 'Scanner', desc: 'Détection de vulnérabilités', href: '/scanner', icon: Search, color: 'text-blue-400', border: 'border-blue-400/30 hover:border-blue-400' },
  { title: 'Conformité', desc: 'Score DGSSI', href: '/conformite', icon: CheckCircle, color: 'text-green-400', border: 'border-green-400/30 hover:border-green-400' },
  { title: 'Phishing', desc: 'Simulation Darija', href: '/phishing', icon: Mail, color: 'text-yellow-400', border: 'border-yellow-400/30 hover:border-yellow-400' },
  { title: 'Incidents', desc: 'Gestion des crises', href: '/incidents', icon: AlertTriangle, color: 'text-red-400', border: 'border-red-400/30 hover:border-red-400' },
]

const stats = [
  { value: '15+', label: 'Vulnérabilités détectées' },
  { value: '58%', label: 'Score conformité DGI' },
  { value: '20', label: 'Templates phishing Darija' },
  { value: '5', label: 'Incidents gérés' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-6 py-16">
      {/* Hero */}
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-12 h-12 text-blue-400" />
        <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">v1.0 — Miathon 2026</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        AMANGOV
      </h1>
      <p className="text-slate-400 text-xl mb-3 text-center">Bouclier Numérique des Administrations Marocaines</p>
      <p className="text-slate-500 text-sm mb-12 text-center max-w-xl">
        Plateforme de cybersécurité propulsée par IA — Scanner, Conformité DGSSI, Simulation Phishing Darija, Gestion d'Incidents
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-3xl">
        {stats.map(s => (
          <div key={s.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl mb-10">
        {modules.map(m => (
          <Link key={m.title} href={m.href}
            className={`bg-slate-800 border ${m.border} rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-slate-750 transition-all duration-300 group`}>
            <m.icon className={`w-10 h-10 ${m.color} group-hover:scale-110 transition-transform`} />
            <span className="font-semibold">{m.title}</span>
            <span className="text-slate-400 text-sm text-center">{m.desc}</span>
          </Link>
        ))}
      </div>

      <Link href="/scanner"
        className="bg-blue-600 hover:bg-blue-500 px-10 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
        Découvrir la plateforme →
      </Link>

      {/* Footer */}
      <p className="mt-16 text-slate-600 text-xs text-center">
        AmanGov © 2026 — Miathon03 — Équipe : Ilyas · Abdessamad · Malak · Marwa · Imane
      </p>
    </main>
  )
}