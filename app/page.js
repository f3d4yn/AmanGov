'use client'
import Link from 'next/link'
import { Shield, Search, CheckCircle, Mail, AlertTriangle } from 'lucide-react'
import { useEffect, useRef } from 'react'

const modules = [
  { title: 'Scanner', desc: 'Détection de vulnérabilités', href: '/scanner', icon: Search },
  { title: 'Conformité', desc: 'Score DGSSI', href: '/conformite', icon: CheckCircle },
  { title: 'Phishing', desc: 'Simulation Darija', href: '/phishing', icon: Mail },
  { title: 'Incidents', desc: 'Gestion des crises', href: '/incidents', icon: AlertTriangle },
]

const stats = [
  { value: 15, label: 'Vulnérabilités détectées', suffix: '+' },
  { value: 58, label: 'Score conformité DGI', suffix: '%' },
  { value: 20, label: 'Templates phishing Darija', suffix: '' },
  { value: 5, label: 'Incidents gérés', suffix: '' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(value / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { start = value; clearInterval(timer) }
      if (ref.current) ref.current.textContent = start + suffix
    }, 30)
    return () => clearInterval(timer)
  }, [value, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function Home() {
  return (
    <main style={{ backgroundColor: '#f5f5f0', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6 py-16">

      {/* Hero */}
      <div className="flex items-center gap-3 mb-4">
        <Shield style={{ color: '#1a5c2a' }} className="w-14 h-14" />
        <span style={{ color: '#b8860b' }} className="font-mono text-sm tracking-widest uppercase">
          v1.0 — Miathon 2026
        </span>
      </div>

      <h1 style={{ color: '#1a5c2a' }} className="text-5xl md:text-6xl font-bold mb-4 text-center">
        AMANGOV
      </h1>
      <p style={{ color: '#555555' }} className="text-xl mb-2 text-center">
        Bouclier Numérique des Administrations Marocaines
      </p>
      <p style={{ color: '#888' }} className="text-sm mb-12 text-center max-w-xl">
        Plateforme de cybersécurité — Scanner · Conformité DGSSI · Phishing Darija · Incidents
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-3xl">
        {stats.map(s => (
          <div key={s.label}
            style={{ backgroundColor: '#fff', border: '1px solid #d4af37' }}
            className="rounded-xl p-4 text-center shadow-sm">
            <div style={{ color: '#1a5c2a' }} className="text-2xl font-bold">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div style={{ color: '#555' }} className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl mb-10">
        {modules.map(m => (
          <Link key={m.title} href={m.href}
            style={{ backgroundColor: '#fff', border: '1px solid #1a5c2a' }}
            className="rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all duration-300 group">
            <m.icon style={{ color: '#1a5c2a' }} className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <span style={{ color: '#1a1a1a' }} className="font-semibold">{m.title}</span>
            <span style={{ color: '#555' }} className="text-sm text-center">{m.desc}</span>
          </Link>
        ))}
      </div>

      <Link href="/scanner"
        style={{ backgroundColor: '#1a5c2a', color: '#fff' }}
        className="px-10 py-3 rounded-lg font-semibold hover:opacity-90 transition">
        Découvrir la plateforme →
      </Link>

      <p style={{ color: '#aaa' }} className="mt-16 text-xs text-center">
        AmanGov © 2026 — Miathon03 — Ilyas · Abdessamad · Malak · Marwa · Imane
      </p>
    </main>
  )
}